"use client";

import { useCallback, useRef } from "react";
import { FlaskGlyph } from "@/components/ui/FlaskGlyph";
import { CORE_COUNT, numberToWord } from "@/lib/flavours";
import { SauceEdgeAccent } from "./SauceEdgeAccent";
import { WheelSpinner, type WheelSpinnerHandle } from "./WheelSpinner";

// Two-column hero on md+ (headline left, wheel right); stacks on mobile
// with the wheel below the headline. The pink "Spin the wheel" button and
// the central wheel hub both trigger the same WheelSpinner.spin() — one
// spin at a time (guarded inside WheelSpinner). The hero carries id="spin"
// so any future deep link to #spin lands on the hero + wheel.
export function FlavourLabHero() {
  const wheelRef = useRef<WheelSpinnerHandle>(null);

  const handleSpinClick = useCallback(() => {
    wheelRef.current?.spin();
  }, []);

  return (
    <section
      id="spin"
      className="relative overflow-hidden pt-28 pb-10 md:pt-32 md:pb-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(600px circle at 50% -5%, rgba(255,111,181,0.18), transparent 60%), radial-gradient(500px circle at 100% 40%, rgba(255,45,45,0.12), transparent 60%)",
        }}
      />

      <SauceEdgeAccent className="absolute right-0 top-10 z-0 h-14 w-40 md:top-16 md:h-20 md:w-56" />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 md:grid-cols-2 md:gap-12 md:px-8">
        <div className="flex flex-col items-start text-left">
          <p className="neon-red inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.35em] text-brand-red">
            <span>Flavour Lab</span>
            <FlaskGlyph className="h-[1.1em] w-[1.1em] shrink-0" strokeWidth={2.75} />
          </p>

          <h1 className="neon-pink mt-4 font-display font-extrabold uppercase leading-[0.88] tracking-[-0.02em] text-brand-pink text-[clamp(3rem,16vw,4rem)] md:text-[clamp(3.5rem,8.5vw,8.5rem)]">
            Can&rsquo;t
            <br />
            decide?
          </h1>

          <p className="mt-6 font-body text-lg leading-relaxed text-brand-white md:text-xl">
            Spin the wheel. Find your flavour. Get stuck in.
          </p>
          <p className="mt-2 font-body text-sm leading-relaxed text-brand-white/70 md:text-base">
            Tap the logo or the button.
          </p>

          <p className="mt-5 font-body text-base leading-relaxed text-brand-white/60">
            {`${numberToWord(CORE_COUNT)} permanent sauces and rubs plus limited-edition drops rotating through the Lab across Milton Keynes and Northampton.`}
          </p>

          <button
            type="button"
            onClick={handleSpinClick}
            className="mt-7 inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-brand-pink px-8 font-display text-base font-extrabold uppercase tracking-[0.1em] text-brand-black transition-colors hover:bg-brand-pink/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-pink md:min-h-[56px] md:w-auto md:text-lg"
          >
            Spin the wheel
          </button>
        </div>

        <div className="flex items-center justify-center md:justify-end">
          <WheelSpinner
            ref={wheelRef}
            className="flex w-full flex-col items-center"
          />
        </div>
      </div>
    </section>
  );
}
