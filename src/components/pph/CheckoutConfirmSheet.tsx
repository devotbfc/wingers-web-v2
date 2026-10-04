"use client";

import Link from "next/link";
import { useState } from "react";
import { BrandButton } from "@/components/brand/BrandButton";
import { pence } from "@/lib/pph/money";
import type { Order } from "@/lib/pph/types";
import { PphSheet, PphSheetContent } from "./PphSheet";

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
  // Radix unmounts Portal content on close so these initialisers re-run on
  // every open — no reset effect needed. The handleOpenChange wrapper only
  // propagates to the parent.
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
    <PphSheet open={open} onOpenChange={handleOpenChange}>
      <PphSheetContent
        title="Confirm order"
        description="Review the details before you pay"
        footer={
          <BrandButton
            variant="primary"
            size="lg"
            className="w-full"
            disabled={!canConfirm}
            onClick={onConfirm}
          >
            Pay · {payLabel}
          </BrandButton>
        }
      >
        <div className="space-y-3">
          <div className="rounded-md border border-neutral-200 bg-neutral-50 p-3 text-sm">
            <div className="font-display text-xs font-bold uppercase tracking-wide text-neutral-500">
              You&apos;ll earn
            </div>
            <div className="mt-1 font-display text-xl font-extrabold text-brand-black">
              {estimatedPoints} pts
            </div>
            <div className="mt-0.5 text-xs text-neutral-500">when you collect</div>
          </div>

          {needsSecondCheck ? (
            <div className="rounded-md border-2 border-yellow-400 bg-yellow-50 p-3 text-xs text-neutral-800">
              <div className="font-display font-bold uppercase tracking-wide">
                You already have an order being prepared
              </div>
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
              className="mt-0.5 h-4 w-4 accent-brand-pink"
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
                className="mt-0.5 h-4 w-4 accent-brand-pink"
              />
              <span>I understand a second order is being placed.</span>
            </label>
          ) : null}
        </div>
      </PphSheetContent>
    </PphSheet>
  );
}
