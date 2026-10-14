-- Batch S4: durable rate limiting via Supabase RPC.
-- Replaces the in-memory Map in src/lib/rate-limit.ts, which resets per Vercel cold start.
-- Fixed-window counter. Key is HMAC-SHA256('<form>:<ip>') computed in Node with the service-role
-- key as the secret — raw IPs never land here and unsalted hashes are never used.
-- rate_limit_hit() opportunistically purges rows older than 24h, keeping retention short.

create table if not exists public.rate_limits (
  key          text        not null,
  window_start timestamptz not null,
  count        int         not null default 1,
  primary key (key, window_start)
);

comment on table public.rate_limits is
  'Fixed-window rate-limit counters. Key is HMAC-SHA256(form:ip) with the service-role key as secret; raw IPs are never stored and unsalted hashes are never used. Rows >24h old are purged opportunistically by rate_limit_hit().';

alter table public.rate_limits enable row level security;

-- No policies on purpose: service_role bypasses RLS; everything else is denied.
revoke all on public.rate_limits from anon, authenticated;

create or replace function public.rate_limit_hit(
  p_key            text,
  p_limit          int,
  p_window_seconds int
) returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_window_start timestamptz;
  v_count        int;
begin
  -- Deterministic window boundary: floor(epoch_now / window_seconds) * window_seconds.
  v_window_start := to_timestamp(
    (floor(extract(epoch from now()) / p_window_seconds)::bigint) * p_window_seconds
  );

  insert into public.rate_limits as rl (key, window_start, count)
  values (p_key, v_window_start, 1)
  on conflict (key, window_start)
    do update set count = rl.count + 1
  returning rl.count into v_count;

  -- Opportunistic purge; dataset is tiny so a sequential delete is fine.
  delete from public.rate_limits where window_start < now() - interval '24 hours';

  return v_count <= p_limit;
end;
$$;

revoke execute on function public.rate_limit_hit(text, int, int) from public, anon, authenticated;
grant  execute on function public.rate_limit_hit(text, int, int) to service_role;
