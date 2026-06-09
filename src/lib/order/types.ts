import type { Location, OrderProviderName } from "@/lib/locations/types";

export interface OrderProvider {
  name: OrderProviderName;
  getOrderUrl(location: Location): string;
  isAvailable(location: Location): boolean;
}
