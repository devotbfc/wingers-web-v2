// Mock catalogue built from the site's real menu + flavour data.
//
// Replaces the ported wing-app seed catalogue. One PPH menu item per
// MENU_ITEMS entry; prices resolved to the active location (MK or NN) with
// a cross-location fallback so sized items that only carry one shop's price
// still render. Sauces come from SPINNABLE_FLAVOURS (core + active) and dips
// from DIPS. Modifiers are omitted — the real menu doesn't carry them.
//
// IDs are deterministic strings prefixed `ckitm_` / `cksau_` / `ckdip_`. The
// wire schema only requires `cuidSchema = z.string().min(1)`, so these pass
// validation on the HTTP boundary too, which is useful when a developer
// points NEXT_PUBLIC_PPH_URL at a mock-forwarded server.

import {
  MENU_ITEMS,
  MENU_SECTIONS,
  type MenuItem as SiteMenuItem,
} from "@/lib/menu/menu-data";
import { DIPS, SPINNABLE_FLAVOURS } from "@/lib/flavours/flavour-lab-data";
import type {
  Dip,
  Menu,
  MenuCategory,
  MenuItem as PphMenuItem,
  MenuItemModifier,
  Sauce,
  SauceStyle,
} from "./types";

export type SiteLocationKey = "MK" | "NN";

export const MK_LOCATION_ID = "ckloc_wingers_mk";
export const NPTN_LOCATION_ID = "ckloc_wingers_nn";

export function locationKeyFromId(locationId: string): SiteLocationKey {
  return locationId === NPTN_LOCATION_ID ? "NN" : "MK";
}

function pph(n: number): number {
  return Math.round(n * 100);
}

function clampHeat(n: number): 1 | 2 | 3 | 4 | 5 | undefined {
  if (n <= 0) return undefined;
  if (n >= 5) return 5;
  return n as 1 | 2 | 3 | 4 | 5;
}

function clampHeatForSauce(n: number): 1 | 2 | 3 | 4 | 5 {
  const clamped = Math.max(1, Math.min(5, Math.round(n)));
  return clamped as 1 | 2 | 3 | 4 | 5;
}

function resolvePricePence(item: SiteMenuItem, loc: SiteLocationKey): number | null {
  const pref = loc === "MK" ? item.priceMK : item.priceNN;
  const other = loc === "MK" ? item.priceNN : item.priceMK;
  if (pref != null) return pph(pref);
  if (other != null) return pph(other);
  if (item.sizes && item.sizes.length) {
    const sameLoc = item.sizes.map((s) => (loc === "MK" ? s.priceMK : s.priceNN)).find((p) => p != null);
    if (sameLoc != null) return pph(sameLoc);
    const otherLoc = item.sizes.map((s) => (loc === "MK" ? s.priceNN : s.priceMK)).find((p) => p != null);
    if (otherLoc != null) return pph(otherLoc);
  }
  if (item.fromPrice != null) return pph(item.fromPrice);
  return null;
}

function describeSized(item: SiteMenuItem, loc: SiteLocationKey): string | null {
  if (!item.sizes || item.sizes.length === 0) return item.description;
  const parts: string[] = [];
  for (const size of item.sizes) {
    const p = loc === "MK" ? size.priceMK : size.priceNN;
    const fallback = loc === "MK" ? size.priceNN : size.priceMK;
    const price = p ?? fallback;
    if (price == null) continue;
    parts.push(`${size.size} £${price.toFixed(2)}`);
  }
  const sizesLine = parts.length ? parts.join(" · ") : null;
  if (item.description && sizesLine) return `${item.description} — ${sizesLine}`;
  return item.description ?? sizesLine;
}

function slugId(prefix: string, slug: string): string {
  return `${prefix}${slug.replace(/[^a-z0-9]/gi, "_")}`;
}

function isSauceyProduct(item: SiteMenuItem): boolean {
  return item.product === "Wings" || item.product === "Boneless" || item.product === "Tenders";
}

export function buildCatalogueForLocation(locationId: string, updatedAt: string): Menu {
  const loc = locationKeyFromId(locationId);

  // Pph items grouped by category.
  const itemsBySection = new Map<string, PphMenuItem[]>();
  // Keep a flat map of pph item id → whether it is a saucey product, so we
  // can wire compatibleMenuItemIds on each sauce after items are built.
  const sauceyIds: string[] = [];

  for (const item of MENU_ITEMS) {
    if (item.unavailableAt === loc) continue;
    const price = resolvePricePence(item, loc);
    if (price == null) continue;

    const id = slugId("ckitm_", item.slug);
    const categoryId = slugId("ckcat_", item.sectionSlug);
    const pointsValue = Math.max(10, Math.round(price / 2.5));
    const pointsPrice = price; // 1pt == 1p redemption value — matches wing-app.

    const modifiers = modifierSetFor(item);
    const heat = clampHeat(item.spice);
    const badge = item.limitedEdition ? "new" : item.signature ? "premium" : undefined;

    const pphItem: PphMenuItem = {
      id,
      categoryId,
      name: item.name,
      description: describeSized(item, loc) ?? "",
      pricePence: price,
      pointsValue,
      pointsPrice,
      imageUrl: item.photo,
      available: true,
      ...(heat ? { heatLevel: heat } : {}),
      ...(badge ? { badge } : {}),
      ...(modifiers.length ? { modifiers } : {}),
    };

    const bucket = itemsBySection.get(item.sectionSlug) ?? [];
    bucket.push(pphItem);
    itemsBySection.set(item.sectionSlug, bucket);

    if (isSauceyProduct(item)) sauceyIds.push(id);
  }

  const categories: MenuCategory[] = MENU_SECTIONS
    .map((section) => ({
      id: slugId("ckcat_", section.slug),
      name: section.name,
      slug: section.slug,
      items: itemsBySection.get(section.slug) ?? [],
    }))
    .filter((c) => c.items.length > 0);

  const sauces: Sauce[] = SPINNABLE_FLAVOURS.map((f) => {
    const style: SauceStyle = f.type === "dry-rub" ? "dry" : "wet";
    const sauce: Sauce = {
      id: slugId("cksau_", f.slug),
      name: f.name,
      heat: clampHeatForSauce(f.heat),
      style,
      description: f.shortDescription ?? "",
      status: f.limitedEdition ? "limited" : "available",
      compatibleMenuItemIds: sauceyIds,
    };
    return sauce;
  });

  const dips: Dip[] = DIPS.map((d) => ({
    id: slugId("ckdip_", d.slug),
    name: d.name,
    pricePence: 90,
    imageUrl: null,
    available: true,
  }));

  return {
    locationId,
    updatedAt,
    categories,
    sauces,
    dips,
  };
}

// Modifier presets for wings-style products — the site data doesn't carry
// modifiers so we add a small, familiar set so the ItemSheet has something
// to show in mock mode. HTTP mode will overwrite this with whatever PPH
// actually ships on the wire.
function modifierSetFor(item: SiteMenuItem): MenuItemModifier[] {
  if (!isSauceyProduct(item)) return [];
  return [
    { id: "ckmod_extra_sauce", label: "Extra sauce", addPence: 0, kind: "add-on", pointsPrice: 0 },
    { id: "ckmod_extra_chicken", label: "Extra chicken", addPence: 150, kind: "add-on", pointsPrice: 60 },
  ];
}

// Catalogue index — resolve any item id back to its PphMenuItem regardless
// of which location-specific catalogue it came from. The mock holds one
// instance per location; submitOrder needs to find items without knowing
// which location they were served from. Both locations build their own
// catalogue once at module load.

const CATALOGUE_UPDATED_AT = new Date().toISOString();

export const MOCK_MENU_BY_LOCATION: Record<string, Menu> = {
  [MK_LOCATION_ID]: buildCatalogueForLocation(MK_LOCATION_ID, CATALOGUE_UPDATED_AT),
  [NPTN_LOCATION_ID]: buildCatalogueForLocation(NPTN_LOCATION_ID, CATALOGUE_UPDATED_AT),
};

export function findMockMenuItem(id: string, locationId?: string): PphMenuItem | null {
  if (locationId) {
    const menu = MOCK_MENU_BY_LOCATION[locationId];
    if (menu) {
      for (const cat of menu.categories) {
        const found = cat.items.find((i) => i.id === id);
        if (found) return found;
      }
    }
  }
  for (const menu of Object.values(MOCK_MENU_BY_LOCATION)) {
    for (const cat of menu.categories) {
      const found = cat.items.find((i) => i.id === id);
      if (found) return found;
    }
  }
  return null;
}

export const MOCK_SAUCES_BY_LOCATION: Record<string, Sauce[]> = {
  [MK_LOCATION_ID]: MOCK_MENU_BY_LOCATION[MK_LOCATION_ID].sauces,
  [NPTN_LOCATION_ID]: MOCK_MENU_BY_LOCATION[NPTN_LOCATION_ID].sauces,
};

// A rewardable item used by the loyalty rewards (free fries, free wings, etc).
// We pick a stable item id from the menu rather than hard-coding so rewards
// always point at a real catalogue entry.
export function pickRewardItemId(matchName: RegExp): string | null {
  for (const menu of Object.values(MOCK_MENU_BY_LOCATION)) {
    for (const cat of menu.categories) {
      const found = cat.items.find((i) => matchName.test(i.name));
      if (found) return found.id;
    }
  }
  return null;
}
