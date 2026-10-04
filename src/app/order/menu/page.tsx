"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart/context";
import { useAuth, authStore } from "@/lib/pph/auth-store";
import { useLocations, useMenu } from "@/lib/pph/hooks";
import type { MenuItem } from "@/lib/pph/types";
import { useOrderStack } from "@/lib/order-stack/context";
import { BasketBar } from "@/components/pph/BasketBar";
import { DeliverySheet } from "@/components/pph/DeliverySheet";
import { ItemSheet } from "@/components/pph/ItemSheet";
import { LocationSheet } from "@/components/pph/LocationSheet";
import { MenuList } from "@/components/pph/MenuList";
import { OrderStatusCard } from "@/components/pph/OrderStatusCard";
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
  const { active } = useOrderStack();
  const auth = useAuth();
  const [deliveryOpen, setDeliveryOpen] = useState(false);

  // Rehydrate auth once on mount.
  useEffect(() => {
    authStore.rehydrate();
  }, []);

  const topActive = active[0] ?? null;

  return (
    <>
      <TopBar
        title={activeLocation ? `Pick up · ${shortName(activeLocation.name)}` : "Menu"}
        right={
          <>
            <button
              type="button"
              onClick={() => setLocSheetOpen(true)}
              className="rounded-md bg-brand-pink px-2 py-1 text-xs font-bold uppercase text-brand-black"
            >
              Change
            </button>
            <Link
              href="/order/account"
              className="rounded-md border border-neutral-200 px-2 py-1 text-xs font-bold uppercase"
            >
              {auth.status === "authenticated" ? "Account" : "Sign in"}
            </Link>
          </>
        }
      />
      {topActive ? (
        <div className="px-4 pt-3">
          <OrderStatusCard order={topActive} />
        </div>
      ) : null}
      <div className="px-4 pt-3">
        <button
          type="button"
          onClick={() => setDeliveryOpen(true)}
          className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm font-bold"
        >
          Prefer delivery? Open an aggregator →
        </button>
      </div>
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
      <DeliverySheet open={deliveryOpen} onOpenChange={setDeliveryOpen} />
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
