import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoVariant = "pink" | "red" | "white" | "black";
type LogoType = "lockup" | "mark";

interface BrandLogoProps {
  variant?: LogoVariant;
  type?: LogoType;
  className?: string;
  width?: number;
  height?: number;
  alt?: string;
}

const DEFAULT_DIMENSIONS: Record<LogoType, { width: number; height: number }> = {
  lockup: { width: 300, height: 100 },
  mark: { width: 80, height: 80 },
};

export function BrandLogo({
  variant = "pink",
  type = "lockup",
  className,
  width,
  height,
  alt = "Wingers",
}: BrandLogoProps) {
  const dims = DEFAULT_DIMENSIONS[type];
  const src =
    variant === "pink"
      ? type === "lockup"
        ? "/brand/logo/wingers-logo-pink.png"
        : "/brand/logo/wingers-mark.png"
      : `/brand/logo/wingers-${type}-${variant}.svg`;

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? dims.width}
      height={height ?? dims.height}
      className={cn("object-contain", className)}
      unoptimized
    />
  );
}
