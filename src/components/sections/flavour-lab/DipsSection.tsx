import { DoubledHeading } from "@/components/typography/DoubledHeading";
import { DIPS } from "@/lib/flavours";

export function DipsSection() {
  return (
    <section
      className="bg-brand-white py-16 md:py-24"
      aria-label="Dips"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <DoubledHeading
          text="DIPS"
          as="h2"
          fillColor="brand-pink"
          shadowColor="brand-red"
          className="font-display text-[clamp(2.5rem,7vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight"
        />
        <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-brand-black/75">
          Four dips. Pick your partner in crime.
        </p>

        <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {DIPS.map((dip) => (
            <li
              key={dip.slug}
              className="flex min-h-[120px] flex-col items-center justify-center border-2 border-brand-black bg-brand-white p-6 text-center"
            >
              <h3 className="font-display text-lg font-extrabold uppercase leading-tight tracking-tight text-brand-black md:text-xl">
                {dip.name}
              </h3>
              {dip.shortDescription && (
                <p className="mt-2 font-body text-sm text-brand-black/75">
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
