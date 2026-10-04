// Cart line type. Mirrors wing-app/src/stores/cart.ts without zustand.

export type CartLine = {
  // Stable local id so React keys are consistent across reorders. The server
  // never sees this — only menuItemId/mods/sauces/quantity are submitted.
  lineId: string;
  menuItemId: string;
  name: string;
  unitPricePence: number;
  pointsValuePerUnit: number;
  pointsPricePerUnit: number | null;
  quantity: number;
  selectedModifierIds: string[];
  selectedSauceIds: string[];
  modifierLabels: string[];
  sauceLabels: string[];
};
