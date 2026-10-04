"use client";

import { useRef, useState } from "react";
import { pence } from "@/lib/pph/money";
import type { Menu, MenuCategory, MenuItem } from "@/lib/pph/types";

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
            className={`whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-bold uppercase tracking-wide ${
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
    <section ref={innerRef} className="px-4 pt-4">
      <h2 className="font-display text-lg font-bold uppercase">{category.name}</h2>
      <ul className="mt-2 flex flex-col divide-y divide-neutral-100">
        {category.items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => onOpenItem(item)}
              disabled={!item.available}
              className="flex w-full items-start justify-between py-3 text-left disabled:opacity-50"
            >
              <div className="pr-3">
                <div className="font-display text-base font-bold">{item.name}</div>
                <div className="line-clamp-2 text-xs text-neutral-600">{item.description}</div>
              </div>
              <div className="shrink-0 text-sm font-bold">{pence(item.pricePence)}</div>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
