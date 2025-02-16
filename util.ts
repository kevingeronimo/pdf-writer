export class Counter {
  private _count: number = 0;

  get count(): number {
    return this._count;
  }

  next(): number {
    return ++this._count;
  }
}
