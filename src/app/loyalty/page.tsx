import type { Metadata } from "next";

import { Footer } from "@/components/sections/Footer";
import { LoyaltySignupSection } from "@/components/sections/LoyaltySignupSection";
import { NavBar } from "@/components/sections/NavBar";
import { OrderPanel } from "@/components/sections/order-panel/OrderPanel";
import { OrderPanelProvider } from "@/components/sections/order-panel/order-panel-context";
import { DoubledHeading } from "@/components/typography/DoubledHeading";

export const metadata: Metadata = {
  title: "Become a Winger — Loyalty at Wingers",
  description:
    "Join the Winger Club. Free wings on your birthday, first dibs on new sauces, member-only drops across Milton Keynes and Northampton.",
  alternates: { canonical: "/loyalty" },
  openGraph: {
    title: "Become a Winger — Loyalty at Wingers",
    description:
      "Free wings on your birthday, first dibs on new sauces, member-only drops. Halal buttermilk fried chicken in Milton Keynes and Northampton.",
    url: "/loyalty",
    type: "website",
  },
};

interface Benefit {
  n: string;
  label: string;
  copy: string;
  tile: string;
  align: "start" | "end";
}

const BENEFITS: readonly Benefit[] = [
  {
    n: "01",
    label: "BIRTHDAY WINGS",
    copy: "A free box of wings in your birthday week. On us. Every year.",
    tile: "bg-brand-pink",
    align: "start",
  },
  {
    n: "02",
    label: "SAUCE DROPS",
    copy: "First dibs on new sauces before they hit the counter. Taste it before anyone else does.",
    tile: "bg-brand-red",
    align: "end",
  },
  {
    n: "03",
    label: "MEMBER-ONLY OFFERS",
    copy: "Quiet Tuesday deals, secret combos, and the odd free box when you least expect it.",
    tile: "bg-brand-black",
    align: "start",
  },
  {
    n: "04",
    label: "NO SPAM. EVER.",
    copy: "One email when there's something worth telling you. Never more.",
    tile: "bg-brand-pink",
    align: "end",
  },
];

export default function LoyaltyPage() {
  return (
    <OrderPanelProvider>
      <NavBar />
      <main>
        <section className="flex min-h-[70svh] items-center px-4 md:px-8">
          <div className="mx-auto w-full max-w-6xl">
            <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-brand-red">
              Friends with Benefits
            </p>
            <DoubledHeading
              as="h1"
              text="THE WINGER CLUB."
              fillColor="brand-red"
              shadowColor="brand-pink"
              offsetEm="0.06em"
              className="mt-4 font-display font-extrabold uppercase leading-[0.85] tracking-tight text-[clamp(3rem,13vw,9rem)]"
            />
            <p className="mt-8 max-w-2xl font-body text-lg md:text-xl leading-relaxed text-brand-black/80">
              The Winger Club is Wingers&apos; loyalty programme for halal
              buttermilk fried chicken fans in Milton Keynes and Northampton.
              Members get free wings on their birthday, first dibs on new
              sauces, and member-only drops. Launching soon — sign up now and
              you&apos;re in from day one.
            </p>
          </div>
        </section>

        <section aria-labelledby="benefits-heading">
          <h2 id="benefits-heading" className="sr-only">
            What you get
          </h2>
          {BENEFITS.map((b) => {
            const alignEnd = b.align === "end";
            return (
              <article
                key={b.n}
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
                        alignEnd ? "max-w-3xl md:text-right" : "max-w-3xl"
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
                          style={{ fontSize: "clamp(3.5rem, 18vw, 8rem)" }}
                        >
                          {b.n}
                        </span>
                        <h3 className="font-display font-extrabold uppercase leading-none tracking-tight text-[clamp(1.75rem,6vw,4rem)] text-brand-black">
                          {b.label}
                        </h3>
                      </div>
                      <p
                        className={
                          alignEnd
                            ? "mt-6 max-w-xl md:ml-auto font-body text-lg md:text-xl leading-relaxed text-brand-black/80"
                            : "mt-6 max-w-xl font-body text-lg md:text-xl leading-relaxed text-brand-black/80"
                        }
                      >
                        {b.copy}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  aria-hidden="true"
                  className={`mt-8 md:mt-12 w-full aspect-[4/2] md:aspect-[21/6] ${b.tile}`}
                />
              </article>
            );
          })}
        </section>

        <LoyaltySignupSection source="loyalty_page" />
      </main>
      <Footer />
      <OrderPanel />
    </OrderPanelProvider>
  );
}
