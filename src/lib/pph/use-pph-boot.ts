// Cold-boot: rehydrate auth from localStorage, hydrate /me if a token
// survived, and fetch locations once. Mounted inside PphProviders.

"use client";

import { useEffect, useRef, useState } from "react";
import { authStore } from "./auth-store";
import { pph } from "./singleton";
import type { LocationSummary } from "./types";

export type BootStatus = "loading" | "ready" | "error";

export function usePphBoot(): { status: BootStatus; locations: LocationSummary[] } {
  const [locations, setLocations] = useState<LocationSummary[]>([]);
  const [status, setStatus] = useState<BootStatus>("loading");
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    authStore.rehydrate();
    let cancelled = false;
    (async () => {
      try {
        const res = await pph.getLocations();
        if (cancelled) return;
        if (res.success) setLocations(res.data);
        setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { status, locations };
}
