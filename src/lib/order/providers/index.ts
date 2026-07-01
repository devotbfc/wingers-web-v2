import type { Location, OrderProviderName } from "@/lib/locations/types";
import type { OrderProvider } from "../types";
import { deliverectProvider } from "./deliverect";
import { toastProvider } from "./toast";
import { pushPullHubProvider } from "./pushpull-hub";

export const PROVIDERS: Record<OrderProviderName, OrderProvider> = {
  Deliverect: deliverectProvider,
  Toast: toastProvider,
  PushPullHub: pushPullHubProvider,
};

export function getProviderForLocation(location: Location): OrderProvider {
  return PROVIDERS[location.orderProvider];
}

export { deliverectProvider, toastProvider, pushPullHubProvider };
