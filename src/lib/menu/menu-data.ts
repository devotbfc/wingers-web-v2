/**
 * MENU + CATEGORIES for the /menu route.
 *
 * Placeholder content: item names and copy are mined from .v0/menu/ and are on-brand
 * but not confirmed against the operating shop menus. Prices are guesses — every item
 * with `"price"` in `dataTodo` MUST be swapped with real numbers before launch
 * (grep for `dataTodo:` to find them all).
 *
 * Neither Deliverect Direct nor Toast exposes stable per-item deep-links, so the
 * "Order" CTA on every card hands the user off to the location root URL via the
 * global OrderPanel — never a per-item link.
 *
 * Allergens live in src/lib/menu/allergen-data.ts (authoritative, generated from the
 * printed FSA allergen matrix). Menu items reference an entry by `allergenSlug`;
 * never duplicate contains/traces here. Items flagged `"allergens"` in `dataTodo`
 * have an APPROXIMATE mapping — verify with Benson before launch.
 */

import type { CategorySlug, MenuCategory, MenuItem } from "./types";

const LAST_UPDATED = "2026-07-15";

export const CATEGORIES: readonly MenuCategory[] = [
  {
    slug: "wings",
    lastUpdated: LAST_UPDATED,
    name: "Wings",
    description: "Buttermilk-brined, sauce-drenched. The whole reason we exist.",
  },
  {
    slug: "tenders",
    lastUpdated: LAST_UPDATED,
    name: "Tenders",
    description: "Hand-breaded fillets with a crunch you can hear.",
  },
  {
    slug: "burgers",
    lastUpdated: LAST_UPDATED,
    name: "Burgers",
    description: "Fried chicken, brioche, sauce. Get stuck in.",
  },
  {
    slug: "loaded-fries",
    lastUpdated: LAST_UPDATED,
    name: "Loaded Fries",
    description: "Fries buried under everything good.",
  },
  {
    slug: "sides",
    lastUpdated: LAST_UPDATED,
    name: "Sides",
    description: "The sidekicks that steal the show.",
  },
  {
    slug: "drinks",
    lastUpdated: LAST_UPDATED,
    name: "Drinks",
    description: "Cool-downs between bites.",
  },
] as const;

export const MENU: readonly MenuItem[] = [
  // — WINGS —
  {
    slug: "buffalo-bomb-wings",
    lastUpdated: LAST_UPDATED,
    name: "Buffalo Bomb Wings",
    categorySlug: "wings",
    description:
      "Six buttermilk-brined wings drowned in our sticky buffalo glaze. Messy, loud, unapologetic.",
    priceGbp: { "milton-keynes": 7.5, northampton: 7.25 },
    allergenSlug: "buffalo-new-york",
    spiceLevel: 3,
    isHalal: true,
    isSignature: true,
    image: "/brand/photos/wings/DSC01496ww.png",
    imageAlt: "Six buffalo wings tossed in sticky red sauce on a Wingers plate",
    dataTodo: ["price", "allergens"],
  },
  {
    slug: "seoul-fire-wings",
    lastUpdated: LAST_UPDATED,
    name: "Seoul Fire Wings",
    categorySlug: "wings",
    description:
      "Double-fried wings lacquered in gochujang glaze with sesame and spring onion. Sweet heat that creeps up.",
    priceGbp: { "milton-keynes": 7.95, northampton: 7.5 },
    allergenSlug: "korea-town",
    spiceLevel: 3,
    isHalal: true,
    isSignature: true,
    image: "/brand/photos/wings/Gemini_Generated_Image_r143s3r143s3r143-3.jpg",
    imageAlt: "Sticky Korean-style wings with sesame seeds and spring onion",
    dataTodo: ["price", "allergens"],
  },
  {
    slug: "smokehouse-bbq-wings",
    lastUpdated: LAST_UPDATED,
    name: "Smokehouse BBQ Wings",
    categorySlug: "wings",
    description:
      "Sticky smoked BBQ glaze over six buttermilk wings. Low, slow and finger-licking.",
    priceGbp: { "milton-keynes": 7.5, northampton: 7.25 },
    allergenSlug: "tennessee-bbq",
    spiceLevel: 1,
    isHalal: true,
    image: "/brand/photos/wings/Gemini_Generated_Image_4zb2xx4zb2xx4zb2.jpg",
    imageAlt: "Glossy smoked BBQ wings piled on a Wingers plate",
    dataTodo: ["price", "allergens"],
  },
  {
    slug: "naked-buttermilk-wings",
    lastUpdated: LAST_UPDATED,
    name: "Naked Buttermilk Wings",
    categorySlug: "wings",
    description:
      "No sauce, all crunch. Six golden wings with a squeeze of lemon and a dip on the side. Sauce it yourself.",
    priceGbp: { "milton-keynes": 6.95, northampton: 6.95 },
    allergenSlug: "naked-wings",
    spiceLevel: 0,
    isHalal: true,
    image: "/brand/photos/wings/Gemini_Generated_Image_m1g5o9m1g5o9m1g5-2.jpg",
    imageAlt: "Naked golden buttermilk fried wings, no sauce",
    dataTodo: ["price"],
  },

  // — TENDERS —
  {
    slug: "og-buttermilk-tenders",
    lastUpdated: LAST_UPDATED,
    name: "OG Buttermilk Tenders",
    categorySlug: "tenders",
    description:
      "Four craggy hand-breaded tenders with a dip of your choice. Crunch you can hear from across the room.",
    priceGbp: { "milton-keynes": 6.95, northampton: 6.95 },
    allergenSlug: "naked-wings",
    spiceLevel: 1,
    isHalal: true,
    isSignature: true,
    image: "/brand/photos/tenders/DSC00293.JPG",
    imageAlt: "Four golden buttermilk fried chicken tenders on a Wingers napkin",
    dataTodo: ["price", "allergens"],
  },
  {
    slug: "hot-honey-tenders",
    lastUpdated: LAST_UPDATED,
    name: "Hot Honey Tenders",
    categorySlug: "tenders",
    description:
      "OG tenders drizzled with our chilli-spiked hot honey. Sticky, sweet, alive.",
    priceGbp: { "milton-keynes": 7.5, northampton: 7.5 },
    allergenSlug: "hot-honey",
    spiceLevel: 2,
    isHalal: true,
    image: "/brand/photos/tenders/DSC00358.JPG",
    imageAlt: "Buttermilk tenders drizzled with hot honey glaze",
    dataTodo: ["price"],
  },

  // — BURGERS —
  {
    slug: "pink-sauce-stacker",
    lastUpdated: LAST_UPDATED,
    name: "Pink Sauce Stacker",
    categorySlug: "burgers",
    description:
      "Crispy chicken fillet, pickles, slaw and a fat drizzle of house pink sauce in a toasted brioche bun.",
    priceGbp: { "milton-keynes": 8.95, northampton: 8.5 },
    allergenSlug: "california-chick",
    spiceLevel: 2,
    isHalal: true,
    isSignature: true,
    image: "/brand/photos/burgers/Gemini_Generated_Image_45kpqz45kpqz45kp-4.jpg",
    imageAlt: "Wingers pink sauce chicken burger with slaw and pickles on a brioche bun",
    dataTodo: ["price", "allergens"],
  },
  {
    slug: "double-down-burger",
    lastUpdated: LAST_UPDATED,
    name: "Double Down Burger",
    categorySlug: "burgers",
    description:
      "Two fillets, double cheese, house sauce. For when one just isn't going to cut it.",
    priceGbp: { "milton-keynes": 10.95, northampton: 10.5 },
    allergenSlug: "big-smoke-bbq",
    spiceLevel: 1,
    isHalal: true,
    image: "/brand/photos/burgers/token.png",
    imageAlt: "Double stacked Wingers chicken burger with molten cheese",
    dataTodo: ["price", "allergens"],
  },

  // — LOADED FRIES —
  {
    slug: "dirty-bird-fries",
    lastUpdated: LAST_UPDATED,
    name: "Dirty Bird Loaded Fries",
    categorySlug: "loaded-fries",
    description:
      "Skin-on fries buried under chicken chunks, molten cheese sauce and a pink-and-red double drizzle.",
    priceGbp: { "milton-keynes": 6.5, northampton: 6.5 },
    allergenSlug: "fully-loaded-fries",
    spiceLevel: 2,
    isHalal: true,
    unavailableAt: ["northampton"],
    dataTodo: ["price", "content", "allergens"],
  },
  {
    slug: "buffalo-loaded-fries",
    lastUpdated: LAST_UPDATED,
    name: "Buffalo Loaded Fries",
    categorySlug: "loaded-fries",
    description:
      "Skin-on fries under crispy chicken, blue-cheese drizzle and buffalo glaze. Signature heat.",
    priceGbp: { "milton-keynes": 6.95, northampton: 6.75 },
    allergenSlug: "buffalo-ranch-fries-loaded",
    spiceLevel: 3,
    isHalal: true,
    dataTodo: ["price", "content"],
  },

  // — SIDES —
  {
    slug: "mozza-popcorn-combo",
    lastUpdated: LAST_UPDATED,
    name: "Mozza & Popcorn Combo",
    categorySlug: "sides",
    description:
      "Golden mozzarella sticks and popcorn chicken bites with a dip. The sidekick that steals the show.",
    priceGbp: { "milton-keynes": 4.95, northampton: 4.75 },
    allergenSlug: "mozzarella-triangles",
    spiceLevel: 0,
    isHalal: true,
    dataTodo: ["price", "allergens"],
  },
  {
    slug: "skin-on-fries",
    lastUpdated: LAST_UPDATED,
    name: "Skin-On Fries",
    categorySlug: "sides",
    description: "Chunky, seasoned, skin-on. The right kind of chip.",
    priceGbp: { "milton-keynes": 3.5, northampton: 3.5 },
    allergenSlug: "house-fries",
    spiceLevel: 0,
    isVegan: true,
    isVegetarian: true,
    isHalal: true,
    dataTodo: ["price"],
  },
  {
    slug: "mac-and-cheese",
    lastUpdated: LAST_UPDATED,
    name: "Bird Mac & Cheese",
    categorySlug: "sides",
    description:
      "Elbow pasta swimming in cheese sauce, buttermilk chicken folded through, toasted crumb top.",
    priceGbp: { "milton-keynes": 5.5, northampton: 5.25 },
    allergenSlug: "mac-and-cheese",
    spiceLevel: 1,
    isHalal: true,
    image: "/brand/photos/sides/Buffalo%20Chicken%20Mac%20%26%20Cheese.jpg",
    imageAlt: "Bowl of chicken mac and cheese with a crumb top",
    dataTodo: ["price"],
  },

  // — DRINKS —
  // No allergenSlug: printed guide has no drinks entry. Card renders "See allergen guide" link.
  {
    slug: "house-pink-lemonade",
    lastUpdated: LAST_UPDATED,
    name: "House Pink Lemonade",
    categorySlug: "drinks",
    description:
      "Iced, tart and sweet, poured over a full cup of ice. The cool-down between bites.",
    priceGbp: { "milton-keynes": 2.95, northampton: 2.95 },
    spiceLevel: 0,
    isVegan: true,
    isVegetarian: true,
    isHalal: true,
    dataTodo: ["price", "content"],
  },
  {
    slug: "cola",
    lastUpdated: LAST_UPDATED,
    name: "Cola",
    categorySlug: "drinks",
    description: "Cold, fizzy, always right.",
    priceGbp: { "milton-keynes": 1.95, northampton: 1.95 },
    spiceLevel: 0,
    isVegan: true,
    isVegetarian: true,
    isHalal: true,
    dataTodo: ["price"],
  },
] as const;
