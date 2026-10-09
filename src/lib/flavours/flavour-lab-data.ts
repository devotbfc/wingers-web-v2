// Originally AUTO-GENERATED from Wingers-FLAVOUR-STORIES.xlsx (location: ASK BENSON).
// This file now carries HAND-EDITS that the current xlsx + generator do not know about.
// Before re-running the generator, port these overrides into the sheet (or into the generator):
//
//   HAND-EDITED FIELDS (per flavour)
//     • status:        "core" | "active" | "coming-soon" | "hidden" | "incoming" | "past"
//       — "coming-soon" and "hidden" were added in this branch for the pre-launch cut.
//         "hidden" is currently unused but kept in the union for future need.
//       — Live: core + active (shown on wheels + /flavour-lab FlavourGrid)
//       — Lab-only teaser: coming-soon (shown in LockedFlavoursSection "COMING SOON")
//       — Finished / historical: past (shown in LockedFlavoursSection "PAST DROPS")
//       — Suppressed: hidden (not shown anywhere) — none currently.
//     • wheelLabel:    optional short label for wheel segments where the full name overflows
//                      the readable 15-char cap:
//                        - Buffalo NY, Cajun, Naked (shortened)
//                        - Ghost (for "Ghost Buffalo HOT")
//                      Everything else uses the full name; the wheels auto-wrap >15-char
//                      labels onto two lines as a safety net.
//     • Spelling fixes: "Caribbean Coconut" (was "Carribean"), "Singapore Zing" (was "Sinapore").
//     • Katsu.shortDescription: hand-written pre-launch; long-form story fields still null.
//     • Katsu.pairsWith: hand-edited to "Cali Mayo, Ranch" so suggestDipsFor
//       returns something for the only currently-active LE (and so the wheel
//       result card has dips to render). Port into the sheet when regenerating.
//     • Hot Honey: moved from core/non-LE → past/LE. It ran as a drop and has now finished.
//     • Thai City, Hot Maple, Honey Butter, Soul City, Korean Red Hot, American Hot BBQ,
//       Honey Mustard, Caribbean Coconut, Singapore Zing, Wing No1: moved from incoming → past.
//       They ran previously and are archived in the PAST DROPS section.
//     • Lemon Pepper: type dry-rub + heat 1 (previously wet-sauce heat 0 — reclassified
//       as a seasoning blend, not a sauce).
//     • howMade: shortened to a one-line ingredient summary (3–4 key ingredients) for
//       every live and coming-soon flavour. The long-form originals are no longer in
//       the file; if the xlsx still carries them, port the short versions back.
//     • sourcedFrom: hidden from the UI (FlavourCard story panel). Kept in the data for
//       future reuse (SEO JSON-LD / admin tooling). Do not strip from the sheet.
//     • Dips (blue-cheese, ranch, california-sauce-mayo, honey-mustard): shortDescription
//       populated. DipsSection renders them as expandable chevron tiles.
//
// If the generator overwrites this file, re-apply the overrides above or move them into the xlsx.

export type FlavourType = "dry-rub" | "wet-sauce" | null;
export type FlavourStatus =
  | "core"
  | "active"
  | "coming-soon"
  | "hidden"
  | "incoming"
  | "past";

export interface Flavour {
  slug: string; name: string; limitedEdition: boolean; status: FlavourStatus;
  heat: number; type: FlavourType;
  wheelLabel?: string;
  shortDescription: string | null; howMade: string | null;
  sourcedFrom: string | null; history: string | null; pairsWith: string | null;
  // Optional per-flavour hero image shown behind the card chrome under a
  // dark scrim. Left undefined until real per-flavour photography lands;
  // every card then shows the neon fallback (see FlavourCard).
  cardImage?: string;
  // Tonight's line-up tiering (per design board):
  //   • featured: shown on its own line between the current LE (tier 1) and
  //     the rest of the core. Set on exactly one flavour at a time (today:
  //     ghost-buffalo-hot). Left undefined → no "featured" line is rendered.
  //   • tier: 3 for "flagship core" names (one shared line, medium-small);
  //     any flavour left as undefined falls into tier 4 (smallest shared
  //     line). Tier 1 is derived from the current LE, tier 2 from `featured`.
  featured?: boolean;
  tier?: 3 | 4;
}
export interface Dip {
  slug: string; name: string; shortDescription: string | null;
  howMade: string | null; pairsWith: string | null; notes: string | null;
}

export const FLAVOURS: Flavour[] = [
  {
    "slug": "mango-habanero",
    "name": "Mango Habanero",
    "limitedEdition": false,
    "heat": 3,
    "type": "wet-sauce",
    "shortDescription": "Sweet tropical mango meets the fiery kick of habanero peppers for the perfect balance of fruity sweetness and bold heat.",
    "howMade": "Mango, habanero, honey, apple cider vinegar.",
    "sourcedFrom": "\ud83c\uddf2\ud83c\uddfd Mexico \u2013 Habanero peppers. \ud83c\udde7\ud83c\uddf7 Brazil \u2013 Tropical fruits",
    "history": "Habanero peppers originated in the Amazon Basin before becoming famous throughout the Caribbean and Mexico. Pairing tropical fruits like mango with habaneros became popular because the natural sweetness helps balance the pepper's intense heat.",
    "pairsWith": "Blue Cheese, Ranch, Tennessee B.B.Q",
    "status": "core",
    "tier": 3
  },
  {
    "slug": "korea-town",
    "name": "Korea Town",
    "limitedEdition": false,
    "heat": 2,
    "type": "wet-sauce",
    "shortDescription": "Sweet, savory, smoky, and mildly spicy with rich garlic and sesame flavors.",
    "howMade": "Gochujang, soy, garlic, sesame.",
    "sourcedFrom": "\ud83c\uddf0\ud83c\uddf7 South Korea \u2013 Gochujang & Korean seasonings. \ud83c\uddf9\ud83c\udded Thailand \u2013 Sweet chili influences",
    "history": "Inspired by Korea's famous Korean Fried Chicken, which became internationally popular for its crispy texture and bold sweet-spicy glaze using fermented chili paste known as gochujang.",
    "pairsWith": "Ranch, Blue Cheese",
    "status": "core",
    "tier": 3
  },
  {
    "slug": "tennessee-bbq",
    "name": "Tennessee BBQ",
    "limitedEdition": false,
    "heat": 1,
    "type": "wet-sauce",
    "shortDescription": "Sweet, smoky, tangy, and rich with classic Southern barbecue flavor.",
    "howMade": "Tomato, molasses, smoked paprika, hickory smoke.",
    "sourcedFrom": "\ud83c\uddfa\ud83c\uddf8 United States \u2013 BBQ, Cajun traditions",
    "history": "Tennessee barbecue is known for balancing sweet tomato-based sauces with smoky spices and slow-cooked meats, creating one of America's most beloved BBQ traditions.",
    "pairsWith": "Ranch",
    "status": "core",
    "tier": 3
  },
  {
    "slug": "lemon-pepper",
    "name": "Lemon Pepper",
    "limitedEdition": false,
    "heat": 1,
    "type": "dry-rub",
    "shortDescription": "Bright citrus with cracked black pepper and savory herbs.",
    "howMade": "Lemon zest, cracked black pepper, garlic, sea salt.",
    "sourcedFrom": "\ud83c\uddfb\ud83c\uddf3 Vietnam \u2013 Garlic and citrus notes. \ud83c\udde7\ud83c\uddf7 Brazil \u2013 Tropical fruits",
    "history": "Although lemon pepper seasoning originated as a seafood seasoning, it became legendary in Atlanta's wing culture where it remains one of the city's signature flavors.",
    "pairsWith": "Blue Cheese, Ranch, Cali Mayo, Honey Mustard",
    "status": "core"
  },
  {
    "slug": "ghost-buffalo-hot",
    "name": "Ghost Buffalo HOT",
    "wheelLabel": "Ghost",
    "limitedEdition": false,
    "heat": 5,
    "type": "wet-sauce",
    "shortDescription": "Classic Buffalo flavor with the intense heat of Ghost Peppers.",
    "howMade": "Cayenne, ghost pepper mash, butter, vinegar.",
    "sourcedFrom": "\ud83c\uddee\ud83c\uddf3 India \u2013 Ghost Peppers and aromatic spices. \ud83c\uddfa\ud83c\uddf8 United States \u2013 Buffalo",
    "history": "Ghost Pepper (Bhut Jolokia) originated in Northeast India and once held the title of the world's hottest pepper. Combined with Buffalo sauce, it creates an unforgettable extreme heat experience.",
    "pairsWith": "Blue Cheese, Ranch",
    "status": "core",
    "featured": true
  },
  {
    "slug": "buffalo-new-york",
    "name": "Buffalo New York",
    "wheelLabel": "Buffalo NY",
    "limitedEdition": false,
    "heat": 2,
    "type": "wet-sauce",
    "shortDescription": "Tangy, buttery, mildly spicy, and timeless.",
    "howMade": "Aged cayenne, butter, vinegar, Worcestershire.",
    "sourcedFrom": "\ud83c\uddfa\ud83c\uddf8 United States \u2013 Buffalo, BBQ, Cajun traditions",
    "history": "Buffalo sauce was invented in 1964 at the Anchor Bar in Buffalo, New York, when chicken wings were tossed in hot sauce and butter for the very first time. It quickly became one of America's most iconic comfort foods.",
    "pairsWith": "Blue Cheese",
    "status": "core"
  },
  {
    "slug": "naked",
    "name": "Naked (no sauce)",
    "wheelLabel": "Naked",
    "limitedEdition": false,
    "heat": 0,
    "type": null,
    "shortDescription": "Pure crispy chicken.",
    "howMade": "Seasoned and fried crispy. No sauce.",
    "sourcedFrom": "\ud83c\uddf9\ud83c\uddf7 Turkey \u2013 Paprika and spice blends",
    "history": "Sometimes less is more. Naked wings have always been a favorite for guests who enjoy dipping into their own sauces or appreciate perfectly cooked chicken on its own.",
    "pairsWith": "Ranch, Honey Mustard, Cali Mayo",
    "status": "core"
  },
  {
    "slug": "new-orleans-cajun",
    "name": "New Orleans Cajun",
    "wheelLabel": "Cajun",
    "limitedEdition": false,
    "heat": 1,
    "type": "dry-rub",
    "shortDescription": "Bold, peppery, smoky, garlicky, and packed with Louisiana spices.",
    "howMade": "Paprika, cayenne, garlic, thyme.",
    "sourcedFrom": "\ud83c\uddf9\ud83c\uddf7 Turkey \u2013 Paprika and spice blends",
    "history": "Born in Louisiana, Cajun seasoning comes from the French Acadian settlers who blended local herbs and peppers into flavorful spice mixes that became the foundation of Cajun cuisine.",
    "pairsWith": "Blue Cheese, Ranch, Cali Mayo, Honey Mustard",
    "status": "core"
  },
  {
    "slug": "caribbean-jerk",
    "name": "Caribbean Jerk",
    "limitedEdition": true,
    "heat": 3,
    "type": "wet-sauce",
    "shortDescription": "Smoky, spicy, earthy, and slightly sweet.",
    "howMade": "Allspice, thyme, Scotch Bonnet, cinnamon.",
    "sourcedFrom": "\ud83c\uddef\ud83c\uddf2 Jamaica \u2013 Jerk spices & Scotch Bonnet peppers. \ud83c\udde7\ud83c\uddf7 Brazil \u2013 Tropical fruits",
    "history": "Traditional Jamaican Jerk dates back hundreds of years when the Maroons developed unique spice blends and slow-smoking techniques using local herbs and Scotch Bonnet peppers.",
    "pairsWith": "Ranch",
    "status": "coming-soon"
  },
  {
    "slug": "garlic-parmesan",
    "name": "Garlic Parmesan",
    "limitedEdition": false,
    "heat": 0,
    "type": "wet-sauce",
    "shortDescription": "Rich, buttery, cheesy, and full of roasted garlic.",
    "howMade": "Roasted garlic, butter, Parmesan, cracked pepper.",
    "sourcedFrom": "\ud83c\udde8\ud83c\uddf3 China \u2013 Garlic and chili traditions. \ud83c\uddee\ud83c\uddf9 Italy \u2013 Parmesan cheese & herbs. \ud83c\uddec\ud83c\uddf7 Greece \u2013 Mediterranean herbs",
    "history": "Garlic Parmesan became a modern wing favorite by combining Italian-inspired flavors with American chicken wings, creating a rich, creamy alternative to spicy sauces.",
    "pairsWith": "Cali Mayo",
    "status": "core"
  },
  {
    "slug": "hot-honey",
    "name": "Hot Honey",
    "limitedEdition": true,
    "heat": 3,
    "type": "wet-sauce",
    "shortDescription": "Sweet honey followed by a gentle chili kick.",
    "howMade": "Pure honey is infused with chili peppers, cayenne, garlic, vinegar, and spices before being drizzled over crispy wings.",
    "sourcedFrom": ". \ud83c\udde8\ud83c\uddf1 Chile \u2013 Premium chili peppers",
    "history": "Hot Honey became famous after artisan pizza makers began infusing honey with chili peppers. Its sweet heat quickly spread to fried chicken, biscuits, pizza, and wings.",
    "pairsWith": "Ranch, Cali Mayo",
    "status": "past"
  },
  {
    "slug": "flamin-cajun",
    "name": "Flamin' Cajun",
    "limitedEdition": true,
    "heat": 3,
    "type": "dry-rub",
    "shortDescription": "Extra spicy Cajun seasoning with smoky Louisiana heat.",
    "howMade": "Extra cayenne, chilli, smoked paprika, garlic.",
    "sourcedFrom": "\ud83c\udde8\ud83c\uddf1 Chile \u2013 Premium chili peppers. \ud83c\uddfa\ud83c\uddf8 United States \u2013 Cajun traditions. \ud83c\uddf9\ud83c\uddf7 Turkey \u2013 Paprika and spice blends",
    "history": "Inspired by Louisiana's love of bold spice, Flamin' Cajun takes traditional Cajun flavors and turns the heat up for serious spice lovers.",
    "pairsWith": "Blue Cheese, Ranch, Cali Mayo, Honey Mustard",
    "status": "coming-soon"
  },
  {
    "slug": "mild-buffalo",
    "name": "Mild Buffalo",
    "limitedEdition": true,
    "heat": 1,
    "type": "wet-sauce",
    "shortDescription": "Classic Buffalo flavor with less heat and extra buttery richness.",
    "howMade": "Milder cayenne, butter, vinegar, garlic.",
    "sourcedFrom": "\ud83c\uddfa\ud83c\uddf8 United States \u2013 Buffalo",
    "history": "Created for those who love the original Buffalo flavor without overwhelming heat, Mild Buffalo remains one of America's most popular wing sauces.",
    "pairsWith": "Blue Cheese",
    "status": "coming-soon"
  },
  {
    "slug": "katsu",
    "name": "Katsu",
    "limitedEdition": true,
    "heat": 1,
    "type": "wet-sauce",
    "shortDescription": "Crispy chicken glazed in a rich Japanese katsu curry sauce — mild, sweet and savoury.",
    "howMade": null,
    "sourcedFrom": null,
    "history": null,
    "pairsWith": "Cali Mayo, Ranch",
    "status": "active"
  },
  // TODO(copy): Katsu's long-form story (howMade / sourcedFrom / history) is
  // pending. FlavourCard hides the "More" button until at least one long-form
  // field is populated. pairsWith is now populated (see header comment).
  {
    "slug": "thai-city",
    "name": "Thai City",
    "limitedEdition": true,
    "heat": 2,
    "type": "wet-sauce",
    "shortDescription": null,
    "howMade": null,
    "sourcedFrom": null,
    "history": null,
    "pairsWith": null,
    "status": "past"
  },
  {
    "slug": "hot-maple",
    "name": "Hot Maple",
    "limitedEdition": true,
    "heat": 3,
    "type": "dry-rub",
    "shortDescription": null,
    "howMade": null,
    "sourcedFrom": null,
    "history": null,
    "pairsWith": null,
    "status": "past"
  },
  {
    "slug": "honey-butter",
    "name": "Honey Butter",
    "limitedEdition": true,
    "heat": 0,
    "type": "dry-rub",
    "shortDescription": null,
    "howMade": null,
    "sourcedFrom": null,
    "history": null,
    "pairsWith": null,
    "status": "past"
  },
  {
    "slug": "soul-city",
    "name": "Soul City",
    "limitedEdition": true,
    "heat": 3,
    "type": "wet-sauce",
    "shortDescription": null,
    "howMade": null,
    "sourcedFrom": null,
    "history": null,
    "pairsWith": null,
    "status": "past"
  },
  {
    "slug": "korean-red-hot",
    "name": "Korean Red Hot",
    "limitedEdition": true,
    "heat": 3,
    "type": "wet-sauce",
    "shortDescription": null,
    "howMade": null,
    "sourcedFrom": null,
    "history": null,
    "pairsWith": null,
    "status": "past"
  },
  {
    "slug": "american-hot-bbq",
    "name": "American Hot BBQ",
    "limitedEdition": true,
    "heat": 1,
    "type": "wet-sauce",
    "shortDescription": null,
    "howMade": null,
    "sourcedFrom": null,
    "history": null,
    "pairsWith": null,
    "status": "past"
  },
  {
    "slug": "honey-mustard",
    "name": "Honey Mustard",
    "limitedEdition": true,
    "heat": 1,
    "type": "wet-sauce",
    "shortDescription": null,
    "howMade": null,
    "sourcedFrom": null,
    "history": null,
    "pairsWith": null,
    "status": "past"
  },
  {
    "slug": "caribbean-coconut",
    "name": "Caribbean Coconut",
    "limitedEdition": true,
    "heat": 2,
    "type": "dry-rub",
    "shortDescription": null,
    "howMade": null,
    "sourcedFrom": null,
    "history": null,
    "pairsWith": null,
    "status": "past"
  },
  {
    "slug": "singapore-zing",
    "name": "Singapore Zing",
    "limitedEdition": true,
    "heat": 2,
    "type": "wet-sauce",
    "shortDescription": null,
    "howMade": null,
    "sourcedFrom": null,
    "history": null,
    "pairsWith": null,
    "status": "past"
  },
  {
    "slug": "wing-no1",
    "name": "Wing No1",
    "limitedEdition": true,
    "heat": 2,
    "type": "dry-rub",
    "shortDescription": null,
    "howMade": null,
    "sourcedFrom": null,
    "history": null,
    "pairsWith": null,
    "status": "past"
  }
];

export const DIPS: Dip[] = [
  {
    "slug": "blue-cheese",
    "name": "Blue Cheese",
    "shortDescription": "Cool, tangy and chunky — the classic Buffalo partner that tames the heat.",
    "howMade": null,
    "pairsWith": null,
    "notes": null
  },
  {
    "slug": "ranch",
    "name": "Ranch",
    "shortDescription": "Creamy, herby and cool. Goes with literally everything.",
    "howMade": null,
    "pairsWith": null,
    "notes": null
  },
  {
    "slug": "california-sauce-mayo",
    "name": "California Sauce / Mayo",
    "shortDescription": "Smooth, rich house mayo — made for dunking.",
    "howMade": null,
    "pairsWith": null,
    "notes": null
  },
  {
    "slug": "honey-mustard",
    "name": "Honey Mustard",
    "shortDescription": "Sweet honey, sharp mustard — tangy, smooth and made for Lemon Pepper.",
    "howMade": null,
    "pairsWith": null,
    "notes": null
  }
];

// Wheel + grid use flavours that are live (core + active LE).
export const SPINNABLE_FLAVOURS = FLAVOURS.filter(f => f.status === "core" || f.status === "active");
export const COMING_SOON_LE = FLAVOURS.filter(f => f.status === "coming-soon");
export const PAST_DROPS = FLAVOURS.filter(f => f.status === "past");
export const CORE_COUNT = FLAVOURS.filter(f => f.status === "core").length;

const NUMBER_WORDS = [
  "zero","one","two","three","four","five","six","seven","eight","nine","ten",
  "eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen","twenty",
];
export function numberToWord(n: number): string {
  if (Number.isInteger(n) && n >= 0 && n < NUMBER_WORDS.length) return NUMBER_WORDS[n];
  return String(n);
}

// Suggest up to `max` dips for a spun flavour. Parses the FLAVOUR's own
// `pairsWith` (comma-separated list of names), maps each token to a known Dip
// via aliases, drops non-dip pairings (e.g. "Tennessee B.B.Q"), dedupes and
// preserves the listed order. Falls back when the flavour has no pairsWith:
// Katsu → Cali Mayo + Ranch (safe sweet/savoury partners for the only live
// LE); everything else → Ranch (goes with everything).
//
// Previous implementation `suggestDipFor` matched against DIP.pairsWith, which
// is null for every dip, so it always returned DIPS[0] (Blue Cheese) — hence
// Blue Cheese appeared under every wheel result. Replaced here.
const DIP_ALIASES: Record<string, string> = {
  "blue cheese": "blue-cheese",
  "ranch": "ranch",
  "cali mayo": "california-sauce-mayo",
  "california": "california-sauce-mayo",
  "california sauce": "california-sauce-mayo",
  "california sauce / mayo": "california-sauce-mayo",
  "mayo": "california-sauce-mayo",
  "honey mustard": "honey-mustard",
};

function resolveDipSlug(token: string): string | null {
  const key = token.trim().toLowerCase();
  if (!key) return null;
  return DIP_ALIASES[key] ?? null;
}

export function suggestDipsFor(flavour: Flavour, max = 2): Dip[] {
  if (DIPS.length === 0 || max <= 0) return [];

  const picks: Dip[] = [];
  const seen = new Set<string>();

  const tokens = flavour.pairsWith ? flavour.pairsWith.split(",") : [];
  for (const token of tokens) {
    const slug = resolveDipSlug(token);
    if (!slug || seen.has(slug)) continue;
    const dip = DIPS.find((d) => d.slug === slug);
    if (!dip) continue;
    seen.add(slug);
    picks.push(dip);
    if (picks.length >= max) return picks;
  }

  if (picks.length > 0) return picks;

  // Fallback — no parseable pairings on this flavour.
  const fallbackSlugs =
    flavour.slug === "katsu"
      ? ["california-sauce-mayo", "ranch"]
      : ["ranch"];
  for (const slug of fallbackSlugs) {
    const dip = DIPS.find((d) => d.slug === slug);
    if (dip && !seen.has(slug)) {
      seen.add(slug);
      picks.push(dip);
      if (picks.length >= max) break;
    }
  }
  return picks;
}
