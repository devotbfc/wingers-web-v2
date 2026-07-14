import type { Location } from "@/lib/locations/types";
import type { OrderProvider } from "../types";

const TOAST_URLS: Record<string, string> = {
  northampton: "https://order.toasttab.com/online/wingers-northampton",
};

export const toastProvider: OrderProvider = {
  name: "Toast",
  getOrderUrl(location: Location): string {
    const url = TOAST_URLS[location.slug];
    if (!url) {
      throw new Error(
        `Toast URL not configured for location "${location.slug}"`
      );
    }
    return url;
  },
  isAvailable(location: Location): boolean {
    return location.orderProvider === "Toast";
  },
};
