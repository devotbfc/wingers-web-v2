import type { Metadata } from "next";
import { DoubledHeading } from "@/components/typography/DoubledHeading";
import { Footer } from "@/components/sections/Footer";
import { NavBar } from "@/components/sections/NavBar";
import { OrderPanel } from "@/components/sections/order-panel/OrderPanel";
import { OrderPanelProvider } from "@/components/sections/order-panel/order-panel-context";
import {
  ALLERGEN_ITEMS,
  ALLERGEN_LABELS,
  ALLERGENS_ORDERED,
  type AllergenItem,
} from "@/lib/menu";

export const metadata: Metadata = {
  title: "Allergens — Wingers Menu",
  description:
    "Full allergen matrix for all 95 items on the Wingers menu — wings, tenders, burgers, loaded fries, sides, sauces, shakes, churros, kids meals and coolers. Contains and may-contain-traces listed separately for every one of the 14 UK statutory allergens.",
};

type SectionGroup = {
  section: string;
  sectionSlug: string;
  items: AllergenItem[];
};

const SECTIONS: readonly SectionGroup[] = ALLERGEN_ITEMS.reduce<SectionGroup[]>(
  (acc, item) => {
    const last = acc[acc.length - 1];
    if (last && last.sectionSlug === item.sectionSlug) {
      last.items.push(item);
    } else {
      acc.push({
        section: item.section,
        sectionSlug: item.sectionSlug,
        items: [item],
      });
    }
    return acc;
  },
  []
);

const STICKY_COL =
  "sticky left-0 z-10 bg-brand-white border-r border-brand-black/10";

function ContainsMark({ allergen }: { allergen: string }) {
  return (
    <span
      aria-label={`Contains ${allergen}`}
      className="font-display text-lg leading-none text-brand-red"
    >
      ●
    </span>
  );
}

function TracesMark({ allergen }: { allergen: string }) {
  return (
    <span
      aria-label={`May contain traces of ${allergen}`}
      className="font-display text-lg leading-none text-brand-black/70"
    >
      ◌
    </span>
  );
}

function FreeFromMark({ allergen }: { allergen: string }) {
  return (
    <span aria-label={`Free from ${allergen}`} className="text-brand-black/25">
      —
    </span>
  );
}

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
              className="bg-brand-black text-brand-white p-6 md:p-8"
            >
              <p className="font-body text-base md:text-lg leading-relaxed">
                <strong className="font-display font-extrabold uppercase tracking-tight">
                  Cross-contamination notice.
                </strong>{" "}
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
              className="flex flex-wrap items-center gap-x-6 gap-y-2 border border-brand-black/15 p-4 md:p-5 font-body text-sm text-brand-black"
            >
              <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-black/60">
                Key
              </span>
              <span className="inline-flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="font-display text-lg leading-none text-brand-red"
                >
                  ●
                </span>
                Contains
              </span>
              <span className="inline-flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="font-display text-lg leading-none text-brand-black/70"
                >
                  ◌
                </span>
                May contain traces
              </span>
              <span className="inline-flex items-center gap-2">
                <span aria-hidden="true" className="text-brand-black/40">
                  —
                </span>
                Free from
              </span>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 md:px-8 pb-24">
          {SECTIONS.map((group) => (
            <section
              key={group.sectionSlug}
              aria-labelledby={`allergen-section-${group.sectionSlug}`}
              className="mt-12"
            >
              <h2
                id={`allergen-section-${group.sectionSlug}`}
                className="font-display font-extrabold uppercase leading-tight tracking-tight text-2xl md:text-4xl text-brand-black"
              >
                {group.section}
              </h2>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[900px] border-collapse text-left font-body text-sm">
                  <caption className="sr-only">
                    Allergens contained in — and traces present in — each{" "}
                    {group.section} item. Columns list all 14 UK statutory
                    allergens.
                  </caption>
                  <thead>
                    <tr className="border-b-2 border-brand-black">
                      <th
                        scope="col"
                        className={`${STICKY_COL} py-3 pr-4 pl-0 font-body text-xs font-semibold uppercase tracking-widest text-brand-black align-bottom text-left min-w-[180px]`}
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
                    {group.items.map((item) => {
                      const containsSet = new Set(item.contains);
                      const tracesSet = new Set(item.traces);
                      return (
                        <tr
                          key={item.slug}
                          className="border-b border-brand-black/10"
                        >
                          <th
                            scope="row"
                            className={`${STICKY_COL} py-3 pr-4 pl-0 font-body text-sm md:text-base font-semibold text-brand-black text-left min-w-[180px]`}
                          >
                            {item.name}
                          </th>
                          {ALLERGENS_ORDERED.map((a) => {
                            const label = ALLERGEN_LABELS[a];
                            return (
                              <td
                                key={a}
                                className="py-3 px-2 text-center align-middle"
                              >
                                {containsSet.has(a) ? (
                                  <ContainsMark allergen={label} />
                                ) : tracesSet.has(a) ? (
                                  <TracesMark allergen={label} />
                                ) : (
                                  <FreeFromMark allergen={label} />
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
      <OrderPanel />
    </OrderPanelProvider>
  );
}
