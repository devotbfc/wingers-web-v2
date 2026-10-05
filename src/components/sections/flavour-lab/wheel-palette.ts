import type { Flavour } from "@/lib/flavours";

// Classification of each slice on the Flavour Lab wheels.
//   - "le"  → active limited-edition flavour: neon purple + glow + "LE" flicker tag
//   - "hot" → heat === 5: radial flame gradient + flame icon + flicker
//   - "palette" → everything else: alternates through the wheel's base palette
// Special kinds are rendered with fixed colours; palette slices fill in the
// remaining slots with a no-adjacent-same-colour rule (including last↔first).
// Special colours (purple, flame url) never match a palette fill, so they
// implicitly count as distinct colours in the adjacency check.
export type SliceKind = "le" | "hot" | "palette";

export interface SliceStyle {
  fill: string;
  text: string;
  kind: SliceKind;
}

// Must line up with the <radialGradient id="wheel-flame"> defined inside each
// wheel SVG. Named here so both wheels reference the same string.
export const WHEEL_FLAME_GRADIENT_ID = "wheel-flame";
export const LE_FILL = "var(--color-le-purple)";
export const HOT_FILL = `url(#${WHEEL_FLAME_GRADIENT_ID})`;
const WHITE_TEXT = "var(--color-brand-white)";

export function sliceKindFor(f: Flavour): SliceKind {
  if (f.status === "active" && f.limitedEdition) return "le";
  if (f.heat === 5) return "hot";
  return "palette";
}

// Fixed specials first, then fill palette slots with a greedy no-adjacency
// pass (prev neighbour + last↔first seam). Mirrors the previous
// pickWheelColorIndices behaviour, but with special slices pinned.
export function pickSliceStyles(
  segments: readonly Flavour[],
  palette: readonly SliceStyle[],
): SliceStyle[] {
  const n = segments.length;
  const paletteFills = palette.map((p) => p.fill);
  const result: SliceStyle[] = [];

  const specials: (SliceStyle | null)[] = segments.map((f) => {
    const k = sliceKindFor(f);
    if (k === "le") return { fill: LE_FILL, text: WHITE_TEXT, kind: "le" };
    if (k === "hot") return { fill: HOT_FILL, text: WHITE_TEXT, kind: "hot" };
    return null;
  });

  for (let i = 0; i < n; i++) {
    const pinned = specials[i];
    if (pinned !== null) {
      result.push(pinned);
      continue;
    }
    const prevFill = i > 0 ? result[i - 1].fill : null;
    const firstFill = i === n - 1 && n > 1 ? result[0].fill : null;
    const conflicts = (idx: number) => {
      const f = paletteFills[idx];
      return (
        (prevFill !== null && f === prevFill) ||
        (firstFill !== null && f === firstFill)
      );
    };
    let c = i % paletteFills.length;
    if (conflicts(c)) {
      for (let p = 0; p < paletteFills.length; p++) {
        if (!conflicts(p)) {
          c = p;
          break;
        }
      }
    }
    result.push({ fill: palette[c].fill, text: palette[c].text, kind: "palette" });
  }

  return result;
}

// Inline flame glyph (same path as FlameIcon) for use inside the wheel SVG.
// Drawn in a 24x24 viewBox — callers translate + scale into position.
export const WHEEL_FLAME_PATH =
  "M12 2.5c-.6 1.7-1.9 3-3 4.4-1.4 1.9-2.5 3.9-2.5 6.2 0 .9.5 1.6 1.2 1.9-.1-.6.1-1.3.6-1.9.9-1.1 1.5-1.7 1.7-2.9.4.9.8 1.8 1.6 2.5 1 .9 2.2 1.6 3.1 2.7.9 1.2 1.3 2.5 1.3 3.9 0 2.7-2.4 4.7-5 4.7s-5-2-5-4.7c0-1.6.6-3 1.4-4.3-1.1-1-1.9-2.4-1.9-4C5.5 8.5 8.8 5.6 12 2.5Z";
