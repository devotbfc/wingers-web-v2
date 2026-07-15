"use client";

import { useEffect, useState } from "react";
import {
  dayShort,
  getNextOpening,
  isOpenNow,
  type Location,
} from "@/lib/locations";
import { cn } from "@/lib/utils";

interface LocationOpenBadgeProps {
  location: Location;
  size?: "sm" | "lg";
  className?: string;
}

interface BadgeState {
  open: boolean;
  nextLabel: string | null;
}

function computeState(location: Location): BadgeState {
  if (isOpenNow(location)) return { open: true, nextLabel: null };
  const next = getNextOpening(location);
  if (!next) return { open: false, nextLabel: null };
  const label = next.dayIsToday
    ? next.opensAt
    : `${dayShort[next.dayKey]} ${next.opensAt}`;
  return { open: false, nextLabel: label };
}

const sizeClasses: Record<"sm" | "lg", string> = {
  sm: "h-8 px-3 text-xs",
  lg: "min-h-11 px-5 text-sm",
};

export function LocationOpenBadge({
  location,
  size = "sm",
  className,
}: LocationOpenBadgeProps) {
  const [state, setState] = useState<BadgeState | null>(null);

  useEffect(() => {
    const tick = () => setState(computeState(location));
    // Defer initial paint out of the effect body so the react-hooks
    // set-state-in-effect rule stays happy — same pattern as NavBar's rAF-scroll handler.
    const raf = requestAnimationFrame(tick);
    const id = setInterval(tick, 60_000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, [location]);

  const base = cn(
    "inline-flex items-center gap-2 rounded-full font-display font-bold uppercase tracking-wide whitespace-nowrap",
    sizeClasses[size],
    className,
  );

  if (state === null) {
    return (
      <span
        className={cn(base, "bg-brand-white/80 text-brand-black")}
        aria-live="polite"
        suppressHydrationWarning
      >
        <span aria-hidden="true">·</span>
        <span>Checking hours</span>
      </span>
    );
  }

  if (state.open) {
    return (
      <span
        className={cn(base, "bg-brand-pink text-brand-black")}
        aria-live="polite"
      >
        <span
          aria-hidden="true"
          className="h-2 w-2 rounded-full bg-brand-black"
        />
        Open now
      </span>
    );
  }

  return (
    <span
      className={cn(base, "bg-brand-black text-brand-white")}
      aria-live="polite"
    >
      <span
        aria-hidden="true"
        className="h-2 w-2 rounded-full bg-brand-pink"
      />
      Closed{state.nextLabel ? ` · Opens ${state.nextLabel}` : ""}
    </span>
  );
}
