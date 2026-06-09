import Image from "next/image";
import { cn } from "@/lib/utils";

interface HoverImageProps {
  defaultSrc: string;
  hoverSrc: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export function HoverImage({
  defaultSrc,
  hoverSrc,
  alt,
  width,
  height,
  className,
}: HoverImageProps) {
  return (
    <div className={cn("relative group overflow-hidden inline-block", className)}>
      <Image
        src={defaultSrc}
        alt={alt}
        width={width}
        height={height}
        className="transition-opacity duration-300 group-hover:opacity-0"
      />
      <Image
        src={hoverSrc}
        alt=""
        width={width}
        height={height}
        aria-hidden
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </div>
  );
}
