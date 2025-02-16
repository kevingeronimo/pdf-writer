import { PageTreeBuilder } from "./builders/page-tree.builder.ts";
import { Counter } from "./util.ts";

const counter = new Counter();
const builder = new PageTreeBuilder(counter, 6);

for (let i = 0; i < 12; i++) {
  builder.addPage();
}

const root = builder.build();

for (const node of root) {
  console.log(node.toString());
}
