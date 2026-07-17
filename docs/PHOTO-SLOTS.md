# Photo slot map — P01…P26

Shot list for Wingers. Every numbered placeholder visible on the live preview
corresponds to one row here. Files live temporarily at
`public/brand/photos/placeholders/P##.png`. When a real photo lands, name it
`P##.png` at the same path and it takes over automatically. Later pass moves
files to a permanent home and swaps the `src=` in code.

Every slot in code carries `data-photo-slot="P##"` so you can grep them:

```
rg 'data-photo-slot="P' src/
```

Slots P27–P40 are held in reserve for follow-up (galleries, seasonal drops,
extra angles) — free to allocate as new needs surface.

## Non-menu slots

| P## | Page | Component | What to shoot |
|---|---|---|---|
| P01 | `/` | `SaucePanel` (`src/components/sections/home-v2/SaucePanel.tsx`) | Sauce-drenched close-up — pouring or dripping, saturated red, hard-cropped rectangle. Fills the right 2/3 (desktop) or bottom 2/3 (mobile). |
| P02 | `/` | `TwoSpots` MK block (`src/components/sections/home-v2/TwoSpots.tsx`) | Milton Keynes shopfront or hero interior. 4:3 mobile, full-height desktop split. Confident wide shot, no people in focus. |
| P03 | `/` | `TwoSpots` Northampton block | Northampton shopfront or hero interior. Same treatment as P02. |
| P04 | `/about` | Stage 01 BRINE (`src/app/about/page.tsx`) | Hands submerging raw chicken in the buttermilk brine bath — process shot. 4:3 mobile, 21:9 desktop. |
| P05 | `/about` | Stage 02 DREDGE | Chicken being hand-tossed in seasoned flour — craggy crust forming. Same aspects as P04. |
| P06 | `/about` | Stage 03 FRY | Pieces dropping into hot oil, action + steam. Same aspects as P04. |
| P07 | `/about` | Team closer (`src/app/about/page.tsx`) | Team behind the fry counter, low light, in motion. Full-bleed (`min-h-[70svh]`) with the "THAT'S IT." headline sitting on top — leave dark headroom top + centre for text contrast. |
| P08 | `/flavour-lab` | `SauceEdgeAccent` on `SpinTheWheel` | Sauce close-up (glossy, dripping) with strong diagonal energy — the clip-path shows only the top-right sliver. Desktop-only decoration, ≥sm. |
| P09 | `/locations` | MK card (`src/components/locations/LocationCard.tsx`) | Milton Keynes shopfront at 4:3. Shop badge overlays top-left, so keep top-left uncluttered. |
| P10 | `/locations` | Northampton card | Northampton shopfront at 3:4 (portrait). Same badge caveat. |
| P11 | `/locations/milton-keynes` | Detail hero (`src/app/locations/[slug]/page.tsx`) | MK shopfront at dusk, neon on, wide crop. Full-bleed (`min-h-[78dvh]`). Dark scrim overlays, so any photo works — content pins to bottom-left. |
| P12 | `/locations/northampton` | Detail hero | Northampton shopfront at dusk, neon on, wide crop. Same treatment as P11. |

## Menu — one photo per section (14 slots)

Every menu card of a section will show its section placeholder at ~35% opacity
over the coloured tile with the item name still legible. Shoot one hero photo
per section — later passes can add per-item photos as `item.photo` on the data
in `src/lib/menu/menu-data.ts`.

| P## | Section | What to shoot |
|---|---|---|
| P13 | Wings + Boneless + Tenders | A single flavour of wings — top-down, glossy sauce, dark background. Square. |
| P14 | Chicken Burgers | One signature chicken burger, three-quarter view, held or on paper. Square. |
| P15 | Beef Burgers | One signature beef burger, three-quarter view, molten cheese. Square. |
| P16 | Fries + Loaded Fries | A pile of fries, oblique overhead, salt visible. Square. |
| P17 | Chicken Loaded Fries | Fries loaded with chicken and sauce, straight-on. Square. |
| P18 | Mac & Cheese | Cheese pull shot on mac. Square. |
| P19 | Sides | Coleslaw / gravy / pot — one hero side. Square. |
| P20 | Platters + Combos | A shareable platter, overhead, showing spread. Square. |
| P21 | Dips | Rows of dip pots, overhead. Square. |
| P22 | Shakes | One shake in the branded cup, side-lit. Square. |
| P23 | Churros | Churros stack, dust of sugar, chocolate dip. Square. |
| P24 | NYC Cookies | One cookie broken in half, gooey centre. Square. |
| P25 | Coolers | Cold drink cup, condensation. Square. |
| P26 | Kids | Kids meal box or spread, playful. Square. |

## OG images — filenames Benson supplies to `public/og/`

Metadata in each `page.tsx` already references these files. Drop the PNGs in
`public/og/` and they light up automatically.

- `default.png` — fallback for any route without an explicit OG (layout-level)
- `home.png` — `/`
- `menu.png` — `/menu`
- `about.png` — `/about`
- `flavour-lab.png` — `/flavour-lab`
- `contact.png` — `/contact`
- `loyalty.png` — `/loyalty`
- `allergies.png` — `/allergies`
- `locations.png` — `/locations`
- `milton-keynes.png` — `/locations/milton-keynes`
- `northampton.png` — `/locations/northampton`

All 1200×630, under 1MB each.

## Icons

`src/app/icon.png` + `src/app/apple-icon.png` are picked up by Next.js file
convention (the manual `icons` override in `layout.tsx` was removed so it stops
looking for them in `public/`). `src/app/favicon.ico` already ships.
