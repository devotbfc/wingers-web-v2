import { cn } from "@/lib/utils";
import type React from "react";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";

interface DoubledHeadingProps {
  text: string;
  as?: HeadingTag;
  offsetEm?: string;
  fillColor?: string;
  shadowColor?: string;
  className?: string;
}

export function DoubledHeading({
  text,
  as: Tag = "h2",
  offsetEm = "0.08em",
  fillColor = "brand-pink",
  shadowColor = "brand-red",
  className,
}: DoubledHeadingProps) {
  return (
    <Tag
      data-text={text}
      className={cn("doubled-heading", className)}
      style={
        {
          "--dh-fill": `var(--color-${fillColor})`,
          "--dh-shadow": `var(--color-${shadowColor})`,
          "--dh-offset": offsetEm,
        } as React.CSSProperties
      }
    >
      {text}
    </Tag>
  );
}
