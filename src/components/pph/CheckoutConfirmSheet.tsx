"use client";

import Link from "next/link";
import { useState } from "react";
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
          <button
            type="button"
            disabled={!canConfirm}
            onClick={onConfirm}
            className={`h-14 w-full rounded-pill font-display text-[15px] uppercase ${
              canConfirm ? "bg-pph-pink text-pph-bg hover:brightness-95" : "bg-pph-elevated text-pph-muted"
            }`}
          >
            Pay · {payLabel}
          </button>
        }
      >
        <div className="space-y-3">
          <div className="rounded-[16px] bg-pph-elevated px-4 py-4">
            <div className="font-display text-[11px] uppercase tracking-widest text-pph-muted">
              You&apos;ll earn
            </div>
            <div className="mt-1 font-display text-[22px] text-pph-gold">
              {estimatedPoints} pts
            </div>
            <div className="mt-0.5 font-body text-[12px] text-pph-muted">when you collect</div>
          </div>

          {needsSecondCheck ? (
            <div className="rounded-[16px] border-2 border-pph-gold bg-pph-surface px-4 py-3">
              <div className="font-display text-[13px] uppercase tracking-wide text-pph-gold">
                You already have an order being prepared
              </div>
              <div className="mt-1 font-body text-[13px] text-pph">
                {pendingOrder?.pickupCode ? `${pendingOrder.pickupCode} · ` : ""}
                {pendingOrder?.reference} — place another?
              </div>
            </div>
          ) : null}

          <label className="flex items-start gap-3 font-body text-[14px] text-pph">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-4 w-4"
            />
            <span>
              I understand this order is for collection only and agree to the{" "}
              <Link href="/terms" className="text-pph-pink underline">
                order terms
              </Link>
              .
            </span>
          </label>

          {needsSecondCheck ? (
            <label className="flex items-start gap-3 font-body text-[14px] text-pph">
              <input
                type="checkbox"
                checked={acceptedSecond}
                onChange={(e) => setAcceptedSecond(e.target.checked)}
                className="mt-0.5 h-4 w-4"
              />
              <span>I understand a second order is being placed.</span>
            </label>
          ) : null}
        </div>
      </PphSheetContent>
    </PphSheet>
  );
}
