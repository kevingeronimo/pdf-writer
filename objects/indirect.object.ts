import type { IndirectRef } from "../types/core.ts";
import type { ObjCounter } from "../utils/obj-counter.util.ts";
import { DirectObject } from "./direct.object.ts";

export abstract class IndirectObject extends DirectObject {
  readonly objNumber;

  constructor(objCounter: ObjCounter) {
    super();
    this.objNumber = objCounter.next();
  }

  get indirectRef(): IndirectRef {
    return `${this.objNumber} 0 R`;
  }

  override toString(): string {
    return `${this.objNumber} 0 obj\n${this.objRepr()}\nendobj`;
  }
}
