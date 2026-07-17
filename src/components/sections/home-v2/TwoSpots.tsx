import Image from "next/image";
import { MapPin } from "lucide-react";
import type React from "react";
import { LocationOpenBadge } from "@/components/locations/LocationOpenBadge";
import { OrderTriggerButton } from "@/components/sections/order-panel/OrderTriggerButton";
import { LOCATIONS, type Location } from "@/lib/locations";

const PHOTO_SLOT_BY_SLUG: Record<string, string> = {
  "milton-keynes": "P02",
  northampton: "P03",
};

type SpotTheme = {
  panelBg: string;
  bodyText: string;
  photoFallbackBg: string;
  directionsClasses: string;
};

const THEME_BY_SLUG: Record<string, SpotTheme> = {
  "milton-keynes": {
    panelBg: "bg-brand-pink",
    bodyText: "text-brand-black",
    photoFallbackBg: "bg-brand-red",
    directionsClasses: "bg-brand-black text-brand-white hover:bg-brand-black/90",
  },
  northampton: {
    panelBg: "bg-brand-black",
    bodyText: "text-brand-white",
    photoFallbackBg: "bg-brand-pink",
    directionsClasses: "bg-brand-white text-brand-black hover:bg-brand-white/90",
  },
};

const DEFAULT_THEME: SpotTheme = {
  panelBg: "bg-brand-black",
  bodyText: "text-brand-white",
  photoFallbackBg: "bg-brand-pink",
  directionsClasses: "bg-brand-white text-brand-black hover:bg-brand-white/90",
};

function mapsUrlFor(loc: Location): string {
  const query = `${loc.name} ${loc.address.postcode}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function fullAddress(loc: Location): string {
  return `${loc.address.street}, ${loc.address.city}, ${loc.address.postcode}`;
}

function headlineDoubledStyle(bodyText: string): React.CSSProperties {
  const fill =
    bodyText === "text-brand-black"
      ? "var(--color-brand-black)"
      : "var(--color-brand-white)";
  return {
    "--dh-fill": fill,
    "--dh-shadow": "var(--color-brand-red)",
    "--dh-offset": "0.06em",
  } as React.CSSProperties;
}

function SpotBlock({ spot }: { spot: Location }) {
  const theme = THEME_BY_SLUG[spot.slug] ?? DEFAULT_THEME;
  const headlineText = spot.name.toUpperCase();
  const photoSlot = PHOTO_SLOT_BY_SLUG[spot.slug];

  return (
    <div className="flex flex-col lg:flex-row">
      <div
        data-todo="assets"
        className={`relative aspect-[4/3] w-full ${theme.photoFallbackBg} lg:aspect-auto lg:h-auto lg:w-1/2`}
        aria-hidden="true"
      >
        {photoSlot && (
          <Image
            src={`/brand/photos/placeholders/${photoSlot}.png`}
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            data-photo-slot={photoSlot}
          />
        )}
      </div>

      <div
        className={`${theme.panelBg} ${theme.bodyText} w-full overflow-hidden px-6 py-12 lg:w-1/2 lg:px-12 lg:py-20`}
      >
        <div className="flex h-full flex-col justify-center gap-6">
          <LocationOpenBadge location={spot} size="sm" />

          <h3
            data-text={headlineText}
            className="doubled-heading block font-display font-extrabold uppercase leading-[0.85] tracking-tight text-[clamp(2.75rem,13vw,6rem)]"
            style={headlineDoubledStyle(theme.bodyText)}
          >
            {headlineText}
          </h3>

          <p
            className={`flex items-start gap-2 font-body text-lg leading-relaxed ${theme.bodyText}`}
          >
            <MapPin
              className="mt-1 h-5 w-5 shrink-0"
              aria-hidden="true"
            />
            <span className="text-pretty">{fullAddress(spot)}</span>
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <OrderTriggerButton
              variant="primary"
              size="lg"
              className="rounded-full"
              preferredLocationSlug={spot.slug}
            >
              Order
            </OrderTriggerButton>
            <a
              href={mapsUrlFor(spot)}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex min-h-11 items-center justify-center rounded-full px-8 font-display text-base font-bold uppercase tracking-wide transition-colors ${theme.directionsClasses}`}
            >
              Directions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const TWO_SPOTS_DOUBLED_STYLE = {
  "--dh-fill": "var(--color-brand-black)",
  "--dh-shadow": "var(--color-brand-red)",
  "--dh-offset": "0.06em",
} as React.CSSProperties;

export function TwoSpots() {
  return (
    <section aria-labelledby="two-spots-heading" className="bg-brand-white">
      <div className="px-6 pb-8 pt-16 lg:px-12 lg:pt-24">
        <p className="mb-3 font-body text-sm font-bold uppercase tracking-[0.2em] text-brand-red">
          Come Say Hi
        </p>
        <h2
          id="two-spots-heading"
          data-text="TWO SPOTS."
          className="doubled-heading block font-display font-extrabold uppercase leading-[0.85] tracking-tight text-[clamp(3rem,16vw,7rem)]"
          style={TWO_SPOTS_DOUBLED_STYLE}
        >
          TWO SPOTS.
        </h2>
      </div>

      <div className="flex flex-col">
        {LOCATIONS.map((spot) => (
          <SpotBlock key={spot.slug} spot={spot} />
        ))}
      </div>
    </section>
  );
}
