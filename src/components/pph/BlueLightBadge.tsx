"use client";

type Variant = "subtle" | "verified";

export function BlueLightBadge({ variant = "subtle" }: { variant?: Variant }) {
  const label = variant === "verified" ? "VERIFIED" : "BLUE LIGHT";
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-blue-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-900">
      <span className="h-1.5 w-1.5 rounded-full bg-blue-500" aria-hidden />
      {label}
    </span>
  );
}
