import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isPphMode } from "@/lib/pph/mode";
import { pphAnton, pphDmSans } from "@/lib/pph/fonts";
import { PphProviders } from "@/components/pph/PphProviders";
import "./_pph.css";

// Anton + DM Sans mirror the wing-app theme (ADR-019). Loaded only within
// /order so the main marketing site keeps Bricolage + Inter untouched.
// The variables below are rebound to --font-display / --font-body inside
// `.pph-app` and `.pph-portal` by _pph.css — existing `font-display` /
// `font-body` Tailwind utilities Just Work in both subtrees.
//
// The font objects live in `@/lib/pph/fonts` so PphSheet (portalled into
// document.body, outside this wrapper) can re-attach the same `.variable`
// classes to its own portal panel.

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  if (!isPphMode()) notFound();
  return (
    <div className={`pph-outer ${pphAnton.variable} ${pphDmSans.variable}`}>
      <div className="pph-app mx-auto flex min-h-screen max-w-md flex-col">
        <PphProviders>{children}</PphProviders>
      </div>
    </div>
  );
}
