export interface MenuItem {
  slug: string;
  lastUpdated: string;
  name: string;
  description: string;
  priceGbp: number;
  allergens: string[];
  calories?: number;
  spiceLevel?: 0 | 1 | 2 | 3;
  isVegan?: boolean;
  isVegetarian?: boolean;
  isHalal?: boolean;
  available: boolean;
}

export interface MenuCategory {
  slug: string;
  lastUpdated: string;
  name: string;
  description?: string;
  items: MenuItem[];
}
