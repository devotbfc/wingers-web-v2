import type { Metadata } from "next";
import { DoubledHeading } from "@/components/typography/DoubledHeading";
import { Footer } from "@/components/sections/Footer";
import { NavBar } from "@/components/sections/NavBar";
import { OrderPanel } from "@/components/sections/order-panel/OrderPanel";
import { OrderPanelProvider } from "@/components/sections/order-panel/order-panel-context";

export const metadata: Metadata = {
  title: "Privacy Policy — Wingers",
  description:
    "Wingers privacy policy — what we collect, why we collect it, and your rights under UK GDPR.",
};

const H2 =
  "mt-14 font-display text-2xl font-bold uppercase tracking-tight text-brand-black md:text-3xl";
const H3 =
  "mt-10 font-display text-xl font-bold uppercase tracking-tight text-brand-black md:text-2xl";
const P =
  "mt-4 font-body text-base leading-relaxed text-brand-black/80 md:text-lg";
const UL =
  "mt-4 list-disc space-y-2 pl-6 font-body text-base leading-relaxed text-brand-black/80 md:text-lg";
const LINK = "underline transition-colors hover:text-brand-red";
const CODE = "rounded bg-brand-black/5 px-1.5 py-0.5 font-mono text-[0.9em]";

export default function PrivacyPage() {
  return (
    <OrderPanelProvider>
      <NavBar />
      <main>
        <section className="bg-brand-white px-4 pb-24 pt-32 md:px-8 md:pt-40">
          <div className="mx-auto max-w-3xl">
            <DoubledHeading
              as="h1"
              text="PRIVACY."
              fillColor="brand-black"
              shadowColor="brand-pink"
              offsetEm="0.06em"
              className="font-display font-extrabold uppercase leading-[0.85] tracking-tight text-[clamp(2.5rem,10vw,6rem)]"
            />

            <p className="mt-8 font-body text-sm uppercase tracking-widest text-brand-black/60">
              Last updated: 23 September 2026
            </p>

            <p className="mt-6 font-body text-lg leading-relaxed text-brand-black/80 md:text-xl">
              Wingers is a trading name of The Big Flavour Co Limited (company
              number 12596795), registered in England and Wales. We operate
              restaurants at 25 Darin Court, Crownhill, Milton Keynes MK8 0AD
              and 2 Drapery, Northampton NN1 2ET, and the website wingers.co.
            </p>

            <p className={P}>
              This policy explains what personal data we collect when you use
              our website, why we collect it, and the choices you have. We are
              the data controller for the data described here. Our ICO
              registration number is C2041401.
            </p>

            <h2 className={H2}>What we collect and why</h2>

            <h3 className={H3}>Loyalty sign-up</h3>
            <p className={P}>
              If you join our loyalty list we collect your email address and,
              if you give it, your first name. We use these to send you
              Wingers news, new drops and offers. The legal basis is your
              consent, which you give by submitting the form. You can
              unsubscribe at any time using the link in any email, or by
              contacting us (details below). We keep your details until you
              unsubscribe or ask us to delete them.
            </p>

            <h3 className={H3}>Website analytics (no cookies)</h3>
            <p className={P}>
              We use Vercel Web Analytics to understand how many people visit
              the site and which pages they view. It does not use cookies and
              does not identify you personally; it records aggregated page
              views and a short-lived, anonymised session identifier. This
              runs under our legitimate interest in understanding how our
              website is used.
            </p>

            <h3 className={H3}>
              Advertising measurement (Meta Pixel) — only with your consent
            </h3>
            <p className={P}>
              If you click <strong>Accept</strong> on our cookie banner, we
              load the Meta Pixel, a small piece of code from Meta Platforms
              Ireland Ltd (the company behind Facebook and Instagram). It
              tells us whether people who saw our Facebook or Instagram
              adverts went on to visit our site, view the menu, join the
              loyalty list or start an order. This helps us measure whether
              our adverts are working and show them to people more likely to
              be interested.
            </p>
            <p className={P}>
              When the pixel is active it sends Meta information about your
              visit, including the pages you view, your browser type, and a
              Meta identifier if you are logged in to Facebook or Instagram.
              Meta may combine this with information it already holds about
              you. Meta&apos;s own privacy policy explains how it uses this
              data:{" "}
              <a
                href="https://www.facebook.com/privacy/policy"
                target="_blank"
                rel="noopener noreferrer"
                className={LINK}
              >
                facebook.com/privacy/policy
              </a>
              .
            </p>
            <p className={P}>
              We also set a cookie called <code className={CODE}>_fbc</code>{" "}
              when you arrive from a Meta advert. It stores a code identifying
              the advert you clicked so the visit can be linked to that
              advert. It lasts 90 days.
            </p>
            <p className={P}>
              If you click <strong>Reject</strong>, the pixel is not loaded,
              the <code className={CODE}>_fbc</code> cookie is not set, and no
              advertising identifier is passed on when you order. You can
              change your mind at any time using the &ldquo;Cookie
              settings&rdquo; link in the footer, or by clearing your
              browser&apos;s site data for wingers.co.
            </p>

            <h3 className={H3}>Ordering</h3>
            <p className={P}>
              Ordering is handled by our partners, not on wingers.co. When you
              press <strong>Order</strong> you leave our site: Milton Keynes
              orders are taken by Deliverect Direct and Northampton orders by
              Toast. Their privacy policies govern the data you give them to
              complete an order (name, contact details, address, payment). If
              you accepted our cookie banner, we include an advert-click
              identifier in the link so we can tell that an order followed an
              advert; we do not receive your order details from that link.
            </p>

            <h2 className={H2}>Cookies and similar technologies</h2>

            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full border-collapse text-left font-body text-sm md:text-base">
                <thead className="text-xs uppercase tracking-wide text-brand-black/60">
                  <tr>
                    <th className="border-b border-brand-black/20 px-3 py-3 align-top font-semibold">
                      Name
                    </th>
                    <th className="border-b border-brand-black/20 px-3 py-3 align-top font-semibold">
                      Set by
                    </th>
                    <th className="border-b border-brand-black/20 px-3 py-3 align-top font-semibold">
                      Purpose
                    </th>
                    <th className="border-b border-brand-black/20 px-3 py-3 align-top font-semibold">
                      Lasts
                    </th>
                    <th className="border-b border-brand-black/20 px-3 py-3 align-top font-semibold">
                      Needs consent
                    </th>
                  </tr>
                </thead>
                <tbody className="text-brand-black/80">
                  <tr>
                    <td className="border-b border-brand-black/10 px-3 py-3 align-top">
                      <code className={CODE}>wingers_consent</code>
                    </td>
                    <td className="border-b border-brand-black/10 px-3 py-3 align-top">
                      wingers.co (browser storage, not a cookie)
                    </td>
                    <td className="border-b border-brand-black/10 px-3 py-3 align-top">
                      Remembers whether you accepted or rejected the cookie
                      banner
                    </td>
                    <td className="border-b border-brand-black/10 px-3 py-3 align-top">
                      Until you clear site data
                    </td>
                    <td className="border-b border-brand-black/10 px-3 py-3 align-top">
                      No — essential
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b border-brand-black/10 px-3 py-3 align-top">
                      <code className={CODE}>_fbc</code>
                    </td>
                    <td className="border-b border-brand-black/10 px-3 py-3 align-top">
                      wingers.co on behalf of Meta
                    </td>
                    <td className="border-b border-brand-black/10 px-3 py-3 align-top">
                      Links your visit to a Meta advert you clicked
                    </td>
                    <td className="border-b border-brand-black/10 px-3 py-3 align-top">
                      90 days
                    </td>
                    <td className="border-b border-brand-black/10 px-3 py-3 align-top">
                      Yes
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b border-brand-black/10 px-3 py-3 align-top">
                      <code className={CODE}>_fbp</code>
                    </td>
                    <td className="border-b border-brand-black/10 px-3 py-3 align-top">
                      Meta
                    </td>
                    <td className="border-b border-brand-black/10 px-3 py-3 align-top">
                      Meta&apos;s own visitor identifier, set by the pixel
                    </td>
                    <td className="border-b border-brand-black/10 px-3 py-3 align-top">
                      90 days
                    </td>
                    <td className="border-b border-brand-black/10 px-3 py-3 align-top">
                      Yes
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className={P}>We do not use any other tracking cookies.</p>

            <h2 className={H2}>Who we share data with</h2>
            <ul className={UL}>
              <li>
                <strong>Meta Platforms Ireland Ltd</strong> — advertising
                measurement, only if you accept the banner.
              </li>
              <li>
                <strong>Vercel Inc.</strong> — hosts the website and provides
                the cookieless analytics.
              </li>
              <li>
                <strong>Supabase</strong> — securely stores the loyalty list.
              </li>
              <li>
                <strong>Deliverect and Toast</strong> — take your order, as
                described above.
              </li>
            </ul>
            <p className={P}>
              We do not sell your personal data. Some of these providers
              process data outside the UK; where they do, transfers are
              covered by the UK International Data Transfer Agreement or an
              adequacy decision.
            </p>

            <h2 className={H2}>Your rights</h2>
            <p className={P}>Under UK GDPR you can ask us to:</p>
            <ul className={UL}>
              <li>
                tell you what personal data we hold about you and give you a
                copy;
              </li>
              <li>correct it if it is wrong;</li>
              <li>delete it;</li>
              <li>stop using it for marketing;</li>
              <li>restrict or object to how we use it;</li>
              <li>give it to you in a portable format.</li>
            </ul>
            <p className={P}>
              To exercise any of these, email{" "}
              <a href="mailto:hi@wingers.co" className={LINK}>
                hi@wingers.co
              </a>
              . We will respond within one month. You also have the right to
              complain to the Information Commissioner&apos;s Office at{" "}
              <a
                href="https://ico.org.uk"
                target="_blank"
                rel="noopener noreferrer"
                className={LINK}
              >
                ico.org.uk
              </a>{" "}
              or on{" "}
              <a href="tel:+443031231113" className={LINK}>
                0303 123 1113
              </a>
              .
            </p>

            <h2 className={H2}>Children</h2>
            <p className={P}>
              Our website and loyalty list are not aimed at anyone under 16
              and we do not knowingly collect their data.
            </p>

            <h2 className={H2}>Changes to this policy</h2>
            <p className={P}>
              We will update this page when our practices change and update
              the date at the top. Significant changes will be flagged on the
              site.
            </p>

            <h2 className={H2}>Contact</h2>
            <address className="mt-4 font-body text-base not-italic leading-relaxed text-brand-black/80 md:text-lg">
              The Big Flavour Co Limited
              <br />
              25 Darin Court, Crownhill, Milton Keynes MK8 0AD
              <br />
              <a href="mailto:hi@wingers.co" className={LINK}>
                hi@wingers.co
              </a>
            </address>
          </div>
        </section>
      </main>
      <Footer />
      <OrderPanel />
    </OrderPanelProvider>
  );
}
