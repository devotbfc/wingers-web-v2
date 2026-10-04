"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { TopBar } from "@/components/pph/TopBar";
import { useAuth } from "@/lib/pph/auth-store";
import { pence } from "@/lib/pph/money";
import { pph } from "@/lib/pph/singleton";
import type { Order } from "@/lib/pph/types";

export default function HistoryPage() {
  const auth = useAuth();
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    if (auth.status !== "authenticated") return;
    let cancelled = false;
    (async () => {
      try {
        const res = await pph.getOrders();
        if (cancelled) return;
        if (res.success) setOrders(res.data);
      } catch {
        // ignore
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [auth.status]);

  if (auth.status === "unauthenticated") {
    return (
      <>
        <TopBar title="Order history" backHref="/order/menu" />
        <main className="flex-1 p-6 text-center">
          <p className="mb-3 font-body text-[14px] text-pph-muted">Sign in to view your orders.</p>
          <Link
            href="/order/auth/login"
            className="font-display text-[13px] uppercase text-pph-pink underline"
          >
            Sign in
          </Link>
        </main>
      </>
    );
  }

  if (orders == null) {
    return (
      <>
        <TopBar title="Order history" backHref="/order/menu" />
        <main className="flex-1 p-6 font-body text-[14px] text-pph-muted">Loading…</main>
      </>
    );
  }

  if (orders.length === 0) {
    return (
      <>
        <TopBar title="Order history" backHref="/order/menu" />
        <main className="flex-1 p-6 font-body text-[14px] text-pph-muted">No orders yet.</main>
      </>
    );
  }

  return (
    <>
      <TopBar title="Order history" backHref="/order/menu" />
      <main className="flex-1 divide-pph-elevated px-6 pb-8">
        {orders.map((o) => (
          <Link
            key={o.id}
            href={`/order/status/${o.id}`}
            className="flex items-center justify-between py-4"
          >
            <div className="min-w-0 flex-1">
              <div className="font-display text-[15px] uppercase text-pph">{o.reference}</div>
              <div className="mt-0.5 font-body text-[12px] text-pph-muted">
                {new Date(o.createdAt).toLocaleString()} · {o.locationName}
              </div>
            </div>
            <div className="shrink-0 text-right">
              <div className="font-display text-[15px] text-pph">{pence(o.totalPence)}</div>
              <div className="mt-0.5 font-display text-[11px] uppercase text-pph-muted">
                {o.status}
              </div>
            </div>
          </Link>
        ))}
      </main>
    </>
  );
}
