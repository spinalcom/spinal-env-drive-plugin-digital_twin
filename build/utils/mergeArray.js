"use strict";
/*
 * Copyright 2018 SpinalCom - www.spinalcom.com
 *
 * This file is part of SpinalCore.
 *
 * Please read all of the following terms and conditions
 * of the Free Software license Agreement ("Agreement")
 * carefully.
 *
 * This Agreement is a legally binding contract between
 * the Licensee (as defined below) and SpinalCom that
 * sets forth the terms and conditions that govern your
 * use of the Program. By installing and/or using the
 * Program, you agree to abide by all the terms and
 * conditions stated or referenced herein.
 *
 * If you do not agree to abide by these terms and
 * conditions, do not demonstrate your acceptance and do
 * not install or use the Program.
 * You should have received a copy of the license along
 * with this file. If not, see
 * <http://resources.spinalcom.com/licenses.pdf>.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function mergeArray(orig, to, comparator = (orig, to) => orig === to, updateFct = (orig, to) => {
    for (const key in orig) {
        if (orig.hasOwnProperty(key)) {
            orig[key] = to[key];
        }
    }
}, sortFn = (orig, to) => orig - to) {
    const toAdd = to.filter(x => orig.findIndex((el) => comparator(el, x)) === -1);
    const [toRm, toUpdate] = orig.reduce((res, x) => {
        const idx = to.findIndex((el) => comparator(el, x));
        if (idx >= 0) {
            res[1].push([x, to[idx]]);
        }
        else {
            res[0].push(x);
        }
        return res;
    }, [[], []]);
    if (toRm.length === orig.length) {
        orig.splice(0, orig.length);
    }
    else {
        toRm.forEach((elemToRm) => {
            const idxToRm = orig.findIndex((el) => comparator(el, elemToRm));
            orig.splice(idxToRm, 1);
        });
    }
    toAdd.forEach((elemToAdd) => orig.push(elemToAdd));
    toUpdate.forEach((el) => updateFct(el[0], el[1]));
    orig.sort(sortFn);
}
exports.default = mergeArray;
//# sourceMappingURL=mergeArray.js.map