import { MENU_SECTIONS } from "./menu-data";

export interface MenuGroup {
  slug: string;
  label: string;
  sectionSlugs: readonly string[];
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
    slug: "wings-tenders",
    label: "Wings & Tenders",
    sectionSlugs: ["wings-boneless-tenders"],
    showSubHeadings: false,
  },
  {
    slug: "chicken-burgers",
    label: "Chicken Burgers",
    sectionSlugs: ["chicken-burgers"],
    showSubHeadings: false,
  },
  {
    slug: "beef-burgers",
    label: "Beef Burgers",
    sectionSlugs: ["beef-burgers"],
    showSubHeadings: false,
  },
  {
    slug: "fries-loaded",
    label: "Fries & Loaded",
    sectionSlugs: ["fries-loaded", "chicken-loaded-fries"],
    showSubHeadings: true,
  },
  {
    slug: "sides-mac",
    label: "Sides & Mac",
    sectionSlugs: ["mac-and-cheese", "sides"],
    showSubHeadings: true,
  },
  {
    slug: "platters",
    label: "Platters",
    sectionSlugs: ["platters-combos"],
    showSubHeadings: false,
  },
  {
    slug: "dips",
    label: "Dips",
    sectionSlugs: ["dips"],
    showSubHeadings: false,
  },
  {
    slug: "drinks",
    label: "Drinks",
    sectionSlugs: ["shakes", "coolers"],
    showSubHeadings: true,
  },
  {
    slug: "sweets",
    label: "Sweets",
    sectionSlugs: ["churros", "nyc-cookies"],
    showSubHeadings: true,
  },
  {
    slug: "kids",
    label: "Kids",
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
