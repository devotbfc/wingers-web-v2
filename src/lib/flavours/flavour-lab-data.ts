// AUTO-GENERATED from Wingers-FLAVOUR-STORIES.xlsx — do not hand-edit.
// status: core | active | incoming | past  (LE lifecycle; auto-assigned, override in the sheet when proofed)

export type FlavourType = "dry-rub" | "wet-sauce" | null;
export type FlavourStatus = "core" | "active" | "incoming" | "past";

export interface Flavour {
  slug: string; name: string; limitedEdition: boolean; status: FlavourStatus;
  heat: number; type: FlavourType;
  shortDescription: string | null; howMade: string | null;
  sourcedFrom: string | null; history: string | null; pairsWith: string | null;
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
    "howMade": "Made with ripe mango puree, Caribbean habanero peppers, honey, garlic, apple cider vinegar, citrus juice, and our signature spice blend before being slow-simmered until perfectly smooth.",
    "sourcedFrom": "\ud83c\uddf2\ud83c\uddfd Mexico \u2013 Habanero peppers. \ud83c\udde7\ud83c\uddf7 Brazil \u2013 Tropical fruits",
    "history": "Habanero peppers originated in the Amazon Basin before becoming famous throughout the Caribbean and Mexico. Pairing tropical fruits like mango with habaneros became popular because the natural sweetness helps balance the pepper's intense heat.",
    "pairsWith": "Blue Cheese, Ranch, Tennessee B.B.Q",
    "status": "core"
  },
  {
    "slug": "korea-town",
    "name": "Korea Town",
    "limitedEdition": false,
    "heat": 2,
    "type": "wet-sauce",
    "shortDescription": "Sweet, savory, smoky, and mildly spicy with rich garlic and sesame flavors.",
    "howMade": "Crafted with Korean gochujang, soy sauce, garlic, ginger, sesame oil, brown sugar, rice vinegar, and toasted sesame seeds.",
    "sourcedFrom": "\ud83c\uddf0\ud83c\uddf7 South Korea \u2013 Gochujang & Korean seasonings. \ud83c\uddf9\ud83c\udded Thailand \u2013 Sweet chili influences",
    "history": "Inspired by Korea's famous Korean Fried Chicken, which became internationally popular for its crispy texture and bold sweet-spicy glaze using fermented chili paste known as gochujang.",
    "pairsWith": "Ranch, Blue Cheese",
    "status": "core"
  },
  {
    "slug": "tennessee-bbq",
    "name": "Tennessee BBQ",
    "limitedEdition": false,
    "heat": 1,
    "type": "wet-sauce",
    "shortDescription": "Sweet, smoky, tangy, and rich with classic Southern barbecue flavor.",
    "howMade": "Made using tomato, molasses, brown sugar, apple cider vinegar, smoked paprika, garlic, onion, black pepper, and natural hickory smoke.",
    "sourcedFrom": "\ud83c\uddfa\ud83c\uddf8 United States \u2013 BBQ, Cajun traditions",
    "history": "Tennessee barbecue is known for balancing sweet tomato-based sauces with smoky spices and slow-cooked meats, creating one of America's most beloved BBQ traditions.",
    "pairsWith": "Ranch",
    "status": "core"
  },
  {
    "slug": "lemon-pepper",
    "name": "Lemon Pepper",
    "limitedEdition": false,
    "heat": 0,
    "type": "wet-sauce",
    "shortDescription": "Bright citrus with cracked black pepper and savory herbs.",
    "howMade": "A premium blend of lemon zest, cracked black pepper, garlic, onion, sea salt, parsley, and herbs tossed over fresh wings.",
    "sourcedFrom": "\ud83c\uddfb\ud83c\uddf3 Vietnam \u2013 Garlic and citrus notes. \ud83c\udde7\ud83c\uddf7 Brazil \u2013 Tropical fruits",
    "history": "Although lemon pepper seasoning originated as a seafood seasoning, it became legendary in Atlanta's wing culture where it remains one of the city's signature flavors.",
    "pairsWith": "Blue Cheese, Ranch, Cali Mayo, Honey Mustard",
    "status": "core"
  },
  {
    "slug": "ghost-buffalo-hot",
    "name": "Ghost Buffalo HOT",
    "limitedEdition": false,
    "heat": 5,
    "type": "wet-sauce",
    "shortDescription": "Classic Buffalo flavor with the intense heat of Ghost Peppers.",
    "howMade": "Premium cayenne peppers, Ghost Pepper mash, butter, vinegar, garlic, and spices create an extremely hot yet flavorful sauce.",
    "sourcedFrom": "\ud83c\uddee\ud83c\uddf3 India \u2013 Ghost Peppers and aromatic spices. \ud83c\uddfa\ud83c\uddf8 United States \u2013 Buffalo",
    "history": "Ghost Pepper (Bhut Jolokia) originated in Northeast India and once held the title of the world's hottest pepper. Combined with Buffalo sauce, it creates an unforgettable extreme heat experience.",
    "pairsWith": "Blue Cheese, Ranch",
    "status": "core"
  },
  {
    "slug": "buffalo-new-york",
    "name": "Buffalo New York",
    "limitedEdition": false,
    "heat": 2,
    "type": "wet-sauce",
    "shortDescription": "Tangy, buttery, mildly spicy, and timeless.",
    "howMade": "Made with aged cayenne peppers, butter, vinegar, garlic, Worcestershire sauce, and signature spices.",
    "sourcedFrom": "\ud83c\uddfa\ud83c\uddf8 United States \u2013 Buffalo, BBQ, Cajun traditions",
    "history": "Buffalo sauce was invented in 1964 at the Anchor Bar in Buffalo, New York, when chicken wings were tossed in hot sauce and butter for the very first time. It quickly became one of America's most iconic comfort foods.",
    "pairsWith": "Blue Cheese",
    "status": "core"
  },
  {
    "slug": "naked",
    "name": "Naked (no sauce)",
    "limitedEdition": false,
    "heat": 0,
    "type": null,
    "shortDescription": "Pure crispy chicken.",
    "howMade": "Fresh wings are perfectly seasoned and cooked until golden crispy without any sauce, allowing the natural flavor of the chicken to shine.",
    "sourcedFrom": "\ud83c\uddf9\ud83c\uddf7 Turkey \u2013 Paprika and spice blends",
    "history": "Sometimes less is more. Naked wings have always been a favorite for guests who enjoy dipping into their own sauces or appreciate perfectly cooked chicken on its own.",
    "pairsWith": "Ranch, Honey Mustard, Cali Mayo",
    "status": "core"
  },
  {
    "slug": "new-orleans-cajun",
    "name": "New Orleans Cajun",
    "limitedEdition": false,
    "heat": 1,
    "type": "dry-rub",
    "shortDescription": "Bold, peppery, smoky, garlicky, and packed with Louisiana spices.",
    "howMade": "A dry blend of paprika, cayenne, garlic, onion, thyme, oregano, black pepper, white pepper, and herbs.",
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
    "howMade": "Made with allspice, thyme, Scotch Bonnet peppers, cinnamon, garlic, ginger, brown sugar, nutmeg, cloves, and herbs.",
    "sourcedFrom": "\ud83c\uddef\ud83c\uddf2 Jamaica \u2013 Jerk spices & Scotch Bonnet peppers. \ud83c\udde7\ud83c\uddf7 Brazil \u2013 Tropical fruits",
    "history": "Traditional Jamaican Jerk dates back hundreds of years when the Maroons developed unique spice blends and slow-smoking techniques using local herbs and Scotch Bonnet peppers.",
    "pairsWith": "Ranch",
    "status": "active"
  },
  {
    "slug": "garlic-parmesan",
    "name": "Garlic Parmesan",
    "limitedEdition": false,
    "heat": 0,
    "type": "wet-sauce",
    "shortDescription": "Rich, buttery, cheesy, and full of roasted garlic.",
    "howMade": "Fresh roasted garlic is blended with real butter, aged Parmesan cheese, herbs, parsley, and cracked pepper.",
    "sourcedFrom": "\ud83c\udde8\ud83c\uddf3 China \u2013 Garlic and chili traditions. \ud83c\uddee\ud83c\uddf9 Italy \u2013 Parmesan cheese & herbs. \ud83c\uddec\ud83c\uddf7 Greece \u2013 Mediterranean herbs",
    "history": "Garlic Parmesan became a modern wing favorite by combining Italian-inspired flavors with American chicken wings, creating a rich, creamy alternative to spicy sauces.",
    "pairsWith": "Cali Mayo",
    "status": "core"
  },
  {
    "slug": "hot-honey",
    "name": "Hot Honey",
    "limitedEdition": false,
    "heat": 3,
    "type": "wet-sauce",
    "shortDescription": "Sweet honey followed by a gentle chili kick.",
    "howMade": "Pure honey is infused with chili peppers, cayenne, garlic, vinegar, and spices before being drizzled over crispy wings.",
    "sourcedFrom": ". \ud83c\udde8\ud83c\uddf1 Chile \u2013 Premium chili peppers",
    "history": "Hot Honey became famous after artisan pizza makers began infusing honey with chili peppers. Its sweet heat quickly spread to fried chicken, biscuits, pizza, and wings.",
    "pairsWith": "Ranch, Cali Mayo",
    "status": "core"
  },
  {
    "slug": "flamin-cajun",
    "name": "Flamin' Cajun",
    "limitedEdition": true,
    "heat": 3,
    "type": "dry-rub",
    "shortDescription": "Extra spicy Cajun seasoning with smoky Louisiana heat.",
    "howMade": "An amped-up version of Cajun seasoning featuring extra cayenne, chili peppers, smoked paprika, garlic, black pepper, herbs, and bold spices.",
    "sourcedFrom": "\ud83c\udde8\ud83c\uddf1 Chile \u2013 Premium chili peppers. \ud83c\uddfa\ud83c\uddf8 United States \u2013 Cajun traditions. \ud83c\uddf9\ud83c\uddf7 Turkey \u2013 Paprika and spice blends",
    "history": "Inspired by Louisiana's love of bold spice, Flamin' Cajun takes traditional Cajun flavors and turns the heat up for serious spice lovers.",
    "pairsWith": "Blue Cheese, Ranch, Cali Mayo, Honey Mustard",
    "status": "active"
  },
  {
    "slug": "mild-buffalo",
    "name": "Mild Buffalo",
    "limitedEdition": true,
    "heat": 1,
    "type": "wet-sauce",
    "shortDescription": "Classic Buffalo flavor with less heat and extra buttery richness.",
    "howMade": "Made using aged cayenne peppers, butter, vinegar, garlic, paprika, and signature seasonings with a milder pepper blend.",
    "sourcedFrom": "\ud83c\uddfa\ud83c\uddf8 United States \u2013 Buffalo",
    "history": "Created for those who love the original Buffalo flavor without overwhelming heat, Mild Buffalo remains one of America's most popular wing sauces.",
    "pairsWith": "Blue Cheese",
    "status": "active"
  },
  {
    "slug": "katsu",
    "name": "Katsu",
    "limitedEdition": true,
    "heat": 1,
    "type": "wet-sauce",
    "shortDescription": null,
    "howMade": null,
    "sourcedFrom": null,
    "history": null,
    "pairsWith": null,
    "status": "incoming"
  },
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
    "status": "incoming"
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
    "status": "incoming"
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
    "status": "incoming"
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
    "status": "incoming"
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
    "status": "incoming"
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
    "status": "incoming"
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
    "status": "incoming"
  },
  {
    "slug": "carribean-coconut",
    "name": "Carribean Coconut",
    "limitedEdition": true,
    "heat": 2,
    "type": "dry-rub",
    "shortDescription": null,
    "howMade": null,
    "sourcedFrom": null,
    "history": null,
    "pairsWith": null,
    "status": "incoming"
  },
  {
    "slug": "sinapore-zing",
    "name": "Sinapore Zing",
    "limitedEdition": true,
    "heat": 2,
    "type": "wet-sauce",
    "shortDescription": null,
    "howMade": null,
    "sourcedFrom": null,
    "history": null,
    "pairsWith": null,
    "status": "incoming"
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
    "status": "incoming"
  }
];

export const DIPS: Dip[] = [
  {
    "slug": "blue-cheese",
    "name": "Blue Cheese",
    "shortDescription": null,
    "howMade": null,
    "pairsWith": null,
    "notes": null
  },
  {
    "slug": "ranch",
    "name": "Ranch",
    "shortDescription": null,
    "howMade": null,
    "pairsWith": null,
    "notes": null
  },
  {
    "slug": "california-sauce-mayo",
    "name": "California Sauce / Mayo",
    "shortDescription": null,
    "howMade": null,
    "pairsWith": null,
    "notes": null
  },
  {
    "slug": "honey-mustard",
    "name": "Honey Mustard",
    "shortDescription": null,
    "howMade": null,
    "pairsWith": null,
    "notes": null
  }
];

// Wheel + grid use flavours that have stories (core + active LE).
export const SPINNABLE_FLAVOURS = FLAVOURS.filter(f => f.status === "core" || f.status === "active");
export const CORE_FLAVOURS = FLAVOURS.filter(f => f.status === "core");
export const ACTIVE_LE = FLAVOURS.filter(f => f.status === "active");
export const INCOMING_LE = FLAVOURS.filter(f => f.status === "incoming");
export const PAST_DROPS = FLAVOURS.filter(f => f.status === "past");

// Suggest a dip to pair with a spun flavour (uses dip.pairsWith text match, falls back to first dip).
export function suggestDipFor(flavour: Flavour): Dip | null {
  if (DIPS.length === 0) return null;
  const match = DIPS.find(d => d.pairsWith && d.pairsWith.toLowerCase().includes(flavour.name.toLowerCase().split(" ")[0]));
  return match ?? DIPS[0] ?? null;
}
