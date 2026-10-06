-- Allow source = 'signup_slidein' on loyalty_signups + tighten grants.
--
-- Bug: the sign-up slide-in form submits source='signup_slidein', but the
-- original loyalty_signups check constraint only permitted
-- ('homepage','loyalty_page'). Every slide-in signup therefore failed the
-- constraint and was rejected by Postgres; the server action logged a
-- generic insert error and returned { ok: false, error: "server" } to the
-- browser, so the issue was invisible to the user beyond a failed submit.
--
-- Fix: drop the old constraint, re-add it with 'signup_slidein' included.
--
-- While we're here, bring loyalty_signups in line with the franchise table's
-- least-privilege posture: the site only ever INSERTs via the server action,
-- so revoke every other right from anon + authenticated. The anon INSERT
-- policy that the loyalty flow depends on stays in place.
--
-- Already applied manually in the Supabase dashboard on 2026-10-06. This
-- file is for audit / repo parity only.

alter table public.loyalty_signups drop constraint loyalty_signups_source_check;
alter table public.loyalty_signups add constraint loyalty_signups_source_check check (source in ('homepage','loyalty_page','signup_slidein'));
revoke select, update, delete, truncate, references, trigger on public.loyalty_signups from anon, authenticated;
