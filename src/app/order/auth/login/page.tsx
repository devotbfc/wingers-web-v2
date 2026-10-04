"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { TopBar } from "@/components/pph/TopBar";
import { authStore } from "@/lib/pph/auth-store";
import { PphApiError, mapErrorCodeToCopy } from "@/lib/pph/errors";
import { pph } from "@/lib/pph/singleton";

function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const returnTo = search.get("returnTo") ?? "/order/menu";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await pph.login(email, password);
      if (!res.success) {
        setError(res.error ? mapErrorCodeToCopy(res.error.code, "login") : "Login failed.");
        return;
      }
      authStore.setSession(res.data);
      router.replace(returnTo);
    } catch (err) {
      if (err instanceof PphApiError) setError(mapErrorCodeToCopy(err.code, "login"));
      else setError("Login failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <TopBar title="Sign in" backHref="/order/menu" />
      <main className="flex-1 p-6">
        <form onSubmit={submit} className="space-y-4">
          <Field label="Email">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="h-12 w-full rounded-pill bg-pph-elevated px-5 font-body text-[14px] text-pph placeholder:text-pph-muted"
            />
          </Field>
          <Field label="Password">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="h-12 w-full rounded-pill bg-pph-elevated px-5 font-body text-[14px] text-pph placeholder:text-pph-muted"
            />
          </Field>
          {error ? <div className="font-body text-[12px] text-pph-red">{error}</div> : null}
          <button
            type="submit"
            disabled={submitting}
            className={`h-14 w-full rounded-pill font-display text-[15px] uppercase ${
              submitting ? "bg-pph-elevated text-pph-muted" : "bg-pph-pink text-pph-bg hover:brightness-95"
            }`}
          >
            Sign in
          </button>
        </form>
        <p className="mt-6 text-center font-body text-[14px] text-pph-muted">
          New here?{" "}
          <Link
            href={`/order/auth/signup?returnTo=${encodeURIComponent(returnTo)}`}
            className="font-display uppercase text-pph-pink underline"
          >
            Create an account
          </Link>
        </p>
      </main>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-display text-[11px] uppercase tracking-widest text-pph-muted">
        {label}
      </span>
      {children}
    </label>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
