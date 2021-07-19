"use strict";
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
exports.ServiceSpinalTwinApp = void 0;
const spinal_env_viewer_graph_service_1 = require("spinal-env-viewer-graph-service");
const contant_1 = require("../contant");
class ServiceSpinalTwinApp {
    constructor() { }
    createSpinalTwinGroup(spinalTwinGroup, contextId) {
        if (typeof spinalTwinGroup === "string")
            spinalTwinGroup = { name: spinalTwinGroup };
        spinalTwinGroup.type = contant_1.SPINALAPP_TYPE;
        const groupId = spinal_env_viewer_graph_service_1.SpinalGraphService.createNode(spinalTwinGroup, undefined);
        return spinal_env_viewer_graph_service_1.SpinalGraphService.addChildInContext(contextId, groupId, contextId, contant_1.SPINALTWIN_ADMIN_SERVICE_APP_GROUP_RELATION_NAME, contant_1.SPINALTWIN_ADMIN_SERVICE_APP_RELATION_TYPE_PTR_LST).then(() => __awaiter(this, void 0, void 0, function* () {
            return groupId;
        }))
            .catch((e) => {
            console.error(e);
            return Promise.reject(Error(contant_1.CANNOT_CREATE_INTERNAL_ERROR));
        });
    }
    ;
    getAllSpinalTwinGroup(contextId) {
        return spinal_env_viewer_graph_service_1.SpinalGraphService.getChildrenInContext(contextId, contextId);
    }
    ;
    getAppOfSpinalTwinGroup(spinalTwinGroupId) {
        return spinal_env_viewer_graph_service_1.SpinalGraphService.getChildren(spinalTwinGroupId, [contant_1.SPINALTWIN_ADMIN_SERVICE_APP_RELATION_NAME]).then(children => children.map(el => el.get()));
    }
    ;
    addAppToSpinalTwinGroup(spinalTwinGroupId, spinalTwinAppId, relationType) {
        return spinal_env_viewer_graph_service_1.SpinalGraphService.addChildInContext(spinalTwinGroupId, spinalTwinAppId, spinalTwinGroupId, contant_1.SPINALTWIN_ADMIN_SERVICE_APP_RELATION_NAME, relationType);
    }
    createApp(spinalTwinApp) {
        if (typeof spinalTwinApp === "string")
            spinalTwinApp = { name: spinalTwinApp };
        spinalTwinApp.type = contant_1.SPINALAPP_TYPE;
        const appId = spinal_env_viewer_graph_service_1.SpinalGraphService.createNode(spinalTwinApp, undefined);
        return appId;
    }
}
exports.ServiceSpinalTwinApp = ServiceSpinalTwinApp;
//# sourceMappingURL=spinalTwinAppService.js.map