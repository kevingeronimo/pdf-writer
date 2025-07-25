import type { IndirectRef } from "../types/core.ts";
import { DirectObject } from "./direct.object.ts";

export abstract class IndirectObject extends DirectObject {
  readonly id;
  private static count = 0;

  constructor() {
    super();
    IndirectObject.count++;
    this.id = IndirectObject.count;
  }

  get ref(): IndirectRef {
    return `${this.id} 0 R`;
  }

  override toString(): string {
    return `${this.id} 0 obj\n${this.serialize()}\nendobj`;
  }
}
