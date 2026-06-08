# Migration Guide — `docs/migration-guide.md`

> Tracks the path from current WordPress site at `wingers.co` to the new Next.js site. Used for 301 redirects, content mapping, and pre-cutover checklist.

---

## 1. Current state (WordPress)

| URL | Content | Migrate to |
|---|---|---|
| `wingers.co/` | Home (WP Bakery template) | `/` |
| `wingers.co/menu/` | Menu | `/menu` |
| `wingers.co/locations/` | Locations index | `/locations` |
| `wingers.co/milton-keynes/` | MK location | `/locations/milton-keynes` |
| `wingers.co/northampton/` | NN location | `/locations/northampton` |
| `wingers.co/about/` | About | `/about` |
| `wingers.co/contact/` | Contact | `/contact` |
| `wingers.co/order-online/` | Old order page | `/menu` (with location switcher) |
| `wingers.co/blog/*` | Blog posts (if any) | Post-launch migration |

---

## 2. 301 redirect map (set BEFORE DNS cutover)

Add to `next.config.ts` `redirects()`:

```ts
async redirects() {
  return [
    { source: '/order-online', destination: '/menu', permanent: true },
    { source: '/milton-keynes', destination: '/locations/milton-keynes', permanent: true },
    { source: '/northampton', destination: '/locations/northampton', permanent: true },
    // Add legacy blog/news URLs here as discovered
  ]
}
```

After cutover, monitor Vercel logs for 404s — any frequent ones get added as redirects.

---

## 3. Pre-cutover checklist

### DNS
- [ ] Vercel domain added: `wingers.co` and `www.wingers.co`
- [ ] A record + CNAME ready to swap at registrar (Cloudflare? GoDaddy? — check ownership)
- [ ] TTL lowered to 300s 24h before cutover
- [ ] WordPress site backup taken
- [ ] WordPress admin credentials documented (for emergency rollback)

### Vercel env vars
- [ ] `NEXT_PUBLIC_APP_URL` set to `https://wingers.co` (NOT the Vercel preview URL)
- [ ] All Supabase keys set
- [ ] All Mailchimp keys set
- [ ] Test deployment with production env vars on a preview URL first

### Content
- [ ] All placeholder photos replaced (search for `// TODO: replace placeholder`)
- [ ] All placeholder copy replaced (`Lorem`, `TODO`, `placeholder`, `xxx`)
- [ ] Solicitor-reviewed `/privacy` and `/terms` — `robots: { index: false }` removed
- [ ] All location data accurate (opening hours, phone, address verified)
- [ ] All menu data accurate (prices, allergens, dietary tags)
- [ ] All OG images replaced with real designed PNGs

### SEO
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] `robots.txt` accessible and includes LLM bot allowlist
- [ ] `llms.txt` accessible at root
- [ ] Google Search Console verified for new property
- [ ] Bing Webmaster Tools verified
- [ ] Submit sitemap to GSC + BWT
- [ ] Test JSON-LD validity with https://search.google.com/test/rich-results on every page

### Forms
- [ ] Loyalty signup tested end-to-end (signup → Supabase row → Mailchimp member added)
- [ ] Contact form tested end-to-end
- [ ] Email notifications working (Phase 2 — Resend wired)

### Order flows
- [ ] MK Deliverect URL tested — opens correct location
- [ ] NN Toast URL tested — opens correct location
- [ ] Location picker sheet works on mobile and desktop

### Performance
- [ ] Lighthouse mobile: Performance 90+, Accessibility 95+, SEO 100, Best Practices 95+
- [ ] LCP under 2.5s on 4G simulation
- [ ] All images served as WebP/AVIF via `next/image`

### Social previews
- [ ] Test link share preview in WhatsApp, iMessage, Twitter, LinkedIn for at least 3 routes
- [ ] OG images render correctly in https://www.opengraph.xyz/

---

## 4. Cutover sequence

1. **T-24h**: Lower DNS TTL to 300s on existing `wingers.co` records
2. **T-2h**: Final smoke test on Vercel preview URL with production env vars
3. **T-1h**: Take WordPress backup, screenshot key pages
4. **T-0**: Update DNS at registrar — A record → Vercel's IP, CNAME `www` → `cname.vercel-dns.com`
5. **T+5min**: Verify propagation via https://www.whatsmydns.net
6. **T+15min**: Confirm SSL cert provisioned by Vercel
7. **T+30min**: Full smoke test on production `wingers.co`
8. **T+1h**: Submit fresh sitemap to GSC + BWT
9. **T+24h**: Monitor 404s in Vercel logs, add redirects as needed

---

## 5. Post-cutover rollback plan

If anything breaks badly:

1. Revert DNS to WordPress IP (note this requires registrar access — keep credentials handy)
2. Wait for propagation (now fast because of low TTL)
3. WordPress site is unchanged and continues to work
4. Debug on Vercel preview URL with no time pressure
5. Re-attempt cutover once fixed

---

## 6. Old WordPress site decommission

After cutover is stable for 30 days:

1. Keep WordPress backup permanently (cold storage)
2. Disable WordPress hosting subscription if separate
3. Remove WordPress plugin/license subscriptions
4. Document final cutover date in this file for audit trail

---

## 7. Trademark watch

The competitor at `wingers.uk.net` was flagged in the previous build for solicitor review. Status: **pending** as of Day 0 of this rebuild. Do not pursue brand expansion in markets where they operate until resolved.
