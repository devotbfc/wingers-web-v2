"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { BrandButton } from "@/components/brand/BrandButton";
import { TopBar } from "@/components/pph/TopBar";
import { authStore } from "@/lib/pph/auth-store";
import { PphApiError, mapErrorCodeToCopy } from "@/lib/pph/errors";
import { pph } from "@/lib/pph/singleton";
import { pphOrgSlug } from "@/lib/pph/singleton";

function SignupForm() {
  const router = useRouter();
  const search = useSearchParams();
  const returnTo = search.get("returnTo") ?? "/order/menu";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = firstName && lastName && email && password.length >= 8;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await pph.signup({
        orgSlug: pphOrgSlug,
        firstName,
        lastName,
        email,
        password,
        ...(phone ? { phone } : {}),
      });
      if (!res.success) {
        setError(res.error ? mapErrorCodeToCopy(res.error.code, "signup") : "Signup failed.");
        return;
      }
      authStore.setSession(res.data);
      router.replace(returnTo);
    } catch (err) {
      if (err instanceof PphApiError) setError(mapErrorCodeToCopy(err.code, "signup"));
      else setError("Signup failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <TopBar title="Create account" backHref="/order/auth/login" />
      <main className="flex-1 p-4">
        <form onSubmit={submit} className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Input label="First name" value={firstName} onChange={setFirstName} autoComplete="given-name" />
            <Input label="Last name" value={lastName} onChange={setLastName} autoComplete="family-name" />
          </div>
          <Input label="Email" type="email" value={email} onChange={setEmail} autoComplete="email" />
          <Input label="Password (min 8)" type="password" value={password} onChange={setPassword} autoComplete="new-password" />
          <Input label="Phone (optional)" type="tel" value={phone} onChange={setPhone} autoComplete="tel" />
          {error ? <div className="text-xs text-red-700">{error}</div> : null}
          <BrandButton variant="primary" size="lg" type="submit" className="w-full" disabled={!canSubmit || submitting}>
            Become a Winger
          </BrandButton>
        </form>
        <p className="mt-4 text-center text-sm">
          Already a Winger?{" "}
          <Link href={`/order/auth/login?returnTo=${encodeURIComponent(returnTo)}`} className="text-brand-pink underline">
            Sign in
          </Link>
        </p>
      </main>
    </>
  );
}

function Input({
  label,
  type = "text",
  value,
  onChange,
  autoComplete,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase text-neutral-600">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
      />
    </label>
  );
}

export default function SignupPage() {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  );
}
