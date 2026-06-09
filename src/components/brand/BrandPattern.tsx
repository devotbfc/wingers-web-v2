import Image from "next/image";
import { cn } from "@/lib/utils";

type PatternVariant = "tile" | "banner";

interface BrandPatternProps {
  variant?: PatternVariant;
  className?: string;
  iconSize?: number;
}

// TODO: replace placeholder assets at public/brand/pattern/*.svg
const PATTERN_ICONS = [
  { name: "wings", src: "/brand/pattern/wings.svg" },
  { name: "burger", src: "/brand/pattern/burger.svg" },
  { name: "cheese", src: "/brand/pattern/cheese.svg" },
  { name: "chilli", src: "/brand/pattern/chilli.svg" },
  { name: "chicken", src: "/brand/pattern/chicken.svg" },
  { name: "drumstick", src: "/brand/pattern/drumstick.svg" },
] as const;

export function BrandPattern({
  variant = "tile",
  className,
  iconSize = 64,
}: BrandPatternProps) {
  if (variant === "banner") {
    return (
      <div className={cn("flex items-center justify-around w-full py-4", className)}>
        {PATTERN_ICONS.map((icon) => (
          <Image
            key={icon.name}
            src={icon.src}
            alt=""
            width={iconSize}
            height={iconSize}
            aria-hidden
            unoptimized
          />
        ))}
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-6 gap-2", className)}>
      {Array.from({ length: 24 }).map((_, i) => {
        const icon = PATTERN_ICONS[i % PATTERN_ICONS.length];
        return (
          <Image
            key={`${icon.name}-${i}`}
            src={icon.src}
            alt=""
            width={iconSize}
            height={iconSize}
            aria-hidden
            unoptimized
          />
        );
      })}
    </div>
  );
}
