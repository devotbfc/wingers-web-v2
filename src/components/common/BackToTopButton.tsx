"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

import { useConsent } from "@/components/consent/ConsentProvider";
import { cn } from "@/lib/utils";

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
    getReducedMotionServerSnapshot,
  );
}

interface BackToTopButtonProps {
  anchor?: "left" | "right";
  // Hero-heavy pages (homepage) want "scroll past the hero", menu/content pages
  // want a fixed offset in px. Pass a number for px, or a function receiving
  // innerHeight for responsive thresholds. Default: 1.5 × innerHeight.
  appearAfter?: number | ((innerHeight: number) => number);
}

export function BackToTopButton({
  anchor = "left",
  appearAfter,
}: BackToTopButtonProps = {}) {
  const [visible, setVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const shouldReduce = usePrefersReducedMotion();
  const { status, pixelId } = useConsent();

  // Cookie banner visibility — matches ConsentBanner's own render guard.
  const consentBannerVisible = pixelId.length > 0 && status === "unknown";

  useEffect(() => {
    let ticking = false;
    const compute = () => {
      const threshold =
        typeof appearAfter === "function"
          ? appearAfter(window.innerHeight)
          : typeof appearAfter === "number"
            ? appearAfter
            : window.innerHeight * 1.5;
      setVisible(window.scrollY > threshold);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        compute();
        ticking = false;
      });
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [appearAfter]);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      (entries) => {
        setFooterVisible(entries[0]?.isIntersecting ?? false);
      },
      { rootMargin: "0px" },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  // Hide while the SignupSlideIn is open on ANY viewport. On mobile the
  // slide-in is full-width at bottom; on desktop it anchors bottom-left,
  // same corner as the homepage BackToTopButton. Either way, don't stack
  // a pink circle behind it.
  useEffect(() => {
    const read = () => {
      setSignupOpen(document.body.dataset.signupOpen === "true");
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-signup-open"],
    });
    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: shouldReduce ? "auto" : "smooth" });
  };

  const show =
    visible && !footerVisible && !consentBannerVisible && !signupOpen;

  const positionStyle =
    anchor === "right"
      ? {
          bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))",
          right: "calc(1rem + env(safe-area-inset-right, 0px))",
        }
      : {
          bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))",
          left: "calc(1rem + env(safe-area-inset-left, 0px))",
        };

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={handleClick}
      style={positionStyle}
      className={cn(
        "fixed z-40 inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-pink text-brand-black",
        "focus-visible:outline-2 focus-visible:outline-brand-black focus-visible:outline-offset-2",
        !shouldReduce && "transition-[opacity,transform] duration-200",
        show
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
