"use client";

import type { TypeFilter } from "./FlavourGrid";
import { HeatFlames } from "./FlameIcon";

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

export function FlavourFilters({
  heatMax,
  onHeatChange,
  typeFilter,
  onTypeChange,
  resultCount,
  totalCount,
}: FlavourFiltersProps) {
  return (
    <div className="mb-8 flex flex-col gap-6 border-y-2 border-brand-black bg-brand-white py-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
        <div className="flex items-center gap-3">
          <span className="font-display text-xs font-bold uppercase tracking-[0.25em] text-brand-black">
            Heat up to
          </span>
          <HeatFlames heat={heatMax} size="md" />
        </div>
        <label className="flex-1">
          <span className="sr-only">Maximum heat level</span>
          <input
            type="range"
            min={0}
            max={5}
            step={1}
            value={heatMax}
            onChange={(e) => onHeatChange(Number(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none bg-brand-black/10 accent-brand-red"
          />
        </label>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-6">
        <div
          role="radiogroup"
          aria-label="Flavour type"
          className="inline-flex border-2 border-brand-black"
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
                className={`px-4 py-2 font-display text-sm font-bold uppercase tracking-wide transition-colors ${
                  active
                    ? "bg-brand-black text-brand-white"
                    : "bg-brand-white text-brand-black hover:bg-brand-pink"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        <p className="font-body text-sm text-brand-black/70">
          Showing <span className="font-bold text-brand-black">{resultCount}</span> of {totalCount}
        </p>
      </div>
    </div>
  );
}
