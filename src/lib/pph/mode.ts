// Ordering mode flag.
//
// `handoff` (default/unset) keeps the site's current behaviour: ORDER CTAs
// link to Deliverect (Milton Keynes) and Toast (Northampton). Every `/order/*`
// route calls notFound() so the new flow is invisible in production.
//
// `pph` surfaces the native web ordering flow. All /order/* routes render
// and ORDER CTAs route into /order via pushPullHubProvider.
//
// Set via NEXT_PUBLIC_ORDERING_MODE. Resolved at import time; module hot-
// swapping only happens on build boundary, which is the only intended switch
// point.

export type OrderingMode = "handoff" | "pph";

const RAW_MODE = (process.env.NEXT_PUBLIC_ORDERING_MODE ?? "").trim().toLowerCase();

export const ORDERING_MODE: OrderingMode = RAW_MODE === "pph" ? "pph" : "handoff";

export const isPphMode = (): boolean => ORDERING_MODE === "pph";
