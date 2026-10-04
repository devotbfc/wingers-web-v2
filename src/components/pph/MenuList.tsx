"use client";

import { Fragment, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useCart } from "@/lib/cart/context";
import { pence } from "@/lib/pph/money";
import type { Menu, MenuCategory, MenuItem, MenuItemBadge } from "@/lib/pph/types";
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
      {/* Horizontal category rail — mirrors wing-app menu.tsx rail
          (rounded-pill pink when active, elevated otherwise). Sticks
          beneath the site NavBar (h-20 md:h-24) + OrderSubBar (h-12). */}
      <nav className="sticky top-32 z-20 flex gap-2 overflow-x-auto bg-pph-bg px-6 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:top-36 lg:px-0">
        {menu.categories.map((c) => {
          const active = activeSlug === c.slug;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => scrollTo(c.slug)}
              className={`inline-flex h-11 items-center whitespace-nowrap rounded-pill px-4 font-display text-[13px] uppercase tracking-wide ${
                active ? "bg-pph-pink text-pph-on-pink" : "bg-pph-elevated text-pph"
              }`}
            >
              {c.name}
            </button>
          );
        })}
      </nav>
      <div className="pb-28 lg:pb-10">
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
    <section ref={innerRef} className="scroll-mt-36 pt-6">
      <h2 className="px-6 pb-3 font-display text-[28px] uppercase tracking-tight text-pph lg:px-0">
        {category.name}
      </h2>
      {/* <lg: single column with hairline dividers between rows (phone list).
          lg+: 2-col card grid without dividers (two-column desktop menu). */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-6 lg:gap-y-2">
        {category.items.map((item, idx) => (
          <Fragment key={item.id}>
            {idx > 0 ? (
              <div className="mx-6 h-px bg-pph-elevated lg:hidden" />
            ) : null}
            <MenuRow item={item} onOpenItem={onOpenItem} />
          </Fragment>
        ))}
      </div>
    </section>
  );
}

function MenuRow({ item, onOpenItem }: { item: MenuItem; onOpenItem: (i: MenuItem) => void }) {
  const { state } = useCart();
  const qty = state.lines.reduce(
    (sum, l) => (l.menuItemId === item.id ? sum + l.quantity : sum),
    0,
  );
  const badge = item.badge;

  return (
    <button
      type="button"
      onClick={() => onOpenItem(item)}
      disabled={!item.available}
      aria-label={`Open ${item.name}`}
      className="flex w-full items-start gap-4 px-6 py-4 text-left hover:opacity-90 disabled:opacity-50 lg:rounded-[16px] lg:border lg:border-pph-border lg:bg-pph-bg lg:px-4 lg:hover:border-pph-pink"
    >
      <div className="min-w-0 flex-1">
        {qty > 0 || badge ? (
          <div className="mb-1.5 flex items-center gap-1.5">
            {qty > 0 ? (
              <span className="inline-flex h-5 items-center rounded-pill bg-pph-pink px-2 font-display text-[11px] text-pph-on-pink">
                ×{qty}
              </span>
            ) : null}
            {badge ? <Badge kind={badge} /> : null}
          </div>
        ) : null}
        <div className="font-display text-[18px] uppercase leading-none tracking-tight text-pph">
          {item.name.toUpperCase()}
        </div>
        {item.description ? (
          <p className="mt-1 line-clamp-2 font-body text-[13px] leading-tight text-pph-muted">
            {item.description}
          </p>
        ) : null}
        <div className="mt-2 font-display text-[15px] text-pph">{pence(item.pricePence)}</div>
      </div>
      <FoodThumb src={item.imageUrl} alt={item.name} size="md" />
      <div className="self-center pl-1">
        <ChevronRight className="h-5 w-5 text-pph-muted" strokeWidth={1.5} />
      </div>
    </button>
  );
}

function Badge({ kind }: { kind: MenuItemBadge }) {
  if (kind === "new") {
    return (
      <span className="inline-flex h-5 items-center rounded-pill bg-[color:color-mix(in_oklab,var(--pph-pink)_20%,transparent)] px-2 font-display text-[10px] uppercase leading-none text-pph-pink">
        NEW
      </span>
    );
  }
  return (
    <span className="inline-flex h-5 items-center rounded-pill bg-pph-elevated px-2 font-display text-[10px] uppercase leading-none text-pph-gold-dark">
      PREMIUM
    </span>
  );
}
