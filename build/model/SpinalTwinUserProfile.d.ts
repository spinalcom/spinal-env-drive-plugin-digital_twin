import { SpinalTwinRole } from './SpinalTwinRole';
export interface SpinalTwinUserProfile {
    id?: string;
    name?: string;
    level?: number;
    roleList?: SpinalTwinRole[];
    [key: string]: any;
}
