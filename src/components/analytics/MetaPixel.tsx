"use client";

import Script from "next/script";
import { useEffect } from "react";
import { useConsent } from "@/components/consent/ConsentProvider";
import { pixelInitScript } from "@/lib/analytics/meta-pixel";
import { readFbclidFromUrl, writeFbcCookie } from "@/lib/analytics/fbclid";

export function MetaPixel() {
  const { status, pixelId } = useConsent();
  const enabled = pixelId.length > 0 && status === "accepted";

  useEffect(() => {
    if (!enabled) return;
    const fbclid = readFbclidFromUrl();
    if (fbclid) writeFbcCookie(fbclid);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <Script
      id="meta-pixel-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: pixelInitScript(pixelId) }}
    />
  );
}
