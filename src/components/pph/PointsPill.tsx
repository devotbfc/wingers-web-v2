"use client";

export function PointsPill({ points }: { points: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-neutral-100 px-2 py-1 text-xs font-bold uppercase tracking-wide text-neutral-900">
      <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" aria-hidden />
      {points} PTS
    </span>
  );
}
