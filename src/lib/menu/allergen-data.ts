// AUTO-GENERATED from Wingers-Allergen-Matrix-CORRECTED.xlsx — do not hand-edit.
// Regenerate from the spreadsheet if the menu changes. Source of truth = the .xlsx.

export const UK_ALLERGENS = [
  "celery","gluten","crustaceans","eggs","fish","lupin","milk",
  "molluscs","mustard","tree-nuts","peanuts","sesame","soya","sulphites",
] as const;

export type Allergen = (typeof UK_ALLERGENS)[number];

export interface AllergenItem {
  slug: string;
  name: string;
  section: string;
  sectionSlug: string;
  contains: Allergen[];
  traces: Allergen[];
}

export const ALLERGEN_ITEMS: AllergenItem[] = [
  {
    "slug": "mango-habanero",
    "name": "Mango Habanero",
    "section": "Wings + Tenders",
    "sectionSlug": "wings-tenders",
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
    "slug": "korea-town",
    "name": "Korea Town",
    "section": "Wings + Tenders",
    "sectionSlug": "wings-tenders",
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
    "slug": "tennessee-bbq",
    "name": "Tennessee BBQ",
    "section": "Wings + Tenders",
    "sectionSlug": "wings-tenders",
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
    "slug": "lemon-pepper",
    "name": "Lemon Pepper",
    "section": "Wings + Tenders",
    "sectionSlug": "wings-tenders",
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
    "slug": "buffalo-xl-hot",
    "name": "Buffalo XL Hot",
    "section": "Wings + Tenders",
    "sectionSlug": "wings-tenders",
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
    "slug": "buffalo-new-york",
    "name": "Buffalo New York",
    "section": "Wings + Tenders",
    "sectionSlug": "wings-tenders",
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
    "slug": "naked-wings",
    "name": "Naked Wings (no sauce)",
    "section": "Wings + Tenders",
    "sectionSlug": "wings-tenders",
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
    "slug": "new-orleans-cajun",
    "name": "New Orleans Cajun",
    "section": "Wings + Tenders",
    "sectionSlug": "wings-tenders",
    "contains": [
      "celery",
      "gluten",
      "eggs",
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
    "slug": "caribbean-jerk",
    "name": "Caribbean Jerk",
    "section": "Wings + Tenders",
    "sectionSlug": "wings-tenders",
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
    "slug": "garlic-parmesan",
    "name": "Garlic Parmesan",
    "section": "Wings + Tenders",
    "sectionSlug": "wings-tenders",
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
    "slug": "hot-honey",
    "name": "Hot Honey",
    "section": "Wings + Tenders",
    "sectionSlug": "wings-tenders",
    "contains": [
      "celery",
      "gluten",
      "eggs",
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
    "slug": "flamin-cajun",
    "name": "Flamin' Cajun (Limited Edition)",
    "section": "Wings + Tenders",
    "sectionSlug": "wings-tenders",
    "contains": [
      "celery",
      "gluten",
      "eggs",
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
    "slug": "mild-buffalo",
    "name": "Mild Buffalo",
    "section": "Wings + Tenders",
    "sectionSlug": "wings-tenders",
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
    "section": "Chicken Burgers",
    "sectionSlug": "chicken-burgers",
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
    "section": "Chicken Burgers",
    "sectionSlug": "chicken-burgers",
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
    "section": "Chicken Burgers",
    "sectionSlug": "chicken-burgers",
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
    "section": "Chicken Burgers",
    "sectionSlug": "chicken-burgers",
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
    "section": "Chicken Burgers",
    "sectionSlug": "chicken-burgers",
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
    "section": "Chicken Burgers",
    "sectionSlug": "chicken-burgers",
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
    "section": "Chicken Burgers",
    "sectionSlug": "chicken-burgers",
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
    "section": "Chicken Burgers",
    "sectionSlug": "chicken-burgers",
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
    "name": "Jerk Chick (Limited Edition)",
    "section": "Chicken Burgers",
    "sectionSlug": "chicken-burgers",
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
    "name": "Garlic Palm Chick (Limited Edition)",
    "section": "Chicken Burgers",
    "sectionSlug": "chicken-burgers",
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
    "slug": "mac-and-cheese",
    "name": "Mac & Cheese (V)",
    "section": "Sides",
    "sectionSlug": "sides",
    "contains": [
      "celery",
      "gluten",
      "milk",
      "mustard",
      "peanuts",
      "soya"
    ],
    "traces": [
      "eggs",
      "tree-nuts",
      "sesame"
    ]
  },
  {
    "slug": "mozzarella-triangles",
    "name": "Mozzarella Triangles (V)",
    "section": "Sides",
    "sectionSlug": "sides",
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
    "section": "Sides",
    "sectionSlug": "sides",
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
    "slug": "halloumi-triangles",
    "name": "Halloumi Triangles (V)",
    "section": "Sides",
    "sectionSlug": "sides",
    "contains": [
      "celery",
      "gluten",
      "eggs",
      "milk",
      "peanuts",
      "soya"
    ],
    "traces": [
      "mustard",
      "tree-nuts",
      "sesame"
    ]
  },
  {
    "slug": "tenders-family-combo",
    "name": "Tenders Family Combo (no sauce)",
    "section": "Platters + Combos",
    "sectionSlug": "platters-combos",
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
    "slug": "wing-family-combo",
    "name": "Wing Family Combo (no sauce)",
    "section": "Platters + Combos",
    "sectionSlug": "platters-combos",
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
    "slug": "dry-rub-platter",
    "name": "Dry Rub Platter (no sauce)",
    "section": "Platters + Combos",
    "sectionSlug": "platters-combos",
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
    "slug": "heatseeker-wing-platter",
    "name": "Heatseeker Wing Platter (no sauce)",
    "section": "Platters + Combos",
    "sectionSlug": "platters-combos",
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
    "slug": "heatseeker-tender-platter",
    "name": "Heatseeker Tender Platter (no sauce)",
    "section": "Platters + Combos",
    "sectionSlug": "platters-combos",
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
    "section": "Platters + Combos",
    "sectionSlug": "platters-combos",
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
    "section": "Fries + Loaded",
    "sectionSlug": "fries-loaded",
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
    "slug": "house-fries",
    "name": "House Fries (no sauce)",
    "section": "Fries + Loaded",
    "sectionSlug": "fries-loaded",
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
    "section": "Fries + Loaded",
    "sectionSlug": "fries-loaded",
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
    "section": "Fries + Loaded",
    "sectionSlug": "fries-loaded",
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
    "section": "Fries + Loaded",
    "sectionSlug": "fries-loaded",
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
    "section": "Fries + Loaded",
    "sectionSlug": "fries-loaded",
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
    "section": "Fries + Loaded",
    "sectionSlug": "fries-loaded",
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
    "section": "Fries + Loaded",
    "sectionSlug": "fries-loaded",
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
    "slug": "tennessee-bbq-2",
    "name": "Tennessee BBQ",
    "section": "Sauces / Dips",
    "sectionSlug": "sauces-dips",
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
    "slug": "blue-cheese",
    "name": "Blue Cheese",
    "section": "Sauces / Dips",
    "sectionSlug": "sauces-dips",
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
    "section": "Sauces / Dips",
    "sectionSlug": "sauces-dips",
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
    "slug": "mango-habanero-2",
    "name": "Mango Habanero",
    "section": "Sauces / Dips",
    "sectionSlug": "sauces-dips",
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
    "slug": "korea-town-2",
    "name": "Korea Town",
    "section": "Sauces / Dips",
    "sectionSlug": "sauces-dips",
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
    "slug": "new-orleans-cajun-2",
    "name": "New Orleans Cajun",
    "section": "Sauces / Dips",
    "sectionSlug": "sauces-dips",
    "contains": [
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
    "slug": "lemon-pepper-2",
    "name": "Lemon Pepper",
    "section": "Sauces / Dips",
    "sectionSlug": "sauces-dips",
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
    "slug": "buffalo-xl-hot-2",
    "name": "Buffalo XL Hot",
    "section": "Sauces / Dips",
    "sectionSlug": "sauces-dips",
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
    "slug": "buffalo-new-york-2",
    "name": "Buffalo New York",
    "section": "Sauces / Dips",
    "sectionSlug": "sauces-dips",
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
    "name": "Jerk Sauce (Limited Edition)",
    "section": "Sauces / Dips",
    "sectionSlug": "sauces-dips",
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
    "slug": "california-sauce-mayo",
    "name": "California Sauce / Mayo",
    "section": "Sauces / Dips",
    "sectionSlug": "sauces-dips",
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
    "slug": "honey-mustard",
    "name": "Honey Mustard",
    "section": "Sauces / Dips",
    "sectionSlug": "sauces-dips",
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
    "traces": []
  },
  {
    "slug": "kinder-bueno-white-chocolate",
    "name": "Kinder Bueno / White Chocolate",
    "section": "Shakes",
    "sectionSlug": "shakes",
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
    "section": "Shakes",
    "sectionSlug": "shakes",
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
    "section": "Shakes",
    "sectionSlug": "shakes",
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
    "section": "Shakes",
    "sectionSlug": "shakes",
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
    "section": "Shakes",
    "sectionSlug": "shakes",
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
    "section": "Shakes",
    "sectionSlug": "shakes",
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
    "section": "Shakes",
    "sectionSlug": "shakes",
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
    "section": "Shakes",
    "sectionSlug": "shakes",
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
    "section": "Churros",
    "sectionSlug": "churros",
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
    "section": "Churros",
    "sectionSlug": "churros",
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
    "section": "Churros",
    "sectionSlug": "churros",
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
    "section": "Churros",
    "sectionSlug": "churros",
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
    "section": "Churros",
    "sectionSlug": "churros",
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
    "section": "Churros",
    "sectionSlug": "churros",
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
    "slug": "og-cheese-burger",
    "name": "OG Cheese Burger",
    "section": "Beef Burgers / Beef Fries",
    "sectionSlug": "beef-burgers-beef-fries",
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
    "slug": "og-cheese-bacon-burger",
    "name": "OG Cheese Bacon Burger",
    "section": "Beef Burgers / Beef Fries",
    "sectionSlug": "beef-burgers-beef-fries",
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
    "section": "Beef Burgers / Beef Fries",
    "sectionSlug": "beef-burgers-beef-fries",
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
    "slug": "beef-loaded-fries",
    "name": "Beef Loaded Fries",
    "section": "Beef Burgers / Beef Fries",
    "sectionSlug": "beef-burgers-beef-fries",
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
    "section": "Beef Burgers / Beef Fries",
    "sectionSlug": "beef-burgers-beef-fries",
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
    "section": "Little Wings / Kids Meals",
    "sectionSlug": "little-wings-kids-meals",
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
    "section": "Little Wings / Kids Meals",
    "sectionSlug": "little-wings-kids-meals",
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
    "section": "Little Wings / Kids Meals",
    "sectionSlug": "little-wings-kids-meals",
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
    "section": "Mojito Coolers",
    "sectionSlug": "mojito-coolers",
    "contains": [
      "celery",
      "peanuts"
    ],
    "traces": [
      "eggs",
      "tree-nuts",
      "sesame"
    ]
  },
  {
    "slug": "bramble-cooler",
    "name": "Bramble Cooler",
    "section": "Mojito Coolers",
    "sectionSlug": "mojito-coolers",
    "contains": [
      "celery",
      "peanuts"
    ],
    "traces": [
      "eggs",
      "tree-nuts",
      "sesame"
    ]
  },
  {
    "slug": "iced-original-cooler",
    "name": "Iced Original Cooler",
    "section": "Mojito Coolers",
    "sectionSlug": "mojito-coolers",
    "contains": [
      "celery",
      "peanuts"
    ],
    "traces": [
      "eggs",
      "tree-nuts",
      "sesame"
    ]
  },
  {
    "slug": "lime-ginger-cooler",
    "name": "Lime + Ginger Cooler",
    "section": "Mojito Coolers",
    "sectionSlug": "mojito-coolers",
    "contains": [
      "celery",
      "peanuts"
    ],
    "traces": [
      "eggs",
      "tree-nuts",
      "sesame"
    ]
  },
  {
    "slug": "watermelon-crush-cooler",
    "name": "Watermelon Crush Cooler",
    "section": "Mojito Coolers",
    "sectionSlug": "mojito-coolers",
    "contains": [
      "celery",
      "peanuts"
    ],
    "traces": [
      "eggs",
      "tree-nuts",
      "sesame"
    ]
  },
  {
    "slug": "strawberry-cooler",
    "name": "Strawberry Cooler",
    "section": "Mojito Coolers",
    "sectionSlug": "mojito-coolers",
    "contains": [
      "celery",
      "peanuts"
    ],
    "traces": [
      "eggs",
      "tree-nuts",
      "sesame"
    ]
  },
  {
    "slug": "halloumi-burger",
    "name": "Halloumi Burger (V)",
    "section": "Burger (V) Vegetarian",
    "sectionSlug": "burger-vegetarian",
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
      "mustard",
      "sesame",
      "sulphites"
    ]
  },
  {
    "slug": "token-burger",
    "name": "Token Burger (V)",
    "section": "Burger (V) Vegetarian",
    "sectionSlug": "burger-vegetarian",
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
    "slug": "mac-and-cheese-2",
    "name": "Mac & Cheese (V)",
    "section": "Mac & Cheese",
    "sectionSlug": "mac-cheese",
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
    "section": "Mac & Cheese",
    "sectionSlug": "mac-cheese",
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
    "section": "Mac & Cheese",
    "sectionSlug": "mac-cheese",
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
    "section": "Mac & Cheese",
    "sectionSlug": "mac-cheese",
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
    "section": "Mac & Cheese",
    "sectionSlug": "mac-cheese",
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
    "section": "Mac & Cheese",
    "sectionSlug": "mac-cheese",
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
    "section": "Mac & Cheese",
    "sectionSlug": "mac-cheese",
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
    "slug": "kinder-bueno",
    "name": "Kinder Bueno",
    "section": "NYC Cookies",
    "sectionSlug": "nyc-cookies",
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
    "section": "NYC Cookies",
    "sectionSlug": "nyc-cookies",
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
    "section": "NYC Cookies",
    "sectionSlug": "nyc-cookies",
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
    "section": "NYC Cookies",
    "sectionSlug": "nyc-cookies",
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
    "section": "NYC Cookies",
    "sectionSlug": "nyc-cookies",
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
