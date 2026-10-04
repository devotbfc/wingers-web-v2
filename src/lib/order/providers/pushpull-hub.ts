import type { Location } from "@/lib/locations/types";
import { isPphMode } from "@/lib/pph/mode";
import type { OrderProvider } from "../types";

// When NEXT_PUBLIC_ORDERING_MODE=pph, every ORDER CTA on the site routes
// into the native web ordering flow at /order/menu?location=<slug>. The
// menu page reads the slug and preselects the matching PPH location so
// the user lands straight in the right shop. In handoff mode this
// provider should never be called (getProviderForLocation returns the
// aggregator provider instead); the throw is a belt-and-braces guard.
export const pushPullHubProvider: OrderProvider = {
  name: "PushPullHub",
  getOrderUrl(location: Location): string {
    if (isPphMode()) return `/order/menu?location=${location.slug}`;
    throw new Error("PushPullHub provider requires NEXT_PUBLIC_ORDERING_MODE=pph");
  },
  isAvailable(_location: Location): boolean {
    return isPphMode();
  },
};
