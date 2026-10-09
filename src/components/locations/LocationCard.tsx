import Image from "next/image";
import Link from "next/link";
import { BrandButton } from "@/components/brand/BrandButton";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { OrderTriggerButton } from "@/components/sections/order-panel/OrderTriggerButton";
import { getDirectionsUrl, type Location } from "@/lib/locations";
import { cn } from "@/lib/utils";
import { LocationOpenBadge } from "./LocationOpenBadge";
import { LocationTodayHours } from "./LocationTodayHours";

interface LocationCardProps {
  location: Location;
  mediaAspect?: "4/3" | "3/4" | "3/2";
  className?: string;
  // When set, renders a pink pill in the card header (e.g. "Location
  // exclusive · 100% Angus beef" on Northampton). Leave undefined for shops
  // without an exclusive line.
  exclusiveBadge?: string;
}

export function LocationCard({
  location,
  mediaAspect = "4/3",
  className,
  exclusiveBadge,
}: LocationCardProps) {
  const href = `/locations/${location.slug}`;
  const directionsUrl = getDirectionsUrl(location);
  const shortName = location.name.replace(/^Wingers\s+/i, "");
  const aspectClass =
    mediaAspect === "4/3"
      ? "aspect-[4/3]"
      : mediaAspect === "3/4"
        ? "aspect-[3/4]"
        : "aspect-[3/2]";

  return (
    <article
      className={cn(
        "group relative flex flex-col gap-5 overflow-hidden rounded-[32px] bg-brand-white p-2.5 pb-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] md:gap-6 md:rounded-[40px] md:p-3.5 md:pb-7",
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
          "relative overflow-hidden rounded-[999px_999px_24px_24px] md:rounded-[999px_999px_40px_40px]",
          !location.shopfront && "bg-brand-black",
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
          <div className="absolute inset-0 flex items-center justify-center">
            <BrandLogo
              variant="white"
              type="mark"
              width={200}
              height={200}
              className="h-20 w-20 md:h-28 md:w-28"
            />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 px-2.5 md:px-3.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-[clamp(1.75rem,5vw,2.75rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-brand-black">
            {shortName.toUpperCase()}
          </h2>
          <div className="relative z-10">
            <LocationOpenBadge location={location} size="sm" />
          </div>
        </div>
        {exclusiveBadge ? (
          <span className="w-fit rounded-full bg-brand-pink px-3 py-1 font-display text-[11px] font-bold uppercase tracking-[0.1em] text-brand-black">
            {exclusiveBadge}
          </span>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2">
          <address className="font-body not-italic text-sm leading-relaxed text-brand-black/80 md:text-base">
            <span className="block">{location.address.street}</span>
            <span className="block">{location.address.city}</span>
            <span className="block">{location.address.postcode}</span>
          </address>
          <div className="flex flex-col gap-1 font-body text-sm md:text-base">
            <LocationTodayHours location={location} />
            {location.phone && (
              <a
                href={`tel:${location.phone.replace(/\s+/g, "")}`}
                className="relative z-10 w-fit font-semibold text-brand-black underline underline-offset-4 hover:text-brand-red transition-colors"
              >
                {location.phone}
              </a>
            )}
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-3 pt-1">
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
            variant="outline"
            size="lg"
            className="min-h-11 w-full justify-center"
          >
            Directions
          </BrandButton>
        </div>

        <Link
          href={href}
          className="relative z-10 w-fit font-body text-sm font-semibold text-brand-black underline underline-offset-4 hover:text-brand-red transition-colors md:text-base"
        >
          Hours, parking &amp; details →
        </Link>
      </div>
    </article>
  );
}
