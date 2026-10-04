// Active-orders stack: newest-first, dedup by id, auto-poll every 8s in
// HTTP mode via useOrderPoll. Mirrors wing-app/src/stores/order.ts.

"use client";

import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import type { ReactNode } from "react";
import { pph, pphMockOnly, PPH_IS_MOCK } from "@/lib/pph/singleton";
import type { Order } from "@/lib/pph/types";

type State = {
  active: Order[];
  credited: Set<string>;
};

type Action =
  | { type: "upsert"; order: Order }
  | { type: "dismiss"; id: string }
  | { type: "markCredited"; id: string }
  | { type: "clear" };

const initial: State = { active: [], credited: new Set() };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "upsert": {
      const idx = state.active.findIndex((o) => o.id === action.order.id);
      if (idx >= 0) {
        const next = state.active.slice();
        next[idx] = action.order;
        return { ...state, active: next };
      }
      return { ...state, active: [action.order, ...state.active] };
    }
    case "dismiss":
      return { ...state, active: state.active.filter((o) => o.id !== action.id) };
    case "markCredited": {
      if (state.credited.has(action.id)) return state;
      const next = new Set(state.credited);
      next.add(action.id);
      return { ...state, credited: next };
    }
    case "clear":
      return { active: [], credited: new Set() };
    default:
      return state;
  }
}

type Api = {
  active: Order[];
  upsert: (o: Order) => void;
  dismiss: (id: string) => void;
  markCredited: (id: string) => void;
  clear: () => void;
};

const Ctx = createContext<Api | null>(null);

export function OrderStackProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial);

  const api = useMemo<Api>(
    () => ({
      active: state.active,
      upsert: (o) => dispatch({ type: "upsert", order: o }),
      dismiss: (id) => dispatch({ type: "dismiss", id }),
      markCredited: (id) => dispatch({ type: "markCredited", id }),
      clear: () => dispatch({ type: "clear" }),
    }),
    [state],
  );

  // Poll every 8s for any non-terminal order so the status cards tick.
  const pollingIds = state.active
    .filter((o) => o.status !== "collected" && o.status !== "cancelled")
    .map((o) => o.id)
    .join(",");

  useEffect(() => {
    if (!pollingIds) return;
    const ids = pollingIds.split(",");
    const timer = setInterval(async () => {
      for (const id of ids) {
        try {
          const res = await pph.getOrder(id);
          if (res.success) dispatch({ type: "upsert", order: res.data });
        } catch {
          // silent swallow — 401 is handled centrally
        }
      }
    }, 8000);
    return () => clearInterval(timer);
  }, [pollingIds]);

  // Mock-only: once an order flips to `ready`, credit loyalty (stand-in for
  // the server webhook that fires at `collected`).
  const credited = state.credited;
  useEffect(() => {
    if (!PPH_IS_MOCK || !pphMockOnly) return;
    for (const o of state.active) {
      if ((o.status === "ready" || o.status === "collected") && !credited.has(o.id)) {
        pphMockOnly._tickLoyalty(o.id);
        dispatch({ type: "markCredited", id: o.id });
      }
    }
  }, [state.active, credited]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useOrderStack(): Api {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useOrderStack must be used within OrderStackProvider");
  return ctx;
}
