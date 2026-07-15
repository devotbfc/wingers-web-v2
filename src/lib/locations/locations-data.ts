import type { Location, OpeningHours } from "./types";

const mkHours: OpeningHours = {
  monday: { open: "16:30", close: "21:30" },
  tuesday: { open: "16:30", close: "21:30" },
  wednesday: { open: "16:30", close: "22:00" },
  thursday: { open: "16:30", close: "22:00" },
  friday: { open: "16:30", close: "22:00" },
  saturday: { open: "12:00", close: "22:00" },
  sunday: { open: "12:00", close: "22:00" },
};

const northamptonHours: OpeningHours = {
  monday: { open: "11:30", close: "20:00" },
  tuesday: { open: "11:30", close: "20:00" },
  wednesday: { open: "11:30", close: "22:00" },
  thursday: { open: "11:30", close: "22:00" },
  friday: { open: "11:30", close: "22:00" },
  saturday: { open: "11:30", close: "22:00" },
  sunday: { open: "11:30", close: "22:00" },
};

export const LOCATIONS_DATA: readonly Location[] = [
  {
    slug: "milton-keynes",
    lastUpdated: "2026-07-15",
    name: "Wingers Milton Keynes",
    address: {
      street: "25 Darin Court",
      city: "Crownhill, Milton Keynes",
      postcode: "MK8 0AD",
      country: "GB",
    },
    phone: "",
    geo: { latitude: 0, longitude: 0 },
    openingHours: mkHours,
    orderProvider: "Deliverect",
  },
  {
    slug: "northampton",
    lastUpdated: "2026-07-15",
    name: "Wingers Northampton",
    address: {
      street: "2 Drapery",
      city: "Northampton",
      postcode: "NN1 2ET",
      country: "GB",
    },
    phone: "",
    geo: { latitude: 0, longitude: 0 },
    openingHours: northamptonHours,
    orderProvider: "Toast",
  },
] as const;
