import { objRepr } from "./utils.ts";

class Page {
  parent: Pages | null = null;

  constructor(public readonly objNumber: number) {}

  toString(): string {
    return `Page ${this.objNumber} with parent ${this.parent?.objNumber}`;
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
    this._leaves.push(new Page(this._objNumber++));
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
