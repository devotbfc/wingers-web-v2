"use client";

import { useMemo, useState } from "react";
import { LayoutGroup } from "motion/react";
import { DoubledHeading } from "@/components/typography/DoubledHeading";
import { CORE_COUNT, SPINNABLE_FLAVOURS, numberToWord } from "@/lib/flavours";
import { FlavourFilters } from "./FlavourFilters";
import { FlavourCard } from "./FlavourCard";

export type TypeFilter = "all" | "dry-rub" | "wet-sauce";

function capitaliseFirst(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function FlavourGrid() {
  const [heat, setHeat] = useState(0);
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");

  const filtered = useMemo(
    () =>
      SPINNABLE_FLAVOURS.filter((f) => {
        // "Heat up to N": keep flavours with heat <= selected. heat === 0
        // means cleared → show all. Zero-heat flavours stay visible at
        // every level since 0 <= every N.
        if (heat >= 1 && f.heat > heat) return false;
        if (typeFilter === "all") return true;
        return f.type === typeFilter;
      }),
    [heat, typeFilter]
  );

  // Bento ordering: move the one `featured` flavour (today: ghost-buffalo-
  // hot) to the front so its col-span-2 doesn't leave a hole in the grid.
  // If the current filter excludes it, degrade quietly to the natural
  // filtered order — no featured slot, equal tiles.
  const ordered = useMemo(() => {
    const idx = filtered.findIndex((f) => f.featured === true);
    if (idx < 0) return filtered;
    const copy = [...filtered];
    const [feat] = copy.splice(idx, 1);
    return [feat, ...copy];
  }, [filtered]);

  return (
    <section
      className="py-16 md:py-24"
      aria-label="Every flavour"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <DoubledHeading
          text="EVERY FLAVOUR"
          as="h2"
          fillColor="brand-white"
          shadowColor="brand-pink"
          className="font-display text-[clamp(2.5rem,7vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight"
        />
        <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-brand-white/60">
          {/* Template literal — SWC's capitaliseFirst inlining strips the JSX
              whitespace between the expression and the following text child,
              so compose the whole string in one expression. */}
          {`${capitaliseFirst(numberToWord(CORE_COUNT))} permanent sauces and rubs plus limited-edition drops with a story. See what\u2019s coming soon below.`}
        </p>

        <div className="mt-10">
          <FlavourFilters
            heat={heat}
            onHeatChange={setHeat}
            typeFilter={typeFilter}
            onTypeChange={setTypeFilter}
            resultCount={filtered.length}
            totalCount={SPINNABLE_FLAVOURS.length}
          />

          <LayoutGroup>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
              {ordered.map((flavour, i) => (
                <FlavourCard
                  key={flavour.slug}
                  flavour={flavour}
                  index={i}
                  featured={flavour.featured === true}
                />
              ))}
            </div>
          </LayoutGroup>

          {filtered.length === 0 && (
            <p className="mt-6 text-center font-body text-base text-brand-white/60">
              No flavours match — try a higher heat or a different type.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
