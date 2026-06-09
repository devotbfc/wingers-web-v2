import { cn } from "@/lib/utils";

const DEFAULT_ITEMS = [
  "DIP IT.",
  "BITE IT.",
  "LOVE IT.",
  "FUTURE OF FLAVOURS.",
  "BEST WINGS IN THE GAME.",
  "GET STUCK IN.",
];

interface MarqueeLockupProps {
  items?: string[];
  speed?: number;
  className?: string;
}

export function MarqueeLockup({
  items = DEFAULT_ITEMS,
  speed = 60,
  className,
}: MarqueeLockupProps) {
  const doubled = [...items, ...items];

  return (
    <div className={cn("overflow-hidden w-full", className)} aria-hidden>
      <div
        className="marquee-track flex gap-12 w-max items-center py-3"
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="shrink-0 font-display text-2xl font-extrabold uppercase tracking-display text-brand-pink"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
