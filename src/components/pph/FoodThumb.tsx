"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  src: string | null;
  alt: string;
  size: "sm" | "md" | "lg" | "hero";
  className?: string;
};

const DIMS: Record<Props["size"], { px: number; className: string; initial: string }> = {
  sm: { px: 48, className: "h-12 w-12 rounded-[12px]", initial: "text-sm" },
  md: { px: 96, className: "h-24 w-24 rounded-[16px]", initial: "text-[28px]" },
  lg: { px: 112, className: "h-28 w-28 rounded-[16px]", initial: "text-[32px]" },
  hero: { px: 480, className: "h-56 w-full rounded-none", initial: "text-[56px]" },
};

function initials(label: string): string {
  return label
    .split(/\s+/)
    .map((w) => w[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function FoodThumb({ src, alt, size, className }: Props) {
  const d = DIMS[size];
  if (src) {
    const isHero = size === "hero";
    return (
      <div className={cn("relative shrink-0 overflow-hidden bg-pph-elevated", d.className, className)}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={isHero ? "(max-width: 448px) 100vw, 448px" : `${d.px}px`}
          className="object-cover"
          priority={isHero}
        />
      </div>
    );
  }
  return (
    <div
      aria-hidden
      className={cn(
        "flex shrink-0 items-center justify-center bg-pph-elevated font-display uppercase text-pph-muted",
        d.className,
        d.initial,
        className,
      )}
    >
      {initials(alt)}
    </div>
  );
}
