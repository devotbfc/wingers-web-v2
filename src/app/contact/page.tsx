import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Footer } from "@/components/sections/Footer";
import { NavBar } from "@/components/sections/NavBar";
import { OrderPanel } from "@/components/sections/order-panel/OrderPanel";
import { OrderPanelProvider } from "@/components/sections/order-panel/order-panel-context";
import { LOCATIONS } from "@/lib/locations";

const CONTACT_PHONE =
  LOCATIONS.find((loc) => loc.slug === "milton-keynes")?.phone ?? "";
const CONTACT_EMAIL = "hi@wingers.co";

export const metadata: Metadata = {
  title: "Contact Wingers — Buttermilk Halal Fried Chicken",
  description:
    "Get in touch with Wingers — buttermilk halal fried chicken in Milton Keynes & Northampton. Call, email, or find your nearest shop.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Wingers — Buttermilk Halal Fried Chicken",
    description:
      "Call, email, or drop in. Buttermilk halal fried chicken in Milton Keynes & Northampton — feedback, press, partnerships welcome.",
    url: "/contact",
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

export default function ContactPage() {
  const phoneHref = `tel:${CONTACT_PHONE.replace(/\s+/g, "")}`;
  return (
    <OrderPanelProvider>
      <NavBar />
      <main className="bg-brand-white">
        <section className="wingers-wrap pt-24 pb-10 md:pt-32 md:pb-16">
          <h1 className="font-display font-extrabold uppercase leading-[0.84] tracking-tight text-[clamp(3rem,13vw,9rem)] text-brand-black">
            Say <br />
            hello.
          </h1>
          <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-brand-black/80 md:text-xl">
            Feedback, press, or partnerships: give us a ring, drop us an
            email, or come find us. For orders, use the Order button up top.
          </p>
        </section>

        <section
          aria-labelledby="reach-us-heading"
          className="wingers-wrap pb-10 md:pb-16"
        >
          <h2 id="reach-us-heading" className="sr-only">
            How to reach us
          </h2>
          <div className="grid gap-4 md:grid-cols-2 md:gap-5">
            <a
              href={phoneHref}
              className="flex items-center gap-4 rounded-[28px] bg-brand-black p-5 text-brand-white transition-opacity hover:opacity-90 md:p-7"
            >
              <span
                aria-hidden="true"
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-pink text-brand-black"
              >
                <Phone className="h-6 w-6 stroke-[2]" />
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-brand-white/60">
                  Phone
                </span>
                <span className="font-display text-xl font-extrabold tracking-tight md:text-2xl">
                  {CONTACT_PHONE}
                </span>
              </span>
            </a>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-4 rounded-[28px] bg-brand-white p-5 text-brand-black shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] transition-opacity hover:opacity-90 md:p-7"
            >
              <span
                aria-hidden="true"
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-pink text-brand-black"
              >
                <Mail className="h-6 w-6 stroke-[2]" />
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-brand-black/60">
                  Email
                </span>
                <span className="font-display text-xl font-extrabold tracking-tight break-all md:text-2xl">
                  {CONTACT_EMAIL}
                </span>
              </span>
            </a>
          </div>
        </section>

        <section
          aria-labelledby="find-us-heading"
          className="wingers-wrap pb-20 md:pb-24"
        >
          <h2
            id="find-us-heading"
            className="font-display font-bold uppercase leading-[0.95] tracking-tight text-[clamp(1.75rem,5vw,2.75rem)] text-brand-black"
          >
            Or find us in person.
          </h2>
          <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-5">
            {LOCATIONS.map((loc) => (
              <li
                key={loc.slug}
                className="flex flex-col gap-1 rounded-[24px] bg-brand-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_6px_18px_rgba(0,0,0,0.05)] md:p-6"
              >
                <h3 className="font-display text-base font-extrabold uppercase leading-tight tracking-tight text-brand-black md:text-xl">
                  {loc.name.replace(/^Wingers\s+/i, "")}
                </h3>
                <p className="font-body text-xs leading-snug text-brand-black/80 md:text-sm">
                  {loc.address.street}, {loc.address.city}{" "}
                  {loc.address.postcode}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-5">
            <Link
              href="/locations"
              className="font-body text-base font-semibold text-brand-black underline underline-offset-4 transition-colors hover:text-brand-red"
            >
              See hours &amp; directions →
            </Link>
          </p>
        </section>
      </main>
      <Footer />
      <OrderPanel />
    </OrderPanelProvider>
  );
}
