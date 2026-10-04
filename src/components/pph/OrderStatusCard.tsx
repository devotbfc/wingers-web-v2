"use client";

import Link from "next/link";
import { headlineForStatus, isLazySwept, showPickupCode } from "@/lib/pph/order-status";
import { pence } from "@/lib/pph/money";
import type { Order } from "@/lib/pph/types";
import { PickupCodeBlock } from "./PickupCodeBlock";

// Port of wing-app/src/components/OrderStatusCard.tsx layout:
// mx-6, rounded-[20px] bg-elevated, gold border when ready, px-5 py-4,
// reference line in pink (gold when ready), big headline, muted ETA,
// optional pickup code box, "See details ›" and "Cancel order" rows.
export function OrderStatusCard({ order }: { order: Order }) {
  const headline = headlineForStatus(order);
  const swept = isLazySwept(order);
  const isReady = order.status === "ready";

  return (
    <Link
      href={`/order/status/${order.id}`}
      className={`mx-4 mt-4 block overflow-hidden rounded-[20px] bg-pph-elevated ${
        isReady ? "border-2 border-pph-gold" : swept ? "border-2 border-pph-red" : ""
      }`}
    >
      <div className="px-5 pb-5 pt-4">
        <div
          className={`font-display text-[13px] uppercase ${
            isReady ? "text-pph-gold" : "text-pph-pink"
          }`}
        >
          Order {order.reference}
        </div>
        <div className="mt-1 font-display text-[20px] uppercase leading-tight text-pph">
          {headline}
        </div>
        <div className="mt-2 font-body text-[14px] text-pph-muted">
          {swept ? (
            <>Please re-order · {order.locationName}</>
          ) : (
            <>{etaCaption(order)} · {order.locationName}</>
          )}
        </div>

        {showPickupCode(order) && order.pickupCode ? (
          <div className="mt-4">
            <PickupCodeBlock code={order.pickupCode} />
          </div>
        ) : null}

        <div className="mt-4 font-display text-[13px] uppercase text-pph-muted">
          See details ›
        </div>

        <div className="mt-3 flex items-center justify-between font-body text-[12px] text-pph-muted">
          <span>
            {order.items.length} item{order.items.length === 1 ? "" : "s"}
          </span>
          <span>{pence(order.totalPence)}</span>
        </div>
      </div>
    </Link>
  );
}

function etaCaption(order: Order): string {
  if (!order.estimatedReadyAt) return "Any moment now";
  const t = new Date(order.estimatedReadyAt).getTime();
  const now = Date.now();
  const diffMin = Math.max(0, Math.round((t - now) / 60_000));
  if (order.status === "ready") return "Pick up now at";
  if (diffMin === 0) return "Any moment now";
  return `Ready in ~${diffMin} min`;
}
