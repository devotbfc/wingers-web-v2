// MockPayment resolves through a sheet the user controls — mirrors
// wing-app/src/components/MockPaymentSheet.tsx. The confirm() promise is
// deferred: the sheet UI calls resolve() with the chosen outcome, which
// in turn invokes _confirmPayment / _declinePayment on the mock client.

"use client";

import { pphMockOnly } from "../singleton";
import type { PaymentAdapter, PaymentResult } from "./adapter";

type Pending = {
  orderId: string;
  clientSecret: string;
  totalPence: number;
  resolve: (r: PaymentResult) => void;
};

let active: Pending | null = null;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

export const mockPaymentBus = {
  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  current: () => active,
  async pay() {
    if (!active) return;
    const { orderId, resolve } = active;
    if (pphMockOnly) await pphMockOnly._confirmPayment(orderId);
    resolve({ kind: "paid" });
    active = null;
    emit();
  },
  async decline() {
    if (!active) return;
    const { orderId, resolve } = active;
    if (pphMockOnly) await pphMockOnly._declinePayment(orderId);
    resolve({ kind: "declined" });
    active = null;
    emit();
  },
  cancel() {
    if (!active) return;
    const { resolve } = active;
    resolve({ kind: "cancelled" });
    active = null;
    emit();
  },
};

export const mockPaymentAdapter: PaymentAdapter = {
  label: "mock",
  confirm({ orderId, clientSecret, totalPence }) {
    return new Promise<PaymentResult>((resolve) => {
      active = { orderId, clientSecret, totalPence, resolve };
      emit();
    });
  },
};
