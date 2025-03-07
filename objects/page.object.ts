import type { MediaBox } from "../types/core.ts";
import type { ObjCounter } from "../utils/obj-counter.util.ts";
import { IndirectObject } from "./indirect.object.ts";
import type { Pages } from "./pages.object.ts";

export class Page extends IndirectObject {
  parent: Pages | null = null;

  constructor(objCounter: ObjCounter, private readonly _mediaBox: MediaBox) {
    super(objCounter);
  }

  objRepr(): string {
    const dictFields = ["/Type /Page"];

    if (this.parent) {
      dictFields.push(`/Parent ${this.parent.indirectRef}`);
    }
    dictFields.push(`/MediaBox [${this._mediaBox.join(" ")}]`);

    return `<< ${dictFields.join(" ")} >>`;
  }
}
