import { BrandLogo } from "@/components/brand/BrandLogo";
import { BrandButton } from "@/components/brand/BrandButton";
import { DoubledHeading } from "@/components/typography/DoubledHeading";
import { VideoHero } from "@/components/media/VideoHero";
import { OrderTriggerButton } from "./order-panel/OrderTriggerButton";

const HERO_VIDEO_SRC = "/brand/videos/hero-loop.mp4";
const HERO_POSTER_SRC =
  "/brand/photos/hero/Gemini_Generated_Image_cts8w2cts8w2cts8.png";

export function HeroSection() {
  return (
    <section
      aria-label="Hero"
      className="section-dark relative h-svh min-h-[640px] w-full overflow-hidden"
    >
      <VideoHero
        src={HERO_VIDEO_SRC}
        poster={HERO_POSTER_SRC}
        className="absolute inset-0 h-full w-full"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/60"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 60%, rgba(255,111,181,0.35) 0%, rgba(255,45,45,0.2) 45%, transparent 75%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <BrandLogo
          variant="pink"
          type="mark"
          width={720}
          height={720}
          className="w-[min(80vw,720px)] h-auto opacity-[0.08]"
        />
      </div>

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center">
        <DoubledHeading
          as="h1"
          text="DIP IT. BITE IT. LOVE IT."
          fillColor="brand-white"
          shadowColor="brand-pink"
          offsetEm="0.08em"
          className="font-display font-extrabold uppercase leading-[0.95] tracking-tight text-[clamp(2.75rem,9vw,7.5rem)] max-w-[18ch]"
        />

        <p className="mt-8 max-w-xl font-body text-lg md:text-xl leading-relaxed text-brand-white/90">
          Buttermilk fried chicken. Milton Keynes &amp; Northampton.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <OrderTriggerButton size="lg">Order</OrderTriggerButton>
          <BrandButton href="/locations" variant="secondary" size="lg">
            Find a location
          </BrandButton>
        </div>
      </div>
    </section>
  );
}
