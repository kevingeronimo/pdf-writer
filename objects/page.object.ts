import { ReprBuilder } from "../builders/repr.builder.ts";
import type { ObjectRef } from "../types/core.ts";
import type { MediaBox } from "../types/page.ts";
import type { ObjCounter } from "../utils/obj-counter.util.ts";
import type { Pages } from "./pages.object.ts";

export class Page implements ObjectRef {
  readonly objNumber: number;
  parent: Pages | null = null;

  constructor(objCounter: ObjCounter, private readonly _mediaBox: MediaBox) {
    this.objNumber = objCounter.next();
  }

  toString(): string {
    const reprBuilder = new ReprBuilder(this.objNumber);
    reprBuilder.addType("Page");

    if (this.parent) {
      reprBuilder.addParent(this.parent);
    }

    reprBuilder.addMediaBox(this._mediaBox);
    return reprBuilder.build();
  }
}
