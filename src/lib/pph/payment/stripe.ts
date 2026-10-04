// StripePayment adapter — stub only.
//
// Launch set per PPH 5C contract: card + Link + Apple Pay + Google Pay.
// PPH's PaymentIntent is created with
//   automatic_payment_methods: { enabled: true, allow_redirects: 'never' }
// so the client call site is:
//
//   const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK!);
//   const { error } = await stripe!.confirmPayment({
//     elements,
//     clientSecret,
//     confirmParams: { return_url: window.location.href },
//     redirect: 'if_required',
//   });
//
// TODOs:
//   1. Add `@stripe/stripe-js` + `@stripe/react-stripe-js` (requires explicit
//      install permission per CLAUDE.md rule 4). Do not install
//      without approval.
//   2. Mount <Elements stripe={stripe} options={{ clientSecret }}> inside
//      the checkout page; render <PaymentElement /> above the Pay pill.
//   3. On click, call stripe.confirmPayment({ ... }) and map:
//        - error.type === 'card_error'   → { kind: 'declined' }
//        - error.type === 'validation_error' → stay on sheet, surface message
//        - no error → { kind: 'paid' } (webhook flips status server-side)
//        - user closed → { kind: 'cancelled' } (listen to onBlur-equivalent)
//   4. Keep the SAME idempotencyKey on retry — the server returns the
//      same intent, re-confirmPayment is safe.
//   5. Set NEXT_PUBLIC_STRIPE_PK env var; refuse to boot if unset in prod.

"use client";

import type { PaymentAdapter, PaymentResult } from "./adapter";

export const stripePaymentAdapter: PaymentAdapter = {
  label: "stripe",
  async confirm(_args): Promise<PaymentResult> {
    return {
      kind: "error",
      message: "Stripe adapter not wired yet — set NEXT_PUBLIC_STRIPE_PK and install @stripe/stripe-js.",
    };
  },
};
