"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { BrandButton } from "@/components/brand/BrandButton";
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
      <main className="flex-1 p-4">
        <form onSubmit={submit} className="space-y-3">
          <label className="block">
            <span className="text-xs font-bold uppercase text-neutral-600">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-xs font-bold uppercase text-neutral-600">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
            />
          </label>
          {error ? <div className="text-xs text-red-700">{error}</div> : null}
          <BrandButton variant="primary" size="lg" type="submit" className="w-full" disabled={submitting}>
            Sign in
          </BrandButton>
        </form>
        <p className="mt-4 text-center text-sm">
          New here?{" "}
          <Link href={`/order/auth/signup?returnTo=${encodeURIComponent(returnTo)}`} className="text-brand-pink underline">
            Create an account
          </Link>
        </p>
      </main>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
