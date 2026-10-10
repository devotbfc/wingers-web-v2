import Image from "next/image";
import { MapPin } from "lucide-react";
import { BrandButton } from "@/components/brand/BrandButton";
import { LocationOpenBadge } from "@/components/locations/LocationOpenBadge";
import { OrderTriggerButton } from "@/components/sections/order-panel/OrderTriggerButton";
import { LOCATIONS, type Location } from "@/lib/locations";
import { cn } from "@/lib/utils";

type SpotTheme = {
  panelBg: string;
  bodyText: string;
  photoFrameBg: string;
  photoFallbackBg: string;
};

const THEME_BY_SLUG: Record<string, SpotTheme> = {
  "milton-keynes": {
    panelBg: "bg-brand-pink",
    bodyText: "text-brand-black",
    photoFrameBg: "bg-brand-black",
    photoFallbackBg: "bg-brand-white",
  },
  northampton: {
    panelBg: "bg-brand-white",
    bodyText: "text-brand-black",
    photoFrameBg: "bg-brand-pink",
    photoFallbackBg: "bg-brand-black",
  },
};

const DEFAULT_THEME: SpotTheme = {
  panelBg: "bg-brand-white",
  bodyText: "text-brand-black",
  photoFrameBg: "bg-brand-pink",
  photoFallbackBg: "bg-brand-black",
};

function mapsUrlFor(loc: Location): string {
  const query = `${loc.name} ${loc.address.postcode}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function fullAddress(loc: Location): string {
  return `${loc.address.street}, ${loc.address.city}, ${loc.address.postcode}`;
}

function SpotBlock({ spot }: { spot: Location }) {
  const theme = THEME_BY_SLUG[spot.slug] ?? DEFAULT_THEME;
  const headlineText = spot.name.toUpperCase();

  return (
    <div className="flex flex-col lg:flex-row lg:items-stretch">
      <div
        className={cn(
          "w-full p-3 md:p-4 lg:w-1/2",
          theme.photoFrameBg,
        )}
        {...(spot.shopfront ? {} : { "aria-hidden": true })}
      >
        <div
          className={cn(
            "relative aspect-[4/3] w-full overflow-hidden rounded-[999px_999px_24px_24px] md:rounded-[999px_999px_40px_40px] lg:aspect-auto lg:h-full",
            !spot.shopfront && theme.photoFallbackBg,
          )}
        >
          {spot.shopfront ? (
            <Image
              src={spot.shopfront.src}
              alt={spot.shopfront.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              loading="lazy"
              className={cn("object-cover", spot.shopfront.cardPosition)}
            />
          ) : null}
        </div>
      </div>

      <div
        className={`${theme.panelBg} ${theme.bodyText} w-full overflow-hidden px-6 py-12 lg:w-1/2 lg:px-12 lg:py-20`}
      >
        <div className="flex h-full flex-col justify-center gap-6">
          <LocationOpenBadge location={spot} size="sm" />

          {/* "NORTHAMPTON" (11 chars) was clipping at 390px; drop the vw
              scale from 13 → 11 and the min from 2.75rem → 2rem so the
              longest name fits inside px-6 padding at 360px. The 5rem
              desktop ceiling keeps it bold at lg without overrunning
              the half-width card. */}
          <h3 className="block font-display font-extrabold uppercase leading-[0.85] tracking-tight text-[clamp(2rem,11vw,5rem)]">
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
              preferredLocationSlug={spot.slug}
            >
              Order
            </OrderTriggerButton>
            <BrandButton
              variant="outline"
              size="lg"
              href={mapsUrlFor(spot)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Directions
            </BrandButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TwoSpots() {
  return (
    <section aria-labelledby="two-spots-heading" className="bg-brand-white">
      <div className="px-6 pb-8 pt-16 lg:px-12 lg:pt-24">
        <p className="mb-3 font-body text-sm font-bold uppercase tracking-[0.2em] text-brand-red">
          Come Say Hi
        </p>
        <h2
          id="two-spots-heading"
          className="block font-display font-extrabold uppercase leading-[0.85] tracking-tight text-[clamp(3rem,16vw,7rem)] text-brand-black"
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
