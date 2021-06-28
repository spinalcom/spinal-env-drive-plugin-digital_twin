import { SpinalGraphService } from "spinal-env-viewer-graph-service";
import { CANNOT_CREATE_INTERNAL_ERROR, SPINALAPP_TYPE, SPINALTWIN_ADMIN_SERVICE_APP_GROUP_RELATION_NAME, SPINALTWIN_ADMIN_SERVICE_APP_RELATION_NAME, SPINALTWIN_ADMIN_SERVICE_APP_RELATION_TYPE_PTR_LST } from "../contant";
import { SpinalTwinApp } from "../model/SpinalTwinApp";
import { SpinalTwinGroup } from "../model/SpinalTwinGroup";

export class ServiceSpinalTwinApp {

    constructor() { }

  public createSpinalTwinGroup(spinalTwinGroup: SpinalTwinGroup | string, contextId: string): Promise<string> {
      if (typeof spinalTwinGroup === "string") spinalTwinGroup = { name: spinalTwinGroup };

      spinalTwinGroup.type = SPINALAPP_TYPE;
      const groupId = SpinalGraphService.createNode(spinalTwinGroup, undefined);
      return SpinalGraphService.addChildInContext(
          contextId,
          groupId,
          contextId,
          SPINALTWIN_ADMIN_SERVICE_APP_GROUP_RELATION_NAME,
          SPINALTWIN_ADMIN_SERVICE_APP_RELATION_TYPE_PTR_LST,
      ).then(async () => {
          return groupId;
      })
          .catch((e) => {
              console.error(e);
              return Promise.reject(Error(CANNOT_CREATE_INTERNAL_ERROR));
          });
  };
  

  public getAllSpinalTwinGroup(contextId: string) {
    return SpinalGraphService.getChildrenInContext(contextId, contextId);
  };

  public getAppOfSpinalTwinGroup(spinalTwinGroupId: string) {
    return SpinalGraphService.getChildren(spinalTwinGroupId, [SPINALTWIN_ADMIN_SERVICE_APP_RELATION_NAME]).then(children => children.map(el => el.get()))
  };

  public addAppToSpinalTwinGroup(spinalTwinGroupId: string, spinalTwinAppId: string, relationType: string): any {
      return SpinalGraphService.addChildInContext(
          spinalTwinGroupId,
          spinalTwinAppId,
          spinalTwinGroupId,
          SPINALTWIN_ADMIN_SERVICE_APP_RELATION_NAME,
          relationType,
      );
  }

  public createApp(spinalTwinApp: SpinalTwinApp | string): string {
    if (typeof spinalTwinApp === "string") spinalTwinApp = { name: spinalTwinApp };

    spinalTwinApp.type = SPINALAPP_TYPE;
    const appId = SpinalGraphService.createNode(spinalTwinApp, undefined);

    return appId;
}

}