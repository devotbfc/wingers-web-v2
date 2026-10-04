"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/lib/cart/context";
import { OrderStackProvider } from "@/lib/order-stack/context";

export function PphProviders({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <OrderStackProvider>{children}</OrderStackProvider>
    </CartProvider>
  );
}
