"use client";

import Link from "next/link";
import { Cookie } from "lucide-react";
import { useConsent } from "./ConsentProvider";

// Dark floating card at the bottom of the viewport per PopupConsent.dc.html.
// Reject and Accept are intentionally identical outlined white-on-black
// pills — ICO guidance says the two choices must carry equal visual weight,
// so neither can be the primary. Storage is handled by ConsentProvider;
// this component only renders when status === "unknown" and never persists
// anything itself.
export function ConsentBanner() {
  const { status, accept, reject, pixelId } = useConsent();

  if (pixelId.length === 0) return null;
  if (status !== "unknown") return null;

  const buttonClass =
    "inline-flex min-h-[44px] flex-1 items-center justify-center rounded-full border-2 border-brand-white bg-transparent px-4 font-display text-sm font-extrabold uppercase tracking-[0.02em] text-brand-white transition-colors hover:bg-brand-white hover:text-brand-black focus-visible:bg-brand-white focus-visible:text-brand-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black md:px-6";

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 z-50 rounded-[28px] bg-brand-black px-5 pt-5 pb-[var(--sheet-safe-bottom)] text-brand-white shadow-[0_16px_40px_rgba(10,10,10,0.28)] md:inset-x-auto md:left-6 md:right-6 md:bottom-6 md:mx-auto md:max-w-3xl md:px-7"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
        <div className="flex items-start gap-3 md:flex-1">
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-pink text-brand-black"
          >
            <Cookie className="h-5 w-5 stroke-[2]" />
          </span>
          <p className="font-body text-sm leading-snug text-brand-white md:text-[15px]">
            We use Meta Pixel to measure our ads. Accept to enable, or reject
            and only essential functionality runs.{" "}
            <Link
              href="/privacy"
              className="text-brand-pink underline underline-offset-[3px]"
            >
              Learn more
            </Link>
            .
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 md:w-auto md:shrink-0">
          <button type="button" onClick={reject} className={buttonClass}>
            Reject
          </button>
          <button type="button" onClick={accept} className={buttonClass}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
