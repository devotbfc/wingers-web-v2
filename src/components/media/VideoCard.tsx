"use client";

import { useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type React from "react";

interface VideoCardProps {
  videoSrc: string;
  imageSrc: string;
  imageAlt: string;
  aspectRatio?: string;
  className?: string;
  children?: React.ReactNode;
}

export function VideoCard({
  videoSrc,
  imageSrc,
  imageAlt,
  aspectRatio = "16/9",
  className,
  children,
}: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  return (
    <div
      className={cn("relative overflow-hidden group", className)}
      style={{ aspectRatio }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover transition-opacity duration-300 group-hover:opacity-0"
      />
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}
