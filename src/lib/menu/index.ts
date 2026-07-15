import { CATEGORIES, MENU } from "./menu-data";
import type { CategorySlug, LocationSlug, MenuItem } from "./types";

export type {
  Allergen,
  CategorySlug,
  LocationSlug,
  MenuCategory,
  MenuItem,
} from "./types";

export { CATEGORIES, MENU };

export function getItemsByCategory(categorySlug: CategorySlug): readonly MenuItem[] {
  return MENU.filter((item) => item.categorySlug === categorySlug);
}

export function getItemPrice(item: MenuItem, locationSlug: LocationSlug): number {
  return item.priceGbp[locationSlug];
}

export function isItemAvailable(item: MenuItem, locationSlug: LocationSlug): boolean {
  return !item.unavailableAt?.includes(locationSlug);
}
