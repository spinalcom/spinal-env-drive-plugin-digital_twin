"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const contant_1 = require("../contant");
const spinalEnvDriveCore = require('spinal-env-drive-core');
require('spinal-core-connectorjs');
const angular = require('angular');
angular
    .module('app.controllers')
    .run([
    'digitalTwinManagerService',
    function (digitalTwinManagerService) {
        const anyWin = window;
        // create open digital twin in FE top menu
        class SpinalDriveAppFileExplorerOpenDigitalTwinManager extends spinalEnvDriveCore.SpinalDrive_App {
            constructor() {
                super('OpenDigitalTwinManager', contant_1.DIGITAL_TWIN_OPEN_MANAGER_BUTTON, 35, 'settings_applications', contant_1.DIGITAL_TWIN_OPEN_MANAGER_BUTTON_DESCRIPTION);
                this.order_priority = 0;
            }
            action(obj) {
                const fileModel = (spinal_core_connectorjs_type_1.FileSystem._objects[obj.file._server_id]);
                digitalTwinManagerService.openPanel(fileModel);
            }
            is_shown(f) {
                const modelType = f.file.model_type;
                return (modelType.toLocaleLowerCase() ===
                    contant_1.DIGITAL_TWIN_FILE_MODEL_TYPE.toLocaleLowerCase());
            }
        }
        anyWin.spinalDrive_Env.add_applications('FileExplorer', new SpinalDriveAppFileExplorerOpenDigitalTwinManager());
        // create digital twin in FE top menu
        class SpinalDriveAppCurrFileExplorerCreateDigitalTwinManager extends spinalEnvDriveCore.SpinalDrive_App {
            constructor() {
                super('CreateDigitalTwin', contant_1.DIGITAL_TWIN_CREATE_MANAGER_BUTTON, 36, 'location_city', contant_1.DIGITAL_TWIN_CREATE_MANAGER_BUTTON_DESCRIPTION);
                this.order_priority = 0;
            }
            action(obj) {
                const mdDialog = obj.scope.injector.get('$mdDialog');
                const confirm = mdDialog
                    .prompt()
                    .title('New Digital twin')
                    .placeholder('Digital twin\'s name')
                    .ariaLabel('New Digital twin')
                    .initialValue('Digital twin')
                    .clickOutsideToClose(true)
                    .required(true)
                    .ok('Create !')
                    .cancel('Cancel');
                obj.original = {
                    model: obj.model._server_id,
                };
                mdDialog.show(confirm).then(filename => {
                    if (filename && obj && obj.model && obj.model._server_id) {
                        const directory = spinal_core_connectorjs_type_1.FileSystem._objects[obj.model._server_id];
                        digitalTwinManagerService.newDigitalTwin(directory, filename);
                    }
                    else {
                        console.log('Error Directory model not foud');
                    }
                }, function () { });
            }
            is_shown(file) {
                return true;
            }
        }
        anyWin.spinalDrive_Env.add_applications('FileExplorerCurrDir', new SpinalDriveAppCurrFileExplorerCreateDigitalTwinManager());
    },
]);
//# sourceMappingURL=DigitalTwinButtons.js.map