"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BrandButton } from "@/components/brand/BrandButton";
import { OrderTriggerButton } from "@/components/sections/order-panel/OrderTriggerButton";
import type { Flavour } from "@/lib/flavours";
import { HeatFlames } from "./FlameIcon";

interface WheelResultProps {
  winner: Flavour | null;
  onSpinAgain: () => void;
}

export function WheelResult({ winner, onSpinAgain }: WheelResultProps) {
  const reduce = useReducedMotion();
  return (
    <div className="mt-8 w-full max-w-lg" aria-live="polite">
      <AnimatePresence mode="wait">
        {winner && (
          <motion.div
            key={winner.slug}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="glow-edge-pink rounded-2xl border border-brand-pink/40 bg-brand-pink/[0.06] p-6 text-center backdrop-blur-sm md:p-8"
          >
            <p className="font-display text-xs font-bold uppercase tracking-[0.35em] text-brand-pink/80">
              The Lab picked
            </p>
            <h3 className="neon-pink mt-2 font-display text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-brand-pink md:text-5xl">
              {winner.name}
            </h3>
            <div className="mt-3 flex items-center justify-center gap-3">
              <HeatFlames heat={winner.heat} size="md" />
              {winner.limitedEdition && (
                <span className="rounded-full border border-brand-pink/60 px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-brand-pink">
                  Limited Edition
                </span>
              )}
            </div>
            {winner.shortDescription && (
              <p className="mx-auto mt-4 max-w-md font-body text-base leading-relaxed text-brand-white/80">
                {winner.shortDescription}
              </p>
            )}
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <OrderTriggerButton size="lg">
                Get these wings
              </OrderTriggerButton>
              <BrandButton variant="ghost" onClick={onSpinAgain}>
                Spin again
              </BrandButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
