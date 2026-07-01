import type { Location } from "@/lib/locations/types";
import type { OrderProvider } from "../types";

export const pushPullHubProvider: OrderProvider = {
  name: "PushPullHub",
  getOrderUrl(_location: Location): string {
    throw new Error("PushPullHub provider not yet implemented");
  },
  isAvailable(_location: Location): boolean {
    return false;
  },
};
