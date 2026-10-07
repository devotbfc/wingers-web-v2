import type { Metadata } from "next";
import { Footer } from "@/components/sections/Footer";
import { NavBar } from "@/components/sections/NavBar";
import { OrderPanel } from "@/components/sections/order-panel/OrderPanel";
import { OrderPanelProvider } from "@/components/sections/order-panel/order-panel-context";
import { BrandButton } from "@/components/brand/BrandButton";
import { FranchiseEnquiryForm } from "./FranchiseEnquiryForm";
import { FRANCHISE_FAQS, buildFranchiseFaqJsonLd } from "./faq-data";

export const metadata: Metadata = {
  title: "Franchise Opportunities — The Big Flavour Co",
  description:
    "Franchise opportunities from The Big Flavour Co — the team behind Wingers, serving buttermilk halal fried chicken in Milton Keynes and Northampton.",
  alternates: { canonical: "/franchise" },
  openGraph: {
    title: "Franchise Opportunities — The Big Flavour Co",
    description:
      "Franchise opportunities from The Big Flavour Co — the team behind Wingers.",
    url: "/franchise",
    type: "website",
    images: [
      {
        url: "/og/default.png",
        width: 1200,
        height: 630,
        alt: "The Big Flavour Co",
      },
    ],
  },
};

interface Pillar {
  readonly n: string;
  readonly label: string;
  readonly copy: string;
}

// data-todo="content" lives on the tiles in the JSX below. These three
// paragraphs describe the Wingers process; the sister brand may use the same
// one, but Benson needs to confirm before publish. While unconfirmed, flip
// SHOW_PILLARS to false so the tiles render as nothing (the data stays here
// and the data-todo attribute stays in the JSX for grep). Flip to true on
// confirmation. See docs/TODO-content.md.
const SHOW_PILLARS = false;

const PILLARS: readonly Pillar[] = [
  {
    n: "01",
    label: "BRINE",
    copy: "A 24-hour buttermilk brine. Tender the whole way through, seasoned to the bone.",
  },
  {
    n: "02",
    label: "DREDGE",
    copy: "Hand-tossed in seasoned flour until the crust turns craggy. No machines.",
  },
  {
    n: "03",
    label: "FRY",
    copy: "Dropped in fresh oil and fried to order. Golden, loud, crunchy \u2014 never sitting under a lamp.",
  },
];

const WHO_TRAITS: readonly string[] = [
  "An operator mindset \u2014 you want to run the shop, not just own it.",
  "Hands-on, calm under pressure, happy on the pass.",
  "Hospitality background welcome; not required.",
  "Aligned with the brand \u2014 halal, hospitality-first, quality-led.",
];

const PROVIDE: readonly string[] = [
  "The brand, developed with the same care as the shops we run ourselves.",
  "The menu, with recipes and specifications documented from first principles.",
  "Supplier relationships we have built and trust.",
  "Launch training for you and your team, on-site.",
  "Operational support once the shop is open \u2014 we are a phone call away.",
];

const STEPS: readonly { n: string; label: string; copy: string }[] = [
  {
    n: "01",
    label: "Enquire",
    copy: "Send us the form below. Tell us where and when.",
  },
  {
    n: "02",
    label: "Intro call",
    copy: "A short call so we both know whether it is worth going further.",
  },
  {
    n: "03",
    label: "Discovery day",
    copy: "Spend time with the team. See how the shop works end-to-end.",
  },
  {
    n: "04",
    label: "Agreement",
    copy: "Terms, territory, timings. Signed when everyone is ready.",
  },
  {
    n: "05",
    label: "Open",
    copy: "Build-out, training, launch. We are on the ground for opening week.",
  },
];

export default function FranchisePage() {
  const faqJsonLd = buildFranchiseFaqJsonLd();

  return (
    <OrderPanelProvider>
      <NavBar />
      <main>
        <section className="px-4 pt-28 pb-10 md:px-8 md:pt-40 md:pb-20">
          <div className="mx-auto w-full max-w-6xl">
            <h1 className="font-display font-extrabold uppercase leading-[0.85] tracking-tight break-words text-[clamp(2.25rem,11vw,6rem)] md:text-[clamp(3rem,10vw,8rem)] text-brand-red">
              FRANCHISE OPPORTUNITIES.
            </h1>
            <p className="mt-8 max-w-2xl font-body text-lg md:text-xl leading-relaxed text-brand-black">
              From The Big Flavour Co &mdash; the team behind Wingers.
              Buttermilk halal fried chicken, built properly. We are opening up
              franchise opportunities for a sister brand to the right
              operators.
            </p>
            <div className="mt-10">
              <BrandButton
                href="#enquiry"
                variant="secondary"
                size="lg"
              >
                Start the conversation
              </BrandButton>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="who-we-are-heading"
          className="bg-brand-white px-4 py-10 md:px-8 md:py-20"
        >
          <div className="mx-auto max-w-3xl">
            <h2
              id="who-we-are-heading"
              className="font-display font-extrabold uppercase leading-tight tracking-tight text-3xl md:text-5xl text-brand-black"
            >
              WHO WE ARE.
            </h2>
            <div className="mt-6 space-y-4 font-body text-base md:text-lg leading-relaxed text-brand-black/80">
              <p>
                The Big Flavour Co is the team behind Wingers. We built and
                run two shops ourselves, in Milton Keynes and Northampton, and
                we know what it takes to open the doors and keep them open.
              </p>
              <p>
                The franchise brand is a sister concept from the same team.
                Different name, same standard. Full details are shared on the
                intro call.
              </p>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="what-we-do-heading"
          className="px-4 py-10 md:px-8 md:py-20"
        >
          <div className="mx-auto max-w-6xl">
            <h2
              id="what-we-do-heading"
              className="font-display font-extrabold uppercase leading-tight tracking-tight text-3xl md:text-5xl text-brand-black"
            >
              WHAT WE DO.
            </h2>
            <p className="mt-6 max-w-2xl font-body text-base md:text-lg leading-relaxed text-brand-black/80">
              Buttermilk fried chicken, done properly. No shortcuts, no
              lamp-warmers, halal throughout.
            </p>
            {SHOW_PILLARS && (
              <ul
                className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:snap-none md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0"
                data-todo="content"
                data-todo-note="Benson to confirm the sister brand uses the same brine/dredge/fry process before publish."
              >
                {PILLARS.map((p) => (
                  <li
                    key={p.n}
                    className="min-w-[75%] snap-start rounded-md border border-brand-black/10 bg-brand-white p-6 md:min-w-0"
                  >
                    <div className="flex items-baseline gap-3">
                      <span
                        aria-hidden="true"
                        className="font-display text-4xl font-extrabold text-brand-red md:text-5xl"
                      >
                        {p.n}
                      </span>
                      <h3 className="font-display text-xl font-bold uppercase tracking-tight text-brand-black md:text-2xl">
                        {p.label}
                      </h3>
                    </div>
                    <p className="mt-4 font-body text-base leading-relaxed text-brand-black/80">
                      {p.copy}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section
          aria-labelledby="who-looking-heading"
          className="bg-brand-white px-4 py-10 md:px-8 md:py-20"
        >
          <div className="mx-auto max-w-3xl">
            <h2
              id="who-looking-heading"
              className="font-display font-extrabold uppercase leading-tight tracking-tight text-3xl md:text-5xl text-brand-black"
            >
              WHO WE&rsquo;RE LOOKING FOR.
            </h2>
            <ul className="mt-6 list-disc space-y-3 pl-6 font-body text-base md:text-lg leading-relaxed text-brand-black/80">
              {WHO_TRAITS.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </section>

        <section
          aria-labelledby="what-we-provide-heading"
          className="px-4 py-10 md:px-8 md:py-20"
        >
          <div className="mx-auto max-w-3xl">
            <h2
              id="what-we-provide-heading"
              className="font-display font-extrabold uppercase leading-tight tracking-tight text-3xl md:text-5xl text-brand-black"
            >
              WHAT WE PROVIDE.
            </h2>
            <ul className="mt-6 list-disc space-y-3 pl-6 font-body text-base md:text-lg leading-relaxed text-brand-black/80">
              {PROVIDE.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </section>

        <section
          aria-labelledby="how-it-works-heading"
          className="bg-brand-white px-4 py-10 md:px-8 md:py-20"
        >
          <div className="mx-auto max-w-6xl">
            <h2
              id="how-it-works-heading"
              className="font-display font-extrabold uppercase leading-tight tracking-tight text-3xl md:text-5xl text-brand-black"
            >
              HOW IT WORKS.
            </h2>
            <ol className="mt-8 grid gap-4 md:grid-cols-5">
              {STEPS.map((s) => (
                <li
                  key={s.n}
                  className="rounded-md border border-brand-black/10 bg-brand-white p-5"
                >
                  <span
                    aria-hidden="true"
                    className="font-display text-2xl font-extrabold text-brand-red"
                  >
                    {s.n}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-bold uppercase tracking-tight text-brand-black">
                    {s.label}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-brand-black/80">
                    {s.copy}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          aria-labelledby="investment-heading"
          className="px-4 py-10 md:px-8 md:py-20"
        >
          <div className="mx-auto max-w-3xl">
            <h2
              id="investment-heading"
              className="font-display font-extrabold uppercase leading-tight tracking-tight text-3xl md:text-5xl text-brand-black"
            >
              INVESTMENT.
            </h2>
            <p className="mt-6 font-body text-base md:text-lg leading-relaxed text-brand-black/80">
              Full investment details &mdash; including fees and build-out
              costs &mdash; are shared after an initial call, so the
              conversation fits the site and the operator.
            </p>
          </div>
        </section>

        <section
          aria-labelledby="faq-heading"
          className="bg-brand-white px-4 py-10 md:px-8 md:py-20"
        >
          <div className="mx-auto max-w-3xl">
            <h2
              id="faq-heading"
              className="font-display font-extrabold uppercase leading-tight tracking-tight text-3xl md:text-5xl text-brand-black"
            >
              FAQ.
            </h2>
            <ul className="mt-8 space-y-3">
              {FRANCHISE_FAQS.filter((f) => !f.hidden).map((f) => (
                <li key={f.q}>
                  <details
                    className="group rounded-md border border-brand-black/10 bg-brand-white px-5 py-4 open:pb-5"
                    {...(f.todo
                      ? {
                          "data-todo": "content",
                          "data-todo-note":
                            "Benson to confirm the sister brand is halal before publish.",
                        }
                      : {})}
                  >
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-lg md:text-xl font-bold uppercase tracking-tight text-brand-black transition-colors group-hover:text-brand-red">
                      <span>{f.q}</span>
                      <span
                        aria-hidden="true"
                        className="mt-1 shrink-0 text-brand-red transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-4 font-body text-base md:text-lg leading-relaxed text-brand-black/80">
                      {f.a}
                    </p>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="enquiry"
          aria-labelledby="enquiry-heading"
          className="scroll-mt-24 px-4 py-10 md:px-8 md:py-20"
        >
          <div className="mx-auto max-w-3xl">
            <h2
              id="enquiry-heading"
              className="font-display font-extrabold uppercase leading-tight tracking-tight text-3xl md:text-5xl text-brand-black"
            >
              ENQUIRE.
            </h2>
            <p className="mt-6 font-body text-base md:text-lg leading-relaxed text-brand-black/80">
              Send us a few details and the team will be in touch.
            </p>
            <div className="mt-8">
              <FranchiseEnquiryForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <OrderPanel />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </OrderPanelProvider>
  );
}
