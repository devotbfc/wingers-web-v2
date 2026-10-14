"use client";

import { useConsent } from "./ConsentProvider";

export function CookieSettingsLink() {
  const { pixelId, reset } = useConsent();

  // If the pixel isn't configured the banner never renders — don't surface
  // a dead control in the footer.
  if (pixelId.length === 0) return null;

  return (
    <button
      type="button"
      onClick={reset}
      aria-haspopup="dialog"
      className="cursor-pointer bg-transparent p-0 font-body text-xs text-brand-white/60 transition-colors hover:text-brand-pink"
    >
      Cookie settings
    </button>
  );
}
