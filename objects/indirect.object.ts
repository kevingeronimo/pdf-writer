import type { IndirectRef } from "../types/core.ts";
import type { ObjCounter } from "../utils/obj-counter.util.ts";

export abstract class IndirectObject {
    private _objNumber;

    constructor(objCounter: ObjCounter) {
        this._objNumber = objCounter.next();
    }

    get indirectRef(): IndirectRef {
        return `${this._objNumber} 0 R`;
    }

    protected withLabel(objRepr: string): string {
        return `${this._objNumber} 0 obj\n${objRepr}\nendobj`;
    }
}
