// Cart provider. One cart per location; switching location clears the cart
// (mirrors wing-app/src/stores/cart.ts). Lines with identical (menuItemId,
// sorted mods, sorted sauces) merge quantities. Persisted to localStorage.

"use client";

import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import type { ReactNode } from "react";
import type { CartLine } from "./types";

const STORAGE_KEY = "wingers-pph-cart-v1";

type Tender = "card" | "points";

type CartState = {
  locationId: string | null;
  menuUpdatedAt: string | null;
  lines: CartLine[];
  tender: Tender;
  voucherId: string | null;
  promoCode: string | null;
};

const initial: CartState = {
  locationId: null,
  menuUpdatedAt: null,
  lines: [],
  tender: "card",
  voucherId: null,
  promoCode: null,
};

type AddLineInput = Omit<CartLine, "lineId" | "quantity"> & { quantity?: number };

type Action =
  | { type: "setLocation"; locationId: string | null }
  | { type: "setMenuUpdatedAt"; iso: string }
  | { type: "add"; input: AddLineInput }
  | { type: "setQty"; lineId: string; quantity: number }
  | { type: "remove"; lineId: string }
  | { type: "setTender"; tender: Tender }
  | { type: "setVoucher"; voucherId: string | null }
  | { type: "setPromo"; promoCode: string | null }
  | { type: "clear" }
  | { type: "hydrate"; state: CartState };

function sortedKey(ids: string[]): string {
  return [...ids].sort().join(",");
}

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "hydrate":
      return action.state;
    case "setLocation": {
      if (action.locationId === state.locationId) return state;
      return { ...initial, locationId: action.locationId };
    }
    case "setMenuUpdatedAt":
      // Sticky-first-write: once pinned by the first add, only overwrite via
      // a MENU_STALE recovery which calls `clear` or a fresh add after reset.
      if (state.menuUpdatedAt == null) return { ...state, menuUpdatedAt: action.iso };
      return state;
    case "add": {
      const { input } = action;
      const q = input.quantity ?? 1;
      const key = `${input.menuItemId}|${sortedKey(input.selectedModifierIds)}|${sortedKey(input.selectedSauceIds)}`;
      const existing = state.lines.find(
        (l) =>
          `${l.menuItemId}|${sortedKey(l.selectedModifierIds)}|${sortedKey(l.selectedSauceIds)}` === key,
      );
      if (existing) {
        return {
          ...state,
          lines: state.lines.map((l) =>
            l.lineId === existing.lineId ? { ...l, quantity: l.quantity + q } : l,
          ),
        };
      }
      return {
        ...state,
        lines: [
          ...state.lines,
          {
            lineId: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
            menuItemId: input.menuItemId,
            name: input.name,
            imageUrl: input.imageUrl,
            unitPricePence: input.unitPricePence,
            pointsValuePerUnit: input.pointsValuePerUnit,
            pointsPricePerUnit: input.pointsPricePerUnit,
            quantity: q,
            selectedModifierIds: input.selectedModifierIds,
            selectedSauceIds: input.selectedSauceIds,
            modifierLabels: input.modifierLabels,
            sauceLabels: input.sauceLabels,
          },
        ],
      };
    }
    case "setQty": {
      if (action.quantity <= 0) {
        return { ...state, lines: state.lines.filter((l) => l.lineId !== action.lineId) };
      }
      return {
        ...state,
        lines: state.lines.map((l) =>
          l.lineId === action.lineId ? { ...l, quantity: action.quantity } : l,
        ),
      };
    }
    case "remove":
      return { ...state, lines: state.lines.filter((l) => l.lineId !== action.lineId) };
    case "setTender": {
      // Switching to points nukes voucher (server would 422
      // VOUCHER_NOT_COMBINABLE).
      if (action.tender === "points") return { ...state, tender: "points", voucherId: null };
      return { ...state, tender: action.tender };
    }
    case "setVoucher":
      return { ...state, voucherId: action.voucherId };
    case "setPromo":
      return { ...state, promoCode: action.promoCode };
    case "clear":
      return { ...initial, locationId: state.locationId };
    default:
      return state;
  }
}

type CartApi = {
  state: CartState;
  setLocation: (locationId: string | null) => void;
  setMenuUpdatedAt: (iso: string) => void;
  addLine: (input: AddLineInput) => void;
  setQty: (lineId: string, quantity: number) => void;
  removeLine: (lineId: string) => void;
  setTender: (tender: Tender) => void;
  setVoucher: (voucherId: string | null) => void;
  setPromo: (promoCode: string | null) => void;
  clear: () => void;
  subtotalPence: number;
  itemCount: number;
};

const CartContext = createContext<CartApi | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial);

  // Rehydrate on mount from localStorage.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as CartState;
      if (parsed && typeof parsed === "object") dispatch({ type: "hydrate", state: parsed });
    } catch {
      // ignore malformed state
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage disabled / full
    }
  }, [state]);

  const subtotalPence = useMemo(
    () => state.lines.reduce((sum, l) => sum + l.unitPricePence * l.quantity, 0),
    [state.lines],
  );
  const itemCount = useMemo(
    () => state.lines.reduce((sum, l) => sum + l.quantity, 0),
    [state.lines],
  );

  const api = useMemo<CartApi>(
    () => ({
      state,
      setLocation: (locationId) => dispatch({ type: "setLocation", locationId }),
      setMenuUpdatedAt: (iso) => dispatch({ type: "setMenuUpdatedAt", iso }),
      addLine: (input) => dispatch({ type: "add", input }),
      setQty: (lineId, quantity) => dispatch({ type: "setQty", lineId, quantity }),
      removeLine: (lineId) => dispatch({ type: "remove", lineId }),
      setTender: (tender) => dispatch({ type: "setTender", tender }),
      setVoucher: (voucherId) => dispatch({ type: "setVoucher", voucherId }),
      setPromo: (promoCode) => dispatch({ type: "setPromo", promoCode }),
      clear: () => dispatch({ type: "clear" }),
      subtotalPence,
      itemCount,
    }),
    [state, subtotalPence, itemCount],
  );

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart(): CartApi {
  const api = useContext(CartContext);
  if (!api) throw new Error("useCart must be used within CartProvider");
  return api;
}
