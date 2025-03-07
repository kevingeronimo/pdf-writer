import { DirectObject } from "./direct.object.ts";

export class Text extends DirectObject {
    objRepr(): string {
        const text = "BT\n\nET";
        return text;
    }
}
