"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
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

  const fromStack = active.find((o) => o.id === id) ?? null;
  const [fetched, setFetched] = useState<Order | null>(null);
  const order = fromStack ?? fetched;

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
        <main className="flex-1 p-6 font-body text-[14px] text-pph-muted">Loading…</main>
      </>
    );
  }

  const headline = headlineForStatus(order);
  const swept = isLazySwept(order);
  const isReady = order.status === "ready";

  return (
    <>
      <TopBar title={`Order ${order.reference}`} backHref="/order/menu" />
      <main className="flex-1 space-y-4 px-6 pb-8 pt-4">
        <section
          className={`rounded-[20px] bg-pph-elevated px-5 py-4 ${
            isReady ? "border-2 border-pph-gold" : swept ? "border-2 border-pph-red" : ""
          }`}
        >
          <div
            className={`font-display text-[13px] uppercase ${isReady ? "text-pph-gold-dark" : "text-pph-pink"}`}
          >
            Order {order.reference}
          </div>
          <h2 className="mt-1 font-display text-[20px] uppercase leading-tight text-pph">
            {headline}
          </h2>
          <div className="mt-2 font-body text-[14px] text-pph-muted">
            {swept
              ? `Please re-order · ${order.locationName}`
              : `${etaCaption(order)} · ${order.locationName}`}
          </div>
          {order.pickupCode && (showPickupCode(order) || order.status === "collected") ? (
            <div className="mt-4">
              <PickupCodeBlock
                code={order.pickupCode}
                label={order.status === "collected" ? "Collection code" : "Your collection code"}
              />
            </div>
          ) : null}
        </section>

        <Timeline order={order} />

        <section className="rounded-[20px] bg-pph-elevated px-5 py-4">
          <h3 className="mb-2 font-display text-[13px] uppercase tracking-widest text-pph-muted">
            Items
          </h3>
          <ul className="space-y-2 font-body text-[14px] text-pph">
            {order.items.map((it) => (
              <li key={it.id} className="flex justify-between">
                <span>
                  {it.quantity}× {it.name}
                  {it.modifierLabels.length + it.sauceLabels.length > 0 ? (
                    <span className="mt-0.5 block font-body text-[12px] text-pph-muted">
                      {[...it.modifierLabels, ...it.sauceLabels].join(" · ")}
                    </span>
                  ) : null}
                </span>
                <span>{pence(it.linePricePence)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 space-y-1 font-body text-[14px] text-pph">
            <Row label="Subtotal" value={pence(order.subtotalPence)} />
            {order.discountPence > 0 ? (
              <Row label="Discount" value={`−${pence(order.discountPence)}`} />
            ) : null}
            <Row
              label="Total"
              value={
                order.paymentMethod === "points" ? "Paid with points" : pence(order.totalPence)
              }
              bold
            />
          </div>
          <p className="mt-3 font-body text-[12px] text-pph-muted">
            Payment: {order.paymentMethod}
            {order.isPaid ? " · paid" : ""}
          </p>
          {order.pointsEarned > 0 ? (
            <p className="mt-1 font-body text-[12px] text-pph-gold-dark">
              You earned {order.pointsEarned} pts.
            </p>
          ) : null}
        </section>

        {swept ? (
          <Link
            href="/order/menu"
            className="inline-flex h-14 w-full items-center justify-center rounded-pill bg-pph-pink font-display text-[15px] uppercase text-pph-on-pink hover:brightness-95"
          >
            Start a new order
          </Link>
        ) : null}
      </main>
    </>
  );
}

function etaCaption(order: Order): string {
  if (!order.estimatedReadyAt) return "Any moment now";
  const t = new Date(order.estimatedReadyAt).getTime();
  const diffMin = Math.max(0, Math.round((t - Date.now()) / 60_000));
  if (order.status === "ready") return "Pick up now";
  if (diffMin === 0) return "Any moment now";
  return `Ready in ~${diffMin} min`;
}

function Row({ label, value, bold = false }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between ${bold ? "font-display text-[15px] text-pph" : ""}`}>
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
    <section className="rounded-[20px] bg-pph-elevated px-5 py-4">
      <h3 className="mb-3 font-display text-[13px] uppercase tracking-widest text-pph-muted">
        Progress
      </h3>
      <ol className="space-y-2 font-body text-[14px]">
        {steps.map((s, i) => {
          const reached = i <= idx;
          return (
            <li
              key={s.key}
              className={`flex items-center gap-2 ${reached ? "text-pph" : "text-pph-muted"}`}
            >
              <span
                className={`h-2.5 w-2.5 rounded-pill ${reached ? "bg-pph-pink" : "bg-pph-muted/40"}`}
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
