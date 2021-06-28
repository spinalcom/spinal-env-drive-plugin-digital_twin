import { Model } from 'spinal-core-connectorjs_type';

const spinalCore = require('spinal-core-connectorjs');

export interface SpinalTwinApp {
  id? :string;
  name? :string;
  type? :string;
  [key: string]: any;
}
