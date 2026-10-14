import "server-only";
import { createHmac } from "node:crypto";

import { getSupabaseAdmin } from "@/lib/supabase/admin";

export async function checkRateLimit(
  form: string,
  ip: string,
  limit: number,
  windowMs: number,
): Promise<{ ok: boolean }> {
  if (!ip || ip === "unknown") {
    console.warn("rate_limit_check_failed", { code: "no_ip" });
    return { ok: true };
  }

  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) {
    console.warn("rate_limit_check_failed", { code: "no_secret" });
    return { ok: true };
  }

  const key = createHmac("sha256", secret).update(`${form}:${ip}`).digest("hex");
  const windowSeconds = Math.max(1, Math.floor(windowMs / 1000));

  try {
    const rpc = getSupabaseAdmin().rpc("rate_limit_hit", {
      p_key: key,
      p_limit: limit,
      p_window_seconds: windowSeconds,
    });

    const result = await Promise.race([
      rpc,
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), 2000),
      ),
    ]);

    const { data, error } = result as Awaited<typeof rpc>;
    if (error) {
      console.warn("rate_limit_check_failed", { code: error.code ?? "unknown" });
      return { ok: true };
    }
    return { ok: data === true };
  } catch (err) {
    const code = err instanceof Error ? err.message : "unknown";
    console.warn("rate_limit_check_failed", { code });
    return { ok: true };
  }
}
