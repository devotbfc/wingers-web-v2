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
**Status**: Accepted (revisit Phase 2)

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
