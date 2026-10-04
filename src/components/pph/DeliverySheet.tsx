"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const DELIVERY_APPS = [
  { name: "Deliveroo", href: "https://deliveroo.co.uk/brands/wingers" },
  { name: "Uber Eats", href: "https://www.ubereats.com/gb/brand/wingers" },
  { name: "Just Eat", href: "https://www.just-eat.co.uk/restaurants-wingers" },
];

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DeliverySheet({ open, onOpenChange }: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-xl pb-6">
        <SheetHeader>
          <SheetTitle className="font-display text-xl">Get Wingers Delivered</SheetTitle>
        </SheetHeader>
        <p className="px-4 text-sm text-neutral-600">
          Delivery runs through our partners. Collection in-app earns loyalty points.
        </p>
        <ul className="mt-3 flex flex-col gap-2 px-4">
          {DELIVERY_APPS.map((app) => (
            <li key={app.name}>
              <a
                href={app.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-md border border-neutral-200 px-3 py-3 text-sm font-bold"
              >
                {app.name}
                <span className="text-neutral-400">→</span>
              </a>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
