import type { Metadata } from "next";
import { Footer } from "@/components/sections/Footer";
import { NavBar } from "@/components/sections/NavBar";
import { OrderPanel } from "@/components/sections/order-panel/OrderPanel";
import { OrderPanelProvider } from "@/components/sections/order-panel/order-panel-context";
import { LocationCard } from "@/components/locations/LocationCard";
import { LOCATIONS } from "@/lib/locations";

export const metadata: Metadata = {
  title: "Find Us — Wingers Halal Fried Chicken in Milton Keynes & Northampton",
  description:
    "Wingers has two halal buttermilk fried chicken shops: Milton Keynes and Northampton. Opening hours, addresses and directions.",
  alternates: { canonical: "/locations" },
  openGraph: {
    title: "Find Wingers — Milton Keynes & Northampton",
    description:
      "Two halal buttermilk fried chicken shops. Wings, tenders, burgers and loaded fries — order online or drop in.",
    url: "/locations",
    type: "website",
    images: [{ url: "/og/locations.png", width: 1200, height: 630 }],
  },
};

export default function LocationsPage() {
  return (
    <OrderPanelProvider>
      <NavBar />
      <main>
        <section className="bg-brand-white pt-24 pb-6 md:pt-32 md:pb-10">
          <div className="mx-auto max-w-6xl px-4 md:px-8">
            <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-brand-red">
              Halal Buttermilk Fried Chicken
            </p>
            <h1 className="mt-2 font-display text-[clamp(3rem,10vw,7rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-brand-black">
              FIND US.
            </h1>
            <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-brand-black/80 md:text-lg">
              Wingers has two halal buttermilk fried chicken shops: Milton
              Keynes and Northampton. Both are halal-certified. Order online
              for delivery or collection, or drop in and get stuck in.
            </p>
          </div>
        </section>

        <section
          aria-label="Wingers shops"
          className="bg-brand-white pb-16 md:pb-24"
        >
          <div className="mx-auto max-w-6xl px-4 md:px-8">
            <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6">
              {LOCATIONS.map((loc, i) => (
                <li
                  key={loc.slug}
                  className={i === 0 ? "mr-4 md:mr-0" : "ml-4 md:ml-0"}
                >
                  <LocationCard location={loc} mediaAspect="3/2" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
      <OrderPanel />
    </OrderPanelProvider>
  );
}
