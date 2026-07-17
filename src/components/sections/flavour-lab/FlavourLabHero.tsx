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

      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <p className="font-display text-[11px] font-bold uppercase tracking-[0.35em] text-brand-pink/70">
          Wingers · Halal Fried Chicken
        </p>

        <h1 className="mt-4 font-display font-extrabold uppercase leading-[0.9] tracking-[-0.03em]">
          <span className="sr-only">Flavour Lab</span>
          <span
            aria-hidden="true"
            className="block text-[clamp(3rem,12vw,9rem)] text-brand-white"
          >
            FLAVOUR
          </span>
          <span
            aria-hidden="true"
            className="glow-edge-pink mt-2 inline-flex items-center gap-3 rounded-2xl bg-brand-pink px-4 py-1 text-[clamp(3rem,12vw,9rem)] text-brand-black md:gap-5 md:px-6"
          >
            LAB
            <FlaskGlyph className="h-[0.8em] w-[0.8em] shrink-0" />
          </span>
        </h1>

        <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-brand-white md:text-xl">
          Twenty-four flavours. One wheel. Get stuck in.
        </p>

        <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-brand-white/60">
          Where we cook up the loud stuff — ten permanent sauces and rubs plus
          fourteen limited-edition drops across Milton Keynes and Northampton.
          Spin the wheel to pick one, or filter by heat.
        </p>
      </div>
    </section>
  );
}

function FlaskGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M15 5h10v2h-1v9.5l7.5 13A3.5 3.5 0 0 1 28.4 35H11.6a3.5 3.5 0 0 1-3.1-5.5L16 16.5V7h-1V5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      <circle cx="17" cy="26" r="1.5" fill="currentColor" />
      <circle cx="23" cy="29" r="1" fill="currentColor" />
    </svg>
  );
}
