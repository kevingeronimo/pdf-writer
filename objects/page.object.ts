import { ReprBuilder } from "../builders/repr.builder.ts";
import type { MediaBox, ObjectRef } from "../interfaces.ts";
import type { Counter } from "../util.ts";
import type { Pages } from "./pages.object.ts";

export class Page implements ObjectRef {
  readonly objNumber: number;
  parent: Pages | null = null;

  constructor(counter: Counter, private readonly _mediaBox: MediaBox) {
    this.objNumber = counter.next();
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
