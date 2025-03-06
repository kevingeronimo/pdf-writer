import { PAGE_SIZES } from "./constants/page-sizes.constant.ts";
import { Page } from "./objects/page.object.ts";
import { Pages } from "./objects/pages.object.ts";
import { ObjCounter } from "./utils/obj-counter.util.ts";

const counter = new ObjCounter();
const kids: Page[] = []

for (let i = 0; i < 12; i++) {
  kids.push(new Page(counter, PAGE_SIZES.Letter));
}

const pages = Pages.fromLeaves(counter, kids, 6);

// Deno.bench("Write Execution time", () => {
//   const pages = Pages.fromKids(kids, 6, counter);
// });

// Deno.bench("Read Execution time", () => {
//   for (const _node of pages) {}
// });

for (const node of pages) {
  console.log(node.toString());
}
