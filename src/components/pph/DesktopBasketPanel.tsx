"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useCart } from "@/lib/cart/context";
import { pence } from "@/lib/pph/money";
import { QuantityStepper } from "./QuantityStepper";

// Desktop-only side panel for /order/menu at lg+. Mirrors the mobile
// basket page in compact form so a laptop user can see what they're
// building as they tap through categories.
export function DesktopBasketPanel() {
  const { state, setQty, removeLine, subtotalPence, itemCount } = useCart();

  return (
    <div className="rounded-[20px] border border-brand-black/10 bg-brand-white p-5">
      <div className="flex items-baseline justify-between">
        <h2 className="font-display text-[20px] uppercase tracking-tight text-pph">
          Basket
        </h2>
        <span className="font-body text-[13px] text-pph-muted">
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </span>
      </div>

      {state.lines.length === 0 ? (
        <p className="mt-4 font-body text-[13px] text-pph-muted">
          Add something from the menu to get started.
        </p>
      ) : (
        <ul className="mt-3 divide-pph-elevated">
          {state.lines.map((l) => {
            const summary = [...l.modifierLabels, ...l.sauceLabels].join(" · ");
            return (
              <li key={l.lineId} className="py-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="font-display text-[14px] uppercase leading-tight tracking-tight text-pph">
                      {l.name}
                    </div>
                    {summary ? (
                      <div className="mt-0.5 line-clamp-2 font-body text-[12px] leading-tight text-pph-muted">
                        {summary}
                      </div>
                    ) : null}
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="font-display text-[14px] text-pph">
                      {pence(l.unitPricePence * l.quantity)}
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="w-28">
                    <QuantityStepper
                      value={l.quantity}
                      onChange={(n) => setQty(l.lineId, n)}
                      min={1}
                      size="sm"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeLine(l.lineId)}
                    aria-label={`Remove ${l.name}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full text-pph-muted hover:opacity-70"
                  >
                    <X className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-pph-border pt-3">
        <span className="font-display text-[13px] uppercase text-pph-muted">
          Subtotal
        </span>
        <span className="font-display text-[18px] text-pph">
          {pence(subtotalPence)}
        </span>
      </div>

      <Link
        href="/order/checkout"
        aria-disabled={state.lines.length === 0}
        tabIndex={state.lines.length === 0 ? -1 : 0}
        className={`mt-4 inline-flex h-12 w-full items-center justify-center rounded-pill font-display text-[14px] uppercase ${
          state.lines.length === 0
            ? "pointer-events-none bg-pph-elevated text-pph-muted"
            : "bg-pph-pink text-pph-on-pink hover:brightness-95"
        }`}
      >
        Checkout
      </Link>
    </div>
  );
}
