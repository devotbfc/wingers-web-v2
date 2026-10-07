# TODO — content

Content Benson still needs to supply. Each entry says what, where it slots in, and what shape of answer the site expects. Fill the matching cell in `Wingers-FLAVOUR-STORIES.xlsx` (or the noted source), rerun the data generator, and the site picks it up.

## Dip blurbs — `/flavour-lab` DIPS section

The `DipsSection` tile only becomes a tap-to-expand disclosure when `Dip.shortDescription` is non-null. Until then the tile renders as a plain name card. The pairing link on the wheel result ("PAIR IT WITH: <dip>") still deep-links to the tile and smooth-scrolls, but it will not auto-open an empty blurb.

One or two sentences per dip. Match the voice of the sauce `shortDescription` lines already in `FLAVOURS` — sensory, direct, no apologies.

Source: `Wingers-FLAVOUR-STORIES.xlsx` → `dips` tab → `shortDescription` column.

- [ ] Blue Cheese (`slug: blue-cheese`)
- [ ] Ranch (`slug: ranch`)
- [ ] California Sauce / Mayo (`slug: california-sauce-mayo`)
- [ ] Honey Mustard (`slug: honey-mustard`)

## Franchise — `/franchise`

- [ ] **Confirm the sister franchise brand is halal before publish.** The halal FAQ answer on `/franchise` carries `data-todo="content"` on the `<details>` element and currently reads "Yes — halal is core to how we cook." Benson to confirm halal status for the sister brand, then remove the `data-todo` attribute from `src/app/franchise/faq-data.ts` (set `todo: false` or delete the field).
- [ ] **Confirm the sister brand uses the same brine/dredge/fry process before publish.** The "What we do" tiles on `/franchise` are marked with `data-todo="content"` on the `<ul>` element. Tiles describe the Wingers process verbatim; adjust copy or confirm, then remove the `data-todo` attribute from `src/app/franchise/page.tsx`.
- [ ] **Batch F2: email notification after Cloudflare DNS cutover.** `/franchise` enquiries currently write to Supabase only. Post-cutover, add transactional email to `hi@wingers.co` on each insert (Resend from the server action, or Supabase DB webhook → Vercel route). DNS records (SPF/DKIM/DMARC on `mail.wingers.co`) must land in Cloudflare before enabling.

## Missing prices — Benson to supply

Items where `getPriceValue(item, code)` resolves to `null` for one or both shops in `src/lib/menu/menu-data.ts` (snapshot taken 2026-10-07 on fix/ui-refine). These render today — several with no visible price — because `/menu` currently only hides items whose `unavailableAt` matches the selected shop. Fill the matching cell in `Wingers-MENU-MASTER.xlsx` for each row, regenerate `menu-data.ts`, and the price label appears.

Two items are explicitly flagged `hideUntilPriced: true` in `menu-data.ts` and will not render until priced (see Batch I, R1-C9). They stay in the list below so they're not forgotten.

### Hidden on Milton Keynes (15)
- [ ] Flying Solo (no sauce) — Platters + Combos
- [ ] Riding Solo (no sauce) — Platters + Combos
- [ ] Churros (no sauce / crumb) — Churros
- [ ] Cookies N Cream — Churros
- [ ] Oreo Crumb — Churros
- [ ] Lotus Biscoff / Crumb — Churros
- [ ] Chocolate Hazelnut — Churros
- [ ] Salted Caramel — Churros
- [ ] Double OG Smash Burger — Beef Burgers *(unavailableAt=MK)*
- [ ] Double OG Bacon Smash Burger — Beef Burgers *(unavailableAt=MK; **hideUntilPriced**)*
- [ ] The Disciple — Beef Burgers *(unavailableAt=MK)*
- [ ] Triple OG Smash Burger — Beef Burgers *(unavailableAt=MK)*
- [ ] Triple OG Bacon Smash Burger — Beef Burgers *(unavailableAt=MK; **hideUntilPriced**)*
- [ ] Beef Loaded Fries — Beef Burgers *(unavailableAt=MK)*
- [ ] New Dawn — Beef Burgers *(unavailableAt=MK)*

### Hidden on Northampton (24)
- [ ] Mozzarella Triangles (V) — Sides
- [ ] Memphis Slaw (V) — Sides
- [ ] Winger Roulette (no sauce) — Platters + Combos
- [ ] Blue Cheese — Dips
- [ ] Ranch — Dips
- [ ] California Sauce / Mayo — Dips
- [ ] Honey Mustard — Dips
- [ ] Kinder Bueno / White Chocolate — Shakes
- [ ] Chocolate Oreo — Shakes
- [ ] Banana — Shakes
- [ ] Strawberry — Shakes
- [ ] Lotus Biscoff — Shakes
- [ ] Double Chocolate — Shakes
- [ ] Limited Edition Cookies N Cream — Shakes
- [ ] Limited Edition (Salted Caramel) — Shakes
- [ ] Churros (no sauce / crumb) — Churros
- [ ] Cookies N Cream — Churros
- [ ] Oreo Crumb — Churros
- [ ] Lotus Biscoff / Crumb — Churros
- [ ] Chocolate Hazelnut — Churros
- [ ] Salted Caramel — Churros
- [ ] Double OG Bacon Smash Burger — Beef Burgers *(unavailableAt=MK; **hideUntilPriced**)*
- [ ] Triple OG Bacon Smash Burger — Beef Burgers *(unavailableAt=MK; **hideUntilPriced**)*
- [ ] New Dawn — Beef Burgers *(unavailableAt=MK)*
