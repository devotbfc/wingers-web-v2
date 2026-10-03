import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/components/sections/Footer";
import { NavBar } from "@/components/sections/NavBar";
import { OrderPanel } from "@/components/sections/order-panel/OrderPanel";
import { OrderPanelProvider } from "@/components/sections/order-panel/order-panel-context";
import { OrderTriggerButton } from "@/components/sections/order-panel/OrderTriggerButton";

export const metadata: Metadata = {
  title: "About Wingers — Buttermilk Fried Chicken",
  description:
    "Wingers is a halal buttermilk fried chicken shop in Milton Keynes and Northampton. 24-hour buttermilk brine, hand-dredged, fried to order.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Wingers",
    description:
      "Halal buttermilk fried chicken. Milton Keynes and Northampton. We only do one thing — properly.",
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

type StageAlign = "start" | "end";

interface Stage {
  n: string;
  label: string;
  copy: string;
  tile: string;
  align: StageAlign;
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
    tile: "bg-brand-pink",
    align: "start",
    photoSlot: "P04",
  },
  {
    n: "02",
    label: "DREDGE",
    copy: "Hand-tossed in seasoned flour until the crust turns craggy. No machines, no shortcuts.",
    tile: "bg-brand-red",
    align: "end",
    photoSlot: "P05",
  },
  {
    n: "03",
    label: "FRY",
    copy: "Dropped in fresh oil and fried to order. Golden, loud, crunchy — never sitting under a lamp.",
    tile: "bg-brand-pink/20",
    align: "start",
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
      <main>
        <section className="flex min-h-[88svh] items-center px-4 md:px-8">
          <div className="mx-auto w-full max-w-6xl">
            <h1 className="font-display font-extrabold uppercase leading-[0.85] tracking-tight text-[clamp(3rem,14vw,10rem)] text-brand-red">
              WE ONLY DO ONE THING. PROPERLY.
            </h1>
            <p className="mt-8 max-w-2xl font-body text-lg md:text-xl leading-relaxed text-brand-black">
              Wingers is a halal buttermilk fried chicken shop in Milton Keynes
              and Northampton. Every bird brined for 24 hours, hand-dredged, and
              fried to order. That is the whole story.
            </p>
          </div>
        </section>

        <section aria-labelledby="process-heading">
          <h2 id="process-heading" className="sr-only">
            How we make it
          </h2>
          {STAGES.map((stage) => {
            const alignEnd = stage.align === "end";
            return (
              <article
                key={stage.n}
                className="border-t border-brand-black/10 first:border-t-0"
              >
                <div className="px-4 md:px-8 pt-12 md:pt-20">
                  <div
                    className={
                      alignEnd
                        ? "mx-auto max-w-6xl md:flex md:justify-end"
                        : "mx-auto max-w-6xl"
                    }
                  >
                    <div
                      className={
                        alignEnd
                          ? "max-w-3xl md:text-right"
                          : "max-w-3xl"
                      }
                    >
                      <div
                        className={
                          alignEnd
                            ? "flex items-baseline gap-4 md:justify-end"
                            : "flex items-baseline gap-4"
                        }
                      >
                        <span
                          aria-hidden="true"
                          className="font-display font-extrabold text-brand-red leading-none tracking-tight"
                          style={{ fontSize: "clamp(4rem, 22vw, 10rem)" }}
                        >
                          {stage.n}
                        </span>
                        <h3 className="font-display font-extrabold uppercase leading-none tracking-tight text-[clamp(2rem,7vw,5rem)] text-brand-black">
                          {stage.label}
                        </h3>
                      </div>
                      <p
                        className={
                          alignEnd
                            ? "mt-6 max-w-xl md:ml-auto font-body text-lg md:text-xl leading-relaxed text-brand-black/80"
                            : "mt-6 max-w-xl font-body text-lg md:text-xl leading-relaxed text-brand-black/80"
                        }
                      >
                        {stage.copy}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  role="img"
                  aria-label={`${stage.label.toLowerCase()} stage`}
                  className={`relative mt-8 md:mt-12 w-full aspect-[4/3] md:aspect-[21/9] ${stage.tile}`}
                >
                  <Image
                    src={
                      REAL_STAGE_SRC[stage.photoSlot] ??
                      `/brand/photos/placeholders/${stage.photoSlot}.png`
                    }
                    alt={REAL_STAGE_ALT[stage.photoSlot] ?? ""}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    data-photo-slot={stage.photoSlot}
                  />
                </div>
              </article>
            );
          })}
        </section>

        <section
          aria-labelledby="halal-heading"
          className="bg-brand-white py-16 md:py-24"
        >
          <div className="mx-auto max-w-2xl px-4 md:px-8">
            <h2
              id="halal-heading"
              className="font-display font-extrabold uppercase leading-tight tracking-tight text-3xl md:text-5xl text-brand-black"
            >
              HALAL. FACTUAL.
            </h2>
            <div
              className="mt-6 space-y-4 font-body text-base md:text-lg leading-relaxed text-brand-black/80"
            >
              <p>
                All chicken served at Wingers is halal. Certificates are held at
                both shops.
              </p>
              <p>No pork on the menu. No alcohol in any product.</p>
            </div>
          </div>
        </section>

        <section
          id="faq"
          aria-labelledby="faq-heading"
          className="scroll-mt-24 bg-brand-white px-4 py-16 md:px-8 md:py-24"
        >
          <div className="mx-auto max-w-3xl">
            <h2
              id="faq-heading"
              className="font-display font-extrabold uppercase leading-tight tracking-tight text-3xl md:text-5xl text-brand-black"
            >
              FREQUENTLY ASKED.
            </h2>
            <ul className="mt-10 space-y-3">
              {FAQS.map((f) => (
                <li key={f.q}>
                  <details className="group border-t border-brand-black/10 py-5 first:border-t-0 open:pb-6">
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
          aria-labelledby="close-heading"
          className="px-4 py-24 md:px-8 md:py-32"
        >
          <h2 id="close-heading" className="sr-only">
            Get stuck in
          </h2>
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-8">
            <p className="font-display font-extrabold uppercase leading-[0.85] tracking-tight text-brand-pink text-[clamp(3rem,12vw,8rem)]">
              THAT&rsquo;S IT<span className="text-brand-red">.</span>
            </p>
            <OrderTriggerButton variant="primary" size="lg">
              Get Stuck In
            </OrderTriggerButton>
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
