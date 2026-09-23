"use client";

import Link from "next/link";
import { useConsent } from "./ConsentProvider";

export function ConsentBanner() {
  const { status, accept, reject, pixelId } = useConsent();

  if (pixelId.length === 0) return null;
  if (status !== "unknown") return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-brand-black/10 bg-brand-white px-4 py-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] md:px-8"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-6">
        <p className="font-body text-sm leading-snug text-brand-black md:text-base">
          We use Meta Pixel to measure our ads. Accept to enable, or reject and
          only essential functionality runs.{" "}
          <Link href="/privacy" className="underline hover:text-brand-red">
            Learn more
          </Link>
          .
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={reject}
            className="min-h-[44px] flex-1 border border-brand-black/40 bg-brand-white px-5 font-display text-sm font-bold uppercase tracking-wide text-brand-black transition-colors hover:bg-brand-black/5 md:flex-none"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={accept}
            className="min-h-[44px] flex-1 bg-brand-pink px-5 font-display text-sm font-bold uppercase tracking-wide text-brand-black transition-colors hover:brightness-95 md:flex-none"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
