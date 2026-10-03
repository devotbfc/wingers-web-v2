import Image from "next/image";
import Link from "next/link";
import { BrandButton } from "@/components/brand/BrandButton";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { OrderTriggerButton } from "@/components/sections/order-panel/OrderTriggerButton";
import { getDirectionsUrl, type Location } from "@/lib/locations";
import { cn } from "@/lib/utils";
import { LocationOpenBadge } from "./LocationOpenBadge";

interface LocationCardProps {
  location: Location;
  mediaAspect?: "4/3" | "3/4" | "3/2";
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
  const mediaBg =
    location.slug === "milton-keynes" ? "bg-brand-red" : "bg-brand-pink";
  const aspectClass =
    mediaAspect === "4/3"
      ? "aspect-[4/3]"
      : mediaAspect === "3/4"
        ? "aspect-[3/4]"
        : "aspect-[3/2]";

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
        className={cn(
          "relative overflow-hidden",
          !location.shopfront && mediaBg,
          aspectClass,
        )}
      >
        {location.shopfront ? (
          <Image
            src={location.shopfront.src}
            alt={location.shopfront.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className={cn("object-cover", location.shopfront.cardPosition)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <BrandLogo
              variant="white"
              type="mark"
              width={200}
              height={200}
              className="h-32 w-32 md:h-40 md:w-40"
            />
          </div>
        )}
        <div className="absolute left-4 top-4 z-10">
          <LocationOpenBadge location={location} size="lg" />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
        <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-brand-black">
          {shortName.toUpperCase()}
        </h2>

        <address className="font-body not-italic text-base leading-relaxed text-brand-black">
          <span className="block">{location.address.street}</span>
          <span className="block">{location.address.city}</span>
          <span className="block">{location.address.postcode}</span>
        </address>

        {location.phone && (
          <a
            href={`tel:${location.phone.replace(/\s+/g, "")}`}
            className="relative z-10 -mt-2 inline-block w-fit font-body text-base text-brand-black underline underline-offset-4 hover:text-brand-red transition-colors"
          >
            {location.phone}
          </a>
        )}

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
            variant="ghost"
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
