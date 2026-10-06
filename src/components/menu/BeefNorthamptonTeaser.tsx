"use client";

import { BrandButton } from "@/components/brand/BrandButton";

interface BeefNorthamptonTeaserProps {
  onSwitchToNN: () => void;
}

export function BeefNorthamptonTeaser({ onSwitchToNN }: BeefNorthamptonTeaserProps) {
  return (
    <div className="mt-4 border-l-4 border-brand-red bg-brand-pink/15 p-5 text-brand-black md:p-6">
      <h4 className="font-display text-xl font-extrabold uppercase tracking-tight md:text-2xl">
        Beef — 100% Angus
      </h4>
      <p className="mt-2 max-w-xl font-body text-sm leading-relaxed text-brand-black/80">
        Location exclusive: only at Wingers Northampton.
      </p>
      <div className="mt-4">
        <BrandButton variant="secondary" size="sm" onClick={onSwitchToNN}>
          Switch to Northampton
        </BrandButton>
      </div>
    </div>
  );
}
