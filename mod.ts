import { PageTreeBuilder } from "./builders/page-tree.builder.ts";
import { ObjCounter } from "./utils/obj-counter.util.ts";

const counter = new ObjCounter();
const builder = new PageTreeBuilder(counter, 6);

for (let i = 0; i < 12; i++) {
  builder.addPage();
}

const root = builder.build();

// Deno.bench("Write Execution time", () => {
//   builder.build();
// });

// Deno.bench("Read Execution time", () => {
//   for (const _node of root) {}
// });

for (const node of root) {
  console.log(node.toString());
}
