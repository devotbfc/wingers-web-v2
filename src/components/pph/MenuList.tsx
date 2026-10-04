"use client";

import { Fragment, useRef, useState } from "react";
import { useCart } from "@/lib/cart/context";
import { pence } from "@/lib/pph/money";
import type { Menu, MenuCategory, MenuItem } from "@/lib/pph/types";
import { FoodThumb } from "./FoodThumb";

type Props = {
  menu: Menu;
  onOpenItem: (item: MenuItem) => void;
};

export function MenuList({ menu, onOpenItem }: Props) {
  const [activeSlug, setActiveSlug] = useState<string>(menu.categories[0]?.slug ?? "");
  const sectionRefs = useRef(new Map<string, HTMLDivElement | null>());

  const scrollTo = (slug: string) => {
    const el = sectionRefs.current.get(slug);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSlug(slug);
  };

  return (
    <div className="flex-1">
      <nav className="sticky top-0 z-10 flex gap-2 overflow-x-auto border-b border-neutral-200 bg-brand-white px-4 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {menu.categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => scrollTo(c.slug)}
            className={`whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-bold uppercase tracking-wide ${
              activeSlug === c.slug ? "bg-brand-pink text-brand-black" : "text-neutral-600"
            }`}
          >
            {c.name}
          </button>
        ))}
      </nav>
      <div className="pb-28">
        {menu.categories.map((cat) => (
          <CategoryBlock
            key={cat.id}
            category={cat}
            onOpenItem={onOpenItem}
            innerRef={(el) => sectionRefs.current.set(cat.slug, el)}
          />
        ))}
      </div>
    </div>
  );
}

function CategoryBlock({
  category,
  onOpenItem,
  innerRef,
}: {
  category: MenuCategory;
  onOpenItem: (item: MenuItem) => void;
  innerRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <section ref={innerRef} className="pt-5">
      <h2 className="px-4 pb-2 font-display text-xl font-extrabold uppercase tracking-tight text-brand-black">
        {category.name}
      </h2>
      <div>
        {category.items.map((item, idx) => (
          <Fragment key={item.id}>
            {idx > 0 ? <div className="mx-4 h-px bg-neutral-100" /> : null}
            <MenuRow item={item} onOpenItem={onOpenItem} />
          </Fragment>
        ))}
      </div>
    </section>
  );
}

function MenuRow({ item, onOpenItem }: { item: MenuItem; onOpenItem: (i: MenuItem) => void }) {
  const { itemCount, state } = useCart();
  // Count this item across any lines in the basket (any sauce/mod combo).
  const qty = state.lines.reduce(
    (sum, l) => (l.menuItemId === item.id ? sum + l.quantity : sum),
    0,
  );
  void itemCount; // keep subscription stable
  const badge = item.badge;

  return (
    <button
      type="button"
      onClick={() => onOpenItem(item)}
      disabled={!item.available}
      className="group flex w-full items-start gap-3 px-4 py-3 text-left disabled:opacity-50"
    >
      <div className="min-w-0 flex-1">
        {qty > 0 || badge ? (
          <div className="mb-1 flex items-center gap-1.5">
            {qty > 0 ? (
              <span className="inline-flex h-5 items-center rounded-full bg-brand-pink px-2 font-display text-[11px] font-bold text-brand-black">
                ×{qty}
              </span>
            ) : null}
            {badge === "new" ? (
              <span className="inline-flex h-5 items-center rounded-full bg-brand-pink/20 px-2 font-display text-[10px] font-bold uppercase tracking-wide text-brand-pink">
                New
              </span>
            ) : null}
            {badge === "premium" ? (
              <span className="inline-flex h-5 items-center rounded-full bg-neutral-100 px-2 font-display text-[10px] font-bold uppercase tracking-wide text-brand-black">
                Signature
              </span>
            ) : null}
          </div>
        ) : null}
        <div className="font-display text-base font-extrabold uppercase leading-tight tracking-tight">
          {item.name}
        </div>
        {item.description ? (
          <p className="mt-1 line-clamp-2 text-xs leading-snug text-neutral-500">
            {item.description}
          </p>
        ) : null}
        <div className="mt-2 font-display text-sm font-bold text-brand-black">
          {pence(item.pricePence)}
        </div>
      </div>
      <FoodThumb src={item.imageUrl} alt={item.name} size="md" />
    </button>
  );
}
