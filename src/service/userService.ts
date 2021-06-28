import { SpinalGraphService } from 'spinal-env-viewer-graph-service';
import { UserInterface } from 'spinal-models-user/declarations/SpinalUser';
import 'spinal-core-connectorjs_type';

export class ServiceUser {

  public createUser(url: any, user: UserInterface){};
  

  public getUserByID(id: string) {};

  public getAllUser(contextId: string) {};

  public getUser(id: string, email?: string, password?: string) {};

  public addNode(userId: string, childId: string, relationName: string, relationType: string) {} ;

  public findEmail(email: string) {};

  public addUserProfileToUser(userId: string, userProfileId: string) {};

}

