# Web ordering parity (wing-app ↔ wingers-web-v2)

This doc maps each wing-app screen/component onto its web-v2 counterpart in the
new `/order/*` routes. The web flow lives behind
`NEXT_PUBLIC_ORDERING_MODE=pph` and must behave identically to the mobile app
on the wire. Where the UI deliberately diverges (because web ≠ native), the
reason is noted inline.

Source repos (read-only reference):
- Contract: `C:\Users\marka\Projects\wing-app\src\api\{types,schemas,client,http,mock,errors}.ts`
- App flow: `C:\Users\marka\Projects\wing-app\app\*` + `C:\Users\marka\Projects\wing-app\src\components\*`
- Server truth: `C:\Users\marka\Projects\pushpull-hub-api\src\routes\app*.ts` + `docs\wing-app-5c-contract.md`

Wire-shape summary (server wins on any disagreement):
- Envelope: `{ success, data, error? }` on every response.
- `GET /app/orders` → **bare `Order[]`** (not `{ items }`). Capped at 100.
- `GET /app/locations` → **bare `LocationSummary[]`**.
- `GET /app/loyalty/rewards|vouchers|tiers` → `{ items }` wrapper (not bare).
- `POST /app/orders` is `.strict()`: `scheduledFor`, `promoCode`, `notes` must
  be present on every submit even when null.
- `pointsEarned` returned on submit is **pre-multiplier**; ledger delta is
  post-multiplier.

## Flag + mode

`src/lib/pph/mode.ts` resolves `NEXT_PUBLIC_ORDERING_MODE`:
- Unset / `"handoff"` → today's Deliverect + Toast links, untouched. Every
  `/order/*` route calls `notFound()`. No sitemap or robots changes.
- `"pph"` → `/order/*` routes render. `getProviderForLocation` short-circuits
  to `pushPullHubProvider` for every location, so every site-wide ORDER
  button on marketing pages routes to `/order/menu?location=<slug>` instead
  of the aggregator (Deliverect / Toast). The menu page preselects the PPH
  location that matches the slug. Routes carry
  `robots: { index: false, follow: false }` until go-live.

`NEXT_PUBLIC_PPH_URL` toggles between `MockPphClient` (default when unset) and
`HttpPphClient`. The mock reuses `src/lib/menu/menu-data.ts` wherever
practical so the mock flow mirrors the live catalogue.

## Screen / component parity table

| wing-app surface | file(s) | web-v2 surface | route / component | parity | notes |
|---|---|---|---|---|---|
| Root shell | `app/_layout.tsx` | `src/app/order/layout.tsx` + `src/components/pph/AppLayout.tsx` | centred app-width column (max-w-md on desktop) | same semantics | web wraps in `PphProviders` (cart, order, auth); flag gate here |
| Location sheet | `src/components/LocationSheet.tsx` | `src/components/pph/LocationSheet.tsx` | bottom sheet, two-step list → confirm | same | hero image per location sourced from `locations.shopfront` |
| Home / menu entry | `app/(tabs)/index.tsx` + `(tabs)/menu.tsx` | `src/app/order/page.tsx` + `src/app/order/menu/page.tsx` | menu entry picks location first (if none active) then navigates to menu | **simplified** | web does not reproduce DailyDropCard / SauceSpinner / PriceCarousel in this phase; focus is on ordering flow |
| Joe-style menu list | `src/components/MenuList.tsx` + `MenuItemPopup.tsx` | `src/components/pph/MenuList.tsx` + `ItemSheet.tsx` | category rails + item rows, sticky basket bar | same | web uses horizontal scroll-snap tabs (mobile rhythm rule 13) |
| Item sheet | `MenuItemPopup.tsx` | `ItemSheet.tsx` | bottom sheet: image, name, description, modifiers (pills), sauces/dips (compatible only), qty stepper, Add CTA | same | copy: `Add {qty} to basket · {price}` |
| Basket bar | `BasketBar.tsx` | `BasketBar.tsx` | sticky bottom pill, hidden at count=0 | same | copy: `View Basket · {price}` |
| Basket | `app/basket.tsx` | `src/app/order/basket/page.tsx` | review items, upsells, go-to-checkout | same (minus upsells carousel in phase 1) | static "Earn Wingers points on this order" per ADR-013 |
| Checkout | `app/checkout.tsx` + `CheckoutConfirmSheet.tsx` | `src/app/order/checkout/page.tsx` + `src/components/pph/CheckoutConfirmSheet.tsx` | collection-first, pickup time, tender, voucher, promo, totals, confirm | same | Blue Light preview rendered; same combinability guards |
| Schedule sheet | `ScheduleSheet.tsx` | `ScheduleSheet.tsx` | Today/Tomorrow tabs; 15-min slots floored by `now + minPickupLeadMinutes` | same | floor matches PPH `PICKUP_LEAD_TOO_SHORT` 422 |
| Payment sheet | `MockPaymentSheet.tsx` | `MockPaymentSheet.tsx` | Pay / Decline / Cancel; drives mock `_confirmPayment` / `_declinePayment` | same | mock-mode only; real Stripe stub below |
| Stripe payment | native Stripe sheet via `payment-sheet.ts` | `StripePayment` adapter + `/order/checkout` real path | TODO: Payment Element in centred app-width card | **stub** | `redirect: 'if_required'`, card + Link + Apple/Google Pay only; implementation blocked on Stripe pk env var |
| Pickup code | `OrderStatusCard.tsx` pickup block | `PickupCodeBlock.tsx` | 44px display font gold text, "Your collection code" / "Show or say this at the counter." | same | shown only in `confirmed|preparing|ready` + always on receipt |
| Order status card | `OrderStatusCard.tsx` + `ActiveOrdersStack.tsx` | `OrderStatusCard.tsx` + home strip on `/order` | status headlines identical, lazy-swept shows "PAYMENT WINDOW EXPIRED" | same | poll every 8s via `useOrderPoll` |
| Order detail / receipt | `app/order/[id].tsx` | `src/app/order/status/[id]/page.tsx` | timeline + items + totals + pickup code | same | receipt view accessible from history |
| Order history | `app/(tabs)/wallet.tsx` | `src/app/order/history/page.tsx` | newest-first list; links to receipt | same | bare `Order[]` from `GET /app/orders` |
| Login | `app/(auth)/login.tsx` | `src/app/order/auth/login/page.tsx` | email + password | same | sets session via `pph.login` → `authStore.setSession` |
| Signup | `app/(auth)/signup.tsx` | `src/app/order/auth/signup/page.tsx` | first/last/email/password/phone? | same | auto-sets `orgSlug` from `NEXT_PUBLIC_PPH_ORG_SLUG` (default `wingers`) |
| Auth soft-wall | `AuthRequiredSheet.tsx` | `AuthRequiredSheet.tsx` | fade modal; "Sign in" / "Create an account" | same | gates loyalty + history + checkout submit |
| Loyalty home | `app/(tabs)/loyalty/index.tsx` | `src/app/order/account/loyalty/page.tsx` | points, tier, Blue Light, rewards, vouchers, ledger links | same (slimmed) | TierCarousel + RedeemConfirmSheet included |
| Rewards redeem | `RedeemConfirmSheet.tsx` | `RedeemConfirmSheet.tsx` | double-tap guard; "Use now" / "Save for later" success | same | **never auto-retry** on failure (non-idempotent redeem) |
| Vouchers section | `VouchersSection.tsx` | section inside `/order/account/vouchers` | status grouping ISSUED/APPLIED/EXPIRED/VOID | same | dimmed expired/void rows |
| Voucher picker | `VoucherPickerSheet.tsx` | `VoucherPickerSheet.tsx` | one voucher per order; conflict reason banner | same | combinability guards mirror server 422s |
| Points pill | `PointsPill.tsx` | `PointsPill.tsx` | gold dot + "{N} PTS" | same | header slot on order routes |
| Blue Light badge | `BlueLightBadge.tsx` | `BlueLightBadge.tsx` | pill with verified label | same | shown on account + checkout banner |
| Points history / ledger | `app/(tabs)/loyalty/history.tsx` | nested in `/order/account/loyalty` | cursor-paginated ledger | **slimmed** | first page only in phase 1; cursor plumbing in place |
| Receipt scan | `app/(tabs)/scan.tsx` | — | **omitted** | web has no camera flow; QR scan stays mobile-only (TODO) |
| Delivery sheet | `WantDeliverySheet.tsx` | `DeliverySheet.tsx` | links to Deliveroo/Uber Eats/Just Eat | same | opens in new tab (web adaptation) |
| Session expired | `SessionExpiredSheet.tsx` | mounted in `AppLayout` | fade sheet on 401-after-refresh-failure | same | triggers `authStore.markSessionExpired` |

## Deliberate divergences

1. **No native cart.** All ordering is server-authoritative via PPH; web cart is a thin React context (`src/lib/pph/cart/context.tsx`) persisted to `localStorage` keyed by location, cleared on location switch. Mirrors wing-app's `src/stores/cart.ts`.
2. **No native Stripe sheet.** Web uses Stripe Elements (Payment Element) in a centred card. Adapter interface identical to app so swap is additive. Launch set: card + Link + Apple Pay + Google Pay (`allow_redirects: 'never'`, same as PPH).
3. **No tab bar.** Web renders a slim top bar with `PointsPill` + `BasketBar` floating at the bottom. On desktop the whole flow sits in a centred `max-w-md` column so it reads like the app.
4. **No home carousels in `/order` phase 1.** DailyDropCard / SauceSpinner / PriceCarousel stay on the marketing home (`/`). Order flow starts cold at `/order`.
5. **No scan receipt flow.** Web has no camera path; punted.
6. **Loyalty ledger: first page only in phase 1.** Cursor paginator exists in the client but UI stops at the first page until design signs off on paging.
7. **Delivery handoff opens in new tab.** Native uses `Linking.openURL`; web uses `rel="noopener"`.
8. **Pickup code generator not shipped on web.** Web only reads `pickupCode` from server; mock reuses the app's `mkPickupCode` logic directly (ported, same output).
9. **ORDER route convention.** All PPH flow lives under `/order/*` (new). Marketing site keeps its existing `/menu` content route — those are different pages. When flag=pph, every top-level ORDER CTA (`src/lib/order/providers/pushpull-hub.ts`) returns `/order` instead of throwing.

## Rules preserved verbatim

- **Idempotency key** retained across retries; invalidated only on cart signature change (`JSON.stringify({ lines, tender, voucherId, promoCode })`). pickupMode/scheduledFor deliberately excluded.
- **`MENU_STALE` / `PRICE_MISMATCH`** → refetch menu, update cart's `menuUpdatedAt`, show gold "Menu Updated" banner. Never auto-resubmit.
- **Blue Light** → 20% off `Math.floor(subtotal * 0.2)`; `pointsEarned` forced to 0; cannot combine with voucher/promo/points-tender. Client gates all three before submit.
- **Lazy sweep** → structural detection: `status==='cancelled' && paymentMethod==='card' && !isPaid` ⇒ headline becomes "PAYMENT WINDOW EXPIRED".
- **Cancel buffer** → `canCancel()` only non-terminal + within 60s of createdAt; hidden entirely in HTTP mode (PPH has no cancel endpoint).
- **Reward redeem non-idempotent** → `redeemReward` must not auto-retry on network error; UI shows error and asks the user to re-open rewards (which refetches vouchers).
- **Points preview carve-out** → the only two surfaces that may compute `estimatePointsFromLines` are Checkout Order Summary and `CheckoutConfirmSheet`. Copy MUST be `"Earn N pts when you collect"` — no `~`, no "est.".
- **Pickup code display** → shown on `OrderStatusCard` only in `confirmed|preparing|ready`; always on the receipt as historical fact.
- **InitiateCheckout pixel** → fired once at the top of `/order/checkout` via the existing consent-gated helper. Purchase pixel is server-side only (TODO, out of scope).

## Required-nullable fields on `POST /app/orders`

`scheduledFor`, `promoCode`, `notes` must be present on every submit even when
null. The web client's `submitOrder` wrapper always builds the payload with
these keys present. Omitting them triggers 400 `VALIDATION_ERROR`.

## Non-obvious wire quirks (checked by Zod boundary)

1. Hyphenated enums: sauce `coming-soon`, modifier `add-on`.
2. `heatLevel`, `badge`, `modifiers`, `phone` are omitted (not null) when absent.
3. `pointsEarned` on submit is pre-multiplier; ledger delta is post-multiplier.
4. Modifier earn: `floor(sumModPence * rate / 10_000)` — floor the SUM.
5. Response envelope wraps everything; direct `response.pointsPerPoundScaled` is undefined.
6. Password reset lives at `/api/auth/*`, not `/api/app/*`. Prod responses omit the reset URL; web "forgot password" stays dark until SMTP ships.

## PPH-side requirements (for go-live)

Add these to `CORS_ORIGINS` on the PPH deployment:
- `https://wingers.co`
- `https://www.wingers.co`
- `https://wingers-web-v2.vercel.app`
- `http://localhost:3006`

(Vercel preview deployments have changing hostnames — add explicit preview
aliases or allowlist a stable preview URL per PR environment.)
