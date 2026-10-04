"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BrandButton } from "@/components/brand/BrandButton";
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
        <main className="flex-1 p-6 text-center">
          <p className="mb-3 text-sm text-neutral-600">
            Sign in to see your points, vouchers and order history.
          </p>
          <BrandButton variant="primary" size="lg" className="w-full" href="/order/auth/login?returnTo=/order/account">
            Sign in
          </BrandButton>
          <Link href="/order/auth/signup?returnTo=/order/account" className="mt-2 block text-sm underline">
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
      <main className="flex-1 space-y-4 p-4 pb-8">
        <section className="rounded-md border border-neutral-200 p-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="font-display text-lg font-bold">
                {auth.user?.firstName} {auth.user?.lastName}
              </div>
              <div className="text-xs text-neutral-500">{auth.user?.email}</div>
              {bl ? (
                <div className="mt-2">
                  <BlueLightBadge variant="verified" />
                </div>
              ) : null}
            </div>
            {loyalty ? <PointsPill points={loyalty.points} /> : null}
          </div>
          {loyalty ? (
            <div className="mt-3 text-xs text-neutral-600">
              {loyalty.tierName}
              {loyalty.nextTierAt != null
                ? ` · ${Math.max(0, loyalty.nextTierAt - loyalty.lifetimePoints)} pts to next tier`
                : ""}
            </div>
          ) : null}
        </section>

        <nav className="rounded-md border border-neutral-200">
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
          className="w-full py-3 text-sm text-neutral-500 underline"
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
      className="flex items-center justify-between border-b border-neutral-100 px-3 py-3 text-sm last:border-b-0"
    >
      <span>{label}</span>
      <span className="text-neutral-400">→</span>
    </Link>
  );
}
