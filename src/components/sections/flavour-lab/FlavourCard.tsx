"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown, Lock } from "lucide-react";
import { OrderTriggerButton } from "@/components/sections/order-panel/OrderTriggerButton";
import type { Flavour } from "@/lib/flavours";
import { HeatFlames } from "./FlameIcon";

interface FlavourCardProps {
  flavour: Flavour;
  index: number;
  // Set by FlavourGrid for the one flavour carrying `featured: true`.
  // Promotes the card to col-span-2 by default on every breakpoint so it
  // sits as a wider "bento" slot. Expand still bumps to col-span-2 — this
  // just makes it the baseline.
  featured?: boolean;
}

export function FlavourCard({ flavour, index, featured = false }: FlavourCardProps) {
  const reduce = useReducedMotion();
  const [expanded, setExpanded] = useState(false);

  const comingSoon = flavour.status === "coming-soon";
  const isLE = flavour.limitedEdition && !comingSoon;
  const ghost = flavour.heat === 5;
  const hasLongStory = Boolean(
    flavour.howMade || flavour.history || flavour.pairsWith,
  );
  const canExpand = !comingSoon && hasLongStory;
  const nameMatch = flavour.name.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  const nameMain = nameMatch ? nameMatch[1] : flavour.name;
  const nameParen = nameMatch ? `(${nameMatch[2]})` : null;

  const verticalPad = index % 2 === 0 ? "py-6 md:py-7" : "py-7 md:py-8";
  const spanClass = featured || expanded ? "col-span-2" : "";

  const cardBase =
    "relative flex flex-col overflow-hidden rounded-2xl border transition-colors";
  const cardSurface = ghost
    ? "border-brand-red/40 bg-brand-red/[0.05] hover:border-brand-red/60"
    : "border-brand-white/10 bg-brand-white/[0.03] hover:border-brand-white/25";
  const hasCardImage = Boolean(flavour.cardImage);

  return (
    <motion.article
      layout={reduce ? false : true}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`${cardBase} ${cardSurface} min-h-[220px] md:min-h-[260px] px-4 md:px-5 ${verticalPad} ${spanClass}`}
    >
      {hasCardImage && (
        <>
          <Image
            src={flavour.cardImage as string}
            alt=""
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            aria-hidden="true"
            className="pointer-events-none select-none object-cover opacity-60"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(10,10,10,0.96) 38%, rgba(10,10,10,0.45) 75%, rgba(10,10,10,0.2))",
            }}
          />
        </>
      )}

      {comingSoon && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(circle at 70% 20%, rgba(255,111,181,0.18), transparent 60%)",
          }}
        />
      )}

      <div className="relative flex flex-wrap items-start gap-x-2 gap-y-1.5">
        <HeatFlames heat={flavour.heat} />
        <div className="ml-auto flex items-center gap-2">
          {isLE && !ghost && (
            <span className="rounded-full border border-brand-pink/50 px-2 py-0.5 font-display text-[9px] font-bold uppercase tracking-[0.2em] text-brand-pink">
              Limited Edition
            </span>
          )}
          {ghost && (
            <span className="animate-flicker rounded-full border border-brand-red/60 px-2 py-0.5 font-display text-[9px] font-bold uppercase tracking-[0.25em] text-brand-red">
              Danger
            </span>
          )}
          {comingSoon && (
            <Lock
              className="h-4 w-4 text-brand-pink/70 drop-shadow-[0_0_6px_rgba(255,111,181,0.6)]"
              aria-hidden="true"
            />
          )}
        </div>
      </div>

      <h3
        className={`relative mt-3 font-display text-xl font-extrabold uppercase leading-tight tracking-tight md:text-2xl ${
          ghost
            ? "neon-red text-brand-red"
            : comingSoon
              ? "text-brand-white/70"
              : "text-brand-white"
        }`}
      >
        {nameMain}
        {nameParen ? (
          <span className="block font-display text-sm font-bold tracking-wide normal-case opacity-60 md:text-base">
            {nameParen}
          </span>
        ) : null}
      </h3>

      {flavour.shortDescription && (
        <p
          className={`relative mt-2 line-clamp-3 font-body text-sm leading-relaxed ${
            ghost ? "text-brand-white/85" : "text-brand-white/60"
          }`}
        >
          {flavour.shortDescription}
        </p>
      )}

      {comingSoon && (
        <p className="relative mt-2 font-display text-[10px] font-bold uppercase tracking-[0.3em] text-brand-pink/70">
          Locked · Coming Soon
        </p>
      )}

      {canExpand && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className={`relative mt-4 inline-flex items-center gap-1 self-start font-display text-xs font-bold uppercase tracking-[0.25em] transition-colors ${
            ghost
              ? "text-brand-red hover:text-brand-white"
              : "text-brand-pink hover:text-brand-white"
          }`}
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
            className="relative overflow-hidden"
          >
            <div
              className={`mt-5 grid gap-5 border-t pt-5 md:grid-cols-3 md:gap-6 ${
                ghost ? "border-brand-red/20" : "border-brand-white/10"
              }`}
            >
              <StoryField label="How it's made" body={flavour.howMade} ghost={ghost} />
              <StoryField label="History" body={flavour.history} ghost={ghost} />
              <StoryField label="Pairs with" body={flavour.pairsWith} ghost={ghost} />
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

function StoryField({
  label,
  body,
  ghost,
}: {
  label: string;
  body: string | null;
  ghost: boolean;
}) {
  if (!body) return null;
  return (
    <div>
      <p
        className={`font-display text-[10px] font-bold uppercase tracking-[0.3em] ${
          ghost ? "text-brand-red" : "text-brand-pink"
        }`}
      >
        {label}
      </p>
      <p className="mt-1 font-body text-sm leading-relaxed text-brand-white/80">
        {body}
      </p>
    </div>
  );
}
