"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BrandButton } from "@/components/brand/BrandButton";
import { CheckoutConfirmSheet } from "@/components/pph/CheckoutConfirmSheet";
import { MockPaymentSheet } from "@/components/pph/MockPaymentSheet";
import { ScheduleSheet } from "@/components/pph/ScheduleSheet";
import { TopBar } from "@/components/pph/TopBar";
import { track } from "@/lib/analytics/meta-pixel";
import { useCart } from "@/lib/cart/context";
import { useOrderStack } from "@/lib/order-stack/context";
import { useAuth } from "@/lib/pph/auth-store";
import { PphApiError, mapErrorCodeToCopy } from "@/lib/pph/errors";
import { cartSignature, newIdempotencyKey } from "@/lib/pph/idempotency";
import { pence } from "@/lib/pph/money";
import { paymentAdapter } from "@/lib/pph/payment/pick-adapter";
import { getMinPickupLeadMinutes, isSlotStillAvailable } from "@/lib/pph/pickup";
import { estimatePointsFromLines } from "@/lib/pph/points";
import { useLocations } from "@/lib/pph/hooks";
import { pph } from "@/lib/pph/singleton";
import type { Order, OrderSubmissionLine, Tender } from "@/lib/pph/types";

type PendingIntent = {
  key: string;
  signature: string;
  orderId: string;
  clientSecret: string;
  totalPence: number;
};

export default function CheckoutPage() {
  const router = useRouter();
  const { locations } = useLocations();
  const { state, setTender, setPromo, clear } = useCart();
  const { active: activeOrders, upsert } = useOrderStack();
  const auth = useAuth();

  const location = locations.find((l) => l.id === state.locationId) ?? null;
  const [pickupMode, setPickupMode] = useState<"asap" | "scheduled">("asap");
  const [scheduledFor, setScheduledFor] = useState<string | null>(null);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [promoInput, setPromoInput] = useState(state.promoCode ?? "");
  const [staleBanner, setStaleBanner] = useState(false);
  const [pending, setPending] = useState<PendingIntent | null>(null);
  const initiatedRef = useRef(false);
  // Pin Date.now() to mount time via useState's lazy initialiser (pure under
  // react-hooks/purity). Blue Light's "verified until" check compares against
  // this; the UI doesn't need second-by-second accuracy.
  const [mountedAtMs] = useState<number>(() => Date.now());

  const estimatedPoints = useMemo(() => estimatePointsFromLines(state.lines), [state.lines]);
  const pointsEligible = state.lines.every((l) => l.pointsPricePerUnit != null);
  const pointsCost = useMemo(() => {
    if (state.tender !== "points" || !pointsEligible) return null;
    return state.lines.reduce((s, l) => s + (l.pointsPricePerUnit ?? 0) * l.quantity, 0);
  }, [state.lines, state.tender, pointsEligible]);

  const blueLightActive =
    mountedAtMs > 0 &&
    auth.user?.blueLightVerifiedUntil != null &&
    new Date(auth.user.blueLightVerifiedUntil).getTime() > mountedAtMs;

  const voucherOrPromoOrPoints =
    !!state.voucherId || !!state.promoCode || state.tender === "points";
  const blueLightApplies = blueLightActive && !voucherOrPromoOrPoints;
  const blueLightDiscount = blueLightApplies ? Math.floor(subtotal(state.lines) * 0.2) : 0;

  const subtotalPence = subtotal(state.lines);
  const totalPence =
    state.tender === "points" ? 0 : Math.max(0, subtotalPence - blueLightDiscount);

  const pendingOrder = activeOrders.find(
    (o) => o.status !== "collected" && o.status !== "cancelled",
  ) ?? null;

  // Fire InitiateCheckout once per mount, gated by the existing consent-aware
  // meta-pixel helper (track() is a no-op when consent is withheld).
  useEffect(() => {
    if (initiatedRef.current) return;
    initiatedRef.current = true;
    track("InitiateCheckout", {
      content_category: "pph",
      destination: "/order/checkout",
    });
  }, []);

  // Re-mint idempotency key whenever the submitted-payload signature changes.
  // Syncs React state to an external invariant (the server-visible payload
  // shape), so this is the correct effect pattern.
  const sig = useMemo(
    () => cartSignature(state.lines, state.tender, state.voucherId, state.promoCode),
    [state.lines, state.tender, state.voucherId, state.promoCode],
  );
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPending((prev) => (prev && prev.signature === sig ? prev : null));
  }, [sig]);

  if (!location) {
    return (
      <>
        <TopBar title="Checkout" backHref="/order/basket" />
        <main className="flex-1 p-4 text-sm text-neutral-500">Pick a location to continue.</main>
      </>
    );
  }

  if (state.lines.length === 0) {
    return (
      <>
        <TopBar title="Checkout" backHref="/order/menu" />
        <main className="flex-1 p-6 text-center text-sm text-neutral-500">
          Your basket is empty.
        </main>
      </>
    );
  }

  async function doSubmit() {
    if (!auth.user) {
      router.push(`/order/auth/login?returnTo=${encodeURIComponent("/order/checkout")}`);
      return;
    }
    const key = pending && pending.signature === sig ? pending.key : newIdempotencyKey();

    if (!state.menuUpdatedAt) {
      setError("Menu context missing — please re-open the menu and try again.");
      return;
    }
    if (pickupMode === "scheduled" && location) {
      if (!scheduledFor || !isSlotStillAvailable(scheduledFor, location)) {
        setError("That pickup time is no longer available — please pick a new slot or switch to ASAP.");
        return;
      }
    }

    const payloadLines: OrderSubmissionLine[] = state.lines.map((l) => ({
      menuItemId: l.menuItemId,
      quantity: l.quantity,
      selectedModifierIds: l.selectedModifierIds,
      selectedSauceIds: l.selectedSauceIds,
    }));

    const tender: Tender = state.tender === "points" ? "points" : "mock_card";

    setSubmitting(true);
    setError(null);
    try {
      if (!location) {
        setError("Pick a location to continue.");
        return;
      }
      const res = await pph.submitOrder({
        idempotencyKey: key,
        locationId: location.id,
        menuUpdatedAt: state.menuUpdatedAt,
        lines: payloadLines,
        clientSubtotalPence: subtotalPence,
        pickupMode,
        scheduledFor: pickupMode === "scheduled" ? scheduledFor : null,
        promoCode: state.promoCode,
        notes: null,
        tender,
        ...(state.voucherId ? { voucherId: state.voucherId } : {}),
      });
      if (!res.success) {
        if (res.error?.code === "MENU_STALE" || res.error?.code === "PRICE_MISMATCH") {
          setStaleBanner(true);
          setConfirmOpen(false);
          setError(mapErrorCodeToCopy(res.error.code, "order"));
          return;
        }
        setError(res.error ? mapErrorCodeToCopy(res.error.code, "order") : "Something went wrong.");
        return;
      }

      const order = res.data;
      upsert(order);
      setPending({
        key,
        signature: sig,
        orderId: order.id,
        clientSecret: order.paymentClientSecret ?? "",
        totalPence: order.totalPence,
      });

      if (order.paymentClientSecret === null) {
        // Bypass path: points or voucher-covered zero-total.
        clear();
        setConfirmOpen(false);
        router.replace(`/order/status/${order.id}`);
        return;
      }

      setConfirmOpen(false);
      const result = await paymentAdapter.confirm({
        orderId: order.id,
        clientSecret: order.paymentClientSecret,
        totalPence: order.totalPence,
      });
      if (result.kind === "paid") {
        try {
          const fresh = await pph.getOrder(order.id);
          if (fresh.success) upsert(fresh.data);
        } catch {
          // ignore — status page will poll
        }
        clear();
        router.replace(`/order/status/${order.id}`);
      } else if (result.kind === "declined") {
        setError("Card declined. Tap Retry payment to try again — same order, no re-submit.");
      } else if (result.kind === "cancelled") {
        setError("Payment cancelled. Tap Retry payment to re-open the sheet — same order, no re-submit.");
      } else {
        setError(result.message);
      }
    } catch (err) {
      if (err instanceof PphApiError) setError(mapErrorCodeToCopy(err.code, "order"));
      else setError("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  async function retryPayment() {
    const pend = pending;
    if (!pend || !pend.clientSecret) return;
    setError(null);
    const result = await paymentAdapter.confirm({
      orderId: pend.orderId,
      clientSecret: pend.clientSecret,
      totalPence: pend.totalPence,
    });
    if (result.kind === "paid") {
      try {
        const fresh = await pph.getOrder(pend.orderId);
        if (fresh.success) upsert(fresh.data);
      } catch {}
      clear();
      router.replace(`/order/status/${pend.orderId}`);
    } else if (result.kind === "declined") {
      setError("Card declined again. Try a different card.");
    }
  }

  const hasPending = pending !== null;

  return (
    <>
      <TopBar title="Checkout" backHref="/order/basket" />
      <main className="flex-1 space-y-4 p-4 pb-32">
        {staleBanner ? (
          <div className="rounded-md border-2 border-yellow-400 bg-yellow-50 p-3 text-sm">
            <div className="font-bold">Menu updated</div>
            <div>Prices or items just changed. We&apos;ve updated your basket — please review.</div>
            <button
              type="button"
              onClick={() => router.replace("/order/basket")}
              className="mt-2 text-xs underline"
            >
              Back to basket
            </button>
          </div>
        ) : null}

        {blueLightApplies ? (
          <div className="rounded-md border border-blue-500 bg-blue-50 p-3 text-xs text-blue-900">
            Blue Light 20% applied. Blue Light orders don&apos;t earn points.
          </div>
        ) : null}

        <Section title="Pickup method">Collection</Section>

        <Section title="Store">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold">{location.name}</div>
              <div className="text-xs text-neutral-600">{location.address}</div>
            </div>
          </div>
        </Section>

        <Section title="Pickup time">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setPickupMode("asap");
                setScheduledFor(null);
              }}
              className={`rounded-md border px-3 py-1.5 text-sm ${
                pickupMode === "asap" ? "border-brand-pink bg-brand-pink text-brand-black" : "border-neutral-200"
              }`}
            >
              ASAP ({getMinPickupLeadMinutes(location)}–{getMinPickupLeadMinutes(location) + 10} min)
            </button>
            <button
              type="button"
              onClick={() => {
                setPickupMode("scheduled");
                setScheduleOpen(true);
              }}
              className={`rounded-md border px-3 py-1.5 text-sm ${
                pickupMode === "scheduled" ? "border-brand-pink bg-brand-pink text-brand-black" : "border-neutral-200"
              }`}
            >
              {scheduledFor ? new Date(scheduledFor).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "Schedule"}
            </button>
          </div>
        </Section>

        {auth.user && pointsEligible ? (
          <Section title="Payment">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setTender("card")}
                className={`rounded-md border px-3 py-1.5 text-sm ${
                  state.tender === "card" ? "border-brand-pink bg-brand-pink text-brand-black" : "border-neutral-200"
                }`}
              >
                Card
              </button>
              <button
                type="button"
                onClick={() => setTender("points")}
                className={`rounded-md border px-3 py-1.5 text-sm ${
                  state.tender === "points" ? "border-brand-pink bg-brand-pink text-brand-black" : "border-neutral-200"
                }`}
              >
                Points
              </button>
            </div>
          </Section>
        ) : null}

        {state.tender === "card" ? (
          <Section title="Promo code">
            <div className="flex gap-2">
              <input
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder="WINGERS10"
                className="flex-1 rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
              />
              <button
                type="button"
                onClick={() => setPromo(promoInput ? promoInput : null)}
                className="rounded-md bg-neutral-900 px-3 py-1.5 text-sm text-brand-white"
              >
                Apply
              </button>
            </div>
          </Section>
        ) : null}

        <Section title="Order summary">
          <ul className="space-y-1 text-sm">
            {state.lines.map((l) => (
              <li key={l.lineId} className="flex justify-between">
                <span>
                  {l.quantity}× {l.name}
                </span>
                <span>{pence(l.unitPricePence * l.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 space-y-1 text-sm">
            <Row label="Subtotal" value={pence(subtotalPence)} />
            {blueLightDiscount > 0 ? (
              <Row label="Blue Light 20%" value={`−${pence(blueLightDiscount)}`} />
            ) : null}
            <Row label="Total" value={pointsCost != null ? `${pointsCost} pts` : pence(totalPence)} bold />
            <div className="pt-1 text-xs text-neutral-500">
              {state.tender === "points"
                ? "No points earned on points orders."
                : blueLightApplies
                  ? "Blue Light orders don&apos;t earn points."
                  : `Earn ${estimatedPoints} pts when you collect`}
            </div>
          </div>
        </Section>

        {error ? (
          <div className="rounded-md border border-red-500 bg-red-50 p-2 text-xs text-red-800">
            {error}
          </div>
        ) : null}
      </main>

      <div className="fixed bottom-0 left-1/2 z-30 w-full max-w-md -translate-x-1/2 border-t border-neutral-200 bg-brand-white p-3">
        {hasPending ? (
          <BrandButton
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => retryPayment()}
            disabled={submitting}
          >
            Retry payment
          </BrandButton>
        ) : (
          <BrandButton
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => setConfirmOpen(true)}
            disabled={submitting || state.lines.length === 0}
          >
            Confirm & Pay · {pointsCost != null ? `${pointsCost} pts` : pence(totalPence)}
          </BrandButton>
        )}
      </div>

      <ScheduleSheet
        open={scheduleOpen}
        onOpenChange={setScheduleOpen}
        location={location}
        selectedIso={scheduledFor}
        onPick={(iso) => {
          setScheduledFor(iso);
          if (!iso) setPickupMode("asap");
        }}
      />

      <CheckoutConfirmSheet
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        totalPence={totalPence}
        pointsCost={pointsCost}
        estimatedPoints={estimatedPoints}
        pendingOrder={pendingOrder as Order | null}
        onConfirm={() => doSubmit()}
      />

      <MockPaymentSheet />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-2 font-display text-xs font-bold uppercase tracking-wide text-neutral-500">
        {title}
      </h2>
      <div className="rounded-md border border-neutral-200 bg-brand-white p-3">{children}</div>
    </section>
  );
}

function Row({ label, value, bold = false }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between ${bold ? "font-bold" : ""}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function subtotal(lines: { unitPricePence: number; quantity: number }[]): number {
  return lines.reduce((s, l) => s + l.unitPricePence * l.quantity, 0);
}
