// Payment adapter contract. The checkout screen only interacts with this
// shape; swap mock ↔ Stripe without touching the UI.

export type PaymentResult =
  | { kind: "paid" }
  | { kind: "declined" }
  | { kind: "cancelled" }
  | { kind: "error"; message: string };

export interface PaymentAdapter {
  readonly label: "mock" | "stripe" | "unavailable";
  // Present the payment UI. Resolves when the user takes an action.
  confirm(args: { orderId: string; clientSecret: string; totalPence: number }): Promise<PaymentResult>;
}
