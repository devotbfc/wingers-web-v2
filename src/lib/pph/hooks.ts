"use client";

import { useCallback, useEffect, useState } from "react";
import { pph } from "./singleton";
import type { LocationSummary, Menu } from "./types";

export function useLocations(): { locations: LocationSummary[]; loading: boolean } {
  const [locations, setLocations] = useState<LocationSummary[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await pph.getLocations();
        if (cancelled) return;
        if (res.success) setLocations(res.data);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  return { locations, loading };
}

export function useMenu(locationId: string | null): {
  menu: Menu | null;
  loading: boolean;
  refetch: () => Promise<Menu | null>;
} {
  const [menu, setMenu] = useState<Menu | null>(null);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async (): Promise<Menu | null> => {
    if (!locationId) return null;
    setLoading(true);
    try {
      const res = await pph.getMenu(locationId);
      if (res.success) {
        setMenu(res.data);
        return res.data;
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, [locationId]);

  useEffect(() => {
    if (!locationId) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const res = await pph.getMenu(locationId);
        if (cancelled) return;
        if (res.success) setMenu(res.data);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [locationId]);

  return { menu, loading, refetch };
}
