"use client";

type Props = {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
};

export function QuantityStepper({ value, onChange, min = 0, max = 50, size = "md" }: Props) {
  const h = size === "sm" ? "h-9" : "h-11";
  return (
    <div className={`inline-flex items-center overflow-hidden rounded-md border border-brand-black ${h}`}>
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="h-full w-10 text-lg font-bold disabled:opacity-30"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="min-w-[2ch] text-center font-display text-base">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="h-full w-10 text-lg font-bold disabled:opacity-30"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
