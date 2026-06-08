# Phase Plan — 1–3 Day Wingers Rebuild

> Day-by-day execution roadmap. Each phase = one branch = one PR = one merge after visual verification on Vercel preview. Paste the corresponding prompt from `docs/prompt-library.md` into Claude Code at the start of each phase.

---

## Constraint summary
- **Timeline**: 1–3 days to launch on Vercel URL
- **Scope**: Marketing + loyalty signup capture (cart external via Deliverect/Toast)
- **Future**: PPH cart + custom loyalty in Phase 2 (not this build)
- **Domain**: Launch on Vercel preview URL, cut DNS to `wingers.co` post-launch

---

## Day 0 — Setup (1 hour, before any code)

This is the foundation. Don't skip any step.

### 0.1 Repo creation
```bash
# In a fresh terminal, in your projects folder
gh repo create wingers-web-v2 --public --description "Wingers — UK fried chicken brand website" --clone
cd wingers-web-v2
```

### 0.2 Git config (Windows)
```bash
git config user.email "<the email matching your devotbfc GitHub account>"
git config user.name "<your name>"
git config --global core.editor "notepad"
```

### 0.3 Drop in the doc kit
Unzip the doc kit into the repo root. You should now have:
- `CLAUDE.md`
- `PHASE_PLAN.md` (this file)
- `SETUP.md`
- `.env.example`
- `docs/brand.md`
- `docs/decisions.md`
- `docs/master-registry.md`
- `docs/prompt-library.md`
- `docs/migration-guide.md`

### 0.4 Branch protection
On GitHub → Settings → Branches → Add rule for `main`:
- Require pull request before merging
- Require approvals: 0 (you're solo, but the PR ceremony still helps)
- Block force pushes

### 0.5 Vercel project
- Connect the GitHub repo to Vercel
- Disable Deployment Protection for previews
- Note the preview URL — this becomes your `NEXT_PUBLIC_APP_URL` for v1

### 0.6 Supabase project
- Create new project in EU region (London or Frankfurt)
- Note the project URL, anon key, service role key
- Run the SQL migration from `docs/decisions.md` ADR-010 to create `loyalty_signups`

### 0.7 Mailchimp audience
- Log into Mailchimp (or create account)
- Create audience named "Friends with Benefits"
- Note the audience ID and your server prefix (visible in account URL, e.g. `us12.admin.mailchimp.com`)
- Generate an API key

### 0.8 Vercel env vars
Set ALL of these in Vercel → Settings → Environment Variables (Production + Preview + Development):
- `NEXT_PUBLIC_APP_URL` → Vercel preview URL for now
- `NEXT_PUBLIC_SUPABASE_URL` → Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` → Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` → Supabase service role key
- `MAILCHIMP_API_KEY` → Mailchimp API key
- `MAILCHIMP_AUDIENCE_ID` → Mailchimp audience ID
- `MAILCHIMP_SERVER_PREFIX` → e.g. `us12`

### 0.9 Initialise Next.js
```bash
npx create-next-app@latest . --typescript --tailwind --app --use-npm --eslint --src-dir --import-alias "@/*"
# Choose Turbopack: yes
```

### 0.10 Initial commit + push
```bash
git add .
git commit -m "chore: initial scaffold with doc kit"
git push -u origin main
```

Verify Vercel auto-deploys this initial commit. If yes, foundation is ready.

---

## Day 1 — Foundation + Homepage (8 hours)

### Phase A — Brand foundation (3 hours)
**Branch**: `feat/brand-foundation`

Open a fresh Claude Code session in the repo:
```bash
claude
```

Paste the **Phase A prompt** from `docs/prompt-library.md`. Approve the plan, let Claude Code execute. Verify at `/dev/components` on the Vercel preview URL.

**Acceptance**: Every brand component renders correctly in every variant. Doubled headline scales with font size. Marquee respects `prefers-reduced-motion`.

Merge PR. Move to Phase B.

### Phase B — Homepage (4-5 hours)
**Branch**: `feat/homepage`

Paste the **Phase B prompt**. Approve the plan, let Claude Code execute. Verify on Vercel preview.

**Acceptance**: All 12 sections render. Mobile-first at 375px. ORDER pill works. Location picker sheet opens both Deliverect and Toast correctly. LocationOpenBadge shows real open/closed state.

Merge PR.

---

## Day 2 — Content pages (8 hours)

These phases can run in parallel branches off `main` IF you can manage four open PRs without conflicts. Otherwise, sequential.

### Phase C — Menu (2 hours)
**Branch**: `feat/menu`

Paste the **Phase C prompt**. Verify on preview.

**Acceptance**: All 6 categories render. Items show name, description, price, allergens. Location switcher updates URL. CTAs link to location picker.

### Phase D — Locations (3 hours)
**Branch**: `feat/locations`

Paste the **Phase D prompt**. Verify on preview.

**Acceptance**: Locations index lists both. Each detail page has full info: hours table, address, phone, parking, accessibility, payment, signature dishes link, Google Map iframe. Schema.org JSON-LD validated via Google Rich Results Test.

### Phase E — About / Contact / Allergens / FAQ (2 hours)
**Branch**: `feat/info-pages`

Paste the **Phase E prompt**. Verify on preview.

**Acceptance**: About page reads naturally (test by asking ChatGPT-style: "what is buttermilk fried chicken at Wingers?"). FAQ has 10+ Q&A pairs with FAQPage JSON-LD. Allergens table renders correctly. Contact form submits (returns 200 stub).

### Phase F — Loyalty / Privacy / Terms (1 hour)
**Branch**: `feat/legal-loyalty`

Paste the **Phase F prompt**. Verify on preview.

**Acceptance**: Loyalty page has prominent signup form. Privacy and Terms have solicitor-review banner and `noindex` meta tag.

---

## Day 3 — SEO + APIs + Polish + Launch (8 hours)

### Phase G — SEO infrastructure + signup API + OG images (3 hours)
**Branch**: `feat/seo-and-signup`

Paste the **Phase G prompt**. This is the most consequential phase for AI search. Verify on preview.

**Acceptance**:
- Every page's JSON-LD validates at https://search.google.com/test/rich-results
- `/sitemap.xml` lists every route
- `/robots.txt` explicitly allows GPTBot, Google-Extended, ClaudeBot, PerplexityBot, OAI-SearchBot
- `/llms.txt` resolves
- All 10 OG images render correctly in https://www.opengraph.xyz/
- Loyalty signup writes to BOTH Supabase and Mailchimp on submit (test with a real email)
- Contact form writes to Supabase on submit

### Phase H — Polish + audits (3 hours)
**Branch**: `feat/content-polish`

Paste the **Phase H prompt**. Verify on preview.

**Acceptance**:
- Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, SEO 100, Best Practices ≥ 95
- All placeholder photos identified with `// TODO: replace placeholder` comments
- Keyboard nav works end-to-end on every page
- Vercel Web Analytics enabled

### Phase I — Launch (1 hour)
**Branch**: direct to `main` (no PR needed — just final smoke test)

Walk through `docs/migration-guide.md` §3 (pre-cutover checklist). When green:
1. Tag release as `v1.0.0`: `git tag v1.0.0 && git push --tags`
2. Soft-launch by sharing the Vercel URL via Instagram, WhatsApp business broadcast
3. DNS cutover to `wingers.co` is a separate task — do not rush it. Wait 48h to confirm no regressions on the Vercel URL first.

---

## What to do if a phase runs over

**If Phase A goes over 3 hours**: Cut testimonials, lifestyle masonry, and behind-scenes sections from Phase B. They can be added in Phase H.

**If Phase B goes over 5 hours**: Cut FlavourStory section. Use a simpler hero. Move polish to Phase H.

**If Phase G goes over 4 hours**: Defer OG image generation (use one default OG for all routes initially). Schema markup + sitemap + robots.txt + llms.txt is the non-negotiable core; per-route OG images can be added in Phase H or post-launch.

**If a Lighthouse score is below target in Phase H**: Identify the worst-scoring page first. Common fixes: priority too liberal on `next/image`, custom fonts not preloaded, hero video too large, JSON-LD blocking initial paint.

---

## Discipline reminders

1. **One PR open at a time.** If PR-2 is waiting on visual verification, do not start PR-3 from `main` — it will conflict.
2. **Plan mode mandatory.** Every multi-file change starts with a plan.
3. **No finishing skill** until you've verified on the Vercel preview URL.
4. **No unsolicited dependencies.** Reject anything Claude Code installs without your approval.
5. **Update master-registry.md** at the end of each phase so the next session sees current state.
