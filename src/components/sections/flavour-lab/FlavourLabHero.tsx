import { FlaskGlyph } from "@/components/ui/FlaskGlyph";
import { CORE_COUNT, numberToWord } from "@/lib/flavours";

export function FlavourLabHero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-40 md:pb-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(600px circle at 50% -5%, rgba(255,111,181,0.18), transparent 60%), radial-gradient(500px circle at 100% 40%, rgba(255,45,45,0.12), transparent 60%)",
        }}
      />

      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 text-center md:px-8">
        <p className="neon-red inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.35em] text-brand-red">
          <span>Flavour Lab</span>
          <FlaskGlyph className="h-[1.1em] w-[1.1em] shrink-0" strokeWidth={2.75} />
        </p>

        <h1 className="neon-pink mt-4 font-display font-extrabold uppercase leading-[0.88] tracking-[-0.02em] text-brand-pink text-[clamp(3rem,13vw,6rem)] md:text-[clamp(4rem,10vw,8rem)]">
          Can&rsquo;t
          <br />
          decide?
        </h1>

        <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-brand-white md:text-xl">
          Spin the wheel. Find your flavour. Get stuck in.
        </p>

        <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-brand-white/60">
          {numberToWord(CORE_COUNT)} permanent sauces and rubs plus
          limited-edition drops rotating through the Lab across Milton Keynes
          and Northampton.
        </p>
      </div>
    </section>
  );
}
