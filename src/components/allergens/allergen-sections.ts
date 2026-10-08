import { ALLERGEN_ITEMS, type AllergenItem } from "@/lib/menu";

export interface AllergenSectionGroup {
  section: string;
  sectionSlug: string;
  items: AllergenItem[];
}

// Rolls ALLERGEN_ITEMS (declared in sectionSlug order) into contiguous
// section groups. Shared by MatrixTable, AllergenMatrix (client) and the
// Suspense fallback so the matrix shape is identical across all three
// render paths.
export const ALLERGEN_SECTIONS: readonly AllergenSectionGroup[] = ALLERGEN_ITEMS.reduce<AllergenSectionGroup[]>(
  (acc, item) => {
    const last = acc[acc.length - 1];
    if (last && last.sectionSlug === item.sectionSlug) {
      last.items.push(item);
    } else {
      acc.push({
        section: item.section,
        sectionSlug: item.sectionSlug,
        items: [item],
      });
    }
    return acc;
  },
  [],
);
