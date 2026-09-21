type FbqArgs = unknown[];
type FbqCallback = ((...args: FbqArgs) => void) & {
  queue?: FbqArgs[];
  loaded?: boolean;
  version?: string;
  callMethod?: (...args: FbqArgs) => void;
  push?: FbqCallback;
};

declare global {
  interface Window {
    fbq?: FbqCallback;
    _fbq?: FbqCallback;
  }
}

export function generateEventId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

// PageView is fired from PixelPageView so it carries an event_id — the init
// snippet deliberately omits the usual fbq('track','PageView') for that reason.
export function pixelInitScript(pixelId: string): string {
  return `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');`;
}

export type StandardEvent =
  | "PageView"
  | "ViewContent"
  | "Lead"
  | "InitiateCheckout";

export interface TrackOptions {
  eventId?: string;
}

export function track(
  event: StandardEvent,
  params: Record<string, unknown> = {},
  options: TrackOptions = {}
): string | null {
  if (typeof window === "undefined") return null;
  const fbq = window.fbq;
  if (typeof fbq !== "function") return null;
  const eventId = options.eventId ?? generateEventId();
  fbq("track", event, params, { eventID: eventId });
  return eventId;
}
