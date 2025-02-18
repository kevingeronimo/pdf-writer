import type { ObjCounter } from "../utils/obj-counter.util.ts";
import { IndirectObject } from "./indirect.object.ts";
import type { Page } from "./page.object.ts";

export class Pages extends IndirectObject {
  parent: Pages | null = null;
  kids: (Pages | Page)[] = [];
  count = 0;

  constructor(objCounter: ObjCounter) {
    super(objCounter);
  }

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

  override toString() {
    const dictFields = ["/Type /Pages"];

    if (this.parent) {
      dictFields.push(`/Parent ${this.parent.objRef}`);
    }
    dictFields.push(`/Kids [${this.kids.map((kid) => kid.objRef).join(" ")}]`);
    dictFields.push(`/Count ${this.count}`);

    return `${this.objNumber} 0 obj\n<< ${dictFields.join(" ")} >>\nendobj`;
  }
}
