import { DoubledHeading } from "@/components/typography/DoubledHeading";
import { DIPS } from "@/lib/flavours";

export function DipsSection() {
  return (
    <section className="py-16 md:py-24" aria-label="Dips">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <DoubledHeading
          text="DIPS"
          as="h2"
          fillColor="brand-pink"
          shadowColor="brand-red"
          className="font-display text-[clamp(2.5rem,7vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight"
        />
        <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-brand-white/60">
          Four dips. Pick your partner in crime.
        </p>

        <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {DIPS.map((dip) => (
            <li
              key={dip.slug}
              className="group flex min-h-[132px] flex-col items-center justify-center rounded-2xl border border-brand-white/10 bg-brand-white/[0.03] p-6 text-center transition-all hover:border-brand-pink/50 hover:bg-brand-pink/[0.06] hover:[box-shadow:0_0_0_1px_rgba(255,111,181,0.5),0_0_14px_rgba(255,111,181,0.35),inset_0_0_18px_rgba(255,111,181,0.08)]"
            >
              <h3 className="font-display text-lg font-extrabold uppercase leading-tight tracking-tight text-brand-white transition-colors group-hover:text-brand-pink md:text-xl">
                {dip.name}
              </h3>
              {dip.shortDescription && (
                <p className="mt-2 font-body text-sm text-brand-white/60">
                  {dip.shortDescription}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
