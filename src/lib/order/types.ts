import type { Location } from "@/lib/locations/types";

export interface OrderProvider {
  name: "Deliverect" | "Toast" | "PushPullHub";
  getOrderUrl(location: Location): string;
  isAvailable(location: Location): boolean;
}
