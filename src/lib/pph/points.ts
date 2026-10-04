// Server-authoritative loyalty is the default; this helper is used ONLY by
// Checkout Order Summary + CheckoutConfirmSheet (per wing-app ADR-013
// carve-out). Copy MUST be rendered as "Earn N pts when you collect".

import type { CartLine } from "../cart/types";

export function estimatePointsFromLines(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + l.pointsValuePerUnit * l.quantity, 0);
}
