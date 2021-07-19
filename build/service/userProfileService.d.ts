import { SpinalTwinUserProfile } from "../model/SpinalTwinUserProfile";
export declare class ServiceUserProfile {
    constructor();
    createUserProfile(spinalTwinUserProfile: SpinalTwinUserProfile | string, contextId: string): Promise<string>;
    getUserProfile(id: string): any;
    getAllUserProfile(contextId: string): Promise<import("spinal-env-viewer-graph-service/declarations/GraphManagerService").SpinalNodeRef[]>;
    getUser(id: string, email?: string, password?: string): void;
    addNode(userProfileId: string, childId: string, relationName: string, relationType: string): void;
}
