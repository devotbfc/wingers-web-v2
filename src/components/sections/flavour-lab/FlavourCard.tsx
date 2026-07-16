"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { OrderTriggerButton } from "@/components/sections/order-panel/OrderTriggerButton";
import type { Flavour } from "@/lib/flavours";
import { HeatFlames } from "./FlameIcon";

interface FlavourCardProps {
  flavour: Flavour;
  index: number;
}

export function FlavourCard({ flavour, index }: FlavourCardProps) {
  const reduce = useReducedMotion();
  const [expanded, setExpanded] = useState(false);

  const comingSoon = flavour.limitedEdition && !flavour.shortDescription;
  const isLE = flavour.limitedEdition && !comingSoon;
  const canExpand = !comingSoon;

  const verticalPad = index % 2 === 0 ? "py-5" : "py-7";

  return (
    <motion.article
      layout={reduce ? false : true}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex flex-col border-2 border-brand-black bg-brand-white px-4 md:px-5 ${verticalPad} ${
        comingSoon ? "opacity-70" : ""
      } ${expanded ? "col-span-2" : ""}`}
    >
      <div className="flex items-start justify-between gap-2">
        <HeatFlames heat={flavour.heat} />
        {isLE && (
          <span className="border border-brand-red bg-brand-white px-1.5 py-0.5 font-display text-[9px] font-bold uppercase tracking-[0.2em] text-brand-red">
            Limited
          </span>
        )}
        {comingSoon && (
          <span className="bg-brand-black px-1.5 py-0.5 font-display text-[9px] font-bold uppercase tracking-[0.2em] text-brand-white">
            Coming Soon
          </span>
        )}
      </div>

      <h3 className="mt-3 font-display text-xl font-extrabold uppercase leading-tight tracking-tight text-brand-black md:text-2xl">
        {flavour.name}
      </h3>

      {flavour.shortDescription && (
        <p className="mt-2 line-clamp-3 font-body text-sm leading-relaxed text-brand-black/75">
          {flavour.shortDescription}
        </p>
      )}

      {canExpand && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-4 inline-flex items-center gap-1 self-start font-display text-xs font-bold uppercase tracking-[0.2em] text-brand-red hover:text-brand-black"
        >
          {expanded ? "Less" : "More"}
          <ChevronDown
            className={`h-3 w-3 transition-transform ${expanded ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>
      )}

      <AnimatePresence initial={false}>
        {expanded && canExpand && (
          <motion.div
            key="story"
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduce ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-5 space-y-4 border-t border-brand-black/10 pt-5">
              <StoryField label="How it's made" body={flavour.howMade} />
              <StoryField label="Sourced from" body={flavour.sourcedFrom} />
              <StoryField label="History" body={flavour.history} />
              <StoryField label="Pairs with" body={flavour.pairsWith} />
            </div>
            <div className="mt-5">
              <OrderTriggerButton>Get these wings</OrderTriggerButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

function StoryField({ label, body }: { label: string; body: string | null }) {
  if (!body) return null;
  return (
    <div>
      <p className="font-display text-[10px] font-bold uppercase tracking-[0.25em] text-brand-red">
        {label}
      </p>
      <p className="mt-1 font-body text-sm leading-relaxed text-brand-black/85">
        {body}
      </p>
    </div>
  );
}
