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
exports.BIM_FILE_TYPE = exports.BIM_FILE_RELATION = exports.BIM_FILE_CONTEXT_NAME = exports.BimFileService = void 0;
const BIM_FILE_CONTEXT_NAME = 'BimFileContext';
exports.BIM_FILE_CONTEXT_NAME = BIM_FILE_CONTEXT_NAME;
const BIM_FILE_RELATION = 'hasBimFile';
exports.BIM_FILE_RELATION = BIM_FILE_RELATION;
const BIM_FILE_TYPE = 'BimFile';
exports.BIM_FILE_TYPE = BIM_FILE_TYPE;
const spinal_model_file_version_model_1 = require("spinal-model-file_version_model");
const ProcessOnChange_1 = require("../utils/ProcessOnChange");
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const spinal_env_viewer_graph_service_1 = require("spinal-env-viewer-graph-service");
const loadModelPtr_1 = require("../utils/loadModelPtr");
class BimFileService {
    constructor(fct) {
        if (fct) {
            this.setOnChange(fct);
        }
    }
    resetProcess() {
        this.processOnChange.empty();
    }
    setOnChange(fct) {
        this.processOnChange = new ProcessOnChange_1.default(fct, {
            type: 'throttle',
            timeout: 200,
        });
    }
    addToProces(node, check = true) {
        if (check === false) {
            // @ts-ignore
            return this.processOnChange.add(node);
        }
        let resNode = node;
        if (typeof node === 'string' || node instanceof String) {
            resNode = spinal_env_viewer_graph_service_1.SpinalGraphService.getRealNode(node.toString());
        }
        if (node instanceof spinal_core_connectorjs_type_1.Str) {
            const id = node.get();
            const realNode = spinal_env_viewer_graph_service_1.SpinalGraphService.getRealNode(id);
            return this.processOnChange.add(realNode);
        }
        if (resNode instanceof spinal_core_connectorjs_type_1.Model) {
            if (typeof resNode.id !== 'undefined') {
                return this.processOnChange.add(spinal_env_viewer_graph_service_1.SpinalGraphService.getRealNode(resNode.id.get()));
            }
        }
        // @ts-ignore
        this.processOnChange.add(resNode);
    }
    getContextID() {
        return __awaiter(this, void 0, void 0, function* () {
            let context = spinal_env_viewer_graph_service_1.SpinalGraphService.getContext(BIM_FILE_CONTEXT_NAME);
            if (!context) {
                context = yield spinal_env_viewer_graph_service_1.SpinalGraphService.addContext(BIM_FILE_CONTEXT_NAME);
            }
            this.addToProces(context, false);
            return context.getId().get();
        });
    }
    getAssetFiles() {
        return __awaiter(this, void 0, void 0, function* () {
            const contextId = yield this.getContextID();
            const children = yield spinal_env_viewer_graph_service_1.SpinalGraphService.getChildren(contextId, [BIM_FILE_RELATION]);
            return Promise.all(children.map((child) => __awaiter(this, void 0, void 0, function* () {
                this.addToProces(child);
                const versionModel = yield loadModelPtr_1.default(child.element.ptr);
                const currentVersion = yield loadModelPtr_1.default(versionModel.currentVersion);
                // @ts-ignore
                this.addToProces(currentVersion);
                return {
                    nodeId: child.id.get(),
                    name: child.name.get(),
                    FileVersionModel: currentVersion,
                };
            })));
        });
    }
    removeAssetFile(nodeID) {
        return __awaiter(this, void 0, void 0, function* () {
            const contextId = yield this.getContextID();
            const children = yield spinal_env_viewer_graph_service_1.SpinalGraphService.getChildren(contextId, [BIM_FILE_RELATION]);
            // test if current version exist in context children
            for (const child of children) {
                // if true retrun
                if (child.type && child.type.get() === BIM_FILE_TYPE &&
                    child.id && child.id.get() === nodeID) {
                    return spinal_env_viewer_graph_service_1.SpinalGraphService.removeFromGraph(nodeID);
                }
            }
        });
    }
    setState(node, state) {
        return __awaiter(this, void 0, void 0, function* () {
            const versionModel = yield loadModelPtr_1.default(node.element.ptr);
            const currentVersion = yield loadModelPtr_1.default(versionModel.currentVersion);
            if (typeof currentVersion.state === 'undefined') {
                currentVersion.mod_attr('state', state);
            }
            currentVersion.state.set(state);
        });
    }
    convertAsssetFile(nodeID) {
        return __awaiter(this, void 0, void 0, function* () {
            const contextId = yield this.getContextID();
            const children = yield spinal_env_viewer_graph_service_1.SpinalGraphService.getChildren(contextId, [BIM_FILE_RELATION]);
            // test if current version exist in context children
            for (const child of children) {
                // if true retrun
                if (child.type && child.type.get() === BIM_FILE_TYPE &&
                    child.id && child.id.get() === nodeID) {
                    return this.setState(child, 1);
                }
            }
        });
    }
    addAssetFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const versionModel = yield spinal_model_file_version_model_1.FileVersionContainerModel.getVersionModelFromFile(file);
            const contextId = yield this.getContextID();
            const children = yield spinal_env_viewer_graph_service_1.SpinalGraphService.getChildren(contextId, [BIM_FILE_RELATION]);
            // test if current version exist in context children
            for (const child of children) {
                // if true retrun
                if (child.type && child.type.get() === BIM_FILE_TYPE &&
                    child.name && child.name.get() === file.name.get()) {
                    return;
                }
            }
            // if false push currentversionModel
            const info = {
                type: BIM_FILE_TYPE,
                name: file.name.get(),
            };
            const node = spinal_env_viewer_graph_service_1.SpinalGraphService.createNode(info, versionModel);
            spinal_env_viewer_graph_service_1.SpinalGraphService.addChildInContext(contextId, node, contextId, BIM_FILE_RELATION, spinal_env_viewer_graph_service_1.SPINAL_RELATION_TYPE);
        });
    }
}
exports.default = BimFileService;
exports.BimFileService = BimFileService;
//# sourceMappingURL=BimFileService.js.map