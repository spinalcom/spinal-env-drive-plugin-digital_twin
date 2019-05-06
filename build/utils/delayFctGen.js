"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const Q = require('q');
const promiseDelayFctMap = new Map();
function delayFctGen(fct, timeout) {
    return () => {
        if (promiseDelayFctMap.has(fct)) {
            return promiseDelayFctMap.get(fct).promise;
        }
        const defer = Q.defer();
        promiseDelayFctMap.set(fct, defer);
        setTimeout(() => {
            promiseDelayFctMap.delete(fct);
            defer.resolve(fct());
        }, timeout);
        return defer.promise;
    };
}
exports.default = delayFctGen;
//# sourceMappingURL=delayFctGen.js.map