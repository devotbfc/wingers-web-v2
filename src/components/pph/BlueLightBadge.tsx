"use client";

type Variant = "subtle" | "verified";

export function BlueLightBadge({ variant = "subtle" }: { variant?: Variant }) {
  const label = variant === "verified" ? "VERIFIED" : "BLUE LIGHT";
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-pill bg-pph-elevated px-2 py-1 font-display text-[10px] uppercase tracking-wide"
      style={{ color: "var(--pph-blue-light)" }}
    >
      <span
        className="h-1.5 w-1.5 rounded-pill"
        style={{ backgroundColor: "var(--pph-blue-light)" }}
        aria-hidden
      />
      {label}
    </span>
  );
}
