import dynamic from "next/dynamic";
import Image from "next/image";

const LoyaltySignupForm = dynamic(() =>
  import("@/components/forms/LoyaltySignupForm").then((m) => m.LoyaltySignupForm),
);

/**
 * Home Flavour Club strip (Batch J). Pink rounded card with the W-mark,
 * headline, body copy and the existing LoyaltySignupForm (email + first
 * name + consent) mounted unchanged. Server action + source value +
 * Lead pixel wire-up are intentionally not touched here — only visuals.
 */
export function FlavourClubStrip() {
  return (
    <section
      id="flavour-club-strip"
      aria-labelledby="flavour-club-heading"
      className="wingers-wrap pt-10 pb-20 md:pt-16 md:pb-28"
    >
      <div className="rounded-[32px] bg-brand-pink p-7 pb-9 text-brand-black md:rounded-[40px] md:p-12 md:pb-14">
        <div className="flex flex-col gap-3.5">
          <Image
            src="/brand/logo/wingers-mark-512.png"
            alt=""
            width={56}
            height={56}
            className="h-14 w-14"
            style={{ filter: "brightness(0)" }}
          />
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-brand-black">
            The Flavour Club
          </p>
          <h2
            id="flavour-club-heading"
            className="font-display font-extrabold uppercase leading-[0.9] tracking-tight text-brand-black text-[clamp(2.25rem,10vw,2.5rem)] md:text-[clamp(2.75rem,6vw,5rem)]"
          >
            First dibs on every drop.
          </h2>
          <p className="font-body text-[15px] leading-[1.5] text-brand-black md:text-lg">
            New flavours, secret menu nights and the odd freebie, straight to your inbox.
          </p>
          <LoyaltySignupForm source="homepage" />
        </div>
      </div>
    </section>
  );
}
