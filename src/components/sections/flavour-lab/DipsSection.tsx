"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { DoubledHeading } from "@/components/typography/DoubledHeading";
import { DIPS, type Dip } from "@/lib/flavours";

// Fill colours mirror the WheelResult DipPot (src/components/sections/
// flavour-lab/WheelResult.tsx). Four entries only; if a third consumer
// shows up, extract to a shared module keyed on dip.slug.
const DIP_SWATCH_FILL: Record<string, string> = {
  "blue-cheese": "#FDFBF2",
  ranch: "#F3EBD2",
  "california-sauce-mayo": "#F6D1AF",
  "honey-mustard": "#E6C34C",
};

const DIP_SWATCH_DEFAULT = "#FDFBF2";

const DIP_HASH_PREFIX = "#dip-";

// Tiles now show swatch + name + description inline (no expand state).
// WheelResult.DipPot still writes #dip-<slug> via history.replaceState +
// a synthetic hashchange event; keep that compat by scrolling to the tile
// here on hashchange. On initial mount we honour an incoming hash too.
export function DipsSection() {
  const reduce = useReducedMotion();

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (!hash.startsWith(DIP_HASH_PREFIX)) return;
      const slug = hash.slice(DIP_HASH_PREFIX.length);
      const el = document.getElementById(`dip-${slug}`);
      if (!el) return;
      el.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "center",
      });
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [reduce]);

  return (
    <section id="dips" className="py-16 md:py-24" aria-label="Dips">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <DoubledHeading
          text="DIPS"
          as="h2"
          fillColor="brand-pink"
          shadowColor="brand-red"
          className="font-display text-[clamp(2.5rem,7vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight"
        />
        <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-brand-white/60">
          Four dips. Pick your partner in crime.
        </p>

        <ul className="mt-10 grid gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
          {DIPS.map((dip) => (
            <DipTile key={dip.slug} dip={dip} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function DipTile({ dip }: { dip: Dip }) {
  const fill = DIP_SWATCH_FILL[dip.slug] ?? DIP_SWATCH_DEFAULT;
  return (
    <li
      id={`dip-${dip.slug}`}
      className="flex items-start gap-4 rounded-2xl border border-brand-white/10 bg-brand-white/[0.03] p-5 scroll-mt-28"
    >
      {dip.image ? (
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)] md:h-12 md:w-12">
          <Image
            src={dip.image}
            alt=""
            fill
            sizes="48px"
            aria-hidden="true"
            className="object-cover"
          />
        </div>
      ) : (
        <svg
          aria-hidden="true"
          viewBox="0 0 56 56"
          className="h-11 w-11 shrink-0 drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)] md:h-12 md:w-12"
        >
          <circle cx="28" cy="28" r="26" fill="#E8E4DB" />
          <circle cx="28" cy="28" r="23" fill="#F7F3E8" />
          <circle cx="28" cy="28" r="21" fill={fill} />
          <ellipse cx="22" cy="22" rx="5" ry="2.5" fill="#FFFFFF" opacity="0.42" />
        </svg>
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h3 className="font-display text-lg font-extrabold uppercase leading-tight tracking-tight text-brand-white">
          {dip.name}
        </h3>
        {dip.shortDescription ? (
          <p className="font-body text-sm leading-snug text-brand-white/70">
            {dip.shortDescription}
          </p>
        ) : null}
      </div>
    </li>
  );
}
