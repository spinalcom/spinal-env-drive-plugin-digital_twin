export class ServiceUserProfile {

    constructor() { }

  public createRole(role: string, contextId) {}; // role: roleInterface | string

  public getAllRole(contextId) {};

  public addRoleToUserProfile(userProfileId: string, roleId: string) {};

  public removeRoleToUserProfile(userProfileId: string, roleId: string) {};

}