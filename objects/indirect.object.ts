import type { IndirectRef } from "../types/core.ts";
import { DirectObject } from "./direct.object.ts";

export abstract class IndirectObject extends DirectObject {
  readonly objNumber;
  private static _count = 0;

  constructor() {
    super();
    IndirectObject._count++;
    this.objNumber = IndirectObject._count;
  }

  get indirectRef(): IndirectRef {
    return `${this.objNumber} 0 R`;
  }

  override toString(): string {
    return `${this.objNumber} 0 obj\n${this.serialize()}\nendobj`;
  }
}
