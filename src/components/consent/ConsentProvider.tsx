"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import type React from "react";
import { clearMetaCookies } from "@/lib/analytics/fbclid";

export type ConsentStatus = "unknown" | "accepted" | "rejected";

const STORAGE_KEY = "wingers_consent";
// Same-tab writes don't fire the browser's 'storage' event, so we dispatch our own.
const CHANGE_EVENT = "wingers_consent_change";

// Captured at reset()-time so a subsequent reject() can tell this is a
// withdrawal of a previously-granted consent (which requires a reload — the
// already-executed fbevents.js keeps window.fbq in memory until the document
// is replaced). Lives only for the current tab's lifetime.
let prevStatusBeforeReset: ConsentStatus | null = null;

interface ConsentContextValue {
  status: ConsentStatus;
  accept: () => void;
  reject: () => void;
  reset: () => void;
  // Pixel ID is read from process.env in the Server Component root layout and
  // passed through here as a serialized prop — avoids relying on client-bundle
  // env inlining for a value that gates whether the banner renders at all.
  pixelId: string;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

function getClientSnapshot(): ConsentStatus {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === "accepted" || raw === "rejected") return raw;
  } catch {
    // localStorage disabled / unavailable — treat as unknown.
  }
  return "unknown";
}

function subscribe(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

const getServerSnapshot = (): ConsentStatus => "unknown";

function readStoredStatus(): ConsentStatus {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === "accepted" || raw === "rejected") return raw;
  } catch {}
  return "unknown";
}

function writeStatus(next: "accepted" | "rejected"): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {}
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function clearStatus(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {}
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function ConsentProvider({
  children,
  pixelId,
}: {
  children: React.ReactNode;
  pixelId: string;
}) {
  const status = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  const accept = useCallback(() => {
    prevStatusBeforeReset = null;
    writeStatus("accepted");
  }, []);

  const reject = useCallback(() => {
    const wasAccepted =
      prevStatusBeforeReset === "accepted" || readStoredStatus() === "accepted";
    prevStatusBeforeReset = null;
    writeStatus("rejected");
    if (wasAccepted) {
      // Pixel JS has already executed — nothing short of a document swap
      // actually unloads window.fbq. Delete the Meta cookies first so the
      // post-reload page is a clean slate, then reload once.
      clearMetaCookies();
      window.location.reload();
    }
  }, []);

  const reset = useCallback(() => {
    prevStatusBeforeReset = readStoredStatus();
    clearStatus();
  }, []);

  const value = useMemo<ConsentContextValue>(
    () => ({ status, accept, reject, reset, pixelId }),
    [status, accept, reject, reset, pixelId]
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useConsent must be used inside <ConsentProvider>");
  }
  return ctx;
}
