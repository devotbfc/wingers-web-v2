import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type React from "react";

const HEADLINE_LINES = ["SAUCE IS NOT", "OPTIONAL."] as const;

const DOUBLED_STYLE = {
  "--dh-fill": "var(--color-brand-white)",
  "--dh-shadow": "var(--color-brand-black)",
  "--dh-offset": "0.06em",
} as React.CSSProperties;

export function SaucePanel() {
  return (
    <section
      aria-labelledby="sauce-heading"
      data-todo="assets"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-brand-pink"
    >
      {/* Placeholder composition — the red block stands in for the sauce photo
          until public/brand/photos/sauces/ is populated. Hard-cropped rectangle,
          no shadow, no rounding. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/3 w-full bg-brand-red md:inset-y-0 md:left-auto md:right-0 md:h-full md:w-2/3"
      >
        <Image
          src="/brand/photos/placeholders/P01.png"
          alt=""
          fill
          sizes="(min-width: 768px) 66vw, 100vw"
          className="object-cover"
          data-photo-slot="P01"
        />
      </div>

      {/* Bottom scrim for legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent"
      />

      <div className="relative z-10 flex h-full w-full flex-col justify-end gap-6 px-5 pb-12 sm:px-8">
        <h2
          id="sauce-heading"
          className="font-display font-extrabold uppercase leading-[0.9] tracking-tight"
        >
          <span className="sr-only">Sauce is not optional.</span>
          {HEADLINE_LINES.map((line) => (
            <span
              key={line}
              aria-hidden="true"
              data-text={line}
              className="doubled-heading block text-[clamp(2.75rem,12vw,6rem)]"
              style={DOUBLED_STYLE}
            >
              {line}
            </span>
          ))}
        </h2>

        <Link
          href="/menu"
          className="inline-flex min-h-11 items-center gap-2 self-start rounded-full bg-brand-white px-6 font-display text-base font-bold uppercase tracking-wide text-brand-black transition-colors hover:bg-brand-pink"
        >
          Our Flavours
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
