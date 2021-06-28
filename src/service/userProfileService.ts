import { SpinalGraphService,
    SpinalGraph,
    SpinalContext,
    SpinalNode } from "spinal-env-viewer-graph-service";
import { CANNOT_CREATE_INTERNAL_ERROR, SPINALTWIN_ADMIN_SERVICE_APP_RELATION_TYPE_PTR_LST, SPINALTWIN_ADMIN_SERVICE_USER_PROFILE_RELATION_NAME } from "../contant";
import { SpinalTwinUserProfile } from "../model/SpinalTwinUserProfile";

export class ServiceUserProfile {

    constructor() { }

  public createUserProfile(spinalTwinUserProfile: SpinalTwinUserProfile | string, contextId: string): Promise<string>{
      if (typeof spinalTwinUserProfile === "string") spinalTwinUserProfile = { name: spinalTwinUserProfile };

      const groupId = SpinalGraphService.createNode(spinalTwinUserProfile, undefined);
      return SpinalGraphService.addChildInContext(
          contextId,
          groupId,
          contextId,
          SPINALTWIN_ADMIN_SERVICE_USER_PROFILE_RELATION_NAME,
          SPINALTWIN_ADMIN_SERVICE_APP_RELATION_TYPE_PTR_LST,
      ).then(async () => {
          return groupId;
      })
          .catch((e) => {
              console.error(e);
              return Promise.reject(Error(CANNOT_CREATE_INTERNAL_ERROR));
          });
  }; // userProfile: UserProfileInterface
  

  public getUserProfile(id: string): any {
    return SpinalGraphService.findNode(id)
            .then(node => {
                return node;
            });
  };

  public getAllUserProfile(contextId: string) {
    return SpinalGraphService.getChildrenInContext(contextId, contextId);
  };

  public getUser(id: string, email?: string, password?: string) {};

  public addNode(userProfileId: string, childId: string, relationName: string, relationType: string) {} ;


}
