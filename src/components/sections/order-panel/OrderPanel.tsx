"use client";

import { useEffect, useMemo } from "react";
import { Dialog } from "radix-ui";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, XIcon } from "lucide-react";

import { BrandButton } from "@/components/brand/BrandButton";
import { useConsent } from "@/components/consent/ConsentProvider";
import {
  LOCATIONS,
  getTodayHours,
  isOpenNow,
  type Location,
} from "@/lib/locations";
import { getProviderForLocation } from "@/lib/order/providers";
import { track } from "@/lib/analytics/meta-pixel";
import {
  appendFbclidToUrl,
  readFbcCookie,
  readFbclidFromUrl,
} from "@/lib/analytics/fbclid";
import { useOrderPanel } from "./order-panel-context";
import { OPEN_ORDER_EVENT } from "./events";

// Status pill per PopupOrder.dc.html — "Open · till HH:MM" when currently
// open; "Opens HH:MM" when today has hours still to come; "Closed" otherwise.
function statusFor(loc: Location): { label: string; open: boolean } {
  if (isOpenNow(loc)) {
    return { label: `Open · till ${getTodayHours(loc).close}`, open: true };
  }
  const today = getTodayHours(loc);
  if (!today.closed) {
    // Treat "already closed for the day" as closed too — the pre-open window
    // is the only case where "Opens HH:MM" is useful.
    return { label: `Opens ${today.open}`, open: false };
  }
  return { label: "Closed", open: false };
}

// Radix Dialog powers focus-trap, Escape handling, aria wiring and body
// scroll lock. Motion drives the visible open/close so the handoff feels
// physical — spring up, ease-out backdrop leading by 40ms, 55ms stagger
// across the two location cards. forceMount keeps Radix's DOM alive for the
// duration of the exit animation; AnimatePresence unmounts after.
//
// Local to OrderPanel. The shared Sheet (src/components/ui/sheet.tsx) still
// drives LocationPicker and other consumers — not touched.
export function OrderPanel() {
  const { open, setOpen, preferredLocationSlug, openPanel } = useOrderPanel();
  const { status: consentStatus } = useConsent();
  const reduced = useReducedMotion();

  useEffect(() => {
    function handler(event: Event) {
      const detail = (event as CustomEvent<{ preferredLocationSlug?: string }>)
        .detail;
      openPanel(detail?.preferredLocationSlug);
    }
    window.addEventListener(OPEN_ORDER_EVENT, handler);
    return () => window.removeEventListener(OPEN_ORDER_EVENT, handler);
  }, [openPanel]);

  // fbclid gate on consent (PECR — click identifier is non-essential tracking).
  // useMemo keyed on consentStatus: recomputes on the "unknown" → "accepted"
  // flip (which is the point at which the read becomes valid), then caches for
  // the lifetime of this OrderPanel instance.
  const fbclid = useMemo<string | null>(() => {
    if (consentStatus !== "accepted") return null;
    return readFbclidFromUrl() ?? readFbcCookie();
  }, [consentStatus]);

  const overlayVariants: import("motion/react").Variants = reduced
    ? {
        initial: { opacity: 0 },
        animate: {
          opacity: 1,
          transition: { duration: 0.16, ease: "linear" as const },
        },
        exit: {
          opacity: 0,
          transition: { duration: 0.16, ease: "linear" as const },
        },
      }
    : {
        initial: { opacity: 0 },
        animate: {
          opacity: 1,
          transition: { duration: 0.22, ease: "easeOut" as const },
        },
        exit: {
          opacity: 0,
          transition: { duration: 0.2, ease: "easeOut" as const },
        },
      };

  const panelVariants: import("motion/react").Variants = reduced
    ? {
        initial: { opacity: 0 },
        animate: {
          opacity: 1,
          transition: { duration: 0.16, ease: "linear" as const },
        },
        exit: {
          opacity: 0,
          transition: { duration: 0.16, ease: "linear" as const },
        },
      }
    : {
        initial: { y: "100%" },
        animate: {
          y: 0,
          transition: {
            type: "spring" as const,
            stiffness: 480,
            damping: 36,
            mass: 0.9,
            // Panel trails backdrop by 40ms so the dark scrim lands first.
            delay: 0.04,
          },
        },
        exit: {
          y: "100%",
          transition: {
            duration: 0.24,
            ease: [0.4, 0, 1, 1] as [number, number, number, number],
          },
        },
      };

  // Stagger container: the cards' <ul> starts its stagger 120ms after the
  // panel begins to open so children don't race the backdrop.
  const listVariants: import("motion/react").Variants = reduced
    ? { initial: {}, animate: {}, exit: {} }
    : {
        initial: {},
        animate: {
          transition: { delayChildren: 0.12, staggerChildren: 0.055 },
        },
        exit: {},
      };

  const cardVariants: import("motion/react").Variants = reduced
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.16 } },
      }
    : {
        initial: { opacity: 0, y: 10 },
        animate: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.22, ease: "easeOut" as const },
        },
      };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                key="order-panel-overlay"
                variants={overlayVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="fixed inset-0 z-50 bg-black/50"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount>
              <motion.div
                key="order-panel-content"
                variants={panelVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="fixed inset-x-0 bottom-0 z-50 flex max-h-[85vh] flex-col gap-4 bg-brand-white text-brand-black outline-none md:inset-auto md:left-1/2 md:top-1/2 md:w-[760px] md:max-w-[calc(100vw-3rem)] md:max-h-[90vh] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-[32px]"
              >
                <header className="flex flex-col gap-1.5 px-6 pt-6 pb-2 md:pt-8">
                  {/* Mobile-only drag handle (board detail). */}
                  <div
                    aria-hidden="true"
                    className="mx-auto mb-2 h-[5px] w-11 rounded-full bg-brand-warm-grey md:hidden"
                  />
                  <Dialog.Title asChild>
                    <h2 className="font-display text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-brand-black">
                      Order from your nearest Wingers
                    </h2>
                  </Dialog.Title>
                  <Dialog.Description asChild>
                    <p className="font-body text-base text-brand-black/70">
                      Pick a location — we&rsquo;ll hand you off to its ordering
                      platform.
                    </p>
                  </Dialog.Description>
                </header>

                <motion.ul
                  variants={listVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="grid gap-4 px-6 pb-8 md:grid-cols-2 overscroll-contain overflow-y-auto"
                >
                  {LOCATIONS.map((loc) => {
                    const provider = getProviderForLocation(loc);
                    const rawHref = provider.getOrderUrl(loc);
                    const href = appendFbclidToUrl(rawHref, fbclid);
                    const site =
                      loc.slug === "milton-keynes" ? "mk" : "nth";
                    const isPreferred =
                      loc.slug === preferredLocationSlug;
                    const status = statusFor(loc);
                    return (
                      <motion.li
                        key={loc.slug}
                        variants={cardVariants}
                        className={`flex flex-col gap-3 rounded-[26px] border-2 bg-brand-pink p-4 text-brand-black ${isPreferred ? "border-brand-black" : "border-transparent"}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex flex-col gap-1">
                            {isPreferred && (
                              <span className="font-display text-[10px] font-extrabold uppercase tracking-[0.25em] text-brand-black">
                                Your shop
                              </span>
                            )}
                            <h3 className="font-display text-xl font-extrabold uppercase leading-none tracking-tight text-brand-black md:text-2xl">
                              {loc.name}
                            </h3>
                          </div>
                          <span
                            aria-label={status.label}
                            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand-white px-2.5 py-1 font-body text-[12px] font-semibold text-brand-black"
                          >
                            <span
                              aria-hidden="true"
                              className="inline-block h-[7px] w-[7px] rounded-full"
                              style={{
                                backgroundColor: status.open
                                  ? "#2BB673"
                                  : "#8A857E",
                              }}
                            />
                            {status.label}
                          </span>
                        </div>
                        <p className="font-body text-sm leading-snug text-brand-black">
                          {loc.address.street}
                          <br />
                          {loc.address.city}, {loc.address.postcode}
                        </p>
                        <BrandButton
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="primary"
                          size="lg"
                          className="w-full justify-center gap-2"
                          aria-label={`Order from ${loc.name} (opens in new tab)`}
                          onClick={() =>
                            track("InitiateCheckout", {
                              content_category: site,
                              destination: href,
                            })
                          }
                        >
                          Order
                          <ArrowUpRight
                            className="h-4 w-4 stroke-[2.6]"
                            aria-hidden="true"
                          />
                        </BrandButton>
                      </motion.li>
                    );
                  })}
                </motion.ul>

                <Dialog.Close
                  className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-brand-black/70 opacity-70 ring-offset-brand-white transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink focus-visible:ring-offset-2"
                  aria-label="Close"
                >
                  <XIcon className="size-5" />
                </Dialog.Close>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
