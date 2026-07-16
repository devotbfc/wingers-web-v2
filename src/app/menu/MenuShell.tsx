"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { LOCATIONS } from "@/lib/locations";
import {
  FLAVOUR_SHOWCASE,
  MENU_ITEMS,
  MENU_SECTIONS,
  isCurrentLE,
  toMenuLocationCode,
  type MenuItem,
} from "@/lib/menu";
import { cn } from "@/lib/utils";
import { FlavourCard } from "./FlavourCard";
import { MenuCard } from "./MenuCard";

const OUR_FLAVOURS_ID = "our-flavours";
const PAST_DROPS_ID = "past-drops";

function LocationSwitcher({
  value,
  onChange,
}: {
  value: string;
  onChange: (slug: string) => void;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Choose your shop"
      className="grid grid-cols-2 gap-2"
    >
      {LOCATIONS.map((loc) => {
        const active = value === loc.slug;
        return (
          <button
            key={loc.slug}
            role="radio"
            aria-checked={active}
            onClick={() => onChange(loc.slug)}
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

function SectionRail({
  rails,
  activeId,
  onClick,
}: {
  rails: { id: string; label: string }[];
  activeId: string;
  onClick: (id: string) => void;
}) {
  return (
    <nav
      aria-label="Menu sections"
      className="-mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:flex-wrap md:justify-center md:overflow-visible md:px-0"
    >
      {rails.map((r) => {
        const active = activeId === r.id;
        return (
          <a
            key={r.id}
            href={`#${r.id}`}
            onClick={(e) => {
              e.preventDefault();
              onClick(r.id);
            }}
            aria-current={active ? "true" : undefined}
            className={cn(
              "flex min-h-11 shrink-0 snap-start items-center whitespace-nowrap px-4 font-display text-sm font-bold uppercase tracking-wide transition-colors",
              active
                ? "bg-brand-pink text-brand-black"
                : "bg-brand-black text-brand-white hover:bg-brand-black/85"
            )}
          >
            {r.label}
          </a>
        );
      })}
    </nav>
  );
}

interface MenuShellProps {
  defaultLocationSlug?: string;
}

export function MenuShell({
  defaultLocationSlug = "milton-keynes",
}: MenuShellProps) {
  const [locationSlug, setLocationSlug] = useState<string>(defaultLocationSlug);
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

  const sections = useMemo(
    () =>
      MENU_SECTIONS.map((section) => {
        const itemsInSection = currentItems.filter(
          (i) => i.sectionSlug === section.slug
        );
        const availableInSection = itemsInSection.filter(
          (i) => i.unavailableAt !== code
        );
        return {
          slug: section.slug,
          id: `section-${section.slug}`,
          name: section.name,
          items: itemsInSection,
          hasAny: itemsInSection.length > 0,
          allUnavailableHere:
            itemsInSection.length > 0 && availableInSection.length === 0,
        };
      }).filter((s) => s.hasAny),
    [currentItems, code]
  );

  const rails = useMemo(() => {
    const items = sections.map((s) => ({ id: s.id, label: s.name }));
    items.push({ id: OUR_FLAVOURS_ID, label: "Our Flavours" });
    if (pastDrops.length > 0) {
      items.push({ id: PAST_DROPS_ID, label: "Past Drops" });
    }
    return items;
  }, [sections, pastDrops]);

  const [activeId, setActiveId] = useState<string>(rails[0]?.id ?? "");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    observerRef.current?.disconnect();
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-96px 0px -60% 0px", threshold: 0 }
    );
    for (const rail of rails) {
      const el = document.getElementById(rail.id);
      if (el) io.observe(el);
    }
    observerRef.current = io;
    return () => io.disconnect();
  }, [rails]);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    setActiveId(id);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div className="mx-auto max-w-md px-4 pt-4 md:px-0">
        <LocationSwitcher value={locationSlug} onChange={setLocationSlug} />
      </div>

      <div className="sticky top-0 z-20 mt-6 bg-brand-white/95 py-3 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <SectionRail rails={rails} activeId={activeId} onClick={scrollToId} />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-6 pb-16 md:px-8 md:pt-10 md:pb-24">
        <p className="sr-only">
          Menu for {currentLocationName}. Prices and availability differ per
          shop.
        </p>

        {sections.map((section) => (
          <section
            key={section.slug}
            id={section.id}
            aria-labelledby={`${section.id}-heading`}
            className="scroll-mt-24 pt-10 first:pt-0 md:pt-16"
          >
            <h2
              id={`${section.id}-heading`}
              className="font-display text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-brand-black md:text-5xl"
            >
              {section.name}
            </h2>

            {section.allUnavailableHere ? (
              <div className="mt-6 bg-brand-black p-6 md:p-8 text-brand-white">
                <p className="font-display text-lg font-bold uppercase tracking-tight">
                  Available at {otherLocationName} only.
                </p>
                <p className="mt-2 font-body text-sm leading-relaxed text-brand-white/75">
                  This section isn&rsquo;t on the {currentLocationName.replace(/^Wingers\s+/, "")} menu right now. Switch shops above to see it.
                </p>
              </div>
            ) : (
              <ItemGrid items={section.items} locationSlug={locationSlug} />
            )}
          </section>
        ))}

        <section
          id={OUR_FLAVOURS_ID}
          aria-labelledby={`${OUR_FLAVOURS_ID}-heading`}
          className="scroll-mt-24 pt-10 md:pt-16"
        >
          <div className="flex items-baseline justify-between gap-4">
            <h2
              id={`${OUR_FLAVOURS_ID}-heading`}
              className="font-display text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-brand-black md:text-5xl"
            >
              Our Flavours
            </h2>
          </div>
          <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-brand-black/70 md:text-base">
            The sauces we coat our wings, boneless and tenders in. Pick one on
            the ordering platform when you check out.
          </p>
          <ul className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
            {FLAVOUR_SHOWCASE.map((flavour, i) => (
              <li
                key={flavour.slug}
                className={cn(i % 2 === 0 ? "mr-3 md:mr-0" : "ml-3 md:ml-0")}
              >
                <FlavourCard flavour={flavour} />
              </li>
            ))}
          </ul>
        </section>

        {pastDrops.length > 0 && (
          <section
            id={PAST_DROPS_ID}
            aria-labelledby={`${PAST_DROPS_ID}-heading`}
            className="scroll-mt-24 pt-10 md:pt-16"
          >
            <h2
              id={`${PAST_DROPS_ID}-heading`}
              className="font-display text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-brand-black/60 md:text-5xl"
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
    <ul className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
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
