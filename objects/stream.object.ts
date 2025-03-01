import type { ObjCounter } from "../utils/obj-counter.util.ts";
import { IndirectObject } from "./indirect.object.ts";

export class StreamObject extends IndirectObject {
  constructor(objCounter: ObjCounter) {
    super(objCounter);
  }

  override toString(): string {
    const dictionary = "<< /Length 0 >>";
    const stream = "stream\nendstream";
    return this.withLabel(`${dictionary}\n${stream}`);
  }
}
