// StripePayment: Payment Element in a PphSheet. Mirrors MockPaymentSheet
// in structure — subscribes to a module-level bus, mounts <Elements> with
// the pending clientSecret, and resolves the pending promise with the
// mapped PaymentResult. See src/lib/pph/payment/stripe.ts for the bus +
// outcome-mapping rules.

"use client";

import { useState, useSyncExternalStore } from "react";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import {
  getStripePromise,
  stripeConfirmBus,
  stripeElementsOptions,
} from "@/lib/pph/payment/stripe";
import { pence } from "@/lib/pph/money";
import { PphSheet, PphSheetContent } from "./PphSheet";

export function StripePaymentSheet() {
  const current = useSyncExternalStore(
    stripeConfirmBus.subscribe,
    () => stripeConfirmBus.current(),
    () => null,
  );
  if (!current) return null;

  return (
    <PphSheet
      open={!!current}
      onOpenChange={(open) => {
        if (!open) stripeConfirmBus.resolveAndClear({ kind: "cancelled" });
      }}
    >
      <Elements
        stripe={getStripePromise()}
        options={stripeElementsOptions(current.clientSecret)}
      >
        <StripePayForm orderId={current.orderId} totalPence={current.totalPence} />
      </Elements>
    </PphSheet>
  );
}

function StripePayForm({
  orderId,
  totalPence,
}: {
  orderId: string;
  totalPence: number;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [inlineError, setInlineError] = useState<string | null>(null);

  async function onPay() {
    if (!stripe || !elements) return;
    setSubmitting(true);
    setInlineError(null);
    try {
      const returnUrl =
        typeof window !== "undefined"
          ? `${window.location.origin}/order/status/${orderId}`
          : `/order/status/${orderId}`;
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: { return_url: returnUrl },
        redirect: "if_required",
      });
      if (!error) {
        stripeConfirmBus.resolveAndClear({ kind: "paid" });
        return;
      }
      if (error.type === "validation_error") {
        setInlineError(error.message ?? "Please complete your card details.");
        return;
      }
      if (error.type === "card_error") {
        stripeConfirmBus.resolveAndClear({ kind: "declined" });
        return;
      }
      stripeConfirmBus.resolveAndClear({
        kind: "error",
        message: error.message ?? "Payment failed.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PphSheetContent
      title="Pay"
      description="Secure payment · test mode"
      footer={
        <div className="space-y-2">
          <button
            type="button"
            onClick={onPay}
            disabled={!stripe || !elements || submitting}
            className={`h-14 w-full rounded-pill font-display text-[15px] uppercase ${
              !stripe || !elements || submitting
                ? "bg-pph-elevated text-pph-muted"
                : "bg-pph-pink text-pph-on-pink hover:brightness-95"
            }`}
          >
            {submitting ? "Processing…" : `Pay · ${pence(totalPence)}`}
          </button>
          <button
            type="button"
            className="block w-full py-1 text-center font-display text-[13px] uppercase text-pph-muted underline"
            onClick={() => stripeConfirmBus.resolveAndClear({ kind: "cancelled" })}
          >
            Cancel
          </button>
        </div>
      }
    >
      <div className="space-y-3">
        <PaymentElement options={{ layout: "tabs" }} />
        {inlineError ? (
          <p role="alert" className="font-body text-[12px] text-pph-red">
            {inlineError}
          </p>
        ) : null}
      </div>
    </PphSheetContent>
  );
}
