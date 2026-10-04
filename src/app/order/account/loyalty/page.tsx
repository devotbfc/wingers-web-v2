"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BrandButton } from "@/components/brand/BrandButton";
import { BlueLightBadge } from "@/components/pph/BlueLightBadge";
import { PointsPill } from "@/components/pph/PointsPill";
import { TopBar } from "@/components/pph/TopBar";
import { useAuth } from "@/lib/pph/auth-store";
import { PphApiError, mapErrorCodeToCopy } from "@/lib/pph/errors";
import { pph } from "@/lib/pph/singleton";
import type { LedgerEntry, LoyaltyAccount, Reward, TierRule } from "@/lib/pph/types";

export default function LoyaltyPage() {
  const auth = useAuth();
  const [loyalty, setLoyalty] = useState<LoyaltyAccount | null>(null);
  const [tiers, setTiers] = useState<TierRule[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [ledger, setLedger] = useState<LedgerEntry[]>([]);
  const [redeemingId, setRedeemingId] = useState<string | null>(null);

  useEffect(() => {
    if (auth.status !== "authenticated") return;
    let cancelled = false;
    (async () => {
      try {
        const [l, t, r, led] = await Promise.all([
          pph.getLoyaltyAccount(),
          pph.getTiers(),
          pph.getRewards(),
          pph.getLoyaltyLedger(null),
        ]);
        if (cancelled) return;
        if (l.success) setLoyalty(l.data);
        if (t.success) setTiers(t.data.items);
        if (r.success) setRewards(r.data.items);
        if (led.success) setLedger(led.data.items);
      } catch {
        // ignore
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [auth.status]);

  const [nowMs] = useState<number>(() => Date.now());
  const blueLight =
    auth.user?.blueLightVerifiedUntil != null &&
    new Date(auth.user.blueLightVerifiedUntil).getTime() > nowMs;

  if (auth.status === "unauthenticated") {
    return (
      <>
        <TopBar title="Loyalty" backHref="/order/menu" />
        <main className="flex-1 p-6 text-sm text-neutral-500">Sign in to see your points and rewards.</main>
      </>
    );
  }

  async function redeem(reward: Reward) {
    if (redeemingId) return; // double-tap guard — redeem is non-idempotent server-side
    setRedeemingId(reward.id);
    try {
      const res = await pph.redeemReward(reward.id);
      if (!res.success) {
        toast.error(res.error ? mapErrorCodeToCopy(res.error.code) : "Redeem failed.");
        return;
      }
      setLoyalty((prev) => (prev ? { ...prev, points: res.data.balanceAfter } : prev));
      toast.success(`${reward.name} added to your vouchers.`);
    } catch (err) {
      if (err instanceof PphApiError) {
        toast.error(mapErrorCodeToCopy(err.code));
      } else {
        // Network/unknown error: do NOT auto-retry. Ask user to re-open the
        // page (which refetches vouchers) before trying again.
        toast.error("Something went wrong. Re-open the page before trying again.");
      }
    } finally {
      setRedeemingId(null);
    }
  }

  return (
    <>
      <TopBar title="Loyalty" backHref="/order/menu" />
      <main className="flex-1 space-y-4 p-4 pb-8">
        {loyalty ? (
          <section className="rounded-md border border-neutral-200 p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-display text-2xl font-extrabold">{loyalty.points} pts</div>
                <div className="text-xs text-neutral-500">
                  {loyalty.tierName}
                  {loyalty.nextTierAt != null
                    ? ` · ${Math.max(0, loyalty.nextTierAt - loyalty.lifetimePoints)} pts to next tier`
                    : ""}
                </div>
                {blueLight ? (
                  <div className="mt-2">
                    <BlueLightBadge variant="verified" />
                  </div>
                ) : null}
              </div>
              <PointsPill points={loyalty.points} />
            </div>
          </section>
        ) : null}

        {tiers.length > 0 ? (
          <section>
            <h2 className="mb-2 font-display text-xs font-bold uppercase text-neutral-500">Tiers</h2>
            <ul className="rounded-md border border-neutral-200 divide-y divide-neutral-100 text-sm">
              {tiers.map((t) => (
                <li key={t.tier} className="flex items-center justify-between px-3 py-2">
                  <span className="font-bold">{t.tierName}</span>
                  <span className="text-xs text-neutral-500">
                    {t.thresholdPoints}+ pts · ×{t.multiplier.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section>
          <h2 className="mb-2 font-display text-xs font-bold uppercase text-neutral-500">Rewards</h2>
          <ul className="space-y-2">
            {rewards.map((r) => {
              const balance = loyalty?.points ?? 0;
              const canAfford = balance >= r.costPoints;
              return (
                <li key={r.id} className="rounded-md border border-neutral-200 p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-display text-sm font-bold">{r.name}</div>
                      <div className="text-xs text-neutral-500">{r.description}</div>
                    </div>
                    <div className="text-xs font-bold">{r.costPoints} pts</div>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <BrandButton
                      variant="primary"
                      size="sm"
                      onClick={() => redeem(r)}
                      disabled={!canAfford || !!redeemingId}
                    >
                      {redeemingId === r.id ? "Redeeming…" : canAfford ? "Redeem" : `${r.costPoints - balance} pts to go`}
                    </BrandButton>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        {ledger.length > 0 ? (
          <section>
            <h2 className="mb-2 font-display text-xs font-bold uppercase text-neutral-500">Recent activity</h2>
            <ul className="rounded-md border border-neutral-200 divide-y divide-neutral-100 text-sm">
              {ledger.map((e) => (
                <li key={e.id} className="flex items-center justify-between px-3 py-2">
                  <div>
                    <div className="font-bold">{e.sourceLabel}</div>
                    <div className="text-xs text-neutral-500">{new Date(e.createdAt).toLocaleString()}</div>
                  </div>
                  <div className={`font-bold ${e.delta < 0 ? "text-red-600" : "text-emerald-600"}`}>
                    {e.delta > 0 ? "+" : ""}
                    {e.delta}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </main>
    </>
  );
}
