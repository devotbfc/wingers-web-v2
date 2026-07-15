import type { Metadata } from "next";
import Link from "next/link";
import { DoubledHeading } from "@/components/typography/DoubledHeading";
import { Footer } from "@/components/sections/Footer";
import { NavBar } from "@/components/sections/NavBar";
import { OrderPanel } from "@/components/sections/order-panel/OrderPanel";
import { OrderPanelProvider } from "@/components/sections/order-panel/order-panel-context";
import { LOCATIONS } from "@/lib/locations";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Wingers",
  description:
    "Get in touch with Wingers — halal buttermilk fried chicken in Milton Keynes and Northampton. Send us a message or find your nearest shop.",
};

export default function ContactPage() {
  return (
    <OrderPanelProvider>
      <NavBar />
      <main>
        <section className="pt-32 md:pt-40 px-4 md:px-8 pb-12 md:pb-16">
          <div className="mx-auto max-w-6xl">
            <DoubledHeading
              as="h1"
              text="SAY HELLO."
              fillColor="brand-red"
              shadowColor="brand-pink"
              offsetEm="0.06em"
              className="font-display font-extrabold uppercase leading-[0.85] tracking-tight text-[clamp(3rem,10vw,7rem)]"
            />
            <p className="mt-6 max-w-2xl font-body text-lg md:text-xl leading-relaxed text-brand-black">
              Feedback, press, partnerships, or just want to say hi — send us a
              message and we&rsquo;ll get back to you. For orders, use the
              Order button up top.
            </p>
          </div>
        </section>

        <section
          aria-labelledby="contact-form-heading"
          className="bg-brand-pink py-16 md:py-24"
        >
          <div className="mx-auto max-w-3xl px-4 md:px-8">
            <h2 id="contact-form-heading" className="sr-only">
              Contact form
            </h2>
            <ContactForm />
          </div>
        </section>

        <section
          aria-labelledby="find-us-heading"
          className="bg-brand-white py-16 md:py-24"
        >
          <div className="mx-auto max-w-6xl px-4 md:px-8">
            <h2
              id="find-us-heading"
              className="font-display font-extrabold uppercase leading-tight tracking-tight text-3xl md:text-5xl text-brand-black"
            >
              Or find us in person.
            </h2>
            <ul className="mt-10 grid gap-10 md:grid-cols-2">
              {LOCATIONS.map((loc) => (
                <li
                  key={loc.slug}
                  className="border-t-2 border-brand-black pt-6"
                >
                  <h3 className="font-display font-extrabold uppercase leading-tight tracking-tight text-2xl md:text-3xl text-brand-black">
                    {loc.name}
                  </h3>
                  <address className="mt-4 not-italic font-body text-base md:text-lg leading-relaxed text-brand-black/80">
                    {loc.address.street}
                    <br />
                    {loc.address.city}
                    <br />
                    {loc.address.postcode}
                  </address>
                  {loc.phone && (
                    <p className="mt-3 font-body text-base md:text-lg text-brand-black">
                      <a
                        href={`tel:${loc.phone.replace(/\s+/g, "")}`}
                        className="underline hover:text-brand-red transition-colors"
                      >
                        {loc.phone}
                      </a>
                    </p>
                  )}
                  <p className="mt-4">
                    <Link
                      href={`/locations/${loc.slug}`}
                      className="font-body text-sm font-semibold uppercase tracking-widest text-brand-red hover:text-brand-black transition-colors"
                    >
                      See hours &amp; directions →
                    </Link>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
      <OrderPanel />
    </OrderPanelProvider>
  );
}
