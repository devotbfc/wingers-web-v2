"use client";

import Link from "next/link";
import { headlineForStatus, isLazySwept, showPickupCode } from "@/lib/pph/order-status";
import { pence } from "@/lib/pph/money";
import type { Order } from "@/lib/pph/types";
import { PickupCodeBlock } from "./PickupCodeBlock";

export function OrderStatusCard({ order }: { order: Order }) {
  const headline = headlineForStatus(order);
  const swept = isLazySwept(order);

  return (
    <Link
      href={`/order/status/${order.id}`}
      className={`block rounded-md border p-4 ${
        order.status === "ready"
          ? "border-yellow-400 border-2"
          : swept
            ? "border-red-500"
            : "border-neutral-200"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="font-display text-sm font-bold uppercase tracking-wide">{headline}</div>
        <div className="text-xs text-neutral-500">{order.reference}</div>
      </div>
      {swept ? (
        <p className="mt-1 text-xs text-red-700">
          Please re-order · {order.locationName}
        </p>
      ) : (
        <p className="mt-1 text-xs text-neutral-600">
          {etaCaption(order)} · {order.locationName}
        </p>
      )}
      {showPickupCode(order) && order.pickupCode ? (
        <div className="mt-3">
          <PickupCodeBlock code={order.pickupCode} />
        </div>
      ) : null}
      <div className="mt-3 flex items-center justify-between text-xs text-neutral-500">
        <span>{order.items.length} item{order.items.length === 1 ? "" : "s"}</span>
        <span>{pence(order.totalPence)}</span>
      </div>
    </Link>
  );
}

function etaCaption(order: Order): string {
  if (!order.estimatedReadyAt) return order.locationName;
  const t = new Date(order.estimatedReadyAt).getTime();
  const now = Date.now();
  const diffMin = Math.max(0, Math.round((t - now) / 60_000));
  if (diffMin === 0) return "Ready now";
  return `Ready in ~${diffMin} min`;
}
