import type { Metadata } from "next";
import Image from "next/image";
import { DoubledHeading } from "@/components/typography/DoubledHeading";
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
    images: [{ url: "/og/about.png", width: 1200, height: 630 }],
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
    tile: "bg-brand-black",
    align: "start",
    photoSlot: "P06",
  },
];

const FAQS: readonly { q: string; a: string }[] = [
  {
    q: "Is Wingers halal?",
    a: "TODO(copy): confirm HMC certificate details and wording before launch.",
  },
  {
    q: "Do you deliver?",
    a: "TODO(copy): confirm delivery radius and platform per location before launch.",
  },
  {
    q: "Do you offer gluten-free options?",
    a: "TODO(copy): confirm which items are gluten-free before launch.",
  },
  {
    q: "Do the shops have parking?",
    a: "TODO(copy): confirm parking arrangements per location before launch.",
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
            <DoubledHeading
              as="h1"
              text="WE ONLY DO ONE THING. PROPERLY."
              fillColor="brand-red"
              shadowColor="brand-pink"
              offsetEm="0.06em"
              className="font-display font-extrabold uppercase leading-[0.85] tracking-tight text-[clamp(3rem,14vw,10rem)]"
            />
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
                  data-todo="assets"
                  role="img"
                  aria-label={`Photo placeholder — ${stage.label.toLowerCase()} stage`}
                  className={`relative mt-8 md:mt-12 w-full aspect-[4/3] md:aspect-[21/9] ${stage.tile}`}
                >
                  <Image
                    src={`/brand/photos/placeholders/${stage.photoSlot}.png`}
                    alt=""
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
          className="section-dark py-16 md:py-24"
        >
          <div className="mx-auto max-w-2xl px-4 md:px-8">
            <h2
              id="halal-heading"
              className="font-display font-extrabold uppercase leading-tight tracking-tight text-3xl md:text-5xl text-brand-white"
            >
              HALAL. FACTUAL.
            </h2>
            <div
              className="mt-6 space-y-4 font-body text-base md:text-lg leading-relaxed text-brand-white/80"
              data-todo="copy"
            >
              <p>
                All chicken served at Wingers is halal. Certificates are held at
                both shops.
              </p>
              <p>No pork on the menu. No alcohol in any product.</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="close-heading" className="relative isolate">
          <h2 id="close-heading" className="sr-only">
            Get stuck in
          </h2>
          <div
            data-todo="assets"
            role="img"
            aria-label="Photo placeholder — team behind the counter"
            className="relative min-h-[70svh] w-full bg-brand-black"
          >
            <Image
              src="/brand/photos/placeholders/P07.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              data-photo-slot="P07"
            />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-4 text-center">
            <DoubledHeading
              as="p"
              text="THAT'S IT."
              fillColor="brand-white"
              shadowColor="brand-pink"
              offsetEm="0.06em"
              className="font-display font-extrabold uppercase leading-[0.85] tracking-tight text-[clamp(3rem,12vw,8rem)]"
            />
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
