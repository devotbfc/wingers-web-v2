"use client";

import { useMemo, useState } from "react";
import { LayoutGroup } from "motion/react";
import { DoubledHeading } from "@/components/typography/DoubledHeading";
import { SPINNABLE_FLAVOURS } from "@/lib/flavours";
import { FlavourFilters } from "./FlavourFilters";
import { FlavourCard } from "./FlavourCard";

export type TypeFilter = "all" | "dry-rub" | "wet-sauce";

export function FlavourGrid() {
  const [heatMax, setHeatMax] = useState(5);
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");

  const filtered = useMemo(
    () =>
      SPINNABLE_FLAVOURS.filter((f) => {
        if (f.heat > heatMax) return false;
        if (typeFilter === "all") return true;
        return f.type === typeFilter;
      }),
    [heatMax, typeFilter]
  );

  return (
    <section
      className="py-16 md:py-24"
      aria-label="All flavours"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <DoubledHeading
          text="ALL FLAVOURS"
          as="h2"
          fillColor="brand-white"
          shadowColor="brand-pink"
          className="font-display text-[clamp(2.5rem,7vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight"
        />
        <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-brand-white/60">
          Ten permanent sauces and rubs plus limited-edition drops with a story. See what&rsquo;s incoming below.
        </p>

        <div className="mt-10">
          <FlavourFilters
            heatMax={heatMax}
            onHeatChange={setHeatMax}
            typeFilter={typeFilter}
            onTypeChange={setTypeFilter}
            resultCount={filtered.length}
            totalCount={SPINNABLE_FLAVOURS.length}
          />

          <LayoutGroup>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
              {filtered.map((flavour, i) => (
                <FlavourCard key={flavour.slug} flavour={flavour} index={i} />
              ))}
            </div>
          </LayoutGroup>

          {filtered.length === 0 && (
            <p className="mt-6 text-center font-body text-base text-brand-white/60">
              No flavours match. Turn the heat up or switch type.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
