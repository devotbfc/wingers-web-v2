"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { BrandButton } from "@/components/brand/BrandButton";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { FlaskGlyph } from "@/components/ui/FlaskGlyph";
import { MobileNavDrawer } from "@/components/nav/MobileNavDrawer";
import { cn } from "@/lib/utils";
import { useOrderPanel } from "./order-panel/order-panel-context";

// Batch J nav order: Menu · Flavour Lab (plain link + flask) · Locations ·
// About · Flavour Club · ORDER. Flavour Lab is NOT a pill — just a link
// with FlaskGlyph at the END of the label. Flavour Club points at /loyalty
// (route name stays; UI copy flips to "The Flavour Club" in J4).
const NAV_LINKS = [
  { label: "Menu", href: "/menu", kind: "plain" },
  { label: "Flavour Lab", href: "/flavour-lab", kind: "lab" },
  { label: "Locations", href: "/locations", kind: "plain" },
  { label: "About", href: "/about", kind: "plain" },
  { label: "Flavour Club", href: "/loyalty", kind: "plain" },
] as const;

interface NavBarProps {
  // Set on routes whose top-of-page strip is dark (homepage hero, flavour-lab).
  // Everything else leaves it unset and gets dark links on a light page.
  onDark?: boolean;
}

export function NavBar({ onDark = false }: NavBarProps = {}) {
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

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-colors duration-200",
        scrolled ? "bg-brand-white" : "bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="flex items-center justify-between gap-6 px-4 md:px-8 h-20 md:h-24"
      >
        <Link href="/" aria-label="Wingers home" className="flex items-center">
          <BrandLogo
            variant="pink"
            type="mark"
            width={48}
            height={48}
            className="h-12 w-12 md:h-14 md:w-14"
          />
        </Link>

        <ul className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => {
            const isLab = link.kind === "lab";
            const onLight = scrolled || !onDark;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "inline-flex items-center gap-1.5 font-display font-bold uppercase tracking-wide text-sm transition-colors",
                    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red",
                    isLab
                      ? "text-brand-pink hover:text-brand-red"
                      : onLight
                        ? "text-brand-black hover:text-brand-red"
                        : "text-brand-white hover:text-brand-pink",
                  )}
                >
                  {link.label}
                  {isLab && (
                    <FlaskGlyph
                      strokeWidth={2.5}
                      className="pointer-events-none h-[1.1em] w-[1.1em] shrink-0"
                    />
                  )}
                </Link>
              </li>
            );
          })}
          <li>
            <BrandButton
              variant="primary"
              size="md"
              onClick={() => openPanel()}
              className="text-sm px-5"
            >
              Order
            </BrandButton>
          </li>
        </ul>

        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
          className={cn(
            "md:hidden inline-flex items-center justify-center h-11 w-11 rounded-full transition-colors",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red",
            scrolled || !onDark ? "text-brand-black" : "text-brand-white",
          )}
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </nav>

      <MobileNavDrawer open={mobileOpen} onOpenChange={setMobileOpen} />
    </header>
  );
}
