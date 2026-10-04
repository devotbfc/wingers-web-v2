// Error type + copy mapper. Ported from wing-app/src/api/errors.ts.

export type PphErrorCode =
  | "NETWORK"
  | "SCHEMA"
  | "AUTH_INVALID"
  | "AUTH_UNAUTHORIZED"
  | "AUTH_CONFLICT"
  | "VALIDATION_ERROR"
  | "MENU_STALE"
  | "PRICE_MISMATCH"
  | "NOT_FOUND"
  | "UNAUTHORIZED"
  | "CONFLICT"
  | "RATE_LIMITED"
  | "INSUFFICIENT_POINTS"
  | "NOT_POINTS_ELIGIBLE"
  | "VOUCHER_NOT_COMBINABLE"
  | "VOUCHER_EXPIRED"
  | "VOUCHER_NOT_AVAILABLE"
  | "VOUCHER_ITEM_MISSING"
  | "BLUE_LIGHT_NOT_COMBINABLE"
  | "PICKUP_LEAD_TOO_SHORT"
  | "PICKUP_SCHEDULED_TOO_FAR"
  | "PAYMENT_SETUP_FAILED"
  | "DOB_ALREADY_SET"
  | "SCAN_INVALID"
  | "SCAN_EXPIRED"
  | string;

export class PphApiError extends Error {
  readonly code: PphErrorCode;
  readonly status: number;
  readonly details: Record<string, string[]> | null;

  constructor(
    code: PphErrorCode,
    message: string,
    status: number,
    details: Record<string, string[]> | null = null,
  ) {
    super(message);
    this.name = "PphApiError";
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

export type ErrorContext = "login" | "signup" | "menu" | "order" | "scan" | "generic";

export function mapErrorCodeToCopy(code: string, context: ErrorContext = "generic"): string {
  switch (code) {
    case "NETWORK":
      return "Can't reach the kitchen right now — check your connection and try again.";
    case "AUTH_INVALID":
    case "UNAUTHORIZED":
      if (context === "login") return "Email or password doesn't match.";
      return "You've been signed out — please sign in again.";
    case "AUTH_UNAUTHORIZED":
      return "You've been signed out — please sign in again.";
    case "AUTH_CONFLICT":
    case "CONFLICT":
      if (context === "signup") return "That email is already in use.";
      return "Something's already set up that conflicts with this request.";
    case "VALIDATION_ERROR":
      return "Check the details and try again.";
    case "MENU_STALE":
    case "PRICE_MISMATCH":
      return "Prices or items just changed. We've updated your basket — please review.";
    case "INSUFFICIENT_POINTS":
      return "You don't have enough points for that yet.";
    case "NOT_POINTS_ELIGIBLE":
      return "One of these items can't be paid with points yet.";
    case "VOUCHER_NOT_COMBINABLE":
      return "That voucher can't combine with the current payment or promo.";
    case "VOUCHER_EXPIRED":
      return "That voucher has expired.";
    case "VOUCHER_NOT_AVAILABLE":
      return "That voucher is no longer available.";
    case "VOUCHER_ITEM_MISSING":
      return "Add the voucher's item to your basket to use it.";
    case "BLUE_LIGHT_NOT_COMBINABLE":
      return "Blue Light 20% can't combine with vouchers, promos, or paying in points.";
    case "PICKUP_LEAD_TOO_SHORT":
      return "That pickup time is too soon — please pick a later slot.";
    case "PICKUP_SCHEDULED_TOO_FAR":
      return "You can only schedule up to two weeks ahead.";
    case "PAYMENT_SETUP_FAILED":
      return "Payment set-up hiccup. Tap Retry payment to try again.";
    case "RATE_LIMITED":
      return "Too many tries. Give it a minute and have another go.";
    case "DOB_ALREADY_SET":
      return "Date of birth is already set. Contact support to change it.";
    case "SCAN_INVALID":
      return "This scan code isn't valid.";
    case "SCAN_EXPIRED":
      return "This scan code has expired.";
    case "NOT_FOUND":
      if (context === "menu") return "This menu or item isn't available right now.";
      if (context === "order") return "We can't find that order.";
      return "We couldn't find that.";
    default:
      return "Something went wrong. Please try again.";
  }
}
