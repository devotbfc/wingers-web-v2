"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

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

const loyaltySchema = z.object({
  email: z.email("Enter a valid email."),
  name: z.string().max(60, "Keep it under 60 characters.").optional(),
});

type LoyaltyFormValues = z.infer<typeof loyaltySchema>;

export function LoyaltySignupForm() {
  const form = useForm<LoyaltyFormValues>({
    resolver: zodResolver(loyaltySchema),
    defaultValues: { email: "", name: "" },
  });

  function onSubmit(values: LoyaltyFormValues) {
    // TODO(supabase): dual-write to Supabase + Mailchimp per ADR-010.
    // Replace this console.log with a fetch("/api/loyalty/signup") call.
    console.log("loyalty signup", values);
    toast.success("You're in.", {
      description: "Watch your inbox for Wingers drops.",
    });
    form.reset();
  }

  const inputClasses =
    "h-12 w-full rounded-none border-2 border-brand-black bg-brand-white px-4 font-body text-base text-brand-black placeholder:text-brand-black/40 focus-visible:ring-0 focus-visible:border-brand-black shadow-none";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-8 grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-start"
        noValidate
      >
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
                  placeholder="you@wingers.club"
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

        <div className="md:pt-[30px]">
          <BrandButton
            type="submit"
            variant="primary"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="w-full md:w-auto"
          >
            Sign me up
          </BrandButton>
        </div>
      </form>
    </Form>
  );
}
