# Master Registry — `docs/master-registry.md`

> Living index of every route, component, env var, and data file in the repo. Update after each phase. Keeps Claude Code aware of what already exists so it doesn't accidentally duplicate.

Last updated: **2026-06-09 (Phase 0 complete)**

---

## 1. Routes

### Public (marketing)
| Path | File | Status | Schema | OG image | Notes |
|---|---|---|---|---|---|
| `/` | `src/app/(marketing)/page.tsx` | TODO | Restaurant + Organization | `/og/home.png` | Homepage |
| `/menu` | `src/app/(marketing)/menu/page.tsx` | TODO | Menu | `/og/menu.png` | Full menu |
| `/locations` | `src/app/(marketing)/locations/page.tsx` | TODO | ItemList of LocalBusiness | `/og/locations.png` | Locations index |
| `/locations/milton-keynes` | `src/app/(marketing)/locations/[slug]/page.tsx` | TODO | Restaurant + LocalBusiness | `/og/locations-mk.png` | MK location detail |
| `/locations/northampton` | (same dynamic) | TODO | Restaurant + LocalBusiness | `/og/locations-nn.png` | NN location detail |
| `/about` | `src/app/(marketing)/about/page.tsx` | TODO | AboutPage + Organization | `/og/about.png` | About story |
| `/allergens` | `src/app/(marketing)/allergens/page.tsx` | TODO | — | `/og/allergens.png` | Allergen info |
| `/loyalty` | `src/app/(marketing)/loyalty/page.tsx` | TODO | — | `/og/loyalty.png` | Friends with Benefits |
| `/contact` | `src/app/(marketing)/contact/page.tsx` | TODO | — | `/og/contact.png` | Contact form |
| `/faq` | `src/app/(marketing)/faq/page.tsx` | TODO | FAQPage | `/og/faq.png` | 10+ Q&A pairs |
| `/privacy` | `src/app/(marketing)/privacy/page.tsx` | TODO | — | `/og/privacy.png` | Solicitor review banner |
| `/terms` | `src/app/(marketing)/terms/page.tsx` | TODO | — | `/og/terms.png` | Solicitor review banner |
| `/not-found.tsx` | `src/app/not-found.tsx` | TODO | — | `/og/home.png` | Branded 404 |

### API
| Path | File | Method | Status | Notes |
|---|---|---|---|---|
| `/api/loyalty/signup` | `src/app/api/loyalty/signup/route.ts` | POST | TODO | Dual-write Supabase + Mailchimp |
| `/api/contact` | `src/app/api/contact/route.ts` | POST | TODO | Form → email/storage |

### SEO infrastructure
| Path | File | Status |
|---|---|---|
| `/sitemap.xml` | `src/app/sitemap.ts` | TODO |
| `/robots.txt` | `src/app/robots.ts` | TODO |
| `/llms.txt` | `public/llms.txt` | TODO |

### Dev-only
| Path | File | Status | Notes |
|---|---|---|---|
| `/dev/components` | `src/app/dev/components/page.tsx` | TODO | Visual test page for brand components |

---

## 2. Components

### Brand (`src/components/brand/`)
| Component | Status | Variants | Notes |
|---|---|---|---|
| `BrandLogo` | TODO | pink, red, white, black × lockup, mark | |
| `BrandButton` | TODO | primary, secondary, ghost | Sizes sm/md/lg |
| `BrandPattern` | TODO | tile, banner | Repeating food icons |
| `MarqueeLockup` | TODO | — | CSS-only marquee, 60s loop |

### Typography (`src/components/typography/`)
| Component | Status | Notes |
|---|---|---|
| `DoubledHeading` | TODO | Pseudo-element shadow, em-based offset |
| `DoubledCTAStrip` | TODO | Section break with 4 oversized CTAs |

### Media (`src/components/media/`)
| Component | Status | Notes |
|---|---|---|
| `VideoCard` | TODO | Video + image fallback, hover state |
| `VideoHero` | TODO | Autoplay loop, poster fallback, reduced-motion |
| `ImageCarousel` | TODO | Pure CSS scroll-snap |
| `ScrollReveal` | TODO | Motion whileInView wrapper |
| `HoverImage` | TODO | Crossfade between two images |

### Sections (`src/components/sections/`)
| Component | Status | Notes |
|---|---|---|
| `NavBar` | TODO | Sticky, transparent → solid on scroll |
| `Footer` | TODO | Brand wordmark base, link columns |
| `HeroSection` | TODO | VideoHero + DoubledHeading + dual CTA |
| `CategoryGrid` | TODO | 3 VideoCards: Wings / Tenders / Burgers |
| `FlavourStory` | TODO | Huge headline + sauce carousel |
| `BehindScenesSection` | TODO | ImageCarousel of kitchen shots |
| `LocationsSection` | TODO | Live open/closed badges, MK + NN cards |
| `TestimonialsSection` | TODO | Carousel, 4 placeholder reviews |
| `LifestyleSection` | TODO | Masonry grid of customer photos |
| `LoyaltySignupSection` | TODO | Email signup with consent + location pref |
| `BigCTAStrip` | TODO | Doubled CTAs: MENU / LOCATIONS / WINGER / CONTACT |

### Forms (`src/components/forms/`)
| Component | Status | Notes |
|---|---|---|
| `LoyaltySignupForm` | TODO | RHF + Zod, calls /api/loyalty/signup |
| `ContactForm` | TODO | RHF + Zod, calls /api/contact |
| `LocationOpenBadge` | TODO | Live open/closed based on opening hours |

### UI (shadcn primitives, add as needed)
| Primitive | Status |
|---|---|
| `Button` | TODO |
| `Input` | TODO |
| `Textarea` | TODO |
| `Checkbox` | TODO |
| `Sheet` (slide-up panel) | TODO |
| `Accordion` (FAQ) | TODO |
| `Sonner` (toast) | TODO |

---

## 3. Library modules

### `src/lib/locations/`
| File | Status | Notes |
|---|---|---|
| `types.ts` | ✓ Phase 0 | `Location`, `OrderProviderName`, `OpeningHours*`, `LocationAddress`, `LocationGeo` interfaces |
| `locations-data.ts` | TODO | Two records: MK + NN |
| `index.ts` | TODO | Barrel + `getLocationBySlug()` |

### `src/lib/menu/`
| File | Status | Notes |
|---|---|---|
| `types.ts` | ✓ Phase 0 | `MenuCategory`, `MenuItem` interfaces |
| `menu-data.ts` | TODO | Categories: wings, tenders, burgers, sides, sauces, drinks |
| `index.ts` | TODO | Barrel + helpers |

### `src/lib/order/`
| File | Status | Notes |
|---|---|---|
| `types.ts` | ✓ Phase 0 | `OrderProvider` interface |
| `providers/deliverect.ts` | TODO | MK |
| `providers/toast.ts` | TODO | NN |
| `providers/pushpull-hub.ts` | TODO | Stub for future |
| `providers/index.ts` | TODO | `getProviderForLocation()` |

### `src/lib/seo/`
| File | Status | Notes |
|---|---|---|
| `structured-data.ts` | TODO | JSON-LD generators per schema |
| `metadata.ts` | TODO | `generateMetadata` helpers |

### `src/lib/supabase/`
| File | Status | Notes |
|---|---|---|
| `client.ts` | TODO | Browser anon client (Phase 2 use) |
| `server.ts` | TODO | Server client with service role |

### `src/lib/mailchimp/`
| File | Status | Notes |
|---|---|---|
| `client.ts` | TODO | Server-only API wrapper |

---

## 4. Environment variables

### Public (browser-visible, `NEXT_PUBLIC_*`)
| Var | Status | Notes |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | TODO | Initially Vercel URL, cutover to wingers.co later |
| `NEXT_PUBLIC_SUPABASE_URL` | TODO | EU project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | TODO | Phase 2 use |

### Server-only
| Var | Status | Notes |
|---|---|---|
| `SUPABASE_SERVICE_ROLE_KEY` | TODO | Server-only, full DB access |
| `MAILCHIMP_API_KEY` | TODO | Server-only |
| `MAILCHIMP_AUDIENCE_ID` | TODO | The "Friends with Benefits" audience |
| `MAILCHIMP_SERVER_PREFIX` | TODO | e.g. `us12`, `eu1` — derived from API key |

### Optional (Phase 2)
| Var | Status | Notes |
|---|---|---|
| `NEXT_PUBLIC_POSTHOG_KEY` | Phase 2 | EU instance |
| `NEXT_PUBLIC_POSTHOG_HOST` | Phase 2 | `https://eu.i.posthog.com` |
| `SENTRY_DSN` | Phase 2 | |
| `RESEND_API_KEY` | Phase 2 | Transactional email |

All vars must be in `.env.example` (committed) with placeholder values + comments. Real values live in `.env.local` (gitignored) and Vercel env panel.

---

## 5. Public asset paths

| Path | Status | Notes |
|---|---|---|
| `public/brand/logo/` | TODO | Logo SVGs and PNGs |
| `public/brand/pattern/` | TODO | Repeating food icons |
| `public/brand/photos/hero/` | TODO | Hero shots |
| `public/brand/photos/wings/` | TODO | Wings photos |
| `public/brand/photos/tenders/` | TODO | |
| `public/brand/photos/burgers/` | TODO | |
| `public/brand/photos/sides/` | TODO | |
| `public/brand/photos/sauces/` | TODO | |
| `public/brand/photos/lifestyle/` | TODO | At least 6 distinct |
| `public/brand/photos/behind-scenes/` | TODO | Kitchen, prep |
| `public/brand/photos/locations/milton-keynes/` | TODO | |
| `public/brand/photos/locations/northampton/` | TODO | |
| `public/brand/videos/hero-loop.mp4` | TODO | <5MB |
| `public/brand/videos/wings-loop.mp4` | TODO | |
| `public/brand/videos/tenders-loop.mp4` | TODO | |
| `public/brand/videos/burgers-loop.mp4` | TODO | |
| `public/og/*.png` | TODO | 10 static OG images |
| `public/favicon.ico` | TODO | + apple-icon, manifest |
| `public/llms.txt` | TODO | LLM crawler pointer |

---

## 6. Phase tracking

| Phase | Branch | PR | Merged | Verified |
|---|---|---|---|---|
| 0 — Setup | `main` | — | ✓ | Pending Benson visual verify |
| A — Brand foundation | `feat/brand-foundation` | — | — | — |
| B — Homepage | `feat/homepage` | — | — | — |
| C — Menu | `feat/menu` | — | — | — |
| D — Locations | `feat/locations` | — | — | — |
| E — About/Contact/Allergens/FAQ | `feat/info-pages` | — | — | — |
| F — Loyalty/Privacy/Terms | `feat/legal-loyalty` | — | — | — |
| G — SEO + signup API + OG | `feat/seo-and-signup` | — | — | — |
| H — Content polish + audits | `feat/content-polish` | — | — | — |
| I — Launch | `main` | — | — | — |
