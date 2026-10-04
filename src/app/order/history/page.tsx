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
        <main className="flex-1 p-6 text-center text-sm">
          <p className="mb-3 text-neutral-600">Sign in to view your orders.</p>
          <Link href="/order/auth/login" className="text-brand-pink underline">
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
        <main className="flex-1 p-6 text-sm text-neutral-500">Loading…</main>
      </>
    );
  }

  if (orders.length === 0) {
    return (
      <>
        <TopBar title="Order history" backHref="/order/menu" />
        <main className="flex-1 p-6 text-sm text-neutral-500">No orders yet.</main>
      </>
    );
  }

  return (
    <>
      <TopBar title="Order history" backHref="/order/menu" />
      <main className="flex-1 divide-y divide-neutral-100 px-4 pb-8">
        {orders.map((o) => (
          <Link
            key={o.id}
            href={`/order/status/${o.id}`}
            className="flex items-center justify-between py-3"
          >
            <div>
              <div className="font-display text-sm font-bold">{o.reference}</div>
              <div className="text-xs text-neutral-500">
                {new Date(o.createdAt).toLocaleString()} · {o.locationName}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold">{pence(o.totalPence)}</div>
              <div className="text-xs text-neutral-500">{o.status}</div>
            </div>
          </Link>
        ))}
      </main>
    </>
  );
}
