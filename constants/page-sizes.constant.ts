import type { MediaBox, PaperSize } from "../types/page.ts";

export const PAGE_SIZES: Record<PaperSize, MediaBox> = {
  Letter: [0, 0, 612, 792],
};
