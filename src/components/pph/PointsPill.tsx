"use client";

export function PointsPill({ points }: { points: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-pill bg-pph-elevated px-2.5 py-1 font-display text-[11px] uppercase tracking-wide text-pph-gold">
      <span className="h-1.5 w-1.5 rounded-pill bg-pph-gold" aria-hidden />
      {points} pts
    </span>
  );
}
