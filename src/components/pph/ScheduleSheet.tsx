"use client";

import { useMemo, useState } from "react";
import { BrandButton } from "@/components/brand/BrandButton";
import { buildSlots, formatSlotLabel, type SlotDayKey } from "@/lib/pph/pickup";
import type { LocationSummary } from "@/lib/pph/types";
import { PphSheet, PphSheetContent } from "./PphSheet";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  location: LocationSummary;
  onPick: (iso: string | null) => void;
  selectedIso: string | null;
};

export function ScheduleSheet({ open, onOpenChange, location, onPick, selectedIso }: Props) {
  // Radix unmounts Portal content on close so these initialisers re-run on
  // every open; no reset effect needed.
  const [day, setDay] = useState<SlotDayKey>("today");
  const [picked, setPicked] = useState<string | null>(selectedIso);

  const slots = useMemo(() => buildSlots(location, day), [location, day]);

  return (
    <PphSheet open={open} onOpenChange={onOpenChange}>
      <PphSheetContent
        title="Pickup time"
        description="Choose when to collect"
        footer={
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
            Confirm pickup time
          </BrandButton>
        }
      >
        <div className="flex gap-2 pb-3">
          {(["today", "tomorrow"] as const).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => {
                setDay(k);
                setPicked(null);
              }}
              className={`flex-1 rounded-md px-3 py-2 font-display text-xs font-bold uppercase tracking-wide ${
                day === k ? "bg-brand-pink text-brand-black" : "bg-neutral-100 text-neutral-700"
              }`}
            >
              {k}
            </button>
          ))}
        </div>

        {slots.length === 0 ? (
          <div className="py-10 text-center text-sm text-neutral-500">
            No slots left {day}. Try {day === "today" ? "tomorrow" : "today"}.
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2 pb-2">
            {slots.map((s) => {
              const iso = s.toISOString();
              const isPicked = iso === picked;
              return (
                <button
                  key={iso}
                  type="button"
                  onClick={() => setPicked(iso)}
                  className={`rounded-md border px-2 py-2 text-sm font-bold ${
                    isPicked
                      ? "border-brand-pink bg-brand-pink text-brand-black"
                      : "border-neutral-200 bg-brand-white text-brand-black"
                  }`}
                >
                  {formatSlotLabel(s)}
                </button>
              );
            })}
          </div>
        )}
      </PphSheetContent>
    </PphSheet>
  );
}
