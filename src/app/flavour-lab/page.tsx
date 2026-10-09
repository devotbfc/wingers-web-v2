import type { Metadata } from "next";
import { Footer } from "@/components/sections/Footer";
import { NavBar } from "@/components/sections/NavBar";
import { OrderPanel } from "@/components/sections/order-panel/OrderPanel";
import { OrderPanelProvider } from "@/components/sections/order-panel/order-panel-context";
import { OrderTriggerButton } from "@/components/sections/order-panel/OrderTriggerButton";
import { DipsSection } from "@/components/sections/flavour-lab/DipsSection";
import { FlavourGrid } from "@/components/sections/flavour-lab/FlavourGrid";
import { FlavourLabHero } from "@/components/sections/flavour-lab/FlavourLabHero";
import { ComingSoonSection } from "@/components/sections/flavour-lab/ComingSoonSection";
import { PastDropsSection } from "@/components/sections/flavour-lab/PastDropsSection";
import { SpinTheWheel } from "@/components/sections/flavour-lab/SpinTheWheel";
import { TonightLineupCard } from "@/components/sections/flavour-lab/TonightLineupCard";
import { SPINNABLE_FLAVOURS } from "@/lib/flavours";

// data-todo="assets" — using sitewide /og/home.jpg until per-page Flavour Lab art ships (ADR-014).
export const metadata: Metadata = {
  title: "Flavour Lab — Wingers Buttermilk Halal Fried Chicken",
  description:
    "Meet the sauces and rubs. Spin the wheel. Find your flavour. Wingers buttermilk halal fried chicken in Milton Keynes & Northampton.",
  alternates: { canonical: "/flavour-lab" },
  openGraph: {
    title: "Flavour Lab — Wingers Buttermilk Halal Fried Chicken",
    description:
      "Spin the wheel. Find your flavour. Buttermilk halal fried chicken in Milton Keynes & Northampton.",
    url: "/flavour-lab",
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

function buildFlavourLabJsonLd() {
  const described = SPINNABLE_FLAVOURS;

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
      <NavBar onDark />
      <main className="bg-lab-black text-brand-white">
        <FlavourLabHero />
        <SpinTheWheel />
        <TonightLineupCard />
        <FlavourGrid />
        <ComingSoonSection />
        <PastDropsSection />
        <DipsSection />

        {/* Full-width pink band, text left + ORDER right on both breakpoints
            (matches the design board). The row never stacks — compact on
            mobile with the headline sized down, breathes out on desktop. */}
        <section className="px-4 py-10 md:px-8 md:py-14">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 rounded-[32px] bg-brand-pink px-6 py-6 text-lab-black md:rounded-[40px] md:px-12 md:py-8">
            <p className="font-display text-[clamp(1.75rem,6vw,2.5rem)] font-extrabold uppercase leading-[0.95] tracking-tight">
              Hungry yet?
            </p>
            <OrderTriggerButton size="lg">Order</OrderTriggerButton>
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
