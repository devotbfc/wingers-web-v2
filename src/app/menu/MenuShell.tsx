"use client";

import { useEffect, useMemo, useState } from "react";

import { BackToTopButton } from "@/components/common/BackToTopButton";
import { BeefNorthamptonTeaser } from "@/components/menu/BeefNorthamptonTeaser";
import { CategoryBar } from "@/components/menu/CategoryBar";
import { FlavourLabLinkCard } from "@/components/menu/FlavourLabLinkCard";
import { LimitedEditionSpotlight } from "@/components/menu/LimitedEditionSpotlight";
import { LocationExclusiveBadge } from "@/components/menu/LocationExclusiveBadge";
import { LocationPicker } from "@/components/menu/LocationPicker";
import type { Flavour } from "@/lib/flavours/flavour-lab-data";
import { LOCATIONS } from "@/lib/locations";
import {
  MENU_ITEMS,
  MENU_SECTIONS,
  isCurrentLE,
  toMenuLocationCode,
  type MenuItem,
} from "@/lib/menu";
import { MENU_GROUPS } from "@/lib/menu/groups";
import { cn } from "@/lib/utils";
import { MenuCard } from "./MenuCard";

const PAST_DROPS_ID = "past-drops";
const LOCATION_STORAGE_KEY = "wingers_menu_location";

const SECTION_NAME_BY_SLUG: Record<string, string> = Object.fromEntries(
  MENU_SECTIONS.map((s) => [s.slug, s.name])
);

function readStoredLocation(): string | null {
  try {
    return window.localStorage.getItem(LOCATION_STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeStoredLocation(slug: string): void {
  try {
    window.localStorage.setItem(LOCATION_STORAGE_KEY, slug);
  } catch {
    /* ignore */
  }
}

interface MenuShellProps {
  defaultLocationSlug?: string;
  currentLE?: Flavour | null;
}

export function MenuShell({
  defaultLocationSlug = "milton-keynes",
  currentLE = null,
}: MenuShellProps) {
  const [locationSlug, setLocationSlug] = useState<string>(defaultLocationSlug);

  // Rehydrate from localStorage post-mount so SSR output matches initial
  // client render (then updates to the stored choice). Deferred via rAF so
  // the setState sits outside the effect body — same pattern as
  // LocationOpenBadge.
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const stored = readStoredLocation();
      if (stored && LOCATIONS.some((l) => l.slug === stored)) {
        setLocationSlug(stored);
      }
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  function handleLocationChange(slug: string) {
    setLocationSlug(slug);
    writeStoredLocation(slug);
  }
  const code = toMenuLocationCode(locationSlug);
  const currentLocationName =
    LOCATIONS.find((l) => l.slug === locationSlug)?.name ?? "Wingers";

  const currentItems = useMemo(
    () => MENU_ITEMS.filter((i) => isCurrentLE(i)),
    []
  );
  const pastDrops = useMemo(
    () => MENU_ITEMS.filter((i) => !isCurrentLE(i)),
    []
  );

  const otherLocationName = useMemo(() => {
    const other = LOCATIONS.find((l) => l.slug !== locationSlug);
    return other?.name.replace(/^Wingers\s+/, "") ?? "the other shop";
  }, [locationSlug]);

  // Build groups, each with its source sub-sections and their items (filtered
  // to currently-live LE items). A group is dropped if all its sub-sections
  // are empty.
  const groups = useMemo(() => {
    return MENU_GROUPS.map((group) => {
      // productFilter groups (WINGS, TENDERS): single flat sub-section
      // produced from a product filter on one source section — no sub-headings.
      if (group.productFilter) {
        const sectionSlug = group.sectionSlugs[0]!;
        const items = currentItems.filter(
          (i) =>
            i.sectionSlug === sectionSlug &&
            typeof i.product === "string" &&
            (group.productFilter as readonly string[]).includes(i.product)
        );
        const availableHere = items.filter((i) => i.unavailableAt !== code);
        const sub = {
          slug: group.slug,
          name: group.label,
          items,
          hasAny: items.length > 0,
          allUnavailableHere:
            items.length > 0 && availableHere.length === 0,
        };
        return {
          slug: group.slug,
          label: group.label,
          id: `group-${group.slug}`,
          showSubHeadings: false,
          subSections: sub.hasAny ? [sub] : [],
          hasAny: sub.hasAny,
          allUnavailableHere: sub.allUnavailableHere,
        };
      }

      // Default: one sub-section per source section slug.
      const subSections = group.sectionSlugs.map((slug) => {
        const items = currentItems.filter((i) => i.sectionSlug === slug);
        const availableHere = items.filter((i) => i.unavailableAt !== code);
        return {
          slug,
          name: SECTION_NAME_BY_SLUG[slug] ?? slug,
          items,
          hasAny: items.length > 0,
          allUnavailableHere:
            items.length > 0 && availableHere.length === 0,
        };
      }).filter((s) => s.hasAny);

      return {
        slug: group.slug,
        label: group.label,
        id: `group-${group.slug}`,
        showSubHeadings: group.showSubHeadings,
        subSections,
        hasAny: subSections.length > 0,
        allUnavailableHere:
          subSections.length > 0 &&
          subSections.every((s) => s.allUnavailableHere),
      };
    })
      // Drop groups that have no items at all, OR groups whose entire set of
      // items is unavailable at the active location (so e.g. MEAL DEALS, once
      // Northampton-only data lands, disappears entirely on Milton Keynes —
      // no pill, no banner).
      .filter((g) => g.hasAny && !g.allUnavailableHere);
  }, [currentItems, code]);

  const barItems = useMemo(
    () =>
      groups.map((g) => ({
        slug: g.slug,
        label: g.label,
        id: g.id,
        icon:
          g.slug === "little-wings"
            ? {
                src: "/brand/logo/wingers-mark.png",
                // Native asset is a near-square pink mark on transparent.
                widthPx: 56,
                heightPx: 56,
              }
            : undefined,
      })),
    [groups]
  );

  return (
    <>
      <LimitedEditionSpotlight flavour={currentLE} />

      <div className="mt-4 flex justify-center px-4">
        <LocationPicker value={locationSlug} onChange={handleLocationChange} />
      </div>

      {/* Sticky chrome — seats flush under the fixed NavBar via --nav-h.
          See globals.css. */}
      <div
        className="sticky z-20 mt-6 border-b border-brand-black/10 bg-brand-white"
        style={{ top: "var(--nav-h)" }}
      >
        <div className="mx-auto max-w-6xl">
          <CategoryBar items={barItems} />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-6 pb-16 md:px-8 md:pt-10 md:pb-24">
        <p className="sr-only">
          Menu for {currentLocationName}. Prices and availability differ per
          shop.
        </p>

        {groups.map((group) => (
          <section
            key={group.slug}
            id={group.id}
            aria-labelledby={`${group.id}-heading`}
            // scroll-margin-top uses --nav-h so anchored scrolls land flush
            // under both the NavBar and the sticky category bar.
            style={{
              scrollMarginTop: "calc(var(--nav-h) + 4rem)",
            }}
            className="pt-10 first:pt-0 md:pt-16"
          >
            {/* Legacy anchor: /menu#sweets still works after the rename. */}
            {group.slug === "desserts" && (
              <span
                id="sweets"
                aria-hidden="true"
                style={{ scrollMarginTop: "calc(var(--nav-h) + 4rem)" }}
              />
            )}
            {/* Legacy anchor: /menu#kids still works after the rename. */}
            {group.slug === "little-wings" && (
              <span
                id="kids"
                aria-hidden="true"
                style={{ scrollMarginTop: "calc(var(--nav-h) + 4rem)" }}
              />
            )}
            <h2
              id={`${group.id}-heading`}
              className="font-display font-extrabold text-3xl uppercase leading-[0.95] tracking-tight text-brand-black md:text-5xl"
            >
              {group.slug === "little-wings"
                ? "Little Wings Meals"
                : group.label}
            </h2>

            {group.allUnavailableHere ? (
              <div className="mt-6 border-l-4 border-brand-red bg-brand-pink/15 p-6 text-brand-black md:p-8">
                <p className="font-display text-lg font-bold uppercase tracking-tight">
                  Available at {otherLocationName} only.
                </p>
                <p className="mt-2 font-body text-sm leading-relaxed text-brand-black/70">
                  This group isn&rsquo;t on the{" "}
                  {currentLocationName.replace(/^Wingers\s+/, "")} menu right
                  now. Switch shops above to see it.
                </p>
              </div>
            ) : (
              group.subSections.map((sub) => (
                <div key={sub.slug} className="mt-6 first:mt-6">
                  {group.showSubHeadings && (
                    <h3 className="font-display font-extrabold text-xl uppercase tracking-tight text-brand-black/85 md:text-2xl">
                      {sub.name}
                      {sub.slug === "beef-burgers" && code === "NN" && (
                        <LocationExclusiveBadge />
                      )}
                    </h3>
                  )}
                  {sub.allUnavailableHere ? (
                    sub.slug === "beef-burgers" && code === "MK" ? (
                      <BeefNorthamptonTeaser
                        onSwitchToNN={() => handleLocationChange("northampton")}
                      />
                    ) : (
                      <div className="mt-4 border-l-4 border-brand-red bg-brand-pink/15 p-5 text-brand-black">
                        <p className="font-body text-sm leading-relaxed text-brand-black/80">
                          {sub.name} is at {otherLocationName} only right now.
                        </p>
                      </div>
                    )
                  ) : (
                    <ItemGrid items={sub.items} locationSlug={locationSlug} />
                  )}
                </div>
              ))
            )}
          </section>
        ))}

        <FlavourLabLinkCard />

        {pastDrops.length > 0 && (
          <section
            id={PAST_DROPS_ID}
            aria-labelledby={`${PAST_DROPS_ID}-heading`}
            style={{ scrollMarginTop: "calc(var(--nav-h) + 4rem)" }}
            className="pt-10 md:pt-16"
          >
            <h2
              id={`${PAST_DROPS_ID}-heading`}
              className="font-display font-extrabold text-3xl uppercase leading-[0.95] tracking-tight text-brand-black/60 md:text-5xl"
            >
              Past Drops
            </h2>
            <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-brand-black/60">
              Limited-edition items we&rsquo;ve retired. Kept here so you can
              remember what you loved.
            </p>
            <ul className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
              {pastDrops.map((item, i) => (
                <li
                  key={item.slug}
                  className={cn(i % 2 === 0 ? "mr-3 md:mr-0" : "ml-3 md:ml-0")}
                >
                  <MenuCard
                    item={item}
                    locationSlug={locationSlug}
                    variant="past"
                  />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <BackToTopButton anchor="right" appearAfter={400} />
    </>
  );
}

function ItemGrid({
  items,
  locationSlug,
}: {
  items: MenuItem[];
  locationSlug: string;
}) {
  return (
    <ul className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
      {items.map((item, i) => (
        <li
          key={item.slug}
          className={cn(i % 2 === 0 ? "mr-3 md:mr-0" : "ml-3 md:ml-0")}
        >
          <MenuCard item={item} locationSlug={locationSlug} />
        </li>
      ))}
    </ul>
  );
}
