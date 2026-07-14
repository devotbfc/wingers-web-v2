"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { BrandButton } from "@/components/brand/BrandButton";
import { LOCATIONS } from "@/lib/locations";
import { getProviderForLocation } from "@/lib/order/providers";
import { useOrderPanel } from "./order-panel-context";

export function OrderPanel() {
  const { open, setOpen } = useOrderPanel();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="bottom"
        className="h-auto max-h-[85vh] border-t-2 border-brand-black bg-brand-white text-brand-black"
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
          {LOCATIONS.map((loc) => {
            const provider = getProviderForLocation(loc);
            const href = provider.getOrderUrl(loc);
            return (
              <li
                key={loc.slug}
                className="flex flex-col gap-4 border-2 border-brand-black p-5"
              >
                <div className="flex flex-col gap-1">
                  <h3 className="font-display text-xl font-extrabold uppercase tracking-tight text-brand-black">
                    {loc.name}
                  </h3>
                  <p className="font-body text-sm leading-snug text-brand-black/80">
                    {loc.address.street}
                    <br />
                    {loc.address.city}, {loc.address.postcode}
                  </p>
                </div>
                <BrandButton
                  href={href}
                  variant="primary"
                  size="lg"
                  className="w-full justify-center"
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
