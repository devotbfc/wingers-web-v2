import Image from "next/image";
import { OrderTriggerButton } from "@/components/sections/order-panel/OrderTriggerButton";
import { getCurrentLimitedEdition } from "@/lib/flavours";

// There is no dedicated mask shape SVG in public/brand/logo — the W-mark PNG
// (transparent background) stands in for the mask. The alpha channel defines
// the cutout; the content image behind renders only where the W is opaque.
const W_MASK_URL = "/brand/logo/wingers-mark-512.png";

export function KatsuDrop() {
  const flavour = getCurrentLimitedEdition();
  if (!flavour) return null;

  return (
    <section
      aria-labelledby="le-drop-heading"
      className="wingers-wrap pt-6 pb-10 md:pt-8 md:pb-16"
    >
      <div className="rounded-[32px] bg-lab-black p-6 text-brand-white md:grid md:grid-cols-2 md:gap-10 md:items-center md:rounded-[40px] md:p-[clamp(1.5rem,4vw,3.5rem)]">
        {/* W-masked drop image. The mask is the Wingers W; the photo is a
            temporary stand-in until a per-flavour LE photo lands. Flagged
            data-todo so we can grep for it when the owed photo arrives. */}
        <div className="flex h-[220px] items-center justify-center md:h-[340px]">
          <div
            data-todo="le-photo"
            className="relative h-[200px] w-full md:h-[320px]"
            style={{
              WebkitMaskImage: `url(${W_MASK_URL})`,
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              WebkitMaskSize: "contain",
              maskImage: `url(${W_MASK_URL})`,
              maskRepeat: "no-repeat",
              maskPosition: "center",
              maskSize: "contain",
            }}
          >
            <Image
              src="/brand/photos/hero/hero-poster.webp"
              alt={`${flavour.name} drop`}
              fill
              sizes="(min-width: 768px) 500px, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-4 md:mt-0 md:gap-[18px]">
          <div className="flex items-center justify-between gap-3">
            <span className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-brand-pink">
              Limited drop
            </span>
            <span className="font-body text-xs font-semibold uppercase tracking-wide text-brand-white/70">
              While it lasts
            </span>
          </div>
          <h2
            id="le-drop-heading"
            className="font-display font-extrabold uppercase leading-[0.9] tracking-tight text-[clamp(3rem,13vw,4rem)] md:text-[clamp(3.5rem,7vw,6.5rem)]"
          >
            {flavour.name}
          </h2>
          {flavour.shortDescription && (
            <p className="font-body text-base leading-relaxed text-brand-white/85 md:text-lg">
              {flavour.shortDescription}
            </p>
          )}
          <OrderTriggerButton
            variant="primary"
            size="lg"
            wrapperClassName="w-full md:w-auto"
          >
            Order
          </OrderTriggerButton>
        </div>
      </div>
    </section>
  );
}
