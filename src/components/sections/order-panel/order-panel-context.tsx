"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type React from "react";

interface OrderPanelState {
  open: boolean;
  preferredLocationSlug: string | null;
  openPanel: (preferredLocationSlug?: string) => void;
  closePanel: () => void;
  setOpen: (open: boolean) => void;
}

const OrderPanelContext = createContext<OrderPanelState | null>(null);

export function OrderPanelProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [preferredLocationSlug, setPreferredLocationSlug] = useState<string | null>(
    null
  );

  const openPanel = useCallback((slug?: string) => {
    setPreferredLocationSlug(slug ?? null);
    setOpen(true);
  }, []);
  const closePanel = useCallback(() => setOpen(false), []);

  const value = useMemo<OrderPanelState>(
    () => ({
      open,
      preferredLocationSlug,
      openPanel,
      closePanel,
      setOpen,
    }),
    [open, preferredLocationSlug, openPanel, closePanel]
  );

  return (
    <OrderPanelContext.Provider value={value}>
      {children}
    </OrderPanelContext.Provider>
  );
}

export function useOrderPanel(): OrderPanelState {
  const ctx = useContext(OrderPanelContext);
  if (!ctx) {
    throw new Error("useOrderPanel must be used inside <OrderPanelProvider>");
  }
  return ctx;
}
