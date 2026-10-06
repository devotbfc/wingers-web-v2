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
