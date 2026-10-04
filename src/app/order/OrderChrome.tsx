"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lock } from "lucide-react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Footer } from "@/components/sections/Footer";
import { NavBar } from "@/components/sections/NavBar";
import { OrderSubBar } from "@/components/pph/OrderSubBar";

// Routes that should sit under the full site chrome (NavBar + sub-bar +
// Footer). Auth gets the site NavBar but skips the sub-bar so we don't
// show "Pickup · Milton Keynes" over a sign-in form.
function isBrowseRoute(pathname: string): boolean {
  if (pathname.startsWith("/order/checkout")) return false;
  return pathname.startsWith("/order");
}

function showsSubBar(pathname: string): boolean {
  if (!isBrowseRoute(pathname)) return false;
  if (pathname.startsWith("/order/auth")) return false;
  return true;
}

export function OrderChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/order";
  const browse = isBrowseRoute(pathname);
  const subBar = showsSubBar(pathname);

  if (!browse) {
    return <FocusedShell>{children}</FocusedShell>;
  }

  return (
    <>
      <NavBar />
      {subBar ? <OrderSubBar /> : null}
      <main
        className={
          subBar
            ? "flex-1 pt-32 md:pt-36"
            : "flex-1 pt-20 md:pt-24"
        }
      >
        {children}
      </main>
      <Footer />
    </>
  );
}

// Focused checkout: no NavBar / Footer / burger. A single-column max-w-lg
// surface with a thin branded header that offers "back to basket" and a
// Secure checkout lock label so the user knows they're committing to pay.
function FocusedShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-30 border-b border-brand-black/10 bg-brand-white">
        <div className="mx-auto flex h-16 w-full max-w-lg items-center justify-between gap-3 px-4">
          <Link
            href="/"
            aria-label="Wingers home"
            className="flex items-center"
          >
            <BrandLogo
              variant="pink"
              type="mark"
              width={36}
              height={36}
              className="h-9 w-9"
            />
          </Link>
          <Link
            href="/order/basket"
            className="font-display text-[12px] uppercase tracking-wide text-brand-black hover:text-brand-red focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red"
          >
            ‹ Back to basket
          </Link>
          <span className="inline-flex items-center gap-1.5 font-body text-[11px] uppercase tracking-wide text-brand-black/60">
            <Lock className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
            Secure checkout
          </span>
        </div>
      </header>
      <main className="mx-auto w-full max-w-lg flex-1 px-4 pb-10 pt-6">
        {children}
      </main>
    </>
  );
}
