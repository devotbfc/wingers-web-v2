import { BrandButton } from "@/components/brand/BrandButton";
import { VideoHero } from "@/components/media/VideoHero";
import { OrderTriggerButton } from "@/components/sections/order-panel/OrderTriggerButton";
import { StickerRing } from "./StickerRing";

const HERO_VIDEO_MP4_MOBILE = "/brand/videos/hero-loop.mp4";
const HERO_VIDEO_MP4_DESKTOP = "/brand/videos/hero-loop-desktop.mp4";
const HERO_POSTER_SRC = "/brand/photos/hero/hero-poster.webp";

export function Hero() {
  return (
    <section
      aria-label="Hero"
      className="wingers-wrap pt-2 pb-8 md:pt-12 md:pb-16"
    >
      <div className="grid gap-6 md:grid-cols-2 md:items-center md:gap-x-12 md:gap-y-7">
        {/* Status chip — grid row 1 both breakpoints */}
        <div className="md:col-start-1 md:row-start-1">
          <span
            aria-hidden="true"
            className="inline-flex h-[30px] items-center gap-2 rounded-full bg-brand-white px-3 font-body text-[12px] font-semibold tracking-[0.04em] md:h-[34px] md:px-3.5 md:text-[13px]"
          >
            <span className="h-2 w-2 rounded-full bg-[#2BB673]" />
            Milton Keynes &amp; Northampton
          </span>
        </div>

        {/* H1 — grid row 2 both breakpoints */}
        <h1
          className="font-display font-extrabold uppercase leading-[0.86] tracking-[-0.03em] text-brand-black text-[clamp(3.5rem,16vw,4rem)] md:col-start-1 md:row-start-2 md:text-[clamp(3.5rem,8.5vw,8.5rem)] md:leading-[0.84] md:tracking-[-0.035em]"
        >
          Dip it.
          <br />
          Bite it.
          <br />
          Love it.
        </h1>

        {/* Media — mobile row 3 (auto), desktop spans column 2 across rows 1–4 */}
        <div className="relative md:col-start-2 md:row-start-1 md:row-span-4 md:self-center">
          <VideoHero
            mobileMp4Src={HERO_VIDEO_MP4_MOBILE}
            desktopMp4Src={HERO_VIDEO_MP4_DESKTOP}
            poster={HERO_POSTER_SRC}
            className="h-[440px] w-full overflow-hidden bg-lab-black [border-radius:999px_999px_32px_32px] md:h-[clamp(420px,48vw,680px)] md:[border-radius:999px_999px_40px_40px]"
          />
          <StickerRing
            size={112}
            className="absolute -bottom-5 -right-1.5 md:hidden"
          />
          <StickerRing
            size={150}
            className="absolute hidden md:block md:-left-7 md:bottom-10"
          />
        </div>

        {/* Supporting line — mobile row 4 (auto), desktop row 3 col 1 */}
        <p className="font-body text-base leading-relaxed text-brand-black/70 md:col-start-1 md:row-start-3 md:max-w-[460px] md:text-[19px] md:leading-[1.55]">
          Fresh, never frozen. Hand-breaded halal buttermilk fried chicken.
        </p>

        {/* CTA pair — mobile row 5, desktop row 4 col 1 */}
        <div className="grid grid-cols-2 gap-3 md:col-start-1 md:row-start-4 md:flex md:flex-wrap md:gap-3.5">
          <OrderTriggerButton variant="primary" size="lg">
            Get Stuck In
          </OrderTriggerButton>
          <BrandButton variant="outline" size="lg" href="/locations">
            Find Us
          </BrandButton>
        </div>
      </div>
    </section>
  );
}
