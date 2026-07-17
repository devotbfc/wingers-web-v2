import { Lock } from "lucide-react";
import { DoubledHeading } from "@/components/typography/DoubledHeading";
import { PAST_DROPS } from "@/lib/flavours";
import { HeatFlames } from "./FlameIcon";

export function PastDropsSection() {
  if (PAST_DROPS.length === 0) return null;

  return (
    <section
      className="py-16 md:py-24 opacity-80"
      aria-labelledby="past-drops-heading"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <DoubledHeading
          text="PAST DROPS"
          as="h2"
          fillColor="brand-white"
          shadowColor="brand-pink"
          offsetEm="0.06em"
          className="font-display text-[clamp(2.25rem,6vw,4rem)] font-extrabold uppercase leading-[0.9] tracking-tight opacity-60"
        />
        <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-brand-white/45">
          Drops that came, cooked, and closed. Was here, gone now.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {PAST_DROPS.map((flavour) => (
            <article
              key={flavour.slug}
              className="relative flex flex-col overflow-hidden rounded-2xl border border-brand-white/10 bg-brand-white/[0.02] px-4 py-5 md:px-5"
            >
              <div className="relative flex items-start justify-between gap-2">
                <HeatFlames heat={flavour.heat} />
                <Lock
                  className="h-4 w-4 text-brand-white/30"
                  aria-hidden="true"
                />
              </div>
              <h3 className="relative mt-3 font-display text-xl font-extrabold uppercase leading-tight tracking-tight text-brand-white/45 md:text-2xl">
                {flavour.name}
              </h3>
              <p className="relative mt-2 font-display text-[10px] font-bold uppercase tracking-[0.3em] text-brand-white/30 line-through">
                Past Drop
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
