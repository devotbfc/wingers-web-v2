-- Lock down loyalty_signups: service-role writes only.
--
-- Posture (mirrors franchise_enquiries, see
-- 20261006120000_franchise_enquiries.sql): the Next.js server action writes
-- using the SUPABASE_SERVICE_ROLE_KEY client (src/lib/supabase/admin.ts).
-- Service role bypasses RLS by design, so inserts succeed; everyone else is
-- locked out. RLS is already enabled on this table; this migration removes
-- the remaining public-write surface:
--
--   * drops the permissive INSERT policy that allowed anon to write with
--     WITH CHECK (true), which bypassed the server action's honeypot,
--     consent gate, Zod schema and in-process rate limit for anyone holding
--     the public anon key (it ships in the page bundle);
--   * revokes the INSERT grants from anon + authenticated so a leaked anon
--     key cannot reach the table at all.
--
-- SELECT / UPDATE / DELETE / TRUNCATE / REFERENCES / TRIGGER are already
-- revoked from anon + authenticated (see 20261006180000_loyalty_source_slidein.sql),
-- so after this migration the only path into the table is the service role.
--
-- Benson applies this migration in the Supabase SQL editor; the repo file is
-- for audit / parity.

drop policy if exists "anon can insert loyalty signups" on public.loyalty_signups;

revoke insert on public.loyalty_signups from anon, authenticated;
