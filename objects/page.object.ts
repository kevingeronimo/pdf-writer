import type { MediaBox } from "../types/core.ts";
import { IndirectObject } from "./indirect.object.ts";
import type { Pages } from "./pages.object.ts";

export class Page extends IndirectObject {
  parent: Pages | null = null;

  constructor(private readonly _mediaBox: MediaBox) {
    super();
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
