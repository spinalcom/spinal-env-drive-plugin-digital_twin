import { SpinalGraphService,
    SpinalGraph,
    SpinalContext,
    SpinalNode } from "spinal-env-viewer-graph-service";
import { SPINAL_TWIN_ADMIN } from '../contant';

export class ServiceSpinalAdminGraph {

    constructor() { }

    public init(directory: spinal.Directory<any>, filename: string) {

        const graph = new SpinalGraph("SpinalTwinAdmin");
        const DataListContext = new SpinalContext("DataList");

        const SpinaltwinDescContext = new SpinalContext("SpinalTwinDescription");
        const UserProfileContext = new SpinalContext("UserProfile");
        const UserListContext = new SpinalContext("UserList");
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
            model_type: SPINAL_TWIN_ADMIN,
        });
    }
}
