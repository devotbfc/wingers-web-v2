// TODO(location-photography): swap placeholder tiles for <Image /> once
// public/brand/photos/locations/{slug}/ contains real exterior/interior shots.

import { BrandButton } from "@/components/brand/BrandButton";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { DoubledHeading } from "@/components/typography/DoubledHeading";
import { LOCATIONS } from "@/lib/locations";
import { getProviderForLocation } from "@/lib/order/providers";

export function LocationsSection() {
  return (
    <section
      aria-labelledby="locations-heading"
      className="bg-brand-white py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="max-w-3xl">
          <DoubledHeading
            as="h2"
            text="FIND US."
            fillColor="brand-red"
            shadowColor="brand-pink"
            offsetEm="0.06em"
            className="font-display font-extrabold uppercase leading-[0.95] tracking-tight text-[clamp(2.5rem,7vw,5rem)]"
          />
          <p className="mt-6 font-body text-lg md:text-xl leading-relaxed text-brand-black">
            Milton Keynes and Northampton. Two kitchens, one bird.
          </p>
        </div>

        <div className="mt-10 md:mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {LOCATIONS.map((loc, i) => {
            const orderUrl = getProviderForLocation(loc).getOrderUrl(loc);
            const isFirst = i === 0;
            return (
              <article
                key={loc.slug}
                className={`flex flex-col overflow-hidden bg-brand-white ${isFirst ? "mr-8 md:mr-0" : "ml-8 md:ml-0"}`}
              >
                <div
                  className={`relative bg-brand-pink ${isFirst ? "aspect-[4/3]" : "aspect-square"}`}
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
                </div>

                <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
                  <h3 className="font-display font-extrabold uppercase leading-tight tracking-tight text-brand-black text-[clamp(1.75rem,4vw,3rem)]">
                    {loc.name}
                  </h3>

                  <address className="font-body not-italic text-base leading-relaxed text-brand-black">
                    <span className="block">{loc.address.street}</span>
                    <span className="block">{loc.address.city}</span>
                    <span className="block">{loc.address.postcode}</span>
                  </address>

                  <div className="mt-auto pt-2">
                    <BrandButton
                      variant="primary"
                      size="md"
                      href={orderUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Order
                    </BrandButton>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
