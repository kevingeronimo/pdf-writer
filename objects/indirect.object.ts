import type { ObjectRef } from "../types/core.ts";
import type { ObjCounter } from "../utils/obj-counter.util.ts";

export class IndirectObject {
    readonly objNumber;

    constructor(objCounter: ObjCounter) {
        this.objNumber = objCounter.next();
    }

    get objRef(): ObjectRef {
        return `${this.objNumber} 0 R`;
    }

    obRepr(dictionary: string): string {
        return `${this.objNumber} 0 obj\n${dictionary}\nendobj`;
    }
}
