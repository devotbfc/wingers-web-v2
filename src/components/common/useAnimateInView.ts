"use client";

import { useEffect, useRef, useState } from "react";

// Pause infinite animations when the host element is off-screen. Pair with
// the .paused-anims utility in globals.css (which toggles animation-play-state
// on known animated descendants). Default threshold is 0.01 so any pixel
// visibility counts as "in view" — avoids visible stutter on edge scroll.
export function useAnimateInView<T extends Element = HTMLDivElement>(
  threshold: number = 0.01
) {
  const ref = useRef<T | null>(null);
  // Start true so SSR/first-paint doesn't flash paused.
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}
