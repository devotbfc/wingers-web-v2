import type { Metadata } from "next";
import { DoubledHeading } from "@/components/typography/DoubledHeading";
import { Footer } from "@/components/sections/Footer";
import { NavBar } from "@/components/sections/NavBar";
import { OrderPanel } from "@/components/sections/order-panel/OrderPanel";
import { OrderPanelProvider } from "@/components/sections/order-panel/order-panel-context";
import { CATEGORIES, MENU } from "@/lib/menu";
import type { Allergen } from "@/lib/menu";

export const metadata: Metadata = {
  title: "Allergens — Wingers Menu",
  description:
    "Allergen information for every item on the Wingers menu. The 14 UK statutory allergens, listed per item across wings, tenders, burgers, loaded fries, sides and drinks.",
};

const ALLERGENS_ORDERED: readonly Allergen[] = [
  "gluten",
  "milk",
  "eggs",
  "soya",
  "sesame",
  "peanuts",
  "tree-nuts",
  "celery",
  "mustard",
  "lupin",
  "sulphites",
  "fish",
  "crustaceans",
  "molluscs",
];

const ALLERGEN_LABELS: Record<Allergen, string> = {
  gluten: "Gluten",
  milk: "Milk",
  eggs: "Eggs",
  soya: "Soya",
  sesame: "Sesame",
  peanuts: "Peanuts",
  "tree-nuts": "Tree nuts",
  celery: "Celery",
  mustard: "Mustard",
  lupin: "Lupin",
  sulphites: "Sulphites",
  fish: "Fish",
  crustaceans: "Crustaceans",
  molluscs: "Molluscs",
};

export default function AllergiesPage() {
  return (
    <OrderPanelProvider>
      <NavBar />
      <main>
        <section className="pt-32 md:pt-40 px-4 md:px-8 pb-8">
          <div className="mx-auto max-w-6xl">
            <DoubledHeading
              as="h1"
              text="ALLERGENS."
              fillColor="brand-red"
              shadowColor="brand-pink"
              offsetEm="0.06em"
              className="font-display font-extrabold uppercase leading-[0.85] tracking-tight text-[clamp(2.5rem,8vw,5.5rem)]"
            />
            <p className="mt-6 max-w-2xl font-body text-lg md:text-xl leading-relaxed text-brand-black">
              This page lists the 14 UK statutory allergens present in every
              item on the Wingers menu. Read carefully — if you have a serious
              allergy, tell the shop team before you order.
            </p>
          </div>
        </section>

        <section className="px-4 md:px-8">
          <div className="mx-auto max-w-6xl">
            <aside
              role="note"
              data-todo="copy"
              className="bg-brand-black text-brand-white p-6 md:p-8"
            >
              <p className="font-body text-base md:text-lg leading-relaxed">
                <strong className="font-display font-extrabold uppercase tracking-tight">
                  Cross-contamination notice.
                </strong>{" "}
                All items are prepared in a kitchen that handles gluten, milk,
                eggs, soya, sesame, peanuts, tree nuts, mustard, celery,
                sulphites, lupin, fish, crustaceans and molluscs. We cannot
                guarantee any item is free from traces of any allergen.
              </p>
            </aside>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 md:px-8 pb-24">
          {CATEGORIES.map((category) => {
            const items = MENU.filter(
              (item) => item.categorySlug === category.slug
            );
            if (items.length === 0) return null;

            return (
              <section
                key={category.slug}
                aria-labelledby={`allergen-cat-${category.slug}`}
                className="mt-12"
              >
                <h2
                  id={`allergen-cat-${category.slug}`}
                  className="font-display font-extrabold uppercase leading-tight tracking-tight text-2xl md:text-4xl text-brand-black"
                >
                  {category.name}
                </h2>
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full min-w-[720px] border-collapse text-left font-body text-sm">
                    <caption className="sr-only">
                      Allergens contained in each {category.name} item.
                    </caption>
                    <thead>
                      <tr className="border-b-2 border-brand-black">
                        <th
                          scope="col"
                          className="py-3 pr-4 font-body text-xs font-semibold uppercase tracking-widest text-brand-black align-bottom text-left"
                        >
                          Item
                        </th>
                        {ALLERGENS_ORDERED.map((a) => (
                          <th
                            key={a}
                            scope="col"
                            className="py-3 px-2 font-body text-[10px] md:text-xs font-semibold uppercase tracking-wider text-brand-black align-bottom text-center whitespace-nowrap"
                          >
                            {ALLERGEN_LABELS[a]}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr
                          key={item.slug}
                          className="border-b border-brand-black/10"
                        >
                          <th
                            scope="row"
                            className="py-3 pr-4 font-body text-sm md:text-base font-semibold text-brand-black text-left"
                          >
                            {item.name}
                          </th>
                          {ALLERGENS_ORDERED.map((a) => {
                            const contains = item.allergens.includes(a);
                            return (
                              <td
                                key={a}
                                className="py-3 px-2 text-center"
                              >
                                {contains ? (
                                  <span
                                    aria-label={`Contains ${ALLERGEN_LABELS[a]}`}
                                    className="font-display text-lg leading-none text-brand-red"
                                  >
                                    ●
                                  </span>
                                ) : (
                                  <span
                                    aria-label="Free from"
                                    className="text-brand-black/25"
                                  >
                                    —
                                  </span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            );
          })}
        </div>
      </main>
      <Footer />
      <OrderPanel />
    </OrderPanelProvider>
  );
}
