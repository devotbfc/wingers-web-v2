# CLAUDE.md — Wingers Web v2

Marketing site for **Wingers**, UK halal buttermilk fried chicken. Two sites: Milton Keynes + Northampton. Operated by The Big Flavour Ltd.

Repo: `devotbfc/wingers-web-v2` (public) · Local: `C:\Users\marka\projects\wingers-web-v2` · Deploy: Vercel → `wingers-web-v2.vercel.app` (DNS cutover to `wingers.co` post-launch).

---

## Stack (locked)

Next.js 16 App Router + Turbopack + TypeScript strict. Tailwind v4 (`@theme` block in `globals.css`, no config file). Motion for animation — **never install GSAP**. shadcn/ui as needed. React Hook Form + Zod + sonner. Supabase (EU) for loyalty signups. PostHog EU + Sentry. Sanity CMS deferred to Phase 2.

---

## Workflow rules (non-negotiable)

1. **Plan mode mandatory** for any change touching 3+ files.
2. One phase = one branch = one PR = one merge. **Never** run the finishing-a-development-branch workflow until I confirm visually on a Vercel preview. (Build 1 had three premature "completions".)
3. **Inventory before you reference.** `ls` the actual folder contents before writing any code that references an asset path. Never assume a filename.
4. **No unsolicited dependency installs.** If it wasn't asked for, revert it.
5. **Locations single source of truth:** `src/lib/locations/` (`types.ts` + `locations-data.ts` + `index.ts` barrel). Never create a parallel locations file — a duplicate broke production in build 1.
6. Naming: lowercase `locations` export, `Location` type. No `LOCATIONS`/`locations` drift.
7. **Brand tokens only** — no raw hex in components.
8. Server Components by default; `"use client"` only where genuinely interactive.
9. Every `next/image` has `width`/`height`/`sizes`. `priority` only above the fold.
10. UK English. Brand voice per `docs/brand.md`.
11. Conventional Commits. Squash merge. One open PR at a time.
12. OG images are **static PNGs in `public/og/`** — never dynamic `ImageResponse` (ADR-014: Edge font loading failed repeatedly).
13. **Mobile-first**: design and verify at 375px before desktop. Mobile is not a stacked list of the desktop — see "Mobile rhythm" below.
14. Resolve merge conflicts locally via Claude Code — never the GitHub web editor.

---

## Brand tokens

| Token | Hex | Role |
|---|---|---|
| `brand-pink` | `#FF6FB5` | Primary — warm hot pink, matches the logo |
| `brand-red` | `#FF2D2D` | Secondary — sauce red |
| `brand-black` | `#000000` | Dark sections only |
| `brand-white` | `#FFFFFF` | Base / dominant |

**Palette law: white-primary.** The site is predominantly white. Exactly **three** dark sections are permitted, and they create the rhythm `dark hero → white body → dark close`:

1. Hero
2. Big CTA strip
3. Footer

Everything else is white-based with pink or red as the accent — one accent dominates per section. **No blue. No `#f8aaff`. No gradients**, with a single exception: a subtle radial pink→red glow permitted behind a hero food photo.

**Type:** Bricolage Grotesque (display — ExtraBold 800 hero, Bold 700 sections, tracking -0.02 to -0.04em) + Inter (body — 400, line-height 1.5). Both via `next/font/google`.

**Voice:** "Future of Flavours. Dip It. Bite It. Love It." · "Best wings in the game" · "Get stuck in" (primary CTA) · "Become a Winger" (loyalty) · "Friends with Benefits" (email list) · "You're in." (confirmations). Confident, direct, sensory, British. No apologies, no puns, no emoji in product copy. ALL CAPS only in headline lockups.

---

## Signature devices (the things that make it Wingers, not a template)

Reuse these — do not invent new ones per section:

- **DoubledHeading** — single element + `::before` pseudo-element via `data-text`, **em-based offsets** (0.06em display / 0.04em section) so wrapping is identical and the offset scales with font size. **Never** two absolutely-positioned copies.
- **MarqueeLockup** — pure CSS infinite marquee, pause on hover, 60s default.
- **DoubledCTAStrip** — oversized stacked doubled links, hover flips colour.
- **OrderTrigger + OrderSlideUp** — bottom-anchored thumb-zone pill, slide-up panel listing both locations.
- Oversized decorative wordmark bleeding off-canvas in the footer.

---

## Mobile rhythm (Rule 13, expanded)

Mobile must not collapse into a monotonous single-column same-height list. Enforce:

- Varied block heights and asymmetric offsets between stacked cards.
- Full-bleed edge-to-edge media on at least one section per screen-and-a-half of scroll.
- Horizontal scroll-snap rails (not vertical stacks) for anything that is a set of 3+ peers.
- Thumb-zone CTAs, min-height 44px, order pill reads "ORDER" under 640px / "ORDER NOW" above.
- LCP under 2.5s, Lighthouse mobile 90+.

---

## Ordering (hard constraint)

Two platforms, permanently:

| Site | Platform | URL |
|---|---|---|
| Milton Keynes | Deliverect Direct | `https://wingers-mk.deliverectdirect.com/` |
| Northampton | Toast | `https://order.toasttab.com/online/wingers-northampton` |

The website is **discovery + handoff**. **Never build a native cart** — Deliverect and Toast own the carts. All order CTAs go through the `OrderProvider` interface, never a hardcoded URL, so PushPull Hub can swap in later (ADR).

**Hours:**
- MK: Mon–Tue 16:30–21:30 · Wed–Fri 16:30–22:00 · Sat–Sun 12:00–22:00
- Northampton: Mon–Tue 11:30–20:00 · Wed–Sun 11:30–22:00

---

## AI search (first-class requirement)

The site must be answerable by ChatGPT / Gemini / Perplexity, not just Google:

- Semantic HTML, one `<h1>` per page, real headings — not styled divs.
- JSON-LD on every relevant route: `Restaurant` + `LocalBusiness` per location (with `openingHoursSpecification`, `geo`, `hasMenu`, `servesCuisine`, `paymentAccepted`), `Menu`/`MenuItem` on `/menu`, `FAQPage` where FAQs exist, `Organization` sitewide.
- Plain-language answer paragraphs near the top of each page ("Wingers is a halal buttermilk fried chicken shop in Milton Keynes and Northampton…") — crawlable text, not text baked into images.
- `sitemap.ts` + `robots.ts` maintained. Privacy/Terms `noindex`.

---

## Assets

`public/brand/logo/` · `public/brand/pattern/` · `public/brand/photos/{hero,wings,tenders,burgers,sides,sauces,lifestyle,behind-scenes,locations/*}` · `public/brand/videos/` · `public/og/`

Compression: everything **under 1MB** before commit (TinyPNG). Video via HandBrake: 1080p H.264, no audio, RF 24, Web Optimized, 3–5MB target. Placeholders carry `data-todo="assets"` so they're greppable.

---

## Do not touch

`.env.local` · `package-lock.json` (except via npm) · anything in `public/brand/` without asking · `src/lib/locations/` structure.
