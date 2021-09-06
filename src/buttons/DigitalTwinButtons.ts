import { FileSystem } from 'spinal-core-connectorjs_type';
import {
  DIGITAL_TWIN_OPEN_MANAGER_BUTTON,
  DIGITAL_TWIN_OPEN_MANAGER_BUTTON_DESCRIPTION,
  DIGITAL_TWIN_FILE_MODEL_TYPE,
  DIGITAL_TWIN_CREATE_MANAGER_BUTTON,
  DIGITAL_TWIN_CREATE_MANAGER_BUTTON_DESCRIPTION,
} from '../contant';

const spinalEnvDriveCore = require('spinal-env-drive-core');
require('spinal-core-connectorjs');
const angular = require('angular');

angular.module('app.controllers').run([
  'digitalTwinManagerService',
  function (digitalTwinManagerService) {
    const anyWin: any = window;

    // create open digital twin in FE top menu
    class SpinalDriveAppFileExplorerOpenDigitalTwinManager extends spinalEnvDriveCore.SpinalDrive_App {
      constructor() {
        super(
          'OpenDigitalTwinManager',
          DIGITAL_TWIN_OPEN_MANAGER_BUTTON,
          35,
          'settings_applications',
          DIGITAL_TWIN_OPEN_MANAGER_BUTTON_DESCRIPTION
        );
        this.order_priority = 0;
      }
      action(obj) {
        const fileModel = <spinal.File<any>>(
          FileSystem._objects[obj.file._server_id]
        );
        digitalTwinManagerService.openPanel(fileModel);
      }

      is_shown(f) {
        const modelType = f.file.model_type;
        return (
          modelType.toLocaleLowerCase() ===
          DIGITAL_TWIN_FILE_MODEL_TYPE.toLocaleLowerCase()
        );
      }
    }
    anyWin.spinalDrive_Env.add_applications(
      'FileExplorer',
      new SpinalDriveAppFileExplorerOpenDigitalTwinManager()
    );

    // create digital twin in FE top menu
    class SpinalDriveAppCurrFileExplorerCreateDigitalTwinManager extends spinalEnvDriveCore.SpinalDrive_App {
      constructor() {
        super(
          'CreateDigitalTwin',
          DIGITAL_TWIN_CREATE_MANAGER_BUTTON,
          36,
          'location_city',
          DIGITAL_TWIN_CREATE_MANAGER_BUTTON_DESCRIPTION
        );
        this.order_priority = 0;
      }
      action(obj) {
        const mdDialog = obj.scope.injector.get('$mdDialog');
        const confirm = mdDialog
          .prompt()
          .title('New Digital twin')
          .placeholder("Digital twin's name")
          .ariaLabel('New Digital twin')
          .initialValue('Digital twin')
          .clickOutsideToClose(true)
          .required(true)
          .ok('Create')
          .cancel('Cancel');
        obj.original = {
          model: obj.model._server_id,
        };

        mdDialog.show(confirm).then(
          (filename) => {
            if (filename && obj && obj.model && obj.model._server_id) {
              const directory = FileSystem._objects[obj.model._server_id];
              digitalTwinManagerService.newDigitalTwin(directory, filename);
            } else {
              console.log('Error Directory model not foud');
            }
          },
          function () {}
        );
      }

      is_shown(file) {
        return true;
      }
    }
    anyWin.spinalDrive_Env.add_applications(
      'FileExplorerCurrDir',
      new SpinalDriveAppCurrFileExplorerCreateDigitalTwinManager()
    );

    // create digital twin in FE top menu
    class SpinalDriveAppCurrFileExplorerCreateSpinalTwinGraph extends spinalEnvDriveCore.SpinalDrive_App {
      constructor() {
        super(
          'SpinalTwinManager',
          'Create SpinalTwin Admin',
          37,
          'assignment_ind',
          'Create SpinalTwin Admin'
        );
        this.order_priority = 0;
      }
      action(obj) {
        obj.original = {
          model: obj.model._server_id,
        };

        if (obj && obj.model && obj.model._server_id) {
          const directory = FileSystem._objects[obj.model._server_id];
          digitalTwinManagerService.newSpinalRoleManager(
            directory,
            'SpinalTwin Admin'
          );
        } else {
          console.log('Error Directory model not foud');
        }
      }

      is_shown(file) {
        return true;
      }
    }
    anyWin.spinalDrive_Env.add_applications(
      'FileExplorerCurrDir',
      new SpinalDriveAppCurrFileExplorerCreateSpinalTwinGraph()
    );

    class SpinalDriveAppFileExplorerBrowserSTAdmin extends spinalEnvDriveCore.SpinalDrive_App {
      /**
       * Creates an instance of SpinalDriveAppFileExplorerBrowserSTAdmin.
       * @memberof SpinalDriveAppFileExplorerBrowserSTAdmin
       */
      constructor() {
        super(
          'OpenSTAdminFileExplorer',
          'ST Admin',
          '10',
          'location_city',
          'ST Admin'
        );
        this.order_priority = 5;
      }
      /**
       * method to handle the selection
       *
       * @param {any} element
       * @memberof SpinalDriveAppFileExplorerBrowserSTAdmin
       */
      action(obj) {
        let authService = obj.scope.injector.get('authService');
        let fs_path = obj.scope.fs_path;
        let username = authService.get_user().username;
        let path = '/__users__/' + username;
        for (var i = 1; i < fs_path.length; i++) {
          path += '/' + fs_path[i].name;
        }
        path += '/' + obj.file.name;
        let myWindow: any = window.open('', '');
        let location = '/html/spinaltwin_admin/#/dashboard?path=' + btoa(path);
        myWindow.document.location = location;
        myWindow.focus();
      }

      /**
       * method to know if the app is needed to be shown.
       * @param {Object} d node of the tree selectionned
       * @returns {boolean}
       * @memberof SpinalDriveAppFileExplorerBrowserSTAdmin
       */
      is_shown(d) {
        if (d && d.file && d.file._server_id) {
          let file = anyWin.FileSystem._objects[d.file._server_id];
          if (file && file instanceof File) {
            return true;
          }
        }
        return false;
      }
    }
    anyWin.spinalDrive_Env.add_applications(
      'FileExplorer',
      new SpinalDriveAppFileExplorerBrowserSTAdmin()
    );
  },
]);
