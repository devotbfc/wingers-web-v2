"use client";

import Link from "next/link";
import { Coins } from "lucide-react";
import { BasketRow } from "@/components/pph/BasketRow";
import { TopBar } from "@/components/pph/TopBar";
import { useCart } from "@/lib/cart/context";
import { pence } from "@/lib/pph/money";

export default function BasketPage() {
  const { state, setQty, removeLine, subtotalPence } = useCart();

  if (state.lines.length === 0) {
    return (
      <>
        <TopBar title="Review basket" backHref="/order/menu" />
        <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 pb-10 pt-20 text-center">
          <h2 className="font-display text-[22px] uppercase text-pph">Your basket is empty</h2>
          <p className="font-body text-[14px] text-pph-muted">
            Add something delicious from the menu.
          </p>
          <Link
            href="/order/menu"
            className="inline-flex h-14 items-center justify-center rounded-pill bg-pph-pink px-8 font-display text-[15px] uppercase text-pph-bg hover:brightness-95"
          >
            Browse menu
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <TopBar title="Review basket" backHref="/order/menu" />
      <main className="flex-1 pb-28">
        <div className="px-6 pt-4">
          <div className="font-display text-[13px] uppercase tracking-widest text-pph-muted">
            Order overview
          </div>
          <ul className="mt-2">
            {state.lines.map((line) => (
              <BasketRow
                key={line.lineId}
                line={line}
                onQty={setQty}
                onRemove={removeLine}
              />
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-2">
            <Coins className="h-4 w-4 text-pph-gold" strokeWidth={2} />
            <span className="font-body text-[14px] text-pph-gold">
              Earn Wingers points on this order
            </span>
          </div>
        </div>
      </main>
      <div className="pointer-events-none fixed bottom-0 left-1/2 z-30 w-full max-w-md -translate-x-1/2">
        <div className="px-4 pb-5">
          <Link
            href="/order/checkout"
            aria-label={`Go to checkout, total ${pence(subtotalPence)}`}
            className="pointer-events-auto flex h-14 items-center justify-between rounded-pill bg-pph-pink px-6 hover:brightness-95"
          >
            <span className="font-display text-[15px] uppercase text-pph-bg">Go to checkout</span>
            <span className="font-display text-[15px] uppercase text-pph-bg">
              {pence(subtotalPence)}
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
