-- Create franchise_enquiries table for the /franchise enquiry form.
--
-- Posture: server-side only. The Next.js server action writes using the
-- SUPABASE_SERVICE_ROLE_KEY client (see src/lib/supabase/admin.ts). Service
-- role bypasses RLS by design, so inserts succeed; everyone else is locked
-- out. RLS is enabled with no policies, and anon + authenticated grants are
-- explicitly revoked so a leaked anon key cannot read, write or delete.
--
-- Columns:
--   - enquiry fields (full_name, email, phone, area, budget_band, experience,
--     timeframe, message, heard_from)
--   - audit (created_at, id)
--   - optional marketing-consent audit (marketing_consent_at,
--     consent_text_version) — mirror of loyalty_signups' shape so a future
--     consent audit covers both tables with the same shape
--
-- There is no ip_hash column: rate-limiting is in-process and does not need
-- a DB round-trip. Email has no unique constraint — a prospect may legitimately
-- enquire more than once.

create table if not exists public.franchise_enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  phone text not null,
  area text not null,
  budget_band text not null,
  experience text not null,
  timeframe text not null,
  message text,
  heard_from text,
  marketing_consent_at timestamptz,
  consent_text_version text
);

alter table public.franchise_enquiries enable row level security;

-- No policies on purpose: service role bypasses RLS; everything else is denied.
revoke all on public.franchise_enquiries from anon, authenticated;

alter table public.franchise_enquiries
  add constraint franchise_enquiries_budget_band_chk
    check (budget_band in ('under_100k','100_200k','200_350k','350k_plus','prefer_not_to_say')),
  add constraint franchise_enquiries_experience_chk
    check (experience in ('none','some','multi_site')),
  add constraint franchise_enquiries_timeframe_chk
    check (timeframe in ('0_6m','6_12m','12m_plus'));

create index franchise_enquiries_created_at_idx on public.franchise_enquiries (created_at desc);

comment on table public.franchise_enquiries is
  'Franchise opportunity enquiries submitted via /franchise. Server-only writes via service role; RLS enabled, no policies, no anon/authenticated grants.';
comment on column public.franchise_enquiries.marketing_consent_at is
  'Timestamp the enquirer ticked the optional marketing opt-in. NULL if not ticked.';
comment on column public.franchise_enquiries.consent_text_version is
  'Version slug of the marketing-consent text displayed (e.g. "franchise-2026-10-v1"). NULL if not ticked.';
