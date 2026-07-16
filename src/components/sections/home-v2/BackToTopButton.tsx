"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setVisible(window.scrollY > window.innerHeight * 1.5);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: shouldReduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={handleClick}
      style={{
        bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))",
        left: "calc(1rem + env(safe-area-inset-left, 0px))",
      }}
      className={cn(
        "fixed z-40 inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-pink text-brand-black",
        "focus-visible:outline-2 focus-visible:outline-brand-black focus-visible:outline-offset-2",
        !shouldReduce && "transition-[opacity,transform] duration-200",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-2 pointer-events-none"
      )}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="square"
        strokeLinejoin="miter"
        className="h-5 w-5"
      >
        <path d="M12 19V5" />
        <path d="M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
