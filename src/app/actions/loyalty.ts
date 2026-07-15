"use server";

import { headers } from "next/headers";
import { z } from "zod";

import { getSupabaseClient } from "@/lib/supabase/client";
import { checkRateLimit } from "@/lib/rate-limit";

const sourceEnum = z.enum(["homepage", "loyalty_page"]);
const locationEnum = z.enum(["milton-keynes", "northampton"]);

const signupSchema = z.object({
  email: z.email(),
  first_name: z.string().max(60).optional(),
  source: sourceEnum,
  location_pref: locationEnum.nullish(),
});

export type SignupInput = z.input<typeof signupSchema> & { website?: string };

export type SignupResult =
  | { ok: true }
  | { ok: false; error: "invalid" | "rate_limited" | "server" };

async function getClientIp(): Promise<string> {
  const h = await headers();
  const fwd = h.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return h.get("x-real-ip") ?? "unknown";
}

export async function signupLoyalty(input: SignupInput): Promise<SignupResult> {
  if (typeof input.website === "string" && input.website.length > 0) {
    return { ok: true };
  }

  const parsed = signupSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "invalid" };

  const ip = await getClientIp();
  const rl = checkRateLimit(`loyalty:${ip}`, 5, 10 * 60_000);
  if (!rl.ok) return { ok: false, error: "rate_limited" };

  const { email, first_name, source, location_pref } = parsed.data;
  const supabase = getSupabaseClient();

  const { error } = await supabase.from("loyalty_signups").insert({
    email: email.toLowerCase().trim(),
    first_name: first_name?.trim() ? first_name.trim() : null,
    source,
    location_pref: location_pref ?? null,
  });

  if (error) {
    if (error.code === "23505") return { ok: true };
    console.error("loyalty_signup insert failed", { code: error.code });
    return { ok: false, error: "server" };
  }

  return { ok: true };
}
