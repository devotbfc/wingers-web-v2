"use client";

import Image from "next/image";
import { useState } from "react";
import { MapPin } from "lucide-react";
import { BrandButton } from "@/components/brand/BrandButton";
import type { LocationSummary } from "@/lib/pph/types";
import { PphSheet, PphSheetContent } from "./PphSheet";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locations: LocationSummary[];
  activeLocationId: string | null;
  onConfirm: (id: string) => void;
};

// Mapped by lowercase name token (first matching substring). Keeps mock
// mode visually anchored without needing a wire field on LocationSummary.
function locationImage(name: string): string | null {
  const lower = name.toLowerCase();
  if (lower.includes("northampton")) return "/brand/photos/locations/northampton/shopfront.jpg";
  return null;
}

export function LocationSheet({ open, onOpenChange, locations, activeLocationId, onConfirm }: Props) {
  // Radix unmounts Portal content on close, so these useState initialisers
  // re-run on each open — no effect needed to reset them.
  const [step, setStep] = useState<"list" | "confirm">("list");
  const [draftId, setDraftId] = useState<string | null>(activeLocationId);

  const draft = locations.find((l) => l.id === draftId) ?? null;
  // When onOpenChange(false) is called from a nav or the parent, reset the
  // local step before notifying the parent — guarantees the next open is
  // on the list view, matching the app's behaviour.
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
            <div className="flex gap-2">
              <BrandButton
                variant="outline"
                size="lg"
                className="w-28"
                onClick={() => setStep("list")}
              >
                Back
              </BrandButton>
              <BrandButton
                variant="primary"
                size="lg"
                className="flex-1"
                onClick={() => onConfirm(draft.id)}
              >
                Confirm Pickup
              </BrandButton>
            </div>
          ) : null
        }
      >
        {step === "list" ? (
          <ul className="divide-y divide-neutral-100">
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
                    className="flex w-full items-center gap-3 py-3 text-left"
                  >
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-brand-pink/15">
                      {img ? (
                        <Image src={img} alt="" fill sizes="56px" className="object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center font-display text-base font-extrabold text-brand-pink">
                          W
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <div className="truncate font-display text-sm font-extrabold uppercase tracking-tight">
                          {loc.name}
                        </div>
                        {active ? (
                          <span className="text-[10px] font-bold uppercase text-brand-pink">
                            Active
                          </span>
                        ) : null}
                      </div>
                      <div className="mt-0.5 line-clamp-2 text-xs text-neutral-500">
                        {loc.address}
                      </div>
                    </div>
                    <span className="shrink-0 text-neutral-400">→</span>
                  </button>
                </li>
              );
            })}
          </ul>
        ) : draft ? (
          <div className="-mx-4 -mt-3">
            <div className="relative aspect-[4/3] w-full bg-brand-pink/15">
              {locationImage(draft.name) ? (
                <Image
                  src={locationImage(draft.name) as string}
                  alt=""
                  fill
                  sizes="(max-width: 448px) 100vw, 448px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center font-display text-5xl font-extrabold text-brand-pink">
                  W
                </div>
              )}
            </div>
            <div className="px-4 pt-4">
              <div className="flex items-center gap-1.5 text-brand-pink">
                <MapPin className="h-4 w-4" strokeWidth={2.5} />
                <span className="font-display text-xs font-bold uppercase tracking-wide">
                  Pick up
                </span>
              </div>
              <h3 className="mt-1 font-display text-xl font-extrabold uppercase tracking-tight">
                {draft.name}
              </h3>
              <p className="mt-1 text-sm text-neutral-600">{draft.address}</p>
            </div>
          </div>
        ) : null}
      </PphSheetContent>
    </PphSheet>
  );
}
