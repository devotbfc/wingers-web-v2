import { LOCATIONS_DATA } from "./locations-data";
import type { Location } from "./types";

export type {
  Location,
  LocationAddress,
  LocationGeo,
  OpeningHours,
  OpeningHoursDay,
  OrderProviderName,
} from "./types";

export const LOCATIONS = LOCATIONS_DATA;

export function getLocationBySlug(slug: string): Location | undefined {
  return LOCATIONS.find((loc) => loc.slug === slug);
}
