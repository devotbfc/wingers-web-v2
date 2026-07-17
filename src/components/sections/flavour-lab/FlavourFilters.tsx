"use client";

import type { TypeFilter } from "./FlavourGrid";
import { FlameIcon } from "./FlameIcon";

interface FlavourFiltersProps {
  heatMax: number;
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
  heatMax,
  onHeatChange,
  typeFilter,
  onTypeChange,
  resultCount,
  totalCount,
}: FlavourFiltersProps) {
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
                className={`min-h-11 rounded-full px-5 py-2 font-display text-sm font-bold uppercase tracking-wide transition-all ${
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
          className="flex items-center gap-2"
        >
          <span className="font-display text-[11px] font-bold uppercase tracking-[0.3em] text-brand-white/50">
            Heat up to
          </span>
          {HEAT_LEVELS.map((level) => {
            const active = heatMax >= level;
            const selected = heatMax === level;
            return (
              <button
                key={level}
                type="button"
                role="radio"
                aria-checked={selected}
                aria-label={`Heat up to ${level}`}
                onClick={() => onHeatChange(level)}
                className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-all ${
                  active
                    ? "border-brand-red/50 bg-brand-red/10"
                    : "border-brand-white/10 bg-brand-white/[0.02] hover:border-brand-white/25"
                }`}
              >
                <FlameIcon
                  filled={active}
                  className={
                    active
                      ? "h-4 w-4 text-brand-red drop-shadow-[0_0_6px_rgba(255,45,45,0.8)]"
                      : "h-4 w-4 text-brand-white/25"
                  }
                />
              </button>
            );
          })}
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
