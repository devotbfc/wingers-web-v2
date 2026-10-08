import type { Metadata } from "next";
import { Check } from "lucide-react";

import { Footer } from "@/components/sections/Footer";
import { NavBar } from "@/components/sections/NavBar";
import { OrderPanel } from "@/components/sections/order-panel/OrderPanel";
import { OrderPanelProvider } from "@/components/sections/order-panel/order-panel-context";
import { BrandButton } from "@/components/brand/BrandButton";
import { FranchiseEnquiryForm } from "./FranchiseEnquiryForm";
import { FRANCHISE_FAQS, buildFranchiseFaqJsonLd } from "./faq-data";

export const metadata: Metadata = {
  title: "Franchise Opportunities — Wingers",
  description:
    "Franchise opportunities from the team behind Wingers — buttermilk halal fried chicken in Milton Keynes and Northampton.",
  alternates: { canonical: "/franchise" },
  openGraph: {
    title: "Franchise Opportunities — Wingers",
    description:
      "Franchise opportunities from the team behind Wingers.",
    url: "/franchise",
    type: "website",
    images: [
      {
        url: "/og/default.png",
        width: 1200,
        height: 630,
        alt: "Wingers",
      },
    ],
  },
};

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
  const visibleFaqs = FRANCHISE_FAQS.filter((f) => !f.hidden);

  return (
    <OrderPanelProvider>
      <NavBar />
      <main className="bg-brand-black text-brand-white">
        <section className="wingers-wrap pt-28 pb-14 md:pt-40 md:pb-20">
          <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-brand-white/60">
            From the team behind Wingers
          </p>
          <h1 className="mt-4 font-display font-extrabold uppercase leading-[0.86] tracking-tight text-[clamp(3rem,11vw,7rem)]">
            FRANCHISE{" "}
            <span className="text-brand-pink">OPPORTUNITIES.</span>
          </h1>
          <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-brand-white/80 md:text-xl">
            Buttermilk fried chicken, built properly. We are opening up
            franchise opportunities for a sister brand to the right
            operators.
          </p>
          <div className="mt-8">
            <BrandButton href="#enquiry" variant="primary" size="lg">
              Start the conversation
            </BrandButton>
          </div>
        </section>

        <section
          aria-labelledby="who-we-are-heading"
          className="wingers-wrap pb-10 md:pb-16"
        >
          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            <div className="rounded-[32px] bg-brand-warm-grey p-7 text-brand-black md:rounded-[40px] md:p-10">
              <h2
                id="who-we-are-heading"
                className="font-display font-extrabold uppercase leading-[0.95] tracking-tight text-[clamp(2rem,5vw,2.75rem)]"
              >
                Who we are.
              </h2>
              <p className="mt-4 font-body text-base leading-relaxed md:text-lg">
                We are the team behind Wingers. We built and run two shops
                ourselves, in Milton Keynes and Northampton, and we know what
                it takes to open the doors and keep them open.
              </p>
              <p className="mt-3 font-body text-base leading-relaxed md:text-lg">
                The franchise brand is a sister concept from the same team.
                Different name, same standard. Full details are shared on the
                intro call.
              </p>
            </div>
            <div className="rounded-[32px] border border-brand-white/15 bg-brand-white/[0.04] p-7 md:rounded-[40px] md:p-10">
              <h2 className="font-display font-extrabold uppercase leading-[0.95] tracking-tight text-[clamp(2rem,5vw,2.75rem)]">
                What we do.
              </h2>
              <p className="mt-4 font-body text-base leading-relaxed text-brand-white/80 md:text-lg">
                Buttermilk fried chicken, done properly. No shortcuts, no
                lamp-warmers, halal throughout.
              </p>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="who-looking-heading"
          className="wingers-wrap pb-10 md:pb-16"
        >
          <h2
            id="who-looking-heading"
            className="font-display font-extrabold uppercase leading-[0.95] tracking-tight text-[clamp(2rem,5vw,2.75rem)]"
          >
            Who we&rsquo;re looking for.
          </h2>
          <ul className="mt-6 flex flex-col gap-3">
            {WHO_TRAITS.map((t) => (
              <li
                key={t}
                className="flex items-start gap-3 font-body text-base leading-relaxed text-brand-white/85 md:text-lg"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-pink text-brand-black"
                >
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="what-we-provide-heading"
          className="wingers-wrap pb-10 md:pb-16"
        >
          <h2
            id="what-we-provide-heading"
            className="font-display font-extrabold uppercase leading-[0.95] tracking-tight text-[clamp(2rem,5vw,2.75rem)]"
          >
            What we provide.
          </h2>
          <ul className="mt-6 flex flex-col gap-3">
            {PROVIDE.map((p) => (
              <li
                key={p}
                className="rounded-[20px] border border-brand-white/15 bg-brand-white/[0.04] px-5 py-4 font-body text-base leading-relaxed text-brand-white/85 md:text-lg"
              >
                {p}
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="how-it-works-heading"
          className="wingers-wrap pb-10 md:pb-16"
        >
          <h2
            id="how-it-works-heading"
            className="font-display font-extrabold uppercase leading-[0.95] tracking-tight text-[clamp(2rem,5vw,2.75rem)]"
          >
            How it works.
          </h2>
          <ol className="mt-6 flex flex-col">
            {STEPS.map((s, i) => (
              <li key={s.n} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-pink font-display text-sm font-extrabold text-brand-black">
                    {s.n}
                  </span>
                  {i < STEPS.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="w-0.5 flex-grow bg-brand-white/20"
                    />
                  ) : null}
                </div>
                <div className="flex flex-col gap-1 pb-5 pt-2 last:pb-0">
                  <h3 className="font-display text-xl font-extrabold uppercase leading-[0.95] tracking-tight md:text-2xl">
                    {s.label}
                  </h3>
                  <p className="font-body text-sm leading-relaxed text-brand-white/80 md:text-base">
                    {s.copy}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section
          aria-labelledby="investment-heading"
          className="wingers-wrap pb-10 md:pb-16"
        >
          <div className="rounded-[32px] bg-brand-pink p-7 text-brand-black md:rounded-[40px] md:p-10">
            <h2
              id="investment-heading"
              className="font-display font-extrabold uppercase leading-[0.95] tracking-tight text-[clamp(2rem,5vw,2.75rem)]"
            >
              Investment.
            </h2>
            <p className="mt-4 font-body text-base leading-relaxed md:text-lg">
              Full investment details &mdash; including fees and build-out
              costs &mdash; are shared after an initial call, so the
              conversation fits the site and the operator.
            </p>
          </div>
        </section>

        <section
          aria-labelledby="faq-heading"
          className="wingers-wrap pb-10 md:pb-16"
        >
          <h2
            id="faq-heading"
            className="font-display font-extrabold uppercase leading-[0.95] tracking-tight text-[clamp(2rem,5vw,2.75rem)]"
          >
            FAQ.
          </h2>
          <ul className="mt-6 flex flex-col gap-3">
            {visibleFaqs.map((f) => (
              <li key={f.q}>
                <details
                  className="group overflow-hidden rounded-[20px] border border-brand-white/15 bg-brand-white/[0.04]"
                  {...(f.todo
                    ? {
                        "data-todo": "content",
                        "data-todo-note":
                          "Benson to confirm the sister brand is halal before publish.",
                      }
                    : {})}
                >
                  <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-3 px-5 py-3 font-body text-base font-semibold text-brand-white">
                    <span>{f.q}</span>
                    <span
                      aria-hidden="true"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-white/15 text-brand-white transition-transform duration-200 group-open:rotate-45 group-open:bg-brand-pink group-open:text-brand-black"
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </summary>
                  <p className="px-5 pb-5 font-body text-sm leading-relaxed text-brand-white/75 md:text-base">
                    {f.a}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="enquiry"
          aria-labelledby="enquiry-heading"
          className="wingers-wrap scroll-mt-24 pb-20 md:pb-32"
        >
          <div className="rounded-[32px] bg-brand-white p-6 text-brand-black md:rounded-[40px] md:p-10">
            <h2
              id="enquiry-heading"
              className="font-display font-extrabold uppercase leading-[0.95] tracking-tight text-[clamp(2rem,5vw,2.75rem)]"
            >
              Enquire.
            </h2>
            <p className="mt-3 font-body text-base leading-relaxed text-brand-black/80 md:text-lg">
              Send us a few details and the team will be in touch.
            </p>
            <div className="mt-6">
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
