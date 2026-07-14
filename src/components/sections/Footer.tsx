import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { LOCATIONS } from "@/lib/locations";
import { getProviderForLocation } from "@/lib/order/providers";

const EXPLORE_LINKS = [
  { label: "Menu", href: "/menu" },
  { label: "Locations", href: "/locations" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "#" },
  { label: "TikTok", href: "#" },
  { label: "Facebook", href: "#" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="section-dark">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <BrandLogo
              type="mark"
              variant="white"
              width={72}
              height={72}
              className="h-16 w-16"
              alt="Wingers"
            />
            <p className="mt-6 font-display text-lg font-bold uppercase tracking-tight text-brand-white">
              Dip It. Bite It. Love It.
            </p>
            <p className="mt-3 font-body text-sm leading-relaxed text-brand-white/70">
              Buttermilk fried chicken. Milton Keynes and Northampton.
            </p>
          </div>

          <FooterColumn title="Explore">
            {EXPLORE_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-sm text-brand-white transition-colors hover:text-brand-pink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Order">
            {LOCATIONS.map((loc) => {
              const orderUrl = getProviderForLocation(loc).getOrderUrl(loc);
              return (
                <li key={loc.slug}>
                  <a
                    href={orderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-brand-white transition-colors hover:text-brand-pink"
                  >
                    {loc.name.replace("Wingers ", "")}
                  </a>
                </li>
              );
            })}
          </FooterColumn>

          <FooterColumn title="Follow">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-brand-white transition-colors hover:text-brand-pink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </FooterColumn>
        </div>

        <div className="mt-14 flex items-center justify-center pt-10">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.35em] text-brand-pink">
            Milton Keynes · Northampton
          </p>
        </div>
      </div>

      <div className="px-4 pb-10 md:px-8" aria-hidden="true">
        <BrandLogo
          type="lockup"
          variant="white"
          width={1440}
          height={200}
          className="w-full h-auto opacity-90"
          alt=""
        />
      </div>

      <div>
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 md:flex-row md:items-center md:justify-between md:px-8">
          <p className="font-body text-xs text-brand-white/60">
            © {year} The Big Flavour Ltd. All rights reserved.
          </p>
          <ul className="flex gap-6">
            <li>
              <Link
                href="/privacy"
                className="font-body text-xs text-brand-white/60 transition-colors hover:text-brand-pink"
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="font-body text-xs text-brand-white/60 transition-colors hover:text-brand-pink"
              >
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

interface FooterColumnProps {
  title: string;
  children: React.ReactNode;
}

function FooterColumn({ title, children }: FooterColumnProps) {
  return (
    <div>
      <h3 className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-brand-pink">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">{children}</ul>
    </div>
  );
}
