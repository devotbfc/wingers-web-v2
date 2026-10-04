"use client";

import { useSyncExternalStore } from "react";
import { BrandButton } from "@/components/brand/BrandButton";
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
            <BrandButton
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => mockPaymentBus.pay()}
            >
              Pay · {pence(current.totalPence)}
            </BrandButton>
            <BrandButton
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => mockPaymentBus.decline()}
            >
              Simulate decline
            </BrandButton>
            <button
              type="button"
              className="w-full py-1 text-sm text-neutral-500 underline"
              onClick={() => mockPaymentBus.cancel()}
            >
              Cancel
            </button>
          </div>
        }
      >
        <div className="font-mono break-all rounded-md bg-neutral-100 p-2 text-[10px] text-neutral-600">
          {current.clientSecret}
        </div>
      </PphSheetContent>
    </PphSheet>
  );
}
