"use client";

import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { BrandButton } from "@/components/brand/BrandButton";
import { useCart } from "@/lib/cart/context";
import { pence } from "@/lib/pph/money";
import type { MenuItem, Menu } from "@/lib/pph/types";
import { FoodThumb } from "./FoodThumb";
import { PphSheet, PphSheetContent } from "./PphSheet";
import { QuantityStepper } from "./QuantityStepper";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: MenuItem | null;
  menu: Menu;
};

// Per-category sauce caps — tracks the wing-app rules while PPH ships
// without a `saucesAllowed` field on MenuItem. Keyed by the category slug
// derived from the real site menu.
function sauceCapFor(item: MenuItem, menu: Menu): number {
  const cat = menu.categories.find((c) => c.id === item.categoryId);
  if (!cat) return 1;
  if (cat.slug === "wings-boneless-tenders") {
    // Pick 2 sauces on bigger shares, 1 otherwise. Approximation while PPH
    // doesn't expose a per-item cap.
    return /10 ?pcs|20 ?pcs|8 ?pcs|6 ?pcs/i.test(item.description) ? 2 : 1;
  }
  return 0;
}

export function ItemSheet({ open, onOpenChange, item, menu }: Props) {
  if (!item) return null;
  // key={item.id} on the inner component — remounts and reinitialises local
  // state (qty / modIds / sauceIds) when the user bounces between items
  // without closing. Avoids a setState-in-effect reset.
  return (
    <ItemSheetInner
      key={item.id}
      open={open}
      onOpenChange={onOpenChange}
      item={item}
      menu={menu}
    />
  );
}

function ItemSheetInner({
  open,
  onOpenChange,
  item,
  menu,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: MenuItem;
  menu: Menu;
}) {
  const { addLine, setMenuUpdatedAt } = useCart();
  const [qty, setQty] = useState(1);
  const [modIds, setModIds] = useState<string[]>([]);
  const [sauceIds, setSauceIds] = useState<string[]>([]);

  const compatibleSauces = useMemo(() => {
    if (!item.compatibleSauceIds) return [];
    return menu.sauces.filter(
      (s) => item.compatibleSauceIds?.includes(s.id) && s.status !== "coming-soon",
    );
  }, [item, menu.sauces]);

  const sauceCap = sauceCapFor(item, menu);

  const unitPrice = useMemo(() => {
    const mods = modIds.reduce(
      (sum, id) => sum + (item.modifiers?.find((m) => m.id === id)?.addPence ?? 0),
      0,
    );
    return item.pricePence + mods;
  }, [item, modIds]);

  const totalPrice = unitPrice * qty;

  const toggleMod = (id: string) =>
    setModIds((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const toggleSauce = (id: string) =>
    setSauceIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (sauceCap <= 1) return [id];
      if (prev.length >= sauceCap) return prev;
      return [...prev, id];
    });

  const handleAdd = () => {
    setMenuUpdatedAt(menu.updatedAt);
    const modifierLabels = modIds
      .map((id) => item.modifiers?.find((m) => m.id === id)?.label)
      .filter((v): v is string => !!v);
    const sauceLabels = sauceIds
      .map((id) => menu.sauces.find((s) => s.id === id)?.name)
      .filter((v): v is string => !!v);
    const modPointsSum = modIds.reduce(
      (sum, id) => sum + (item.modifiers?.find((m) => m.id === id)?.pointsPrice ?? 0),
      0,
    );
    const pointsPricePerUnit =
      item.pointsPrice == null
        ? null
        : item.pointsPrice +
          (item.modifiers?.some((m) => modIds.includes(m.id) && m.pointsPrice == null)
            ? 0
            : modPointsSum);
    addLine({
      menuItemId: item.id,
      name: item.name,
      imageUrl: item.imageUrl,
      unitPricePence: unitPrice,
      pointsValuePerUnit: item.pointsValue,
      pointsPricePerUnit,
      selectedModifierIds: modIds,
      selectedSauceIds: sauceIds,
      modifierLabels,
      sauceLabels,
      quantity: qty,
    });
    onOpenChange(false);
  };

  const sauceHeading =
    sauceCap > 1
      ? `Pick up to ${sauceCap} sauces (${sauceIds.length}/${sauceCap})`
      : "Pick a sauce";

  return (
    <PphSheet open={open} onOpenChange={onOpenChange}>
      <PphSheetContent
        title={item.name}
        description={item.description || undefined}
        footer={
          <div className="flex items-center gap-3">
            <div className="w-32 shrink-0">
              <QuantityStepper value={qty} onChange={setQty} min={1} />
            </div>
            <BrandButton variant="primary" size="lg" className="flex-1" onClick={handleAdd}>
              Add {qty} · {pence(totalPrice)}
            </BrandButton>
          </div>
        }
      >
        <div className="-mx-4 -mt-3 mb-4">
          <FoodThumb src={item.imageUrl} alt={item.name} size="hero" />
        </div>

        {item.modifiers && item.modifiers.length > 0 ? (
          <section className="mt-1">
            <h3 className="mb-2 font-display text-xs font-bold uppercase tracking-wide text-neutral-500">
              Customise
            </h3>
            <div className="flex flex-wrap gap-2">
              {item.modifiers.map((m) => {
                const active = modIds.includes(m.id);
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => toggleMod(m.id)}
                    className={`rounded-md border px-3 py-1.5 text-sm font-medium ${
                      active
                        ? "border-brand-pink bg-brand-pink text-brand-black"
                        : "border-neutral-200 text-brand-black"
                    }`}
                  >
                    {m.label}
                    {m.addPence > 0 ? ` +${pence(m.addPence)}` : ""}
                  </button>
                );
              })}
            </div>
          </section>
        ) : null}

        {compatibleSauces.length > 0 && sauceCap > 0 ? (
          <section className="mt-5">
            <h3 className="mb-2 font-display text-xs font-bold uppercase tracking-wide text-neutral-500">
              {sauceHeading}
            </h3>
            <div className="space-y-2">
              {compatibleSauces.map((s) => {
                const active = sauceIds.includes(s.id);
                const atCap = !active && sauceCap > 1 && sauceIds.length >= sauceCap;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => toggleSauce(s.id)}
                    disabled={atCap}
                    className={`flex w-full items-center justify-between rounded-md border px-3 py-2.5 text-left transition ${
                      active
                        ? "border-brand-pink bg-brand-pink text-brand-black"
                        : "border-neutral-200 bg-brand-white text-brand-black"
                    } ${atCap ? "opacity-40" : ""}`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="font-display text-sm font-bold uppercase tracking-tight">
                        {s.name}
                      </div>
                      <div className="mt-0.5 flex items-center gap-1">
                        <HeatRow heat={s.heat} />
                        {s.status === "limited" ? (
                          <span className="ml-1 text-[10px] font-bold uppercase text-brand-red">
                            Limited
                          </span>
                        ) : null}
                      </div>
                    </div>
                    {active ? <Check className="h-4 w-4" strokeWidth={2.5} /> : null}
                  </button>
                );
              })}
            </div>
          </section>
        ) : null}
      </PphSheetContent>
    </PphSheet>
  );
}

function HeatRow({ heat }: { heat: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`Heat ${heat} of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-full ${i <= heat ? "bg-brand-red" : "bg-neutral-300"}`}
        />
      ))}
    </span>
  );
}
