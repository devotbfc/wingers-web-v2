"use client";

import Link from "next/link";
import Image from "next/image";
import { Dialog } from "radix-ui";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { XIcon } from "lucide-react";

import { BrandButton } from "@/components/brand/BrandButton";
import { FlaskGlyph } from "@/components/ui/FlaskGlyph";
import { useOrderPanel } from "@/components/sections/order-panel/order-panel-context";
import {
  LOCATIONS,
  getTodayHours,
  formatRange,
} from "@/lib/locations";
import { getCurrentLimitedEdition } from "@/lib/flavours";

interface MobileNavDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface DrawerLink {
  label: string;
  href: string;
  kind: "plain" | "lab";
}

const LINKS: DrawerLink[] = [
  { label: "Menu", href: "/menu", kind: "plain" },
  { label: "Flavour Lab", href: "/flavour-lab", kind: "lab" },
  { label: "Locations", href: "/locations", kind: "plain" },
  { label: "About", href: "/about", kind: "plain" },
  { label: "Flavour Club", href: "/loyalty", kind: "plain" },
];

const FOOTER_LINKS = [
  { label: "Allergens", href: "/allergies" },
  { label: "Opportunities", href: "/franchise" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
] as const;

export function MobileNavDrawer({ open, onOpenChange }: MobileNavDrawerProps) {
  const { openPanel } = useOrderPanel();
  const reduce = useReducedMotion();
  const currentLE = getCurrentLimitedEdition();

  const handleOrder = () => {
    onOpenChange(false);
    openPanel();
  };

  const linkInitial = reduce ? { opacity: 0 } : { opacity: 0, y: 14 };
  const linkAnimate = reduce ? { opacity: 1 } : { opacity: 1, y: 0 };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                key="mobile-nav-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="fixed inset-0 z-50 bg-lab-black/40"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount>
              <motion.div
                key="mobile-nav-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="fixed inset-0 z-50 flex flex-col bg-lab-black px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-brand-white outline-none"
              >
                <Dialog.Title className="sr-only">Site menu</Dialog.Title>
                <Dialog.Description className="sr-only">
                  Primary navigation for the Wingers site.
                </Dialog.Description>

                <div className="flex h-16 shrink-0 items-center justify-between">
                  <Link
                    href="/"
                    aria-label="Wingers home"
                    onClick={() => onOpenChange(false)}
                    className="flex items-center"
                  >
                    <Image
                      src="/brand/logo/wingers-mark.png"
                      alt=""
                      width={52}
                      height={52}
                      className="h-[52px] w-[52px]"
                    />
                  </Link>
                  <Dialog.Close
                    aria-label="Close menu"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-brand-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-pink"
                  >
                    <XIcon className="h-[18px] w-[18px] stroke-[2.6]" aria-hidden="true" />
                  </Dialog.Close>
                </div>

                <nav aria-label="Main" className="mt-4 flex flex-col">
                  {LINKS.map((link, i) => {
                    const isLab = link.kind === "lab";
                    return (
                      <motion.div
                        key={link.href}
                        initial={linkInitial}
                        animate={linkAnimate}
                        transition={{
                          duration: 0.32,
                          ease: [0.23, 1, 0.32, 1],
                          delay: reduce ? 0 : 0.04 + i * 0.04,
                        }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => onOpenChange(false)}
                          className={`flex min-h-16 items-center justify-between gap-3 border-b border-white/10 font-display text-[38px] font-extrabold uppercase leading-none tracking-tight ${isLab ? "text-brand-pink" : "text-brand-white"} focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-pink`}
                        >
                          <span className="inline-flex items-center gap-2.5">
                            {link.label}
                            {isLab && (
                              <FlaskGlyph
                                strokeWidth={2.5}
                                className="h-7 w-7 shrink-0"
                              />
                            )}
                          </span>
                          {isLab && currentLE && (
                            <span className="inline-flex items-center rounded-full bg-le-purple px-2.5 py-1 font-body text-[11px] font-bold uppercase tracking-[0.1em] text-brand-white">
                              {currentLE.name}
                            </span>
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                <div className="mt-4 flex flex-wrap gap-x-[18px] gap-y-2 font-body text-sm text-brand-white/60">
                  {FOOTER_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => onOpenChange(false)}
                      className="hover:text-brand-pink"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <div className="flex-grow" />

                <BrandButton
                  variant="primary"
                  size="lg"
                  onClick={handleOrder}
                  className="h-[58px] w-full justify-center text-lg"
                >
                  Order Now
                </BrandButton>

                <div className="mt-3 grid grid-cols-2 gap-2.5 font-body text-xs text-brand-white/60">
                  {LOCATIONS.map((loc) => {
                    const today = getTodayHours(loc);
                    return (
                      <span key={loc.slug}>
                        <b className="text-brand-white">{loc.name.replace(/^Wingers\s+/, "")}</b>
                        <br />
                        {today.closed ? "Closed today" : `Today ${formatRange(today)}`}
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
