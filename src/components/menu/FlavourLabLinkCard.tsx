import Link from "next/link";

export function FlavourLabLinkCard() {
  return (
    <section
      aria-labelledby="flavour-lab-link-heading"
      className="pt-10 md:pt-16"
    >
      <Link
        href="/flavour-lab"
        className="group relative block overflow-hidden rounded-md border border-brand-black/10 bg-brand-white p-6 transition-colors hover:bg-brand-pink/10 md:p-10"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 rounded-full bg-[radial-gradient(circle,theme(colors.brand-pink/35),transparent_70%)] blur-2xl"
        />
        <p className="relative font-display text-xs font-bold uppercase tracking-[0.25em] text-brand-red">
          Our Flavours
        </p>
        <h2
          id="flavour-lab-link-heading"
          className="relative mt-2 font-display text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-brand-black md:text-5xl"
        >
          Explore the Flavour Lab
        </h2>
        <p className="relative mt-3 max-w-2xl font-body text-sm leading-relaxed text-brand-black/70 md:text-base">
          Every sauce and rub we coat our wings, boneless and tenders in — heat,
          story and what pairs with what.
        </p>
        <span className="relative mt-5 inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-brand-red">
          See the lab
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
          >
            <path
              fill="currentColor"
              d="M8.59 16.59 10 18l6-6-6-6-1.41 1.41L13.17 12z"
            />
          </svg>
        </span>
      </Link>
    </section>
  );
}
