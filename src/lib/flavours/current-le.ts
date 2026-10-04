import { FLAVOURS, type Flavour } from "./flavour-lab-data";

// Returns the single flavour that is currently live AND marked limited-edition.
// If multiple ever qualify at once, array order wins (deterministic — reorder
// FLAVOURS to resequence).
export function getCurrentLimitedEdition(): Flavour | null {
  return FLAVOURS.find((f) => f.status === "active" && f.limitedEdition) ?? null;
}
