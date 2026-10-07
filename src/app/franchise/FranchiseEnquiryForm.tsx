"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { submitFranchiseEnquiry } from "@/app/actions/franchise";
import { trackCustom } from "@/lib/analytics/meta-pixel";
import { BrandButton } from "@/components/brand/BrandButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  FRANCHISE_CONSENT_TEXT,
  FRANCHISE_CONSENT_TEXT_VERSION,
} from "@/lib/consent/franchise-text-version";

const BUDGET_BANDS = [
  { value: "under_100k", label: "Under £100k" },
  { value: "100_200k", label: "£100k – £200k" },
  { value: "200_350k", label: "£200k – £350k" },
  { value: "350k_plus", label: "£350k+" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
] as const;

const EXPERIENCE_OPTIONS = [
  { value: "none", label: "None" },
  { value: "some", label: "Some F&B experience" },
  { value: "multi_site", label: "Multi-site operator" },
] as const;

const TIMEFRAME_OPTIONS = [
  { value: "0_6m", label: "0 – 6 months" },
  { value: "6_12m", label: "6 – 12 months" },
  { value: "12m_plus", label: "12 months+" },
] as const;

const enquirySchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(1, "Enter your full name.")
    .max(120, "Keep it under 120 characters."),
  email: z.email("Enter a valid email."),
  phone: z
    .string()
    .trim()
    .min(1, "Enter a phone number.")
    .max(32, "Keep it under 32 characters."),
  area: z
    .string()
    .trim()
    .min(1, "Tell us the area or town you have in mind.")
    .max(120, "Keep it under 120 characters."),
  budget_band: z.enum([
    "under_100k",
    "100_200k",
    "200_350k",
    "350k_plus",
    "prefer_not_to_say",
  ]),
  experience: z.enum(["none", "some", "multi_site"]),
  timeframe: z.enum(["0_6m", "6_12m", "12m_plus"]),
  message: z.string().max(2000, "Keep it under 2000 characters.").optional(),
  heard_from: z.string().max(120, "Keep it under 120 characters.").optional(),
  marketing_consent: z.boolean(),
  website: z.string().optional(),
});

type EnquiryFormValues = z.infer<typeof enquirySchema>;

const inputClasses =
  "h-12 w-full rounded-none border border-brand-black/20 bg-brand-white px-4 font-body text-base text-brand-black placeholder:text-brand-black/40 focus-visible:ring-0 shadow-none";
const selectClasses =
  "h-12 w-full appearance-none rounded-none border border-brand-black/20 bg-brand-white px-4 font-body text-base text-brand-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-pink";
const textareaClasses =
  "block w-full rounded-none border border-brand-black/20 bg-brand-white p-4 font-body text-base text-brand-black placeholder:text-brand-black/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-pink";
const labelClasses =
  "font-body text-sm font-semibold uppercase tracking-widest text-brand-black";
const optionalLabel =
  "font-normal normal-case text-brand-black/60";
const errorText =
  "font-body text-sm font-bold text-brand-red";

export function FranchiseEnquiryForm() {
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      area: "",
      budget_band: "prefer_not_to_say",
      experience: "none",
      timeframe: "0_6m",
      message: "",
      heard_from: "",
      marketing_consent: false,
      website: "",
    },
    mode: "onBlur",
  });

  function onSubmit(values: EnquiryFormValues) {
    startTransition(async () => {
      const result = await submitFranchiseEnquiry({
        full_name: values.full_name,
        email: values.email,
        phone: values.phone,
        area: values.area,
        budget_band: values.budget_band,
        experience: values.experience,
        timeframe: values.timeframe,
        message: values.message,
        heard_from: values.heard_from,
        marketing_consent: values.marketing_consent === true,
        consent_text_version: FRANCHISE_CONSENT_TEXT_VERSION,
        website: values.website,
      });

      if (result.ok) {
        trackCustom("FranchiseEnquiry", { content_name: "franchise" });
        setSubmitted(true);
        form.reset();
      } else if (result.error === "rate_limited") {
        toast.error("Too many submissions. Try again in a little while.");
      } else {
        toast.error("Something went wrong. Try again in a moment.");
      }
    });
  }

  const websiteField = form.register("website");
  const marketingField = form.register("marketing_consent");

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-md border border-brand-black/10 bg-brand-white p-8"
      >
        <p className="font-display text-2xl font-bold uppercase tracking-tight text-brand-black md:text-3xl">
          Thanks. We&rsquo;ll be in touch.
        </p>
        <p className="mt-3 font-body text-base leading-relaxed text-brand-black/80 md:text-lg">
          Your enquiry has been received. The team will respond directly from{" "}
          <a
            href="mailto:hi@wingers.co"
            className="underline transition-colors hover:text-brand-red"
          >
            hi@wingers.co
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
        noValidate
      >
        <div aria-hidden="true" className="sr-only">
          <label htmlFor="franchise-website">Website</label>
          <input
            id="franchise-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...websiteField}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClasses}>Full name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    autoComplete="name"
                    className={inputClasses}
                    {...field}
                  />
                </FormControl>
                <FormMessage className={errorText} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClasses}>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    autoComplete="email"
                    className={inputClasses}
                    {...field}
                  />
                </FormControl>
                <FormMessage className={errorText} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClasses}>Phone</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    autoComplete="tel"
                    className={inputClasses}
                    {...field}
                  />
                </FormControl>
                <FormMessage className={errorText} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClasses}>
                  Area or town of interest
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className={inputClasses}
                    placeholder="e.g. Birmingham, West Yorkshire"
                    {...field}
                  />
                </FormControl>
                <FormMessage className={errorText} />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="budget_band"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClasses}>
                  Investment budget
                </FormLabel>
                <FormControl>
                  <select className={selectClasses} {...field}>
                    {BUDGET_BANDS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage className={errorText} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClasses}>F&amp;B experience</FormLabel>
                <FormControl>
                  <select className={selectClasses} {...field}>
                    {EXPERIENCE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage className={errorText} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timeframe"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClasses}>Timeframe</FormLabel>
                <FormControl>
                  <select className={selectClasses} {...field}>
                    {TIMEFRAME_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage className={errorText} />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClasses}>
                Message{" "}
                <span className={optionalLabel}>(optional)</span>
              </FormLabel>
              <FormControl>
                <textarea
                  rows={4}
                  className={textareaClasses}
                  placeholder="Anything useful for the first conversation."
                  {...field}
                />
              </FormControl>
              <FormMessage className={errorText} />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="heard_from"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClasses}>
                How did you hear about us?{" "}
                <span className={optionalLabel}>(optional)</span>
              </FormLabel>
              <FormControl>
                <Input type="text" className={inputClasses} {...field} />
              </FormControl>
              <FormMessage className={errorText} />
            </FormItem>
          )}
        />

        <label className="flex items-start gap-3 font-body text-sm text-brand-black">
          <input
            id="franchise-marketing-consent"
            type="checkbox"
            className="mt-1 h-4 w-4 flex-none rounded border-brand-black/40 accent-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-pink"
            {...marketingField}
          />
          <span>{FRANCHISE_CONSENT_TEXT}</span>
        </label>

        <div>
          <BrandButton
            type="submit"
            variant="secondary"
            size="lg"
            disabled={isPending}
            className="w-full md:w-auto"
          >
            {isPending ? "Sending..." : "Send enquiry"}
          </BrandButton>
        </div>
      </form>
    </Form>
  );
}
