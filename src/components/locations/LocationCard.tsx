// TODO(location-photography): swap the colored-tile fallback for <Image />
// once public/brand/photos/locations/{slug}/ contains real shopfront shots.

import Image from "next/image";
import Link from "next/link";
import { BrandButton } from "@/components/brand/BrandButton";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { DoubledHeading } from "@/components/typography/DoubledHeading";
import { OrderTriggerButton } from "@/components/sections/order-panel/OrderTriggerButton";
import { getDirectionsUrl, type Location } from "@/lib/locations";
import { cn } from "@/lib/utils";
import { LocationOpenBadge } from "./LocationOpenBadge";

const CARD_PHOTO_SLOT_BY_SLUG: Record<string, string> = {
  "milton-keynes": "P09",
  northampton: "P10",
};

interface LocationCardProps {
  location: Location;
  mediaAspect?: "4/3" | "3/4";
  className?: string;
}

export function LocationCard({
  location,
  mediaAspect = "4/3",
  className,
}: LocationCardProps) {
  const href = `/locations/${location.slug}`;
  const directionsUrl = getDirectionsUrl(location);
  const shortName = location.name.replace(/^Wingers\s+/i, "");
  const photoSlot = CARD_PHOTO_SLOT_BY_SLUG[location.slug];

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden bg-brand-white",
        className,
      )}
    >
      <Link
        href={href}
        aria-label={`${location.name} — view shop details`}
        className="absolute inset-0 z-0"
      />

      <div
        data-todo="assets"
        className={cn(
          "relative overflow-hidden bg-brand-pink",
          mediaAspect === "4/3" ? "aspect-[4/3]" : "aspect-[3/4]",
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <BrandLogo
            variant="white"
            type="mark"
            width={200}
            height={200}
            className="h-32 w-32 md:h-40 md:w-40"
          />
        </div>
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
        <div className="absolute left-4 top-4 z-10">
          <LocationOpenBadge location={location} size="lg" />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
        <DoubledHeading
          as="h2"
          text={shortName.toUpperCase()}
          fillColor="brand-black"
          shadowColor="brand-pink"
          offsetEm="0.04em"
          className="font-display text-[clamp(2rem,5vw,3.25rem)] font-extrabold uppercase leading-[0.9] tracking-tight"
        />

        <address className="font-body not-italic text-base leading-relaxed text-brand-black">
          <span className="block">{location.address.street}</span>
          <span className="block">{location.address.city}</span>
          <span className="block">{location.address.postcode}</span>
        </address>

        <div className="relative z-10 mt-auto grid grid-cols-2 gap-3 pt-2">
          <OrderTriggerButton
            preferredLocationSlug={location.slug}
            variant="primary"
            size="lg"
            className="min-h-11 w-full justify-center"
          >
            Order
          </OrderTriggerButton>
          <BrandButton
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="lg"
            className="min-h-11 w-full justify-center"
          >
            Directions
          </BrandButton>
        </div>
      </div>
    </article>
  );
}
