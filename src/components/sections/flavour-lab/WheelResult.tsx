"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BrandButton } from "@/components/brand/BrandButton";
import { OrderTriggerButton } from "@/components/sections/order-panel/OrderTriggerButton";
import { useAnimateInView } from "@/components/common/useAnimateInView";
import { cn } from "@/lib/utils";
import { suggestDipsFor, type Dip, type Flavour } from "@/lib/flavours";
import { HeatFlames } from "./FlameIcon";

interface WheelResultProps {
  winner: Flavour | null;
  onSpinAgain: () => void;
}

interface DipPotStyle {
  fill: string;
  flecks: { color: string; r: number; dots: readonly [number, number][] } | null;
}

const DIP_POT_STYLES: Record<string, DipPotStyle> = {
  // Blue Cheese — off-white with blue-grey flecks.
  "blue-cheese": {
    fill: "#FDFBF2",
    flecks: {
      color: "#5B7A94",
      r: 1.6,
      dots: [
        [20, 22],
        [34, 24],
        [26, 32],
        [36, 34],
        [22, 36],
      ] as const,
    },
  },
  // Ranch — cream with small green herb specks.
  ranch: {
    fill: "#F3EBD2",
    flecks: {
      color: "#5A6B45",
      r: 1,
      dots: [
        [22, 24],
        [32, 22],
        [28, 30],
        [34, 34],
        [20, 34],
      ] as const,
    },
  },
  // Cali Mayo — pale peach, smooth.
  "california-sauce-mayo": {
    fill: "#F6D1AF",
    flecks: null,
  },
  // Honey Mustard — golden, smooth.
  "honey-mustard": {
    fill: "#E6C34C",
    flecks: null,
  },
};

const DEFAULT_POT_STYLE: DipPotStyle = { fill: "#FDFBF2", flecks: null };

function jumpToDipCard(slug: string): void {
  window.history.replaceState(null, "", `#dip-${slug}`);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}

function shortDipName(name: string): string {
  return name.replace(/^California Sauce \/ Mayo$/, "Cali Mayo");
}

function DipPot({
  dip,
  index,
  reduce,
}: {
  dip: Dip;
  index: number;
  reduce: boolean;
}) {
  const style = DIP_POT_STYLES[dip.slug] ?? DEFAULT_POT_STYLE;

  const initial = reduce
    ? { opacity: 0 }
    : { opacity: 0, scale: 0.55, rotate: -14 };
  const animate = reduce
    ? { opacity: 1 }
    : { opacity: 1, scale: 1, rotate: 0 };
  const transition = reduce
    ? { duration: 0.3, delay: 0.1 + index * 0.1 }
    : {
        type: "spring" as const,
        stiffness: 420,
        damping: 10,
        delay: 0.2 + index * 0.15,
      };

  return (
    <motion.button
      type="button"
      onClick={() => jumpToDipCard(dip.slug)}
      aria-label={`Jump to ${dip.name}`}
      initial={initial}
      animate={animate}
      transition={transition}
      className="group flex flex-col items-center gap-2"
    >
      <svg
        viewBox="0 0 56 56"
        aria-hidden
        className="h-14 w-14 drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)] transition-transform group-hover:scale-105"
      >
        {/* Pot shell */}
        <circle cx="28" cy="28" r="26" fill="#E8E4DB" />
        {/* Pot inner rim */}
        <circle cx="28" cy="28" r="23" fill="#F7F3E8" />
        {/* Dip surface */}
        <circle cx="28" cy="28" r="21" fill={style.fill} />
        {/* Flecks / specks */}
        {style.flecks?.dots.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={style.flecks!.r}
            fill={style.flecks!.color}
          />
        ))}
        {/* Highlight */}
        <ellipse
          cx="22"
          cy="22"
          rx="5"
          ry="2.5"
          fill="#FFFFFF"
          opacity="0.42"
        />
      </svg>
      <span className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-brand-pink/80 transition-colors group-hover:text-brand-white">
        {shortDipName(dip.name)}
      </span>
    </motion.button>
  );
}

export function WheelResult({ winner, onSpinAgain }: WheelResultProps) {
  const reduce = useReducedMotion();
  const reduceBool = reduce ?? false;
  const dips = winner ? suggestDipsFor(winner, 2) : [];
  const [ref, inView] = useAnimateInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        "mt-8 w-full max-w-lg",
        !inView && "paused-anims"
      )}
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        {winner && (
          <motion.div
            key={winner.slug}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="sauce-shimmer relative overflow-hidden rounded-2xl border border-brand-pink/40 bg-brand-pink/[0.06] p-6 text-center backdrop-blur-sm md:p-8"
          >
            {/* Pulsing pink↔red glow ring — in its own layer so sauce-shimmer
                owns ::before on the parent without conflict. */}
            <div
              aria-hidden="true"
              className="animate-glow-ring pointer-events-none absolute inset-0 rounded-2xl"
            />
            {/* Winner-reveal flash — one-shot pink wash on each new winner,
                keyed on winner.slug via the parent AnimatePresence remount. */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-2xl bg-brand-pink"
              initial={{ opacity: 0 }}
              animate={reduce ? { opacity: 0 } : { opacity: [0, 0.2, 0] }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { duration: 0.42, ease: "easeInOut", delay: 0.06 }
              }
            />
            <p className="relative font-display text-xs font-bold uppercase tracking-[0.35em] text-brand-pink/80">
              The Lab picked
            </p>
            <h3 className="neon-pink relative mt-2 font-display text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-brand-pink md:text-5xl">
              {winner.name}
            </h3>
            <div className="relative mt-3 flex items-center justify-center gap-3">
              <HeatFlames heat={winner.heat} size="md" />
              {winner.limitedEdition && (
                <span className="rounded-full border border-brand-pink/60 px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-brand-pink">
                  Limited Edition
                </span>
              )}
            </div>
            {winner.shortDescription && (
              <p className="relative mx-auto mt-4 max-w-md font-body text-base leading-relaxed text-brand-white/80">
                {winner.shortDescription}
              </p>
            )}
            {dips.length > 0 && (
              <div className="relative mt-5">
                <p className="font-display text-[11px] font-bold uppercase tracking-[0.3em] text-brand-pink/70">
                  Dip it in…
                </p>
                <div className="mt-3 flex items-start justify-center gap-6">
                  {dips.map((dip, i) => (
                    <DipPot
                      key={dip.slug}
                      dip={dip}
                      index={i}
                      reduce={reduceBool}
                    />
                  ))}
                </div>
              </div>
            )}
            <div className="relative mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <OrderTriggerButton size="lg">
                Get these wings
              </OrderTriggerButton>
              {/* One-shot "pop" on each new winner — keyed via the parent
                  AnimatePresence remount, so a scale cycle fires once per spin. */}
              <motion.span
                initial={reduce ? false : { scale: 1 }}
                animate={reduce ? undefined : { scale: [1, 1.08, 1] }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { duration: 0.32, ease: "easeInOut", delay: 0.1 }
                }
                className="inline-flex"
              >
                <BrandButton variant="outline" onClick={onSpinAgain}>
                  Spin again
                </BrandButton>
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
