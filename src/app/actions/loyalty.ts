"use server";

import { headers } from "next/headers";
import { z } from "zod";

import { addLoyaltyContact } from "@/lib/brevo";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { checkRateLimit } from "@/lib/rate-limit";

const sourceEnum = z.enum(["homepage", "loyalty_page", "signup_slidein"]);
const locationEnum = z.enum(["milton-keynes", "northampton"]);

const signupSchema = z.object({
  email: z.email(),
  first_name: z.string().max(60).optional(),
  source: sourceEnum,
  location_pref: locationEnum.nullish(),
  // Explicit opt-in: unticked by default on every form, required true here.
  // The consent_text_version pins which wording the user saw.
  marketing_consent: z.boolean(),
  consent_text_version: z.string().min(1).max(32),
});

export type SignupInput = z.input<typeof signupSchema> & { website?: string };

export type SignupResult =
  | { ok: true }
  | {
      ok: false;
      error: "invalid" | "rate_limited" | "server" | "consent_required";
    };

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

  if (!parsed.data.marketing_consent) {
    return { ok: false, error: "consent_required" };
  }

  const ip = await getClientIp();
  const rl = await checkRateLimit("loyalty", ip, 5, 10 * 60_000);
  if (!rl.ok) return { ok: false, error: "rate_limited" };

  const { email, first_name, source, location_pref, consent_text_version } =
    parsed.data;
  const supabase = getSupabaseAdmin();

  const { error } = await supabase.from("loyalty_signups").insert({
    email: email.toLowerCase().trim(),
    first_name: first_name?.trim() ? first_name.trim() : null,
    source,
    location_pref: location_pref ?? null,
    marketing_consent_at: new Date().toISOString(),
    consent_text_version,
  });

  if (error && error.code !== "23505") {
    console.error("loyalty_signup insert failed", { code: error.code });
    return { ok: false, error: "server" };
  }

  if (parsed.data.marketing_consent) {
    try {
      await addLoyaltyContact({
        email: email.toLowerCase().trim(),
        firstName: first_name?.trim() ? first_name.trim() : null,
        source,
        locationPref: location_pref ?? null,
        consentTextVersion: consent_text_version,
      });
    } catch {
      // Brevo failures are non-fatal — Supabase is the source of truth.
    }
  }

  return { ok: true };
}
