"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import type React from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
  margin?: string;
  delay?: number;
}

export function ScrollReveal({
  children,
  className,
  once = true,
  margin = "-100px",
  delay = 0,
}: ScrollRevealProps) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin }}
      transition={{ duration: 0.5, delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
