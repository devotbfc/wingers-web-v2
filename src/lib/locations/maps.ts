import type { Location } from "./types";

export function getDirectionsUrl(loc: Location): string {
  const query = `${loc.address.street}, ${loc.address.city} ${loc.address.postcode}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
