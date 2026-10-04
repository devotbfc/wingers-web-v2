"use client";

import { useEffect, useState } from "react";
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
      <div className="mx-auto w-full max-w-md px-6 pb-8">
        <h1 className="mb-3 font-display text-[28px] uppercase tracking-tight text-pph">
          Vouchers
        </h1>
        <p className="font-body text-[14px] text-pph-muted">
          Sign in to view your vouchers.
        </p>
      </div>
    );
  }

  if (!vouchers) {
    return (
      <div className="mx-auto w-full max-w-md px-6 pb-8">
        <h1 className="mb-3 font-display text-[28px] uppercase tracking-tight text-pph">
          Vouchers
        </h1>
        <p className="font-body text-[14px] text-pph-muted">Loading…</p>
      </div>
    );
  }

  const grouped = STATUS_ORDER.map((status) => ({
    status,
    items: vouchers.filter((v) => v.status === status),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="mx-auto w-full max-w-md space-y-4 px-6 pb-8">
      <h1 className="font-display text-[28px] uppercase tracking-tight text-pph">
        Vouchers
      </h1>
      {grouped.length === 0 ? (
        <p className="font-body text-[14px] text-pph-muted">No vouchers yet.</p>
      ) : null}
      {grouped.map((g) => (
          <section key={g.status}>
            <h2 className="mb-2 font-display text-[13px] uppercase tracking-widest text-pph-muted">
              {g.status}
            </h2>
            <ul className="divide-pph-elevated overflow-hidden rounded-[16px] bg-pph-elevated">
              {g.items.map((v) => (
                <li
                  key={v.id}
                  className={`flex items-center justify-between px-4 py-3 ${
                    g.status === "expired" || g.status === "void" ? "opacity-55" : ""
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="font-display text-[14px] uppercase text-pph">
                      {v.rewardName}
                    </div>
                    <div className="mt-0.5 font-body text-[12px] text-pph-muted">
                      {g.status === "issued" ? `Expires ${relative(v.expiresAt)}` : null}
                      {g.status === "applied" && v.appliedAt
                        ? `Applied ${relative(v.appliedAt)}`
                        : null}
                      {g.status === "expired" ? `Expired ${relative(v.expiresAt)}` : null}
                      {g.status === "void" ? "Voided" : null}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
      ))}
    </div>
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
