// AUTO-GENERATED from Wingers-MENU-MASTER.xlsx — do not hand-edit.
// Regenerate from the master spreadsheet when the menu changes.
// Flat menu model: Wings/Boneless/Tenders = one card per flavour per product,
// priced by size (fromPrice + sizes[]). Other items priced directly (priceMK/priceNN).
// Limited editions carry limitedEdition + availableUntil (ISO date | null).
// When availableUntil is in the past, treat the item as a Past Drop (see isCurrentLE).

import type { Allergen } from "./allergen-data";

export interface MenuSize { size: string; priceMK: number | null; priceNN: number | null; }

export interface MenuItem {
  slug: string;
  name: string;
  sectionSlug: string;
  sectionName?: string;
  product?: string;            // Wings | Boneless | Tenders (variant items only)
  flavourSlug?: string;
  fromPrice?: number | null;   // 'from £X' for size-priced items
  sizes?: MenuSize[];
  priceMK: number | null;
  priceNN: number | null;
  description: string | null;
  spice: number;               // 0-5
  signature: boolean;
  vegetarian: boolean;
  halal: boolean;
  limitedEdition: boolean;
  availableUntil: string | null; // ISO date; null = no end set
  unavailableAt: string | null;  // 'MK' | 'NN' | null
  photo: string | null;
  contains: Allergen[];
  traces: Allergen[];
}

export interface FlavourShowcaseItem {
  slug: string; name: string; spice: number; limitedEdition: boolean;
  description: string | null; contains: Allergen[]; traces: Allergen[];
}

export const MENU_SECTIONS: { slug: string; name: string }[] = [
  { slug: "wings-boneless-tenders", name: "Wings + Boneless + Tenders" },
  { slug: "chicken-burgers", name: "Chicken Burgers" },
  { slug: "beef-burgers", name: "Beef Burgers" },
  { slug: "fries-loaded", name: "Fries + Loaded Fries" },
  { slug: "chicken-loaded-fries", name: "Chicken Loaded Fries" },
  { slug: "mac-and-cheese", name: "Mac & Cheese" },
  { slug: "sides", name: "Sides" },
  { slug: "platters-combos", name: "Platters + Combos" },
  { slug: "dips", name: "Dips" },
  { slug: "shakes", name: "Shakes" },
  { slug: "churros", name: "Churros" },
  { slug: "nyc-cookies", name: "NYC Cookies" },
  { slug: "coolers", name: "Coolers" },
  { slug: "kids", name: "Kids" },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    "slug": "wings-mango-habanero",
    "name": "Mango Habanero Wings",
    "sectionSlug": "wings-boneless-tenders",
    "product": "Wings",
    "flavourSlug": "mango-habanero",
    "fromPrice": 4.99,
    "sizes": [
      {
        "size": "Wings 4pcs",
        "priceMK": null,
        "priceNN": 4.99
      },
      {
        "size": "Wings 6pcs",
        "priceMK": 7.95,
        "priceNN": 7.95
      },
      {
        "size": "Wings 10pcs",
        "priceMK": null,
        "priceNN": null
      },
      {
        "size": "Wings 15pcs",
        "priceMK": null,
        "priceNN": null
      }
    ],
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 3,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame",
      "sulphites"
    ]
  },
  {
    "slug": "wings-korea-town",
    "name": "Korea Town Wings",
    "sectionSlug": "wings-boneless-tenders",
    "product": "Wings",
    "flavourSlug": "korea-town",
    "fromPrice": 4.99,
    "sizes": [
      {
        "size": "Wings 4pcs",
        "priceMK": null,
        "priceNN": 4.99
      },
      {
        "size": "Wings 6pcs",
        "priceMK": 7.95,
        "priceNN": 7.95
      },
      {
        "size": "Wings 10pcs",
        "priceMK": null,
        "priceNN": null
      },
      {
        "size": "Wings 15pcs",
        "priceMK": null,
        "priceNN": null
      }
    ],
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 2,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame",
      "sulphites"
    ]
  },
  {
    "slug": "wings-tennessee-bbq",
    "name": "Tennessee BBQ Wings",
    "sectionSlug": "wings-boneless-tenders",
    "product": "Wings",
    "flavourSlug": "tennessee-bbq",
    "fromPrice": 4.99,
    "sizes": [
      {
        "size": "Wings 4pcs",
        "priceMK": null,
        "priceNN": 4.99
      },
      {
        "size": "Wings 6pcs",
        "priceMK": 7.95,
        "priceNN": 7.95
      },
      {
        "size": "Wings 10pcs",
        "priceMK": null,
        "priceNN": null
      },
      {
        "size": "Wings 15pcs",
        "priceMK": null,
        "priceNN": null
      }
    ],
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 1,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame",
      "sulphites"
    ]
  },
  {
    "slug": "wings-lemon-pepper",
    "name": "Lemon Pepper Wings",
    "sectionSlug": "wings-boneless-tenders",
    "product": "Wings",
    "flavourSlug": "lemon-pepper",
    "fromPrice": 4.99,
    "sizes": [
      {
        "size": "Wings 4pcs",
        "priceMK": null,
        "priceNN": 4.99
      },
      {
        "size": "Wings 6pcs",
        "priceMK": 7.95,
        "priceNN": 7.95
      },
      {
        "size": "Wings 10pcs",
        "priceMK": null,
        "priceNN": null
      },
      {
        "size": "Wings 15pcs",
        "priceMK": null,
        "priceNN": null
      }
    ],
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 0,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame",
      "sulphites"
    ]
  },
  {
    "slug": "wings-ghost-buffalo-hot",
    "name": "Ghost Buffalo HOT Wings",
    "sectionSlug": "wings-boneless-tenders",
    "product": "Wings",
    "flavourSlug": "ghost-buffalo-hot",
    "fromPrice": 4.99,
    "sizes": [
      {
        "size": "Wings 4pcs",
        "priceMK": null,
        "priceNN": 4.99
      },
      {
        "size": "Wings 6pcs",
        "priceMK": 7.95,
        "priceNN": 7.95
      },
      {
        "size": "Wings 10pcs",
        "priceMK": null,
        "priceNN": null
      },
      {
        "size": "Wings 15pcs",
        "priceMK": null,
        "priceNN": null
      }
    ],
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 5,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame",
      "sulphites"
    ]
  },
  {
    "slug": "wings-buffalo-new-york",
    "name": "Buffalo New York Wings",
    "sectionSlug": "wings-boneless-tenders",
    "product": "Wings",
    "flavourSlug": "buffalo-new-york",
    "fromPrice": 4.99,
    "sizes": [
      {
        "size": "Wings 4pcs",
        "priceMK": null,
        "priceNN": 4.99
      },
      {
        "size": "Wings 6pcs",
        "priceMK": 7.95,
        "priceNN": 7.95
      },
      {
        "size": "Wings 10pcs",
        "priceMK": null,
        "priceNN": null
      },
      {
        "size": "Wings 15pcs",
        "priceMK": null,
        "priceNN": null
      }
    ],
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 2,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame",
      "sulphites"
    ]
  },
  {
    "slug": "wings-naked-wings",
    "name": "Naked Wings (no sauce) Wings",
    "sectionSlug": "wings-boneless-tenders",
    "product": "Wings",
    "flavourSlug": "naked-wings",
    "fromPrice": 4.99,
    "sizes": [
      {
        "size": "Wings 4pcs",
        "priceMK": null,
        "priceNN": 4.99
      },
      {
        "size": "Wings 6pcs",
        "priceMK": 7.95,
        "priceNN": 7.95
      },
      {
        "size": "Wings 10pcs",
        "priceMK": null,
        "priceNN": null
      },
      {
        "size": "Wings 15pcs",
        "priceMK": null,
        "priceNN": null
      }
    ],
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 0,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame",
      "sulphites"
    ]
  },
  {
    "slug": "wings-new-orleans-cajun",
    "name": "New Orleans Cajun Wings",
    "sectionSlug": "wings-boneless-tenders",
    "product": "Wings",
    "flavourSlug": "new-orleans-cajun",
    "fromPrice": 4.99,
    "sizes": [
      {
        "size": "Wings 4pcs",
        "priceMK": null,
        "priceNN": 4.99
      },
      {
        "size": "Wings 6pcs",
        "priceMK": 7.95,
        "priceNN": 7.95
      },
      {
        "size": "Wings 10pcs",
        "priceMK": null,
        "priceNN": null
      },
      {
        "size": "Wings 15pcs",
        "priceMK": null,
        "priceNN": null
      }
    ],
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 1,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame",
      "sulphites"
    ]
  },
  {
    "slug": "wings-caribbean-jerk",
    "name": "Caribbean Jerk Wings",
    "sectionSlug": "wings-boneless-tenders",
    "product": "Wings",
    "flavourSlug": "caribbean-jerk",
    "fromPrice": 4.99,
    "sizes": [
      {
        "size": "Wings 4pcs",
        "priceMK": null,
        "priceNN": 4.99
      },
      {
        "size": "Wings 6pcs",
        "priceMK": 7.95,
        "priceNN": 7.95
      },
      {
        "size": "Wings 10pcs",
        "priceMK": null,
        "priceNN": null
      },
      {
        "size": "Wings 15pcs",
        "priceMK": null,
        "priceNN": null
      }
    ],
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 3,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "molluscs",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame",
      "sulphites"
    ]
  },
  {
    "slug": "wings-garlic-parmesan",
    "name": "Garlic Parmesan Wings",
    "sectionSlug": "wings-boneless-tenders",
    "product": "Wings",
    "flavourSlug": "garlic-parmesan",
    "fromPrice": 4.99,
    "sizes": [
      {
        "size": "Wings 4pcs",
        "priceMK": null,
        "priceNN": 4.99
      },
      {
        "size": "Wings 6pcs",
        "priceMK": 7.95,
        "priceNN": 7.95
      },
      {
        "size": "Wings 10pcs",
        "priceMK": null,
        "priceNN": null
      },
      {
        "size": "Wings 15pcs",
        "priceMK": null,
        "priceNN": null
      }
    ],
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 0,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame",
      "sulphites"
    ]
  },
  {
    "slug": "wings-hot-honey",
    "name": "Hot Honey Wings",
    "sectionSlug": "wings-boneless-tenders",
    "product": "Wings",
    "flavourSlug": "hot-honey",
    "fromPrice": 4.99,
    "sizes": [
      {
        "size": "Wings 4pcs",
        "priceMK": null,
        "priceNN": 4.99
      },
      {
        "size": "Wings 6pcs",
        "priceMK": 7.95,
        "priceNN": 7.95
      },
      {
        "size": "Wings 10pcs",
        "priceMK": null,
        "priceNN": null
      },
      {
        "size": "Wings 15pcs",
        "priceMK": null,
        "priceNN": null
      }
    ],
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 3,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame",
      "sulphites"
    ]
  },
  {
    "slug": "wings-flamin-cajun",
    "name": "Flamin' Cajun Wings",
    "sectionSlug": "wings-boneless-tenders",
    "product": "Wings",
    "flavourSlug": "flamin-cajun",
    "fromPrice": 4.99,
    "sizes": [
      {
        "size": "Wings 4pcs",
        "priceMK": null,
        "priceNN": 4.99
      },
      {
        "size": "Wings 6pcs",
        "priceMK": 7.95,
        "priceNN": 7.95
      },
      {
        "size": "Wings 10pcs",
        "priceMK": null,
        "priceNN": null
      },
      {
        "size": "Wings 15pcs",
        "priceMK": null,
        "priceNN": null
      }
    ],
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 3,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": true,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame",
      "sulphites"
    ]
  },
  {
    "slug": "wings-mild-buffalo",
    "name": "Mild Buffalo Wings",
    "sectionSlug": "wings-boneless-tenders",
    "product": "Wings",
    "flavourSlug": "mild-buffalo",
    "fromPrice": 4.99,
    "sizes": [
      {
        "size": "Wings 4pcs",
        "priceMK": null,
        "priceNN": 4.99
      },
      {
        "size": "Wings 6pcs",
        "priceMK": 7.95,
        "priceNN": 7.95
      },
      {
        "size": "Wings 10pcs",
        "priceMK": null,
        "priceNN": null
      },
      {
        "size": "Wings 15pcs",
        "priceMK": null,
        "priceNN": null
      }
    ],
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 1,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame",
      "sulphites"
    ]
  },
  {
    "slug": "boneless-mango-habanero",
    "name": "Mango Habanero Boneless",
    "sectionSlug": "wings-boneless-tenders",
    "product": "Boneless",
    "flavourSlug": "mango-habanero",
    "fromPrice": 7.95,
    "sizes": [
      {
        "size": "Boneless 6pcs",
        "priceMK": 7.95,
        "priceNN": 7.95
      },
      {
        "size": "Boneless 10pcs",
        "priceMK": null,
        "priceNN": null
      },
      {
        "size": "Boneless 15pcs",
        "priceMK": null,
        "priceNN": null
      }
    ],
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 3,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame",
      "sulphites"
    ]
  },
  {
    "slug": "boneless-korea-town",
    "name": "Korea Town Boneless",
    "sectionSlug": "wings-boneless-tenders",
    "product": "Boneless",
    "flavourSlug": "korea-town",
    "fromPrice": 7.95,
    "sizes": [
      {
        "size": "Boneless 6pcs",
        "priceMK": 7.95,
        "priceNN": 7.95
      },
      {
        "size": "Boneless 10pcs",
        "priceMK": null,
        "priceNN": null
      },
      {
        "size": "Boneless 15pcs",
        "priceMK": null,
        "priceNN": null
      }
    ],
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 2,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame",
      "sulphites"
    ]
  },
  {
    "slug": "boneless-tennessee-bbq",
    "name": "Tennessee BBQ Boneless",
    "sectionSlug": "wings-boneless-tenders",
    "product": "Boneless",
    "flavourSlug": "tennessee-bbq",
    "fromPrice": 7.95,
    "sizes": [
      {
        "size": "Boneless 6pcs",
        "priceMK": 7.95,
        "priceNN": 7.95
      },
      {
        "size": "Boneless 10pcs",
        "priceMK": null,
        "priceNN": null
      },
      {
        "size": "Boneless 15pcs",
        "priceMK": null,
        "priceNN": null
      }
    ],
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 1,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame",
      "sulphites"
    ]
  },
  {
    "slug": "boneless-lemon-pepper",
    "name": "Lemon Pepper Boneless",
    "sectionSlug": "wings-boneless-tenders",
    "product": "Boneless",
    "flavourSlug": "lemon-pepper",
    "fromPrice": 7.95,
    "sizes": [
      {
        "size": "Boneless 6pcs",
        "priceMK": 7.95,
        "priceNN": 7.95
      },
      {
        "size": "Boneless 10pcs",
        "priceMK": null,
        "priceNN": null
      },
      {
        "size": "Boneless 15pcs",
        "priceMK": null,
        "priceNN": null
      }
    ],
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 0,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame",
      "sulphites"
    ]
  },
  {
    "slug": "boneless-ghost-buffalo-hot",
    "name": "Ghost Buffalo HOT Boneless",
    "sectionSlug": "wings-boneless-tenders",
    "product": "Boneless",
    "flavourSlug": "ghost-buffalo-hot",
    "fromPrice": 7.95,
    "sizes": [
      {
        "size": "Boneless 6pcs",
        "priceMK": 7.95,
        "priceNN": 7.95
      },
      {
        "size": "Boneless 10pcs",
        "priceMK": null,
        "priceNN": null
      },
      {
        "size": "Boneless 15pcs",
        "priceMK": null,
        "priceNN": null
      }
    ],
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 5,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame",
      "sulphites"
    ]
  },
  {
    "slug": "boneless-buffalo-new-york",
    "name": "Buffalo New York Boneless",
    "sectionSlug": "wings-boneless-tenders",
    "product": "Boneless",
    "flavourSlug": "buffalo-new-york",
    "fromPrice": 7.95,
    "sizes": [
      {
        "size": "Boneless 6pcs",
        "priceMK": 7.95,
        "priceNN": 7.95
      },
      {
        "size": "Boneless 10pcs",
        "priceMK": null,
        "priceNN": null
      },
      {
        "size": "Boneless 15pcs",
        "priceMK": null,
        "priceNN": null
      }
    ],
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 2,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame",
      "sulphites"
    ]
  },
  {
    "slug": "boneless-naked-wings",
    "name": "Naked Wings (no sauce) Boneless",
    "sectionSlug": "wings-boneless-tenders",
    "product": "Boneless",
    "flavourSlug": "naked-wings",
    "fromPrice": 7.95,
    "sizes": [
      {
        "size": "Boneless 6pcs",
        "priceMK": 7.95,
        "priceNN": 7.95
      },
      {
        "size": "Boneless 10pcs",
        "priceMK": null,
        "priceNN": null
      },
      {
        "size": "Boneless 15pcs",
        "priceMK": null,
        "priceNN": null
      }
    ],
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 0,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame",
      "sulphites"
    ]
  },
  {
    "slug": "boneless-new-orleans-cajun",
    "name": "New Orleans Cajun Boneless",
    "sectionSlug": "wings-boneless-tenders",
    "product": "Boneless",
    "flavourSlug": "new-orleans-cajun",
    "fromPrice": 7.95,
    "sizes": [
      {
        "size": "Boneless 6pcs",
        "priceMK": 7.95,
        "priceNN": 7.95
      },
      {
        "size": "Boneless 10pcs",
        "priceMK": null,
        "priceNN": null
      },
      {
        "size": "Boneless 15pcs",
        "priceMK": null,
        "priceNN": null
      }
    ],
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 1,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame",
      "sulphites"
    ]
  },
  {
    "slug": "boneless-caribbean-jerk",
    "name": "Caribbean Jerk Boneless",
    "sectionSlug": "wings-boneless-tenders",
    "product": "Boneless",
    "flavourSlug": "caribbean-jerk",
    "fromPrice": 7.95,
    "sizes": [
      {
        "size": "Boneless 6pcs",
        "priceMK": 7.95,
        "priceNN": 7.95
      },
      {
        "size": "Boneless 10pcs",
        "priceMK": null,
        "priceNN": null
      },
      {
        "size": "Boneless 15pcs",
        "priceMK": null,
        "priceNN": null
      }
    ],
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 3,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "molluscs",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame",
      "sulphites"
    ]
  },
  {
    "slug": "boneless-garlic-parmesan",
    "name": "Garlic Parmesan Boneless",
    "sectionSlug": "wings-boneless-tenders",
    "product": "Boneless",
    "flavourSlug": "garlic-parmesan",
    "fromPrice": 7.95,
    "sizes": [
      {
        "size": "Boneless 6pcs",
        "priceMK": 7.95,
        "priceNN": 7.95
      },
      {
        "size": "Boneless 10pcs",
        "priceMK": null,
        "priceNN": null
      },
      {
        "size": "Boneless 15pcs",
        "priceMK": null,
        "priceNN": null
      }
    ],
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 0,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame",
      "sulphites"
    ]
  },
  {
    "slug": "boneless-hot-honey",
    "name": "Hot Honey Boneless",
    "sectionSlug": "wings-boneless-tenders",
    "product": "Boneless",
    "flavourSlug": "hot-honey",
    "fromPrice": 7.95,
    "sizes": [
      {
        "size": "Boneless 6pcs",
        "priceMK": 7.95,
        "priceNN": 7.95
      },
      {
        "size": "Boneless 10pcs",
        "priceMK": null,
        "priceNN": null
      },
      {
        "size": "Boneless 15pcs",
        "priceMK": null,
        "priceNN": null
      }
    ],
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 3,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame",
      "sulphites"
    ]
  },
  {
    "slug": "boneless-flamin-cajun",
    "name": "Flamin' Cajun Boneless",
    "sectionSlug": "wings-boneless-tenders",
    "product": "Boneless",
    "flavourSlug": "flamin-cajun",
    "fromPrice": 7.95,
    "sizes": [
      {
        "size": "Boneless 6pcs",
        "priceMK": 7.95,
        "priceNN": 7.95
      },
      {
        "size": "Boneless 10pcs",
        "priceMK": null,
        "priceNN": null
      },
      {
        "size": "Boneless 15pcs",
        "priceMK": null,
        "priceNN": null
      }
    ],
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 3,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": true,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame",
      "sulphites"
    ]
  },
  {
    "slug": "boneless-mild-buffalo",
    "name": "Mild Buffalo Boneless",
    "sectionSlug": "wings-boneless-tenders",
    "product": "Boneless",
    "flavourSlug": "mild-buffalo",
    "fromPrice": 7.95,
    "sizes": [
      {
        "size": "Boneless 6pcs",
        "priceMK": 7.95,
        "priceNN": 7.95
      },
      {
        "size": "Boneless 10pcs",
        "priceMK": null,
        "priceNN": null
      },
      {
        "size": "Boneless 15pcs",
        "priceMK": null,
        "priceNN": null
      }
    ],
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 1,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame",
      "sulphites"
    ]
  },
  {
    "slug": "tenders-mango-habanero",
    "name": "Mango Habanero Tenders",
    "sectionSlug": "wings-boneless-tenders",
    "product": "Tenders",
    "flavourSlug": "mango-habanero",
    "fromPrice": 7.9,
    "sizes": [
      {
        "size": "Tenders 4pcs",
        "priceMK": 7.9,
        "priceNN": null
      },
      {
        "size": "Tenders 6pcs",
        "priceMK": null,
        "priceNN": null
      },
      {
        "size": "Tenders 8pcs",
        "priceMK": null,
        "priceNN": null
      }
    ],
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 3,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame",
      "sulphites"
    ]
  },
  {
    "slug": "tenders-korea-town",
    "name": "Korea Town Tenders",
    "sectionSlug": "wings-boneless-tenders",
    "product": "Tenders",
    "flavourSlug": "korea-town",
    "fromPrice": 7.9,
    "sizes": [
      {
        "size": "Tenders 4pcs",
        "priceMK": 7.9,
        "priceNN": null
      },
      {
        "size": "Tenders 6pcs",
        "priceMK": null,
        "priceNN": null
      },
      {
        "size": "Tenders 8pcs",
        "priceMK": null,
        "priceNN": null
      }
    ],
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 2,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame",
      "sulphites"
    ]
  },
  {
    "slug": "tenders-tennessee-bbq",
    "name": "Tennessee BBQ Tenders",
    "sectionSlug": "wings-boneless-tenders",
    "product": "Tenders",
    "flavourSlug": "tennessee-bbq",
    "fromPrice": 7.9,
    "sizes": [
      {
        "size": "Tenders 4pcs",
        "priceMK": 7.9,
        "priceNN": null
      },
      {
        "size": "Tenders 6pcs",
        "priceMK": null,
        "priceNN": null
      },
      {
        "size": "Tenders 8pcs",
        "priceMK": null,
        "priceNN": null
      }
    ],
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 1,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame",
      "sulphites"
    ]
  },
  {
    "slug": "tenders-lemon-pepper",
    "name": "Lemon Pepper Tenders",
    "sectionSlug": "wings-boneless-tenders",
    "product": "Tenders",
    "flavourSlug": "lemon-pepper",
    "fromPrice": 7.9,
    "sizes": [
      {
        "size": "Tenders 4pcs",
        "priceMK": 7.9,
        "priceNN": null
      },
      {
        "size": "Tenders 6pcs",
        "priceMK": null,
        "priceNN": null
      },
      {
        "size": "Tenders 8pcs",
        "priceMK": null,
        "priceNN": null
      }
    ],
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 0,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame",
      "sulphites"
    ]
  },
  {
    "slug": "tenders-ghost-buffalo-hot",
    "name": "Ghost Buffalo HOT Tenders",
    "sectionSlug": "wings-boneless-tenders",
    "product": "Tenders",
    "flavourSlug": "ghost-buffalo-hot",
    "fromPrice": 7.9,
    "sizes": [
      {
        "size": "Tenders 4pcs",
        "priceMK": 7.9,
        "priceNN": null
      },
      {
        "size": "Tenders 6pcs",
        "priceMK": null,
        "priceNN": null
      },
      {
        "size": "Tenders 8pcs",
        "priceMK": null,
        "priceNN": null
      }
    ],
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 5,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame",
      "sulphites"
    ]
  },
  {
    "slug": "tenders-buffalo-new-york",
    "name": "Buffalo New York Tenders",
    "sectionSlug": "wings-boneless-tenders",
    "product": "Tenders",
    "flavourSlug": "buffalo-new-york",
    "fromPrice": 7.9,
    "sizes": [
      {
        "size": "Tenders 4pcs",
        "priceMK": 7.9,
        "priceNN": null
      },
      {
        "size": "Tenders 6pcs",
        "priceMK": null,
        "priceNN": null
      },
      {
        "size": "Tenders 8pcs",
        "priceMK": null,
        "priceNN": null
      }
    ],
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 2,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame",
      "sulphites"
    ]
  },
  {
    "slug": "tenders-naked-wings",
    "name": "Naked Wings (no sauce) Tenders",
    "sectionSlug": "wings-boneless-tenders",
    "product": "Tenders",
    "flavourSlug": "naked-wings",
    "fromPrice": 7.9,
    "sizes": [
      {
        "size": "Tenders 4pcs",
        "priceMK": 7.9,
        "priceNN": null
      },
      {
        "size": "Tenders 6pcs",
        "priceMK": null,
        "priceNN": null
      },
      {
        "size": "Tenders 8pcs",
        "priceMK": null,
        "priceNN": null
      }
    ],
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 0,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame",
      "sulphites"
    ]
  },
  {
    "slug": "tenders-new-orleans-cajun",
    "name": "New Orleans Cajun Tenders",
    "sectionSlug": "wings-boneless-tenders",
    "product": "Tenders",
    "flavourSlug": "new-orleans-cajun",
    "fromPrice": 7.9,
    "sizes": [
      {
        "size": "Tenders 4pcs",
        "priceMK": 7.9,
        "priceNN": null
      },
      {
        "size": "Tenders 6pcs",
        "priceMK": null,
        "priceNN": null
      },
      {
        "size": "Tenders 8pcs",
        "priceMK": null,
        "priceNN": null
      }
    ],
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 1,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame",
      "sulphites"
    ]
  },
  {
    "slug": "tenders-caribbean-jerk",
    "name": "Caribbean Jerk Tenders",
    "sectionSlug": "wings-boneless-tenders",
    "product": "Tenders",
    "flavourSlug": "caribbean-jerk",
    "fromPrice": 7.9,
    "sizes": [
      {
        "size": "Tenders 4pcs",
        "priceMK": 7.9,
        "priceNN": null
      },
      {
        "size": "Tenders 6pcs",
        "priceMK": null,
        "priceNN": null
      },
      {
        "size": "Tenders 8pcs",
        "priceMK": null,
        "priceNN": null
      }
    ],
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 3,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "molluscs",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame",
      "sulphites"
    ]
  },
  {
    "slug": "tenders-garlic-parmesan",
    "name": "Garlic Parmesan Tenders",
    "sectionSlug": "wings-boneless-tenders",
    "product": "Tenders",
    "flavourSlug": "garlic-parmesan",
    "fromPrice": 7.9,
    "sizes": [
      {
        "size": "Tenders 4pcs",
        "priceMK": 7.9,
        "priceNN": null
      },
      {
        "size": "Tenders 6pcs",
        "priceMK": null,
        "priceNN": null
      },
      {
        "size": "Tenders 8pcs",
        "priceMK": null,
        "priceNN": null
      }
    ],
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 0,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame",
      "sulphites"
    ]
  },
  {
    "slug": "tenders-hot-honey",
    "name": "Hot Honey Tenders",
    "sectionSlug": "wings-boneless-tenders",
    "product": "Tenders",
    "flavourSlug": "hot-honey",
    "fromPrice": 7.9,
    "sizes": [
      {
        "size": "Tenders 4pcs",
        "priceMK": 7.9,
        "priceNN": null
      },
      {
        "size": "Tenders 6pcs",
        "priceMK": null,
        "priceNN": null
      },
      {
        "size": "Tenders 8pcs",
        "priceMK": null,
        "priceNN": null
      }
    ],
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 3,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame",
      "sulphites"
    ]
  },
  {
    "slug": "tenders-flamin-cajun",
    "name": "Flamin' Cajun Tenders",
    "sectionSlug": "wings-boneless-tenders",
    "product": "Tenders",
    "flavourSlug": "flamin-cajun",
    "fromPrice": 7.9,
    "sizes": [
      {
        "size": "Tenders 4pcs",
        "priceMK": 7.9,
        "priceNN": null
      },
      {
        "size": "Tenders 6pcs",
        "priceMK": null,
        "priceNN": null
      },
      {
        "size": "Tenders 8pcs",
        "priceMK": null,
        "priceNN": null
      }
    ],
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 3,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": true,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame",
      "sulphites"
    ]
  },
  {
    "slug": "tenders-mild-buffalo",
    "name": "Mild Buffalo Tenders",
    "sectionSlug": "wings-boneless-tenders",
    "product": "Tenders",
    "flavourSlug": "mild-buffalo",
    "fromPrice": 7.9,
    "sizes": [
      {
        "size": "Tenders 4pcs",
        "priceMK": 7.9,
        "priceNN": null
      },
      {
        "size": "Tenders 6pcs",
        "priceMK": null,
        "priceNN": null
      },
      {
        "size": "Tenders 8pcs",
        "priceMK": null,
        "priceNN": null
      }
    ],
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 1,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame",
      "sulphites"
    ]
  },
  {
    "slug": "hot-honey-chick",
    "name": "Hot Honey Chick",
    "sectionSlug": "chicken-burgers",
    "sectionName": "Chicken Burgers",
    "priceMK": 9.95,
    "priceNN": 9.95,
    "description": null,
    "spice": 3,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya",
      "sulphites"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame"
    ]
  },
  {
    "slug": "big-smoke-bbq",
    "name": "Big Smoke BBQ",
    "sectionSlug": "chicken-burgers",
    "sectionName": "Chicken Burgers",
    "priceMK": 9.95,
    "priceNN": 9.45,
    "description": null,
    "spice": 0,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya",
      "sulphites"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame"
    ]
  },
  {
    "slug": "california-chick",
    "name": "California Chick",
    "sectionSlug": "chicken-burgers",
    "sectionName": "Chicken Burgers",
    "priceMK": 9.95,
    "priceNN": 9.45,
    "description": null,
    "spice": 0,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya",
      "sulphites"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame"
    ]
  },
  {
    "slug": "buffalo-chick",
    "name": "Buffalo Chick",
    "sectionSlug": "chicken-burgers",
    "sectionName": "Chicken Burgers",
    "priceMK": 9.95,
    "priceNN": 9.45,
    "description": null,
    "spice": 2,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya",
      "sulphites"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame"
    ]
  },
  {
    "slug": "mango-chick",
    "name": "Mango Chick",
    "sectionSlug": "chicken-burgers",
    "sectionName": "Chicken Burgers",
    "priceMK": 9.95,
    "priceNN": 9.45,
    "description": null,
    "spice": 3,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya",
      "sulphites"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame"
    ]
  },
  {
    "slug": "cajun-chick",
    "name": "Cajun Chick",
    "sectionSlug": "chicken-burgers",
    "sectionName": "Chicken Burgers",
    "priceMK": 9.95,
    "priceNN": 9.45,
    "description": null,
    "spice": 1,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya",
      "sulphites"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame"
    ]
  },
  {
    "slug": "korean-sonic-chick",
    "name": "Korean Sonic Chick",
    "sectionSlug": "chicken-burgers",
    "sectionName": "Chicken Burgers",
    "priceMK": 9.95,
    "priceNN": 9.45,
    "description": null,
    "spice": 2,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya",
      "sulphites"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame"
    ]
  },
  {
    "slug": "comeback-chick",
    "name": "Comeback Chick",
    "sectionSlug": "chicken-burgers",
    "sectionName": "Chicken Burgers",
    "priceMK": 9.95,
    "priceNN": 9.45,
    "description": null,
    "spice": 0,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya",
      "sulphites"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame"
    ]
  },
  {
    "slug": "jerk-chick",
    "name": "Jerk Chick",
    "sectionSlug": "chicken-burgers",
    "sectionName": "Chicken Burgers",
    "priceMK": 9.95,
    "priceNN": 9.45,
    "description": null,
    "spice": 3,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": true,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya",
      "sulphites"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame"
    ]
  },
  {
    "slug": "flamin-cajun-chick",
    "name": "Flamin' Cajun Chick",
    "sectionSlug": "chicken-burgers",
    "sectionName": "Chicken Burgers",
    "priceMK": 9.95,
    "priceNN": 9.45,
    "description": null,
    "spice": 3,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": true,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya",
      "sulphites"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame"
    ]
  },
  {
    "slug": "garlic-palm-chick",
    "name": "Garlic Palm Chick",
    "sectionSlug": "chicken-burgers",
    "sectionName": "Chicken Burgers",
    "priceMK": 9.95,
    "priceNN": 9.45,
    "description": null,
    "spice": 0,
    "signature": true,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": true,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya",
      "sulphites"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame"
    ]
  },
  {
    "slug": "mozzarella-triangles",
    "name": "Mozzarella Triangles (V)",
    "sectionSlug": "sides",
    "sectionName": "Sides",
    "priceMK": 7.25,
    "priceNN": null,
    "description": "3x Hand cut, hand breaded Golden, gooey mozzarella bites served with sweet chilli jam \u2014 melty, crispy, and addictive",
    "spice": 0,
    "signature": false,
    "vegetarian": true,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "tree-nuts",
      "peanuts",
      "sesame",
      "soya"
    ],
    "traces": []
  },
  {
    "slug": "memphis-slaw",
    "name": "Memphis Slaw (V)",
    "sectionSlug": "sides",
    "sectionName": "Sides",
    "priceMK": 4.45,
    "priceNN": null,
    "description": "Shredded cabbage, hand-tossed in our signature slaw dressing \u2014 freshly made every day!",
    "spice": 0,
    "signature": false,
    "vegetarian": true,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "eggs",
      "milk",
      "mustard",
      "peanuts",
      "sesame",
      "soya"
    ],
    "traces": []
  },
  {
    "slug": "clucking-combo",
    "name": "Clucking Combo (no sauce)",
    "sectionSlug": "platters-combos",
    "sectionName": "Platters + Combos",
    "priceMK": 29.95,
    "priceNN": 29.95,
    "description": "Any 2 Chicken Burgers & any 2 Fries you choose the flavours",
    "spice": 0,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "tree-nuts",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "milk",
      "mustard",
      "sesame"
    ]
  },
  {
    "slug": "wing-win-combo",
    "name": "Wing Win Combo (no sauce)",
    "sectionSlug": "platters-combos",
    "sectionName": "Platters + Combos",
    "priceMK": 33.3,
    "priceNN": 33.3,
    "description": "10 Wings, 10 Boneless, Fries, Mac & Cheese",
    "spice": 0,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "tree-nuts",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "milk",
      "mustard",
      "sesame"
    ]
  },
  {
    "slug": "flying-solo",
    "name": "Flying Solo (no sauce)",
    "sectionSlug": "platters-combos",
    "sectionName": "Platters + Combos",
    "priceMK": null,
    "priceNN": 15.85,
    "description": "6 Wings, 3 Buttermilk Tenders & any Fries",
    "spice": 0,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "tree-nuts",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame"
    ]
  },
  {
    "slug": "riding-solo",
    "name": "Riding Solo (no sauce)",
    "sectionSlug": "platters-combos",
    "sectionName": "Platters + Combos",
    "priceMK": null,
    "priceNN": 15.85,
    "description": "6 Boneless, 3 Buttermilk Tenders & any Fries",
    "spice": 0,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "tree-nuts",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "milk",
      "mustard",
      "sesame"
    ]
  },
  {
    "slug": "matchday-platter",
    "name": "Matchday Platter (no sauce)",
    "sectionSlug": "platters-combos",
    "sectionName": "Platters + Combos",
    "priceMK": 110.0,
    "priceNN": 110.0,
    "description": "50 Wings, 50 Boneless, (10 flavours) + 3 Loaded Fries + 3 BIG Dips",
    "spice": 0,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "tree-nuts",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "milk",
      "mustard",
      "sesame"
    ]
  },
  {
    "slug": "winger-roulette",
    "name": "Winger Roulette (no sauce)",
    "sectionSlug": "platters-combos",
    "sectionName": "Platters + Combos",
    "priceMK": 33.3,
    "priceNN": null,
    "description": null,
    "spice": 0,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "tree-nuts",
      "peanuts",
      "soya"
    ],
    "traces": [
      "fish",
      "milk",
      "mustard",
      "sesame"
    ]
  },
  {
    "slug": "cheesy-fries-loaded",
    "name": "Cheesy Fries Loaded",
    "sectionSlug": "fries-loaded",
    "sectionName": "Fries + Loaded Fries",
    "priceMK": 5.45,
    "priceNN": 5.45,
    "description": "Skin On French fries covered with Wingers cheese sauce.",
    "spice": 0,
    "signature": false,
    "vegetarian": true,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "eggs",
      "milk",
      "tree-nuts",
      "peanuts",
      "sesame"
    ],
    "traces": [
      "fish",
      "mustard"
    ]
  },
  {
    "slug": "skin-on-fries",
    "name": "Skin On Fries (no sauce)",
    "sectionSlug": "fries-loaded",
    "sectionName": "Fries + Loaded Fries",
    "priceMK": 4.15,
    "priceNN": 3.95,
    "description": "Skin on French fries flipped in our House seasoning",
    "spice": 0,
    "signature": false,
    "vegetarian": true,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "eggs",
      "tree-nuts",
      "peanuts",
      "sesame"
    ],
    "traces": [
      "fish",
      "milk",
      "mustard"
    ]
  },
  {
    "slug": "cajun-fries",
    "name": "Cajun Fries",
    "sectionSlug": "fries-loaded",
    "sectionName": "Fries + Loaded Fries",
    "priceMK": 4.15,
    "priceNN": 3.95,
    "description": "Skin on French fries flipped in our famous Cajun seasoning.",
    "spice": 0,
    "signature": false,
    "vegetarian": true,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "eggs",
      "tree-nuts",
      "peanuts",
      "sesame"
    ],
    "traces": [
      "fish",
      "milk",
      "mustard"
    ]
  },
  {
    "slug": "korea-town-fries-loaded",
    "name": "Korea Town Fries Loaded",
    "sectionSlug": "fries-loaded",
    "sectionName": "Fries + Loaded Fries",
    "priceMK": 5.45,
    "priceNN": 5.45,
    "description": "Skin On French fries smothered with our signature Korea Town sauce.",
    "spice": 0,
    "signature": false,
    "vegetarian": true,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "eggs",
      "milk",
      "tree-nuts",
      "peanuts",
      "sesame"
    ],
    "traces": [
      "fish",
      "mustard"
    ]
  },
  {
    "slug": "buffalo-ranch-fries-loaded",
    "name": "Buffalo Ranch Fries Loaded",
    "sectionSlug": "fries-loaded",
    "sectionName": "Fries + Loaded Fries",
    "priceMK": 5.45,
    "priceNN": 5.45,
    "description": "Skin On French fries smothered with our signature Buffalo New York and creamy Ranch sauces.",
    "spice": 2,
    "signature": false,
    "vegetarian": true,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "tree-nuts",
      "peanuts",
      "sesame"
    ],
    "traces": [
      "fish",
      "mustard"
    ]
  },
  {
    "slug": "flavour-loaded-fries",
    "name": "Flavour Loaded Fries",
    "sectionSlug": "fries-loaded",
    "sectionName": "Fries + Loaded Fries",
    "priceMK": 5.45,
    "priceNN": 5.45,
    "description": "Skin On French Fries, Cheese Sauce, Spring onions + Fried onions + Jalapenos + Sriracha mayo",
    "spice": 0,
    "signature": false,
    "vegetarian": true,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "eggs",
      "milk",
      "tree-nuts",
      "peanuts",
      "sesame"
    ],
    "traces": [
      "gluten",
      "fish",
      "mustard"
    ]
  },
  {
    "slug": "bbq-fries-loaded",
    "name": "BBQ Fries Loaded",
    "sectionSlug": "fries-loaded",
    "sectionName": "Fries + Loaded Fries",
    "priceMK": 5.45,
    "priceNN": 5.45,
    "description": "Skin On French fries coated with our signature Tennessee BBQ sauce topped with spring and crispy onions",
    "spice": 0,
    "signature": false,
    "vegetarian": true,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "tree-nuts",
      "peanuts"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame"
    ]
  },
  {
    "slug": "fully-loaded-fries",
    "name": "Fully Loaded Fries",
    "sectionSlug": "fries-loaded",
    "sectionName": "Fries + Loaded Fries",
    "priceMK": 5.45,
    "priceNN": 5.45,
    "description": "Skin On French Fries, Cheese Sauce, Spring onions + Fried onions + Jalapenos + Sriracha mayo",
    "spice": 0,
    "signature": false,
    "vegetarian": true,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "molluscs",
      "tree-nuts",
      "peanuts"
    ],
    "traces": [
      "fish",
      "mustard",
      "sesame"
    ]
  },
  {
    "slug": "cajun-chicken-loaded-fries",
    "name": "Cajun Chicken Loaded Fries",
    "sectionSlug": "chicken-loaded-fries",
    "sectionName": "Chicken Loaded Fries",
    "priceMK": 9.45,
    "priceNN": 9.45,
    "description": "Juicy Cajun chicken tenders over crispy skin on fries, loaded with melted cheese, our duo of house sauces, and topped with crispy fried onions and fresh spring onions",
    "spice": 1,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [],
    "traces": []
  },
  {
    "slug": "honey-mustard-chicken-loaded-fries",
    "name": "Honey Mustard Chicken Loaded Fries",
    "sectionSlug": "chicken-loaded-fries",
    "sectionName": "Chicken Loaded Fries",
    "priceMK": 9.45,
    "priceNN": 9.45,
    "description": "Crispy buttermilk chicken chopped over skin on fries, loaded with melted cheese, house made Honey Mustard sauce and our duo of house sauces, and topped with crispy fried onions and fresh spring onions",
    "spice": 3,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [],
    "traces": []
  },
  {
    "slug": "lemon-pepper-chicken-loaded-fries",
    "name": "Lemon Pepper Chicken Loaded Fries",
    "sectionSlug": "chicken-loaded-fries",
    "sectionName": "Chicken Loaded Fries",
    "priceMK": 9.45,
    "priceNN": 9.45,
    "description": "Citrus Lemon Pepper chicken chopped over crispy skin on fries, loaded with melted cheese, and our duo of house sauces, and topped with crispy fried onions and fresh spring onions",
    "spice": 1,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [],
    "traces": []
  },
  {
    "slug": "mango-habanero-chicken-loaded-fries",
    "name": "Mango Habanero Chicken Loaded Fries",
    "sectionSlug": "chicken-loaded-fries",
    "sectionName": "Chicken Loaded Fries",
    "priceMK": 9.45,
    "priceNN": 9.45,
    "description": "Juicy Mango Habanero chicken chopped over crispy skin on fries, loaded with melted cheese, and our duo of house sauces, and topped with crispy fried onions and fresh spring onions",
    "spice": 3,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [],
    "traces": []
  },
  {
    "slug": "blue-cheese",
    "name": "Blue Cheese",
    "sectionSlug": "dips",
    "sectionName": "Dips",
    "priceMK": 1.25,
    "priceNN": null,
    "description": "Crumbled Blue Cheese whipped to dip",
    "spice": 0,
    "signature": false,
    "vegetarian": true,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "eggs",
      "milk",
      "peanuts",
      "sesame"
    ],
    "traces": []
  },
  {
    "slug": "ranch",
    "name": "Ranch",
    "sectionSlug": "dips",
    "sectionName": "Dips",
    "priceMK": 1.25,
    "priceNN": null,
    "description": "Thick house made fresh buttermilk Ranch",
    "spice": 0,
    "signature": false,
    "vegetarian": true,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "sesame"
    ],
    "traces": []
  },
  {
    "slug": "california-sauce-mayo",
    "name": "California Sauce / Mayo",
    "sectionSlug": "dips",
    "sectionName": "Dips",
    "priceMK": 1.25,
    "priceNN": null,
    "description": "Our California inspired classic burger sauce with a tang",
    "spice": 0,
    "signature": false,
    "vegetarian": true,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "eggs",
      "milk",
      "mustard",
      "tree-nuts",
      "peanuts",
      "sesame"
    ],
    "traces": [
      "gluten",
      "fish"
    ]
  },
  {
    "slug": "honey-mustard",
    "name": "Honey Mustard",
    "sectionSlug": "dips",
    "sectionName": "Dips",
    "priceMK": 1.25,
    "priceNN": null,
    "description": "Smokey Honey Mustard the 'Comeback' Sauce",
    "spice": 0,
    "signature": false,
    "vegetarian": true,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "mustard",
      "tree-nuts",
      "peanuts",
      "sesame"
    ],
    "traces": [
      "fish",
      "molluscs"
    ]
  },
  {
    "slug": "kinder-bueno-white-chocolate",
    "name": "Kinder Bueno / White Chocolate",
    "sectionSlug": "shakes",
    "sectionName": "Shakes",
    "priceMK": 5.95,
    "priceNN": null,
    "description": "White chocolate Bueno bars blended into a thick, creamy shake",
    "spice": 0,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "eggs",
      "fish",
      "milk",
      "tree-nuts",
      "peanuts",
      "sesame",
      "soya"
    ],
    "traces": []
  },
  {
    "slug": "chocolate-oreo",
    "name": "Chocolate Oreo",
    "sectionSlug": "shakes",
    "sectionName": "Shakes",
    "priceMK": 5.95,
    "priceNN": null,
    "description": "Thick, creamy chocolate sauce blended with crunchy Oreo cookies",
    "spice": 0,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "eggs",
      "fish",
      "milk",
      "tree-nuts",
      "peanuts",
      "sesame",
      "soya"
    ],
    "traces": []
  },
  {
    "slug": "banana",
    "name": "Banana",
    "sectionSlug": "shakes",
    "sectionName": "Shakes",
    "priceMK": 5.95,
    "priceNN": null,
    "description": "Thick creamy and bursting with Strawberry flavour",
    "spice": 0,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "eggs",
      "fish",
      "milk",
      "tree-nuts",
      "peanuts",
      "sesame",
      "soya"
    ],
    "traces": []
  },
  {
    "slug": "strawberry",
    "name": "Strawberry",
    "sectionSlug": "shakes",
    "sectionName": "Shakes",
    "priceMK": 5.95,
    "priceNN": null,
    "description": "Thick creamy and bursting with Strawberry flavour",
    "spice": 0,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "eggs",
      "fish",
      "milk",
      "tree-nuts",
      "peanuts",
      "sesame",
      "soya"
    ],
    "traces": []
  },
  {
    "slug": "lotus-biscoff",
    "name": "Lotus Biscoff",
    "sectionSlug": "shakes",
    "sectionName": "Shakes",
    "priceMK": 5.95,
    "priceNN": null,
    "description": "Creamy, caramelised Biscoff cookie blended into thick creamy shake",
    "spice": 0,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "eggs",
      "fish",
      "milk",
      "tree-nuts",
      "peanuts",
      "sesame",
      "soya"
    ],
    "traces": []
  },
  {
    "slug": "double-chocolate",
    "name": "Double Chocolate",
    "sectionSlug": "shakes",
    "sectionName": "Shakes",
    "priceMK": 5.95,
    "priceNN": null,
    "description": "Double hit of rich chocolate blended into thick creamy shake",
    "spice": 0,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "eggs",
      "fish",
      "milk",
      "tree-nuts",
      "peanuts",
      "sesame",
      "soya"
    ],
    "traces": []
  },
  {
    "slug": "limited-edition-cookies-n-cream",
    "name": "Limited Edition Cookies N Cream",
    "sectionSlug": "shakes",
    "sectionName": "Shakes",
    "priceMK": 5.95,
    "priceNN": null,
    "description": null,
    "spice": 0,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": true,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "eggs",
      "fish",
      "milk",
      "tree-nuts",
      "peanuts",
      "sesame",
      "soya"
    ],
    "traces": []
  },
  {
    "slug": "limited-edition",
    "name": "Limited Edition (Salted Caramel)",
    "sectionSlug": "shakes",
    "sectionName": "Shakes",
    "priceMK": 5.95,
    "priceNN": null,
    "description": "Large 16oz Salted Caramel shake with optional added whipped cream",
    "spice": 0,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": true,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "eggs",
      "fish",
      "milk",
      "tree-nuts",
      "peanuts",
      "sesame",
      "soya"
    ],
    "traces": []
  },
  {
    "slug": "churros",
    "name": "Churros (no sauce / crumb)",
    "sectionSlug": "churros",
    "sectionName": "Churros",
    "priceMK": null,
    "priceNN": null,
    "description": "Large fresh sweet cinnamon dusted churros with aa choice of sauce and topping",
    "spice": 0,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "gluten"
    ],
    "traces": [
      "tree-nuts",
      "peanuts",
      "sesame"
    ]
  },
  {
    "slug": "cookies-n-cream",
    "name": "Cookies N Cream",
    "sectionSlug": "churros",
    "sectionName": "Churros",
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 0,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "gluten",
      "eggs",
      "tree-nuts",
      "peanuts"
    ],
    "traces": [
      "sesame"
    ]
  },
  {
    "slug": "oreo-crumb",
    "name": "Oreo Crumb",
    "sectionSlug": "churros",
    "sectionName": "Churros",
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 0,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "gluten",
      "eggs",
      "tree-nuts",
      "peanuts"
    ],
    "traces": [
      "sesame"
    ]
  },
  {
    "slug": "lotus-biscoff-crumb",
    "name": "Lotus Biscoff / Crumb",
    "sectionSlug": "churros",
    "sectionName": "Churros",
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 0,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "gluten",
      "eggs",
      "tree-nuts",
      "peanuts"
    ],
    "traces": [
      "sesame"
    ]
  },
  {
    "slug": "chocolate-hazelnut",
    "name": "Chocolate Hazelnut",
    "sectionSlug": "churros",
    "sectionName": "Churros",
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 0,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "gluten",
      "eggs",
      "tree-nuts",
      "peanuts"
    ],
    "traces": [
      "sesame"
    ]
  },
  {
    "slug": "salted-caramel",
    "name": "Salted Caramel",
    "sectionSlug": "churros",
    "sectionName": "Churros",
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 0,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "gluten",
      "eggs",
      "tree-nuts",
      "peanuts"
    ],
    "traces": [
      "sesame"
    ]
  },
  {
    "slug": "double-og-smash-burger",
    "name": "Double OG Smash Burger",
    "sectionSlug": "beef-burgers",
    "sectionName": "Beef Burgers",
    "priceMK": null,
    "priceNN": 9.99,
    "description": "2x 3oz pressed Angus beef patty, double American cheese slices, lettuce, caramelised onions, pickles, California burger sauce, Comeback Sauce",
    "spice": 0,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": "MK",
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "milk",
      "mustard",
      "peanuts"
    ],
    "traces": [
      "sesame"
    ]
  },
  {
    "slug": "double-og-bacon-smash-burger",
    "name": "Double OG Bacon Smash Burger",
    "sectionSlug": "beef-burgers",
    "sectionName": "Beef Burgers",
    "priceMK": null,
    "priceNN": null,
    "description": "2x 3oz pressed Angus beef patty, 2x Rations Turkey bacon, double American cheese, lettuce, caramelised onions, pickles, California burger sauce, Comeback Sauce",
    "spice": 0,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": "MK",
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "milk",
      "mustard",
      "peanuts"
    ],
    "traces": [
      "sesame",
      "soya"
    ]
  },
  {
    "slug": "the-disciple",
    "name": "The Disciple",
    "sectionSlug": "beef-burgers",
    "sectionName": "Beef Burgers",
    "priceMK": null,
    "priceNN": 10.45,
    "description": "2x 3oz pressed Angus beef patty, double American cheese, mozzarella & gouda cheese, caramelised onions, pickles, Mango Habanero relish, DISCIPLE sauce",
    "spice": 0,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": "MK",
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "milk",
      "mustard",
      "peanuts"
    ],
    "traces": [
      "sesame"
    ]
  },
  {
    "slug": "triple-og-smash-burger",
    "name": "Triple OG Smash Burger",
    "sectionSlug": "beef-burgers",
    "sectionName": "Beef Burgers",
    "priceMK": null,
    "priceNN": 12.25,
    "description": "3x 3oz pressed Angus beef patty, double American cheese, lettuce, caramelised onions, pickles, California burger sauce, Comeback Sauce",
    "spice": 0,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": "MK",
    "photo": null,
    "contains": [],
    "traces": []
  },
  {
    "slug": "triple-og-bacon-smash-burger",
    "name": "Triple OG Bacon Smash Burger",
    "sectionSlug": "beef-burgers",
    "sectionName": "Beef Burgers",
    "priceMK": null,
    "priceNN": null,
    "description": "3x 3oz pressed Angus beef patty, 2x Rations Turkey bacon, double American cheese, lettuce, caramelised onions, pickles, California burger sauce, Comeback Sauce",
    "spice": 0,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": "MK",
    "photo": null,
    "contains": [],
    "traces": []
  },
  {
    "slug": "beef-loaded-fries",
    "name": "Beef Loaded Fries",
    "sectionSlug": "beef-burgers",
    "sectionName": "Beef Burgers",
    "priceMK": null,
    "priceNN": 8.45,
    "description": null,
    "spice": 0,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": "MK",
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "milk",
      "mustard",
      "peanuts"
    ],
    "traces": [
      "sesame"
    ]
  },
  {
    "slug": "new-dawn",
    "name": "New Dawn",
    "sectionSlug": "beef-burgers",
    "sectionName": "Beef Burgers",
    "priceMK": null,
    "priceNN": null,
    "description": null,
    "spice": 0,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": "MK",
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "milk",
      "mustard",
      "tree-nuts",
      "peanuts"
    ],
    "traces": [
      "sesame"
    ]
  },
  {
    "slug": "kids-chicken-bites-meal",
    "name": "Kids Chicken Bites Meal",
    "sectionSlug": "kids",
    "sectionName": "Kids",
    "priceMK": 5.95,
    "priceNN": 5.45,
    "description": "2 Buttermilk fresh fried chicken boneless bites with a side and drink",
    "spice": 0,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "fish",
      "milk",
      "molluscs",
      "peanuts",
      "soya",
      "sulphites"
    ],
    "traces": [
      "mustard",
      "sesame"
    ]
  },
  {
    "slug": "kids-chicken-wing-meal",
    "name": "Kids Chicken Wing Meal",
    "sectionSlug": "kids",
    "sectionName": "Kids",
    "priceMK": 5.95,
    "priceNN": 5.45,
    "description": "2 Buttermilk fresh fried bone in chicken wings with a side and drink",
    "spice": 0,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "fish",
      "milk",
      "molluscs",
      "peanuts",
      "soya",
      "sulphites"
    ],
    "traces": [
      "mustard",
      "sesame"
    ]
  },
  {
    "slug": "kids-mozzarella-meal",
    "name": "Kids Mozzarella (V) Meal",
    "sectionSlug": "kids",
    "sectionName": "Kids",
    "priceMK": 5.95,
    "priceNN": 5.45,
    "description": null,
    "spice": 0,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "milk",
      "peanuts"
    ],
    "traces": [
      "mustard",
      "sesame"
    ]
  },
  {
    "slug": "cherry-cooler",
    "name": "Cherry Cooler",
    "sectionSlug": "coolers",
    "sectionName": "Coolers",
    "priceMK": 5.95,
    "priceNN": 4.95,
    "description": "Bold cherry twist on the mojito, lightened up with lemonade for a fruity cooler. Alcohol-Free.",
    "spice": 0,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "peanuts"
    ],
    "traces": [
      "celery",
      "eggs",
      "mustard",
      "tree-nuts",
      "sesame"
    ]
  },
  {
    "slug": "bramble-cooler",
    "name": "Bramble Cooler",
    "sectionSlug": "coolers",
    "sectionName": "Coolers",
    "priceMK": 5.95,
    "priceNN": 4.95,
    "description": null,
    "spice": 0,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "peanuts"
    ],
    "traces": [
      "celery",
      "eggs",
      "mustard",
      "tree-nuts",
      "sesame"
    ]
  },
  {
    "slug": "iced-original-cooler",
    "name": "Iced Original Cooler",
    "sectionSlug": "coolers",
    "sectionName": "Coolers",
    "priceMK": 5.95,
    "priceNN": 4.95,
    "description": "Our chilled original house flavours mixed with light vanilla notes mixed with ice. Alcohol-Free.",
    "spice": 0,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "peanuts"
    ],
    "traces": [
      "celery",
      "eggs",
      "mustard",
      "tree-nuts",
      "sesame"
    ]
  },
  {
    "slug": "lime-ginger-cooler",
    "name": "Lime + Ginger Cooler",
    "sectionSlug": "coolers",
    "sectionName": "Coolers",
    "priceMK": 5.95,
    "priceNN": 4.95,
    "description": "A bright and refreshing burst of zesty lime, softened by sweet vanilla and finished with a delicate hint of warm ginger",
    "spice": 0,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "peanuts"
    ],
    "traces": [
      "celery",
      "eggs",
      "mustard",
      "tree-nuts",
      "sesame"
    ]
  },
  {
    "slug": "watermelon-crush-cooler",
    "name": "Watermelon Crush Cooler",
    "sectionSlug": "coolers",
    "sectionName": "Coolers",
    "priceMK": 5.95,
    "priceNN": 4.95,
    "description": "A vibrant blend of watermelon, lemon, and spice, delivering deep refreshing twist. Alcohol-Free.",
    "spice": 0,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "peanuts"
    ],
    "traces": [
      "celery",
      "eggs",
      "mustard",
      "tree-nuts",
      "sesame"
    ]
  },
  {
    "slug": "strawberry-cooler",
    "name": "Strawberry Cooler",
    "sectionSlug": "coolers",
    "sectionName": "Coolers",
    "priceMK": 5.95,
    "priceNN": 4.95,
    "description": "Sweet strawberries, fresh lime, and fresh mint come together in this juicy, refreshing cooler. Alcohol-Free.",
    "spice": 0,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "peanuts"
    ],
    "traces": [
      "celery",
      "eggs",
      "mustard",
      "tree-nuts",
      "sesame"
    ]
  },
  {
    "slug": "token-burger",
    "name": "Token (Mozzarella) Burger (V)",
    "sectionSlug": "sides",
    "sectionName": "Sides",
    "priceMK": 8.25,
    "priceNN": 8.25,
    "description": "Crispy hand cut breaded and fried mozzarella stacked with fresh lettuce, house mayo, smooth American cheese, creamy Memphi slaw, house sauce, and crunchy pickles all packed into a toasted brioche bun",
    "spice": 0,
    "signature": false,
    "vegetarian": true,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "tree-nuts",
      "soya"
    ],
    "traces": [
      "mustard",
      "peanuts",
      "sesame",
      "sulphites"
    ]
  },
  {
    "slug": "mac-and-cheese",
    "name": "Mac & Cheese (V)",
    "sectionSlug": "mac-and-cheese",
    "sectionName": "Mac & Cheese",
    "priceMK": 5.95,
    "priceNN": 5.95,
    "description": "Our fresh house seasoned Mac & Cheese is creamy, real cheesy, and full of flavour \u2014 topped with crispy fried + spring onions. Comfort food at its best!",
    "spice": 1,
    "signature": false,
    "vegetarian": true,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "milk",
      "mustard",
      "soya"
    ],
    "traces": [
      "eggs",
      "tree-nuts",
      "peanuts",
      "sesame"
    ]
  },
  {
    "slug": "cajun-chicken-mac-and-cheese",
    "name": "Cajun Chicken Mac & Cheese",
    "sectionSlug": "mac-and-cheese",
    "sectionName": "Mac & Cheese",
    "priceMK": 9.45,
    "priceNN": 9.45,
    "description": "Our fresh creamy, cheesy house mac loaded with flavour. Topped with crispy + spring onions, chopped Cajun tenders, pickles, and finished with house sauce duo",
    "spice": 1,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "mustard",
      "soya",
      "sulphites"
    ],
    "traces": [
      "tree-nuts",
      "peanuts",
      "sesame"
    ]
  },
  {
    "slug": "korean-chicken-mac-and-cheese",
    "name": "Korean Chicken Mac & Cheese",
    "sectionSlug": "mac-and-cheese",
    "sectionName": "Mac & Cheese",
    "priceMK": 9.45,
    "priceNN": 9.45,
    "description": "Our fresh creamy, cheesy house mac loaded with flavour. Topped with crispy fried onions, chopped Korean chicken, pickles, and finished with duo sauces",
    "spice": 2,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "mustard",
      "soya",
      "sulphites"
    ],
    "traces": [
      "tree-nuts",
      "peanuts",
      "sesame"
    ]
  },
  {
    "slug": "hot-honey-chicken-mac-and-cheese",
    "name": "Hot Honey Chicken Mac & Cheese",
    "sectionSlug": "mac-and-cheese",
    "sectionName": "Mac & Cheese",
    "priceMK": 9.45,
    "priceNN": 9.45,
    "description": "Our fresh creamy, cheesy house mac loaded with flavour. Topped with spring + crispy fried onions, Hot Honey tenders, pickles, and finished with house sauces",
    "spice": 1,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "mustard",
      "soya",
      "sulphites"
    ],
    "traces": [
      "tree-nuts",
      "peanuts",
      "sesame"
    ]
  },
  {
    "slug": "garlic-parmesan-chicken-mac-and-cheese",
    "name": "Garlic Parmesan Chicken Mac & Cheese",
    "sectionSlug": "mac-and-cheese",
    "sectionName": "Mac & Cheese",
    "priceMK": 9.45,
    "priceNN": 9.45,
    "description": "Our fresh creamy, cheesy house mac loaded with flavour. Topped with crispy fried onions, chopped garlic parmesan chicken, pickles, and finished with Parmesan cheese",
    "spice": 1,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "mustard",
      "soya",
      "sulphites"
    ],
    "traces": [
      "tree-nuts",
      "peanuts",
      "sesame"
    ]
  },
  {
    "slug": "buffalo-chicken-mac-and-cheese",
    "name": "Buffalo Chicken Mac & Cheese",
    "sectionSlug": "mac-and-cheese",
    "sectionName": "Mac & Cheese",
    "priceMK": 9.45,
    "priceNN": 9.45,
    "description": "Our fresh creamy, cheesy house mac loaded with flavour. Topped with spring + crispy fried onions, Buffalo NY tenders, pickles, and finished with house sauces",
    "spice": 2,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "mustard",
      "soya",
      "sulphites"
    ],
    "traces": [
      "tree-nuts",
      "peanuts",
      "sesame"
    ]
  },
  {
    "slug": "mango-habanero-chicken-mac-and-cheese",
    "name": "Mango Habanero Chicken Mac & Cheese",
    "sectionSlug": "mac-and-cheese",
    "sectionName": "Mac & Cheese",
    "priceMK": 9.45,
    "priceNN": 9.45,
    "description": "Our fresh creamy, cheesy house mac loaded with flavour. Topped with spring + crispy fried onions, Mango Habanero chicken, pickles, and finished with house sauces",
    "spice": 1,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "mustard",
      "soya",
      "sulphites"
    ],
    "traces": [
      "tree-nuts",
      "peanuts",
      "sesame"
    ]
  },
  {
    "slug": "white-chocolate-kinder-bueno",
    "name": "White Chocolate Kinder Bueno",
    "sectionSlug": "nyc-cookies",
    "sectionName": "NYC Cookies",
    "priceMK": 4.95,
    "priceNN": 4.95,
    "description": "White Choc Kinder Cookie",
    "spice": 0,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "tree-nuts",
      "peanuts",
      "soya"
    ],
    "traces": [
      "sesame"
    ]
  },
  {
    "slug": "reeses-peanut-buttercup",
    "name": "Reeses Peanut Buttercup",
    "sectionSlug": "nyc-cookies",
    "sectionName": "NYC Cookies",
    "priceMK": 4.95,
    "priceNN": 4.95,
    "description": "5oz Crunchy Reese's peanut buttercup cookie dough loaded with milk chocolate pieces.",
    "spice": 0,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "tree-nuts",
      "peanuts",
      "soya"
    ],
    "traces": [
      "sesame"
    ]
  },
  {
    "slug": "double-chocolate-2",
    "name": "Double Chocolate",
    "sectionSlug": "nyc-cookies",
    "sectionName": "NYC Cookies",
    "priceMK": 4.95,
    "priceNN": 4.95,
    "description": "5oz Double chocolate cookie dough loaded with milk chocolate pieces and milk chocolate center",
    "spice": 0,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "tree-nuts",
      "peanuts",
      "soya"
    ],
    "traces": [
      "sesame"
    ]
  },
  {
    "slug": "red-velvet",
    "name": "Red Velvet",
    "sectionSlug": "nyc-cookies",
    "sectionName": "NYC Cookies",
    "priceMK": 4.95,
    "priceNN": 4.95,
    "description": "5oz Red velvet and vanilla cookie dough, with gooey white kinder centre",
    "spice": 0,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "tree-nuts",
      "peanuts",
      "soya"
    ],
    "traces": [
      "sesame"
    ]
  },
  {
    "slug": "og-chocolate-chip",
    "name": "OG Chocolate Chip",
    "sectionSlug": "nyc-cookies",
    "sectionName": "NYC Cookies",
    "priceMK": 4.95,
    "priceNN": 4.95,
    "description": "5oz OG New York chocolate chip cookie, with smooth milk chocolate center",
    "spice": 0,
    "signature": false,
    "vegetarian": false,
    "halal": true,
    "limitedEdition": false,
    "availableUntil": null,
    "unavailableAt": null,
    "photo": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "tree-nuts",
      "peanuts",
      "soya"
    ],
    "traces": [
      "sesame"
    ]
  }
];

export const FLAVOUR_SHOWCASE: FlavourShowcaseItem[] = [
  {
    "slug": "tennessee-bbq",
    "name": "Tennessee BBQ",
    "spice": 0,
    "limitedEdition": false,
    "description": null,
    "contains": [
      "celery",
      "gluten",
      "mustard",
      "peanuts"
    ],
    "traces": [
      "sesame"
    ]
  },
  {
    "slug": "mango-habanero",
    "name": "Mango Habanero",
    "spice": 3,
    "limitedEdition": false,
    "description": null,
    "contains": [
      "celery",
      "tree-nuts",
      "peanuts",
      "sesame"
    ],
    "traces": [
      "mustard"
    ]
  },
  {
    "slug": "korea-town",
    "name": "Korea Town",
    "spice": 2,
    "limitedEdition": false,
    "description": null,
    "contains": [
      "celery",
      "gluten",
      "tree-nuts",
      "peanuts",
      "sesame"
    ],
    "traces": [
      "mustard"
    ]
  },
  {
    "slug": "new-orleans-cajun",
    "name": "New Orleans Cajun",
    "spice": 1,
    "limitedEdition": false,
    "description": null,
    "contains": [
      "celery",
      "milk",
      "molluscs",
      "mustard",
      "tree-nuts",
      "peanuts",
      "sesame"
    ],
    "traces": []
  },
  {
    "slug": "lemon-pepper",
    "name": "Lemon Pepper",
    "spice": 1,
    "limitedEdition": false,
    "description": null,
    "contains": [
      "celery",
      "peanuts",
      "sesame"
    ],
    "traces": [
      "tree-nuts"
    ]
  },
  {
    "slug": "ghost-buffalo-hot",
    "name": "Ghost Buffalo HOT",
    "spice": 5,
    "limitedEdition": false,
    "description": null,
    "contains": [
      "celery",
      "milk",
      "tree-nuts",
      "peanuts",
      "sesame"
    ],
    "traces": [
      "mustard"
    ]
  },
  {
    "slug": "buffalo-new-york",
    "name": "Buffalo New York",
    "spice": 2,
    "limitedEdition": false,
    "description": null,
    "contains": [
      "celery",
      "milk",
      "tree-nuts",
      "peanuts",
      "sesame"
    ],
    "traces": [
      "mustard"
    ]
  },
  {
    "slug": "jerk-sauce",
    "name": "Jerk Sauce",
    "spice": 3,
    "limitedEdition": true,
    "description": null,
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "molluscs",
      "mustard",
      "tree-nuts",
      "peanuts",
      "sesame"
    ],
    "traces": [
      "fish"
    ]
  },
  {
    "slug": "flamin-cajun",
    "name": "Flamin' Cajun",
    "spice": 3,
    "limitedEdition": true,
    "description": null,
    "contains": [
      "celery",
      "eggs",
      "milk",
      "mustard",
      "tree-nuts",
      "peanuts",
      "sesame"
    ],
    "traces": []
  },
  {
    "slug": "garlic-parmesan",
    "name": "Garlic Parmesan",
    "spice": 0,
    "limitedEdition": false,
    "description": null,
    "contains": [
      "celery",
      "eggs",
      "milk",
      "mustard",
      "tree-nuts",
      "peanuts",
      "sesame"
    ],
    "traces": []
  }
];

// A limited-edition item is 'current' if it has no end date, or the end date is today/future.
export function isCurrentLE(item: { limitedEdition: boolean; availableUntil: string | null }): boolean {
  if (!item.limitedEdition) return true;
  if (!item.availableUntil) return true;
  return new Date(item.availableUntil) >= new Date(new Date().toDateString());
}
