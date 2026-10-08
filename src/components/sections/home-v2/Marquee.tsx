"use client";

import { useAnimateInView } from "@/components/common/useAnimateInView";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  /** The text block the marquee loops. Already-doubled by the component. */
  text: string;
  className?: string;
}

export function Marquee({ text, className }: MarqueeProps) {
  const [ref, inView] = useAnimateInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "relative h-[52px] md:h-16 w-full overflow-hidden bg-brand-pink text-brand-black",
        !inView && "paused-anims",
        className,
      )}
    >
      <div className="flex h-full w-max items-center animate-w-marq [animation-duration:18s] md:[animation-duration:22s] [@media(hover:hover)]:hover:[animation-play-state:paused]">
        <span className="whitespace-nowrap pr-6 md:pr-8 font-display font-extrabold uppercase text-[20px] md:text-[26px] tracking-tight">
          {text}
        </span>
        <span className="whitespace-nowrap pr-6 md:pr-8 font-display font-extrabold uppercase text-[20px] md:text-[26px] tracking-tight">
          {text}
        </span>
      </div>
    </div>
  );
}
