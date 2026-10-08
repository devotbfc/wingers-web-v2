"use client";

import {
  ALLERGEN_LABELS,
  ALLERGENS_ORDERED,
  type Allergen,
} from "@/lib/menu";
import { cn } from "@/lib/utils";

interface AvoidChipsProps {
  avoid: readonly Allergen[];
  onToggle: (a: Allergen) => void;
  onClear: () => void;
  hide: boolean;
  onHideToggle: () => void;
}

export function AvoidChips({
  avoid,
  onToggle,
  onClear,
  hide,
  onHideToggle,
}: AvoidChipsProps) {
  const avoidSet = new Set(avoid);
  const anyPicked = avoid.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <h3 className="font-display text-base font-bold uppercase tracking-tight text-brand-black md:text-lg">
          I&rsquo;m avoiding…
        </h3>
        <button
          type="button"
          onClick={onClear}
          disabled={!anyPicked && !hide}
          className="font-body text-sm font-semibold text-brand-black underline underline-offset-4 transition-opacity hover:text-brand-red disabled:cursor-default disabled:opacity-40 disabled:no-underline"
        >
          Clear
        </button>
      </div>

      <ul className="flex flex-wrap gap-2">
        {ALLERGENS_ORDERED.map((a) => {
          const active = avoidSet.has(a);
          return (
            <li key={a}>
              <button
                type="button"
                role="checkbox"
                aria-checked={active}
                onClick={() => onToggle(a)}
                className={cn(
                  "inline-flex h-10 items-center rounded-full border-2 px-3.5 font-body text-sm font-semibold capitalize transition-colors",
                  active
                    ? "border-brand-red-cta bg-brand-red-cta text-brand-white"
                    : "border-brand-black bg-brand-white text-brand-black hover:bg-brand-warm-grey",
                )}
              >
                {ALLERGEN_LABELS[a]}
              </button>
            </li>
          );
        })}
      </ul>

      <label className="flex items-center justify-between gap-4">
        <span className="font-body text-sm font-semibold text-brand-black">
          Hide items that contain them
        </span>
        <span
          className={cn(
            "relative inline-flex h-[34px] w-[56px] shrink-0 cursor-pointer items-center rounded-full p-1 transition-colors",
            hide ? "bg-brand-red-cta" : "bg-brand-warm-grey",
          )}
        >
          <input
            type="checkbox"
            role="switch"
            aria-label="Hide items that contain my allergens"
            checked={hide}
            onChange={onHideToggle}
            className="peer sr-only"
          />
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none inline-block h-[26px] w-[26px] rounded-full bg-brand-white shadow-[0_2px_4px_rgba(0,0,0,0.2)] transition-transform",
              hide ? "translate-x-[22px]" : "translate-x-0",
            )}
          />
        </span>
      </label>
    </div>
  );
}
