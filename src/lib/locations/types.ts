export interface OpeningHoursDay {
  open: string;
  close: string;
  closed?: boolean;
}

export interface OpeningHours {
  monday: OpeningHoursDay;
  tuesday: OpeningHoursDay;
  wednesday: OpeningHoursDay;
  thursday: OpeningHoursDay;
  friday: OpeningHoursDay;
  saturday: OpeningHoursDay;
  sunday: OpeningHoursDay;
}

export interface LocationAddress {
  street: string;
  city: string;
  postcode: string;
  country: string;
}

export interface LocationGeo {
  latitude: number;
  longitude: number;
}

export type OrderProviderName = "Deliverect" | "Toast" | "PushPullHub";

export interface LocationShopfront {
  src: string;
  alt: string;
  heroPosition: string;
  cardPosition: string;
}

export interface Location {
  slug: string;
  lastUpdated: string;
  name: string;
  address: LocationAddress;
  phone: string;
  geo: LocationGeo;
  openingHours: OpeningHours;
  orderProvider: OrderProviderName;
  deliveryRadius?: string;
  parking?: string;
  accessibility?: string;
  paymentMethods?: string[];
  dietaryOptions?: string[];
  shopfront?: LocationShopfront;
  // Optional static map screenshot per location, rendered as a lazy image
  // link to the Google Maps directions URL on /locations/[slug]. When
  // undefined, no map renders — the existing Directions link covers wayfinding.
  // See LocationDetail board for arch radius + alt text pattern.
  mapImage?: string;
}
