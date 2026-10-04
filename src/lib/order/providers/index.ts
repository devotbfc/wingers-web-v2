import type { Location, OrderProviderName } from "@/lib/locations/types";
import { isPphMode } from "@/lib/pph/mode";
import type { OrderProvider } from "../types";
import { deliverectProvider } from "./deliverect";
import { toastProvider } from "./toast";
import { pushPullHubProvider } from "./pushpull-hub";

export const PROVIDERS: Record<OrderProviderName, OrderProvider> = {
  Deliverect: deliverectProvider,
  Toast: toastProvider,
  PushPullHub: pushPullHubProvider,
};

// In pph mode every location routes through pushPullHubProvider so site-wide
// ORDER CTAs land in /order/menu — the per-location aggregator entry is
// bypassed. In handoff mode we fall back to the location's configured
// provider (Deliverect / Toast).
export function getProviderForLocation(location: Location): OrderProvider {
  if (isPphMode()) return pushPullHubProvider;
  return PROVIDERS[location.orderProvider];
}

export { deliverectProvider, toastProvider, pushPullHubProvider };
