"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { BrandButton } from "@/components/brand/BrandButton";
import { OPEN_ORDER_EVENT } from "@/components/sections/order-panel/events";
import type { Flavour } from "@/lib/flavours";

import { SignupSlideInForm } from "./SignupSlideInForm";

type Step = "le" | "email" | "success";

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
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    closeBtnRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.stopPropagation();
        onDismiss();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
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
            role="dialog"
            aria-labelledby={titleId}
            aria-modal="false"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={panelVariants}
            transition={{ duration: reduced ? 0.2 : 0.32, ease: "easeOut" }}
            className="fixed inset-x-0 bottom-0 z-40 w-full rounded-t-xl border-t border-brand-pink/60 bg-brand-white px-6 pb-6 pt-5 shadow-[0_-8px_28px_rgba(0,0,0,0.1)] md:inset-auto md:bottom-6 md:left-6 md:w-[380px] md:max-w-[calc(100vw-3rem)] md:rounded-md md:border md:border-brand-pink/40 md:px-5 md:pt-4 md:pb-5 md:shadow-[0_12px_32px_rgba(0,0,0,0.14)]"
          >
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onDismiss}
              aria-label="Dismiss sign-up"
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-brand-black/70 hover:text-brand-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-pink"
            >
              <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5">
                <path
                  fill="currentColor"
                  d="M18.3 5.71 12 12.01l-6.29-6.3-1.42 1.42 6.3 6.29-6.3 6.29 1.42 1.42 6.29-6.3 6.29 6.3 1.42-1.42-6.3-6.29 6.3-6.29z"
                />
              </svg>
            </button>

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
              <SignupSlideInForm titleId={titleId} onSuccess={handleSuccess} />
            )}
            {step === "success" && <SuccessStep titleId={titleId} />}
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
      {/* Radial pink → red glow backdrop behind the name lockup — matches the
          hero device at reduced intensity. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-2 -top-2 h-24 w-40 rounded-full bg-[radial-gradient(circle,theme(colors.brand-pink/35),transparent_70%)] blur-xl"
      />
      <p className="relative font-display text-[11px] font-bold uppercase tracking-[0.25em] text-brand-red">
        Limited Edition
      </p>
      <h2
        id={titleId}
        className="relative mt-1 font-display text-[2rem] font-extrabold uppercase leading-[0.95] tracking-tight text-brand-black"
      >
        {flavourName}
      </h2>
      <p className="relative mt-2 font-body text-sm leading-snug text-brand-black/80">
        {shortDescription ??
          "On the menu for a limited run. Don't sleep on it."}
      </p>
      <div className="relative mt-4 grid grid-cols-1 gap-2 md:grid-cols-[1fr_auto]">
        <BrandButton
          variant="primary"
          size="md"
          onClick={onOrder}
          className="min-w-0 w-full justify-center"
        >
          Get it now
        </BrandButton>
        <BrandButton
          variant="outline"
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
    <div className="pr-9" role="status" aria-live="polite">
      <p className="font-display text-[11px] font-bold uppercase tracking-[0.25em] text-brand-red">
        You&apos;re in.
      </p>
      <h2
        id={titleId}
        className="mt-1 font-display text-2xl font-extrabold uppercase leading-tight tracking-tight text-brand-black"
      >
        First dibs locked.
      </h2>
      <p className="mt-2 font-body text-sm text-brand-black/80">
        Watch your inbox for Wingers drops.
      </p>
    </div>
  );
}
