"use client";

import { useSyncExternalStore } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { BrandButton } from "@/components/brand/BrandButton";
import { mockPaymentBus } from "@/lib/pph/payment/mock";
import { pence } from "@/lib/pph/money";

export function MockPaymentSheet() {
  const current = useSyncExternalStore(
    mockPaymentBus.subscribe,
    () => mockPaymentBus.current(),
    () => null,
  );
  if (!current) return null;

  return (
    <Sheet
      open={!!current}
      onOpenChange={(open) => {
        if (!open) mockPaymentBus.cancel();
      }}
    >
      <SheetContent side="bottom" className="rounded-t-xl pb-6">
        <SheetHeader>
          <SheetTitle className="font-display text-xl">Mock Payment Sheet · I5.a</SheetTitle>
        </SheetHeader>
        <div className="space-y-3 px-4">
          <div className="font-mono break-all rounded-md bg-neutral-100 p-2 text-[10px] text-neutral-600">
            {current.clientSecret}
          </div>
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
            className="w-full py-2 text-sm text-neutral-500 underline"
            onClick={() => mockPaymentBus.cancel()}
          >
            Cancel
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
