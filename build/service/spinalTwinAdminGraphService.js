"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceSpinalAdminGraph = void 0;
const spinal_env_viewer_graph_service_1 = require("spinal-env-viewer-graph-service");
const contant_1 = require("../contant");
class ServiceSpinalAdminGraph {
    constructor() { }
    init(directory, filename) {
        const graph = new spinal_env_viewer_graph_service_1.SpinalGraph("SpinalTwinAdmin");
        const DataListContext = new spinal_env_viewer_graph_service_1.SpinalContext("DataList");
        const SpinaltwinDescContext = new spinal_env_viewer_graph_service_1.SpinalContext("SpinalTwinDescription");
        const UserProfileContext = new spinal_env_viewer_graph_service_1.SpinalContext("UserProfile");
        const UserListContext = new spinal_env_viewer_graph_service_1.SpinalContext("UserList");
        graph.addContext(DataListContext);
        graph.addContext(SpinaltwinDescContext);
        graph.addContext(UserProfileContext);
        graph.addContext(UserListContext);
        /*const dataRoomNode = new SpinalNode("DataRoom");
        const maintenanceBookNode = new SpinalNode("MaintenanceBook");
        const operationCenterNode = new SpinalNode("OperationBook");

        SpinaltwinDescContext.addChildInContext(dataRoomNode, "hasApplication", "PtrList");
        SpinaltwinDescContext.addChildInContext(maintenanceBookNode, "hasApplication", "PtrList");
        SpinaltwinDescContext.addChildInContext(operationCenterNode, "hasApplication", "PtrList");*/
        directory.force_add_file(filename, graph, {
            model_type: contant_1.SPINAL_TWIN_ADMIN,
        });
    }
}
exports.ServiceSpinalAdminGraph = ServiceSpinalAdminGraph;
//# sourceMappingURL=spinalTwinAdminGraphService.js.map