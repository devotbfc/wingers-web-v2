import type { Allergen } from "./types";

/**
 * Display order for the 14 UK statutory allergens.
 * Shared between /allergies (column order) and /menu (badge list order).
 */
export const ALLERGENS_ORDERED: readonly Allergen[] = [
  "gluten",
  "milk",
  "eggs",
  "soya",
  "sesame",
  "peanuts",
  "tree-nuts",
  "celery",
  "mustard",
  "lupin",
  "sulphites",
  "fish",
  "crustaceans",
  "molluscs",
];

export const ALLERGEN_LABELS: Record<Allergen, string> = {
  gluten: "Gluten",
  milk: "Milk",
  eggs: "Eggs",
  soya: "Soya",
  sesame: "Sesame",
  peanuts: "Peanuts",
  "tree-nuts": "Tree nuts",
  celery: "Celery",
  mustard: "Mustard",
  lupin: "Lupin",
  sulphites: "Sulphites",
  fish: "Fish",
  crustaceans: "Crustaceans",
  molluscs: "Molluscs",
};
