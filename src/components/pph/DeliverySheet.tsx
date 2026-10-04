"use client";

import { ExternalLink } from "lucide-react";
import { PphSheet, PphSheetContent } from "./PphSheet";

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
    <PphSheet open={open} onOpenChange={onOpenChange}>
      <PphSheetContent
        title="Get Wingers delivered"
        description="Delivery runs through our partners. Collect in-app to earn points."
      >
        <ul className="space-y-2">
          {DELIVERY_APPS.map((app) => (
            <li key={app.name}>
              <a
                href={app.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-md border border-neutral-200 bg-brand-white px-3 py-3 text-sm font-bold text-brand-black hover:bg-neutral-50"
              >
                {app.name}
                <ExternalLink className="h-4 w-4 text-neutral-400" />
              </a>
            </li>
          ))}
        </ul>
      </PphSheetContent>
    </PphSheet>
  );
}
