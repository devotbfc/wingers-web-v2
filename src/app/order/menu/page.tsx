"use client";

import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/lib/cart/context";
import { LOCATIONS } from "@/lib/locations";
import { authStore } from "@/lib/pph/auth-store";
import { useLocations, useMenu } from "@/lib/pph/hooks";
import type { MenuItem } from "@/lib/pph/types";
import { useOrderStack } from "@/lib/order-stack/context";
import { BasketBar } from "@/components/pph/BasketBar";
import { DeliverySheet, hasDeliveryLinks } from "@/components/pph/DeliverySheet";
import { DesktopBasketPanel } from "@/components/pph/DesktopBasketPanel";
import { ItemSheet } from "@/components/pph/ItemSheet";
import { MenuList } from "@/components/pph/MenuList";
import { OrderStatusCard } from "@/components/pph/OrderStatusCard";

export default function MenuPage() {
  const { locations } = useLocations();
  const { state, setLocation } = useCart();
  const [itemSheetOpen, setItemSheetOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);

  // Preselect from ?location=<slug> (set by the site-wide ORDER CTAs via
  // pushPullHubProvider.getOrderUrl). Falls back to the first location on
  // cold boot. If the URL slug points at a different shop than the one
  // currently loaded, the cart provider will clear the basket on switch —
  // intentional: the user clicked a different shop.
  useEffect(() => {
    if (locations.length === 0) return;
    const slug =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("location")
        : null;
    if (slug) {
      const normalised = slug.toLowerCase().replace(/-/g, " ");
      const match = locations.find((l) =>
        l.name.toLowerCase().includes(normalised),
      );
      if (match && match.id !== state.locationId) {
        setLocation(match.id);
        return;
      }
    }
    if (!state.locationId) setLocation(locations[0].id);
  }, [locations, state.locationId, setLocation]);

  const activeLocation = locations.find((l) => l.id === state.locationId) ?? null;
  const { menu, loading } = useMenu(state.locationId);
  const { active } = useOrderStack();
  const [deliveryOpen, setDeliveryOpen] = useState(false);

  useEffect(() => {
    authStore.rehydrate();
  }, []);

  const deliveryLinks = useMemo(() => {
    if (!activeLocation) return null;
    const siteLoc = LOCATIONS.find((l) =>
      activeLocation.name.toLowerCase().includes(l.slug.replace(/-/g, " ")),
    );
    if (!siteLoc) return null;
    return {
      deliverooUrl: siteLoc.deliverooUrl ?? null,
      uberEatsUrl: siteLoc.uberEatsUrl ?? null,
      justEatUrl: siteLoc.justEatUrl ?? null,
    };
  }, [activeLocation]);

  const topActive = active[0] ?? null;

  return (
    <>
      <div className="mx-auto w-full max-w-md lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8">
          <div className="min-w-0">
            {topActive ? <OrderStatusCard order={topActive} /> : null}
            {hasDeliveryLinks(deliveryLinks) ? (
              <div className="px-6 pt-3 lg:px-0">
                <button
                  type="button"
                  onClick={() => setDeliveryOpen(true)}
                  className="flex min-h-[48px] w-full items-center justify-between rounded-pill bg-pph-elevated px-5 font-display text-[13px] uppercase text-pph hover:opacity-90"
                >
                  Prefer delivery?
                  <span className="text-pph-pink">→</span>
                </button>
              </div>
            ) : null}
            {loading || !menu ? (
              <div className="p-6 font-body text-[14px] text-pph-muted">Loading menu…</div>
            ) : (
              <MenuList
                menu={menu}
                onOpenItem={(item) => {
                  setActiveItem(item);
                  setItemSheetOpen(true);
                }}
              />
            )}
          </div>
          <aside className="hidden lg:block">
            <div className="sticky top-36 self-start">
              <DesktopBasketPanel />
            </div>
          </aside>
        </div>
      </div>
      {deliveryLinks ? (
        <DeliverySheet open={deliveryOpen} onOpenChange={setDeliveryOpen} links={deliveryLinks} />
      ) : null}
      <BasketBar />
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
