import type { Metadata } from "next";
import { Suspense } from "react";
import { AllergenMatrix } from "@/components/allergens/AllergenMatrix";
import { AllergenMatrixFallback } from "@/components/allergens/AllergenMatrixFallback";
import { Footer } from "@/components/sections/Footer";
import { NavBar } from "@/components/sections/NavBar";
import { OrderPanel } from "@/components/sections/order-panel/OrderPanel";
import { OrderPanelProvider } from "@/components/sections/order-panel/order-panel-context";

export const metadata: Metadata = {
  title: "Allergens — Wingers Buttermilk Halal Fried Chicken Menu",
  description:
    "Full allergen matrix for Wingers buttermilk halal fried chicken — 95 items across Milton Keynes & Northampton. UK 14 statutory allergens listed.",
  alternates: { canonical: "/allergies" },
  openGraph: {
    title: "Allergens — Wingers Buttermilk Halal Fried Chicken Menu",
    description:
      "Full allergen matrix for the Wingers buttermilk halal fried chicken menu. UK 14 statutory allergens per item.",
    url: "/allergies",
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

export default function AllergiesPage() {
  return (
    <OrderPanelProvider>
      <NavBar />
      <main>
        <section className="pt-32 md:pt-40 px-4 md:px-8 pb-8">
          <div className="mx-auto max-w-6xl">
            <h1 className="font-display font-extrabold uppercase leading-[0.85] tracking-tight text-[clamp(2.5rem,8vw,5.5rem)] text-brand-red">
              ALLERGENS.
            </h1>
            <p className="mt-6 max-w-2xl font-body text-lg md:text-xl leading-relaxed text-brand-black">
              Wingers publishes allergen information for all 95 items on the
              menu. Every one of the 14 UK statutory allergens is listed per
              item, with a clear distinction between allergens the item{" "}
              <strong>contains</strong> and those it{" "}
              <strong>may contain traces of</strong>. Read carefully — if you
              have a serious allergy, tell the shop team before you order.
            </p>
          </div>
        </section>

        <section className="px-4 md:px-8">
          <div className="mx-auto max-w-6xl">
            <aside
              role="note"
              className="border-l-4 border-brand-red bg-brand-pink/15 p-6 text-brand-black md:p-8"
            >
              <h3 className="mb-2 font-display font-extrabold uppercase tracking-tight text-brand-black">
                Cross-contamination notice.
              </h3>
              <p className="font-body text-base md:text-lg leading-relaxed">
                All items are prepared in kitchens that handle gluten, milk,
                eggs, soya, sesame, peanuts, tree nuts, mustard, celery,
                sulphites, lupin, fish, crustaceans and molluscs. We cannot
                guarantee any item is completely free from traces of any
                allergen.
              </p>
            </aside>
          </div>
        </section>

        <section className="px-4 md:px-8 mt-8">
          <div className="mx-auto max-w-6xl">
            <div
              role="note"
              aria-label="Legend"
              className="flex flex-wrap items-center gap-x-6 gap-y-2 border border-brand-black/15 p-4 md:p-5 text-brand-black"
            >
              <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-black/60">
                Key
              </span>
              <span className="inline-flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="font-display text-base leading-none text-brand-red"
                >
                  ■
                </span>
                <span className="font-display text-sm font-bold uppercase tracking-wider">
                  Contains
                </span>
              </span>
              <span className="inline-flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="font-display text-base leading-none text-brand-black/70"
                >
                  □
                </span>
                <span className="font-display text-sm font-bold uppercase tracking-wider">
                  May contain traces
                </span>
              </span>
              <span className="inline-flex items-center gap-2">
                <span aria-hidden="true" className="text-brand-black/40">
                  —
                </span>
                <span className="font-display text-sm font-bold uppercase tracking-wider">
                  Free from
                </span>
              </span>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 md:px-8 pb-24">
          {/* Chips + matrix. useSearchParams in AllergenMatrix forces a
              dynamic bailout for just this subtree; Suspense keeps the
              rest of /allergies statically prerenderable. The fallback
              renders the full matrix in its default unfiltered state so
              there's no empty flash on hydration. */}
          <Suspense fallback={<AllergenMatrixFallback />}>
            <AllergenMatrix />
          </Suspense>
        </div>
      </main>
      <Footer />
      <OrderPanel />
    </OrderPanelProvider>
  );
}
