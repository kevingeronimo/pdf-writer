import type { PageDimensions } from "./interfaces.ts";

type PaperSize = "Letter";

export const PAGE_SIZES: Record<PaperSize, PageDimensions> = {
  Letter: { width: 612, height: 792 },
};
