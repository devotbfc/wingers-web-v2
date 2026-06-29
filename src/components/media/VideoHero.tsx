"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import type React from "react";

interface VideoHeroProps {
  src: string;
  poster: string;
  className?: string;
  children?: React.ReactNode;
}

export function VideoHero({ src, poster, className, children }: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) video.pause();

    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) video.pause();
      else video.play().catch(() => {});
    };

    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <video
        ref={videoRef}
        src={src}
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
