import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type MarqueeItem = string | ReactNode;

const DEFAULT_ITEMS: MarqueeItem[] = [
  "DIP IT.",
  "BITE IT.",
  "LOVE IT.",
  "FUTURE OF FLAVOURS.",
  "BEST WINGS IN THE GAME.",
  "GET STUCK IN.",
];

interface MarqueeLockupProps {
  items?: MarqueeItem[];
  speed?: number;
  className?: string;
  itemClassName?: string;
}

export function MarqueeLockup({
  items = DEFAULT_ITEMS,
  speed = 60,
  className,
  itemClassName = "text-brand-pink",
}: MarqueeLockupProps) {
  const doubled = [...items, ...items];

  return (
    <div className={cn("overflow-hidden w-full", className)} aria-hidden>
      <div
        className="marquee-track flex gap-12 w-max items-center py-3"
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((item, i) =>
          typeof item === "string" ? (
            <span
              key={i}
              className={cn(
                "shrink-0 font-display text-2xl font-extrabold uppercase tracking-display",
                itemClassName
              )}
            >
              {item}
            </span>
          ) : (
            <span key={i} className="shrink-0 flex items-center">
              {item}
            </span>
          )
        )}
      </div>
    </div>
  );
}
