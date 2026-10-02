import type { NextConfig } from "next";

type LegacyRedirect = { source: string; destination: string };

// Named legacy paths. For each entry we emit both the trailing-slash and the
// bare form so highest-value URLs resolve in a single hop (link equity).
const NAMED_REDIRECTS: readonly LegacyRedirect[] = [
  { source: "/about-us", destination: "/about" },
  // Footer "Contact" now points at /locations — route /contacts and the
  // Woo-style /contact-us to the same place for consistency.
  { source: "/contacts", destination: "/locations" },
  { source: "/contact-us", destination: "/locations" },
  { source: "/privacy-policy", destination: "/privacy" },
  { source: "/our-locations", destination: "/locations" },
  { source: "/milton-keynes", destination: "/locations/milton-keynes" },
  { source: "/northampton-centre", destination: "/locations/northampton" },
  { source: "/special-offers", destination: "/loyalty" },
  { source: "/communication-preferences", destination: "/loyalty" },
  { source: "/newsletter-popup", destination: "/loyalty" },
  { source: "/coming-soon", destination: "/" },
  { source: "/poll", destination: "/" },
  // WooCommerce default URLs that WP exposes even without being in the sitemap
  { source: "/shop", destination: "/menu" },
  { source: "/cart", destination: "/menu" },
  { source: "/checkout", destination: "/menu" },
  { source: "/my-account", destination: "/" },
  {
    source: "/how-to-make-jammy-soft-boiled-eggs-recipe",
    destination: "/",
  },
  {
    source: "/totoro-pancake-tutorial-easy-totoro-pancake-art",
    destination: "/",
  },
  // FAQ: previous footer link + WordPress /faqs → the new in-page anchor
  { source: "/faq", destination: "/about#faq" },
  { source: "/faqs", destination: "/about#faq" },
  // Note: WordPress /allergies/ is NOT listed here. The destination route is
  // /allergies — expanding slash variants would create /allergies → /allergies
  // (self-redirect loop). Next.js's default trailingSlash: false already 308s
  // /allergies/ to /allergies with no help from us.
];

function expandSlashVariants(
  entries: readonly LegacyRedirect[],
): LegacyRedirect[] {
  const seen = new Set<string>();
  const out: LegacyRedirect[] = [];
  for (const { source, destination } of entries) {
    const bare = source.replace(/\/$/, "");
    const withSlash = `${bare}/`;
    for (const src of [bare, withSlash]) {
      if (src === "" || seen.has(src)) continue;
      seen.add(src);
      out.push({ source: src, destination });
    }
  }
  return out;
}

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31_536_000,
  },
  async redirects() {
    const named = expandSlashVariants(NAMED_REDIRECTS).map((r) => ({
      ...r,
      permanent: true,
    }));

    // Wildcard groups — all old WordPress archives funnel into their closest
    // new-site destination. :path* matches zero-or-more segments; Next.js's
    // default trailing-slash normalisation (trailingSlash: false) catches the
    // terminal /slash/ form before our rule runs.
    const wildcards: LegacyRedirect[] = [
      { source: "/product/:path*", destination: "/menu" },
      { source: "/product-category/:path*", destination: "/menu" },
      { source: "/product-tag/:path*", destination: "/menu" },
      { source: "/category/:path*", destination: "/" },
      { source: "/tag/:path*", destination: "/" },
      { source: "/author/:path*", destination: "/" },
      { source: "/layouts/:path*", destination: "/" },
    ];

    return [...named, ...wildcards.map((r) => ({ ...r, permanent: true }))];
  },
};

export default nextConfig;
