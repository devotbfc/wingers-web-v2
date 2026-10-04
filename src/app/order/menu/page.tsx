"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart/context";
import { useLocations, useMenu } from "@/lib/pph/hooks";
import type { MenuItem } from "@/lib/pph/types";
import { BasketBar } from "@/components/pph/BasketBar";
import { ItemSheet } from "@/components/pph/ItemSheet";
import { LocationSheet } from "@/components/pph/LocationSheet";
import { MenuList } from "@/components/pph/MenuList";
import { TopBar } from "@/components/pph/TopBar";

export default function MenuPage() {
  const { locations } = useLocations();
  const { state, setLocation } = useCart();
  const [locSheetOpen, setLocSheetOpen] = useState(false);
  const [itemSheetOpen, setItemSheetOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);

  // Default to Milton Keynes on first load.
  useEffect(() => {
    if (!state.locationId && locations.length > 0) setLocation(locations[0].id);
  }, [locations, state.locationId, setLocation]);

  const activeLocation = locations.find((l) => l.id === state.locationId) ?? null;
  const { menu, loading } = useMenu(state.locationId);

  return (
    <>
      <TopBar
        title={activeLocation ? `Pick up · ${shortName(activeLocation.name)}` : "Menu"}
        right={
          <button
            type="button"
            onClick={() => setLocSheetOpen(true)}
            className="rounded-md bg-brand-pink px-2 py-1 text-xs font-bold uppercase text-brand-black"
          >
            Change
          </button>
        }
      />
      {loading || !menu ? (
        <div className="p-6 text-sm text-neutral-500">Loading menu…</div>
      ) : (
        <MenuList
          menu={menu}
          onOpenItem={(item) => {
            setActiveItem(item);
            setItemSheetOpen(true);
          }}
        />
      )}
      <BasketBar />
      <LocationSheet
        open={locSheetOpen}
        onOpenChange={setLocSheetOpen}
        locations={locations}
        activeLocationId={state.locationId}
        onConfirm={(id) => {
          setLocation(id);
          setLocSheetOpen(false);
        }}
      />
      {menu ? (
        <ItemSheet
          open={itemSheetOpen}
          onOpenChange={setItemSheetOpen}
          item={activeItem}
          menu={menu}
        />
      ) : null}
    </>
  );
}

function shortName(name: string): string {
  return name.replace(/^Wingers\s+/i, "");
}
