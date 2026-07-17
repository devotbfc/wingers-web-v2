import type { Metadata } from "next";
import { DoubledHeading } from "@/components/typography/DoubledHeading";
import { Footer } from "@/components/sections/Footer";
import { NavBar } from "@/components/sections/NavBar";
import { OrderPanel } from "@/components/sections/order-panel/OrderPanel";
import { OrderPanelProvider } from "@/components/sections/order-panel/order-panel-context";

// TODO(legal): REAL Privacy Policy copy required before public launch.
// GDPR + PECR compliance — the loyalty form captures emails via
// loyalty_signups (ADR-016). Placeholder is noindex to keep the footer link
// resolving without polluting search results.

export const metadata: Metadata = {
  title: "Privacy Policy — Wingers",
  description: "Wingers privacy policy — coming soon.",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <OrderPanelProvider>
      <NavBar />
      <main>
        <section className="bg-brand-white px-4 pb-24 pt-32 md:px-8 md:pt-40">
          <div className="mx-auto max-w-3xl">
            <DoubledHeading
              as="h1"
              text="PRIVACY."
              fillColor="brand-black"
              shadowColor="brand-pink"
              offsetEm="0.06em"
              className="font-display font-extrabold uppercase leading-[0.85] tracking-tight text-[clamp(2.5rem,10vw,6rem)]"
            />
            <p className="mt-8 font-body text-lg leading-relaxed text-brand-black/80 md:text-xl">
              This page is being finalised. Our full privacy policy will be
              published here before the loyalty programme opens to the public.
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
