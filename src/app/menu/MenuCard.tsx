"use client";

import Image from "next/image";
import { BrandButton } from "@/components/brand/BrandButton";
import { useOrderPanel } from "@/components/sections/order-panel";
import {
  ALLERGEN_LABELS,
  getPriceLabel,
  isCurrentLE,
  isItemAvailableAt,
  toMenuLocationCode,
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
  const clamped = Math.min(5, Math.max(0, Math.round(level)));
  return (
    <span
      className="inline-flex items-center gap-0.5 text-brand-red"
      aria-label={`Spice level ${clamped} of 5`}
      title={`Spice level ${clamped} of 5`}
    >
      {Array.from({ length: clamped }).map((_, i) => (
        <Flame key={i} className="size-4" />
      ))}
    </span>
  );
}

function Chip({
  children,
  className,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
}) {
  return (
    <span
      title={title}
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-1 font-display text-[10px] font-bold uppercase leading-none tracking-wide",
        className
      )}
    >
      {children}
    </span>
  );
}

interface MenuCardProps {
  item: MenuItem;
  locationSlug: string;
  variant?: "standard" | "past";
}

export function MenuCard({ item, locationSlug, variant = "standard" }: MenuCardProps) {
  const { openPanel } = useOrderPanel();
  const code = toMenuLocationCode(locationSlug);
  const priceLabel = getPriceLabel(item, code);
  const available = isItemAvailableAt(item, code) && variant !== "past";
  const tileColor = tileColorFor(item.slug);
  const hasPhoto = Boolean(item.photo);
  const currentLE = item.limitedEdition && isCurrentLE(item) && variant !== "past";
  const isPast = variant === "past";
  const containsLabels = item.contains.map((a) => ALLERGEN_LABELS[a]);
  const tracesLabels = item.traces.map((a) => ALLERGEN_LABELS[a]);
  const sizeList =
    item.sizes?.map((s) =>
      s.size.replace(/^(wings|boneless|tenders)\s+/i, "")
    ) ?? [];

  return (
    <article
      className={cn(
        "flex h-full flex-col bg-brand-white",
        isPast && "opacity-60 grayscale"
      )}
    >
      <div
        className={cn(
          "relative aspect-square w-full overflow-hidden",
          !hasPhoto && tileColor
        )}
        data-todo={hasPhoto ? undefined : "assets"}
      >
        {hasPhoto ? (
          <Image
            src={item.photo!}
            alt={item.name}
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
        {!available && !isPast && (
          <div className="absolute inset-0 flex items-center justify-center bg-brand-white/85">
            <span className="font-display text-xl font-extrabold uppercase tracking-tight text-brand-black text-center px-4 text-balance">
              Not at this shop
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 md:p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl font-extrabold uppercase leading-[0.95] tracking-tight text-balance text-brand-black">
            {item.name}
          </h3>
          {priceLabel && (
            <div className="flex shrink-0 flex-col items-end gap-1">
              <span className="font-display text-xl font-extrabold leading-[0.95] tracking-tight tabular-nums text-brand-black">
                {priceLabel}
              </span>
              {sizeList.length > 0 && (
                <span className="font-body text-[11px] uppercase tracking-[0.14em] whitespace-nowrap text-brand-black/50">
                  {sizeList.join(" · ")}
                </span>
              )}
            </div>
          )}
        </div>

        {item.description && (
          <p className="font-body text-sm leading-6 text-brand-black/70 line-clamp-3">
            {item.description}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-2">
          {item.signature && (
            <Chip className="bg-brand-pink text-brand-black">Signature</Chip>
          )}
          {currentLE && (
            <Chip className="bg-brand-red text-brand-white">Limited</Chip>
          )}
          {item.halal && (
            <Chip className="bg-brand-black text-brand-white" title="Halal">
              <CheckMark className="size-3" />
              Halal
            </Chip>
          )}
          {item.vegetarian && (
            <Chip className="bg-brand-black text-brand-white">V</Chip>
          )}
          <SpiceLevel level={item.spice} />
        </div>

        <div className="mt-auto space-y-1">
          <p className="text-[9px] uppercase tracking-[0.18em] text-brand-black/70">
            {containsLabels.length > 0
              ? `Contains: ${containsLabels.join(" · ")}`
              : "No declared allergens"}
          </p>
          {tracesLabels.length > 0 && (
            <p className="text-[9px] normal-case tracking-normal text-brand-black/45">
              May contain traces of {tracesLabels.join(", ")}.
            </p>
          )}
        </div>

        {!isPast && (
          <BrandButton
            variant="primary"
            size="md"
            disabled={!available}
            onClick={() => openPanel(locationSlug)}
            className="w-full justify-center"
          >
            {available ? "Order" : "Unavailable"}
          </BrandButton>
        )}
      </div>
    </article>
  );
}
