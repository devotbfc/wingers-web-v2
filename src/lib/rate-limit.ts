const buckets = new Map<string, number[]>();

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): { ok: boolean } {
  const now = Date.now();
  const cutoff = now - windowMs;
  const existing = buckets.get(key) ?? [];
  const recent = existing.filter((t) => t > cutoff);

  if (recent.length >= limit) {
    buckets.set(key, recent);
    return { ok: false };
  }

  recent.push(now);
  buckets.set(key, recent);
  return { ok: true };
}
