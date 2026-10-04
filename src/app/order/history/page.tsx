"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
      <div className="mx-auto w-full max-w-md px-6 pb-8 text-center">
        <h1 className="mb-3 font-display text-[28px] uppercase tracking-tight text-pph">
          Order history
        </h1>
        <p className="mb-3 font-body text-[14px] text-pph-muted">Sign in to view your orders.</p>
        <Link
          href="/order/auth/login"
          className="font-display text-[13px] uppercase text-pph-pink underline"
        >
          Sign in
        </Link>
      </div>
    );
  }

  if (orders == null) {
    return (
      <div className="mx-auto w-full max-w-md px-6 pb-8">
        <h1 className="mb-3 font-display text-[28px] uppercase tracking-tight text-pph">
          Order history
        </h1>
        <p className="font-body text-[14px] text-pph-muted">Loading…</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="mx-auto w-full max-w-md px-6 pb-8">
        <h1 className="mb-3 font-display text-[28px] uppercase tracking-tight text-pph">
          Order history
        </h1>
        <p className="font-body text-[14px] text-pph-muted">No orders yet.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md px-6 pb-8">
      <h1 className="mb-2 font-display text-[28px] uppercase tracking-tight text-pph">
        Order history
      </h1>
      <ul className="divide-pph-elevated">
        {orders.map((o) => (
          <li key={o.id}>
            <Link
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
          </li>
        ))}
      </ul>
    </div>
  );
}
