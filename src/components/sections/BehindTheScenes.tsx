// TODO(behind-scenes-photography): drop real photos into
// public/brand/photos/behind-scenes/ then swap this placeholder grid for
// <ImageCarousel /> with the real image list.

import { BrandLogo } from "@/components/brand/BrandLogo";
import { DoubledHeading } from "@/components/typography/DoubledHeading";

const PLACEHOLDER_TILES = [
  { aspect: "aspect-[4/5]" },
  { aspect: "aspect-square" },
  { aspect: "aspect-video" },
] as const;

export function BehindTheScenes() {
  return (
    <section
      aria-labelledby="behind-the-scenes-heading"
      className="bg-brand-white py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="max-w-3xl">
          <DoubledHeading
            as="h2"
            text="BEHIND THE BITE."
            fillColor="brand-red"
            shadowColor="brand-pink"
            offsetEm="0.06em"
            className="font-display font-extrabold uppercase leading-[0.95] tracking-tight text-[clamp(2.5rem,7vw,5rem)]"
          />
          <p className="mt-6 font-body text-lg md:text-xl leading-relaxed text-brand-black">
            Buttermilk brined overnight. Fried to order in every branch. This
            is the graft behind the crunch.
          </p>
        </div>

        <div className="mt-10 md:mt-14 flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible">
          {PLACEHOLDER_TILES.map((tile, i) => (
            <div
              key={i}
              className={`relative overflow-hidden bg-brand-pink snap-start shrink-0 w-[78%] md:w-auto ${tile.aspect}`}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <BrandLogo
                  variant="white"
                  type="mark"
                  width={160}
                  height={160}
                  className="h-24 w-24 md:h-32 md:w-32"
                />
              </div>
              <span className="absolute bottom-4 left-4 font-mono text-xs uppercase tracking-widest text-brand-white/80">
                Kitchen shots landing soon
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
