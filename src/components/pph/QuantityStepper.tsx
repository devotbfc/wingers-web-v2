"use client";

import { Minus, Plus } from "lucide-react";

type Props = {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
};

// Port of wing-app/src/components/QuantityStepper.tsx — pill container on
// elevated with `-` muted and `+` brand-pink.
export function QuantityStepper({ value, onChange, min = 0, max = 50, size = "md" }: Props) {
  const canDec = value > min;
  const canInc = value < max;
  const h = size === "sm" ? "h-9" : "h-11";
  const btn = size === "sm" ? "h-9 w-9" : "h-11 w-11";
  return (
    <div className={`inline-flex items-center justify-between rounded-pill bg-pph-elevated px-1 ${h}`}>
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={!canDec}
        aria-label="Decrease quantity"
        className={`inline-flex items-center justify-center rounded-pill text-pph ${btn} ${canDec ? "" : "opacity-40"}`}
      >
        <Minus className="h-4 w-4" strokeWidth={2} />
      </button>
      <span className="min-w-[2ch] text-center font-display text-[16px] text-pph">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={!canInc}
        aria-label="Increase quantity"
        className={`inline-flex items-center justify-center rounded-pill text-pph-pink ${btn} ${canInc ? "" : "opacity-40"}`}
      >
        <Plus className="h-4 w-4" strokeWidth={2.5} />
      </button>
    </div>
  );
}
