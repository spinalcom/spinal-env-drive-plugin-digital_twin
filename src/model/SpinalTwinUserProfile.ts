import { Model } from 'spinal-core-connectorjs_type';
import { SpinalTwinRole } from './SpinalTwinRole';

const spinalCore = require('spinal-core-connectorjs');

export interface SpinalTwinUserProfile {
  id? :string;
  name? :string;
  level? :number;
  roleList?: SpinalTwinRole[];
  [key: string]: any;
}
