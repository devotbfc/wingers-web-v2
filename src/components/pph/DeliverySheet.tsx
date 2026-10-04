"use client";

import { ExternalLink } from "lucide-react";
import { PphSheet, PphSheetContent } from "./PphSheet";

type DeliveryLinks = {
  deliverooUrl?: string | null;
  uberEatsUrl?: string | null;
  justEatUrl?: string | null;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  links: DeliveryLinks;
};

// Links are per-location (ADR-019 §delivery). The sheet only lists the
// aggregators that have been onboarded for the active shop; the menu-page
// trigger is hidden when all three are null, so there's no empty state
// here — a defensive filter still runs for correctness.
export function DeliverySheet({ open, onOpenChange, links }: Props) {
  const apps = [
    links.deliverooUrl ? { name: "Deliveroo", href: links.deliverooUrl } : null,
    links.uberEatsUrl ? { name: "Uber Eats", href: links.uberEatsUrl } : null,
    links.justEatUrl ? { name: "Just Eat", href: links.justEatUrl } : null,
  ].filter((x): x is { name: string; href: string } => x != null);

  return (
    <PphSheet open={open} onOpenChange={onOpenChange}>
      <PphSheetContent
        title="Get Wingers delivered"
        description="Delivery runs through our partners. Collect in-app to earn points."
      >
        {apps.length === 0 ? (
          <div className="py-6 text-center font-body text-[13px] text-pph-muted">
            Delivery isn&apos;t set up for this shop yet.
          </div>
        ) : (
          <ul className="flex flex-col gap-2">
            {apps.map((app) => (
              <li key={app.name}>
                <a
                  href={app.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[52px] items-center justify-between rounded-[16px] bg-pph-elevated px-4 py-3 font-display text-[15px] uppercase text-pph hover:opacity-90"
                >
                  {app.name}
                  <ExternalLink className="h-4 w-4 text-pph-muted" strokeWidth={1.5} />
                </a>
              </li>
            ))}
          </ul>
        )}
      </PphSheetContent>
    </PphSheet>
  );
}

export function hasDeliveryLinks(links: DeliveryLinks | null | undefined): boolean {
  if (!links) return false;
  return !!(links.deliverooUrl || links.uberEatsUrl || links.justEatUrl);
}
