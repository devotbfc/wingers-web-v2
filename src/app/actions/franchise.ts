"use server";

import { headers } from "next/headers";
import { z } from "zod";

import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { checkRateLimit } from "@/lib/rate-limit";

const budgetBandEnum = z.enum([
  "under_100k",
  "100_200k",
  "200_350k",
  "350k_plus",
  "prefer_not_to_say",
]);
const experienceEnum = z.enum(["none", "some", "multi_site"]);
const timeframeEnum = z.enum(["0_6m", "6_12m", "12m_plus"]);

const enquirySchema = z.object({
  full_name: z.string().min(1).max(120),
  email: z.email(),
  phone: z.string().min(1).max(32),
  area: z.string().min(1).max(120),
  budget_band: budgetBandEnum,
  experience: experienceEnum,
  timeframe: timeframeEnum,
  message: z.string().max(2000).optional(),
  heard_from: z.string().max(120).optional(),
  // Optional — unticked by default. Enquiry still submits either way.
  marketing_consent: z.boolean(),
  consent_text_version: z.string().min(1).max(32),
});

export type FranchiseEnquiryInput = z.input<typeof enquirySchema> & {
  website?: string;
};

export type FranchiseEnquiryResult =
  | { ok: true }
  | { ok: false; error: "invalid" | "rate_limited" | "server" };

async function getClientIp(): Promise<string> {
  const h = await headers();
  const fwd = h.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return h.get("x-real-ip") ?? "unknown";
}

export async function submitFranchiseEnquiry(
  input: FranchiseEnquiryInput,
): Promise<FranchiseEnquiryResult> {
  if (typeof input.website === "string" && input.website.length > 0) {
    return { ok: true };
  }

  const parsed = enquirySchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "invalid" };

  const ip = await getClientIp();
  const rl = checkRateLimit(`franchise:${ip}`, 3, 60 * 60_000);
  if (!rl.ok) return { ok: false, error: "rate_limited" };

  const {
    full_name,
    email,
    phone,
    area,
    budget_band,
    experience,
    timeframe,
    message,
    heard_from,
    marketing_consent,
    consent_text_version,
  } = parsed.data;

  const supabase = getSupabaseAdmin();

  const { error } = await supabase.from("franchise_enquiries").insert({
    full_name: full_name.trim(),
    email: email.toLowerCase().trim(),
    phone: phone.trim(),
    area: area.trim(),
    budget_band,
    experience,
    timeframe,
    message: message?.trim() ? message.trim() : null,
    heard_from: heard_from?.trim() ? heard_from.trim() : null,
    marketing_consent_at: marketing_consent ? new Date().toISOString() : null,
    consent_text_version: marketing_consent ? consent_text_version : null,
  });

  if (error) {
    console.error("franchise_enquiry insert failed", { code: error.code });
    return { ok: false, error: "server" };
  }

  return { ok: true };
}
