import type { MediaBox } from "../types/core.ts";
import { IndirectObject } from "./indirect.object.ts";
import type { Pages } from "./pages.object.ts";

export class Page extends IndirectObject {
  parent: Pages | null = null;

  constructor(private readonly _mediaBox: MediaBox) {
    super();
  }

  serialize(): string {
    const entries: string[] = [
      "/Type /Page",
      this.parent ? `/Parent ${this.parent.indirectRef}` : "",
      `/MediaBox [${this._mediaBox.join(" ")}]`,
    ].filter(Boolean);

    return `<< ${entries.join(" ")} >>`;
  }
}
