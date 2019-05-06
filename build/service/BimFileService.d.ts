declare const BIM_FILE_CONTEXT_NAME = "BimFileContext";
declare const BIM_FILE_RELATION = "hasBimFile";
declare const BIM_FILE_TYPE = "BimFile";
import { FileVersionModel } from 'spinal-model-file_version_model';
import ProcessOnChange from '../utils/ProcessOnChange';
import { SpinalNode, SpinalNodePointer } from 'spinal-env-viewer-graph-service';
interface SpinalNodeRef extends spinal.Model {
    childrenIds: string[];
    contextIds: string[];
    element: SpinalNodePointer<spinal.Model>;
    hasChildren: boolean;
    [key: string]: any;
}
export declare type AssetFile = {
    nodeId: string;
    name: string;
    FileVersionModel: FileVersionModel;
};
export default class BimFileService {
    processOnChange: ProcessOnChange;
    constructor(fct?: () => void);
    resetProcess(): void;
    setOnChange(fct: () => void): void;
    addToProces(node: string | spinal.Str | SpinalNode | SpinalNodeRef, check?: boolean): void;
    getContextID(): Promise<string>;
    getAssetFiles(): Promise<AssetFile[]>;
    removeAssetFile(nodeID: string): Promise<void>;
    setState(node: any, state: any): Promise<void>;
    convertAsssetFile(nodeID: string): Promise<void>;
    addAssetFile(file: spinal.File<any>): Promise<void>;
}
export { BimFileService, BIM_FILE_CONTEXT_NAME, BIM_FILE_RELATION, BIM_FILE_TYPE, };
