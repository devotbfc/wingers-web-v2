"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import type React from "react";

interface VideoHeroProps {
  mobileMp4Src: string;
  desktopMp4Src: string;
  desktopMediaQuery?: string;
  poster: string;
  className?: string;
  children?: React.ReactNode;
}

export function VideoHero({
  mobileMp4Src,
  desktopMp4Src,
  desktopMediaQuery = "(min-width: 768px)",
  poster,
  className,
  children,
}: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    // If reduced motion is set, never attach sources — poster stays.
    if (reducedMotion.matches) return;

    const attach = () => {
      if (video.querySelector("source")) return;
      const desktop = document.createElement("source");
      desktop.src = desktopMp4Src;
      desktop.type = "video/mp4";
      desktop.media = desktopMediaQuery;
      const mobile = document.createElement("source");
      mobile.src = mobileMp4Src;
      mobile.type = "video/mp4";
      video.appendChild(desktop);
      video.appendChild(mobile);
      video.load();
      video.play().catch(() => {});
    };

    const idle = (cb: () => void) => {
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(cb);
      } else {
        setTimeout(cb, 0);
      }
    };

    const onLoad = () => idle(attach);

    if (document.readyState === "complete") {
      idle(attach);
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) video.pause();
      else if (video.querySelector("source")) video.play().catch(() => {});
    };
    reducedMotion.addEventListener("change", handleReducedMotionChange);

    return () => {
      window.removeEventListener("load", onLoad);
      reducedMotion.removeEventListener("change", handleReducedMotionChange);
    };
  }, [mobileMp4Src, desktopMp4Src, desktopMediaQuery]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <video
        ref={videoRef}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}
