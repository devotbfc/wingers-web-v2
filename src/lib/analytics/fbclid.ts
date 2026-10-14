const FBC_COOKIE = "_fbc";
const NINETY_DAYS_SECONDS = 60 * 60 * 24 * 90;

export function readFbclidFromUrl(): string | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const fbclid = params.get("fbclid");
  return fbclid && fbclid.length > 0 ? fbclid : null;
}

export function readFbcCookie(): string | null {
  if (typeof document === "undefined") return null;
  const raw = document.cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${FBC_COOKIE}=`));
  if (!raw) return null;
  const value = decodeURIComponent(raw.slice(FBC_COOKIE.length + 1));
  const parts = value.split(".");
  if (parts.length < 4 || parts[0] !== "fb") return null;
  const fbclid = parts.slice(3).join(".");
  return fbclid.length > 0 ? fbclid : null;
}

export function writeFbcCookie(fbclid: string): void {
  if (typeof document === "undefined") return;
  const value = `fb.1.${Date.now()}.${fbclid}`;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${FBC_COOKIE}=${encodeURIComponent(value)}; Max-Age=${NINETY_DAYS_SECONDS}; Path=/; SameSite=Lax${secure}`;
}

// Deletes _fbc and _fbp set by Meta Pixel / fbclid writer. Browsers only
// remove a cookie when the deletion attribute set matches the one used to
// set it, so we try the three variants that cover how fbevents.js and our
// own writer actually set them: no explicit domain (host-only), the current
// hostname, and the eTLD+1 ".wingers.co" dot-domain.
export function clearMetaCookies(): void {
  if (typeof document === "undefined") return;
  const names = ["_fbc", "_fbp"];
  const host = window.location.hostname;
  const domains: Array<string | null> = [null, host, ".wingers.co"];
  for (const name of names) {
    for (const domain of domains) {
      const domainAttr = domain ? `; Domain=${domain}` : "";
      document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax${domainAttr}`;
    }
  }
}

export function appendFbclidToUrl(url: string, fbclid: string | null): string {
  if (!fbclid) return url;
  try {
    const parsed = new URL(url);
    parsed.searchParams.set("fbclid", fbclid);
    return parsed.toString();
  } catch {
    return url;
  }
}
