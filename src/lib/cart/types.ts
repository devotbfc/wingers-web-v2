// Cart line type. Mirrors wing-app/src/stores/cart.ts without zustand.

export type CartLine = {
  // Stable local id so React keys are consistent across reorders. The server
  // never sees this — only menuItemId/mods/sauces/quantity are submitted.
  lineId: string;
  menuItemId: string;
  name: string;
  // Cached from the MenuItem at add-time so basket + checkout can render
  // thumbnails without re-hitting the menu (which is fine, but means the
  // basket page doesn't need to fetch the menu to display rows).
  imageUrl: string | null;
  unitPricePence: number;
  pointsValuePerUnit: number;
  pointsPricePerUnit: number | null;
  quantity: number;
  selectedModifierIds: string[];
  selectedSauceIds: string[];
  modifierLabels: string[];
  sauceLabels: string[];
};
