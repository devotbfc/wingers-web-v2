import type { Metadata } from "next";
import { DoubledHeading } from "@/components/typography/DoubledHeading";
import { Footer } from "@/components/sections/Footer";
import { NavBar } from "@/components/sections/NavBar";
import { OrderPanel } from "@/components/sections/order-panel/OrderPanel";
import { OrderPanelProvider } from "@/components/sections/order-panel/order-panel-context";
import { OrderTriggerButton } from "@/components/sections/order-panel/OrderTriggerButton";
import { DipsSection } from "@/components/sections/flavour-lab/DipsSection";
import { FlavourGrid } from "@/components/sections/flavour-lab/FlavourGrid";
import { FlavourLabHero } from "@/components/sections/flavour-lab/FlavourLabHero";
import { SpinTheWheel } from "@/components/sections/flavour-lab/SpinTheWheel";
import { CORE_FLAVOURS, LE_FLAVOURS } from "@/lib/flavours";

// data-todo="assets" — static OG image /og/flavour-lab.png pending per ADR-014.
export const metadata: Metadata = {
  title: "Flavour Lab — Wingers",
  description:
    "Meet the sauces and rubs. Spin the wheel, filter by heat, get stuck in. Wingers halal buttermilk fried chicken — Milton Keynes and Northampton.",
  alternates: { canonical: "/flavour-lab" },
  openGraph: {
    title: "Flavour Lab — Wingers",
    description:
      "Twenty-four flavours. One wheel. Halal buttermilk fried chicken in Milton Keynes and Northampton.",
    url: "/flavour-lab",
    type: "website",
    images: [{ url: "/og/flavour-lab.png", width: 1200, height: 630 }],
  },
};

function buildFlavourLabJsonLd() {
  const described = [
    ...CORE_FLAVOURS,
    ...LE_FLAVOURS.filter((f) => f.shortDescription),
  ];

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Wingers Flavour Lab",
    description:
      "Sauces and rubs served at Wingers halal buttermilk fried chicken across Milton Keynes and Northampton.",
    inLanguage: "en-GB",
    numberOfItems: described.length,
    itemListElement: described.map((f, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "MenuItem",
        name: f.name,
        ...(f.shortDescription && { description: f.shortDescription }),
      },
    })),
  };
}

export default function FlavourLabPage() {
  const jsonLd = buildFlavourLabJsonLd();

  return (
    <OrderPanelProvider>
      <NavBar />
      <main className="bg-lab-black text-brand-white">
        <FlavourLabHero />
        <SpinTheWheel />
        <FlavourGrid />
        <DipsSection />

        <section className="section-dark py-20 md:py-28">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 text-center md:px-8">
            <DoubledHeading
              text="TASTED SOMETHING?"
              as="p"
              fillColor="brand-pink"
              shadowColor="brand-red"
              offsetEm="0.06em"
              className="font-display text-[clamp(2.25rem,7vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight"
            />
            <DoubledHeading
              text="GET STUCK IN."
              as="p"
              fillColor="brand-white"
              shadowColor="brand-red"
              offsetEm="0.06em"
              className="font-display text-[clamp(2.25rem,7vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight"
            />
            <div className="mt-4">
              <OrderTriggerButton size="lg">Get stuck in</OrderTriggerButton>
            </div>
          </div>
        </section>
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
