import type { Location } from "@/lib/locations/types";
import { isPphMode } from "@/lib/pph/mode";
import type { OrderProvider } from "../types";

// When NEXT_PUBLIC_ORDERING_MODE=pph, every ORDER CTA on the site routes
// into the native web ordering flow at /order (location is picked inside
// the flow via LocationSheet). In handoff mode this provider is wired for
// no location — Deliverect/Toast handle MK and NN respectively — so a
// thrown "not implemented" would never be reached. The throw remains as a
// belt-and-braces guard for any future location switched to PushPullHub
// without the flag set.
export const pushPullHubProvider: OrderProvider = {
  name: "PushPullHub",
  getOrderUrl(_location: Location): string {
    if (isPphMode()) return "/order";
    throw new Error("PushPullHub provider requires NEXT_PUBLIC_ORDERING_MODE=pph");
  },
  isAvailable(_location: Location): boolean {
    return isPphMode();
  },
};
