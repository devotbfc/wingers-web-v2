"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { BrandButton } from "@/components/brand/BrandButton";
import type { LocationSummary } from "@/lib/pph/types";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locations: LocationSummary[];
  activeLocationId: string | null;
  onConfirm: (id: string) => void;
};

export function LocationSheet({ open, onOpenChange, locations, activeLocationId, onConfirm }: Props) {
  const [picked, setPicked] = useState<string | null>(activeLocationId);
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-xl pb-6">
        <SheetHeader>
          <SheetTitle className="font-display text-xl">Pick up from</SheetTitle>
        </SheetHeader>
        <ul className="flex flex-col gap-2 px-4">
          {locations.map((loc) => {
            const isActive = loc.id === activeLocationId;
            const isPicked = loc.id === picked;
            return (
              <li key={loc.id}>
                <button
                  type="button"
                  onClick={() => setPicked(loc.id)}
                  className={`flex w-full flex-col items-start rounded-md border p-3 text-left transition ${
                    isPicked ? "border-brand-pink bg-brand-pink/5" : "border-neutral-200"
                  }`}
                >
                  <span className="font-display text-base font-bold">{loc.name}</span>
                  <span className="text-xs text-neutral-600">{loc.address}</span>
                  {isActive ? (
                    <span className="mt-1 inline-block rounded-sm bg-brand-pink px-1.5 py-0.5 text-[10px] font-bold uppercase text-brand-black">
                      Active
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
        <div className="mt-4 px-4">
          <BrandButton
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => {
              if (picked) onConfirm(picked);
            }}
            disabled={!picked}
          >
            Confirm Pickup Location
          </BrandButton>
        </div>
      </SheetContent>
    </Sheet>
  );
}
