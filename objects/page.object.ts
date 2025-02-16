import { ReprBuilder } from "../builders/repr.builder.ts";
import type { MediaBox, ObjectRef } from "../interfaces.ts";
import type { Pages } from "./pages.object.ts";

export class Page implements ObjectRef {
  parent: Pages | null = null;

  constructor(
    public readonly objNumber: number,
    private readonly _mediaBox: MediaBox,
  ) {}

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
