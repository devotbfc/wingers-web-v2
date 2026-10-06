import { MENU_SECTIONS } from "./menu-data";

export type MenuProduct = "Wings" | "Boneless" | "Tenders";

export interface MenuGroup {
  slug: string;
  label: string;
  sectionSlugs: readonly string[];
  // When set, only items whose `product` is in this list contribute to the
  // group. Used to split the single wings-boneless-tenders section into two
  // app-style tabs: WINGS (Wings + Boneless) vs TENDERS (Tenders). Items are
  // not renamed or re-slugged in the data.
  productFilter?: readonly MenuProduct[];
  // Render each source section's name as a sub-heading inside the group when
  // the group bundles multiple sections, so items like "Chicken Loaded Fries"
  // and "Mac & Cheese" stay legible without their own pill.
  showSubHeadings: boolean;
}

// Display-only grouping — items keep their original sectionSlug and name.
// Only this list, the pill bar, and the group section rendering care about
// these buckets.
export const MENU_GROUPS: readonly MenuGroup[] = [
  {
    slug: "wings",
    label: "WINGS",
    sectionSlugs: ["wings-boneless-tenders"],
    productFilter: ["Wings", "Boneless"],
    showSubHeadings: false,
  },
  {
    slug: "tenders",
    label: "TENDERS",
    sectionSlugs: ["wings-boneless-tenders"],
    productFilter: ["Tenders"],
    showSubHeadings: false,
  },
  {
    slug: "burgers",
    label: "BURGERS",
    sectionSlugs: ["chicken-burgers", "beef-burgers"],
    showSubHeadings: true,
  },
  {
    slug: "fries",
    label: "FRIES",
    sectionSlugs: ["fries-loaded", "chicken-loaded-fries"],
    showSubHeadings: true,
  },
  {
    slug: "sides",
    label: "SIDES",
    sectionSlugs: ["sides", "mac-and-cheese"],
    showSubHeadings: true,
  },
  {
    slug: "platters",
    label: "PLATTERS",
    sectionSlugs: ["platters-combos"],
    showSubHeadings: false,
  },
  {
    slug: "dips",
    label: "DIPS",
    sectionSlugs: ["dips"],
    showSubHeadings: false,
  },
  {
    slug: "drinks",
    label: "DRINKS",
    sectionSlugs: ["shakes", "coolers"],
    showSubHeadings: true,
  },
  {
    slug: "desserts",
    label: "DESSERTS",
    sectionSlugs: ["churros", "nyc-cookies"],
    showSubHeadings: true,
  },
  {
    slug: "kids",
    label: "KIDS",
    sectionSlugs: ["kids"],
    showSubHeadings: false,
  },
] as const;

export const MENU_GROUP_IDS = Object.freeze(
  MENU_GROUPS.map((g) => `group-${g.slug}`)
);

// Dev-time sanity: every section in MENU_SECTIONS must appear in exactly one
// group. If a sheet regeneration adds a new section without us grouping it,
// this surfaces so we don't silently drop items from the menu.
if (process.env.NODE_ENV !== "production") {
  const grouped = new Set(MENU_GROUPS.flatMap((g) => g.sectionSlugs));
  const ungrouped = MENU_SECTIONS.filter((s) => !grouped.has(s.slug));
  if (ungrouped.length > 0) {
    console.warn(
      "[menu/groups] ungrouped sections — add to MENU_GROUPS:",
      ungrouped.map((s) => s.slug)
    );
  }
}
