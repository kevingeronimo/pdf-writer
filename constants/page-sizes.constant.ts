import type { MediaBox, PaperSize } from "../types/page.ts";

export const PAGE_SIZES: Record<PaperSize, MediaBox> = {
  Letter: { llx: 0, lly: 0, urx: 612, ury: 792 },
};
