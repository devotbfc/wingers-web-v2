"use client";

import { useSyncExternalStore } from "react";
import type React from "react";

import { BrandButton } from "@/components/brand/BrandButton";
import { useAnimateInView } from "@/components/common/useAnimateInView";
import { cn } from "@/lib/utils";

import { useOrderPanel } from "./order-panel-context";
import { ORDER_PULSE_ENABLED } from "./motion-flags";

interface OrderTriggerButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  preferredLocationSlug?: string;
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void): () => void {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot(): boolean {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot(): boolean {
  return false;
}

function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
}

export function OrderTriggerButton({
  children,
  variant = "primary",
  size = "md",
  className,
  preferredLocationSlug,
}: OrderTriggerButtonProps) {
  const { openPanel, open } = useOrderPanel();
  const reduced = usePrefersReducedMotion();
  const [wrapperRef, inView] = useAnimateInView<HTMLSpanElement>();

  const pulsePaused = open || reduced || !inView;

  return (
    <span
      ref={wrapperRef}
      className="relative inline-flex rounded-full"
    >
      {ORDER_PULSE_ENABLED && (
        <span
          aria-hidden="true"
          data-paused={pulsePaused ? "true" : undefined}
          className="order-pulse-ring"
        />
      )}
      <BrandButton
        variant={variant}
        size={size}
        onClick={() => openPanel(preferredLocationSlug)}
        className={cn("grow", className)}
      >
        {children}
      </BrandButton>
    </span>
  );
}
