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

export interface Location {
  slug: string;
  lastUpdated: string;
  name: string;
  address: LocationAddress;
  phone: string;
  geo: LocationGeo;
  openingHours: OpeningHours;
  orderProvider: "Deliverect" | "Toast" | "PushPullHub";
  deliveryRadius?: string;
  parking?: string;
  accessibility?: string;
  paymentMethods?: string[];
  dietaryOptions?: string[];
}
