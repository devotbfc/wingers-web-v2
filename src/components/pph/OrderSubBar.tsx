"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Dot } from "lucide-react";
import { useCart } from "@/lib/cart/context";
import { useLocations } from "@/lib/pph/hooks";
import { useOrderStack } from "@/lib/order-stack/context";
import { headlineForStatus } from "@/lib/pph/order-status";
import { LocationSheet } from "./LocationSheet";

// Slim sticky bar beneath the site NavBar on /order browse pages. Carries
// the pickup location (opens LocationSheet) and an active-order pill when
// a non-terminal order is in flight. Mounts the LocationSheet locally so
// every browse page gets the switcher without each one wiring it up.
export function OrderSubBar() {
  const { state, setLocation } = useCart();
  const { locations } = useLocations();
  const { active } = useOrderStack();
  const [sheetOpen, setSheetOpen] = useState(false);

  const activeLocation = locations.find((l) => l.id === state.locationId) ?? null;
  const topActive =
    active.find((o) => o.status !== "collected" && o.status !== "cancelled") ?? null;

  return (
    <>
      <div className="sticky top-20 md:top-24 z-30 border-b border-brand-black/10 bg-brand-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-12 w-full max-w-md items-center gap-3 px-4 lg:max-w-7xl lg:px-8">
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="inline-flex min-w-0 flex-1 items-center gap-1.5 font-display text-[13px] uppercase tracking-wide text-brand-black hover:text-brand-red focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
          >
            <span className="text-brand-black/60">Pickup ·</span>
            <span className="truncate">
              {activeLocation ? shortName(activeLocation.name) : "Choose shop"}
            </span>
            <ChevronDown className="h-4 w-4 shrink-0" strokeWidth={2} />
          </button>
          {topActive ? (
            <Link
              href={`/order/status/${topActive.id}`}
              className="inline-flex max-w-[55%] items-center gap-1 rounded-full bg-brand-pink/15 px-3 py-1.5 font-display text-[11px] uppercase tracking-wide text-brand-black hover:bg-brand-pink/25"
            >
              <Dot className="-mx-1 h-4 w-4 text-brand-red" strokeWidth={4} />
              <span className="truncate">
                {topActive.reference} · {headlineForStatus(topActive)}
              </span>
            </Link>
          ) : null}
        </div>
      </div>
      <LocationSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        locations={locations}
        activeLocationId={state.locationId}
        onConfirm={(id) => {
          setLocation(id);
          setSheetOpen(false);
        }}
      />
    </>
  );
}

function shortName(name: string): string {
  return name.replace(/^Wingers\s+/i, "");
}
