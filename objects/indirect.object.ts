import type { IndirectRef } from "../types/core.ts";
import type { ObjCounter } from "../utils/obj-counter.util.ts";

export abstract class IndirectObject {
  readonly objNumber;

  constructor(objCounter: ObjCounter) {
    this.objNumber = objCounter.next();
  }

  get indirectRef(): IndirectRef {
    return `${this.objNumber} 0 R`;
  }

  protected abstract objRepr(): string;

  toString(): string {
    return `${this.objNumber} 0 obj\n${this.objRepr()}\nendobj`;
  }
}
