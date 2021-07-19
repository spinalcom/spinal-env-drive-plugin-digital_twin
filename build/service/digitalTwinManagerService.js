"use strict";
/*
 * Copyright 2018 SpinalCom - www.spinalcom.com
 *
 * This file is part of SpinalCore.
 *
 * Please read all of the following terms and conditions
 * of the Free Software license Agreement ("Agreement")
 * carefully.
 *
 * This Agreement is a legally binding contract between
 * the Licensee (as defined below) and SpinalCom that
 * sets forth the terms and conditions that govern your
 * use of the Program. By installing and/or using the
 * Program, you agree to abide by all the terms and
 * conditions stated or referenced herein.
 *
 * If you do not agree to abide by these terms and
 * conditions, do not demonstrate your acceptance and do
 * not install or use the Program.
 * You should have received a copy of the license along
 * with this file. If not, see
 * <http://resources.spinalcom.com/licenses.pdf>.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const angular = require('angular');
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const digitalTwinManagerCtrl_1 = require("../controller/digitalTwinManagerCtrl");
const loadModelPtr_1 = require("../utils/loadModelPtr");
const spinal_env_viewer_graph_service_1 = require("spinal-env-viewer-graph-service");
const knownExt_1 = require("../utils/knownExt");
const BimFileService_1 = require("./BimFileService");
const fileVersionState_1 = require("./fileVersionState");
const contant_1 = require("../contant");
angular
    .module('app.services')
    .controller(digitalTwinManagerCtrl_1.default.ctrlName, digitalTwinManagerCtrl_1.default.ctrl);
angular
    .module('app.services')
    .factory('digitalTwinManagerService', [
    'goldenLayoutService', '$q', '$templateCache', '$http', 'spinalFileSystem',
    function (goldenLayoutService, $q, $templateCache, $http, spinalFileSystem) {
        let lastGraph = null;
        const bimFileService = new BimFileService_1.BimFileService(onChangeModel);
        const loadTemplateFunc = (uri, name) => {
            return $http.get(uri).then(response => {
                $templateCache.put(name, response.data);
            }, () => {
                console.error(`Cannot load the file ${uri}`);
            });
        };
        const toload = [
            {
                uri: digitalTwinManagerCtrl_1.default.templateUri,
                name: digitalTwinManagerCtrl_1.default.templateName,
            },
        ];
        let initPromise = null;
        const init = () => {
            if (initPromise !== null)
                return initPromise.promise;
            initPromise = $q.defer();
            $q.all(toload.map((elem) => {
                return loadTemplateFunc(elem.uri, elem.name);
            })).then(() => {
                initPromise.resolve();
            }).catch((e) => {
                console.error(e);
                const prom = initPromise;
                initPromise = null;
                prom.reject();
            });
            return initPromise.promise;
        };
        const openPanel = (file) => {
            return factory.init().then(() => {
                const oldFile = factory.lastFile;
                factory.lastFile = file;
                if (factory.controllerOnChange === null) {
                    const cfg = {
                        isClosable: true,
                        title: contant_1.DIGITAL_TWIN_PANEL_TITLE,
                        type: 'component',
                        componentName: 'SpinalHome',
                        width: 20,
                        componentState: {
                            template: digitalTwinManagerCtrl_1.default.templateName,
                            module: 'app.controllers',
                            controller: digitalTwinManagerCtrl_1.default.ctrlName,
                        },
                    };
                    goldenLayoutService.createChild(cfg);
                    function onItemDestroy(item) {
                        if (item && item.config && item.config.componentState &&
                            item.config.componentState.controller &&
                            item.config.componentState.controller === digitalTwinManagerCtrl_1.default.ctrlName) {
                            controllerDestroy();
                            goldenLayoutService.myLayout.off('itemDestroyed', onItemDestroy);
                        }
                    }
                    goldenLayoutService.myLayout.on('itemDestroyed', onItemDestroy);
                }
                else if (oldFile !== factory.lastFile) {
                    return loadModelPtr_1.default(factory.lastFile._ptr)
                        .then((graph) => {
                        lastGraph = graph;
                        bimFileService.resetProcess();
                        spinal_env_viewer_graph_service_1.SpinalGraphService.nodes = {};
                        spinal_env_viewer_graph_service_1.SpinalGraphService.nodesInfo = {};
                        return spinal_env_viewer_graph_service_1.SpinalGraphService.setGraph(graph);
                    }).then(() => bimFileService.addToProces(lastGraph, false));
                }
            });
        };
        function getState(assetFiles) {
            const fileModel = assetFiles.FileVersionModel;
            if (typeof fileModel.state === 'undefined') {
                return 'Not Converted.';
            }
            const state = fileModel.state.get();
            for (let idx = 0; idx < fileVersionState_1.fileVersionState.length; idx++) {
                if (idx === state) {
                    return fileVersionState_1.fileVersionState[idx];
                }
            }
            return 'Not Converted.';
        }
        function onChangeModel() {
            return __awaiter(this, void 0, void 0, function* () {
                if (factory.controllerOnChange === null)
                    return;
                const assetFiles = yield bimFileService.getAssetFiles();
                const res = assetFiles.map((assetFiles) => {
                    return {
                        name: assetFiles.name,
                        nodeId: assetFiles.nodeId,
                        state: getState(assetFiles),
                        description: assetFiles.FileVersionModel.description.get(),
                        versionId: assetFiles.FileVersionModel.versionId.get(),
                        date: assetFiles.FileVersionModel.date.get(),
                    };
                });
                factory.controllerOnChange({
                    filename: factory.lastFile.name.get(),
                    assetFiles: res,
                });
            });
        }
        const controllerOpenRegister = (funcOnChange, funcOnDestroy) => {
            factory.controllerOnChange = funcOnChange;
            factory.controllerDestroyFunc = funcOnDestroy;
            return loadModelPtr_1.default(factory.lastFile._ptr)
                .then((graph) => {
                lastGraph = graph;
                return spinal_env_viewer_graph_service_1.SpinalGraphService.setGraph(lastGraph).then((e) => {
                    bimFileService.addToProces(graph, false);
                    return e;
                });
            });
        };
        const controllerDestroy = () => {
            bimFileService.resetProcess();
            factory.controllerDestroyFunc();
            factory.controllerOnChange = null;
        };
        const newDigitalTwin = (directory, filename) => {
            const graph = new spinal_env_viewer_graph_service_1.SpinalGraph();
            directory.force_add_file(filename, graph, {
                model_type: contant_1.DIGITAL_TWIN_FILE_MODEL_TYPE,
            });
        };
        const newSpinalRoleManager = (directory, filename) => {
            const graph = new spinal_env_viewer_graph_service_1.SpinalGraph("SpinalTwinAdmin");
            const DataListContext = new spinal_env_viewer_graph_service_1.SpinalContext("DataList");
            const SpinaltwinDescContext = new spinal_env_viewer_graph_service_1.SpinalContext("SpinalTwinDescription");
            const UserProfileContext = new spinal_env_viewer_graph_service_1.SpinalContext("UserProfile");
            const UserListContext = new spinal_env_viewer_graph_service_1.SpinalContext("UserList");
            const RoleListContext = new spinal_env_viewer_graph_service_1.SpinalContext("RoleList");
            graph.addContext(DataListContext);
            graph.addContext(SpinaltwinDescContext);
            graph.addContext(UserProfileContext);
            graph.addContext(UserListContext);
            graph.addContext(RoleListContext);
            const dataRoomNode = new spinal_env_viewer_graph_service_1.SpinalNode("DataRoom");
            const maintenanceBookNode = new spinal_env_viewer_graph_service_1.SpinalNode("MaintenanceBook");
            const operationCenterNode = new spinal_env_viewer_graph_service_1.SpinalNode("OperationBook");
            SpinaltwinDescContext.addChildInContext(dataRoomNode, "hasGroupApplication", "PtrLst");
            SpinaltwinDescContext.addChildInContext(maintenanceBookNode, "hasGroupApplication", "PtrLst");
            SpinaltwinDescContext.addChildInContext(operationCenterNode, "hasGroupApplication", "PtrLst");
            // App for DataRoom
            const EquipmentCenter = new spinal_env_viewer_graph_service_1.SpinalNode("EquipmentCenter");
            const DescriptionCenter = new spinal_env_viewer_graph_service_1.SpinalNode("DescriptionCenter");
            const SpaceCenter = new spinal_env_viewer_graph_service_1.SpinalNode("SpaceCenter");
            dataRoomNode.addChildInContext(EquipmentCenter, "hasApplicationDataRoom", "PtrLst", SpinaltwinDescContext);
            dataRoomNode.addChildInContext(DescriptionCenter, "hasApplicationDataRoom", "PtrLst", SpinaltwinDescContext);
            dataRoomNode.addChildInContext(SpaceCenter, "hasApplicationDataRoom", "PtrLst", SpinaltwinDescContext);
            // App for MaintenanceBook
            const TicketCenter = new spinal_env_viewer_graph_service_1.SpinalNode("TicketCenter");
            const NoteCenter = new spinal_env_viewer_graph_service_1.SpinalNode("NoteCenter");
            const AgendaCenter = new spinal_env_viewer_graph_service_1.SpinalNode("AgendaCenter");
            maintenanceBookNode.addChildInContext(TicketCenter, "hasApplicationMaintenanceBook", "PtrLst", SpinaltwinDescContext);
            maintenanceBookNode.addChildInContext(NoteCenter, "hasApplicationMaintenanceBook", "PtrLst", SpinaltwinDescContext);
            maintenanceBookNode.addChildInContext(AgendaCenter, "hasApplicationMaintenanceBook", "PtrLst", SpinaltwinDescContext);
            // App for OperationCenter
            const InsightCenter = new spinal_env_viewer_graph_service_1.SpinalNode("InsightCenter");
            const ControlCenter = new spinal_env_viewer_graph_service_1.SpinalNode("ControlCenter");
            const AlarmCenter = new spinal_env_viewer_graph_service_1.SpinalNode("AlarmCenter");
            const EnergyCenter = new spinal_env_viewer_graph_service_1.SpinalNode("EnergyCenter");
            operationCenterNode.addChildInContext(InsightCenter, "hasApplicationOperation", "PtrLst", SpinaltwinDescContext);
            operationCenterNode.addChildInContext(ControlCenter, "hasApplicationOperation", "PtrLst", SpinaltwinDescContext);
            operationCenterNode.addChildInContext(AlarmCenter, "hasApplicationOperation", "PtrLst", SpinaltwinDescContext);
            operationCenterNode.addChildInContext(EnergyCenter, "hasApplicationOperation", "PtrLst", SpinaltwinDescContext);
            directory.force_add_file(filename, graph, {
                model_type: "SpinalTwin Admin",
            });
        };
        const getFilesDropped = () => {
            const fileMatch = [];
            const fileNotMatch = [];
            const selected = spinalFileSystem.FE_selected_drag;
            if (selected && selected.length > 0) { // change to multiple selection later
                for (let idx = 0; idx < selected.length; idx++) {
                    const fileToPush = selected[idx];
                    let match = false;
                    const modelFile = spinal_core_connectorjs_type_1.FileSystem._objects[fileToPush._server_id];
                    // check if file then if file == 'Path' or 'HttpPath'
                    if (modelFile && modelFile instanceof spinal_core_connectorjs_type_1.File &&
                        modelFile._info && modelFile._info.model_type) {
                        const modelType = modelFile._info.model_type.get();
                        if (modelType === 'Path' || modelType === 'HttpPath') {
                            const filename = modelFile.name.get();
                            if (knownExt_1.default(filename) === true) {
                                match = true;
                                fileMatch.push(modelFile);
                            }
                        }
                    }
                    if (match === false) {
                        fileNotMatch.push(modelFile);
                    }
                }
            }
            return {
                fileMatch,
                fileNotMatch,
            };
        };
        const addFileDropped = () => {
            const filesDropped = getFilesDropped();
            const filesMatch = filesDropped.fileMatch;
            return Promise.all(filesMatch.map((fileMatch) => {
                return bimFileService.addAssetFile(fileMatch);
            }));
        };
        const removeAssetFile = (nodeId) => {
            return bimFileService.removeAssetFile(nodeId);
        };
        const convertAsssetFile = (nodeId) => {
            return bimFileService.convertAsssetFile(nodeId);
        };
        init();
        const factory = {
            convertAsssetFile,
            removeAssetFile,
            addFileDropped,
            getFilesDropped,
            init,
            newDigitalTwin,
            newSpinalRoleManager,
            openPanel,
            controllerOpenRegister,
            controllerDestroy,
            controllerOnChange: null,
            controllerDestroyFunc: null,
            lastFile: null,
        };
        return factory;
    },
]);
//# sourceMappingURL=digitalTwinManagerService.js.map