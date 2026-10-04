"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronRight, MapPin } from "lucide-react";
import type { LocationSummary } from "@/lib/pph/types";
import { PphSheet, PphSheetContent } from "./PphSheet";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locations: LocationSummary[];
  activeLocationId: string | null;
  onConfirm: (id: string) => void;
};

// Image mapper — site stores Northampton shopfront; MK has no shopfront
// photo yet. In both cases FoodThumb-style fallback renders the "W" over
// elevated to keep the dark theme consistent.
function locationImage(name: string): string | null {
  const lower = name.toLowerCase();
  if (lower.includes("northampton")) return "/brand/photos/locations/northampton/shopfront.jpg";
  return null;
}

export function LocationSheet({ open, onOpenChange, locations, activeLocationId, onConfirm }: Props) {
  const [step, setStep] = useState<"list" | "confirm">("list");
  const [draftId, setDraftId] = useState<string | null>(activeLocationId);

  const draft = locations.find((l) => l.id === draftId) ?? null;
  const handleOpenChange = (next: boolean) => {
    if (!next) setStep("list");
    onOpenChange(next);
  };

  const title = step === "list" ? "Pick up location" : (draft?.name ?? "Pick up");
  const description = step === "list" ? "Choose your Wingers" : undefined;

  return (
    <PphSheet open={open} onOpenChange={handleOpenChange}>
      <PphSheetContent
        title={title}
        description={description}
        footer={
          step === "confirm" && draft ? (
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep("list")}
                className="h-14 flex-1 rounded-pill bg-pph-elevated font-display text-[15px] uppercase text-pph"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => onConfirm(draft.id)}
                className="h-14 flex-[2] rounded-pill bg-pph-pink font-display text-[15px] uppercase text-pph-bg hover:brightness-95"
              >
                Confirm pickup
              </button>
            </div>
          ) : null
        }
      >
        {step === "list" ? (
          <ul className="divide-pph-elevated">
            {locations.map((loc) => {
              const active = loc.id === activeLocationId;
              const img = locationImage(loc.name);
              return (
                <li key={loc.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setDraftId(loc.id);
                      setStep("confirm");
                    }}
                    className="flex min-h-[76px] w-full items-center gap-4 py-3 text-left hover:opacity-90"
                  >
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[14px] bg-pph-elevated">
                      {img ? (
                        <Image src={img} alt="" fill sizes="56px" className="object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center font-display text-[22px] text-pph-muted">
                          W
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <div className="truncate font-display text-[15px] uppercase tracking-tight text-pph">
                          {loc.name.toUpperCase()}
                        </div>
                        {active ? (
                          <span className="font-display text-[10px] uppercase text-pph-pink">
                            Active
                          </span>
                        ) : null}
                      </div>
                      <div className="mt-1 line-clamp-2 font-body text-[12px] leading-tight text-pph-muted">
                        {loc.address}
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 shrink-0 text-pph-muted" strokeWidth={1.5} />
                  </button>
                </li>
              );
            })}
          </ul>
        ) : draft ? (
          <div className="-mx-4 -mt-3">
            <div className="relative aspect-[4/3] w-full bg-pph-elevated">
              {locationImage(draft.name) ? (
                <Image
                  src={locationImage(draft.name) as string}
                  alt=""
                  fill
                  sizes="(max-width: 448px) 100vw, 448px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center font-display text-[56px] text-pph-muted">
                  W
                </div>
              )}
            </div>
            <div className="px-6 pt-5">
              <div className="flex items-center gap-1.5 text-pph-pink">
                <MapPin className="h-4 w-4" strokeWidth={2.5} />
                <span className="font-display text-[13px] uppercase">Pick up</span>
              </div>
              <h3 className="mt-2 font-display text-[28px] uppercase leading-none text-pph">
                {draft.name.toUpperCase()}
              </h3>
              <p className="mt-2 font-body text-[15px] text-pph-muted">{draft.address}</p>
            </div>
          </div>
        ) : null}
      </PphSheetContent>
    </PphSheet>
  );
}
