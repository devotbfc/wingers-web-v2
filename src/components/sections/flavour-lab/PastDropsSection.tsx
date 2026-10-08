import { PAST_DROPS } from "@/lib/flavours";
import { HeatFlames } from "./FlameIcon";

// Past drops: compact 3-column tiles beneath "Next drops" per the FlavourLab
// board. Each tile is a name + mini flames — no story, no CTA — the archive is
// a reminder that drops rotate, not a product grid. Hidden entirely when there
// are no past drops.
export function PastDropsSection() {
  if (PAST_DROPS.length === 0) return null;

  return (
    <section
      aria-labelledby="past-drops-heading"
      className="pb-16 md:pb-24"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="flex items-baseline justify-between gap-4 opacity-70">
          <h2
            id="past-drops-heading"
            className="font-display text-xl font-extrabold uppercase tracking-tight text-brand-white/80 md:text-2xl"
          >
            Past drops
          </h2>
          <span className="font-body text-xs text-brand-white/50 md:text-sm">
            Was here, gone now.
          </span>
        </div>
        <ul className="mt-5 grid grid-cols-3 gap-1.5 md:grid-cols-4 md:gap-2 lg:grid-cols-6">
          {PAST_DROPS.map((flavour) => (
            <li
              key={flavour.slug}
              className="flex flex-col gap-1 rounded-xl border border-brand-white/10 bg-brand-white/[0.03] px-2.5 py-2 md:px-3 md:py-2.5"
            >
              <span className="font-display text-[11px] font-extrabold uppercase leading-tight tracking-tight text-brand-white/70 md:text-xs">
                {flavour.name}
              </span>
              <HeatFlames heat={flavour.heat} size="xs" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
