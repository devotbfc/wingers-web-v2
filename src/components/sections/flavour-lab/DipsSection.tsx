"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { DoubledHeading } from "@/components/typography/DoubledHeading";
import { DIPS, type Dip } from "@/lib/flavours";

const DIP_HASH_PREFIX = "#dip-";

export function DipsSection() {
  const reduce = useReducedMotion();
  const [openSlugs, setOpenSlugs] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (!hash.startsWith(DIP_HASH_PREFIX)) return;
      const slug = hash.slice(DIP_HASH_PREFIX.length);
      const dip = DIPS.find((d) => d.slug === slug);
      if (!dip) return;
      if (dip.shortDescription) {
        setOpenSlugs((prev) => {
          if (prev.has(slug)) return prev;
          const next = new Set(prev);
          next.add(slug);
          return next;
        });
      }
      const el = document.getElementById(`dip-${slug}`);
      if (el) {
        el.scrollIntoView({
          behavior: reduce ? "auto" : "smooth",
          block: "center",
        });
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [reduce]);

  const toggle = (slug: string) => {
    setOpenSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

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

        <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {DIPS.map((dip) => (
            <DipTile
              key={dip.slug}
              dip={dip}
              isOpen={openSlugs.has(dip.slug)}
              onToggle={() => toggle(dip.slug)}
              reduce={reduce ?? false}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

interface DipTileProps {
  dip: Dip;
  isOpen: boolean;
  onToggle: () => void;
  reduce: boolean;
}

function DipTile({ dip, isOpen, onToggle, reduce }: DipTileProps) {
  const hasBlurb = Boolean(dip.shortDescription);
  const blurbId = `dip-blurb-${dip.slug}`;

  const tileClass =
    "group flex flex-col rounded-2xl border border-brand-white/10 bg-brand-white/[0.03] transition-all hover:border-brand-pink/50 hover:bg-brand-pink/[0.06]";

  if (!hasBlurb) {
    return (
      <li id={`dip-${dip.slug}`} className={tileClass}>
        <div className="flex min-h-[132px] w-full flex-col items-center justify-center gap-2 p-6 text-center">
          <h3 className="font-display text-lg font-extrabold uppercase leading-tight tracking-tight text-brand-white transition-colors group-hover:text-brand-pink md:text-xl">
            {dip.name}
          </h3>
        </div>
      </li>
    );
  }

  return (
    <li
      id={`dip-${dip.slug}`}
      className={`${tileClass} has-[button[aria-expanded=true]]:border-brand-pink/50 has-[button[aria-expanded=true]]:bg-brand-pink/[0.06]`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={blurbId}
        className="flex min-h-[132px] w-full flex-col items-center justify-center gap-2 rounded-2xl p-6 text-center"
      >
        <h3 className="font-display text-lg font-extrabold uppercase leading-tight tracking-tight text-brand-white transition-colors group-hover:text-brand-pink md:text-xl">
          {dip.name}
        </h3>
        <ChevronDown
          aria-hidden="true"
          className={`h-4 w-4 text-brand-pink/70 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="blurb"
            id={blurbId}
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduce ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="border-t border-brand-white/10 px-6 pb-6 pt-4 font-body text-sm leading-relaxed text-brand-white/75">
              {dip.shortDescription}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
