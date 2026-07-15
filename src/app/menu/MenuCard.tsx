"use client";

import Image from "next/image";
import Link from "next/link";
import { BrandButton } from "@/components/brand/BrandButton";
import { useOrderPanel } from "@/components/sections/order-panel";
import {
  ALLERGEN_LABELS,
  getAllergenInfoForItem,
  getItemPrice,
  isItemAvailable,
  type LocationSlug,
  type MenuItem,
} from "@/lib/menu";
import { cn } from "@/lib/utils";

const TILE_COLORS = [
  "bg-brand-pink text-brand-black",
  "bg-brand-red text-brand-white",
  "bg-brand-black text-brand-white",
] as const;

function tileColorFor(slug: string): string {
  const sum = Array.from(slug).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return TILE_COLORS[sum % TILE_COLORS.length];
}

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

function CheckMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 8 3.5 3.5L13 5" />
    </svg>
  );
}

function SpiceLevel({ level }: { level: number }) {
  if (level <= 0) return null;
  return (
    <span
      className="inline-flex items-center gap-0.5 text-brand-red"
      aria-label={`Spice level ${level} of 3`}
      title={`Spice level ${level} of 3`}
    >
      {Array.from({ length: level }).map((_, i) => (
        <Flame key={i} className="size-4" />
      ))}
    </span>
  );
}

function HalalBadge() {
  return (
    <span
      className="inline-flex items-center gap-1 bg-brand-black px-2.5 py-1 leading-none text-brand-white"
      aria-label="Halal certified"
      title="Halal"
    >
      <CheckMark className="size-3" />
      <span className="font-display text-[10px] uppercase tracking-wide">
        Halal
      </span>
    </span>
  );
}

interface MenuCardProps {
  item: MenuItem;
  locationSlug: LocationSlug;
}

export function MenuCard({ item, locationSlug }: MenuCardProps) {
  const { openPanel } = useOrderPanel();
  const price = getItemPrice(item, locationSlug);
  const available = isItemAvailable(item, locationSlug);
  const tileColor = tileColorFor(item.slug);
  const hasPhoto = Boolean(item.image);
  const allergenInfo = getAllergenInfoForItem(item);
  const containsLabels = allergenInfo?.contains.map((a) => ALLERGEN_LABELS[a]) ?? [];
  const tracesLabels = allergenInfo?.traces.map((a) => ALLERGEN_LABELS[a]) ?? [];

  return (
    <article className="flex h-full flex-col bg-brand-white">
      <div
        className={cn(
          "relative aspect-square w-full overflow-hidden",
          !hasPhoto && tileColor
        )}
        data-todo={hasPhoto ? "assets" : undefined}
      >
        {hasPhoto ? (
          <Image
            src={item.image!}
            alt={item.imageAlt ?? item.name}
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-6">
            <span className="font-display text-[clamp(2rem,10vw,3rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-center text-balance">
              {item.name}
            </span>
          </div>
        )}
        {!available && (
          <div className="absolute inset-0 flex items-center justify-center bg-brand-white/85">
            <span className="font-display text-2xl font-extrabold uppercase tracking-tight text-brand-black">
              Sold out
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 md:p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl font-extrabold uppercase leading-[0.95] tracking-tight text-balance text-brand-black">
            {item.name}
          </h3>
          <span className="shrink-0 font-display text-2xl font-extrabold leading-[0.95] tracking-tight tabular-nums text-brand-black">
            £{price.toFixed(2)}
          </span>
        </div>

        <p className="font-body text-sm leading-6 text-brand-black/70 line-clamp-2">
          {item.description}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          {item.isSignature && (
            <span className="bg-brand-pink px-2.5 py-1 font-display text-[11px] font-bold uppercase leading-none tracking-wide text-brand-black">
              Signature
            </span>
          )}
          {item.isHalal && <HalalBadge />}
          {item.spiceLevel ? <SpiceLevel level={item.spiceLevel} /> : null}
        </div>

        <div className="mt-auto space-y-1">
          {allergenInfo ? (
            <>
              <p className="text-[10px] uppercase tracking-[0.18em] text-brand-black/70">
                {containsLabels.length > 0
                  ? `Contains: ${containsLabels.join(" · ")}`
                  : "No declared allergens"}
              </p>
              {tracesLabels.length > 0 && (
                <p className="text-[10px] normal-case tracking-normal text-brand-black/45">
                  May contain traces of {tracesLabels.join(", ")}.
                </p>
              )}
            </>
          ) : (
            <p className="text-[10px] uppercase tracking-[0.18em] text-brand-black/50">
              <Link
                href="/allergies"
                className="underline decoration-brand-black/30 underline-offset-2 hover:decoration-brand-black"
              >
                See allergen guide
              </Link>
            </p>
          )}
        </div>

        <BrandButton
          variant="primary"
          size="md"
          disabled={!available}
          onClick={() => openPanel(locationSlug)}
          className="w-full justify-center"
        >
          {available ? "Order" : "Unavailable"}
        </BrandButton>
      </div>
    </article>
  );
}
