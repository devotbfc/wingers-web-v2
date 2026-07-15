import type { Metadata } from "next";
import { DoubledHeading } from "@/components/typography/DoubledHeading";
import { Footer } from "@/components/sections/Footer";
import { NavBar } from "@/components/sections/NavBar";
import { OrderPanel } from "@/components/sections/order-panel/OrderPanel";
import { OrderPanelProvider } from "@/components/sections/order-panel/order-panel-context";
import { LOCATIONS } from "@/lib/locations";
import { CATEGORIES, MENU, type MenuItem } from "@/lib/menu";
import { MenuShell } from "./MenuShell";

export const metadata: Metadata = {
  title: "Menu — Wingers Buttermilk Fried Chicken",
  description:
    "Halal buttermilk fried chicken in Milton Keynes and Northampton. Wings, tenders, burgers, loaded fries and sides — prices and availability differ per shop.",
  alternates: { canonical: "/menu" },
  openGraph: {
    title: "The Wingers Menu",
    description:
      "Halal buttermilk fried chicken in Milton Keynes and Northampton.",
    url: "/menu",
    type: "website",
  },
};

function buildMenuJsonLd() {
  const sections = CATEGORIES.map((category) => {
    const items = MENU.filter((item) => item.categorySlug === category.slug);
    return {
      "@type": "MenuSection",
      name: category.name,
      description: category.description,
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

function menuItemJsonLd(item: MenuItem) {
  const offers = LOCATIONS.map((loc) => {
    const slug = loc.slug as keyof typeof item.priceGbp;
    const price = item.priceGbp[slug];
    const inStock = !item.unavailableAt?.includes(slug);
    return {
      "@type": "Offer",
      price: price.toFixed(2),
      priceCurrency: "GBP",
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      areaServed: loc.name,
    };
  });

  const base: Record<string, unknown> = {
    "@type": "MenuItem",
    name: item.name,
    description: item.description,
    offers,
  };

  if (item.isHalal) base.suitableForDiet = "https://schema.org/HalalDiet";
  if (item.isVegan) base.suitableForDiet = "https://schema.org/VeganDiet";
  else if (item.isVegetarian)
    base.suitableForDiet = "https://schema.org/VegetarianDiet";

  return base;
}

export default function MenuPage() {
  const jsonLd = buildMenuJsonLd();

  return (
    <OrderPanelProvider>
      <NavBar />
      <main>
        <section className="bg-brand-white pt-12 pb-2 md:pt-20 md:pb-4">
          <div className="mx-auto max-w-6xl px-4 md:px-8">
            <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-brand-red">
              Halal Buttermilk Fried Chicken
            </p>
            <DoubledHeading
              text="THE MENU"
              as="h1"
              className="mt-2 font-display text-[clamp(3rem,10vw,7rem)] font-extrabold uppercase leading-[0.9] tracking-tight"
            />
            <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-brand-black/75 md:text-lg">
              Wingers serves halal buttermilk fried chicken across Milton Keynes
              and Northampton. Wings, tenders, burgers, loaded fries and sides —
              every item is halal-certified. Prices and availability vary by
              shop; pick yours below.
            </p>
          </div>
        </section>

        <MenuShell />
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
