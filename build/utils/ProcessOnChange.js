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
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const throttle = require('lodash.throttle');
const debounce = require('lodash.debounce');
class ProcessOnChange extends spinal_core_connectorjs_type_1.Process {
    constructor(fctOnChange, option) {
        super(new spinal_core_connectorjs_type_1.Model, false);
        this._models = [];
        if (typeof option !== 'undefined') {
            if (option.type === 'debounce') {
                this.fctOnChange = debounce(fctOnChange, option.timeout, option.opt);
            }
            else if (option.type === 'throttle') {
                this.fctOnChange = throttle(fctOnChange, option.timeout, option.opt);
            }
            else {
                this.fctOnChange = fctOnChange;
            }
        }
        else {
            this.fctOnChange = fctOnChange;
        }
    }
    add(model, onChangeConstruction = true) {
        for (let idx = 0; idx < this._models.length; idx++) {
            const m = this._models[idx];
            if (m === model)
                return;
        }
        this._models.push(model);
        model.bind(this, onChangeConstruction);
    }
    remove(model) {
        for (let idx = 0; idx < this._models.length; idx++) {
            const element = this._models[idx];
            if (model === element) {
                const i = element._processes.indexOf(this);
                if (i >= 0) {
                    element._processes.splice(i, 1);
                }
                this._models.splice(idx, 1);
                return true;
            }
        }
        return false;
    }
    empty() {
        for (let idx = 0; idx < this._models.length; idx++) {
            const m = this._models[idx];
            const i = m._processes.indexOf(this);
            if (i >= 0) {
                m._processes.splice(i, 1);
            }
        }
        this._models = [];
    }
    onchange() {
        if (this.fctOnChange) {
            return this.fctOnChange();
        }
    }
}
exports.default = ProcessOnChange;
//# sourceMappingURL=ProcessOnChange.js.map