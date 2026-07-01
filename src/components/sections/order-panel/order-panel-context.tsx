"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type React from "react";

interface OrderPanelState {
  open: boolean;
  openPanel: () => void;
  closePanel: () => void;
  setOpen: (open: boolean) => void;
}

const OrderPanelContext = createContext<OrderPanelState | null>(null);

export function OrderPanelProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const openPanel = useCallback(() => setOpen(true), []);
  const closePanel = useCallback(() => setOpen(false), []);

  const value = useMemo<OrderPanelState>(
    () => ({ open, openPanel, closePanel, setOpen }),
    [open, openPanel, closePanel]
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
