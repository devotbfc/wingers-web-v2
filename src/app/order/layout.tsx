import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isPphMode } from "@/lib/pph/mode";
import { PphProviders } from "@/components/pph/PphProviders";
import { OrderChrome } from "./OrderChrome";
import "./_pph.css";

// Scoped exception (ADR-019 + 2026-10-04 amendment, revised): /order/*
// mirrors the wing-app's layout, pill buttons and sheet shape on the main
// site's light palette, but inherits the site's typography (Bricolage
// Grotesque + Inter) so the shared NavBar/Footer rendered via OrderChrome
// read as part of wingers.co. Anton + DM Sans remain app-only.
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
    <div className="pph-outer">
      <PphProviders>
        <div className="pph-app flex min-h-screen flex-col">
          <OrderChrome>{children}</OrderChrome>
        </div>
      </PphProviders>
    </div>
  );
}
