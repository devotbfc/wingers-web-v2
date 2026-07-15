/**
 * Location slugs mirror src/lib/locations/locations-data.ts. Duplicated here as a
 * literal union so per-location price + availability maps are strictly typed
 * without forcing Location.slug itself to become a union across the codebase.
 * If a shop is added or removed, update BOTH files.
 */
export type LocationSlug = "milton-keynes" | "northampton";

export type CategorySlug =
  | "wings"
  | "tenders"
  | "burgers"
  | "loaded-fries"
  | "sides"
  | "drinks";

/**
 * The 14 UK FSA statutory allergens. Structured — never a description string.
 * Consumed by /allergies (Phase C+). Any buttermilk-brined item MUST include
 * "milk" and "gluten".
 */
export type Allergen =
  | "gluten"
  | "milk"
  | "eggs"
  | "soya"
  | "sesame"
  | "peanuts"
  | "tree-nuts"
  | "celery"
  | "mustard"
  | "lupin"
  | "sulphites"
  | "fish"
  | "crustaceans"
  | "molluscs";

export interface MenuItem {
  slug: string;
  lastUpdated: string;
  name: string;
  description: string;
  categorySlug: CategorySlug;
  priceGbp: Record<LocationSlug, number>;
  /**
   * References an AllergenItem.slug in src/lib/menu/allergen-data.ts.
   * Single source of truth for allergens — never store contains/traces here.
   * Unset when no printed-guide entry exists (e.g. plain drinks).
   */
  allergenSlug?: string;
  calories?: number;
  spiceLevel?: 0 | 1 | 2 | 3;
  isVegan?: boolean;
  isVegetarian?: boolean;
  isHalal?: boolean;
  isSignature?: boolean;
  image?: string;
  imageAlt?: string;
  unavailableAt?: LocationSlug[];
  /** Flags data that still needs to be replaced before launch. Greppable. */
  dataTodo?: readonly ("content" | "price" | "allergens")[];
}

export interface MenuCategory {
  slug: CategorySlug;
  lastUpdated: string;
  name: string;
  description?: string;
}
