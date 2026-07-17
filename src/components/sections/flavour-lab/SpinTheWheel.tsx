"use client";

import { useCallback, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { SPINNABLE_FLAVOURS, type Flavour } from "@/lib/flavours";
import { Wheel, computeTargetRotation } from "./Wheel";
import { WheelResult } from "./WheelResult";
import { SauceEdgeAccent } from "./SauceEdgeAccent";

const SEGMENTS = SPINNABLE_FLAVOURS;

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
      className="relative overflow-hidden py-16 md:py-24"
      aria-labelledby="spin-the-wheel-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(700px circle at 50% 50%, rgba(255,111,181,0.10), transparent 60%)",
        }}
      />

      <SauceEdgeAccent className="absolute right-0 top-6 z-0 h-14 w-40 md:top-10 md:h-20 md:w-56" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 md:px-8">
        <p className="font-display text-[11px] font-bold uppercase tracking-[0.35em] text-brand-pink/80">
          Can&rsquo;t decide?
        </p>
        <h2
          id="spin-the-wheel-heading"
          className="mt-2 text-center font-display text-[clamp(2.5rem,7vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-brand-white"
        >
          Spin the <span className="neon-pink text-brand-pink">wheel</span>
        </h2>
        <p className="mt-3 max-w-md text-center font-body text-base leading-relaxed text-brand-white/60">
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
