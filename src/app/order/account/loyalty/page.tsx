"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BlueLightBadge } from "@/components/pph/BlueLightBadge";
import { PointsPill } from "@/components/pph/PointsPill";
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
      <div className="mx-auto w-full max-w-md px-6 pb-8">
        <h1 className="mb-3 font-display text-[28px] uppercase tracking-tight text-pph">
          Loyalty
        </h1>
        <p className="font-body text-[14px] text-pph-muted">
          Sign in to see your points and rewards.
        </p>
      </div>
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
        toast.error("Something went wrong. Re-open the page before trying again.");
      }
    } finally {
      setRedeemingId(null);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-4 px-6 pb-8">
      <h1 className="font-display text-[28px] uppercase tracking-tight text-pph">
        Loyalty
      </h1>
      {loyalty ? (
          <section className="rounded-[20px] bg-pph-elevated px-5 py-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="font-display text-[36px] leading-none text-pph-gold-dark">
                  {loyalty.points} pts
                </div>
                <div className="mt-1 font-body text-[13px] text-pph-muted">
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
            <h2 className="mb-2 font-display text-[13px] uppercase tracking-widest text-pph-muted">
              Tiers
            </h2>
            <ul className="divide-pph-elevated overflow-hidden rounded-[16px] bg-pph-elevated">
              {tiers.map((t) => (
                <li key={t.tier} className="flex items-center justify-between px-4 py-3">
                  <span className="font-display text-[14px] uppercase text-pph">{t.tierName}</span>
                  <span className="font-body text-[12px] text-pph-muted">
                    {t.thresholdPoints}+ pts · ×{t.multiplier.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section>
          <h2 className="mb-2 font-display text-[13px] uppercase tracking-widest text-pph-muted">
            Rewards
          </h2>
          <ul className="space-y-2">
            {rewards.map((r) => {
              const balance = loyalty?.points ?? 0;
              const canAfford = balance >= r.costPoints;
              return (
                <li key={r.id} className="rounded-[16px] bg-pph-elevated px-4 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="font-display text-[15px] uppercase text-pph">{r.name}</div>
                      <div className="mt-0.5 font-body text-[13px] text-pph-muted">
                        {r.description}
                      </div>
                    </div>
                    <div className="shrink-0 font-display text-[13px] text-pph-gold-dark">
                      {r.costPoints} pts
                    </div>
                  </div>
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={() => redeem(r)}
                      disabled={!canAfford || !!redeemingId}
                      className={`inline-flex h-10 items-center justify-center rounded-pill px-5 font-display text-[13px] uppercase ${
                        canAfford && !redeemingId
                          ? "bg-pph-pink text-pph-on-pink hover:brightness-95"
                          : "bg-pph-surface text-pph-muted"
                      }`}
                    >
                      {redeemingId === r.id
                        ? "Redeeming…"
                        : canAfford
                          ? "Redeem"
                          : `${r.costPoints - balance} pts to go`}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

      {ledger.length > 0 ? (
        <section>
          <h2 className="mb-2 font-display text-[13px] uppercase tracking-widest text-pph-muted">
            Recent activity
          </h2>
          <ul className="divide-pph-elevated overflow-hidden rounded-[16px] bg-pph-elevated">
            {ledger.map((e) => (
              <li key={e.id} className="flex items-center justify-between px-4 py-3">
                <div className="min-w-0 flex-1">
                  <div className="font-display text-[13px] uppercase text-pph">
                    {e.sourceLabel}
                  </div>
                  <div className="mt-0.5 font-body text-[11px] text-pph-muted">
                    {new Date(e.createdAt).toLocaleString()}
                  </div>
                </div>
                <div
                  className={`font-display text-[14px] ${
                    e.delta < 0 ? "text-pph-red" : "text-pph-gold-dark"
                  }`}
                >
                  {e.delta > 0 ? "+" : ""}
                  {e.delta}
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
