# Prompt Library — `docs/prompt-library.md`

> Paste-ready prompts for Claude Code sessions. Each is designed to be dropped into the terminal once you've `cd`'d into the repo and run `claude`. Prompts assume CLAUDE.md is read by Claude Code at session start.

---

## How to use this library

1. Open terminal, `cd` into repo, run `claude`
2. Type or paste the prompt below the relevant phase
3. Claude Code will read CLAUDE.md, propose a plan in plan mode
4. Approve the plan with "go" or refine it
5. Claude Code executes
6. When it claims done, verify on Vercel preview before merging

**Universal pre-amble** (use before any phase prompt if Claude Code seems off-task):

```
Read CLAUDE.md, docs/brand.md, and docs/decisions.md before proposing anything. Use plan mode. Do not run any "finishing" skill until I confirm visual verification on a Vercel preview URL.
```

---

## Phase 0 — Initial repo scaffold

```
You are setting up the initial scaffold for a new Next.js 16 marketing site for Wingers, a UK fried chicken brand. Read CLAUDE.md at the repo root before doing anything else.

Tasks for this session, in plan mode first:

1. Confirm Next.js 16 App Router project initialised with TypeScript strict, Turbopack, Tailwind v4, App Router (no /pages directory). If not yet initialised, propose the exact `npx create-next-app@latest` command with all flags.

2. Set up the folder structure under src/ matching CLAUDE.md §7 conventions. Create empty index files for each lib module (locations, menu, order, seo, supabase, mailchimp).

3. Configure src/styles/globals.css with the @theme block from docs/brand.md §2.

4. Wire up Bricolage Grotesque and Inter via next/font/google in src/app/layout.tsx, exposing them as CSS variables --font-display and --font-body. Configure them in @theme so Tailwind classes font-display and font-body resolve correctly.

5. Create .env.example with all the variables listed in docs/master-registry.md §4, with placeholder values and helpful comments.

6. Create the empty stubs for src/lib/locations/types.ts, src/lib/menu/types.ts, src/lib/order/types.ts with the interfaces defined in CLAUDE.md.

7. Verify the dev server starts cleanly with no errors.

Output the plan first. Do not execute until I say go.
```

---

## Phase A — Brand foundation + reusable components

```
Build the brand foundation layer for the Wingers website. Read CLAUDE.md, docs/brand.md, and docs/master-registry.md §2 before proposing.

Plan and build, in one PR on branch feat/brand-foundation:

1. Brand components in src/components/brand/:
   - BrandLogo (variants: pink, red, white, black; types: lockup, mark)
   - BrandButton (variants: primary, secondary, ghost; sizes: sm, md, lg)
   - BrandPattern (variants: tile, banner) — uses food icons
   - MarqueeLockup (CSS-only horizontal scroll, 60s loop, respects prefers-reduced-motion)

2. Typography components in src/components/typography/:
   - DoubledHeading — receives text + offsetEm + fillColor + shadowColor. Implements the doubled-headline effect via ::before pseudo-element with content from data-text attribute. Offset in em units (never px) so it scales with font size.
   - DoubledCTAStrip — a section component with 4 oversized DoubledHeading CTAs stacked or wrapped

3. Media components in src/components/media/:
   - VideoHero — autoplay loop with poster fallback, prefers-reduced-motion pause
   - VideoCard — video on hover, image fallback, supports custom aspect ratios
   - ImageCarousel — pure CSS scroll-snap, no library
   - ScrollReveal — Motion whileInView wrapper with once: true and margin: "-100px" defaults
   - HoverImage — crossfade between two src strings

4. Test page at src/app/dev/components/page.tsx — renders every brand, typography, and media component in every variant. This is the visual verification surface.

5. Add Motion to dependencies. Add shadcn/ui Button as the base for BrandButton. No GSAP.

6. All brand colours use Tailwind tokens (brand-pink, brand-red, brand-black, brand-white). No hardcoded hex anywhere in components.

7. DO NOT wire any of these into real pages yet. Phase B does that.

Output the plan first. Visual verification at /dev/components on Vercel preview before merge.

Brand assets are in public/brand/logo/ and public/brand/pattern/. Inventory both directories with ls before referencing any file path in components. Do not assume filenames — verify each one exists.

```

---

## Phase B — Homepage

```
Build the Wingers homepage at src/app/(marketing)/page.tsx. Read CLAUDE.md, docs/brand.md, and docs/master-registry.md §1-2. The brand foundation from Phase A is now available — DO NOT rebuild those components, import them.

Plan and build on branch feat/homepage. Section order:

1. NavBar — sticky, transparent over hero → solid on scroll. Logo left, links right (MENU, LOCATIONS, ABOUT, BECOME A WINGER). Mobile: hamburger to sheet.

2. HeroSection — full viewport, VideoHero with hero-loop.mp4 + hero-poster.jpg fallback, DoubledHeading "DIP IT. BITE IT. LOVE IT.", two CTAs (primary "ORDER NOW" → opens location picker sheet, secondary "OUR MENU" → /menu).

3. Marquee strip — full-bleed, MarqueeLockup with "DIP IT · BITE IT · LOVE IT" repeating, pink on red.

4. CategoryGrid — 3 VideoCards: Wings / Tenders / Burgers, asymmetric stagger on desktop, stacked mobile, each links to /menu#category.

5. FlavourStory — huge DoubledHeading "BEST WINGS IN THE GAME" with sauce carousel (use ImageCarousel, photos from public/brand/photos/sauces/ — if folder empty, use placeholders).

6. BehindScenesSection — ImageCarousel of kitchen shots from public/brand/photos/behind-scenes/.

7. LocationsSection — MK + NN cards reading from src/lib/locations/locations-data.ts (which you'll also create in this PR — see step 11). Each card shows photo, name, address, LocationOpenBadge, "ORDER FROM HERE" CTA.

8. TestimonialsSection — placeholder carousel with 4 TODO reviews. Build the component; content comes later.

9. LifestyleSection — masonry grid of customer photos from public/brand/photos/lifestyle/. If fewer than 6 photos, build with placeholders and add TODO comment.

10. LoyaltySignupSection — embedded form. Build the visual only in this phase; API wiring is Phase G.

11. BigCTAStrip — DoubledCTAStrip with OUR MENU / LOCATIONS / BECOME A WINGER / GET IN TOUCH.

12. Footer — logo, link columns, socials, decorative bottom WINGERS wordmark.

Plus globally in src/app/layout.tsx:
- Locations data file at src/lib/locations/locations-data.ts with two records (MK + NN) including address, postcode, phone, openingHours object (per day), orderProvider field
- LocationOpenBadge component that derives live open/closed status from openingHours
- Order picker sheet that lets user choose MK or NN, then opens the right provider URL in a new tab

Mobile-first. Test at 375px. ORDER pill in mobile shows just "ORDER" not "ORDER NOW".

Output the plan first. Verify visually at the Vercel preview before merge.
```

---

## Phase C — Menu

```
Build the Wingers menu at src/app/(marketing)/menu/page.tsx. Read CLAUDE.md, docs/brand.md, and docs/master-registry.md.

Plan and build on branch feat/menu:

1. Menu data structure in src/lib/menu/:
   - types.ts: MenuItem (name, slug, description, price, image, allergens[], spice (1-5 or null), dietary tags[]) and MenuCategory (name, slug, description, items[])
   - menu-data.ts: 6 categories — Wings, Tenders, Burgers, Sides, Sauces, Drinks. Populate with placeholder items if real menu data not provided. Use realistic UK pricing.
   - index.ts: barrel exports + helpers getCategoryBySlug, getItemBySlug

2. Components for menu:
   - MenuCategoryNav — sticky category nav (Wings, Tenders, Burgers, etc.) with smooth scroll to section
   - MenuItemCard — image + name + description + price + allergen icons + spice indicator + "Add to order" button (button opens location picker, doesn't add to a cart we don't own)
   - MenuLocationSwitcher — small toggle: "Viewing menu for: Milton Keynes | Northampton". Stored in URL search param ?location=mk

3. Menu page layout:
   - Hero strip: huge DoubledHeading "THE MENU"
   - MenuLocationSwitcher
   - MenuCategoryNav
   - One section per category, anchor IDs match slugs
   - Big CTA at bottom: "READY TO ORDER?" → location picker sheet

4. Static rendering. Mobile-first.

Output the plan first. Verify on Vercel preview.
```

---

## Phase D — Locations

```
Build the Wingers locations pages. Read CLAUDE.md, docs/brand.md, and docs/master-registry.md. Locations data already exists from Phase B at src/lib/locations/locations-data.ts.

Plan and build on branch feat/locations:

1. /locations index page (src/app/(marketing)/locations/page.tsx):
   - Hero: DoubledHeading "OUR PLACES"
   - List of LocationCards (rich detail) — photo, name, address, "Order from this location" CTA, LocationOpenBadge

2. /locations/[slug] dynamic detail page (src/app/(marketing)/locations/[slug]/page.tsx) with generateStaticParams for milton-keynes and northampton:
   - Hero: location-specific photo + huge name + address
   - Open hours table (one row per day, today highlighted)
   - Contact: phone + email + whatsapp if available
   - Parking + accessibility + payment methods notes
   - Signature dishes (cross-link to /menu#wings)
   - Embedded Google Map (static iframe, no API key)
   - "Order from this location" big CTA
   - Schema.org Restaurant + LocalBusiness JSON-LD with full address, geo, openingHoursSpecification, telephone

3. Update src/lib/locations/locations-data.ts to include all the fields needed: photos[], parkingNotes, accessibilityNotes, paymentMethods[], signatureDishes (slugs from menu), geo: { lat, lng }, telephone, email.

Static rendering. Mobile-first.

Output the plan first.
```

---

## Phase E — About + Contact + Allergens + FAQ

```
Build the four info pages. Read CLAUDE.md, docs/brand.md.

Plan and build on branch feat/info-pages:

1. /about (src/app/(marketing)/about/page.tsx):
   - DoubledHeading "THE STORY"
   - Origin story (3-4 paragraphs of dense, semantic content — for both readers and LLMs to quote)
   - "What buttermilk fried means" — the technique, soak time, double-dredge
   - Sourcing approach
   - Halal / dietary stance
   - Team section (placeholder)
   - Big CTA strip
   - Schema.org AboutPage + Organization references

2. /contact (src/app/(marketing)/contact/page.tsx):
   - ContactForm component with RHF + Zod (name, email, location, message, marketing consent)
   - Calls /api/contact (build the route stub returning 200, real wiring in Phase G)
   - Location info (both MK and NN) on the same page
   - Press / partnership / event hire mailto links

3. /allergens (src/app/(marketing)/allergens/page.tsx):
   - DoubledHeading "ALLERGENS"
   - Allergen table (14 UK statutory allergens × menu categories) — programmatically generated from menu data
   - Warning notice about cross-contamination
   - Contact link for specific queries
   - Static rendering

4. /faq (src/app/(marketing)/faq/page.tsx):
   - DoubledHeading "FAQ"
   - 10+ Q&A pairs in shadcn Accordion components covering: opening hours, ordering, delivery, allergens, halal status, vegan options, payment, loyalty programme, group bookings, locations
   - FAQPage JSON-LD with all questions and answers
   - Each answer is 2-4 sentences of useful, quotable content

All four routes have proper generateMetadata exports with title, description, canonical, OG, Twitter, schema.

Output the plan first.
```

---

## Phase F — Loyalty + Privacy + Terms

```
Build the three remaining pages. Read CLAUDE.md, docs/brand.md, docs/decisions.md.

Plan and build on branch feat/legal-loyalty:

1. /loyalty (src/app/(marketing)/loyalty/page.tsx):
   - DoubledHeading "FRIENDS WITH BENEFITS"
   - Big LoyaltySignupForm (RHF + Zod, calls /api/loyalty/signup — route built in Phase G, stub for now)
   - "What you get" section: early access to specials, birthday wings, first to know about new sauces, location-specific perks
   - "Coming soon" note about full loyalty app being built (sets expectations correctly)
   - Inline FAQ accordion for common loyalty questions

2. /privacy (src/app/(marketing)/privacy/page.tsx):
   - Solicitor-review banner at top (yellow, prominent, "This document is in draft and pending legal review")
   - noindex meta tag until reviewed (use robots: { index: false })
   - Standard UK GDPR-compliant privacy structure: data controller, what we collect, lawful basis, retention, rights, contact, cookies, third parties (Mailchimp, Supabase, Vercel, Deliverect, Toast)
   - Plain English, no legalese stacking

3. /terms (src/app/(marketing)/terms/page.tsx):
   - Same solicitor-review banner + noindex
   - Standard UK terms structure: parties, services, ordering (notes that ordering happens on third-party platforms), liability, governing law

Output the plan first.
```

---

## Phase G — SEO infrastructure + signup API + OG images

```
Wire the SEO infrastructure, build the signup API, and add OG images. Read CLAUDE.md §4 carefully — AI SEO requirements are non-negotiable.

Plan and build on branch feat/seo-and-signup:

1. SEO infrastructure:
   - src/lib/seo/structured-data.ts: one function per schema type — generateRestaurantSchema, generateLocalBusinessSchema, generateMenuSchema, generateFAQPageSchema, generateBreadcrumbListSchema, generateOrganizationSchema. Each returns the JSON-LD object ready to JSON.stringify.
   - src/lib/seo/metadata.ts: generateMetadataForRoute helper that takes route info and returns the Next.js Metadata object with title, description, canonical, OG, Twitter all correctly wired
   - Wire JSON-LD into every relevant page via <script type="application/ld+json" dangerouslySetInnerHTML> in the page component
   - Wire generateMetadata into every page

2. app/sitemap.ts — include every static route + dynamic /locations/[slug] routes
3. app/robots.ts — explicitly allow: Googlebot, Bingbot, GPTBot, Google-Extended, anthropic-ai, ClaudeBot, PerplexityBot, OAI-SearchBot, Applebot-Extended. Disallow /dev/.
4. public/llms.txt — pointer file following https://llmstxt.org/ spec with sections for About, Menu, Locations, FAQ, Contact

5. Static OG images:
   - Create 10 placeholder 1200×630 PNGs in public/og/ using a script: home.png, menu.png, locations.png, locations-mk.png, locations-nn.png, about.png, allergens.png, loyalty.png, contact.png, faq.png
   - Use sharp library to generate placeholders programmatically (pink/red backgrounds with white text). Real PNGs replace these post-launch via design.
   - Reference per-route in generateMetadata via openGraph.images and twitter.images

6. Signup API at src/app/api/loyalty/signup/route.ts:
   - POST handler with Zod validation (email, firstName?, preferredLocation?, marketingConsent: true required)
   - Dual-write: insert into Supabase loyalty_signups via service role client, then call Mailchimp API to add member to audience
   - Handle race conditions (email already exists in Supabase — return 200 idempotent)
   - Handle Mailchimp errors gracefully (log, return 200 — Supabase row is source of truth)
   - Stamp mailchimp_synced_at on success
   - Server-only client at src/lib/supabase/server.ts using SUPABASE_SERVICE_ROLE_KEY env var
   - Server-only Mailchimp wrapper at src/lib/mailchimp/client.ts

7. Contact API at src/app/api/contact/route.ts:
   - POST handler with Zod validation
   - For v1, just insert into a contact_submissions table in Supabase (same dual-table approach in Phase 2 will add Resend transactional email)

8. Supabase migration SQL (commit as docs/supabase-schema.sql for record):
   - loyalty_signups table per ADR-010
   - contact_submissions table (id, name, email, location?, message, created_at)
   - RLS enabled, no public policies

9. 404 page at src/app/not-found.tsx — branded, on-message, links back to /, /menu, /locations.

10. Favicons + apple-icon + manifest.json — minimal, using brand pink as theme color.

Output the plan first.
```

---

## Phase H — Content polish + accessibility audit + performance audit

```
Polish content, audit accessibility, audit performance. Read CLAUDE.md.

Plan and build on branch feat/content-polish:

1. Real copy pass — every page reviewed against docs/brand.md voice rules. Replace any placeholder Lorem or weak copy.

2. Real photo swap-in where available. Anything still placeholder gets a clear TODO comment + filename suggestion.

3. Accessibility audit:
   - All images have meaningful alt text (or alt="" for decorative)
   - Color contrast: every text/background combo passes WCAG AA (4.5:1 body, 3:1 large)
   - Focus states visible on every interactive element
   - Keyboard navigation works end-to-end on every page
   - Screen reader: NavBar, forms, sheets all have proper aria-labels and roles
   - Form errors announced via aria-live

4. Performance audit:
   - Lighthouse mobile score 90+ across Performance, Accessibility, Best Practices, SEO
   - Hero LCP under 2.5s
   - Images all use next/image with appropriate sizes prop
   - Only the hero image has priority; everything else lazy-loads
   - Bundle size check — flag anything over 100KB JS per route

5. Vercel Web Analytics enabled (one-line @vercel/analytics import)

Output the plan first. Post Lighthouse scores in the PR description.
```

---

## Reusable mid-build prompts

### When Claude Code starts hallucinating filenames
```
Stop. List the contents of the folder(s) you're about to reference using ls or view. Confirm the exact filenames. Do not assume.
```

### When Claude Code wants to install a dependency
```
Justify the new dependency. What does it do that the existing tree can't? Is there a smaller alternative? Reject if duplicative of Motion, shadcn/ui, or RHF+Zod.
```

### When Claude Code claims a phase is done
```
Post the Vercel preview URL. Do not run any finishing skill. I will visually verify and respond with "verified" or specific feedback.
```

### When you spot a duplicated data source
```
You have created or referenced a parallel locations-data.ts or menu-data.ts. CLAUDE.md §6 forbids this. The single source of truth is src/lib/locations/locations-data.ts (or src/lib/menu/menu-data.ts). Find and remove the duplicate, point all imports to the canonical file, and explain how the duplicate happened.
```

### When you need to write a new ADR
```
We're making an architectural decision that diverges from CLAUDE.md or supersedes an existing ADR. Draft a new ADR in docs/decisions.md following the format of the existing ones: number, date, status, context, decision, consequences. Append to the file, do not edit existing ADRs.
```

### When you want a fresh component
```
Build a new component called [Name] at src/components/[category]/[Name].tsx. It should: [behaviour]. Use existing brand tokens and conventions per CLAUDE.md §7. Add a variant to src/app/dev/components/page.tsx that exercises every prop combination. Do not wire it into any page yet.
```

### When you find an asset folder is empty
```
The folder public/brand/photos/[category]/ is empty. Either pause and request photos from me, OR proceed with a placeholder approach where you generate a coloured-background SVG placeholder with the category name overlaid. Tag every placeholder usage with a // TODO: replace placeholder comment so we can find them later. Tell me which choice you made and why.
```
