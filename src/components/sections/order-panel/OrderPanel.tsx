"use client";

import { useMemo } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { BrandButton } from "@/components/brand/BrandButton";
import { useConsent } from "@/components/consent/ConsentProvider";
import { LOCATIONS } from "@/lib/locations";
import { getProviderForLocation } from "@/lib/order/providers";
import { track } from "@/lib/analytics/meta-pixel";
import {
  appendFbclidToUrl,
  readFbcCookie,
  readFbclidFromUrl,
} from "@/lib/analytics/fbclid";
import { cn } from "@/lib/utils";
import { useOrderPanel } from "./order-panel-context";

export function OrderPanel() {
  const { open, setOpen, preferredLocationSlug } = useOrderPanel();
  const { status: consentStatus } = useConsent();

  // fbclid gate on consent (PECR — click identifier is non-essential tracking).
  // useMemo keyed on consentStatus: recomputes on the "unknown" → "accepted"
  // flip (which is the point at which the read becomes valid), then caches for
  // the lifetime of this OrderPanel instance. OrderPanel is per-page, so a nav
  // to a new page remounts and re-reads. The read is SSR-safe via guards inside
  // readFbclidFromUrl / readFbcCookie.
  const fbclid = useMemo<string | null>(() => {
    if (consentStatus !== "accepted") return null;
    return readFbclidFromUrl() ?? readFbcCookie();
  }, [consentStatus]);

  const orderedLocations = preferredLocationSlug
    ? [...LOCATIONS].sort((a, b) => {
        if (a.slug === preferredLocationSlug) return -1;
        if (b.slug === preferredLocationSlug) return 1;
        return 0;
      })
    : LOCATIONS;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="bottom"
        className="h-auto max-h-[85vh] bg-brand-white text-brand-black"
      >
        <SheetHeader className="px-6 pt-6 pb-2">
          <SheetTitle className="font-display text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-brand-black">
            Order from your nearest Wingers
          </SheetTitle>
          <SheetDescription className="font-body text-base text-brand-black/70">
            Pick a location — we&rsquo;ll hand you off to its ordering platform.
          </SheetDescription>
        </SheetHeader>
        <ul className="grid gap-4 px-6 pb-8 md:grid-cols-2">
          {orderedLocations.map((loc) => {
            const provider = getProviderForLocation(loc);
            const rawHref = provider.getOrderUrl(loc);
            const href = appendFbclidToUrl(rawHref, fbclid);
            const site = loc.slug === "milton-keynes" ? "mk" : "nth";
            const isPreferred = loc.slug === preferredLocationSlug;
            return (
              <li
                key={loc.slug}
                className={cn(
                  "flex flex-col gap-4 p-5 text-brand-black",
                  isPreferred ? "bg-brand-red text-brand-white" : "bg-brand-pink"
                )}
              >
                {isPreferred && (
                  <span className="font-display text-xs font-bold uppercase tracking-[0.25em] text-brand-white/90">
                    Your shop
                  </span>
                )}
                <div className="flex flex-col gap-1">
                  <h3
                    className={cn(
                      "font-display text-xl font-extrabold uppercase tracking-tight",
                      isPreferred ? "text-brand-white" : "text-brand-black"
                    )}
                  >
                    {loc.name}
                  </h3>
                  <p
                    className={cn(
                      "font-body text-sm leading-snug",
                      isPreferred ? "text-brand-white/85" : "text-brand-black/80"
                    )}
                  >
                    {loc.address.street}
                    <br />
                    {loc.address.city}, {loc.address.postcode}
                  </p>
                </div>
                <BrandButton
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant={isPreferred ? "secondary" : "primary"}
                  size="lg"
                  className="w-full justify-center"
                  onClick={() =>
                    track("InitiateCheckout", {
                      content_category: site,
                      destination: href,
                    })
                  }
                >
                  Order via {provider.name}
                </BrandButton>
              </li>
            );
          })}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
