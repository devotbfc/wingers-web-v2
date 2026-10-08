import type { Metadata } from "next";
import { Cake, Gift, Mail, Sparkles } from "lucide-react";

import { Footer } from "@/components/sections/Footer";
import { LoyaltySignupSection } from "@/components/sections/LoyaltySignupSection";
import { NavBar } from "@/components/sections/NavBar";
import { OrderPanel } from "@/components/sections/order-panel/OrderPanel";
import { OrderPanelProvider } from "@/components/sections/order-panel/order-panel-context";

export const metadata: Metadata = {
  title: "Flavour Club — Wingers Buttermilk Halal Fried Chicken",
  description:
    "Join the Flavour Club — the Wingers loyalty programme for buttermilk halal fried chicken fans in Milton Keynes & Northampton.",
  alternates: { canonical: "/loyalty" },
  openGraph: {
    title: "Flavour Club — Wingers Buttermilk Halal Fried Chicken",
    description:
      "First dibs on new flavours, birthday wings and member drops. Buttermilk halal fried chicken in Milton Keynes & Northampton.",
    url: "/loyalty",
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

interface Perk {
  title: string;
  body: string;
  live: boolean;
  Icon: typeof Mail;
}

// Perks the Flavour Club offers. Any perk with live=false renders a
// "Coming soon" pill — do not frame it as available. Flip to true once
// the backing feature ships. "No spam" is a statement, not a perk;
// kept outside this list as a plain card below the grid.
const PERKS: readonly Perk[] = [
  {
    title: "First dibs",
    body: "New flavours in your inbox before anyone else tastes them.",
    live: true,
    Icon: Mail,
  },
  {
    title: "Birthday wings",
    body: "A free box of wings in your birthday week. On us.",
    live: false,
    Icon: Cake,
  },
  {
    title: "Member drops",
    body: "Quiet Tuesday deals, secret combos, and the odd free box.",
    live: false,
    Icon: Gift,
  },
  {
    title: "Points & rewards",
    body: "Earn on every order. Spend on anything on the menu.",
    live: false,
    Icon: Sparkles,
  },
];

export default function LoyaltyPage() {
  return (
    <OrderPanelProvider>
      <NavBar />
      <main className="bg-brand-white">
        <section className="wingers-wrap pt-24 pb-10 md:pt-32 md:pb-16">
          <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-brand-red">
            Friends with Benefits
          </p>
          <h1 className="mt-3 font-display font-extrabold uppercase leading-[0.84] tracking-tight text-[clamp(3rem,12vw,8rem)] text-brand-black">
            THE FLAVOUR CLUB.
          </h1>
          <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-brand-black/80 md:text-xl">
            First dibs on new flavours, member drops, and the little
            everyday perks that come with being a regular. Sign up now and
            you&rsquo;re in from day one.
          </p>
        </section>

        <section
          aria-labelledby="perks-heading"
          className="wingers-wrap pb-10 md:pb-16"
        >
          <h2 id="perks-heading" className="sr-only">
            What you get
          </h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {PERKS.map(({ title, body, live, Icon }) => (
              <li
                key={title}
                className="flex min-h-[180px] flex-col gap-3 rounded-[24px] bg-brand-pink p-5 text-brand-black md:min-h-[220px]"
              >
                <div className="flex items-start justify-between gap-3">
                  <Icon
                    aria-hidden="true"
                    className="h-7 w-7 stroke-[2]"
                  />
                  {live ? null : (
                    <span className="inline-flex h-6 items-center rounded-full border border-brand-black/40 bg-brand-white/60 px-2.5 font-display text-[10px] font-extrabold uppercase tracking-[0.2em] text-brand-black">
                      Coming soon
                    </span>
                  )}
                </div>
                <h3 className="font-display text-xl font-extrabold uppercase leading-[0.95] tracking-tight text-brand-black md:text-2xl">
                  {title}
                </h3>
                <p className="font-body text-sm leading-snug text-brand-black/80 md:text-[15px]">
                  {body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="wingers-wrap pb-10 md:pb-16">
          <aside
            aria-labelledby="no-spam-heading"
            className="flex flex-col gap-2 rounded-[24px] bg-brand-black p-6 text-brand-white md:p-8"
          >
            <h3
              id="no-spam-heading"
              className="font-display text-xl font-extrabold uppercase leading-[0.95] tracking-tight md:text-2xl"
            >
              No spam. Ever.
            </h3>
            <p className="font-body text-base leading-relaxed text-brand-white/80 md:text-lg">
              One email when there&rsquo;s something worth telling you. Never
              more.
            </p>
          </aside>
        </section>

        <LoyaltySignupSection source="loyalty_page" />
      </main>
      <Footer />
      <OrderPanel />
    </OrderPanelProvider>
  );
}
