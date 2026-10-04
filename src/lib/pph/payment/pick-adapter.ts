// Choose which payment adapter to use at module load.
//
// Rules:
//   - NEXT_PUBLIC_PPH_URL unset        → mockPaymentAdapter (local dev, no server).
//   - PPH_URL set + Stripe PK set      → stripePaymentAdapter (prod/preview).
//   - PPH_URL set + Stripe PK missing  → unavailablePaymentAdapter.
//     The real PPH server is reachable but there is no publishable key to
//     drive Stripe Elements. We MUST NOT fall back to the mock sheet in that
//     path — the mock would simulate "paid" against a real server and leave
//     the server-side intent orphaned. The checkout page detects
//     `paymentAdapter.label === "unavailable"`, surfaces the copy
//     "Online payment isn't available right now" and disables the Pay button.
//
// The checkout screen only talks to PaymentAdapter — the UI branches on the
// label, not on individual env vars.

import { mockPaymentAdapter } from "./mock";
import { stripePaymentAdapter } from "./stripe";
import type { PaymentAdapter, PaymentResult } from "./adapter";

const HAS_PPH = (process.env.NEXT_PUBLIC_PPH_URL ?? "").trim() !== "";
const HAS_STRIPE_PK = (process.env.NEXT_PUBLIC_STRIPE_PK ?? "").trim() !== "";

export const UNAVAILABLE_PAYMENT_COPY =
  "Online payment isn't available right now. Please try again shortly or call the shop.";

export const unavailablePaymentAdapter: PaymentAdapter = {
  label: "unavailable",
  async confirm(): Promise<PaymentResult> {
    return { kind: "error", message: UNAVAILABLE_PAYMENT_COPY };
  },
};

export const paymentAdapter: PaymentAdapter = !HAS_PPH
  ? mockPaymentAdapter
  : HAS_STRIPE_PK
    ? stripePaymentAdapter
    : unavailablePaymentAdapter;
