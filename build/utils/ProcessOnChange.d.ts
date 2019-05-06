import { Process } from 'spinal-core-connectorjs_type';
export declare type fctOnChange = () => void;
export default class ProcessOnChange extends Process {
    private process_id;
    fctOnChange: fctOnChange;
    _models: spinal.Model[];
    constructor(fctOnChange: fctOnChange, option?: {
        type: 'debounce' | 'throttle';
        timeout: number;
        opt?: Object;
    });
    add(model: spinal.Model, onChangeConstruction?: boolean): void;
    remove(model: spinal.Model): boolean;
    empty(): void;
    onchange(): void;
}
