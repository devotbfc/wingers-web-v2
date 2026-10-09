"use client";

import Image from "next/image";
import { useAnimateInView } from "@/components/common/useAnimateInView";
import { cn } from "@/lib/utils";

interface StickerRingProps {
  /** Ring diameter in px — board uses 112 (mobile) / 150 (desktop). */
  size?: number;
  /** Repeated phrase that spins on the circular path. */
  text?: string;
  className?: string;
}

const DEFAULT_TEXT = "Hand-breaded · Halal · Never frozen · ";

export function StickerRing({
  size = 112,
  text = DEFAULT_TEXT,
  className,
}: StickerRingProps) {
  const [ref, inView] = useAnimateInView<HTMLDivElement>();

  // Duplicate the phrase so a short string still wraps the full circle.
  const label = (text + text + text).toUpperCase();

  const R = size / 2 - 10;
  const CX = size / 2;
  const CY = size / 2;
  const pathId = `sticker-ring-path-${size}`;
  const fontSize = Math.max(9, Math.round(size * 0.095));
  const markSize = Math.round(size * 0.36);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "pointer-events-none relative flex items-center justify-center rounded-full bg-brand-pink",
        !inView && "paused-anims",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <svg
        className="animate-w-spin motion-reduce:[animation:none]"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <defs>
          <path
            id={pathId}
            d={`M ${CX},${CY} m -${R},0 a ${R},${R} 0 1,1 ${R * 2},0 a ${R},${R} 0 1,1 -${R * 2},0`}
          />
        </defs>
        <text
          fill="#0A0A0A"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: `${fontSize}px`,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          <textPath href={`#${pathId}`}>{label}</textPath>
        </text>
      </svg>
      <Image
        src="/brand/logo/wingers-mark-512.png"
        alt=""
        width={markSize}
        height={markSize}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-auto"
        style={{
          width: markSize,
          filter: "brightness(0)",
        }}
      />
    </div>
  );
}
