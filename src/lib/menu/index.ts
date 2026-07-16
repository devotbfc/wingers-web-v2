import {
  FLAVOUR_SHOWCASE,
  MENU_ITEMS,
  MENU_SECTIONS,
  isCurrentLE,
  type FlavourShowcaseItem,
  type MenuItem,
  type MenuSize,
} from "./menu-data";

export {
  FLAVOUR_SHOWCASE,
  MENU_ITEMS,
  MENU_SECTIONS,
  isCurrentLE,
};
export type { FlavourShowcaseItem, MenuItem, MenuSize };

export type { Allergen, AllergenItem } from "./allergen-data";
export { ALLERGEN_ITEMS, UK_ALLERGENS } from "./allergen-data";
export { ALLERGENS_ORDERED, ALLERGEN_LABELS } from "./allergen-labels";

/** MK = Milton Keynes, NN = Northampton — the codes menu-data uses for per-location fields. */
export type MenuLocationCode = "MK" | "NN";

/**
 * Bridges the site-wide Location.slug ('milton-keynes' | 'northampton') to the
 * two-letter codes menu-data uses (priceMK/priceNN, unavailableAt: 'MK'|'NN').
 */
export function toMenuLocationCode(locationSlug: string): MenuLocationCode {
  return locationSlug === "milton-keynes" ? "MK" : "NN";
}

/** Human section label, derived from MENU_SECTIONS when the item omits sectionName. */
export function getSectionName(item: MenuItem): string {
  if (item.sectionName) return item.sectionName;
  const section = MENU_SECTIONS.find((s) => s.slug === item.sectionSlug);
  return section?.name ?? item.sectionSlug;
}

/** Direct price for a location — null if the item isn't priced there. */
export function getPriceFor(item: MenuItem, code: MenuLocationCode): number | null {
  return code === "MK" ? item.priceMK : item.priceNN;
}

/** True unless the item is explicitly marked unavailable at this location. */
export function isItemAvailableAt(item: MenuItem, code: MenuLocationCode): boolean {
  return item.unavailableAt !== code;
}

/**
 * Choose the price to display on the card:
 *  - if item has priceMK/priceNN, use that location's value ("£X.XX")
 *  - else if item has fromPrice (wings/boneless/tenders), show "from £X.XX"
 *  - else return null (no price surfaced)
 */
export function getPriceLabel(item: MenuItem, code: MenuLocationCode): string | null {
  const direct = getPriceFor(item, code);
  if (direct != null) return `£${direct.toFixed(2)}`;
  if (item.fromPrice != null) return `from £${item.fromPrice.toFixed(2)}`;
  return null;
}
