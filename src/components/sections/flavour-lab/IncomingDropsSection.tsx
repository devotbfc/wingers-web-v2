import { Lock } from "lucide-react";
import { DoubledHeading } from "@/components/typography/DoubledHeading";
import { INCOMING_LE } from "@/lib/flavours";
import { HeatFlames } from "./FlameIcon";

export function IncomingDropsSection() {
  if (INCOMING_LE.length === 0) return null;

  return (
    <section
      className="py-16 md:py-24"
      aria-labelledby="incoming-drops-heading"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <DoubledHeading
          text="INCOMING"
          as="h2"
          fillColor="brand-pink"
          shadowColor="brand-red"
          offsetEm="0.06em"
          className="font-display text-[clamp(2.5rem,7vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight"
        />
        <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-brand-white/60">
          Locked drops rotating through the Lab. Names dropped, stories loading.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {INCOMING_LE.map((flavour) => (
            <article
              key={flavour.slug}
              className="relative flex flex-col overflow-hidden rounded-2xl border border-brand-pink/40 bg-brand-white/[0.03] px-4 py-5 md:px-5"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{
                  background:
                    "radial-gradient(circle at 70% 20%, rgba(255,111,181,0.18), transparent 60%)",
                }}
              />
              <div className="relative flex items-start justify-between gap-2">
                <HeatFlames heat={flavour.heat} />
                <Lock
                  className="h-4 w-4 text-brand-pink/70 drop-shadow-[0_0_6px_rgba(255,111,181,0.6)]"
                  aria-hidden="true"
                />
              </div>
              <h3 className="relative mt-3 font-display text-xl font-extrabold uppercase leading-tight tracking-tight text-brand-white/70 md:text-2xl">
                {flavour.name}
              </h3>
              <p className="relative mt-2 font-display text-[10px] font-bold uppercase tracking-[0.3em] text-brand-pink/70">
                Locked · Incoming
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
