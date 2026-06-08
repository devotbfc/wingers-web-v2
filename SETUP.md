# Day 0 Setup — `SETUP.md`

> Run through this in order on Day 0. Approximately 60 minutes if accounts are ready. Stop and ask if anything blocks.

---

## Pre-requisites (have ready before starting)

- GitHub account: `devotbfc` (or your owning account)
- Vercel account linked to that GitHub
- Supabase account (free tier is fine)
- Mailchimp account with API access
- Node.js 20+ installed
- `gh` CLI installed (`winget install GitHub.cli` on Windows)
- Terminal of choice (PowerShell, Windows Terminal, iTerm)
- A web browser

---

## 1. Create the GitHub repo (2 min)

```bash
# Authenticate gh if not already
gh auth login

# Create and clone in one step
gh repo create wingers-web-v2 --public --description "Wingers — UK fried chicken brand website" --clone
cd wingers-web-v2
```

## 2. Configure local Git (1 min)

```bash
# CRITICAL: email must match the GitHub account that owns the repo
# This was the #1 friction point in the previous build
git config user.email "your-devotbfc-email@example.com"
git config user.name "Benson"

# Default editor — avoids dropping into Vim during merges
git config --global core.editor "notepad"  # Windows
# git config --global core.editor "nano"   # macOS / Linux

# Show settings
git config --get user.email
git config --get user.name
```

## 3. Drop in the doc kit (1 min)

Unzip the doc kit (CLAUDE.md, PHASE_PLAN.md, SETUP.md, .env.example, docs/) into this repo root.

```bash
ls -la
# Expected: CLAUDE.md, PHASE_PLAN.md, SETUP.md, .env.example, docs/
```

## 4. Branch protection (3 min)

On GitHub.com:
- Repo → Settings → Branches → Add rule
- Branch name pattern: `main`
- Check: "Require a pull request before merging"
- Save

## 5. Connect to Vercel (5 min)

- vercel.com → New Project → Import the repo
- Framework preset: Next.js (auto-detected)
- Build settings: default
- Skip env vars for now — we add them after Supabase + Mailchimp setup
- Deploy (this will fail because there's no Next.js project yet — that's fine)
- Settings → Deployment Protection → Disable for Preview
- Note the preview URL: `wingers-web-v2.vercel.app` or similar

## 6. Create Supabase project (5 min)

- supabase.com → New Project
- Region: **EU West** (London / Ireland) or **EU Central** (Frankfurt) — UK data residency
- Name: `wingers-web`
- Set strong DB password (save in password manager)
- Wait for project ready
- Settings → API → copy these:
  - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
  - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `service_role` `secret` key → `SUPABASE_SERVICE_ROLE_KEY`

## 7. Create Supabase tables (3 min)

Supabase dashboard → SQL Editor → New query:

```sql
-- Loyalty signups (ADR-010)
create table loyalty_signups (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  first_name text,
  preferred_location text check (preferred_location in ('milton-keynes', 'northampton') or preferred_location is null),
  marketing_consent boolean not null default true,
  source text default 'website',
  mailchimp_synced_at timestamptz,
  pph_synced_at timestamptz,
  created_at timestamptz default now()
);

-- Contact submissions
create table contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  location text check (location in ('milton-keynes', 'northampton', 'general') or location is null),
  message text not null,
  created_at timestamptz default now()
);

-- RLS enabled, no public policies — service role only
alter table loyalty_signups enable row level security;
alter table contact_submissions enable row level security;
```

Run. Verify both tables exist in Table Editor.

## 8. Create Mailchimp audience (5 min)

- mailchimp.com → Audience → Create audience
- Name: `Friends with Benefits`
- Default From email: `hello@wingers.co` (or temporary)
- Permission reminder: `You're receiving this because you signed up at wingers.co for Friends with Benefits — early access to new wings, sauces, and locations.`
- Save
- Account → Extras → API Keys → Create new key, name it `wingers-web-v2`. Copy → `MAILCHIMP_API_KEY`
- The API key suffix indicates server prefix (e.g. `xxx-us12` → prefix is `us12`) → `MAILCHIMP_SERVER_PREFIX`
- Audience settings → Audience name and defaults → bottom of page shows Audience ID → `MAILCHIMP_AUDIENCE_ID`

## 9. Set Vercel env vars (5 min)

Vercel → Project → Settings → Environment Variables. Add EACH of these for **all three environments** (Production, Preview, Development) unless noted:

| Key | Value | Env scope |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | Your Vercel preview URL (e.g. `https://wingers-web-v2.vercel.app`) | All |
| `NEXT_PUBLIC_SUPABASE_URL` | From Step 6 | All |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | From Step 6 | All |
| `SUPABASE_SERVICE_ROLE_KEY` | From Step 6 | All (server-only by name convention) |
| `MAILCHIMP_API_KEY` | From Step 8 | All |
| `MAILCHIMP_AUDIENCE_ID` | From Step 8 | All |
| `MAILCHIMP_SERVER_PREFIX` | From Step 8 (e.g. `us12`) | All |

## 10. Initialise the Next.js project (3 min)

```bash
# This installs into the current (already-empty-ish) directory
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --app \
  --use-npm \
  --eslint \
  --src-dir \
  --import-alias "@/*" \
  --no-import-alias=false
```

When prompted:
- Use Turbopack: **Yes**
- Customize the default import alias: **No** (we already set `@/*`)

Verify:
```bash
npm run dev
# Open http://localhost:3000 — Next.js welcome screen should render
# Ctrl+C to stop
```

## 11. Copy `.env.example` to `.env.local` (1 min)

```bash
cp .env.example .env.local
```

Fill in `.env.local` with the same values you put in Vercel (Step 9). This lets `npm run dev` work locally.

Verify `.env.local` is in `.gitignore`:
```bash
grep .env.local .gitignore
# Should print: .env.local
# If not: echo ".env.local" >> .gitignore
```

## 12. Initial commit and push (2 min)

```bash
git add .
git commit -m "chore: initial scaffold with doc kit and Next.js setup"
git push -u origin main
```

Watch Vercel auto-deploy. Should succeed and show the default Next.js page on the preview URL.

## 13. Start Phase A (you're done with setup)

```bash
# Open Claude Code in this repo
claude
```

Paste the Phase A prompt from `docs/prompt-library.md`. Approve plan. Build.

---

## If something breaks during setup

| Problem | Fix |
|---|---|
| Vercel rejects deploy: "Author email not associated with team" | Step 2 — fix `git config user.email` |
| `npm run dev` fails: missing module | `rm -rf node_modules package-lock.json && npm install` |
| Supabase service role key not working | You probably copied the `anon` key. Service role is much longer (~200 chars) and labelled "secret" |
| Mailchimp API returns 401 | Server prefix mismatch — recheck the suffix on your API key |
| `gh repo create` fails | Run `gh auth login` first |
| Vercel preview URL still shows old WP content | Wrong project connected — disconnect, reconnect to `wingers-web-v2` |
