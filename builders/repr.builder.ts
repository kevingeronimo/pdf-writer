import type { MediaBox, ObjectRef } from "../interfaces.ts";

export class ReprBuilder {
    private readonly _dictValues: string[] = [];

    constructor(private readonly _objNumber: number) {}

    addType(type: 'Pages' | 'Page'): ReprBuilder {
        this._dictValues.push(`/Type /${type}`);
        return this;
    }

    addParent(parent: ObjectRef): ReprBuilder {
        this._dictValues.push(`/Parent ${parent.objNumber} 0 R`);
        return this;
    }

    addKids(kids: ObjectRef[]): ReprBuilder {
        const kidsRef = kids.map((kid) => `${kid.objNumber} 0 R`).join(" ");
        this._dictValues.push(`/Kids [${kidsRef}]`);
        return this;
    }
    
    addMediaBox(mediaBox: MediaBox): ReprBuilder {
        const mediaBoxStr = `${mediaBox.llx} ${mediaBox.lly} ${mediaBox.urx} ${mediaBox.ury}`;
        this._dictValues.push(`/MediaBox [${mediaBoxStr}]`);
        return this;
    }

    addCount(count: number): ReprBuilder {
        this._dictValues.push(`/Count ${count}`);
        return this;
    }

    build(): string {
        const objContent = `<< ${this._dictValues.join(" ")} >>`;
        return `${this._objNumber} 0 obj\n${objContent}\nendobj`;
    }
}
