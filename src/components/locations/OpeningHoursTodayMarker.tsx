"use client";

import { useEffect } from "react";
import { getLondonNowParts } from "@/lib/locations";

interface OpeningHoursTodayMarkerProps {
  locationSlug: string;
}

export function OpeningHoursTodayMarker({
  locationSlug,
}: OpeningHoursTodayMarkerProps) {
  useEffect(() => {
    const apply = () => {
      const table = document.querySelector(
        `[data-hours-table="${CSS.escape(locationSlug)}"]`,
      );
      if (!table) return;
      table
        .querySelectorAll("[data-today]")
        .forEach((el) => el.removeAttribute("data-today"));
      const day = getLondonNowParts().day;
      const row = table.querySelector(`[data-day-key="${day}"]`);
      row?.setAttribute("data-today", "");
    };
    apply();
    const id = setInterval(apply, 60_000);
    return () => {
      clearInterval(id);
      document
        .querySelectorAll(
          `[data-hours-table="${CSS.escape(locationSlug)}"] [data-today]`,
        )
        .forEach((el) => el.removeAttribute("data-today"));
    };
  }, [locationSlug]);

  return null;
}
