import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { MENU_ITEMS, type MenuItem } from "@/lib/menu";

type CategoryTile = {
  name: string;
  image: string;
  imageAlt: string;
  price: number;
};

function minAcross(values: (number | null | undefined)[]): number | null {
  const valid = values.filter((v): v is number => typeof v === "number" && v > 0);
  return valid.length ? Math.min(...valid) : null;
}

function fromPriceForProduct(product: MenuItem["product"]): number | null {
  return minAcross(
    MENU_ITEMS.filter((i) => i.product === product).map((i) => i.fromPrice),
  );
}

function fromPriceForSections(sectionSlugs: string[]): number | null {
  const items = MENU_ITEMS.filter((i) => sectionSlugs.includes(i.sectionSlug));
  return minAcross(
    items.flatMap((i) => [i.priceMK, i.priceNN]),
  );
}

function formatPrice(price: number | null): string {
  if (price == null) return "See menu";
  return `from £${price.toFixed(2)}`;
}

const DOUBLED_STYLE = {
  "--dh-fill": "var(--color-brand-red)",
  "--dh-shadow": "var(--color-brand-pink)",
  "--dh-offset": "0.06em",
} as React.CSSProperties;

export function TheGoods() {
  const tiles: CategoryTile[] = [
    {
      name: "WINGS",
      image: "/brand/photos/wings/DSC01496ww.png",
      imageAlt: "Wingers halal buttermilk wings",
      price: fromPriceForProduct("Wings") ?? 0,
    },
    {
      name: "BONELESS",
      image: "/brand/photos/wings/Gemini_Generated_Image_dtpw2jdtpw2jdtpw.jpg",
      imageAlt: "Boneless chicken bites",
      price: fromPriceForProduct("Boneless") ?? 0,
    },
    {
      name: "TENDERS",
      image: "/brand/photos/tenders/DSC00293.JPG",
      imageAlt: "Chicken tenders",
      price: fromPriceForProduct("Tenders") ?? 0,
    },
    {
      name: "BURGERS",
      image: "/brand/photos/burgers/Gemini_Generated_Image_45kpqz45kpqz45kp-4.jpg",
      imageAlt: "Wingers chicken burger",
      price: fromPriceForSections(["chicken-burgers", "beef-burgers"]) ?? 0,
    },
    {
      name: "LOADED FRIES",
      image: "/brand/photos/sides/BBQ Snack Bowl-3.png",
      imageAlt: "Loaded fries with sauce",
      price:
        fromPriceForSections(["fries-loaded", "chicken-loaded-fries"]) ?? 0,
    },
  ];

  return (
    <section
      aria-labelledby="the-goods-heading"
      className="bg-brand-white py-16 md:py-24"
    >
      <h2
        id="the-goods-heading"
        data-text="THE GOODS."
        className="doubled-heading block px-5 font-display font-extrabold uppercase leading-[0.85] tracking-tight text-[clamp(3rem,16vw,7rem)] sm:px-8"
        style={DOUBLED_STYLE}
      >
        THE GOODS.
      </h2>

      <ul
        aria-label="Menu categories"
        className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:px-8 md:mt-14 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {tiles.map((tile) => (
          <li key={tile.name} className="shrink-0 snap-start">
            <Link
              href="/menu"
              aria-label={`${tile.name}, ${formatPrice(tile.price > 0 ? tile.price : null)}`}
              className="group relative block w-[78vw] max-w-[22rem] overflow-hidden bg-brand-black"
            >
              <div className="relative aspect-square w-full">
                <Image
                  src={tile.image}
                  alt={tile.imageAlt}
                  fill
                  sizes="(min-width: 768px) 22rem, 78vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-brand-black/80 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                  <span className="font-display font-extrabold uppercase leading-[0.9] tracking-tight text-brand-white text-[clamp(1.75rem,7vw,2.75rem)]">
                    {tile.name}
                  </span>
                  <span className="mb-1 shrink-0 font-body text-sm text-brand-white/90">
                    {formatPrice(tile.price > 0 ? tile.price : null)}
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
