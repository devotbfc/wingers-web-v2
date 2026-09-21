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
