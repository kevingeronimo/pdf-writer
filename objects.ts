import { STANDARD_PAGE_SIZES } from "./constants.ts";
import type { MediaBox } from "./interfaces.ts";
import { objRepr } from "./utils.ts";

class Page {
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

class Pages {
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

class PagesBuilder {
  private readonly _leaves: Page[] = [];
  private _maxKids = 6;
  private _count = 0;

  constructor(private _objNumber: number) {}

  addPage(): PagesBuilder {
    const urx = STANDARD_PAGE_SIZES.Letter.width;
    const ury = STANDARD_PAGE_SIZES.Letter.height;
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

const builder = new PagesBuilder(0);

for (let i = 0; i < 12; i++) {
  builder.addPage();
}

const root = builder.build();

for (const node of root) {
  console.log(node.toString());
}
