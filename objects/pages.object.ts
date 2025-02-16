import { objRepr } from "../utils.ts";
import type { Page } from "./page.object.ts";

export class Pages {
  parent: Pages | null = null;
  kids: (Pages | Page)[] = [];
  count = 0;

  constructor(public readonly objNumber: number) {}

  *[Symbol.iterator](): Generator<Pages | Page> {
    const stack: typeof this.kids = [this];
    for (let node = stack.pop(); node; node = stack.pop()) {
      yield node;
      if (node instanceof Pages) {
        for (let i = node.kids.length - 1; i >= 0; i--) {
          stack.push(node.kids[i]);
        }
      }
    }
  }

  toString(): string {
    const parentRef = this.parent
      ? ` /Parent ${this.parent.objNumber} 0 R `
      : " ";
    const kidsRef = this.kids.map((kid) => `${kid.objNumber} 0 R`).join(" ");

    const objContent =
      `<< /Type /Pages${parentRef}/Kids [${kidsRef}] /Count ${this.count} >>`;

    return objRepr(this.objNumber, objContent);
  }
}
