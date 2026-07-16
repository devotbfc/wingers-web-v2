import type React from "react";
import { BrandButton } from "@/components/brand/BrandButton";
import { VideoHero } from "@/components/media/VideoHero";
import { OrderTriggerButton } from "@/components/sections/order-panel/OrderTriggerButton";

const HERO_VIDEO_SRC = "/brand/videos/hero-loop.mp4";
const HERO_POSTER_SRC =
  "/brand/photos/hero/Gemini_Generated_Image_cts8w2cts8w2cts8.png";

const HEADLINE_LINES = ["DIP IT.", "BITE IT.", "LOVE IT."] as const;

const DOUBLED_STYLE = {
  "--dh-fill": "var(--color-brand-pink)",
  "--dh-shadow": "var(--color-brand-red)",
  "--dh-offset": "0.06em",
} as React.CSSProperties;

export function Hero() {
  return (
    <section
      aria-label="Hero"
      className="section-dark relative h-[100svh] min-h-[640px] w-full overflow-hidden"
    >
      <VideoHero
        src={HERO_VIDEO_SRC}
        poster={HERO_POSTER_SRC}
        className="absolute inset-0 h-full w-full"
      />

      <div aria-hidden="true" className="absolute inset-0 bg-brand-black/60" />

      <div className="relative z-10 flex h-full w-full flex-col justify-end px-5 pb-12 pt-24 sm:px-8">
        <h1 className="font-display font-extrabold leading-[0.86] tracking-tight">
          <span className="sr-only">Dip it. Bite it. Love it.</span>
          {HEADLINE_LINES.map((line) => (
            <span
              key={line}
              aria-hidden="true"
              data-text={line}
              className="doubled-heading block text-[clamp(3.75rem,22vw,9rem)]"
              style={DOUBLED_STYLE}
            >
              {line}
            </span>
          ))}
        </h1>

        <p className="mt-6 max-w-md font-body text-base leading-relaxed text-brand-white sm:text-lg">
          Halal buttermilk fried chicken. Milton Keynes &amp; Northampton.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <OrderTriggerButton
            variant="secondary"
            size="lg"
            className="rounded-full"
          >
            Get Stuck In
          </OrderTriggerButton>
          <BrandButton
            variant="primary"
            size="lg"
            href="/locations"
            className="rounded-full"
          >
            Find Us
          </BrandButton>
        </div>
      </div>
    </section>
  );
}
