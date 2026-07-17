import type { Metadata } from "next";
import Link from "next/link";
import { DoubledHeading } from "@/components/typography/DoubledHeading";
import { Footer } from "@/components/sections/Footer";
import { NavBar } from "@/components/sections/NavBar";
import { OrderPanel } from "@/components/sections/order-panel/OrderPanel";
import { OrderPanelProvider } from "@/components/sections/order-panel/order-panel-context";

export const metadata: Metadata = {
  title: "Page not found — Wingers",
  description: "That page has flown the coop. Head back home or hit the menu.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <OrderPanelProvider>
      <NavBar />
      <main>
        <section className="flex min-h-[80svh] items-center bg-brand-white px-4 md:px-8">
          <div className="mx-auto w-full max-w-6xl">
            <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-brand-red">
              404
            </p>
            <DoubledHeading
              as="h1"
              text="LOST A WING."
              fillColor="brand-red"
              shadowColor="brand-pink"
              offsetEm="0.06em"
              className="mt-4 font-display font-extrabold uppercase leading-[0.85] tracking-tight text-[clamp(3rem,13vw,9rem)]"
            />
            <p className="mt-8 max-w-2xl font-body text-lg leading-relaxed text-brand-black/80 md:text-xl">
              That page flew the coop. Head back home, or hit the menu and get
              stuck in.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center bg-brand-red px-8 font-display text-lg font-bold uppercase tracking-wide text-brand-white transition-colors hover:bg-brand-pink hover:text-brand-black"
              >
                Back Home
              </Link>
              <Link
                href="/menu"
                className="inline-flex min-h-12 items-center justify-center bg-brand-pink px-8 font-display text-lg font-bold uppercase tracking-wide text-brand-black transition-colors hover:bg-brand-black hover:text-brand-white"
              >
                See the Menu
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <OrderPanel />
    </OrderPanelProvider>
  );
}
