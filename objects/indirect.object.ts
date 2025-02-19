import type { ObjectRef } from "../types/core.ts";
import type { ObjCounter } from "../utils/obj-counter.util.ts";

export class IndirectObject {
    private _objNumber;

    constructor(objCounter: ObjCounter) {
        this._objNumber = objCounter.next();
    }

    get objRef(): ObjectRef {
        return `${this._objNumber} 0 R`;
    }

    labeled(objRepr: string): string {
        return `${this._objNumber} 0 obj\n${objRepr}\nendobj`;
    }
}
