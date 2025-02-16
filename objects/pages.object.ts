import { ReprBuilder } from "../builders/repr.builder.ts";
import type { ObjectRef } from "../interfaces.ts";
import type { Page } from "./page.object.ts";

export class Pages implements ObjectRef {
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
    const reprBuilder = new ReprBuilder(this.objNumber);
    reprBuilder.addType("Pages");

    if (this.parent) {
      reprBuilder.addParent(this.parent);
    }
    
    reprBuilder.addKids(this.kids);
    reprBuilder.addCount(this.count);
    return reprBuilder.build();
  }
}
