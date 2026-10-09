export function NorthamptonExclusiveCard() {
  return (
    <section
      aria-labelledby="northampton-exclusive-heading"
      className="wingers-wrap pb-16 md:pb-24"
    >
      <div className="rounded-[32px] bg-brand-black p-6 text-brand-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] md:rounded-[40px] md:p-10">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-brand-pink">
          Location exclusive
        </p>
        <h2
          id="northampton-exclusive-heading"
          className="mt-3 font-display text-[clamp(1.75rem,5vw,2.75rem)] font-extrabold uppercase leading-[0.95] tracking-tight"
        >
          Beef &middot; 100% Angus
        </h2>
        <p className="mt-3 max-w-xl font-body text-base leading-relaxed text-brand-white/80 md:text-lg">
          Smash burgers you&rsquo;ll only find at the Northampton shop.
        </p>
      </div>
    </section>
  );
}
