"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart/context";
import { pence } from "@/lib/pph/money";

export function BasketBar() {
  const { itemCount, subtotalPence } = useCart();
  if (itemCount === 0) return null;
  return (
    <Link
      href="/order/basket"
      className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 rounded-md bg-brand-pink px-5 py-3 font-display font-bold uppercase tracking-wide text-brand-black shadow-lg transition hover:brightness-95"
    >
      <span className="mr-2 inline-flex min-w-[1.75rem] items-center justify-center rounded-sm bg-brand-black px-2 py-0.5 text-sm text-brand-white">
        {itemCount}
      </span>
      View Basket · {pence(subtotalPence)}
    </Link>
  );
}
