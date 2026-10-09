"use client";

import type { TypeFilter } from "./FlavourGrid";
import { FlameIcon } from "./FlameIcon";

interface FlavourFiltersProps {
  heat: number;
  onHeatChange: (heat: number) => void;
  typeFilter: TypeFilter;
  onTypeChange: (type: TypeFilter) => void;
  resultCount: number;
  totalCount: number;
}

const TYPE_OPTIONS: { value: TypeFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "dry-rub", label: "Dry Rub" },
  { value: "wet-sauce", label: "Wet Sauce" },
];

const HEAT_LEVELS = [1, 2, 3, 4, 5] as const;

export function FlavourFilters({
  heat,
  onHeatChange,
  typeFilter,
  onTypeChange,
  resultCount,
  totalCount,
}: FlavourFiltersProps) {
  // Static label per the board; the N is implied by which flames are lit.
  // aria-live region at the end of the row keeps SR users informed of the
  // active level.
  const heatLabel = "Heat up to";

  return (
    <div className="mb-8 flex flex-col gap-6 border-y border-brand-white/10 py-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
        <div
          role="radiogroup"
          aria-label="Flavour type"
          className="inline-flex flex-wrap gap-2"
        >
          {TYPE_OPTIONS.map((opt) => {
            const active = typeFilter === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => onTypeChange(opt.value)}
                className={`min-h-11 rounded-full px-5 py-2 font-display text-sm font-bold uppercase tracking-wide transition-[color,background-color,border-color] duration-150 ${
                  active
                    ? "glow-edge-pink bg-brand-pink text-brand-black"
                    : "border border-brand-white/15 bg-transparent text-brand-white/60 hover:border-brand-pink/40 hover:text-brand-white"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        <div
          role="radiogroup"
          aria-label="Maximum heat level"
          className="flex flex-wrap items-center gap-x-3 gap-y-2"
        >
          <span className="font-display text-xs font-bold uppercase tracking-[0.25em] text-brand-white/80">
            {heatLabel}
          </span>
          <span aria-live="polite" className="sr-only">
            {heat >= 1 ? `Heat up to ${heat}` : "No heat filter active"}
          </span>
          <div className="flex items-center gap-2">
            {HEAT_LEVELS.map((level) => {
              // "Heat up to N" filter: tapping level N shows flavours with
              // heat <= N. Tap the active chip to clear (back to every
              // flavour). Flames read as a left-to-right gauge: tapping N
              // lights flames 1..N so selection direction matches the
              // natural intensity reading.
              const selected = heat === level;
              const lit = heat >= 1 && level <= heat;
              return (
                <button
                  key={level}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  aria-label={`Heat up to ${level}`}
                  onClick={() => onHeatChange(selected ? 0 : level)}
                  className={`flex h-11 w-11 items-center justify-center rounded-full border-2 transition-[color,background-color,border-color,box-shadow] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-pink ${
                    lit
                      ? "border-brand-red bg-brand-red/15 shadow-[0_0_14px_rgba(255,45,45,0.35)]"
                      : "border-brand-white/15 bg-brand-white/[0.02] hover:border-brand-white/40"
                  }`}
                >
                  <FlameIcon
                    filled={lit}
                    className={
                      lit
                        ? "h-5 w-5 text-brand-red drop-shadow-[0_0_6px_rgba(255,45,45,0.9)]"
                        : "h-5 w-5 text-brand-white/35"
                    }
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <p className="font-body text-sm text-brand-white/50">
        Showing{" "}
        <span className="font-bold text-brand-white">{resultCount}</span> of{" "}
        {totalCount}
      </p>
    </div>
  );
}
