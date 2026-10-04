"use client";

import Link from "next/link";
import { BrandButton } from "@/components/brand/BrandButton";
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
        <p className="font-body text-xs leading-snug text-brand-black md:text-sm">
          We use Meta Pixel to measure our ads. Accept to enable, or reject and
          only essential functionality runs.{" "}
          <Link href="/privacy" className="underline hover:text-brand-red">
            Learn more
          </Link>
          .
        </p>
        <div className="flex gap-3">
          <BrandButton
            variant="outline"
            size="sm"
            onClick={reject}
            className="min-h-[44px] flex-1 md:flex-none"
          >
            Reject
          </BrandButton>
          <BrandButton
            variant="outline"
            size="sm"
            onClick={accept}
            className="min-h-[44px] flex-1 md:flex-none"
          >
            Accept
          </BrandButton>
        </div>
      </div>
    </div>
  );
}
