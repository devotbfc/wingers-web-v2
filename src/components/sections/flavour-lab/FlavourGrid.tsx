"use client";

import { useMemo, useState } from "react";
import { LayoutGroup } from "motion/react";
import { DoubledHeading } from "@/components/typography/DoubledHeading";
import { FLAVOURS } from "@/lib/flavours";
import { FlavourFilters } from "./FlavourFilters";
import { FlavourCard } from "./FlavourCard";

export type TypeFilter = "all" | "dry-rub" | "wet-sauce";

export function FlavourGrid() {
  const [heatMax, setHeatMax] = useState(5);
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");

  const filtered = useMemo(
    () =>
      FLAVOURS.filter((f) => {
        if (f.heat > heatMax) return false;
        if (typeFilter === "all") return true;
        return f.type === typeFilter;
      }),
    [heatMax, typeFilter]
  );

  return (
    <section
      className="bg-brand-white py-16 md:py-24"
      aria-label="All flavours"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <DoubledHeading
          text="ALL FLAVOURS"
          as="h2"
          className="font-display text-[clamp(2.5rem,7vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight"
        />
        <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-brand-black/75">
          Twenty-four flavours in the Lab — ten permanent, fourteen limited-edition drops.
        </p>

        <div className="mt-10">
          <FlavourFilters
            heatMax={heatMax}
            onHeatChange={setHeatMax}
            typeFilter={typeFilter}
            onTypeChange={setTypeFilter}
            resultCount={filtered.length}
            totalCount={FLAVOURS.length}
          />

          <LayoutGroup>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
              {filtered.map((flavour, i) => (
                <FlavourCard key={flavour.slug} flavour={flavour} index={i} />
              ))}
            </div>
          </LayoutGroup>

          {filtered.length === 0 && (
            <p className="mt-6 text-center font-body text-base text-brand-black/70">
              No flavours match. Turn the heat up or switch type.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
