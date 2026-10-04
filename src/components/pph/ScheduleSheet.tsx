"use client";

import { useMemo, useState } from "react";
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
  const [day, setDay] = useState<SlotDayKey>("today");
  const [picked, setPicked] = useState<string | null>(selectedIso);

  const slots = useMemo(() => buildSlots(location, day), [location, day]);

  return (
    <PphSheet open={open} onOpenChange={onOpenChange}>
      <PphSheetContent
        title="Pickup time"
        description="Choose when to collect"
        footer={
          <button
            type="button"
            disabled={!picked}
            onClick={() => {
              onPick(picked);
              onOpenChange(false);
            }}
            className={`h-14 w-full rounded-pill font-display text-[15px] uppercase ${
              picked ? "bg-pph-pink text-pph-bg hover:brightness-95" : "bg-pph-elevated text-pph-muted"
            }`}
          >
            Confirm pickup time
          </button>
        }
      >
        <div className="flex gap-2 pb-4 pt-1">
          {(["today", "tomorrow"] as const).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => {
                setDay(k);
                setPicked(null);
              }}
              className={`h-11 flex-1 rounded-pill font-display text-[14px] uppercase tracking-wide ${
                day === k ? "bg-pph-pink text-pph-bg" : "bg-pph-elevated text-pph"
              }`}
            >
              {k}
            </button>
          ))}
        </div>

        {slots.length === 0 ? (
          <div className="py-10 text-center font-body text-[14px] text-pph-muted">
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
                  className={`h-11 rounded-pill font-display text-[14px] ${
                    isPicked ? "bg-pph-pink text-pph-bg" : "bg-pph-elevated text-pph"
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
