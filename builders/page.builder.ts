import { PAGE_SIZES } from "../constants.ts";
import type { MediaBox } from "../interfaces.ts";
import { Page } from "../objects/page.object.ts";
import { Pages } from "../objects/pages.object.ts";

export class PagesBuilder {
  private readonly _leaves: Page[] = [];
  private _maxKids = 6;
  private _count = 0;

  constructor(private _objNumber: number) {}

  addPage(): PagesBuilder {
    const urx = PAGE_SIZES.Letter.width;
    const ury = PAGE_SIZES.Letter.height;
    const mediaBox: MediaBox = { llx: 0, lly: 0, urx, ury };

    this._leaves.push(new Page(this._objNumber++, mediaBox));
    return this;
  }

  build(): Pages {
    let parents = this._groupNodesIntoParents(this._leaves);

    while (parents.length > 1) {
      parents = this._groupNodesIntoParents(parents);
    }

    return parents.length === 1 ? parents[0] : new Pages(this._objNumber++);
  }

  private _groupNodesIntoParents(nodes: (Pages | Page)[]): Pages[] {
    const newParents: Pages[] = [];

    for (let i = 0; i < nodes.length; i += this._maxKids) {
      const parent = new Pages(this._objNumber++);
      parent.kids = nodes.slice(i, i + this._maxKids);
      this._count += parent.kids.length;
      parent.count = this._count;

      for (const kid of parent.kids) {
        kid.parent = parent;
      }

      newParents.push(parent);
    }
    return newParents;
  }
}
