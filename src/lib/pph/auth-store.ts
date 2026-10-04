// Web auth store. Mirrors wing-app/src/stores/auth.ts without zustand —
// uses useSyncExternalStore so React picks up changes. Tokens persist via
// localStorage; cold-boot rehydration happens once on mount.

"use client";

import { useSyncExternalStore } from "react";
import type { Session, User } from "./types";

const STORAGE_KEY = "wingers-pph-auth-v1";

export type AuthStatus = "unknown" | "authenticated" | "unauthenticated";

type AuthState = {
  status: AuthStatus;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: string | null;
  sessionExpiredAt: string | null;
};

const initial: AuthState = {
  status: "unknown",
  user: null,
  accessToken: null,
  refreshToken: null,
  expiresAt: null,
  sessionExpiredAt: null,
};

let state: AuthState = initial;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function persist() {
  if (typeof window === "undefined") return;
  if (state.status !== "authenticated" || !state.user) {
    window.localStorage.removeItem(STORAGE_KEY);
    return;
  }
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      user: state.user,
      accessToken: state.accessToken,
      refreshToken: state.refreshToken,
      expiresAt: state.expiresAt,
    }),
  );
}

export const authStore = {
  get: () => state,
  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  setSession(session: Session) {
    state = {
      ...state,
      status: "authenticated",
      user: session.user,
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      expiresAt: session.expiresAt,
      sessionExpiredAt: null,
    };
    persist();
    emit();
  },
  setUser(user: User) {
    state = { ...state, user };
    persist();
    emit();
  },
  setTokens(accessToken: string, refreshToken: string, expiresAt: string) {
    state = { ...state, accessToken, refreshToken, expiresAt };
    persist();
    emit();
  },
  markUnauthenticated() {
    state = { ...initial, status: "unauthenticated" };
    persist();
    emit();
  },
  markSessionExpired() {
    state = {
      ...initial,
      status: "unauthenticated",
      sessionExpiredAt: new Date().toISOString(),
    };
    persist();
    emit();
  },
  dismissSessionExpired() {
    state = { ...state, sessionExpiredAt: null };
    emit();
  },
  rehydrate() {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        state = { ...initial, status: "unauthenticated" };
        emit();
        return;
      }
      const parsed = JSON.parse(raw) as {
        user: User;
        accessToken: string;
        refreshToken: string;
        expiresAt: string;
      };
      state = {
        status: "authenticated",
        user: parsed.user,
        accessToken: parsed.accessToken,
        refreshToken: parsed.refreshToken,
        expiresAt: parsed.expiresAt,
        sessionExpiredAt: null,
      };
      emit();
    } catch {
      state = { ...initial, status: "unauthenticated" };
      emit();
    }
  },
};

const serverSnapshot: AuthState = initial;

export function useAuth(): AuthState {
  return useSyncExternalStore(
    authStore.subscribe,
    () => authStore.get(),
    () => serverSnapshot,
  );
}
