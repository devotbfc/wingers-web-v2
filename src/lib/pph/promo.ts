// Promo code resolution. Mirrors wing-app/src/lib/promo.ts.

import type { OrderItem } from "./types";

const WINGERS_FRIES_MENU_ITEM_ID = "ckitm00000000000000fries01";

export type PromoResult =
  | { discountPence: number; code: string | null; error?: never }
  | { error: string; discountPence: 0; code: null };

export function applyPromo(
  subtotalPence: number,
  items: OrderItem[],
  code: string,
): PromoResult {
  const normalised = code.trim().toUpperCase();
  if (normalised === "WINGERS10") {
    return { discountPence: Math.floor(subtotalPence * 0.1), code: "WINGERS10" };
  }
  if (normalised === "FREEFRIES") {
    const fries = items.find((i) => i.menuItemId === WINGERS_FRIES_MENU_ITEM_ID);
    if (!fries) {
      return { error: "Add fries to your basket to use this code.", discountPence: 0, code: null };
    }
    return { discountPence: fries.unitPricePence, code: "FREEFRIES" };
  }
  return { error: "That code isn't valid.", discountPence: 0, code: null };
}
