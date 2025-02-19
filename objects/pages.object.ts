import type { ObjCounter } from "../utils/obj-counter.util.ts";
import { IndirectObject } from "./indirect.object.ts";
import { Page } from "./page.object.ts";

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

  static fromKids(kids: Page[], maxKids: number, objCounter: ObjCounter): Pages {
    let parents = Pages._groupKids(kids, maxKids, objCounter);

    while (parents.length > 1) {
      parents = Pages._groupKids(parents, maxKids, objCounter);
    }

    return parents.length === 1 ? parents[0] : new Pages(objCounter);
  }

  private static _groupKids(kids: (Pages | Page)[], maxKids: number, objCounter: ObjCounter): Pages[] {
    const newParents: Pages[] = [];

    for (let i = 0; i < kids.length; i += maxKids) {
      const parent = new Pages(objCounter);
      parent.kids = kids.slice(i, i + maxKids);

      for (const kid of parent.kids) {
        kid.parent = parent;

        if (kid instanceof Page) {
          parent.count += 1;
        }

        if (kid instanceof Pages) {
          parent.count += kid.count;
        }
      }

      newParents.push(parent);
    }
    return newParents;
  }

  override toString() {
    const dictFields = ["/Type /Pages"];

    if (this.parent) {
      dictFields.push(`/Parent ${this.parent.objRef}`);
    }
    dictFields.push(`/Kids [${this.kids.map((kid) => kid.objRef).join(" ")}]`);
    dictFields.push(`/Count ${this.count}`);

    const dictionary = `<< ${dictFields.join(" ")} >>`;
    return this.labeled(dictionary);
  }
}
