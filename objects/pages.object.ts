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

  static buildTreeFromLeaves(leaves: Page[], maxChildren: number): Pages {
    let parents = Pages.groupChildren(leaves, maxChildren);

    while (parents.length > 1) {
      parents = Pages.groupChildren(parents, maxChildren);
    }

    return parents.length === 1 ? parents[0] : new Pages();
  }

  private static groupChildren(
    nodes: (Pages | Page)[],
    maxChildren: number,
  ): Pages[] {
    const newParents: Pages[] = [];

    for (let i = 0; i < nodes.length; i += maxChildren) {
      const parent = new Pages();
      parent.kids = nodes.slice(i, i + maxChildren);

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

  serialize() {
    const entries: string[] = [
      "/Type /Pages",
      this.parent ? `/Parent ${this.parent.ref}` : "",
      `/Kids [${this.kids.map((kid) => kid.ref).join(" ")}]`,
      `/Count ${this.count}`,
    ].filter(Boolean);

    return `<< ${entries.join(" ")} >>`;
  }
}
