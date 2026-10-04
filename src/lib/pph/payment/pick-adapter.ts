// Choose which payment adapter to use at module load. Mock when PPH URL is
// unset (dev); Stripe stub when both URL + PK are set. The checkout screen
// always resolves through PaymentAdapter — the UI doesn't branch.

import { mockPaymentAdapter } from "./mock";
import { stripePaymentAdapter } from "./stripe";
import type { PaymentAdapter } from "./adapter";

const HAS_PPH = (process.env.NEXT_PUBLIC_PPH_URL ?? "").trim() !== "";
const HAS_STRIPE_PK = (process.env.NEXT_PUBLIC_STRIPE_PK ?? "").trim() !== "";

export const paymentAdapter: PaymentAdapter =
  HAS_PPH && HAS_STRIPE_PK ? stripePaymentAdapter : mockPaymentAdapter;
