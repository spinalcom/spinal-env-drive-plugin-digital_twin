export const knownExt = [
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

const mapRegExp: Map<string, RegExp> = new Map();
function init() {
  if (mapRegExp.size === 0) {
    for (let idxExt = 0; idxExt < knownExt.length; idxExt++) {
      const ext = knownExt[idxExt];
      mapRegExp.set(ext, new RegExp(`.+\.${ext}$`, 'i'));
    }
  }
}

export default function matchKnownExt(filename: string): boolean {
  init();
  for (const exp of mapRegExp.values()) {
    if (exp.test(filename) === true) return true;
  }
  return false;
}
