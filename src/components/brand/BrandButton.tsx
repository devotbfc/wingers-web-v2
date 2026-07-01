"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type React from "react";

type BrandButtonVariant = "primary" | "secondary" | "ghost";
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
}

const variantClasses: Record<BrandButtonVariant, string> = {
  primary:
    "bg-brand-red text-brand-white hover:bg-brand-pink hover:text-brand-black border-0 rounded-none shadow-none",
  secondary:
    "border-2 border-brand-red text-brand-red bg-transparent hover:bg-brand-red hover:text-brand-white rounded-none shadow-none",
  ghost:
    "text-brand-red bg-transparent hover:text-brand-pink hover:bg-transparent underline rounded-none shadow-none",
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
        <a href={href} target={target} rel={rel}>
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
    >
      {children}
    </Button>
  );
}
