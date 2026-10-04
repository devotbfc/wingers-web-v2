"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { useConsent } from "@/components/consent/ConsentProvider";
import type { Flavour } from "@/lib/flavours";

import { SignupSlideIn } from "./SignupSlideIn";

const EXCLUDED_PREFIXES = ["/order"] as const;
const EXCLUDED_PATHS = new Set(["/privacy", "/terms", "/allergies"]);

const DISMISS_KEY = "wingers_signup_dismissed_until";
const COMPLETED_KEY = "wingers_signup_completed";
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
const DEFAULT_TIMER_MS = 20_000;
const SCROLL_THRESHOLD = 0.5;

function readLS(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeLS(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
}

function isRouteExcluded(pathname: string | null): boolean {
  if (!pathname) return true;
  if (EXCLUDED_PATHS.has(pathname)) return true;
  for (const prefix of EXCLUDED_PREFIXES) {
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) return true;
  }
  return false;
}

interface SignupSlideInHostProps {
  currentLE: Flavour | null;
}

export function SignupSlideInHost({ currentLE }: SignupSlideInHostProps) {
  const pathname = usePathname();
  const { status, pixelId } = useConsent();
  const [visible, setVisible] = useState(false);

  const routeExcluded = isRouteExcluded(pathname);

  useEffect(() => {
    if (routeExcluded) return;

    // Read dev override from the raw URL — avoids pulling useSearchParams into
    // the global layout tree (which would force a Suspense boundary).
    let forceOverride = false;
    try {
      forceOverride =
        new URLSearchParams(window.location.search).get("signup") === "1";
    } catch {
      /* ignore */
    }

    if (!forceOverride) {
      if (readLS(COMPLETED_KEY) === "true") return;
      const dismissedUntil = Number(readLS(DISMISS_KEY) ?? "0");
      if (Number.isFinite(dismissedUntil) && dismissedUntil > Date.now()) return;
      // Consent "answered" = user has clicked accept/reject on the banner.
      // If no pixel is configured (dev/preview), the banner never shows — treat
      // that as "nothing to answer" so the slide-in isn't permanently blocked.
      const consentAnswered = status !== "unknown" || pixelId.length === 0;
      if (!consentAnswered) return;
    }

    let armed = true;
    const trigger = () => {
      if (!armed) return;
      armed = false;
      setVisible(true);
    };

    const timeoutId = window.setTimeout(
      trigger,
      forceOverride ? 0 : DEFAULT_TIMER_MS
    );

    function onScroll() {
      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      if (window.scrollY / total >= SCROLL_THRESHOLD) trigger();
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      armed = false;
      window.clearTimeout(timeoutId);
      window.removeEventListener("scroll", onScroll);
    };
  }, [routeExcluded, status, pixelId]);

  if (routeExcluded) return null;

  function handleDismissed() {
    writeLS(DISMISS_KEY, String(Date.now() + SEVEN_DAYS_MS));
    setVisible(false);
  }

  function handleCompleted() {
    writeLS(COMPLETED_KEY, "true");
    setVisible(false);
  }

  return (
    <SignupSlideIn
      open={visible}
      currentLE={currentLE}
      onDismiss={handleDismissed}
      onCompleted={handleCompleted}
    />
  );
}
