import Link from "next/link";
import { WheelSpinner } from "@/components/sections/flavour-lab/WheelSpinner";

/**
 * Home Flavour Lab section — Batch J boards. Interactive wheel inside a
 * dark rounded card on the warm-grey home ground. Shares WheelSpinner
 * with /flavour-lab so any upgrades there (optical centring, result
 * card styling) land here automatically.
 */
export function FlavourLabTeaser() {
  return (
    <section
      aria-labelledby="home-flavour-lab-heading"
      className="wingers-wrap pb-10 md:pb-16"
    >
      <div className="relative overflow-hidden rounded-[32px] bg-lab-black px-5 pb-6 pt-7 text-brand-white md:rounded-[40px] md:px-10 md:pt-14 md:pb-12">
        <div className="flex flex-col items-center gap-4 text-center md:gap-5">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-brand-pink">
            Flavour Lab
          </p>
          <h2
            id="home-flavour-lab-heading"
            className="neon-pink font-display font-extrabold uppercase leading-[0.88] tracking-tight text-brand-pink text-[clamp(3rem,15vw,3.5rem)] md:text-[clamp(3.5rem,7vw,7rem)]"
          >
            Can&rsquo;t
            <br />
            decide?
          </h2>
          <p className="max-w-md font-body text-[15px] leading-[1.5] text-brand-white/85 md:text-lg">
            Ten flavours on the wheel. Spin it (or tap the logo) and we&rsquo;ll pick for you.
          </p>

          <WheelSpinner className="mt-4 flex w-full flex-col items-center md:mt-6" />

          <Link
            href="/flavour-lab"
            className="mt-2 font-body text-sm font-semibold text-brand-white underline underline-offset-4 hover:text-brand-pink"
          >
            See every flavour, drop and dip →
          </Link>
        </div>
      </div>
    </section>
  );
}
