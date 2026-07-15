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

const contactSchema = z.object({
  name: z.string().min(1, "Tell us your name."),
  email: z.email("Enter a valid email."),
  message: z.string().min(1, "Add a short message."),
  website: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const inputClasses =
  "h-12 w-full rounded-none border-0 bg-brand-white px-4 font-body text-base text-brand-black placeholder:text-brand-black/40 focus-visible:ring-0 shadow-none";

const textareaClasses =
  "min-h-40 w-full rounded-none border-0 bg-brand-white px-4 py-3 font-body text-base text-brand-black placeholder:text-brand-black/40 focus-visible:ring-0 shadow-none resize-y outline-none";

const labelClasses =
  "font-body text-sm font-semibold uppercase tracking-widest text-brand-black";

const messageClasses = "font-body text-sm text-brand-black";

export function ContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", website: "" },
  });

  function onSubmit(values: ContactFormValues) {
    if (values.website) {
      return;
    }
    // TODO(resend): POST to /api/contact once Resend is wired.
    console.log("contact submission", {
      name: values.name,
      email: values.email,
      message: values.message,
    });
    toast.success("You're in.", {
      description: "We'll get back to you soon.",
    });
    form.reset();
  }

  const websiteField = form.register("website");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-6"
        noValidate
      >
        <div aria-hidden="true" className="sr-only">
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...websiteField}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClasses}>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    className={inputClasses}
                    {...field}
                  />
                </FormControl>
                <FormMessage className={messageClasses} />
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
                    placeholder="you@email.com"
                    className={inputClasses}
                    {...field}
                  />
                </FormControl>
                <FormMessage className={messageClasses} />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClasses}>Message</FormLabel>
              <FormControl>
                <textarea
                  placeholder="What's on your mind?"
                  className={textareaClasses}
                  {...field}
                />
              </FormControl>
              <FormMessage className={messageClasses} />
            </FormItem>
          )}
        />

        <div>
          <BrandButton
            type="submit"
            variant="primary"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="w-full md:w-auto"
          >
            Send it
          </BrandButton>
        </div>
      </form>
    </Form>
  );
}
