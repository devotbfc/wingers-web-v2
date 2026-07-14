import type { Location } from "./types";

const closed = { open: "00:00", close: "00:00", closed: true } as const;
const placeholderHours = {
  monday: closed,
  tuesday: closed,
  wednesday: closed,
  thursday: closed,
  friday: closed,
  saturday: closed,
  sunday: closed,
};

export const LOCATIONS_DATA: readonly Location[] = [
  {
    slug: "milton-keynes",
    lastUpdated: "2026-06-29",
    name: "Wingers Milton Keynes",
    address: {
      street: "25 Darin Court",
      city: "Crownhill, Milton Keynes",
      postcode: "MK8 0AD",
      country: "GB",
    },
    phone: "",
    geo: { latitude: 0, longitude: 0 },
    openingHours: placeholderHours,
    orderProvider: "Deliverect",
  },
  {
    slug: "northampton",
    lastUpdated: "2026-06-29",
    name: "Wingers Northampton",
    address: {
      street: "2 Drapery",
      city: "Northampton",
      postcode: "NN1 2ET",
      country: "GB",
    },
    phone: "",
    geo: { latitude: 0, longitude: 0 },
    openingHours: placeholderHours,
    orderProvider: "Toast",
  },
] as const;
