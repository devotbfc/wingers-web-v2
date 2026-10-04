"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart/context";
import { pence } from "@/lib/pph/money";

// Port of wing-app/src/components/BasketBar.tsx:
// mx-4 mb-3 h-14 rounded-pill bg-brand-pink
// Count circle on the left, VIEW BASKET centre, total right — one line,
// space-between.
export function BasketBar() {
  const { itemCount, subtotalPence } = useCart();
  if (itemCount === 0) return null;
  return (
    <div
      className="pointer-events-none fixed bottom-0 left-1/2 z-40 w-full max-w-md -translate-x-1/2"
    >
      <Link
        href="/order/basket"
        aria-label={`View basket, ${itemCount} ${itemCount === 1 ? "item" : "items"}, ${pence(subtotalPence)}`}
        className="pointer-events-auto mx-4 mb-3 flex h-14 items-center justify-between rounded-pill bg-pph-pink px-4 hover:brightness-95"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-pill bg-pph-bg font-display text-sm text-pph">
          {itemCount}
        </span>
        <span className="font-display text-[15px] uppercase text-pph-bg">View Basket</span>
        <span className="font-display text-[15px] uppercase text-pph-bg">
          {pence(subtotalPence)}
        </span>
      </Link>
    </div>
  );
}
