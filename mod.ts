import { PageTreeBuilder } from "./builders/page-tree.builder.ts";

const builder = new PageTreeBuilder(0);

for (let i = 0; i < 12; i++) {
  builder.addPage();
}

const root = builder.build();

for (const node of root) {
  console.log(node.toString());
}
