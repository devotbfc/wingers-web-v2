import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isPphMode } from "@/lib/pph/mode";
import { pphAnton, pphDmSans } from "@/lib/pph/fonts";
import { PphProviders } from "@/components/pph/PphProviders";
import { OrderChrome } from "./OrderChrome";
import "./_pph.css";

// Scoped exception (ADR-019 + 2026-10-04 amendment): /order/* loads the
// wing-app's Anton + DM Sans faces inside the `.pph-app` wrapper and lays
// out components with pill buttons on the site's light palette. The
// marketing site above continues to use Bricolage + Inter.
//
// Chrome (NavBar / Footer / focused-checkout header) is applied inside
// `OrderChrome` because it branches on pathname — layouts are server by
// default and can't call `usePathname`.

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  if (!isPphMode()) notFound();
  return (
    <div className={`pph-outer ${pphAnton.variable} ${pphDmSans.variable}`}>
      <PphProviders>
        <div className="pph-app flex min-h-screen flex-col">
          <OrderChrome>{children}</OrderChrome>
        </div>
      </PphProviders>
    </div>
  );
}
