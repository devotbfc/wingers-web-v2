"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BrandButton } from "@/components/brand/BrandButton";
import { useOrderPanel } from "@/components/sections/order-panel";
import {
  ALLERGEN_ITEMS,
  getPriceLabel,
  getPriceValue,
  isItemAvailableAt,
  type MenuItem,
  type MenuLocationCode,
} from "@/lib/menu";
import { track } from "@/lib/analytics/meta-pixel";
import { cn } from "@/lib/utils";

// Build once at module load. A menu item's slug maps to an allergen row
// id (#item-{slug}) only when there's a matching record in ALLERGEN_ITEMS.
// Wings/boneless/tenders flavour variants + combo platters don't carry
// their own allergen row (sauce doesn't change the base profile), so
// those fall back to /allergies with no anchor.
const ALLERGEN_ROW_SLUGS: ReadonlySet<string> = new Set(
  ALLERGEN_ITEMS.map((i) => i.slug),
);

function allergenHrefFor(slug: string): string {
  return ALLERGEN_ROW_SLUGS.has(slug)
    ? `/allergies#item-${slug}`
    : "/allergies";
}

const W_MARK = "/brand/logo/wingers-mark.png";

function Flame({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M8 1s3 3 3 6a3 3 0 1 1-6 0c0-1 .5-2 .5-2S6 6 6 5c0-2 2-4 2-4Zm3 8a3 3 0 0 1-6 0c0 3 1.5 6 3 6s3-3 3-6Z" />
    </svg>
  );
}

function HeatFlames({ level }: { level: number }) {
  if (level <= 0) return null;
  const clamped = Math.min(5, Math.max(0, Math.round(level)));
  return (
    <span
      className="inline-flex items-center gap-0.5 text-brand-red"
      aria-label={`Heat ${clamped} of 5`}
    >
      {Array.from({ length: clamped }).map((_, i) => (
        <Flame key={i} className="size-4" />
      ))}
    </span>
  );
}

// Pink arch + black W-mark fallback. Used wherever an item has no photo
// (both the closed thumbnail and the expanded hero image). Never
// borrows another item's picture — correction 2 from the phone review.
function MissingPhotoTile({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("relative bg-brand-pink", className)}>
      <Image
        src={W_MARK}
        alt=""
        fill
        sizes="(min-width: 768px) 50vw, 50vw"
        className="object-contain p-4"
        style={{ filter: "brightness(0)" }}
      />
    </div>
  );
}

interface MenuItemCardProps {
  item: MenuItem;
  locationSlug: string;
  code: MenuLocationCode;
  isOpen: boolean;
  onToggle: (slug: string) => void;
  isPast?: boolean;
}

export function MenuItemCard({
  item,
  locationSlug,
  code,
  isOpen,
  onToggle,
  isPast = false,
}: MenuItemCardProps) {
  const { openPanel } = useOrderPanel();
  const reduced = useReducedMotion();
  const priceLabel = getPriceLabel(item, code);
  const priceValue = getPriceValue(item, code);
  const available = isItemAvailableAt(item, code) && !isPast;
  const hasPhoto = Boolean(item.photo);
  const allergenHref = allergenHrefFor(item.slug);

  // ViewContent fires ONLY from this handler, in exactly one call site
  // sitewide (the deleted MenuCard.tsx:299 call was the only other one).
  // Mirrors the previous params shape so dashboards and ad audiences
  // don't shift.
  function handleOrder() {
    const params: Record<string, unknown> = {
      content_ids: [item.slug],
      content_name: item.name,
      content_type: "product",
    };
    if (priceValue != null) {
      params.value = priceValue;
      params.currency = "GBP";
    }
    track("ViewContent", params);
    openPanel(locationSlug);
  }

  return (
    <motion.article
      layout="position"
      transition={{
        layout: {
          duration: reduced ? 0 : 0.3,
          ease: [0.23, 1, 0.32, 1],
        },
      }}
      className={cn(
        "overflow-hidden rounded-[24px] bg-brand-white",
        isPast && "opacity-60 grayscale",
      )}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={`menu-item-${item.slug}-body`}
        onClick={() => onToggle(item.slug)}
        className="flex w-full items-stretch gap-3 p-2.5 text-left md:gap-4 md:p-3"
      >
        {hasPhoto ? (
          <div className="relative h-[92px] w-[80px] shrink-0 overflow-hidden bg-brand-white [border-radius:999px_999px_14px_14px] md:h-[108px] md:w-[96px]">
            <Image
              src={item.photo!}
              alt={item.name}
              fill
              sizes="(min-width: 768px) 96px, 80px"
              className="object-cover"
            />
          </div>
        ) : (
          <MissingPhotoTile className="h-[92px] w-[80px] shrink-0 overflow-hidden [border-radius:999px_999px_14px_14px] md:h-[108px] md:w-[96px]" />
        )}

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
          <h3 className="font-display text-base font-extrabold uppercase leading-[1.05] tracking-tight text-brand-black md:text-lg">
            {item.name}
          </h3>
          {item.description && !isOpen && (
            <p className="line-clamp-2 font-body text-[13px] leading-snug text-brand-black/70">
              {item.description}
            </p>
          )}
          {priceLabel && (
            <span className="mt-0.5 font-display text-sm font-extrabold leading-none tracking-wide tabular-nums text-brand-black">
              {priceLabel}
            </span>
          )}
          {!available && !isPast && (
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.18em] text-brand-red">
              Not at this shop
            </span>
          )}
        </div>

        <span
          aria-hidden="true"
          className={cn(
            "ml-auto inline-flex h-11 w-11 shrink-0 items-center justify-center self-center rounded-full bg-brand-pink text-brand-black transition-transform motion-reduce:transition-none",
            isOpen && "rotate-45",
          )}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
            <path
              d="M12 5v14M5 12h14"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.6}
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="expanded"
            id={`menu-item-${item.slug}-body`}
            initial={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, height: "auto" }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{
              duration: reduced ? 0.15 : 0.3,
              ease: [0.23, 1, 0.32, 1],
            }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-4 px-2.5 pb-4 md:px-3 md:pb-5">
              {/* Large hero image renders ONLY when expanded, keeping the
                  closed-card payload tiny. Pink-W fallback mirrors the
                  closed thumbnail — never borrows another item's photo. */}
              {hasPhoto ? (
                <div className="relative h-[260px] w-full overflow-hidden bg-brand-white [border-radius:999px_999px_18px_18px] md:h-[320px]">
                  <Image
                    src={item.photo!}
                    alt={item.name}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <MissingPhotoTile className="h-[260px] w-full overflow-hidden [border-radius:999px_999px_18px_18px] md:h-[320px]" />
              )}

              {item.description && (
                <p className="font-body text-base leading-relaxed text-brand-black/80">
                  {item.description}
                </p>
              )}

              {item.spice > 0 && (
                <div className="flex items-center gap-3">
                  <span className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-brand-black/60">
                    Heat
                  </span>
                  <HeatFlames level={item.spice} />
                </div>
              )}

              <Link
                href={allergenHref}
                className="w-fit font-body text-[13px] font-semibold text-brand-black underline underline-offset-4 hover:text-brand-red"
              >
                Allergens for this item →
              </Link>

              <div className="flex items-stretch gap-2">
                <BrandButton
                  variant="primary"
                  size="lg"
                  disabled={!available}
                  onClick={handleOrder}
                  className="w-full justify-center"
                >
                  {available ? "Order" : "Unavailable"}
                </BrandButton>
                <button
                  type="button"
                  aria-label="Close item"
                  onClick={() => onToggle(item.slug)}
                  className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-warm-grey text-brand-black transition-colors hover:bg-brand-warm-grey/80"
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-5 w-5"
                  >
                    <path
                      d="M6 15l6-6 6 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.6}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
