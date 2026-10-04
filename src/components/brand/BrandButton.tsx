"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type React from "react";

type BrandButtonVariant = "primary" | "secondary" | "ghost" | "inverse" | "outline";
type BrandButtonSize = "sm" | "md" | "lg";

interface BrandButtonProps {
  variant?: BrandButtonVariant;
  size?: BrandButtonSize;
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
  "aria-label"?: string;
}

// ADR-018 §4 (post-rewrite): ORDER is always brand-red fill + brand-white text,
// everywhere. Secondaries beside ORDER use variant="outline" (inverts to
// red/white on hover). Hover must stay visible on pink, white and black
// surfaces — primary + inverse use brightness-90 so the hue never clashes with
// a brand-pink card (OrderPanel) or a lab-black section. Every variant renders
// at rounded-md; radius is set here, not at call sites.
const variantClasses: Record<BrandButtonVariant, string> = {
  primary:
    "bg-brand-red text-brand-white hover:brightness-90 border-0 rounded-md shadow-none",
  secondary:
    "bg-brand-pink text-brand-black hover:brightness-95 border-0 rounded-md shadow-none",
  ghost:
    "text-brand-red bg-transparent hover:text-brand-pink hover:bg-transparent underline rounded-md shadow-none",
  inverse:
    "bg-brand-white text-brand-red hover:brightness-95 border-0 rounded-md shadow-none",
  outline:
    "bg-brand-white text-brand-black border-2 border-brand-black hover:bg-brand-red hover:text-brand-white hover:border-brand-red focus-visible:bg-brand-red focus-visible:text-brand-white focus-visible:border-brand-red rounded-md shadow-none",
};

const sizeClasses: Record<BrandButtonSize, string> = {
  sm: "h-8 px-4 text-sm",
  md: "h-10 px-6 text-base",
  lg: "h-12 px-8 text-lg",
};

export function BrandButton({
  variant = "primary",
  size = "md",
  children,
  href,
  onClick,
  className,
  disabled,
  type = "button",
  target,
  rel,
  "aria-label": ariaLabel,
}: BrandButtonProps) {
  const classes = cn(
    "font-display font-bold uppercase tracking-wide transition-colors",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (href) {
    return (
      <Button asChild className={classes} disabled={disabled}>
        <a
          href={href}
          target={target}
          rel={rel}
          onClick={onClick}
          aria-label={ariaLabel}
        >
          {children}
        </a>
      </Button>
    );
  }

  return (
    <Button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      type={type}
      aria-label={ariaLabel}
    >
      {children}
    </Button>
  );
}
