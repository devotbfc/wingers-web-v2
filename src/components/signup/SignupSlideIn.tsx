"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { BrandButton } from "@/components/brand/BrandButton";
import { OPEN_ORDER_EVENT } from "@/components/sections/order-panel/events";
import type { Flavour } from "@/lib/flavours";

import { SignupSlideInForm } from "./SignupSlideInForm";

type Step = "le" | "email" | "success";

// Same stand-in used by the home `KatsuDrop` card so we don't fork image
// paths. When Benson's per-flavour LE photo lands, swap it in one place.
const LE_PHOTO_SRC = "/brand/photos/hero/hero-poster.webp";
const LE_MASK_SRC = "/brand/logo/wingers-mark.png";

// Shared cubic-bezier for all slide-in motion. Matches CLAUDE.md spec and
// the J design brief.
const PANEL_EASE = [0.23, 1, 0.32, 1] as [number, number, number, number];

interface SignupSlideInProps {
  open: boolean;
  currentLE: Flavour | null;
  onDismiss: () => void;
  onCompleted: () => void;
}

export function SignupSlideIn({
  open,
  currentLE,
  onDismiss,
  onCompleted,
}: SignupSlideInProps) {
  const [step, setStep] = useState<Step>(currentLE ? "le" : "email");
  const panelRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    // Focus the panel itself (tabIndex={-1}, outline-none) rather than the
    // close X. Screen readers still land inside the dialog; Tab reaches
    // the X first; and mouse/touch opens don't show a focus ring on X.
    panelRef.current?.focus();

    // Advertise open state to peer floating UI (e.g. BackToTopButton) via a
    // body dataset flag so it can step aside on mobile without pulling in a
    // shared context.
    document.body.dataset.signupOpen = "true";

    const FOCUSABLE =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    function focusableElements(): HTMLElement[] {
      const root = panelRef.current;
      if (!root) return [];
      return Array.from(
        root.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.stopPropagation();
        onDismiss();
        return;
      }
      if (e.key !== "Tab") return;
      // Focus trap: cycle focus within the panel. With a backdrop + body
      // scroll-lock + aria-modal, Tab must stay inside the dialog.
      const focusables = focusableElements();
      if (focusables.length === 0) {
        e.preventDefault();
        panelRef.current?.focus();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey) {
        if (active === first || active === panelRef.current) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      delete document.body.dataset.signupOpen;
      try {
        previousFocus?.focus();
      } catch {}
    };
  }, [open, onDismiss]);

  function handleOrder() {
    window.dispatchEvent(new CustomEvent(OPEN_ORDER_EVENT));
    onDismiss();
  }

  function handleSuccess() {
    setStep("success");
    window.setTimeout(onCompleted, 2500);
  }

  const panelVariants = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 },
      };

  const isDark = step === "le";
  const panelSurface = isDark
    ? "bg-lab-black text-brand-white border-brand-pink/40 shadow-[0_-8px_28px_rgba(0,0,0,0.5)] md:border-brand-pink/40 md:shadow-[0_12px_32px_rgba(0,0,0,0.45)]"
    : "bg-brand-pink text-brand-black border-brand-black/10 shadow-[0_-8px_28px_rgba(0,0,0,0.14)] md:border-brand-black/10 md:shadow-[0_12px_32px_rgba(0,0,0,0.18)]";
  const closeTone = isDark
    ? "text-brand-white/80 hover:text-brand-white focus-visible:outline-brand-pink"
    : "text-brand-black/70 hover:text-brand-black focus-visible:outline-brand-black";

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Mobile-only backdrop. Desktop is non-modal — no backdrop, no trap. */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-brand-black/40 md:hidden"
            onClick={onDismiss}
            aria-hidden
          />
          <motion.div
            key="panel"
            ref={panelRef}
            role="dialog"
            aria-labelledby={titleId}
            aria-modal={true}
            tabIndex={-1}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={panelVariants}
            transition={{ duration: reduced ? 0.2 : 0.28, ease: PANEL_EASE }}
            className={`fixed inset-x-0 bottom-0 z-40 w-full overflow-hidden rounded-t-[28px] border-t px-6 pt-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] outline-none transition-colors duration-200 md:inset-auto md:bottom-6 md:left-6 md:w-[380px] md:max-w-[calc(100vw-3rem)] md:rounded-[28px] md:border md:px-5 md:pb-5 md:pt-4 ${panelSurface}`}
          >
            <button
              type="button"
              onClick={onDismiss}
              aria-label="Dismiss sign-up"
              className={`absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 ${closeTone}`}
            >
              <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5">
                <path
                  fill="currentColor"
                  d="M18.3 5.71 12 12.01l-6.29-6.3-1.42 1.42 6.3 6.29-6.3 6.29 1.42 1.42 6.29-6.3 6.29 6.3 1.42-1.42-6.3-6.29 6.3-6.29z"
                />
              </svg>
            </button>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={
                  reduced
                    ? { opacity: 1, transition: { duration: 0 } }
                    : {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.22,
                          ease: PANEL_EASE,
                        },
                      }
                }
                exit={
                  reduced
                    ? { opacity: 0, transition: { duration: 0 } }
                    : {
                        opacity: 0,
                        y: -8,
                        transition: {
                          duration: 0.16,
                          ease: PANEL_EASE,
                        },
                      }
                }
              >
                {step === "le" && currentLE && (
                  <LeStep
                    titleId={titleId}
                    flavourName={currentLE.name}
                    shortDescription={currentLE.shortDescription}
                    onOrder={handleOrder}
                    onNext={() => setStep("email")}
                  />
                )}
                {step === "email" && (
                  <SignupSlideInForm
                    titleId={titleId}
                    onSuccess={handleSuccess}
                  />
                )}
                {step === "success" && <SuccessStep titleId={titleId} />}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function LeStep({
  titleId,
  flavourName,
  shortDescription,
  onOrder,
  onNext,
}: {
  titleId: string;
  flavourName: string;
  shortDescription: string | null;
  onOrder: () => void;
  onNext: () => void;
}) {
  return (
    <div className="relative pr-9">
      {/* W-masked drop image — same stand-in path and `data-todo` attribute as
          home `KatsuDrop`, so swapping in a per-flavour LE photo later only
          happens in one place. */}
      <div className="flex h-[140px] w-full items-center justify-center md:h-[160px]">
        <div
          data-todo="le-photo"
          className="relative h-[128px] w-full md:h-[148px]"
          style={{
            WebkitMaskImage: `url(${LE_MASK_SRC})`,
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            WebkitMaskSize: "contain",
            maskImage: `url(${LE_MASK_SRC})`,
            maskRepeat: "no-repeat",
            maskPosition: "center",
            maskSize: "contain",
          }}
        >
          <Image
            src={LE_PHOTO_SRC}
            alt={`${flavourName} drop`}
            fill
            sizes="(min-width: 768px) 340px, 90vw"
            className="object-cover"
          />
        </div>
      </div>

      <p className="mt-3 font-display text-[11px] font-bold uppercase tracking-[0.25em] text-brand-pink">
        Limited edition
      </p>
      <h2
        id={titleId}
        className="neon-pink mt-1 font-display text-[2.25rem] font-extrabold uppercase leading-[0.9] tracking-tight text-brand-pink md:text-[2.5rem]"
      >
        {flavourName}
      </h2>
      {shortDescription && (
        <p className="mt-2 font-body text-sm leading-snug text-brand-white/85">
          {shortDescription}
        </p>
      )}
      <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-[1fr_auto]">
        <BrandButton
          variant="primary"
          size="md"
          onClick={onOrder}
          className="min-w-0 w-full justify-center"
        >
          Get it now
        </BrandButton>
        <BrandButton
          variant="inverse"
          size="md"
          onClick={onNext}
          className="min-w-0 w-full justify-center md:w-auto"
        >
          Next
        </BrandButton>
      </div>
    </div>
  );
}

function SuccessStep({ titleId }: { titleId: string }) {
  return (
    <div
      className="flex flex-col items-center gap-3 pr-9 pt-2 text-center"
      role="status"
      aria-live="polite"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-black">
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="h-7 w-7"
          fill="none"
          stroke="var(--color-brand-pink)"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12l5 5L19 7" />
        </svg>
      </div>
      <h2
        id={titleId}
        className="font-display text-[2rem] font-extrabold uppercase leading-[0.9] tracking-tight text-brand-black"
      >
        You&rsquo;re in.
      </h2>
      <p className="font-body text-sm leading-relaxed text-brand-black/80">
        First dibs locked. Watch your inbox for Wingers drops.
      </p>
    </div>
  );
}
