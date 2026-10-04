// Anton + DM Sans — shared across every /order entry point AND every pph
// Portal (sheets, future dialogs, toasts) so the font variable classes can
// be attached outside the main layout wrapper. Portalled nodes land under
// `<body>` and are OUTSIDE `src/app/order/layout.tsx`'s wrapper, so without
// re-attaching `anton.variable` / `dmSans.variable` on the portal content
// the `--font-anton` / `--font-dm-sans` variables don't resolve and the
// panel falls back to system fonts.

import { Anton, DM_Sans } from "next/font/google";

export const pphAnton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const pphDmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

// Convenience: the className string with both font variables, suitable for
// a portal panel/overlay.
export const pphFontVars = `${pphAnton.variable} ${pphDmSans.variable}`;
