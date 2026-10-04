"use client";

import { useMemo, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { BrandButton } from "@/components/brand/BrandButton";
import { useCart } from "@/lib/cart/context";
import { pence } from "@/lib/pph/money";
import type { MenuItem, Menu } from "@/lib/pph/types";
import { QuantityStepper } from "./QuantityStepper";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: MenuItem | null;
  menu: Menu;
};

export function ItemSheet({ open, onOpenChange, item, menu }: Props) {
  const { addLine, setMenuUpdatedAt } = useCart();
  const [qty, setQty] = useState(1);
  const [modIds, setModIds] = useState<string[]>([]);
  const [sauceIds, setSauceIds] = useState<string[]>([]);

  const compatibleSauces = useMemo(() => {
    if (!item?.compatibleSauceIds) return [];
    return menu.sauces.filter((s) => item.compatibleSauceIds?.includes(s.id) && s.status !== "coming-soon");
  }, [item, menu.sauces]);

  const unitPrice = useMemo(() => {
    if (!item) return 0;
    const mods = modIds.reduce((sum, id) => sum + (item.modifiers?.find((m) => m.id === id)?.addPence ?? 0), 0);
    return item.pricePence + mods;
  }, [item, modIds]);

  const totalPrice = unitPrice * qty;

  if (!item) return null;

  const toggleMod = (id: string) =>
    setModIds((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const toggleSauce = (id: string) =>
    setSauceIds((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

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
          (item.modifiers?.some((m) => modIds.includes(m.id) && m.pointsPrice == null) ? 0 : modPointsSum);
    addLine({
      menuItemId: item.id,
      name: item.name,
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
    setQty(1);
    setModIds([]);
    setSauceIds([]);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="max-h-[90vh] overflow-y-auto rounded-t-xl pb-24">
        <SheetHeader>
          <SheetTitle className="font-display text-xl">{item.name}</SheetTitle>
        </SheetHeader>
        <div className="px-4">
          {item.description ? (
            <p className="text-sm text-neutral-600">{item.description}</p>
          ) : null}

          {item.modifiers && item.modifiers.length > 0 ? (
            <section className="mt-4">
              <h3 className="mb-2 font-display text-sm font-bold uppercase">Customise</h3>
              <div className="flex flex-wrap gap-2">
                {item.modifiers.map((m) => {
                  const active = modIds.includes(m.id);
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => toggleMod(m.id)}
                      className={`rounded-md border px-3 py-1.5 text-sm ${
                        active ? "border-brand-pink bg-brand-pink text-brand-black" : "border-neutral-300"
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

          {compatibleSauces.length > 0 ? (
            <section className="mt-4">
              <h3 className="mb-2 font-display text-sm font-bold uppercase">Sauces</h3>
              <div className="flex flex-wrap gap-2">
                {compatibleSauces.map((s) => {
                  const active = sauceIds.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggleSauce(s.id)}
                      className={`rounded-md border px-3 py-1.5 text-sm ${
                        active ? "border-brand-pink bg-brand-pink text-brand-black" : "border-neutral-300"
                      }`}
                    >
                      {s.name}
                      {s.status === "limited" ? " · limited" : ""}
                    </button>
                  );
                })}
              </div>
            </section>
          ) : null}

          <div className="mt-6 flex items-center justify-between">
            <QuantityStepper value={qty} onChange={setQty} min={1} />
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 border-t border-neutral-200 bg-brand-white p-3">
          <div className="mx-auto max-w-md">
            <BrandButton variant="primary" size="lg" className="w-full" onClick={handleAdd}>
              Add {qty} to basket · {pence(totalPrice)}
            </BrandButton>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
