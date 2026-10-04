"use client";

import { useEffect, useState } from "react";
import { TopBar } from "@/components/pph/TopBar";
import { useAuth } from "@/lib/pph/auth-store";
import { pph } from "@/lib/pph/singleton";
import type { Voucher } from "@/lib/pph/types";

const STATUS_ORDER: Voucher["status"][] = ["issued", "applied", "expired", "void"];

export default function VouchersPage() {
  const auth = useAuth();
  const [vouchers, setVouchers] = useState<Voucher[] | null>(null);

  useEffect(() => {
    if (auth.status !== "authenticated") return;
    let cancelled = false;
    (async () => {
      try {
        const res = await pph.listVouchers();
        if (cancelled) return;
        if (res.success) setVouchers(res.data.items);
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
        <TopBar title="Vouchers" backHref="/order/account" />
        <main className="flex-1 p-6 text-sm text-neutral-500">Sign in to view your vouchers.</main>
      </>
    );
  }

  if (!vouchers) {
    return (
      <>
        <TopBar title="Vouchers" backHref="/order/account" />
        <main className="flex-1 p-6 text-sm text-neutral-500">Loading…</main>
      </>
    );
  }

  const grouped = STATUS_ORDER.map((status) => ({
    status,
    items: vouchers.filter((v) => v.status === status),
  })).filter((g) => g.items.length > 0);

  return (
    <>
      <TopBar title="Vouchers" backHref="/order/account" />
      <main className="flex-1 space-y-4 p-4 pb-8">
        {grouped.length === 0 ? (
          <p className="text-sm text-neutral-500">No vouchers yet.</p>
        ) : null}
        {grouped.map((g) => (
          <section key={g.status}>
            <h2 className="mb-2 font-display text-xs font-bold uppercase tracking-wide text-neutral-500">
              {g.status}
            </h2>
            <ul className="rounded-md border border-neutral-200 divide-y divide-neutral-100">
              {g.items.map((v) => (
                <li
                  key={v.id}
                  className={`flex items-center justify-between px-3 py-3 text-sm ${
                    g.status === "expired" || g.status === "void" ? "opacity-55" : ""
                  }`}
                >
                  <div>
                    <div className="font-bold">{v.rewardName}</div>
                    <div className="text-xs text-neutral-500">
                      {g.status === "issued" ? `Expires ${relative(v.expiresAt)}` : null}
                      {g.status === "applied" && v.appliedAt ? `Applied ${relative(v.appliedAt)}` : null}
                      {g.status === "expired" ? `Expired ${relative(v.expiresAt)}` : null}
                      {g.status === "void" ? "Voided" : null}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
    </>
  );
}

function relative(iso: string): string {
  const diffMs = new Date(iso).getTime() - Date.now();
  const abs = Math.abs(diffMs);
  const days = Math.round(abs / 86_400_000);
  if (days === 0) return "today";
  if (days === 1) return diffMs > 0 ? "tomorrow" : "yesterday";
  return diffMs > 0 ? `in ${days}d` : `${days}d ago`;
}
