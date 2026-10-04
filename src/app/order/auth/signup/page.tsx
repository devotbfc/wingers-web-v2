"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
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
      <main className="flex-1 p-6">
        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input label="First name" value={firstName} onChange={setFirstName} autoComplete="given-name" />
            <Input label="Last name" value={lastName} onChange={setLastName} autoComplete="family-name" />
          </div>
          <Input label="Email" type="email" value={email} onChange={setEmail} autoComplete="email" />
          <Input
            label="Password (min 8)"
            type="password"
            value={password}
            onChange={setPassword}
            autoComplete="new-password"
          />
          <Input label="Phone (optional)" type="tel" value={phone} onChange={setPhone} autoComplete="tel" />
          {error ? <div className="font-body text-[12px] text-pph-red">{error}</div> : null}
          <button
            type="submit"
            disabled={!canSubmit || submitting}
            className={`h-14 w-full rounded-pill font-display text-[15px] uppercase ${
              !canSubmit || submitting
                ? "bg-pph-elevated text-pph-muted"
                : "bg-pph-pink text-pph-on-pink hover:brightness-95"
            }`}
          >
            Become a Winger
          </button>
        </form>
        <p className="mt-6 text-center font-body text-[14px] text-pph-muted">
          Already a Winger?{" "}
          <Link
            href={`/order/auth/login?returnTo=${encodeURIComponent(returnTo)}`}
            className="font-display uppercase text-pph-pink underline"
          >
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
      <span className="mb-1.5 block font-display text-[11px] uppercase tracking-widest text-pph-muted">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        className="h-12 w-full rounded-pill bg-pph-elevated px-5 font-body text-[14px] text-pph placeholder:text-pph-muted"
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
