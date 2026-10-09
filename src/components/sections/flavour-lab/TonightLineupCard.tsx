import { FLAVOURS, getCurrentLimitedEdition } from "@/lib/flavours";

export function TonightLineupCard() {
  const le = getCurrentLimitedEdition();
  const otherActiveLE = FLAVOURS.filter(
    (f) => f.status === "active" && f.limitedEdition && f.slug !== le?.slug,
  );
  const core = FLAVOURS.filter((f) => f.status === "core");

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
          <p className="font-display text-[clamp(2.75rem,10vw,3.5rem)] font-extrabold uppercase leading-[0.9] tracking-tight md:text-[clamp(3rem,6vw,4.5rem)]">
            {le.name}
          </p>
        ) : null}
        {otherActiveLE.length > 0 ? (
          <p className="font-display text-[clamp(1.5rem,6vw,2.125rem)] font-extrabold uppercase leading-[0.95] tracking-tight">
            {otherActiveLE.map((f) => f.name).join(" · ")}
          </p>
        ) : null}
        {core.length > 0 ? (
          <p className="font-display text-base font-extrabold uppercase leading-[1.1] tracking-tight md:text-lg">
            {core.map((f) => f.name).join(" · ")}
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
