import type { PageDimensions } from "./interfaces.ts";

enum PaperSize {
  Letter = "Letter",
}

export const STANDARD_PAGE_SIZES: Record<PaperSize, PageDimensions> = {
  [PaperSize.Letter]: { width: 612, height: 792 },
};
