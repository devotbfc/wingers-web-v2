"use client";

import Link from "next/link";
import { BrandButton } from "@/components/brand/BrandButton";
import { BasketRow } from "@/components/pph/BasketRow";
import { TopBar } from "@/components/pph/TopBar";
import { useCart } from "@/lib/cart/context";
import { pence } from "@/lib/pph/money";

export default function BasketPage() {
  const { state, setQty, removeLine, subtotalPence } = useCart();

  if (state.lines.length === 0) {
    return (
      <>
        <TopBar title="Review Basket" backHref="/order/menu" />
        <main className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
          <p className="text-sm text-neutral-600">Your basket is empty.</p>
          <BrandButton variant="primary" size="lg" href="/order/menu">
            Browse menu
          </BrandButton>
        </main>
      </>
    );
  }

  return (
    <>
      <TopBar title="Review Basket" backHref="/order/menu" />
      <main className="flex-1 pb-28">
        <div className="px-4 pt-3 text-xs text-neutral-600">
          Earn Wingers points on this order
        </div>
        <ul className="px-4">
          {state.lines.map((line) => (
            <BasketRow
              key={line.lineId}
              line={line}
              onQty={setQty}
              onRemove={removeLine}
            />
          ))}
        </ul>
      </main>
      <div className="fixed bottom-0 left-1/2 z-30 w-full max-w-md -translate-x-1/2 border-t border-neutral-200 bg-brand-white p-3">
        <Link href="/order/checkout" className="block">
          <BrandButton variant="primary" size="lg" className="w-full">
            Go to checkout · {pence(subtotalPence)}
          </BrandButton>
        </Link>
      </div>
    </>
  );
}
