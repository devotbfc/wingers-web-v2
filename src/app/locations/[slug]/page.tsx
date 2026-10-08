import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrandButton } from "@/components/brand/BrandButton";
import { BrandLogo } from "@/components/brand/BrandLogo";
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
import { getSiteUrl } from "@/lib/site-url";

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
  const title = `${location.name} — Buttermilk Halal Fried Chicken`;
  const description = `${location.name} is a buttermilk halal fried chicken shop in ${townForCopy}. Opening hours, address and directions.`;
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
        {
          url: "/og/home.jpg",
          width: 1200,
          height: 630,
          alt: "Wingers mac & cheese",
        },
      ],
    },
  };
}

function buildLocationJsonLd(location: Location) {
  const SITE_URL = getSiteUrl();
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
    description: `Buttermilk halal fried chicken shop in ${townForCopy}. Wings, tenders, burgers, loaded fries and sides — order for collection, delivery via the apps.`,
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

  return (
    <OrderPanelProvider>
      <NavBar />
      <main className="bg-brand-white">
        <section className="wingers-wrap pt-24 pb-10 md:pt-32 md:pb-16">
          <Link
            href="/locations"
            className="inline-flex min-h-11 items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.25em] text-brand-black transition-colors hover:text-brand-red"
          >
            <span aria-hidden="true">←</span> All Shops
          </Link>

          <div className="mt-6 grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-end md:gap-12">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[999px_999px_32px_32px] md:aspect-[5/4] md:rounded-[999px_999px_40px_40px]">
              {location.shopfront ? (
                <Image
                  src={location.shopfront.src}
                  alt={location.shopfront.alt}
                  fill
                  priority
                  sizes="(min-width: 768px) 55vw, 100vw"
                  className={`object-cover ${location.shopfront.heroPosition}`}
                />
              ) : (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-brand-black"
                  aria-hidden="true"
                >
                  <BrandLogo
                    variant="white"
                    type="mark"
                    width={320}
                    height={320}
                    className="h-28 w-28 md:h-40 md:w-40"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap items-center gap-2">
                <LocationOpenBadge location={location} size="sm" />
                <span className="inline-flex h-7 items-center rounded-full bg-brand-pink/15 px-3 font-body text-xs font-semibold text-brand-black">
                  Halal certified
                </span>
              </div>

              <h1 className="font-display text-[clamp(3rem,11vw,6rem)] font-extrabold uppercase leading-[0.86] tracking-tight text-brand-black">
                {shortName.toUpperCase()}
              </h1>

              <address className="font-body not-italic text-base leading-relaxed text-brand-black/80 md:text-lg">
                {location.address.street}, {location.address.city}{" "}
                {location.address.postcode}
              </address>

              <OrderTriggerButton
                preferredLocationSlug={location.slug}
                variant="primary"
                size="lg"
                className="min-h-12 w-full justify-center px-8 md:w-fit"
              >
                Get Stuck In →
              </OrderTriggerButton>

              <div className="grid grid-cols-2 gap-3">
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
                {location.phone ? (
                  <BrandButton
                    href={`tel:${location.phone.replace(/\s+/g, "")}`}
                    variant="outline"
                    size="lg"
                    className="min-h-11 w-full justify-center"
                  >
                    Call
                  </BrandButton>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <section
          aria-label="Opening hours"
          className="wingers-wrap pb-16 md:pb-24"
        >
          <div className="rounded-[32px] bg-brand-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] md:rounded-[40px] md:p-10">
            <h2 className="font-display text-[clamp(1.75rem,5vw,2.75rem)] font-bold uppercase leading-[0.95] tracking-tight text-brand-black">
              Opening hours
            </h2>
            <div className="mt-6">
              <OpeningHoursTable location={location} />
              <OpeningHoursTodayMarker locationSlug={location.slug} />
            </div>
          </div>
        </section>

        {(location.mapImage || location.parking) && (
          <section
            aria-label="Getting here"
            className="wingers-wrap pb-16 md:pb-24"
          >
            <h2 className="font-display text-[clamp(1.75rem,5vw,2.75rem)] font-bold uppercase leading-[0.95] tracking-tight text-brand-black">
              Getting here
            </h2>
            <div className="mt-6 flex flex-col gap-4">
              {location.mapImage ? (
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Map to ${location.name} (opens in a new tab)`}
                  className="block overflow-hidden rounded-[28px] md:rounded-[36px]"
                >
                  <Image
                    src={location.mapImage}
                    alt={`Map to ${location.name}`}
                    width={1600}
                    height={960}
                    loading="lazy"
                    sizes="(min-width: 768px) 70vw, 100vw"
                    className="h-auto w-full"
                  />
                </a>
              ) : null}
              {location.parking ? (
                <p className="rounded-[22px] bg-brand-white p-5 font-body text-base leading-relaxed text-brand-black shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] md:text-lg">
                  <span className="font-semibold">Parking:</span>{" "}
                  {location.parking}
                </p>
              ) : null}
            </div>
          </section>
        )}
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
