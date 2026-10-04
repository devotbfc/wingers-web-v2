// Idempotency key generator + cart-signature helper.
//
// Key must be retained across retries so the server returns the same payment
// intent, not a fresh order. Regenerate only when the submitted-payload
// signature changes. pickupMode/scheduledFor are deliberately excluded from
// the signature — the server allows updates on those without a new intent.

import type { CartLine } from "../cart/types";

export function newIdempotencyKey(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `web-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function cartSignature(
  lines: CartLine[],
  tender: "card" | "points",
  voucherId: string | null,
  promoCode: string | null,
): string {
  return JSON.stringify({
    lines: lines.map((l) => ({
      id: l.menuItemId,
      q: l.quantity,
      mods: [...l.selectedModifierIds].sort(),
      sauces: [...l.selectedSauceIds].sort(),
    })),
    tender,
    voucherId,
    promoCode,
  });
}
