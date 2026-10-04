// Stripe Payment Element adapter.
//
// Per the PPH 5C contract, the server creates a PaymentIntent with
//   automatic_payment_methods: { enabled: true, allow_redirects: 'never' }
// so Card + Link + Apple Pay + Google Pay all run through <PaymentElement />
// without any redirect-based flow. 3DS still runs in-sheet when required.
//
// The adapter follows the same bus pattern as mockPaymentAdapter: confirm()
// publishes a Pending record carrying the orderId / clientSecret / totalPence
// and a resolve callback; the mounted <StripePaymentSheet /> subscribes,
// mounts <Elements>, and calls stripe.confirmPayment(...) when the user
// taps Pay. Retry passes the SAME clientSecret, so Stripe re-confirms the
// same PaymentIntent — no new intent, no new idempotency key.

"use client";

import { loadStripe, type Stripe, type StripeElementsOptionsClientSecret } from "@stripe/stripe-js";
import type { PaymentAdapter, PaymentResult } from "./adapter";

const STRIPE_PK = (process.env.NEXT_PUBLIC_STRIPE_PK ?? "").trim();

let stripePromise: Promise<Stripe | null> | null = null;

export function getStripePromise(): Promise<Stripe | null> {
  if (!stripePromise) {
    stripePromise = STRIPE_PK ? loadStripe(STRIPE_PK) : Promise.resolve(null);
  }
  return stripePromise;
}

// Appearance styled to the /order light palette: pink focus accent on
// inputs, white background, Inter, pill radius for buttons / radio dots
// but a softer 12px radius for form inputs so they stay rounded-rect.
export function stripeElementsOptions(clientSecret: string): StripeElementsOptionsClientSecret {
  return {
    clientSecret,
    appearance: {
      theme: "stripe",
      variables: {
        colorPrimary: "#FF2D2D",
        colorBackground: "#FFFFFF",
        colorText: "#0A0A0A",
        colorTextSecondary: "#6B6B6B",
        colorDanger: "#FF2D2D",
        borderRadius: "9999px",
        fontFamily: "Inter, system-ui, sans-serif",
        spacingUnit: "4px",
      },
      rules: {
        ".Input": {
          borderRadius: "12px",
          backgroundColor: "#EDEDED",
          border: "1px solid #E5E5E5",
          padding: "12px 14px",
        },
        ".Input:focus": {
          borderColor: "#FF6FB5",
          boxShadow: "0 0 0 2px rgba(255,111,181,0.25)",
        },
        ".Label": {
          fontSize: "12px",
          color: "#6B6B6B",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        },
        ".Tab": {
          borderRadius: "9999px",
          border: "1px solid #E5E5E5",
          padding: "10px 14px",
        },
        ".Tab--selected": {
          borderColor: "#FF6FB5",
          color: "#0A0A0A",
        },
      },
    },
  };
}

type Pending = {
  orderId: string;
  clientSecret: string;
  totalPence: number;
  resolve: (r: PaymentResult) => void;
};

let active: Pending | null = null;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

export const stripeConfirmBus = {
  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  current: () => active,
  resolveAndClear(result: PaymentResult) {
    if (!active) return;
    const { resolve } = active;
    active = null;
    emit();
    resolve(result);
  },
};

export const stripePaymentAdapter: PaymentAdapter = {
  label: "stripe",
  confirm({ orderId, clientSecret, totalPence }) {
    return new Promise<PaymentResult>((resolve) => {
      active = { orderId, clientSecret, totalPence, resolve };
      emit();
    });
  },
};
