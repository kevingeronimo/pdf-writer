import { PAGE_SIZES } from "../constants/page-sizes.constant.ts";
import { Page } from "../objects/page.object.ts";
import { Pages } from "../objects/pages.object.ts";
import type { ObjCounter } from "../utils/obj-counter.util.ts";

export class PageTreeBuilder {
  private readonly _leaves: Page[] = [];

  constructor(private _objCounter: ObjCounter, private _maxKids: number) {}

  addPage(): PageTreeBuilder {
    this._leaves.push(new Page(this._objCounter, PAGE_SIZES.Letter));
    return this;
  }

  build(): Pages {
    let parents = this._groupNodesIntoParents(this._leaves);

    while (parents.length > 1) {
      parents = this._groupNodesIntoParents(parents);
    }

    return parents.length === 1 ? parents[0] : new Pages(this._objCounter);
  }

  private _groupNodesIntoParents(nodes: (Pages | Page)[]): Pages[] {
    const newParents: Pages[] = [];

    for (let i = 0; i < nodes.length; i += this._maxKids) {
      const parent = new Pages(this._objCounter);
      parent.kids = nodes.slice(i, i + this._maxKids);

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
}
