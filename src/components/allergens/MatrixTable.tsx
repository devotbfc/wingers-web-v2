import {
  ALLERGEN_LABELS,
  ALLERGENS_ORDERED,
  type Allergen,
} from "@/lib/menu";
import { cn } from "@/lib/utils";
import { ALLERGEN_SECTIONS } from "./allergen-sections";

interface MatrixTableProps {
  /** Allergens the user is avoiding, in click order. The first N columns
   *  of each table are these allergens — stable left-side placement so a
   *  scanner can confirm all picks at once without horizontal scroll. */
  avoid: readonly Allergen[];
  /** Hide rows that contain any avoided allergen. */
  hide: boolean;
}

const STICKY_COL =
  "sticky left-0 z-10 bg-brand-white border-r border-brand-black/10 shadow-[6px_0_8px_-6px_rgba(10,10,10,0.18)]";

function ContainsMark({ allergen }: { allergen: string }) {
  return (
    <span
      aria-label={`Contains ${allergen}`}
      className="font-display text-lg leading-none text-brand-red"
    >
      ■
    </span>
  );
}

function TracesMark({ allergen }: { allergen: string }) {
  return (
    <span
      aria-label={`May contain traces of ${allergen}`}
      className="font-display text-lg leading-none text-brand-black/70"
    >
      □
    </span>
  );
}

function TracesPickedMark({ allergen }: { allergen: string }) {
  return (
    <span
      aria-label={`May contain traces of ${allergen} (one of your allergens)`}
      className="inline-block h-3.5 w-3.5 rounded-full border-2 border-brand-red-cta"
    />
  );
}

function FreeFromMark({ allergen }: { allergen: string }) {
  return (
    <span aria-label={`Free from ${allergen}`} className="text-brand-black/25">
      —
    </span>
  );
}

function HitIndicator() {
  return (
    <span
      aria-hidden="true"
      className="mr-1.5 inline-flex h-[14px] w-[14px] items-center justify-center rounded-full bg-brand-red-cta font-display text-[11px] font-extrabold leading-none text-brand-white"
      title="Contains one of your allergens"
    >
      !
    </span>
  );
}

export function MatrixTable({ avoid, hide }: MatrixTableProps) {
  const avoidSet = new Set(avoid);

  // Column order: avoided allergens first (in the user's click order),
  // then every other UK statutory allergen in ALLERGENS_ORDERED order.
  const columnOrder: Allergen[] = [
    ...avoid.filter((a) => ALLERGENS_ORDERED.includes(a)),
    ...ALLERGENS_ORDERED.filter((a) => !avoidSet.has(a)),
  ];

  return (
    <>
      {ALLERGEN_SECTIONS.map((group) => {
        const items =
          hide && avoidSet.size > 0
            ? group.items.filter(
                (item) => !item.contains.some((a) => avoidSet.has(a)),
              )
            : group.items;

        if (items.length === 0) return null;

        return (
          <section
            key={group.sectionSlug}
            id={`section-${group.sectionSlug}`}
            aria-labelledby={`allergen-section-${group.sectionSlug}`}
            style={{ scrollMarginTop: "calc(var(--nav-h) + 1rem)" }}
            className="mt-12 first:mt-6"
          >
            <h2
              id={`allergen-section-${group.sectionSlug}`}
              className="font-display font-extrabold uppercase leading-tight tracking-tight text-2xl md:text-4xl text-brand-black"
            >
              {group.section}
            </h2>
            <p
              aria-hidden="true"
              className="mt-2 font-display text-xs font-bold uppercase tracking-widest text-brand-black/60"
            >
              <span className="text-brand-red">■</span> Contains ·{" "}
              <span className="text-brand-black/70">□</span> May contain
              traces · <span className="text-brand-black/40">—</span> Free
              from
            </p>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[900px] border-collapse text-left font-body text-sm">
                <caption className="sr-only">
                  Allergens contained in — and traces present in — each{" "}
                  {group.section} item. Columns list all 14 UK statutory
                  allergens; selected allergens appear first.
                </caption>
                <thead>
                  <tr className="border-b-2 border-brand-black">
                    <th
                      scope="col"
                      className={`${STICKY_COL} py-3 pr-4 pl-0 font-body text-xs font-semibold uppercase tracking-widest text-brand-black align-bottom text-left min-w-[180px]`}
                    >
                      Item
                    </th>
                    {columnOrder.map((a) => {
                      const picked = avoidSet.has(a);
                      return (
                        <th
                          key={a}
                          scope="col"
                          className={cn(
                            "py-3 px-2 font-body text-[10px] md:text-xs font-semibold uppercase tracking-wider align-bottom text-center whitespace-nowrap",
                            picked
                              ? "bg-brand-red-cta/10 text-brand-red-cta"
                              : "text-brand-black",
                          )}
                        >
                          {ALLERGEN_LABELS[a]}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => {
                    const containsSet = new Set(item.contains);
                    const tracesSet = new Set(item.traces);
                    const containsHit = item.contains.some((a) =>
                      avoidSet.has(a),
                    );
                    return (
                      <tr
                        key={item.slug}
                        id={`item-${item.slug}`}
                        className={cn(
                          "border-b border-brand-black/10 scroll-mt-[calc(var(--nav-h)+1rem)]",
                          containsHit && "bg-brand-red-cta/5",
                        )}
                      >
                        <th
                          scope="row"
                          className={`${STICKY_COL} py-3 pr-4 pl-0 font-body text-sm md:text-base font-semibold text-brand-black text-left min-w-[180px]`}
                        >
                          {containsHit && <HitIndicator />}
                          {item.name}
                        </th>
                        {columnOrder.map((a) => {
                          const label = ALLERGEN_LABELS[a];
                          const picked = avoidSet.has(a);
                          return (
                            <td
                              key={a}
                              className="py-3 px-2 text-center align-middle"
                            >
                              {containsSet.has(a) ? (
                                <ContainsMark allergen={label} />
                              ) : tracesSet.has(a) ? (
                                picked ? (
                                  <TracesPickedMark allergen={label} />
                                ) : (
                                  <TracesMark allergen={label} />
                                )
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
        );
      })}
    </>
  );
}
