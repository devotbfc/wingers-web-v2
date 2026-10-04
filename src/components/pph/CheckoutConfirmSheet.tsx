"use client";

import { useState } from "react";
import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { BrandButton } from "@/components/brand/BrandButton";
import { pence } from "@/lib/pph/money";
import type { Order } from "@/lib/pph/types";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  totalPence: number;
  pointsCost: number | null;
  estimatedPoints: number;
  pendingOrder: Order | null;
  onConfirm: () => void;
};

export function CheckoutConfirmSheet({
  open,
  onOpenChange,
  totalPence,
  pointsCost,
  estimatedPoints,
  pendingOrder,
  onConfirm,
}: Props) {
  const [agreed, setAgreed] = useState(false);
  const [acceptedSecond, setAcceptedSecond] = useState(false);

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setAgreed(false);
      setAcceptedSecond(false);
    }
    onOpenChange(next);
  };

  const needsSecondCheck = !!pendingOrder;
  const canConfirm = agreed && (!needsSecondCheck || acceptedSecond);
  const payLabel = pointsCost != null ? `${pointsCost} pts` : pence(totalPence);

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent side="bottom" className="rounded-t-xl pb-6">
        <SheetHeader>
          <SheetTitle className="font-display text-xl">Confirm order</SheetTitle>
        </SheetHeader>
        <div className="space-y-3 px-4">
          <p className="text-sm text-neutral-700">
            Earn {estimatedPoints} pts when you collect.
          </p>

          {needsSecondCheck ? (
            <div className="rounded-md border border-yellow-400 bg-yellow-50 p-3 text-xs text-neutral-800">
              <div className="font-bold">You already have an order being prepared</div>
              <div className="mt-1">
                {pendingOrder?.pickupCode ? `${pendingOrder.pickupCode} · ` : ""}
                {pendingOrder?.reference} — place another?
              </div>
            </div>
          ) : null}

          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5"
            />
            <span>
              I understand this order is for collection only and agree to the{" "}
              <Link href="/terms" className="text-brand-pink underline">
                order terms
              </Link>
              .
            </span>
          </label>

          {needsSecondCheck ? (
            <label className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                checked={acceptedSecond}
                onChange={(e) => setAcceptedSecond(e.target.checked)}
                className="mt-0.5"
              />
              <span>I understand a second order is being placed.</span>
            </label>
          ) : null}

          <BrandButton
            variant="primary"
            size="lg"
            className="w-full"
            disabled={!canConfirm}
            onClick={onConfirm}
          >
            Pay · {payLabel}
          </BrandButton>
        </div>
      </SheetContent>
    </Sheet>
  );
}
