// Cancel-buffer + lazy-sweep helpers. Mirrors wing-app/src/lib/order-status.ts.
//
// Lazy sweep is a server-side auto-cancel of card-tender orders that never
// cleared Stripe after UNPAID_ORDER_TIMEOUT_MINUTES (default 30). The server
// has no explicit "actor" field — we detect it structurally.

import type { Order } from "./types";

export const CANCEL_WINDOW_MS = 60_000;

export function canCancel(order: Order, nowMs: number = Date.now()): boolean {
  if (order.status === "collected" || order.status === "cancelled") return false;
  return nowMs - new Date(order.createdAt).getTime() < CANCEL_WINDOW_MS;
}

export function isLazySwept(order: Order): boolean {
  return order.status === "cancelled" && order.paymentMethod === "card" && !order.isPaid;
}

export function headlineForStatus(order: Order): string {
  if (isLazySwept(order)) return "PAYMENT WINDOW EXPIRED";
  switch (order.status) {
    case "pending":
      return "HOLD TIGHT";
    case "confirmed":
      return "THE KITCHEN'S ON IT";
    case "preparing":
      return "WE'RE COOKING";
    case "ready":
      return "READY TO COLLECT";
    case "collected":
      return "ORDER COMPLETE";
    case "cancelled":
      return "ORDER CANCELLED";
  }
}

export function showPickupCode(order: Order): boolean {
  if (!order.pickupCode) return false;
  return order.status === "confirmed" || order.status === "preparing" || order.status === "ready";
}
