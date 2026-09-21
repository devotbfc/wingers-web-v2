"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useConsent } from "@/components/consent/ConsentProvider";
import { track } from "@/lib/analytics/meta-pixel";

export function PixelPageView() {
  const { status, pixelId } = useConsent();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pixelId.length === 0 || status !== "accepted") return;
    track("PageView");
  }, [pathname, searchParams, status, pixelId]);

  return null;
}
