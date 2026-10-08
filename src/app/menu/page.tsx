import type { Metadata } from "next";
import { Footer } from "@/components/sections/Footer";
import { NavBar } from "@/components/sections/NavBar";
import { OrderPanel } from "@/components/sections/order-panel/OrderPanel";
import { OrderPanelProvider } from "@/components/sections/order-panel/order-panel-context";
import { getCurrentLimitedEdition } from "@/lib/flavours/current-le";
import { LOCATIONS } from "@/lib/locations";
import {
  MENU_ITEMS,
  MENU_SECTIONS,
  isCurrentLE,
  type MenuItem,
} from "@/lib/menu";
import { MenuShell } from "./MenuShell";

export const metadata: Metadata = {
  title: "Menu — Buttermilk Halal Fried Chicken · Wingers",
  description:
    "The Wingers menu — buttermilk halal fried chicken in Milton Keynes & Northampton. Wings, tenders, burgers, loaded fries, shakes. Prices differ per shop.",
  alternates: { canonical: "/menu" },
  openGraph: {
    title: "The Wingers Menu — Buttermilk Halal Fried Chicken",
    description:
      "Buttermilk halal fried chicken in Milton Keynes & Northampton. Order for collection or drop in.",
    url: "/menu",
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

function locationCode(slug: string): "MK" | "NN" {
  return slug === "milton-keynes" ? "MK" : "NN";
}

function priceForOffer(item: MenuItem, slug: string): string | null {
  const code = locationCode(slug);
  const direct = code === "MK" ? item.priceMK : item.priceNN;
  if (direct != null) return direct.toFixed(2);
  if (item.fromPrice != null) return item.fromPrice.toFixed(2);
  return null;
}

function menuItemJsonLd(item: MenuItem) {
  const offers = LOCATIONS.map((loc) => {
    const price = priceForOffer(item, loc.slug);
    const code = locationCode(loc.slug);
    const inStock = item.unavailableAt !== code;
    return {
      "@type": "Offer",
      ...(price != null && { price, priceCurrency: "GBP" }),
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      areaServed: loc.name,
    };
  });

  const base: Record<string, unknown> = {
    "@type": "MenuItem",
    name: item.name,
    ...(item.description && { description: item.description }),
    offers,
  };

  if (item.halal) base.suitableForDiet = "https://schema.org/HalalDiet";
  if (item.vegetarian) base.suitableForDiet = "https://schema.org/VegetarianDiet";

  return base;
}

function buildMenuJsonLd() {
  const currentItems = MENU_ITEMS.filter((i) => isCurrentLE(i));
  const sections = MENU_SECTIONS.map((section) => {
    const items = currentItems.filter((i) => i.sectionSlug === section.slug);
    return {
      "@type": "MenuSection",
      name: section.name,
      hasMenuItem: items.map((item) => menuItemJsonLd(item)),
    };
  }).filter((section) => section.hasMenuItem.length > 0);

  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: "Wingers Menu",
    description:
      "Halal buttermilk fried chicken menu across Wingers Milton Keynes and Wingers Northampton.",
    inLanguage: "en-GB",
    hasMenuSection: sections,
  };
}

export default function MenuPage() {
  const jsonLd = buildMenuJsonLd();
  // Computed in the Server Component so FLAVOURS stays out of the client bundle.
  const currentLE = getCurrentLimitedEdition();

  return (
    <OrderPanelProvider>
      <NavBar />
      {/* Warm-grey ground gives every MenuItemCard (bg-brand-white, rounded)
          its own visible edge — replaces the implicit "white card on white
          page" divider lines flagged in the phone review. */}
      <main className="bg-brand-warm-grey">
        <section className="pt-28 pb-8 md:pt-32 md:pb-12">
          <div className="mx-auto max-w-6xl px-4 md:px-8">
            <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-brand-red">
              Fresh · Hand-Breaded · Halal
            </p>
            <h1 className="mt-2 font-display text-[clamp(3rem,10vw,7rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-brand-pink">
              THE MENU
            </h1>
            <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-brand-black/75 md:text-lg">
              Wingers serves buttermilk halal fried chicken across Milton Keynes
              and Northampton — every item fully certified. Prices and
              availability vary by shop; pick yours below.
            </p>
          </div>
        </section>

        <MenuShell currentLE={currentLE} />
      </main>
      <Footer />
      <OrderPanel />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </OrderPanelProvider>
  );
}
