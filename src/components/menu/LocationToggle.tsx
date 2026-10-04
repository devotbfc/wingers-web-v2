"use client";

import { LOCATIONS } from "@/lib/locations";
import { cn } from "@/lib/utils";

interface LocationToggleProps {
  value: string;
  onChange: (slug: string) => void;
}

export function LocationToggle({ value, onChange }: LocationToggleProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Choose your shop"
      className="inline-flex h-10 items-center rounded-full bg-brand-grey p-1"
    >
      {LOCATIONS.map((loc) => {
        const active = value === loc.slug;
        const label = loc.name.replace(/^Wingers\s+/, "");
        return (
          <button
            key={loc.slug}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(loc.slug)}
            className={cn(
              "inline-flex h-full items-center rounded-full px-4 font-display text-[12px] font-bold uppercase tracking-wide transition-colors",
              active
                ? "bg-brand-pink text-brand-black"
                : "text-brand-black/70 hover:brightness-95"
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
