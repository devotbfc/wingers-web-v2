"use client";

import { useCallback, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { CORE_FLAVOURS, LE_FLAVOURS, type Flavour } from "@/lib/flavours";
import { Wheel, computeTargetRotation } from "./Wheel";
import { WheelResult } from "./WheelResult";

const SEGMENTS: Flavour[] = [
  ...CORE_FLAVOURS,
  ...LE_FLAVOURS.filter((f) => f.shortDescription),
];

if (process.env.NODE_ENV !== "production" && SEGMENTS.length !== 13) {
  console.warn(
    `[FlavourLab] Expected 13 wheel segments, got ${SEGMENTS.length}. Update SEGMENTS filter.`
  );
}

export function SpinTheWheel() {
  const reduce = useReducedMotion();
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<Flavour | null>(null);
  const pendingWinnerRef = useRef<Flavour | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const spin = useCallback(() => {
    if (spinning) return;
    setWinner(null);
    const winnerIndex = Math.floor(Math.random() * SEGMENTS.length);
    pendingWinnerRef.current = SEGMENTS[winnerIndex];
    const fullSpins = reduce ? 0 : 5 + Math.floor(Math.random() * 3);
    const target = computeTargetRotation(
      rotation,
      winnerIndex,
      SEGMENTS.length,
      fullSpins
    );
    setSpinning(true);
    setRotation(target);
    if (reduce) {
      setSpinning(false);
      setWinner(pendingWinnerRef.current);
      pendingWinnerRef.current = null;
    }
  }, [rotation, spinning, reduce]);

  const handleAnimationComplete = useCallback(() => {
    if (pendingWinnerRef.current) {
      setWinner(pendingWinnerRef.current);
      pendingWinnerRef.current = null;
      setSpinning(false);
    }
  }, []);

  const spinAgain = useCallback(() => {
    sectionRef.current?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
    spin();
  }, [spin, reduce]);

  return (
    <section
      ref={sectionRef}
      className="bg-brand-white py-16 md:py-24"
      aria-labelledby="spin-the-wheel-heading"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 md:px-8">
        <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-brand-red">
          Can&rsquo;t decide?
        </p>
        <h2
          id="spin-the-wheel-heading"
          className="mt-2 text-center font-display text-[clamp(2.5rem,7vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-brand-black"
        >
          Spin the wheel
        </h2>
        <p className="mt-3 max-w-md text-center font-body text-base leading-relaxed text-brand-black/70">
          Let the Lab pick your flavour. Thirteen sauces and rubs, ready to go.
        </p>

        <div className="mt-10">
          <Wheel
            segments={SEGMENTS}
            rotation={rotation}
            spinning={spinning}
            onSpinClick={spin}
            onSpinComplete={handleAnimationComplete}
          />
        </div>

        <WheelResult winner={winner} onSpinAgain={spinAgain} />
      </div>
    </section>
  );
}
