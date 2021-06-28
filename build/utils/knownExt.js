"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knownExt = void 0;
exports.knownExt = [
    '3DM',
    '3DS',
    'ASM',
    'CATPART',
    'CATPRODUCT',
    'CGR',
    'COLLABORATION',
    'DAE',
    'DGN',
    'DLV3',
    'DWF',
    'DWFX',
    'DWG',
    'DWT',
    'DXF',
    'EMODE',
    'EXP',
    'F2D',
    'F3D',
    'FBX',
    'G',
    'GBXML',
    'GLB',
    'GLTF',
    'IAM',
    'IDW',
    'IFC',
    'IGE',
    'IGES',
    'IGS',
    'IPT',
    'IWM',
    'JT',
    'MAX',
    'MODEL',
    'NEU',
    'NWC',
    'NWD',
    'OBJ',
    'PDF',
    'PMLPRJ',
    'PMLPRJZ',
    'PRT',
    'PSMODEL',
    'RCP',
    'RVT',
    'SAB',
    'SAT',
    'SESSION',
    'SKP',
    'SLDASM',
    'SLDPRT',
    'STE',
    'STEP',
    'STL',
    'STLA',
    'STLB',
    'STP',
    'STPZ',
    'WIRE',
    'X_B',
    'X_T',
    'XAS',
    'XPR',
    'ZIP',
];
const mapRegExp = new Map();
function init() {
    if (mapRegExp.size === 0) {
        for (let idxExt = 0; idxExt < exports.knownExt.length; idxExt++) {
            const ext = exports.knownExt[idxExt];
            mapRegExp.set(ext, new RegExp(`.+\.${ext}$`, 'i'));
        }
    }
}
function matchKnownExt(filename) {
    init();
    for (const exp of mapRegExp.values()) {
        if (exp.test(filename) === true)
            return true;
    }
    return false;
}
exports.default = matchKnownExt;
//# sourceMappingURL=knownExt.js.map