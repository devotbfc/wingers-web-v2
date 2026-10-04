"use client";

import { useState } from "react";

import { LocationOpenBadge } from "@/components/locations/LocationOpenBadge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { LOCATIONS } from "@/lib/locations";
import { cn } from "@/lib/utils";

interface LocationPickerProps {
  value: string;
  onChange: (slug: string) => void;
}

function MapPin({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5Z" />
    </svg>
  );
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
    </svg>
  );
}

export function LocationPicker({ value, onChange }: LocationPickerProps) {
  const [open, setOpen] = useState(false);
  const current = LOCATIONS.find((l) => l.slug === value) ?? LOCATIONS[0]!;

  function selectLocation(slug: string) {
    onChange(slug);
    setOpen(false);
  }

  return (
    <>
      <div className="flex flex-col items-center gap-1">
        <span className="font-display text-[11px] font-bold uppercase tracking-[0.25em] text-brand-black/60">
          Pick up
        </span>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
          className="inline-flex items-center gap-1.5 font-display text-lg font-bold uppercase tracking-tight text-brand-pink transition-opacity hover:opacity-80 md:text-xl"
        >
          <MapPin className="h-5 w-5" />
          <span>{current.name}</span>
          <Chevron className="h-4 w-4" />
        </button>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="bottom"
          className="h-auto max-h-[85vh] bg-brand-white text-brand-black"
        >
          <SheetHeader className="px-6 pt-6 pb-2">
            <SheetTitle className="font-display text-2xl font-extrabold uppercase tracking-tight text-brand-black md:text-3xl">
              Pick your shop
            </SheetTitle>
            <SheetDescription className="font-body text-base text-brand-black/70">
              Prices and availability differ per shop.
            </SheetDescription>
          </SheetHeader>
          <ul className="grid gap-3 px-6 pb-8 md:grid-cols-2 md:gap-4">
            {LOCATIONS.map((loc) => {
              const active = loc.slug === value;
              return (
                <li key={loc.slug}>
                  <button
                    type="button"
                    onClick={() => selectLocation(loc.slug)}
                    aria-pressed={active}
                    className={cn(
                      "flex w-full flex-col items-start gap-3 rounded-md p-5 text-left transition-colors",
                      active
                        ? "bg-brand-pink text-brand-black"
                        : "bg-brand-grey text-brand-black hover:brightness-95"
                    )}
                  >
                    <div className="flex w-full items-center justify-between gap-3">
                      <h3 className="font-display text-xl font-extrabold uppercase tracking-tight">
                        {loc.name.replace(/^Wingers\s+/, "")}
                      </h3>
                      <LocationOpenBadge location={loc} size="sm" />
                    </div>
                    <p className="font-body text-sm leading-snug text-brand-black/80">
                      {loc.address.street}
                      <br />
                      {loc.address.city}, {loc.address.postcode}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        </SheetContent>
      </Sheet>
    </>
  );
}
