import Image from "next/image";
import { OrderTriggerButton } from "@/components/sections/order-panel/OrderTriggerButton";
import type { Flavour } from "@/lib/flavours";

const W_MARK = "/brand/logo/wingers-mark-512.png";

interface MenuKatsuHeroProps {
  flavour: Flavour | null | undefined;
}

/**
 * Menu-page LE spotlight (Batch J). A compact dark card with the W-mark
 * on a pink arch thumbnail and a single ORDER button. Gated at the call
 * site on getCurrentLimitedEdition() — this component additionally guards
 * the flavour's status so an inactive record never renders. Replaces the
 * old purple LimitedEditionSpotlight on /menu only.
 */
export function MenuKatsuHero({ flavour }: MenuKatsuHeroProps) {
  if (!flavour || flavour.status !== "active") return null;

  return (
    <section
      aria-label={`Limited edition: ${flavour.name}`}
      className="mx-auto mt-6 w-full max-w-6xl px-4 md:px-8"
    >
      <div className="flex items-stretch gap-4 rounded-[26px] bg-lab-black p-4 text-brand-white md:gap-6 md:rounded-[32px] md:p-6">
        {/* Pink arch tile with the Wingers W mark — the Flavour type
            doesn't carry a photo, so the pink-W fallback is the shipping
            visual until per-flavour imagery lands. Same pattern as the
            MenuItemCard missing-photo fallback (J2.2). */}
        <div
          data-todo="le-hero-photo"
          className="relative h-[120px] w-[104px] shrink-0 overflow-hidden bg-brand-pink [border-radius:999px_999px_18px_18px] md:h-[140px] md:w-[120px]"
        >
          <Image
            src={W_MARK}
            alt=""
            fill
            sizes="(min-width: 768px) 120px, 104px"
            className="object-contain p-6"
            style={{ filter: "brightness(0)" }}
          />
        </div>
        <div className="flex flex-1 flex-col justify-center gap-2 md:gap-3">
          <span className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-pink">
            Limited drop
          </span>
          <h2 className="font-display font-extrabold uppercase leading-[0.92] tracking-tight text-[clamp(1.75rem,7vw,2rem)] md:text-[clamp(2rem,4vw,2.75rem)]">
            {flavour.name}
          </h2>
          {flavour.shortDescription && (
            <p className="line-clamp-2 font-body text-sm leading-relaxed text-brand-white/85 md:text-base">
              {flavour.shortDescription}
            </p>
          )}
          <div className="mt-1">
            <OrderTriggerButton variant="primary" size="md">
              Order
            </OrderTriggerButton>
          </div>
        </div>
      </div>
    </section>
  );
}
