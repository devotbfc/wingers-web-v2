import Link from "next/link";
import { FlaskGlyph } from "@/components/ui/FlaskGlyph";
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

          {/* Quiet outline pill — pink border + pink label (and flask) by
              default; fills pink with black label on hover-capable devices
              only. Size md (44px hit target), auto width, centred by the
              parent's items-center. Not a BrandButton variant — rebuilt
              inline because none of the existing variants match this
              transparent-on-dark colourway. */}
          <Link
            href="/flavour-lab"
            className="mx-auto mt-2 inline-flex h-11 min-h-11 items-center gap-2 rounded-full border-2 border-brand-pink bg-transparent px-6 font-display text-[15px] font-extrabold uppercase tracking-[0.02em] text-brand-pink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-pink [@media(hover:hover)]:transition-colors [@media(hover:hover)]:duration-200 [@media(hover:hover)]:hover:bg-brand-pink [@media(hover:hover)]:hover:text-brand-black"
          >
            Every flavour
            <FlaskGlyph
              strokeWidth={2.5}
              className="h-[1.15em] w-[1.15em] shrink-0"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
