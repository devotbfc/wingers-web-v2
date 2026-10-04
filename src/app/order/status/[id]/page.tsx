"use client";

import { use, useEffect, useState } from "react";
import { BrandButton } from "@/components/brand/BrandButton";
import { PickupCodeBlock } from "@/components/pph/PickupCodeBlock";
import { TopBar } from "@/components/pph/TopBar";
import { useOrderStack } from "@/lib/order-stack/context";
import { pence } from "@/lib/pph/money";
import { headlineForStatus, isLazySwept, showPickupCode } from "@/lib/pph/order-status";
import { pph } from "@/lib/pph/singleton";
import type { Order } from "@/lib/pph/types";

export default function OrderStatusPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { active, upsert } = useOrderStack();

  // Live view: whatever's currently on the active stack if present (it ticks
  // on the 8s poll inside OrderStackProvider).
  const fromStack = active.find((o) => o.id === id) ?? null;
  const [fetched, setFetched] = useState<Order | null>(null);
  const order = fromStack ?? fetched;

  // Deep-link fetch: if the stack doesn't have the order yet, pull it once.
  useEffect(() => {
    if (fromStack) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await pph.getOrder(id);
        if (cancelled) return;
        if (res.success) {
          setFetched(res.data);
          upsert(res.data);
        }
      } catch {
        // ignore
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id, fromStack, upsert]);

  if (!order) {
    return (
      <>
        <TopBar title="Order" backHref="/order/menu" />
        <main className="flex-1 p-6 text-sm text-neutral-500">Loading…</main>
      </>
    );
  }

  const headline = headlineForStatus(order);
  const swept = isLazySwept(order);

  return (
    <>
      <TopBar title={`Order ${order.reference}`} backHref="/order/menu" />
      <main className="flex-1 space-y-4 p-4 pb-8">
        <section
          className={`rounded-md border p-4 ${
            order.status === "ready" ? "border-yellow-400 border-2" : swept ? "border-red-500" : "border-neutral-200"
          }`}
        >
          <h2 className="font-display text-lg font-bold uppercase tracking-wide">{headline}</h2>
          {swept ? (
            <p className="mt-1 text-xs text-red-700">
              Please re-order · {order.locationName}
            </p>
          ) : (
            <p className="mt-1 text-xs text-neutral-600">
              {etaCaption(order)} · {order.locationName}
            </p>
          )}
          {order.pickupCode && (showPickupCode(order) || order.status === "collected") ? (
            <div className="mt-3">
              <PickupCodeBlock
                code={order.pickupCode}
                label={order.status === "collected" ? "Collection code" : "Your collection code"}
              />
            </div>
          ) : null}
        </section>

        <Timeline order={order} />

        <section className="rounded-md border border-neutral-200 p-4">
          <h3 className="mb-2 font-display text-xs font-bold uppercase">Items</h3>
          <ul className="space-y-1 text-sm">
            {order.items.map((it) => (
              <li key={it.id} className="flex justify-between">
                <span>
                  {it.quantity}× {it.name}
                  {it.modifierLabels.length + it.sauceLabels.length > 0 ? (
                    <span className="block text-xs text-neutral-500">
                      {[...it.modifierLabels, ...it.sauceLabels].join(" · ")}
                    </span>
                  ) : null}
                </span>
                <span>{pence(it.linePricePence)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 space-y-1 text-sm">
            <Row label="Subtotal" value={pence(order.subtotalPence)} />
            {order.discountPence > 0 ? (
              <Row label="Discount" value={`−${pence(order.discountPence)}`} />
            ) : null}
            <Row
              label="Total"
              value={order.paymentMethod === "points" ? "Paid with points" : pence(order.totalPence)}
              bold
            />
          </div>
          <p className="mt-3 text-xs text-neutral-500">
            Payment: {order.paymentMethod}
            {order.isPaid ? " · paid" : ""}
          </p>
          {order.pointsEarned > 0 ? (
            <p className="mt-1 text-xs text-neutral-500">
              You earned {order.pointsEarned} pts.
            </p>
          ) : null}
        </section>

        {swept ? (
          <BrandButton variant="primary" size="lg" className="w-full" href="/order/menu">
            Start a new order
          </BrandButton>
        ) : null}
      </main>
    </>
  );
}

function etaCaption(order: Order): string {
  if (!order.estimatedReadyAt) return "";
  const t = new Date(order.estimatedReadyAt).getTime();
  const diffMin = Math.max(0, Math.round((t - Date.now()) / 60_000));
  if (diffMin === 0) return "Ready now";
  return `Ready in ~${diffMin} min`;
}

function Row({ label, value, bold = false }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between ${bold ? "font-bold" : ""}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function Timeline({ order }: { order: Order }) {
  const steps: { key: Order["status"]; label: string }[] = [
    { key: "pending", label: "Placed" },
    { key: "confirmed", label: "Confirmed" },
    { key: "preparing", label: "Preparing" },
    { key: "ready", label: "Ready to collect" },
    { key: "collected", label: "Collected" },
  ];
  const idx = steps.findIndex((s) => s.key === order.status);
  return (
    <section className="rounded-md border border-neutral-200 p-4">
      <h3 className="mb-3 font-display text-xs font-bold uppercase">Progress</h3>
      <ol className="space-y-2 text-sm">
        {steps.map((s, i) => {
          const reached = i <= idx;
          return (
            <li key={s.key} className={`flex items-center gap-2 ${reached ? "text-brand-black" : "text-neutral-400"}`}>
              <span
                className={`h-2.5 w-2.5 rounded-full ${reached ? "bg-brand-pink" : "bg-neutral-300"}`}
                aria-hidden
              />
              {s.label}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
