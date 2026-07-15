"use client";

import { useMemo, useState } from "react";
import { CATEGORIES, MENU, type CategorySlug, type LocationSlug } from "@/lib/menu";
import { LOCATIONS } from "@/lib/locations";
import { cn } from "@/lib/utils";
import { MenuCard } from "./MenuCard";

function LocationSwitcher({
  value,
  onChange,
}: {
  value: LocationSlug;
  onChange: (slug: LocationSlug) => void;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Choose your shop"
      className="grid grid-cols-2 gap-2"
    >
      {LOCATIONS.map((loc) => {
        const slug = loc.slug as LocationSlug;
        const active = value === slug;
        return (
          <button
            key={loc.slug}
            role="radio"
            aria-checked={active}
            onClick={() => onChange(slug)}
            className={cn(
              "min-h-11 px-4 font-display text-sm font-bold uppercase tracking-wide transition-colors",
              active
                ? "bg-brand-pink text-brand-black"
                : "bg-brand-black text-brand-white hover:bg-brand-black/85"
            )}
          >
            {loc.name.replace(/^Wingers\s+/, "")}
          </button>
        );
      })}
    </div>
  );
}

function CategoryRail({
  value,
  onChange,
}: {
  value: CategorySlug;
  onChange: (slug: CategorySlug) => void;
}) {
  return (
    <nav
      aria-label="Menu categories"
      className="-mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:flex-wrap md:justify-center md:overflow-visible md:px-0"
    >
      {CATEGORIES.map((cat) => {
        const active = value === cat.slug;
        return (
          <button
            key={cat.slug}
            onClick={() => onChange(cat.slug)}
            aria-pressed={active}
            className={cn(
              "min-h-11 shrink-0 snap-start whitespace-nowrap px-4 font-display text-sm font-bold uppercase tracking-wide transition-colors",
              active
                ? "bg-brand-pink text-brand-black"
                : "bg-brand-black text-brand-white hover:bg-brand-black/85"
            )}
          >
            {cat.name}
          </button>
        );
      })}
    </nav>
  );
}

interface MenuShellProps {
  defaultLocationSlug?: LocationSlug;
  defaultCategorySlug?: CategorySlug;
}

export function MenuShell({
  defaultLocationSlug = "milton-keynes",
  defaultCategorySlug = "wings",
}: MenuShellProps) {
  const [locationSlug, setLocationSlug] = useState<LocationSlug>(defaultLocationSlug);
  const [categorySlug, setCategorySlug] = useState<CategorySlug>(defaultCategorySlug);

  const items = useMemo(
    () => MENU.filter((item) => item.categorySlug === categorySlug),
    [categorySlug]
  );

  const currentCategory = CATEGORIES.find((c) => c.slug === categorySlug);
  const currentLocationName =
    LOCATIONS.find((l) => l.slug === locationSlug)?.name ?? "Wingers";

  return (
    <>
      <div className="mx-auto max-w-md pt-4">
        <LocationSwitcher value={locationSlug} onChange={setLocationSlug} />
      </div>

      <div className="sticky top-0 z-20 mt-6 bg-brand-white/95 py-3 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <CategoryRail value={categorySlug} onChange={setCategorySlug} />
        </div>
      </div>

      <section
        aria-label={`${currentCategory?.name ?? categorySlug} at ${currentLocationName}`}
        className="mx-auto max-w-6xl px-4 pt-6 pb-16 md:px-8 md:pt-10 md:pb-24"
      >
        {currentCategory?.description && (
          <p className="mb-6 max-w-xl font-body text-base text-brand-black/70 md:mb-8">
            {currentCategory.description}
          </p>
        )}

        {items.length === 0 ? (
          <p className="py-12 text-center font-display text-xl font-bold uppercase tracking-tight text-brand-black/50">
            Nothing here yet
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
            {items.map((item, i) => (
              <li
                key={item.slug}
                className={cn(
                  i % 2 === 0 ? "mr-3 md:mr-0" : "ml-3 md:ml-0"
                )}
              >
                <MenuCard item={item} locationSlug={locationSlug} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
