"use client";

import { useSyncExternalStore } from "react";
import { mockPaymentBus } from "@/lib/pph/payment/mock";
import { pence } from "@/lib/pph/money";
import { PphSheet, PphSheetContent } from "./PphSheet";

export function MockPaymentSheet() {
  const current = useSyncExternalStore(
    mockPaymentBus.subscribe,
    () => mockPaymentBus.current(),
    () => null,
  );
  if (!current) return null;

  return (
    <PphSheet
      open={!!current}
      onOpenChange={(open) => {
        if (!open) mockPaymentBus.cancel();
      }}
    >
      <PphSheetContent
        title="Mock payment · I5.a"
        description="Dev-only sheet — swap in Stripe Payment Element to go live."
        footer={
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => mockPaymentBus.pay()}
              className="h-14 w-full rounded-pill bg-pph-pink font-display text-[15px] uppercase text-pph-on-pink hover:brightness-95"
            >
              Pay · {pence(current.totalPence)}
            </button>
            <button
              type="button"
              onClick={() => mockPaymentBus.decline()}
              className="h-14 w-full rounded-pill border-2 border-pph-red font-display text-[15px] uppercase text-pph-red"
            >
              Simulate decline
            </button>
            <button
              type="button"
              className="block w-full py-1 text-center font-display text-[13px] uppercase text-pph-muted underline"
              onClick={() => mockPaymentBus.cancel()}
            >
              Cancel
            </button>
          </div>
        }
      >
        <div className="rounded-md bg-pph-elevated p-2 font-mono text-[10px] break-all text-pph-muted">
          {current.clientSecret}
        </div>
      </PphSheetContent>
    </PphSheet>
  );
}
