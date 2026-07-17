// TODO(location-photography): swap the colored-tile hero fallback for a
// full-bleed <Image /> once public/brand/photos/locations/{slug}/ contains
// real exterior/interior shots.

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrandButton } from "@/components/brand/BrandButton";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { DoubledHeading } from "@/components/typography/DoubledHeading";
import { Footer } from "@/components/sections/Footer";
import { NavBar } from "@/components/sections/NavBar";
import { OrderPanel } from "@/components/sections/order-panel/OrderPanel";
import { OrderPanelProvider } from "@/components/sections/order-panel/order-panel-context";
import { OrderTriggerButton } from "@/components/sections/order-panel/OrderTriggerButton";
import { LocationOpenBadge } from "@/components/locations/LocationOpenBadge";
import { OpeningHoursTable } from "@/components/locations/OpeningHoursTable";
import { OpeningHoursTodayMarker } from "@/components/locations/OpeningHoursTodayMarker";
import {
  dayKeys,
  dayLabels,
  getDirectionsUrl,
  getLocationBySlug,
  LOCATIONS,
  type Location,
} from "@/lib/locations";

const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://wingers-web-v2.vercel.app";

const HERO_PHOTO_SLOT_BY_SLUG: Record<string, string> = {
  "milton-keynes": "P11",
  northampton: "P12",
};

interface RouteParams {
  slug: string;
}

interface RouteProps {
  params: Promise<RouteParams>;
}

export function generateStaticParams(): RouteParams[] {
  return LOCATIONS.map((loc) => ({ slug: loc.slug }));
}

export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) return {};
  const townForCopy = location.address.city.split(",")[0].trim();
  const canonical = `/locations/${location.slug}`;
  const title = `${location.name} — Halal Fried Chicken in ${townForCopy}`;
  const description = `${location.name} is a halal buttermilk fried chicken shop in ${townForCopy}. Opening hours, address and directions — order online for delivery or collection.`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      images: [
        { url: `/og/${location.slug}.png`, width: 1200, height: 630 },
      ],
    },
  };
}

function buildLocationJsonLd(location: Location) {
  const townForCopy = location.address.city.split(",")[0].trim();
  const openingHoursSpecification = dayKeys
    .map((dayKey) => {
      const hours = location.openingHours[dayKey];
      if (hours.closed) return null;
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: dayLabels[dayKey],
        opens: hours.open,
        closes: hours.close,
      };
    })
    .filter(Boolean);

  const base: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "LocalBusiness"],
    "@id": `${SITE_URL}/locations/${location.slug}`,
    name: location.name,
    url: `${SITE_URL}/locations/${location.slug}`,
    servesCuisine: ["Fried Chicken", "Halal"],
    priceRange: "££",
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address.street,
      addressLocality: location.address.city,
      postalCode: location.address.postcode,
      addressCountry: location.address.country,
    },
    openingHoursSpecification,
    hasMenu: `${SITE_URL}/menu`,
    suitableForDiet: "https://schema.org/HalalDiet",
    description: `Halal buttermilk fried chicken shop in ${townForCopy}. Wings, tenders, burgers, loaded fries and sides — order online for delivery or collection.`,
  };

  if (location.phone) base.telephone = location.phone;
  if (location.geo.latitude !== 0 || location.geo.longitude !== 0) {
    base.geo = {
      "@type": "GeoCoordinates",
      latitude: location.geo.latitude,
      longitude: location.geo.longitude,
    };
  }

  return base;
}

export default async function LocationDetailPage({ params }: RouteProps) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) notFound();

  const directionsUrl = getDirectionsUrl(location);
  const shortName = location.name.replace(/^Wingers\s+/i, "");
  const jsonLd = buildLocationJsonLd(location);
  const heroPhotoSlot = HERO_PHOTO_SLOT_BY_SLUG[location.slug];

  return (
    <OrderPanelProvider>
      <NavBar />
      <main>
        <section
          data-todo="assets"
          className="section-dark relative isolate flex min-h-[78dvh] flex-col justify-end overflow-hidden"
        >
          <div
            className="absolute inset-0 -z-20 bg-brand-pink"
            aria-hidden="true"
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-15">
              <BrandLogo
                variant="white"
                type="mark"
                width={640}
                height={640}
                className="h-80 w-80 md:h-[32rem] md:w-[32rem]"
              />
            </div>
          </div>
          {heroPhotoSlot && (
            <Image
              src={`/brand/photos/placeholders/${heroPhotoSlot}.png`}
              alt=""
              fill
              sizes="100vw"
              priority
              className="-z-[15] object-cover"
              data-photo-slot={heroPhotoSlot}
            />
          )}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-brand-black/55"
          />

          <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-24 md:pb-16 md:pt-32">
            <Link
              href="/locations"
              className="inline-flex min-h-11 items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.25em] text-brand-white/85 transition-colors hover:text-brand-pink"
            >
              <span aria-hidden="true">←</span> All Shops
            </Link>

            <div className="mt-6 flex flex-col gap-6">
              <LocationOpenBadge location={location} size="lg" />
              <DoubledHeading
                as="h1"
                text={shortName.toUpperCase()}
                fillColor="brand-white"
                shadowColor="brand-pink"
                offsetEm="0.05em"
                className="font-display text-[clamp(3rem,11vw,7rem)] font-extrabold uppercase leading-[0.85] tracking-tight"
              />
              <address className="font-body not-italic text-base leading-relaxed text-brand-white/85 md:text-lg">
                <span className="block">{location.address.street}</span>
                <span className="block">{location.address.city}</span>
                <span className="block">{location.address.postcode}</span>
              </address>

              <div className="pt-2">
                <OrderTriggerButton
                  preferredLocationSlug={location.slug}
                  variant="secondary"
                  size="lg"
                  className="min-h-12 px-8"
                >
                  Get Stuck In →
                </OrderTriggerButton>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-label="Opening hours and contact"
          className="bg-brand-white py-16 md:py-24"
        >
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-16 md:px-8">
            <div>
              <DoubledHeading
                as="h2"
                text="OPENING HOURS"
                fillColor="brand-red"
                shadowColor="brand-pink"
                offsetEm="0.05em"
                className="font-display text-[clamp(2rem,6vw,4rem)] font-extrabold uppercase leading-[0.9] tracking-tight"
              />
              <div className="mt-8">
                <OpeningHoursTable location={location} />
                <OpeningHoursTodayMarker locationSlug={location.slug} />
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-brand-red">
                  Address
                </p>
                <address className="mt-3 font-body not-italic text-base leading-relaxed text-brand-black md:text-lg">
                  <span className="block">{location.address.street}</span>
                  <span className="block">{location.address.city}</span>
                  <span className="block">{location.address.postcode}</span>
                </address>
              </div>

              <div className="flex flex-col gap-3">
                <BrandButton
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="lg"
                  className="min-h-11 w-full justify-center"
                >
                  Directions
                </BrandButton>
                {location.phone ? (
                  <BrandButton
                    href={`tel:${location.phone.replace(/\s/g, "")}`}
                    variant="secondary"
                    size="lg"
                    className="min-h-11 w-full justify-center"
                  >
                    Call {location.phone}
                  </BrandButton>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <OrderPanel />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </OrderPanelProvider>
  );
}
