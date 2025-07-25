export abstract class DirectObject {
  protected abstract serialize(): string;

  toString(): string {
    return this.serialize();
  }
}
