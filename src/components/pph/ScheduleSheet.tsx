"use client";

import { useMemo, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { BrandButton } from "@/components/brand/BrandButton";
import { buildSlots, formatSlotLabel, type SlotDayKey } from "@/lib/pph/pickup";
import type { LocationSummary } from "@/lib/pph/types";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  location: LocationSummary;
  onPick: (iso: string | null) => void;
  selectedIso: string | null;
};

export function ScheduleSheet({ open, onOpenChange, location, onPick, selectedIso }: Props) {
  const [day, setDay] = useState<SlotDayKey>("today");
  const [picked, setPicked] = useState<string | null>(selectedIso);

  const slots = useMemo(() => buildSlots(location, day), [location, day]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="max-h-[80vh] overflow-y-auto rounded-t-xl pb-6">
        <SheetHeader>
          <SheetTitle className="font-display text-xl">Schedule pickup</SheetTitle>
        </SheetHeader>
        <div className="flex gap-2 px-4">
          {(["today", "tomorrow"] as const).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setDay(k)}
              className={`rounded-md px-3 py-1.5 text-sm font-bold uppercase ${
                day === k ? "bg-brand-pink text-brand-black" : "bg-neutral-100 text-neutral-600"
              }`}
            >
              {k}
            </button>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 px-4">
          {slots.length === 0 ? (
            <div className="col-span-3 py-6 text-center text-sm text-neutral-500">
              No slots left {day}. Try {day === "today" ? "tomorrow" : "a later day"}.
            </div>
          ) : (
            slots.map((s) => {
              const iso = s.toISOString();
              const isPicked = iso === picked;
              return (
                <button
                  key={iso}
                  type="button"
                  onClick={() => setPicked(iso)}
                  className={`rounded-md border py-2 text-sm ${
                    isPicked ? "border-brand-pink bg-brand-pink text-brand-black" : "border-neutral-200"
                  }`}
                >
                  {formatSlotLabel(s)}
                </button>
              );
            })
          )}
        </div>
        <div className="mt-4 px-4">
          <BrandButton
            variant="primary"
            size="lg"
            className="w-full"
            disabled={!picked}
            onClick={() => {
              onPick(picked);
              onOpenChange(false);
            }}
          >
            Select Time
          </BrandButton>
        </div>
      </SheetContent>
    </Sheet>
  );
}
