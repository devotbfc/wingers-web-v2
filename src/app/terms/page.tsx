import type { Metadata } from "next";
import { DoubledHeading } from "@/components/typography/DoubledHeading";
import { Footer } from "@/components/sections/Footer";
import { NavBar } from "@/components/sections/NavBar";
import { OrderPanel } from "@/components/sections/order-panel/OrderPanel";
import { OrderPanelProvider } from "@/components/sections/order-panel/order-panel-context";

// TODO(legal): REAL Terms of Service copy required before public launch.
// Placeholder is noindex to keep the footer link resolving without polluting
// search results.

export const metadata: Metadata = {
  title: "Terms of Service — Wingers",
  description: "Wingers terms of service — coming soon.",
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <OrderPanelProvider>
      <NavBar />
      <main>
        <section className="bg-brand-white px-4 pb-24 pt-32 md:px-8 md:pt-40">
          <div className="mx-auto max-w-3xl">
            <DoubledHeading
              as="h1"
              text="TERMS."
              fillColor="brand-black"
              shadowColor="brand-pink"
              offsetEm="0.06em"
              className="font-display font-extrabold uppercase leading-[0.85] tracking-tight text-[clamp(2.5rem,10vw,6rem)]"
            />
            <p className="mt-8 font-body text-lg leading-relaxed text-brand-black/80 md:text-xl">
              This page is being finalised. Our full terms of service will be
              published here before public launch.
            </p>
            <p className="mt-4 font-body text-base leading-relaxed text-brand-black/70">
              For questions in the meantime, email{" "}
              <a
                href="mailto:hello@wingers.co"
                className="underline transition-colors hover:text-brand-red"
              >
                hello@wingers.co
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <OrderPanel />
    </OrderPanelProvider>
  );
}
