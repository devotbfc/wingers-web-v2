# Wingers Brand — `docs/brand.md`

> Single source of truth for voice, colour, typography, photography, and motion. Claude Code reads this before writing any UI copy or styling decision.

---

## 1. Voice

### Tagline
**Dip It. Bite It. Love It.**

### Promise
Future of Flavours.

### Signature phrases (use, don't paraphrase)
- "Dip It. Bite It. Love It." — brand mark phrase
- "Best wings in the game" — confidence headline
- "Get stuck in" / "Dip in" — primary CTA
- "Become a Winger" — loyalty programme
- "Friends with Benefits" — email subscribers
- "You're in." — confirmation message

### Voice rules
- **Confident**, not boastful. State facts, don't oversell.
- **Direct**. Cut filler ("we hope you enjoy", "feel free to").
- **Sensory**. Talk about crunch, heat, drip, sizzle, char.
- **British**. UK spelling (flavour, colour, savoury), UK references (takeaway, postcode, queue, mate).
- **No corny puns.** "Wingin' it" is banned. "Wing-credible" is banned.
- **No emoji in product copy.** Emoji are fine in transactional UI microcopy (loyalty stamp counters, etc.) but never in headlines, body copy, or descriptions.
- **No apologies.** "Sorry for any inconvenience" is banned. State the situation, state the next step.
- **ALL CAPS** only in headlines and brand lockups, never in body copy.

### Tone by context
| Context | Tone |
|---|---|
| Hero headlines | Bold, declarative, short |
| Product descriptions | Sensory, specific, ≤20 words per item |
| Loyalty signup | Inviting, low-friction, hint at reward |
| Errors / empty states | Direct, slightly cheeky, solution-led |
| Legal / privacy | Plain English, no legalese on top of legalese |
| Social CTAs | Punchy, action verb leading |

### Copy don'ts
- "We're passionate about..." (everyone is)
- "Crafted with care" (cliché)
- "Locally sourced" unless we can name the source
- "Award-winning" unless we won something specific and can name it
- "Family recipe" unless it's actually a family recipe
- Any phrase that could appear on a Sainsbury's gastropub menu

---

## 2. Palette

### Primary
| Role | Name | Hex | Tailwind |
|---|---|---|---|
| Primary 1 | Hot Pink | `#FF6FB5` | `brand-pink` |
| Primary 2 | Sauce Red | `#FF2D2D` | `brand-red` |
| Neutral dark | Black | `#000000` | `brand-black` |
| Neutral light | White | `#FFFFFF` | `brand-white` |

### Tailwind v4 setup
In `src/styles/globals.css`:
```css
@import "tailwindcss";

@theme {
  --color-brand-pink: #FF6FB5;
  --color-brand-red: #FF2D2D;
  --color-brand-black: #000000;
  --color-brand-white: #FFFFFF;

  --font-display: "Bricolage Grotesque", system-ui, sans-serif;
  --font-body: "Inter", system-ui, sans-serif;

  --tracking-display: -0.03em;
}
```

### Base system — white-primary
White is the default page background. Black is the default text colour. Energy comes from oversized pink (`#FF6FB5`) blocks, red (`#FF2D2D`) type, and food photography sitting on a white canvas.

Black-canvas sections are **explicit and reserved** — opt in via the `.section-dark` utility (defined in `src/styles/globals.css`). Only these sections are dark:

- **Hero** — the home-page hero loop and any equivalent page-opening hero
- **CTA strips** — full-width "Order now / Find us" bands between sections
- **Footer** — site-wide footer

Everything else (menu, locations, about, FAQ, body content, cards) sits on white with black text. Dark sections are the punctuation, not the page.

### Combinations
- **Black on white** — the default base. All body copy, menu items, location info, FAQs, and standard sections.
- **Pink on red** and **red on pink** — signature high-impact pairings. Used for marquees, doubled headlines, and CTA strip type.
- **Red on white** — section accent type, oversized headlines on white sections.
- **Pink on black** — premium feel inside dark sections (hero, CTA strip, footer) for menu spotlights and headline fills.
- **White on black** — base inside `.section-dark` (hero / CTA / footer).
- **White on red** — bold full-bleed section breaks between white-bg sections.

### Bans
- No gradients (with the rare exception of subtle radial pink → red glows behind hero photos)
- No muddy mid-tones (purples, browns, terracotta — all banned)
- No off-white / cream / beige
- No drop shadows on type (use doubled-headline pseudo-element instead)

### Divergence from brand book
Brand book (by aanu) specifies pink + ultramarine blue `#2123e0`. Website diverges deliberately to pink + sauce red because red better evokes wings, sauce, and heat. Documented in `docs/decisions.md` ADR-006. Brand book will be updated when other materials are revised.

---

## 3. Typography

### Fonts
| Use | Font | Weights | Tracking | Line height |
|---|---|---|---|---|
| Display | Bricolage Grotesque | 800, 700, 500 | -0.02 to -0.04em | 0.95 |
| Body | Inter | 400, 500, 600 | normal | 1.5 |

Both are on Google Fonts. Load via `next/font/google` in the root layout.

### Scale (Tailwind classes)
| Token | Use | Class |
|---|---|---|
| Display XL | Hero headlines | `text-[clamp(3rem,10vw,8rem)] font-display font-extrabold leading-[0.95] tracking-tight` |
| Display L | Section headlines | `text-[clamp(2.5rem,7vw,5rem)] font-display font-extrabold leading-[0.95]` |
| Display M | Card titles | `text-[clamp(1.75rem,4vw,3rem)] font-display font-bold leading-tight` |
| Body L | Hero subhead | `text-lg md:text-xl font-body leading-relaxed` |
| Body M | Default | `text-base font-body leading-relaxed` |
| Body S | Captions | `text-sm font-body leading-normal` |
| Mono | Tags, codes | `text-sm font-mono uppercase tracking-widest` |

### Doubled-headline pattern (signature)
Used on hero and section headlines for impact. Implemented in `<DoubledHeading>` via CSS pseudo-element:
```tsx
<DoubledHeading
  text="DIP IT. BITE IT. LOVE IT."
  offsetEm="0.08"
  fillColor="brand-pink"
  shadowColor="brand-red"
/>
```
The shadow text is created with `::before` content from `data-text` attribute, offset in `em` units (never px) so it scales with the font.

---

## 4. Photography

### What looks like Wingers
- Saturated, slightly contrasty
- Tight crops on the food (sauce visible, drip captured)
- Backgrounds: brand pink, brand red, or moody black
- Cutouts (transparent PNGs) for product cards with single items
- Full-frame shots for hero, lifestyle, and behind-the-scenes
- Hands in shots are fine (dipping, holding, biting) — adds energy
- Skin tones must look natural; warm tint, not orange

### What doesn't look like Wingers
- Beige / brown wooden tables, rustic plates, sprigs of garnish
- Soft natural light food photography (Instagram trad)
- Black-and-white anything
- Crowds, parties, "atmosphere" shots without food

### Folder structure
```
public/brand/photos/
├── hero/                  # Full-frame, 1920×1080 or 1600×2000
├── wings/                 # Product cutouts + full frame
├── tenders/
├── burgers/
├── sides/
├── sauces/
├── lifestyle/             # Customers, hands, eating moments
├── behind-scenes/         # Kitchen, prep, team
└── locations/
    ├── milton-keynes/
    └── northampton/
```

### Compression
- Drop original PNG/JPG into the appropriate folder
- If a file is over **2MB**, run it through https://tinypng.com (free, no signup, browser-based, 20 files at once) before committing
- `next/image` handles WebP/AVIF conversion and responsive sizing at runtime — no further work needed
- Hero shots: aim for under 800KB after TinyPNG
- Menu items: aim for under 400KB after TinyPNG
- Lifestyle: aim for under 300KB after TinyPNG

### Variety
The lifestyle masonry grid needs **at least 6 distinct photos**. One photo repeated 12× looks bad. If only one is available at build time, ship with a TODO comment and 6 different placeholder photos in the meantime.

---

## 5. Video

### Use
- Hero loop on home page (auto-playing, muted, looped, with poster fallback)
- Per-category VideoCard hover state on Wings / Tenders / Burgers cards
- Subtle ambient loops on location pages (optional, only if performant)

### Source files
- Stored in `videos/source/` (OUTSIDE `public/`, never served)
- Original 4K or 1080p, with audio

### Compressed for web
- Run through HandBrake: **1080p, H.264, RF 24, NO audio, "Web Optimized" flag enabled**
- Target: 3–5MB per loop, max 10s duration
- Output to `public/brand/videos/`
- Naming: `hero-loop.mp4`, `wings-loop.mp4`, `tenders-loop.mp4`, `burgers-loop.mp4`

### Implementation rules
- Poster image always set (`<video poster="...">`) so non-loaded video doesn't show black box
- `playsInline` + `muted` + `autoPlay` + `loop` attributes for hero
- `prefers-reduced-motion` respected — pause if user prefers reduced motion
- `loading="lazy"` on category videos (only hero is eager)

---

## 6. Motion

### Library
**Motion** (the modern fork of Framer Motion). No GSAP.

### Patterns
- **Scroll reveal**: `whileInView={{ opacity: 1, y: 0 }}` with `viewport={{ once: true, margin: "-100px" }}`
- **Hover lift**: `whileHover={{ y: -4 }}` with `transition={{ type: "spring", stiffness: 300 }}`
- **Marquee**: pure CSS `@keyframes` — no JS, 60s loop, `prefers-reduced-motion` pauses
- **Page transitions**: subtle fade-up on route change via `<AnimatePresence>`

### Restraint
- No bouncy spring on hero text (looks corny)
- No parallax that jitters on mobile
- Never animate `width`, `height`, `top`, `left` — only `transform` and `opacity`
- All animation respects `prefers-reduced-motion` via `MotionConfig` at root

---

## 7. Logo and pattern

### Logo
- Winged-W mark with WINGERS wordmark arched below
- Variants: pink, red, white, black
- Both full lockup and logomark-only versions
- Files: `public/brand/logo/`
- Implemented in `<BrandLogo variant="pink" type="lockup" />`

### Repeating pattern
- Food icons: wings, burger, cheese, chilli, chicken, drumstick
- Files: `public/brand/pattern/`
- Used as decorative background on section breaks, never under text

---

## 8. Aesthetic references (for design decisions, not direct copying)

| Reference | What we take |
|---|---|
| Joe & The Juice | Wordmark-led typography, refined confidence |
| Wingstop | Sauce-as-hero, urban energy |
| MSCHF / Liquid Death | Pink-red colour confidence, irreverent voice |
| wingers.uk.net (competitor) | Patterns to study: video product cards, doubled headlines, oversized repeating CTAs, slide-up order panel |

Note: wingers.uk.net is an unrelated franchise with a trademark concern flagged for solicitor review. We study patterns, we don't copy assets or copy.
