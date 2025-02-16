import { PAGE_SIZES } from "../constants.ts";
import type { MediaBox } from "../interfaces.ts";
import { Page } from "../objects/page.object.ts";
import { Pages } from "../objects/pages.object.ts";
import type { Counter } from "../util.ts";

export class PageTreeBuilder {
  private readonly _leaves: Page[] = [];

  constructor(private _counter: Counter, private _maxKids: number) {}

  addPage(): PageTreeBuilder {
    const urx = PAGE_SIZES.Letter.width;
    const ury = PAGE_SIZES.Letter.height;
    const mediaBox: MediaBox = { llx: 0, lly: 0, urx, ury };

    this._leaves.push(new Page(this._counter, mediaBox));
    return this;
  }

  build(): Pages {
    let parents = this._groupNodesIntoParents(this._leaves);

    while (parents.length > 1) {
      parents = this._groupNodesIntoParents(parents);
    }

    return parents.length === 1 ? parents[0] : new Pages(this._counter);
  }

  private _groupNodesIntoParents(nodes: (Pages | Page)[]): Pages[] {
    const newParents: Pages[] = [];

    for (let i = 0; i < nodes.length; i += this._maxKids) {
      const parent = new Pages(this._counter);
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
