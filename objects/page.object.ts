import type { MediaBox } from "../interfaces.ts";
import { objRepr } from "../utils.ts";
import type { Pages } from "./pages.object.ts";

export class Page {
  parent: Pages | null = null;

  constructor(
    public readonly objNumber: number,
    private readonly _mediaBox: MediaBox,
  ) {}

  toString(): string {
    const parentRef = this.parent
      ? ` /Parent ${this.parent.objNumber} 0 R `
      : " ";

    const mediaBoxStr =
      `${this._mediaBox.llx} ${this._mediaBox.lly} ${this._mediaBox.urx} ${this._mediaBox.ury}`;

    const objContent =
      `<< /Type /Page /Parent${parentRef}/MediaBox [${mediaBoxStr}] /Contents 4 0 R >>`;

    return objRepr(this.objNumber, objContent);
  }
}
