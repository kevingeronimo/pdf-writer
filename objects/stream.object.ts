import { IndirectObject } from "./indirect.object.ts";

export class StreamObject extends IndirectObject {
  objRepr(): string {
    const dictionary = "<< /Length 0 >>";
    const stream = "stream\nendstream";
    return `${dictionary}\n${stream}`;
  }
}
