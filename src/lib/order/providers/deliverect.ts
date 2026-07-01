import type { Location } from "@/lib/locations/types";
import type { OrderProvider } from "../types";

const DELIVERECT_URLS: Record<string, string> = {
  "milton-keynes": "https://wingers-mk.deliverectdirect.com/",
};

export const deliverectProvider: OrderProvider = {
  name: "Deliverect",
  getOrderUrl(location: Location): string {
    const url = DELIVERECT_URLS[location.slug];
    if (!url) {
      throw new Error(
        `Deliverect URL not configured for location "${location.slug}"`
      );
    }
    return url;
  },
  isAvailable(location: Location): boolean {
    return location.orderProvider === "Deliverect";
  },
};
