import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/sections/Footer";
import { NavBar } from "@/components/sections/NavBar";
import { OrderPanel } from "@/components/sections/order-panel/OrderPanel";
import { OrderPanelProvider } from "@/components/sections/order-panel/order-panel-context";

export const metadata: Metadata = {
  title: "Terms of Use — Wingers",
  description:
    "Terms of use for wingers.co and the Wingers app — ordering, refunds, allergens, Flavour Club and loyalty.",
};

const H2 =
  "mt-14 font-display text-2xl font-bold uppercase tracking-tight text-brand-black md:text-3xl";
const P =
  "mt-4 font-body text-base leading-relaxed text-brand-black/80 md:text-lg";
const UL =
  "mt-4 list-disc space-y-2 pl-6 font-body text-base leading-relaxed text-brand-black/80 md:text-lg";
const LINK = "underline transition-colors hover:text-brand-red";

export default function TermsPage() {
  return (
    <OrderPanelProvider>
      <NavBar />
      <main>
        <section className="bg-brand-white px-4 pb-24 pt-32 md:px-8 md:pt-40">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-display font-extrabold uppercase leading-[0.85] tracking-tight text-[clamp(2.5rem,10vw,6rem)] text-brand-black">
              TERMS.
            </h1>

            <p className="mt-8 font-body text-sm uppercase tracking-widest text-brand-black/60">
              Last updated: 14 October 2026
            </p>

            <h2 className={H2}>1. About us</h2>
            <p className={P}>
              wingers.co and the Wingers app (the &ldquo;Services&rdquo;) are
              run by <strong>The Big Flavour Co Limited</strong>, trading as{" "}
              <strong>Wingers</strong> (company no. 12596795). Registered
              office: Artemis House, 4a Bramley Road, Bletchley, Milton
              Keynes MK1 1PT. Contact:{" "}
              <a href="mailto:hi@wingers.co" className={LINK}>
                hi@wingers.co
              </a>{" "}
              &middot;{" "}
              <a href="tel:+441908755800" className={LINK}>
                01908 755800
              </a>
              . By using our Services you agree to these terms.
            </p>

            <h2 className={H2}>2. Ordering</h2>
            <p className={P}>
              Wingers is the seller of the food. Some orders are placed
              through third-party platforms (such as Deliverect Direct, Toast
              or delivery apps); their terms and privacy information also
              apply to those orders and take priority where they differ. Our
              own online orders are <strong>collection only</strong> from the
              restaurant shown at checkout. Menu prices, items and
              availability can change &mdash; the details shown at checkout
              are the ones that apply.
            </p>

            <h2 className={H2}>3. All orders are final</h2>
            <p className={P}>
              Our food is cooked fresh to order, so{" "}
              <strong>
                once an order is placed and confirmed it cannot be cancelled,
                changed or refunded
              </strong>
              , including where:
            </p>
            <ul className={UL}>
              <li>you change your mind;</li>
              <li>
                you made a mistake when ordering (for example the wrong item,
                size, flavour, location or collection time); or
              </li>
              <li>
                the order is <strong>not collected</strong>. Uncollected
                orders are not refunded or replaced, and may be disposed of
                after a reasonable time for food-safety reasons.
              </li>
            </ul>
            <p className={P}>
              <strong>This does not affect your legal rights.</strong> If
              your food is wrong because of our mistake, missing items, or
              not of satisfactory quality, tell the restaurant straight away
              (before eating where possible) and we will put it right &mdash;
              usually with a replacement or refund &mdash; as required by
              law.
            </p>

            <h2 className={H2}>4. Allergens</h2>
            <p className={P}>
              Check our allergen information before ordering, and tell the
              restaurant about any allergy <strong>before you order</strong>.
              Our kitchens handle all 14 major allergens and cross-contact
              can happen, so we cannot guarantee any item is completely free
              from any allergen. Don&apos;t use email, forms or social media
              for urgent allergy questions &mdash; call or speak to staff.
            </p>

            <h2 className={H2}>5. Flavour Club, loyalty and offers</h2>
            <p className={P}>
              Joining the Flavour Club is free and optional. Through our
              website and app we may offer loyalty features such as a member
              account, points, rewards and member offers. Points and rewards
              have no cash value, cannot be transferred or sold, and may
              expire or change; we will give reasonable notice of
              significant changes. We may suspend or cancel loyalty benefits
              that are misused or obtained fraudulently. Each offer has its
              own conditions, and we may end the Flavour Club or a loyalty
              scheme at any time.
            </p>

            <h2 className={H2}>6. Your data</h2>
            <p className={P}>
              To run our Services, orders, the Flavour Club and loyalty
              features, we collect and use personal data through our website
              and app &mdash; such as your name, email, phone number, order
              and visit history, points balance and preferences. Our{" "}
              <strong>Privacy Policy</strong> (
              <Link href="/privacy" className={LINK}>
                wingers.co/privacy
              </Link>
              ) explains what we collect, why, how long we keep it, and your
              rights, including how to unsubscribe or ask us to delete your
              data. Marketing emails are only sent with your consent.
            </p>

            <h2 className={H2}>7. Using our Services</h2>
            <p className={P}>
              Please don&apos;t misuse our Services: no unauthorised access,
              malicious code, automated or bulk form submissions, scraping,
              impersonating Wingers or unlawful use. The Wingers name,
              logos, photos and content belong to us &mdash; you may view
              them for personal use but not copy or reuse them commercially
              without permission. We aim to keep our Services available, but
              can&apos;t promise they will always be uninterrupted or
              error-free. We&apos;re not responsible for third-party sites
              we link to.
            </p>

            <h2 className={H2}>8. Liability</h2>
            <p className={P}>
              Nothing in these terms excludes or limits liability that
              cannot legally be excluded, including for death or personal
              injury caused by negligence, fraud, your statutory consumer
              rights, or our food-safety and allergen duties.
            </p>

            <h2 className={H2}>9. Changes and law</h2>
            <p className={P}>
              We may update these terms when our Services or the law change;
              the date above shows the latest version. These terms are
              governed by the law of England and Wales. If you are a
              consumer, you keep any mandatory protections that apply to
              you.
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <OrderPanel />
    </OrderPanelProvider>
  );
}
