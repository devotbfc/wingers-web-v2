import { FLAVOURS, getCurrentLimitedEdition } from "@/lib/flavours";

// Tonight's line-up — four tiers, driven by data:
//   • Tier 1 — the current LE (biggest). Hidden if no LE.
//   • Tier 2 — the one "featured" core (medium, own line). Set by
//     `featured: true` on exactly one flavour. Hidden if no featured.
//   • Tier 3 — "flagship core" names (one shared line, medium-small).
//     Flavours with `tier: 3` on their data row.
//   • Tier 4 — the rest of core (smallest shared line). Everything core
//     with no explicit tier falls here.
// Graceful degrade: if any tier has nothing to show, its line is skipped.

export function TonightLineupCard() {
  const le = getCurrentLimitedEdition();
  const otherActiveLE = FLAVOURS.filter(
    (f) => f.status === "active" && f.limitedEdition && f.slug !== le?.slug,
  );
  const featured = FLAVOURS.filter(
    (f) => f.status === "core" && f.featured === true,
  );
  const tier3 = FLAVOURS.filter(
    (f) => f.status === "core" && !f.featured && f.tier === 3,
  );
  const tier4 = FLAVOURS.filter(
    (f) =>
      f.status === "core" && !f.featured && (f.tier === 4 || f.tier === undefined),
  );

  return (
    <section
      aria-labelledby="tonight-lineup-heading"
      className="px-4 pb-10 md:px-8 md:pb-16"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-2 rounded-[32px] bg-brand-pink px-5 py-7 text-center text-lab-black md:rounded-[40px] md:px-12 md:py-12">
        <p
          id="tonight-lineup-heading"
          className="font-body text-xs font-semibold uppercase tracking-[0.2em]"
        >
          Tonight&rsquo;s line-up
        </p>
        {le ? (
          <p className="font-display text-[clamp(2.5rem,13vw,3.5rem)] font-extrabold uppercase leading-[0.9] tracking-tight md:text-[clamp(3.5rem,7.5vw,7.5rem)]">
            {le.name}
          </p>
        ) : null}
        {otherActiveLE.length > 0 ? (
          <p className="font-display text-[clamp(1.5rem,6vw,2.125rem)] font-extrabold uppercase leading-[0.95] tracking-tight">
            {otherActiveLE.map((f) => f.name).join(" · ")}
          </p>
        ) : null}
        {featured.length > 0 ? (
          <p className="font-display text-[clamp(1.75rem,8vw,2.25rem)] font-extrabold uppercase leading-[0.95] tracking-tight md:text-[clamp(2.25rem,4vw,4rem)]">
            {featured.map((f) => f.name).join(" · ")}
          </p>
        ) : null}
        {tier3.length > 0 ? (
          <p className="font-display text-[clamp(1.25rem,5.5vw,1.75rem)] font-extrabold uppercase leading-[1.05] tracking-tight md:text-[clamp(1.75rem,2.5vw,2.75rem)]">
            {tier3.map((f) => f.name).join(" · ")}
          </p>
        ) : null}
        {tier4.length > 0 ? (
          <p className="font-display text-sm font-extrabold uppercase leading-[1.15] tracking-tight md:text-[clamp(1.125rem,1.5vw,1.75rem)]">
            {tier4.map((f) => f.name).join(" · ")}
          </p>
        ) : null}
        <div
          aria-hidden="true"
          className="mx-auto mt-3 h-[2px] w-full max-w-xl bg-lab-black/80"
        />
        <p className="font-body text-xs font-semibold uppercase tracking-[0.08em] md:text-sm">
          Every night · Milton Keynes &amp; Northampton
        </p>
      </div>
    </section>
  );
}
