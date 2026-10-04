"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { signupLoyalty } from "@/app/actions/loyalty";
import { track } from "@/lib/analytics/meta-pixel";
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
  CONSENT_TEXT,
  CONSENT_TEXT_VERSION,
} from "@/lib/consent/text-version";

const loyaltySchema = z.object({
  email: z.email("Enter a valid email."),
  name: z.string().max(60, "Keep it under 60 characters.").optional(),
  consent: z
    .boolean()
    .refine((v) => v === true, "Tick the box to continue."),
  website: z.string().optional(),
});

type LoyaltyFormValues = z.infer<typeof loyaltySchema>;

interface LoyaltySignupFormProps {
  source?: "homepage" | "loyalty_page";
}

export function LoyaltySignupForm({
  source = "homepage",
}: LoyaltySignupFormProps) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<LoyaltyFormValues>({
    resolver: zodResolver(loyaltySchema),
    defaultValues: { email: "", name: "", consent: false, website: "" },
    mode: "onChange",
  });

  const consentValue = form.watch("consent");

  function onSubmit(values: LoyaltyFormValues) {
    startTransition(async () => {
      const result = await signupLoyalty({
        email: values.email,
        first_name: values.name,
        source,
        marketing_consent: values.consent === true,
        consent_text_version: CONSENT_TEXT_VERSION,
        website: values.website,
      });

      if (result.ok) {
        track("Lead");
        toast.success("You're in.", {
          description: "Watch your inbox for Wingers drops.",
        });
        form.reset();
      } else {
        toast.error("Something went wrong. Try again in a moment.");
      }
    });
  }

  const websiteField = form.register("website");
  const consentField = form.register("consent");

  const inputClasses =
    "h-12 w-full rounded-none border-0 bg-brand-white px-4 font-body text-base text-brand-black placeholder:text-brand-black/40 focus-visible:ring-0 shadow-none";

  const consentError = form.formState.errors.consent?.message;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-8 flex flex-col gap-4"
        noValidate
      >
        <div aria-hidden="true" className="sr-only">
          <label htmlFor="loyalty-website">Website</label>
          <input
            id="loyalty-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...websiteField}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-body text-sm font-semibold uppercase tracking-widest text-brand-black">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder="you@wingers.co"
                    className={inputClasses}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="font-body text-sm text-brand-black" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-body text-sm font-semibold uppercase tracking-widest text-brand-black">
                  First name{" "}
                  <span className="font-normal normal-case text-brand-black/60">
                    (optional)
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    autoComplete="given-name"
                    placeholder="Optional"
                    className={inputClasses}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="font-body text-sm text-brand-black" />
              </FormItem>
            )}
          />
        </div>

        <label className="flex items-start gap-3 font-body text-sm text-brand-black">
          <input
            id="loyalty-consent"
            type="checkbox"
            className="mt-1 h-4 w-4 flex-none rounded border-brand-black/40 accent-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-pink"
            {...consentField}
          />
          <span>{CONSENT_TEXT}</span>
        </label>
        {consentError && (
          <p className="font-body text-sm text-brand-red">{consentError}</p>
        )}

        <div className="md:self-start">
          <BrandButton
            type="submit"
            variant="primary"
            size="lg"
            disabled={isPending || consentValue !== true}
            className="w-full md:w-auto"
          >
            Sign me up
          </BrandButton>
        </div>
      </form>
    </Form>
  );
}
