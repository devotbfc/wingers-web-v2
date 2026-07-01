"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useOrderPanel } from "./order-panel/order-panel-context";

const NAV_LINKS = [
  { label: "Menu", href: "/menu" },
  { label: "Locations", href: "/locations" },
  { label: "About", href: "/about" },
] as const;

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openPanel } = useOrderPanel();

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

  const handleOrderClick = () => {
    setMobileOpen(false);
    openPanel();
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-colors duration-200",
        scrolled
          ? "bg-brand-white border-b border-brand-black/10"
          : "bg-transparent"
      )}
    >
      <nav
        aria-label="Primary"
        className="flex items-center justify-between gap-6 px-4 md:px-8 h-16 md:h-20"
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
            className="h-10 w-10 md:h-12 md:w-12"
          />
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "font-display font-bold uppercase tracking-wide text-sm transition-colors",
                  scrolled
                    ? "text-brand-black hover:text-brand-red"
                    : "text-brand-white hover:text-brand-pink"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={openPanel}
              className={cn(
                "font-display font-bold uppercase tracking-wide text-sm px-5 h-10 transition-colors",
                scrolled
                  ? "bg-brand-red text-brand-white hover:bg-brand-pink hover:text-brand-black"
                  : "bg-brand-pink text-brand-black hover:bg-brand-white"
              )}
            >
              Order
            </button>
          </li>
        </ul>

        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
          className={cn(
            "md:hidden inline-flex items-center justify-center h-10 w-10 transition-colors",
            scrolled ? "text-brand-black" : "text-brand-white"
          )}
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </nav>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="right"
          showCloseButton={false}
          className="bg-brand-black text-brand-white border-l-2 border-brand-pink w-full sm:max-w-sm p-0"
        >
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <div className="flex items-center justify-between h-16 px-4 border-b border-brand-white/10">
            <BrandLogo
              variant="pink"
              type="mark"
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center h-10 w-10 text-brand-white"
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
                  className="block font-display font-extrabold uppercase tracking-tight text-3xl text-brand-white hover:text-brand-pink transition-colors py-2"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-4">
              <button
                type="button"
                onClick={handleOrderClick}
                className="w-full bg-brand-pink text-brand-black font-display font-extrabold uppercase tracking-tight text-3xl py-4 hover:bg-brand-white transition-colors"
              >
                Order
              </button>
            </li>
          </ul>
        </SheetContent>
      </Sheet>
    </header>
  );
}
