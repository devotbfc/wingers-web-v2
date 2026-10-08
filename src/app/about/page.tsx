import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/sections/Footer";
import { NavBar } from "@/components/sections/NavBar";
import { OrderPanel } from "@/components/sections/order-panel/OrderPanel";
import { OrderPanelProvider } from "@/components/sections/order-panel/order-panel-context";
import { OrderTriggerButton } from "@/components/sections/order-panel/OrderTriggerButton";

export const metadata: Metadata = {
  title: "About Wingers — Buttermilk Halal Fried Chicken",
  description:
    "About Wingers — buttermilk halal fried chicken in Milton Keynes & Northampton. 24-hr brined, hand-dredged, fried to order.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Wingers — Buttermilk Halal Fried Chicken",
    description:
      "Buttermilk halal fried chicken in Milton Keynes & Northampton. We only do one thing — properly.",
    url: "/about",
    type: "website",
    images: [
      {
        url: "/og/home.jpg",
        width: 1200,
        height: 630,
        alt: "Wingers mac & cheese",
      },
    ],
  },
};

interface Stage {
  n: string;
  label: string;
  copy: string;
  photoSlot: string;
}

const REAL_STAGE_SRC: Record<string, string> = {
  P04: "/brand/photos/real/P04.png",
  P05: "/brand/photos/real/P05.png",
  P06: "/brand/photos/real/P06.png",
};

const REAL_STAGE_ALT: Record<string, string> = {
  P04: "Hands lowering raw chicken into a buttermilk brine bath",
  P05: "Chicken hand-tossed in seasoned flour, craggy crust forming",
  P06: "Chicken pieces dropping into hot oil, steam rising",
};

const STAGES: readonly Stage[] = [
  {
    n: "01",
    label: "BRINE",
    copy: "Every bird sits in buttermilk for a full 24 hours. Tender the whole way through, seasoned to the bone.",
    photoSlot: "P04",
  },
  {
    n: "02",
    label: "DREDGE",
    copy: "Hand-tossed in seasoned flour until the crust turns craggy. No machines, no shortcuts.",
    photoSlot: "P05",
  },
  {
    n: "03",
    label: "FRY",
    copy: "Dropped in fresh oil and fried to order. Golden, loud, crunchy — never sitting under a lamp.",
    photoSlot: "P06",
  },
];

const FAQS: readonly { q: string; a: string }[] = [
  {
    q: "Is Wingers halal?",
    a: "Yes. Every item at both shops is halal-certified \u2014 the chicken, the beef burgers and all the sides. Certificates are available in the shop on request.",
  },
  {
    q: "Do you deliver?",
    a: "Delivery is through Deliveroo and Uber Eats at both shops. For collection, order ahead from this site \u2014 press Order and pick your shop \u2014 or just walk in.",
  },
  {
    q: "Do you offer gluten-free options?",
    a: "Our fried chicken is dredged in seasoned wheat flour, so it isn\u2019t gluten-free, and both kitchens handle gluten throughout. Our Allergens page lists every item. If you have a serious allergy, tell the shop team before you order.",
  },
  {
    q: "Do the shops have parking?",
    a: "Milton Keynes (Darin Court, Crownhill): plenty \u2014 pull up right outside. Northampton (2 Drapery): town-centre parking within a 30-second walk.",
  },
];

function buildFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}

export default function AboutPage() {
  const faqJsonLd = buildFaqJsonLd();

  return (
    <OrderPanelProvider>
      <NavBar />
      <main className="bg-brand-white">
        <section className="wingers-wrap pt-24 pb-10 md:pt-32 md:pb-16">
          <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-14">
            <div className="flex flex-col gap-6">
              <h1 className="font-display font-extrabold uppercase leading-[0.86] tracking-tight text-[clamp(3rem,10vw,7rem)] text-brand-black">
                We only do one thing.{" "}
                <span className="inline-block rounded-[14px] bg-brand-pink px-2 py-0.5 text-brand-black">
                  Properly.
                </span>
              </h1>
              <p className="max-w-xl font-body text-lg leading-relaxed text-brand-black/80 md:text-xl">
                Wingers is a buttermilk fried chicken shop in Milton Keynes
                and Northampton. Every bird brined for 24 hours, hand-dredged,
                and fried to order. That is the whole story.
              </p>
            </div>
            <video
              src="/brand/videos/hero-loop.mp4"
              poster="/brand/photos/hero/hero-poster.webp"
              autoPlay
              muted
              loop
              playsInline
              aria-label="Wings being tossed in sauce"
              className="h-[clamp(360px,55vw,620px)] w-full rounded-[999px_999px_32px_32px] bg-brand-black object-cover md:rounded-[999px_999px_40px_40px]"
            />
          </div>
        </section>

        <section
          aria-labelledby="process-heading"
          className="wingers-wrap pb-16 md:pb-24"
        >
          <h2
            id="process-heading"
            className="font-display font-bold uppercase leading-[0.95] tracking-tight text-[clamp(2.25rem,6vw,4rem)] text-brand-black"
          >
            How we make it
          </h2>
          <ul className="mt-8 grid gap-5 md:mt-10 md:grid-cols-3 md:gap-5">
            {STAGES.map((stage) => {
              const src = REAL_STAGE_SRC[stage.photoSlot];
              const alt = REAL_STAGE_ALT[stage.photoSlot] ?? "";
              return (
                <li
                  key={stage.n}
                  className="flex flex-col gap-4 rounded-[28px] bg-brand-white p-3 pb-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] md:rounded-[32px]"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[999px_999px_18px_18px] bg-brand-pink/15 md:aspect-[4/5] md:rounded-[999px_999px_24px_24px]">
                    {src ? (
                      <Image
                        src={src}
                        alt={alt}
                        fill
                        sizes="(min-width: 768px) 33vw, 90vw"
                        className="object-cover"
                        data-photo-slot={stage.photoSlot}
                      />
                    ) : null}
                  </div>
                  <div className="flex flex-col gap-2 px-3">
                    <span className="font-display text-sm font-extrabold uppercase tracking-widest text-brand-red-cta">
                      {stage.n}
                    </span>
                    <h3 className="font-display font-extrabold uppercase leading-[0.95] tracking-tight text-[clamp(1.75rem,4vw,2.25rem)] text-brand-black">
                      {stage.label}
                    </h3>
                    <p className="font-body text-base leading-relaxed text-brand-black/80 md:text-[17px]">
                      {stage.copy}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="wingers-wrap pb-16 md:pb-24">
          <div className="grid gap-6 md:grid-cols-2 md:items-start md:gap-8">
            <aside
              aria-labelledby="halal-heading"
              className="flex flex-col gap-4 rounded-[32px] bg-brand-pink p-7 md:rounded-[40px] md:p-10"
            >
              <h2
                id="halal-heading"
                className="font-display font-extrabold uppercase leading-[0.9] tracking-tight text-[clamp(2.5rem,6vw,4rem)] text-brand-black"
              >
                Halal. <br />
                Factual.
              </h2>
              <p className="font-body text-base leading-relaxed text-brand-black md:text-lg">
                All chicken served at Wingers is halal. Certificates are held
                at both shops.
              </p>
              <p className="font-body text-base font-semibold leading-relaxed text-brand-black md:text-lg">
                No pork on the menu. No alcohol in any product.
              </p>
            </aside>

            <div
              id="faq"
              aria-labelledby="faq-heading"
              className="flex flex-col gap-3 scroll-mt-24"
            >
              <h2
                id="faq-heading"
                className="font-display font-bold uppercase leading-[0.95] tracking-tight text-[clamp(1.75rem,4.5vw,2.75rem)] text-brand-black"
              >
                Frequently asked
              </h2>
              <ul className="flex flex-col gap-3">
                {FAQS.map((f) => (
                  <li key={f.q}>
                    <details className="group overflow-hidden rounded-[22px] bg-brand-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_6px_18px_rgba(0,0,0,0.05)]">
                      <summary className="flex min-h-[60px] cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 font-body text-base font-semibold text-brand-black">
                        <span>{f.q}</span>
                        <span
                          aria-hidden="true"
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-warm-grey text-brand-black transition-transform duration-200 group-open:rotate-45 group-open:bg-brand-pink"
                        >
                          <svg
                            width="14"
                            height="14"
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
                      <p className="px-5 pb-5 font-body text-base leading-relaxed text-brand-black/80">
                        {f.a}
                      </p>
                    </details>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="wingers-wrap pb-20 md:pb-32">
          <div className="flex flex-col items-start gap-5 rounded-[32px] bg-brand-black p-8 text-brand-white md:flex-row md:items-center md:justify-between md:rounded-[40px] md:p-14">
            <p
              aria-hidden="true"
              className="font-display font-extrabold uppercase leading-[0.86] tracking-tight text-[clamp(3rem,10vw,7rem)] text-brand-pink"
            >
              That&rsquo;s it<span className="text-brand-red">.</span>
            </p>
            <div className="flex flex-wrap gap-3">
              <OrderTriggerButton variant="primary" size="lg">
                Get Stuck In
              </OrderTriggerButton>
              <Link
                href="/franchise"
                className="inline-flex min-h-12 items-center rounded-full border-2 border-brand-white px-6 font-display text-base font-extrabold uppercase tracking-tight text-brand-white transition-colors hover:bg-brand-white hover:text-brand-black md:text-[17px]"
              >
                See Opportunities
              </Link>
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
