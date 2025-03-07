export abstract class DirectObject {
    protected abstract objRepr(): string;

    toString(): string {
        return this.objRepr();
    }
}
