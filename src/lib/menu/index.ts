import { ALLERGEN_ITEMS, type AllergenItem } from "./allergen-data";
import { CATEGORIES, MENU } from "./menu-data";
import type { CategorySlug, LocationSlug, MenuItem } from "./types";

export type {
  Allergen,
  CategorySlug,
  LocationSlug,
  MenuCategory,
  MenuItem,
} from "./types";

export type { AllergenItem } from "./allergen-data";

export { CATEGORIES, MENU };
export { ALLERGEN_ITEMS, UK_ALLERGENS } from "./allergen-data";
export { ALLERGENS_ORDERED, ALLERGEN_LABELS } from "./allergen-labels";

export function getItemsByCategory(categorySlug: CategorySlug): readonly MenuItem[] {
  return MENU.filter((item) => item.categorySlug === categorySlug);
}

export function getItemPrice(item: MenuItem, locationSlug: LocationSlug): number {
  return item.priceGbp[locationSlug];
}

export function isItemAvailable(item: MenuItem, locationSlug: LocationSlug): boolean {
  return !item.unavailableAt?.includes(locationSlug);
}

/**
 * Returns the AllergenItem referenced by menu item's allergenSlug, or null when
 * the item has no printed-guide entry (e.g. plain drinks) or the slug is unknown.
 */
export function getAllergenInfoForItem(item: MenuItem): AllergenItem | null {
  if (!item.allergenSlug) return null;
  return ALLERGEN_ITEMS.find((a) => a.slug === item.allergenSlug) ?? null;
}
