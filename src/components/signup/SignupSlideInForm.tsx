"use client";

import Image from "next/image";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { signupLoyalty } from "@/app/actions/loyalty";
import { track } from "@/lib/analytics/meta-pixel";
import { BrandButton } from "@/components/brand/BrandButton";
import {
  CONSENT_TEXT,
  CONSENT_TEXT_VERSION,
} from "@/lib/consent/text-version";

const schema = z.object({
  email: z.email("Enter a valid email."),
  consent: z
    .boolean()
    .refine((v) => v === true, "Tick the box to continue."),
  website: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

interface SignupSlideInFormProps {
  onSuccess: () => void;
  titleId: string;
}

export function SignupSlideInForm({
  onSuccess,
  titleId,
}: SignupSlideInFormProps) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", consent: false, website: "" },
    mode: "onChange",
  });

  const consentValue = form.watch("consent");
  const emailError = form.formState.errors.email?.message;

  function onSubmit(values: FormValues) {
    startTransition(async () => {
      const result = await signupLoyalty({
        email: values.email,
        source: "signup_slidein",
        marketing_consent: values.consent === true,
        consent_text_version: CONSENT_TEXT_VERSION,
        website: values.website,
      });
      if (result.ok) {
        track("Lead");
        onSuccess();
      } else {
        toast.error("Something went wrong. Try again in a moment.");
      }
    });
  }

  return (
    <div className="pr-9">
      <Image
        src="/brand/logo/wingers-mark-512.png"
        alt=""
        width={48}
        height={48}
        aria-hidden
        className="h-10 w-10 brightness-0"
      />
      <p className="mt-3 font-display text-[11px] font-bold uppercase tracking-[0.25em] text-brand-black">
        The Flavour Club
      </p>
      <h2
        id={titleId}
        className="mt-1 font-display text-[1.75rem] font-extrabold uppercase leading-[0.95] tracking-tight text-brand-black md:text-[2rem]"
      >
        First dibs on every drop.
      </h2>
      <p className="mt-2 font-body text-sm leading-snug text-brand-black/80">
        New flavours, before anyone else.
      </p>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-4 grid gap-3"
        noValidate
      >
        <div aria-hidden className="sr-only">
          <label htmlFor="signup-slidein-website">Website</label>
          <input
            id="signup-slidein-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...form.register("website")}
          />
        </div>

        <label className="block font-body text-xs font-semibold uppercase tracking-widest text-brand-black">
          Email
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@wingers.co"
            {...form.register("email")}
            className="mt-1 block h-12 w-full rounded-full border-2 border-brand-black bg-brand-white px-5 font-body text-base text-brand-black placeholder:text-brand-black/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-black"
          />
        </label>
        {emailError && (
          <p className="font-body text-xs text-brand-black/90">{emailError}</p>
        )}

        <label className="flex items-start gap-2 font-body text-sm text-brand-black">
          <input
            type="checkbox"
            {...form.register("consent")}
            className="mt-1 h-4 w-4 flex-none rounded border-brand-black/40 accent-brand-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-black"
          />
          <span>{CONSENT_TEXT}</span>
        </label>

        <BrandButton
          type="submit"
          variant="primary"
          size="md"
          disabled={isPending || consentValue !== true}
          className="w-full justify-center"
        >
          {isPending ? "Signing you up…" : "Sign me up"}
        </BrandButton>
        <p className="mt-1 text-center font-body text-xs text-brand-black/70">
          No spam. Unsubscribe any time.
        </p>
      </form>
    </div>
  );
}
