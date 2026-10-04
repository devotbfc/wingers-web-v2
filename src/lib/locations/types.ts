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
  // Third-party delivery aggregator URLs. These are per-shop (each
  // location can be onboarded independently); default null and the
  // /order DeliverySheet hides any slot that is still unset. The old
  // sitewide list previously pointed at other businesses — moved out
  // here so the actual go-live URLs can be flipped per shop as they
  // land. Null everywhere today.
  deliverooUrl?: string | null;
  uberEatsUrl?: string | null;
  justEatUrl?: string | null;
}
