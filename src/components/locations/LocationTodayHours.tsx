"use client";

import { useEffect, useState } from "react";
import { formatRange, getTodayHours, type Location } from "@/lib/locations";

interface LocationTodayHoursProps {
  location: Location;
  className?: string;
}

export function LocationTodayHours({
  location,
  className,
}: LocationTodayHoursProps) {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setLabel(formatRange(getTodayHours(location)));
    const raf = requestAnimationFrame(tick);
    const id = setInterval(tick, 60_000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, [location]);

  return (
    <p className={className} suppressHydrationWarning>
      <span className="font-semibold text-brand-black">Today</span>{" "}
      <span className="text-brand-black/80">{label ?? "—"}</span>
    </p>
  );
}
