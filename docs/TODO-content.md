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
