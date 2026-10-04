"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { BrandButton } from "@/components/brand/BrandButton";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { BucketIcon } from "@/components/pph/icons/BucketIcon";
import { FlaskGlyph } from "@/components/ui/FlaskGlyph";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/lib/cart/context";
import { useAuth } from "@/lib/pph/auth-store";
import { cn } from "@/lib/utils";
import { useOrderPanel } from "./order-panel/order-panel-context";

const NAV_LINKS = [
  { label: "Menu", href: "/menu" },
  { label: "Locations", href: "/locations" },
  { label: "About", href: "/about" },
] as const;

interface NavBarProps {
  // Set on routes whose top-of-page strip is dark (homepage hero, flavour-lab).
  // Everything else leaves it unset and gets dark links on a light page.
  onDark?: boolean;
}

export function NavBar({ onDark = false }: NavBarProps = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isOrderRoute = pathname?.startsWith("/order") ?? false;

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 16);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On /order/* we always sit on a light page — force the white backdrop and
  // the dark link treatment regardless of scroll / onDark. Elsewhere the
  // original transparent-on-top → white-on-scroll behaviour is preserved.
  const solid = isOrderRoute || scrolled;
  const darkTextOnTop = isOrderRoute || scrolled || !onDark;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-colors duration-200",
        solid ? "bg-brand-white" : "bg-transparent"
      )}
    >
      <nav
        aria-label="Primary"
        className="flex items-center justify-between gap-6 px-4 md:px-8 h-20 md:h-24"
      >
        <Link
          href="/"
          aria-label="Wingers home"
          className="flex items-center"
        >
          <BrandLogo
            variant="pink"
            type="mark"
            width={48}
            height={48}
            className="h-12 w-12 md:h-14 md:w-14"
          />
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "font-display font-bold uppercase tracking-wide text-sm transition-colors",
                  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red",
                  darkTextOnTop
                    ? "text-brand-black hover:text-brand-red"
                    : "text-brand-white hover:text-brand-pink"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/flavour-lab"
              className={cn(
                "relative pl-[calc(2em+0.5rem)] font-display font-bold uppercase tracking-wide text-sm transition-colors",
                "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red",
                "text-brand-pink hover:text-brand-red",
              )}
            >
              <FlaskGlyph
                strokeWidth={4}
                className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 h-[2em] w-[2em]"
              />
              Lab
            </Link>
          </li>
          <li>
            {isOrderRoute ? <AppDesktopCta /> : <SiteDesktopCta />}
          </li>
        </ul>

        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
          className={cn(
            "md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md transition-colors",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red",
            darkTextOnTop ? "text-brand-black" : "text-brand-white"
          )}
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </nav>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="right"
          showCloseButton={false}
          className="bg-brand-white text-brand-black w-full sm:max-w-sm p-0"
        >
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <div className="flex items-center justify-between h-16 px-4">
            <Link
              href="/"
              aria-label="Wingers home"
              onClick={() => setMobileOpen(false)}
              className="flex items-center"
            >
              <BrandLogo
                variant="pink"
                type="mark"
                width={40}
                height={40}
                className="h-10 w-10"
              />
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center h-10 w-10 rounded-md text-brand-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <ul className="flex flex-col gap-2 p-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block font-display font-extrabold uppercase tracking-tight text-3xl text-brand-black hover:text-brand-red transition-colors py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/flavour-lab"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center gap-3 font-display font-extrabold uppercase tracking-tight text-3xl text-brand-pink hover:text-brand-red transition-colors py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red"
              >
                Lab
                <FlaskGlyph
                  strokeWidth={3}
                  className="h-[1em] w-[1em] shrink-0"
                />
              </Link>
            </li>
            {isOrderRoute ? (
              <AppMobileRows onNavigate={() => setMobileOpen(false)} />
            ) : (
              <SiteMobileCta onNavigate={() => setMobileOpen(false)} />
            )}
          </ul>
        </SheetContent>
      </Sheet>
    </header>
  );
}

// --- Site CTA cluster (non-/order routes) -------------------------------
// Mounted only outside /order/*, where OrderPanelProvider wraps the page.

function SiteDesktopCta() {
  const { openPanel } = useOrderPanel();
  return (
    <BrandButton
      variant="primary"
      size="md"
      onClick={() => openPanel()}
      className="text-sm px-5"
    >
      Order
    </BrandButton>
  );
}

function SiteMobileCta({ onNavigate }: { onNavigate: () => void }) {
  const { openPanel } = useOrderPanel();
  return (
    <li className="mt-4">
      <BrandButton
        variant="primary"
        size="lg"
        onClick={() => {
          onNavigate();
          openPanel();
        }}
        className="w-full justify-center h-auto py-4 text-3xl font-extrabold tracking-tight"
      >
        Order
      </BrandButton>
    </li>
  );
}

// --- App CTA cluster (/order/* routes) ----------------------------------
// Mounted only under /order/*, where PphProviders wraps the subtree so
// useCart + useAuth resolve. Replaces the site ORDER CTA with a SIGN IN
// pill (unauth) or HI, FIRSTNAME greeting (auth) linking to /order/auth
// routes, plus a multi-coloured BucketIcon basket with a count badge.

function AppDesktopCta() {
  const { itemCount } = useCart();
  const auth = useAuth();
  const signedIn = auth.status === "authenticated";
  const firstName = auth.user?.firstName ?? "";
  const firstNameLabel = firstName.slice(0, 12).toUpperCase();
  const basketLabel =
    itemCount > 0
      ? `Basket, ${itemCount} ${itemCount === 1 ? "item" : "items"}`
      : "Basket";
  return (
    <div className="flex items-center gap-4">
      {signedIn ? (
        <Link
          href="/order/account"
          className="font-display font-bold uppercase text-[13px] tracking-[0.04em] text-brand-black hover:text-brand-red focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red"
        >
          HI, {firstNameLabel}
        </Link>
      ) : (
        <Link
          href="/order/auth/login"
          className="inline-flex h-[34px] items-center rounded-full border-2 border-brand-black px-[14px] font-display font-bold uppercase text-[13px] tracking-[0.04em] text-brand-black hover:border-brand-red hover:text-brand-red focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red"
        >
          Sign in
        </Link>
      )}
      <Link
        href="/order/basket"
        aria-label={basketLabel}
        className="relative inline-flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red"
      >
        <BucketIcon width={30} height={30} aria-label={basketLabel} />
        {itemCount > 0 ? (
          <span
            aria-hidden="true"
            className="absolute -top-1 -right-1 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-brand-black px-1 font-display text-[11px] font-bold leading-none text-brand-white"
          >
            {itemCount}
          </span>
        ) : null}
      </Link>
    </div>
  );
}

function AppMobileRows({ onNavigate }: { onNavigate: () => void }) {
  const { itemCount } = useCart();
  const auth = useAuth();
  const signedIn = auth.status === "authenticated";
  const firstName = auth.user?.firstName ?? "";
  const firstNameLabel = firstName.slice(0, 12).toUpperCase();
  const basketLabel =
    itemCount > 0
      ? `Basket, ${itemCount} ${itemCount === 1 ? "item" : "items"}`
      : "Basket";
  return (
    <>
      <li className="mt-4">
        <Link
          href="/order/basket"
          onClick={onNavigate}
          className="flex items-center justify-between font-display font-extrabold uppercase tracking-tight text-3xl text-brand-black hover:text-brand-red transition-colors py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red"
        >
          <span className="inline-flex items-center gap-3">
            <BucketIcon width={32} height={32} aria-label={basketLabel} />
            <span>Basket</span>
          </span>
          <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-full bg-brand-black px-3 font-display text-base font-bold text-brand-white">
            {itemCount}
          </span>
        </Link>
      </li>
      <li>
        <Link
          href={signedIn ? "/order/account" : "/order/auth/login"}
          onClick={onNavigate}
          className="block font-display font-extrabold uppercase tracking-tight text-3xl text-brand-black hover:text-brand-red transition-colors py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red"
        >
          {signedIn ? `Hi, ${firstNameLabel}` : "Sign in"}
        </Link>
      </li>
    </>
  );
}
