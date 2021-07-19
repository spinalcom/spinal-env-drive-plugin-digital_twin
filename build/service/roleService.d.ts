export declare class ServiceUserProfile {
    constructor();
    createRole(role: string, contextId: any): void;
    getAllRole(contextId: any): void;
    addRoleToUserProfile(userProfileId: string, roleId: string): void;
    removeRoleToUserProfile(userProfileId: string, roleId: string): void;
}
