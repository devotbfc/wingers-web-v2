# Architectural Decisions — `docs/decisions.md`

> Numbered, dated, append-only log of significant architectural decisions. Format: context → decision → consequences. New ADRs added at the bottom. Never edit an old ADR — supersede with a new one and link back.

---

## ADR-001 — App-first ordering (no native cart in v1)

**Date**: 2026-06-07
**Status**: Accepted

### Context
Wingers operates two locations using two different ordering platforms (Deliverect for MK, Toast for Northampton). Each platform has its own cart, checkout, payment, and order management. Building a third cart on our website creates three places a customer can lose an order, three places to debug, and three places to maintain price/availability sync.

### Decision
The website is a marketing + discovery layer. We do NOT build a native cart in v1. Every "Order Now" CTA hands off to the appropriate external platform (Deliverect or Toast) based on the selected location.

### Consequences
- Faster build, fewer failure modes
- No payment integration, PCI scope, or checkout testing burden
- We don't own customer order data in our DB (yet)
- Future PPH cart (ADR-009) will provide this; design hooks now (ADR-010)

---

## ADR-002 — Single source of truth for locations

**Date**: 2026-06-07
**Status**: Accepted

### Context
Previous build created two parallel `locations-data.ts` files in different folders. A merge brought both into `main`, triggering type conflicts, runtime bugs, and an hour of debugging.

### Decision
All location data lives in `src/lib/locations/locations-data.ts`. Type definitions in `src/lib/locations/types.ts`. Public API exported via `src/lib/locations/index.ts` barrel file. Every component imports from `@/lib/locations`. Never create a parallel locations file anywhere in the repo.

### Consequences
- Type safety guaranteed across the codebase
- Migration to Sanity (Phase 2) is a one-line change in the barrel file
- Claude Code instructed in CLAUDE.md §6 to never duplicate this file

---

## ADR-003 — Typed local data for Phase 1

**Date**: 2026-06-07
**Status**: Accepted (will be superseded by ADR-TBD when Sanity migration is done)

### Context
A headless CMS (Sanity) is the long-term plan for menu and locations data, so non-engineers can update prices and content. But setting up Sanity adds a day to the build, and we have a 1–3 day window.

### Decision
Menu and locations live as TypeScript `as const` arrays in `src/lib/menu/menu-data.ts` and `src/lib/locations/locations-data.ts` for v1. The interfaces are designed to be Sanity-migration-ready: flat field names, slug-based identifiers, ISO date strings, no embedded objects beyond one level of nesting.

### Consequences
- Faster v1 build
- Menu updates require a deploy until Sanity migration
- Type safety stronger than CMS approach
- Migration to Sanity is a Phase 2 task, estimated half a day given the schema is already aligned

---

## ADR-004 — Static OG images, no dynamic generation

**Date**: 2026-06-07
**Status**: Accepted (supersedes the previous build's dynamic-OG approach)

### Context
Previous build attempted dynamic OG image generation using Next.js `ImageResponse` in Edge runtime. The Bricolage Grotesque font fetch failed silently in Edge runtime, producing blank OG images on every shared link. Multiple hours lost debugging.

### Decision
OG images are STATIC 1200×630 PNGs designed in Canva or Figma, dropped in `public/og/`, and referenced per-route in `metadata.openGraph.images`. No `ImageResponse`, no Edge runtime, no font loading inside image generation.

### Consequences
- Zero runtime risk for OG images
- Designer (or Benson in Canva) owns the asset
- ~10 PNGs to design for v1 (home, menu, locations, locations-mk, locations-nn, about, allergens, loyalty, privacy, terms)
- If brand pivots, re-export 10 PNGs in Canva (~30 min) vs. debug Edge runtime
- Per-location dynamic OG (e.g. with location name baked in) is rejected for v1 — revisit only if locations grow beyond 5

---

## ADR-005 — Motion library, not GSAP

**Date**: 2026-06-07
**Status**: Accepted

### Context
Motion (formerly Framer Motion) and GSAP are both capable animation libraries. Motion is ~30KB gzipped, GSAP is ~50KB plus plugins for the most useful features. Previous build had GSAP installed unsolicited by Claude Code mid-phase.

### Decision
Motion only. GSAP is banned. If Claude Code installs GSAP, the install is reverted before commit.

### Consequences
- Smaller bundle
- One animation paradigm to learn
- Some advanced GSAP-only features unavailable (e.g. ScrollTrigger pinning) — accepted

---

## ADR-006 — Pink + red palette (deliberate divergence from brand book)

**Date**: 2026-06-07
**Status**: Superseded by ADR-015 (2026-06-29) — palette role + pink hex revised

### Context
The official brand book (by designer aanu) specifies pink + ultramarine blue (`#2123e0`). The website diverges to pink + sauce red (`#FF2D2D`) because red better evokes wings, sauce, and heat — and creates a stronger appetite signal.

### Decision
Website palette is pink + red + black + white. Brand book remains pink + blue until other materials (packaging, signage) are revised.

### Consequences
- Documented divergence; both palette systems exist temporarily
- When brand book is updated, this ADR is superseded or amended
- All other Wingers materials (Instagram, packaging) are not affected by this decision

---

## ADR-007 — Public GitHub repo

**Date**: 2026-06-07
**Status**: Accepted

### Context
Vercel Hobby plan rejects deploys from non-team commit authors on private repos. Previous build wasted half a day on this constraint. Source code is not a competitive advantage; brand assets are already on the public-facing website.

### Decision
GitHub repo is public from Day 0. `.env.local` is gitignored. Sensitive values live in Vercel env panel only.

### Consequences
- No deploy author friction
- Source visible publicly (acceptable — there are no secrets in a Next.js marketing site's source code)
- Lower friction for hiring help later

---

## ADR-008 — White-label loyalty for v1, custom for v2

**Date**: 2026-06-07
**Status**: Deferred (not in scope for current build)

### Context
A custom loyalty programme requires auth, point ledger, reward redemption logic, admin UI, and customer-facing UI — minimum 3-4 weeks of focused work.

### Decision
For v1, capture loyalty signups (email + name + location preference) into Supabase + Mailchimp. Defer the actual loyalty programme to a Phase 2 build via Push Pull Hub (per ADR-009/010). Alternative considered: white-label app (Flipdish, ~£200/month/location) — rejected for current build because in-house loyalty is on the PPH roadmap.

### Consequences
- v1 captures email audience for future loyalty programme launch
- Customers signing up are told they're joining a "waiting list" / "Friends with Benefits" — managed expectation
- Mailchimp used to keep audience warm with brand updates between v1 and loyalty launch

---

## ADR-009 — Two ordering platforms abstracted via OrderProvider interface

**Date**: 2026-06-07
**Status**: Accepted

### Context
MK uses Deliverect, Northampton uses Toast. A third provider (PPH cart sending to Toast POS) will replace both in a future build. Hardcoding platform URLs in components creates a refactor mountain when the third provider arrives.

### Decision
Define `OrderProvider` interface in `src/lib/order/types.ts`:
```ts
export interface OrderProvider {
  name: "Deliverect" | "Toast" | "PushPullHub"
  getOrderUrl(location: Location): string
  isAvailable(location: Location): boolean
}
```
Implementations in `src/lib/order/providers/`. Resolution by location in `src/lib/order/providers/index.ts` `getProviderForLocation(location)`. All components consume the resolver, never raw URLs.

### Consequences
- Components are platform-agnostic
- Switching MK from Deliverect to PPH later is a one-line config change per location
- PPH provider stub written now, body filled in when PPH cart endpoint is ready

---

## ADR-010 — Supabase for loyalty signups

**Date**: 2026-06-07
**Status**: Accepted

### Context
Loyalty signups need to land in a real database from minute one, so we're not losing audience data while waiting for PPH cart. PPH may use a different database later, but the website cannot block on PPH being ready.

### Decision
Loyalty signups write to Supabase (EU region) via `/api/loyalty/signup` route. Same route ALSO writes to Mailchimp via API for marketing list. Supabase is the source of truth.

Schema (initial):
```sql
create table loyalty_signups (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  first_name text,
  preferred_location text check (preferred_location in ('milton-keynes', 'northampton', null)),
  marketing_consent boolean not null default true,
  source text default 'website',
  mailchimp_synced_at timestamptz,
  pph_synced_at timestamptz,
  created_at timestamptz default now()
);
```

### Consequences
- Free tier covers ~50K rows (way over v1 needs)
- Future PPH loyalty section reads from this Supabase table directly via service role key, OR we set up a sync webhook on insert
- Mailchimp keeps marketing emails working immediately
- One signup form, two destinations, atomic API route

---

## ADR-011 — AI search optimization as first-class concern

**Date**: 2026-06-07
**Status**: Accepted

### Context
Customers increasingly discover restaurants via ChatGPT, Gemini, Perplexity, and Google's AI Overviews. Traditional SEO (rank for "wings near me") is necessary but no longer sufficient — content must also be QUOTABLE by LLMs.

### Decision
AI SEO is a primary goal (CLAUDE.md §2), not a Phase H afterthought. Every page must satisfy the AI SEO requirements in CLAUDE.md §4: static rendering, semantic HTML, JSON-LD structured data per route, meta tags, `llms.txt`, explicit bot allowlist in `robots.txt`, and self-contained content depth.

### Consequences
- Slightly more content per page (FAQs, dense About, dense Locations)
- JSON-LD generators built into `src/lib/seo/structured-data.ts` as core utilities
- All routes statically rendered where possible — no client-side data fetching for primary content
- Post-launch addition: journal/blog with 5-10 long-form posts targeting LLM search queries

---

## ADR-012 — Domain: launch on Vercel URL, cutover later

**Date**: 2026-06-07
**Status**: Accepted

### Context
The current `wingers.co` WordPress site is operational. Cutting DNS over to the new site at the exact moment of launch increases risk (DNS propagation issues, env var mismatches, 404s from old WordPress URLs).

### Decision
Launch new site on Vercel preview URL (e.g. `wingers-web-v2.vercel.app`). Set `NEXT_PUBLIC_APP_URL` to this URL. Soft-launch by sharing the Vercel URL directly via social, then cut DNS over to the new site once verified in production. Set up 301 redirects from old WordPress URLs to new equivalents BEFORE cutover.

### Consequences
- Lower-risk launch
- Time between soft launch and DNS cutover is the testing window
- `NEXT_PUBLIC_APP_URL` updated in Vercel env panel at cutover (single change)
- 301 redirect map maintained in `docs/migration-guide.md`

---

## ADR-013 — No analytics or error tracking at launch

**Date**: 2026-06-07
**Status**: Superseded by ADR-017 (2026-09-20)

### Context
PostHog and Sentry are valuable but cost setup time we don't have in a 1–3 day window. Previous build set up PostHog env vars but never defined events — the data would have been useless anyway.

### Decision
Skip PostHog and Sentry for v1 launch. Add in Phase 2 with a proper event taxonomy defined first. Vercel Web Analytics (built-in, one-line opt-in) is enabled as a minimal baseline.

### Consequences
- v1 launch is faster
- We have basic pageview data from Vercel Web Analytics
- Detailed funnel analytics deferred to Phase 2
- Errors not tracked in v1 — we rely on Vercel build logs + manual monitoring

---

## ADR-014 — `loyalty_signups` writes are server-side only

**Date**: 2026-06-07
**Status**: Superseded by ADR-016 (2026-07-15)

### Context
Supabase has Row Level Security (RLS) for client-side writes, but exposing the table to the client requires careful RLS policy design. For v1, simpler to write server-side only.

### Decision
The `loyalty_signups` table has RLS enabled with NO public policies. Only the server role can insert. The `/api/loyalty/signup` route uses the Supabase service role key (server-only env var) to insert. Browser never talks to Supabase directly in v1.

### Consequences
- Simpler RLS posture
- Service role key MUST be server-only (`SUPABASE_SERVICE_ROLE_KEY`, no `NEXT_PUBLIC_` prefix)
- When the loyalty app needs client-side reads (Phase 2), we add specific RLS policies for that case

---

> Add new ADRs below this line. Format: `## ADR-NNN — Title` → Date, Status → Context, Decision, Consequences.

---

## ADR-015 — White-primary palette + corrected pink hex

**Date**: 2026-06-29
**Status**: Accepted (supersedes ADR-006)

### Context
Two related issues with the foundation palette:

1. The original ADR-006 set the website palette as pink + red + black + white but didn't specify a default base. The build defaulted to black-primary, which the owner finds too dark for a food brand — black reads premium for tech and fashion but suppresses appetite signals for buttermilk fried chicken. Photography and the pink/red duotone both pop harder on white.
2. The pink token was set to `#f8aaff`, which reads cool/purple on screen and doesn't match the actual Wingers logo pink. Correct value is `#FF6FB5` (warm pink), confirmed against the logo file.

### Decision
1. **White is the default page background. Black is the default text colour.** Dramatic sections — hero, CTA strips, footer — opt in to a dark canvas via the `.section-dark` utility (defined in `src/styles/globals.css` `@layer components`), which sets bg-black + text-white. Dark sections are explicit, not the default.
2. **Brand pink is `#FF6FB5`, not `#f8aaff`.** The `--color-brand-pink` token is updated, and every `#f8aaff` occurrence in `src/`, `public/`, `docs/`, and `CLAUDE.md` is replaced with `#FF6FB5`.

Pink + red duotone remains the signature combination. No blue, no gradients, no new colours.

### Consequences
- White-primary base feels more appetising and premium; pink/red blocks and food photography carry more visual weight against white.
- Dark sections retain Gen Z edge where it earns its place — hero, CTA, footer — without flooding the whole site.
- Pink correction is a one-time token + asset sweep (6 occurrences). No components hardcode the hex; everything pulls from `--color-brand-pink` except the placeholder SVGs, which are repainted in this same change.
- ADR-006 is superseded but its core point (red over the brand book's ultramarine) still stands and is restated here.

---

## ADR-016 — Loyalty writes use anon key + INSERT-only RLS (supersedes ADR-014)

**Date**: 2026-07-15
**Status**: Accepted (supersedes ADR-014)

### Context
ADR-014 mandated that `loyalty_signups` writes go through `SUPABASE_SERVICE_ROLE_KEY` from a server-only route handler, with no public RLS policies. That works but forces a service-role key into the app's runtime environment. Any misconfiguration (a leaked build artefact, a stray log line, a debug endpoint) exposes full DB access.

The safer default is to keep no service-role key in the deployed app at all. Supabase's anon key is designed to be public — its safety comes from Row Level Security. If RLS is set up correctly, the anon key can only do what the policies explicitly allow.

### Decision
1. The app uses only `NEXT_PUBLIC_SUPABASE_ANON_KEY` — the service-role key is never referenced anywhere in the codebase or Vercel runtime env.
2. `loyalty_signups` has RLS enabled with exactly one policy: `for insert to anon with check (true)`. No SELECT, UPDATE, or DELETE policies exist for `anon` or `authenticated`, so those actions are denied by default.
3. Signups happen from a Next.js Server Action (`src/app/actions/loyalty.ts`) using the anon-key client — server-side execution keeps the honeypot check, Zod validation, IP rate-limit, and duplicate-email swallow inside our trust boundary, without needing an elevated DB role.
4. Admin reads happen in the Supabase dashboard SQL editor (service role) — never from the app.

### Consequences
- Blast radius of the deployed app is smaller: worst case a leaked build lets someone sign up rows, not read them.
- No `SUPABASE_SERVICE_ROLE_KEY` in `.env.local` or Vercel for this app.
- If a future feature needs client-side reads (a "you're on the list" check, a member-only page), we add a scoped SELECT policy for that specific case — not a blanket service-role fallback.
- Unique-email violations are swallowed server-side and returned as success, so the response cannot be used to enumerate the list.
- ADR-014 is superseded but its intent (writes are gate-kept) still stands — the gate is now the RLS policy rather than the service-role key.

---

## ADR-017 — Meta Pixel added (browser side, consent-gated)

**Date**: 2026-09-20
**Status**: Accepted (supersedes ADR-013)

### Context
Meta ads are currently **paused** and will stay paused until Purchase is measurable end-to-end via the Conversions API from PushPull Hub. To unpause, ad measurement needs the browser half in place so PPH's server-side twin has something to dedupe against. Purchase itself happens off-site (Deliverect Direct for MK, Toast for Northampton) — the browser pixel can only cover the top of the funnel and the click hand-off.

ADR-013 previously said "Vercel Web Analytics is enabled as a minimal baseline." That was inaccurate — `@vercel/analytics` was never installed. This ADR resets the picture honestly.

### Decision
Meta Pixel loaded browser-side via `next/script` `strategy="afterInteractive"`, gated on:
1. `NEXT_PUBLIC_META_PIXEL_ID` being set (missing env = silent no-op, no consent banner shown).
2. Explicit user consent (UK PECR) via a small localStorage-backed banner (`wingers_consent` = `"accepted" | "rejected"`).

Events fired browser-side, each with a `crypto.randomUUID()` `event_id` passed as fbq's `eventID` option so PushPull Hub can send the same ID via CAPI and dedupe:
- `PageView` on every App Router route change (via `usePathname` + `useSearchParams` inside a `Suspense` boundary).
- `ViewContent` on the per-card Order button click on `/menu` (opens the OrderPanel; `content_ids=[item.slug]`, `content_name`, `value`, `currency=GBP`).
- `InitiateCheckout` on the outbound Deliverect/Toast link click inside `OrderPanel` (`content_category` = `"mk"` or `"nth"`, `destination` = final URL).
- `Lead` on loyalty signup success.

`fbclid` handling (consent-gated):
- `?fbclid=<val>` on the current URL → written to `_fbc` cookie as `fb.1.<ts>.<val>` (90-day, SameSite=Lax) only if consent is accepted.
- Outbound Order URL gets `fbclid` appended (from URL param or `_fbc` cookie) only if consent is accepted. If consent is rejected or unknown, the outbound URL is clean — the click identifier is treated as non-essential tracking metadata, same as the pixel itself.

No `<noscript>` fallback img. No `@vercel/analytics` install in this PR (Rule 4 — no unsolicited deps).

### Consequences
- The site now has real ad measurement for PageView / ViewContent / Lead / InitiateCheckout, ready for PPH to fire the Purchase twin via CAPI.
- One non-essential cookie (`_fbc`) is written, only after consent. Consent choice persists in localStorage across visits.
- PostHog and Sentry remain deferred (ADR-013's other deferrals still hold — this ADR only reverses the "no analytics at launch" part).
- Vercel Web Analytics is still **not** wired, correcting ADR-013's inaccurate claim. Listed as a follow-up below and must land before DNS cutover.
- All fbq calls are safe no-ops when the pixel isn't loaded (env missing or consent not granted), so touching `track()` from any component is always safe.
- Root cause of the initial banner-not-showing failure was pasted HTML inside `.env.local`, not code — `.env` parsing is strict and stray content silently blanks keys.

### Follow-ups
1. ~~Install `@vercel/analytics` and mount it in the root layout.~~ **Done 2026-09-22.** `<Analytics />` mounts outside `<ConsentProvider>` in `src/app/layout.tsx`. Vercel Web Analytics is cookieless (session hash only, no persistent tracking cookies) — it sits outside the PECR/GDPR consent gate.
2. ~~Add a footer "Cookie settings" link that reopens the consent banner, so users can change their mind. Also required in the privacy copy.~~ **Done 2026-09-23.** `src/components/consent/CookieSettingsLink.tsx` clears `wingers_consent` from `localStorage` and reloads; the banner reappears because `ConsentProvider`'s `useSyncExternalStore` snapshot falls back to `"unknown"` when the key is absent. Privacy policy documents the mechanism under "Advertising measurement (Meta Pixel)".
3. Fire the Purchase event server-side from PushPull Hub via the Meta Conversions API, deduped against the browser pixel on `event_id`. This ADR sets up the browser half of that pair.

---

## ADR-018 — ADR-015 enforcement + CTA primary rule

**Date**: 2026-10-01
**Status**: Accepted (extends ADR-015)

### Context
Between ADR-015 (2026-06-29) and the pre-launch audit (2026-10-01), dark surfaces drifted into places ADR-015 forbade: NavBar mobile sheet, menu shell + cards (location switcher, section rail, unavailable banner, MenuCard tile rotation + photo wrapper + Halal/Vegetarian chips, FlavourCard tile rotation), homepage TwoSpots + TheGoods tiles, About (HALAL. FACTUAL. section + the THAT'S IT. close), Allergies cross-contamination box, Loyalty benefits tile, the location detail hero, and the LocationOpenBadge "Closed" state. The signature DoubledHeading device spread from the single homepage h1 to every section heading on home, menu, locations, about, allergies, loyalty, contact, privacy, terms, 404, and the locations detail — diluting its weight. MenuCard rendered allergens + "may contain" + full description simultaneously, hurting mobile scanability.

Separately, both brand-red and brand-pink were being used as filled primary buttons depending on the surface, with no documented rule — so some screens shipped with a red-filled and a pink-filled CTA sitting side by side (homepage hero Order+Find Us, location card Order+Directions, location detail Directions+Call).

### Decision
1. Dark surfaces are permitted on exactly four places site-wide: homepage hero, the big CTA strip (FlavourLabTeaser), the footer, and the /flavour-lab zone (via bg-lab-black, the one playful inversion). Any new use of `.section-dark`, `bg-brand-black`, or `bg-lab-black` outside those four zones requires a new ADR.
2. DoubledHeading is reserved for the homepage hero h1 and the /flavour-lab zone (the fourth permitted dark surface). Zero other call sites — every section heading on every other route uses a plain font-display heading. DoubledCTAStrip (which depended on DoubledHeading and was unused in production) is deleted and removed from CLAUDE.md's signature-devices list.
3. MenuCard allergens + "may contain" sit behind a tap-to-expand "Allergens" chip (local React state). Description clamps to two lines and expands with the chip. Price + sizes + the single ORDER button stay always-visible. The chip has a ≥44px hit area via `min-h-11 py-2 -my-2` so the WCAG target size is met without changing the visible 10px label.
4. **ORDER is always `brand-red` fill with `brand-white` text, everywhere** — nav (desktop + mobile sheet), hero, order panel, location cards, location detail, menu cards, flavour cards, footer. The previous mobile-sheet pink-chip exception is retired; the sheet now shows a red filled ORDER as well. `brand-pink` fill is reserved for brand accents (status badges, decorative chips, section flourishes, menu-shell active-chip indicator) — never for a CTA. **Secondary actions beside ORDER use `BrandButton` `variant="outline"`** (white fill, black border, inverts to red/white on hover and focus-visible). This replaces the "demote to ghost" rule for same-row pairs; ghost (red text, underline) remains available for low-weight tertiary links (phone, "learn more"-style). On a red surface the fill inverts to white/red (`BrandButton` `variant="inverse"`) so the button stays visible without putting two red fills on one tile. **Hover must stay visible on pink, white, and black surfaces** — `primary` and `inverse` use `hover:brightness-90`/`-95` instead of a hue swap, so a red ORDER sitting on a brand-pink OrderPanel card or in a `bg-lab-black` zone still signals press-state without clashing with the surface. **Every clickable button/CTA renders at `rounded-md`**, set at the variant level inside `BrandButton` so call sites don't carry radius overrides. `rounded-full` and `rounded-none` are removed from the button system. Status badges, product chips, heat tags and section labels stay pill (they're not buttons). Two patterns stay round by design: floating action buttons (BackToTop) and the invisible wheel SPIN hit area, both anchored to a circular visual target. **Cookie consent exception:** the consent banner's Accept and Reject use `variant="outline"` with the same size — equal-prominence per ICO guidance, not a red-primary Accept.

### Consequences
- Rolls back 18 class usages and demotes 19 DoubledHeading call sites across 20+ files (see `design/enforce-adr-015` branch commits `485da89` through `a0f0c0a` for the exact diff).
- Flavour Lab's `bg-lab-black` is formally recorded here as the fourth permitted dark surface — previously only commented in `globals.css`, now ADR-documented. Lab also keeps DoubledHeading as a styling exception since the whole zone is the one playful inversion.
- `globals.css` `.section-dark` comment is updated to name the four zones and the ADR-required-for-exceptions rule.
- `BrandButton` file-level comment references this ADR so the next engineer to add a variant pair reads the rule before shipping another collision. Variant class definitions unchanged — they already encode the right colours.
- MenuCard becomes a shorter card on mobile; density only appears when the user asks for it.
- NavBar Order button is flattened to `brand-red` in both scrolled and top states — the previous dead ternary (pink when top, red when scrolled) landed pink Order beside the hero's red CTA on the homepage top-state.
- Location detail hero drops its `bg-brand-black/55` scrim in favour of `bg-brand-white/85`, turning the pink/red brand base into a soft light-pink/coral canvas. The decorative BrandLogo mark swaps `variant="white"` → `variant="black"` so it still reads as a 15%-opacity watermark on light.
- About page's dramatic "THAT'S IT." close loses its 70svh dark backdrop and collapses to a normal-flow section with left-aligned content matching the hero rhythm.

---

## ADR-019 — `/order` mirrors the wing-app theme (scoped exception to ADR-015 + ADR-018)

**Date**: 2026-10-04
**Status**: Accepted (scoped exception to ADR-015 and ADR-018)

### Context
The native web ordering flow at `/order/*` (gated by `NEXT_PUBLIC_ORDERING_MODE=pph`) is a one-to-one mirror of the Wingers mobile app (`wing-app`). The app is a dark, premium brand surface (`bg #0A0A0A`, Anton display, DM Sans body, rounded-pill buttons, gold loyalty accents). Shipping it on the main site's white-primary brand (ADR-015) made every screen read as a different product — buttons flattened to a square `rounded-md` red, headings in Bricolage not Anton, no sense that this is the same loyalty surface the user already knows from their phone. The Flavour Lab (ADR-018) is already a documented inversion zone for a similar reason.

### Decision
1. `/order/*` is a scoped exception to ADR-015 (white-primary palette) and ADR-018 (`rounded-md` CTAs, red/pink restrictions). Within `/order/*` the look is the wing-app's: dark background, Anton + DM Sans, rounded-pill buttons.
2. Scoping is a `.pph-app` CSS class wrapper applied by `src/app/order/layout.tsx` only. All dark tokens live in `src/app/order/_pph.css` under that selector — the main site globals (`src/styles/globals.css`) are untouched. Nothing outside `/order/*` can accidentally pick up a `bg-pph-*` or `text-pph-*` utility.
3. Fonts: Anton + DM Sans are loaded via `next/font/google` in `src/app/order/layout.tsx` only. The CSS rebinds `--font-display` → Anton and `--font-body` → DM Sans inside `.pph-app` so the existing `font-display` / `font-body` Tailwind utilities keep working, but render in the app faces within the ordering flow and in Bricolage + Inter everywhere else.
4. Buttons inside `/order/*` follow the app: `rounded-pill`, pink fill on primary CTAs (ORDER, Confirm, Pay), gold on loyalty redemption, elevated-grey on neutral/secondary. ADR-018's red `brand-red` ORDER rule stays in force on the marketing site (home, menu, locations, flavour lab, etc.) — the two surfaces don't blend.

### Consequences
- The marketing site renders byte-identical to before, because none of the dark tokens or app fonts leak out of `.pph-app`.
- Any future `/order/*` component must use the `pph-*` utility classes (`bg-pph-bg`, `text-pph`, `rounded-pill`, etc.) and the font-display/body classes rather than importing marketing-site components like `BrandButton`. `BrandButton` is still allowed anywhere outside `/order/*`.
- Delivery aggregator links are per-location (new optional fields on `src/lib/locations/types.ts`: `deliverooUrl`, `uberEatsUrl`, `justEatUrl`, default null). The /order menu-page "Prefer delivery?" trigger is hidden entirely when the active shop has none configured, so we don't show a sheet that could link to a different brand's listing by accident.
- Site-wide CTAs (ADR-018) still own the handoff experience when the flag is off (`handoff` mode routes CTAs to Deliverect/Toast on the marketing site). Nothing in this ADR relaxes the main-site ADR-015/018 enforcement.

### Amendment (2026-10-04, revised)

Web `/order/*` now renders the app's **layout, components, pill buttons, sheet shape, row rhythm and chips** on the **main site's light palette AND the main site's typography (Bricolage Grotesque display + Inter body)**, not the wing-app's dark palette and not the wing-app's Anton + DM Sans faces. The dark palette (`bg #0A0A0A`, surface `#161616`, elevated `#1F1F1F`, text `#FEFDFB`, muted `#8A8A8A`) **and the Anton + DM Sans faces** are retained **in the mobile app only** — on web the same components re-skin to:

- `--pph-bg #FFFFFF`, `--pph-surface #F6F6F6`, `--pph-elevated #EDEDED`, `--pph-border #E5E5E5`
- `--pph-text #0A0A0A`, `--pph-muted #6B6B6B`
- Pink `#FF6FB5` and red `#FF2D2D` unchanged; `.pph-outer` desktop frame `#F2F2F2`.

Three new semantic tokens carry the contrast guarantees because the dark palette's inversion rule (white text on filled brand) breaks on light:

- `--pph-on-pink: #0A0A0A` — text/icons that sit on `--pph-pink` (white on `#FF6FB5` is ≈2.5:1, which fails WCAG). Every `bg-pph-pink text-pph-bg` call site swaps to `bg-pph-pink text-pph-on-pink`.
- `--pph-on-red: #FFFFFF` — text/icons that sit on `--pph-red`.
- `--pph-gold-dark: #8A6200` — gold text on a light background (`#FFB800` fails ≈1.7:1 on white). Reserved for in-flow surfaces (PointsPill, loyalty points headline, "You earned N pts", status-card reference line when ready, basket "Earn Wingers points" row, checkout "Menu updated" / "Blue Light applied" labels). The `#FFB800` gold is retained **only** for the PickupCodeBlock.

**PickupCodeBlock is the sole in-flow dark surface** — a near-black `#0A0A0A` ticket with the 44px gold code and a gold border, deliberately preserved as a receipt-ticket contrast island so the pickup code stays legible on the status card, receipt and confirm sheet. The ticket wraps hardcoded dark classes with a comment referencing this amendment.

Scoping remains the `.pph-app` + `.pph-portal` CSS wrapper from the original decision — only token values and new on-colour utilities move; the globals of the marketing site are still untouched. ADR-018's `rounded-md` red ORDER CTA rule continues to apply to the marketing site outside `/order/*` (home, menu, locations, flavour lab); the two surfaces don't blend.

**Typography consolidation (also 2026-10-04):** the original decision point 3 (above) loaded Anton + DM Sans via `next/font/google` in `src/app/order/layout.tsx` and rebound `--font-display` / `--font-body` inside `.pph-app` + `.pph-portal`. That rebinding is **removed**. The site chrome (NavBar + Footer) rendered on `/order/*` by `src/app/order/OrderChrome.tsx` would otherwise fork into Anton on the ordering flow and Bricolage on every other route, breaking the shared-chrome parity. `/order/*` now inherits `--font-display` (Bricolage Grotesque) and `--font-body` (Inter) from the root `<html>` element via `src/app/layout.tsx`. `src/lib/pph/fonts.ts` is deleted. The `pph-*` palette tokens, pill buttons and sheet shape are unchanged.
