"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { BlueLightBadge } from "@/components/pph/BlueLightBadge";
import { PointsPill } from "@/components/pph/PointsPill";
import { TopBar } from "@/components/pph/TopBar";
import { authStore, useAuth } from "@/lib/pph/auth-store";
import { pph } from "@/lib/pph/singleton";
import type { LoyaltyAccount } from "@/lib/pph/types";

export default function AccountPage() {
  const auth = useAuth();
  const [loyalty, setLoyalty] = useState<LoyaltyAccount | null>(null);
  const [nowMs] = useState<number>(() => Date.now());

  useEffect(() => {
    if (auth.status !== "authenticated") return;
    let cancelled = false;
    (async () => {
      try {
        const res = await pph.getLoyaltyAccount();
        if (cancelled) return;
        if (res.success) setLoyalty(res.data);
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
        <TopBar title="Account" backHref="/order/menu" />
        <main className="flex-1 space-y-3 p-6 text-center">
          <p className="font-body text-[14px] text-pph-muted">
            Sign in to see your points, vouchers and order history.
          </p>
          <Link
            href="/order/auth/login?returnTo=/order/account"
            className="inline-flex h-14 w-full items-center justify-center rounded-pill bg-pph-pink font-display text-[15px] uppercase text-pph-on-pink hover:brightness-95"
          >
            Sign in
          </Link>
          <Link
            href="/order/auth/signup?returnTo=/order/account"
            className="block font-display text-[13px] uppercase text-pph underline"
          >
            Create an account
          </Link>
        </main>
      </>
    );
  }

  const bl =
    auth.user?.blueLightVerifiedUntil != null &&
    new Date(auth.user.blueLightVerifiedUntil).getTime() > nowMs;

  return (
    <>
      <TopBar title="Account" backHref="/order/menu" />
      <main className="flex-1 space-y-4 px-6 pb-8 pt-4">
        <section className="rounded-[20px] bg-pph-elevated px-5 py-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="font-display text-[20px] uppercase text-pph">
                {auth.user?.firstName} {auth.user?.lastName}
              </div>
              <div className="mt-0.5 font-body text-[12px] text-pph-muted">
                {auth.user?.email}
              </div>
              {bl ? (
                <div className="mt-2">
                  <BlueLightBadge variant="verified" />
                </div>
              ) : null}
            </div>
            {loyalty ? <PointsPill points={loyalty.points} /> : null}
          </div>
          {loyalty ? (
            <div className="mt-3 font-body text-[13px] text-pph-muted">
              {loyalty.tierName}
              {loyalty.nextTierAt != null
                ? ` · ${Math.max(0, loyalty.nextTierAt - loyalty.lifetimePoints)} pts to next tier`
                : ""}
            </div>
          ) : null}
        </section>

        <nav className="divide-pph-elevated overflow-hidden rounded-[20px] bg-pph-elevated">
          <AccountRow href="/order/account/loyalty" label="Loyalty & rewards" />
          <AccountRow href="/order/account/vouchers" label="Vouchers" />
          <AccountRow href="/order/history" label="Order history" />
        </nav>

        <button
          type="button"
          onClick={async () => {
            try {
              await pph.logout(auth.refreshToken);
            } catch {
              // ignore
            }
            authStore.markUnauthenticated();
          }}
          className="block w-full py-3 text-center font-display text-[13px] uppercase text-pph-muted underline"
        >
          Sign out
        </button>
      </main>
    </>
  );
}

function AccountRow({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="flex min-h-[52px] items-center justify-between px-5 py-3 font-display text-[14px] uppercase text-pph hover:bg-pph-text/10"
    >
      <span>{label}</span>
      <ChevronRight className="h-4 w-4 text-pph-muted" strokeWidth={1.5} />
    </Link>
  );
}
