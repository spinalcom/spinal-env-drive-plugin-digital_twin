import { UserInterface } from 'spinal-models-user/declarations/SpinalUser';
import 'spinal-core-connectorjs_type';
export declare class ServiceUser {
    createUser(url: any, user: UserInterface): void;
    getUserByID(id: string): void;
    getAllUser(contextId: string): void;
    getUser(id: string, email?: string, password?: string): void;
    addNode(userId: string, childId: string, relationName: string, relationType: string): void;
    findEmail(email: string): void;
    addUserProfileToUser(userId: string, userProfileId: string): void;
}
