import { IndirectObject } from "./indirect.object.ts";
import { Page } from "./page.object.ts";

export class Pages extends IndirectObject {
  parent: Pages | null = null;
  kids: (Pages | Page)[] = [];
  count = 0;

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

  static fromLeaves(
    leaves: Page[],
    maxKids: number,
  ): Pages {
    let parents = Pages._groupKids(leaves, maxKids);

    while (parents.length > 1) {
      parents = Pages._groupKids(parents, maxKids);
    }

    return parents.length === 1 ? parents[0] : new Pages();
  }

  private static _groupKids(
    kids: (Pages | Page)[],
    maxKids: number,
  ): Pages[] {
    const newParents: Pages[] = [];

    for (let i = 0; i < kids.length; i += maxKids) {
      const parent = new Pages();
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

  objRepr() {
    const dictFields = ["/Type /Pages"];

    if (this.parent) {
      dictFields.push(`/Parent ${this.parent.indirectRef}`);
    }
    dictFields.push(
      `/Kids [${this.kids.map((kid) => kid.indirectRef).join(" ")}]`,
    );
    dictFields.push(`/Count ${this.count}`);

    return `<< ${dictFields.join(" ")} >>`;
  }
}
