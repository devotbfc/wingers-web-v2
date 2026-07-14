"use client";

import { BrandButton } from "@/components/brand/BrandButton";
import { useOrderPanel } from "./order-panel-context";
import type React from "react";

interface OrderTriggerButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function OrderTriggerButton({
  children,
  variant = "primary",
  size = "md",
  className,
}: OrderTriggerButtonProps) {
  const { openPanel } = useOrderPanel();
  return (
    <BrandButton
      variant={variant}
      size={size}
      onClick={openPanel}
      className={className}
    >
      {children}
    </BrandButton>
  );
}
