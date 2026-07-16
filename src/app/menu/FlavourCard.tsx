import { ALLERGEN_LABELS, type FlavourShowcaseItem } from "@/lib/menu";
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

function SpiceLevel({ level }: { level: number }) {
  if (level <= 0) return null;
  const clamped = Math.min(5, Math.max(0, Math.round(level)));
  return (
    <span
      className="inline-flex items-center gap-0.5"
      aria-label={`Spice level ${clamped} of 5`}
      title={`Spice level ${clamped} of 5`}
    >
      {Array.from({ length: clamped }).map((_, i) => (
        <Flame key={i} className="size-4" />
      ))}
    </span>
  );
}

interface FlavourCardProps {
  flavour: FlavourShowcaseItem;
}

export function FlavourCard({ flavour }: FlavourCardProps) {
  const tileColor = tileColorFor(flavour.slug);
  const containsLabels = flavour.contains.map((a) => ALLERGEN_LABELS[a]);
  const tracesLabels = flavour.traces.map((a) => ALLERGEN_LABELS[a]);

  return (
    <article className="flex h-full flex-col bg-brand-white">
      <div
        className={cn(
          "relative aspect-square w-full overflow-hidden flex items-center justify-center p-6",
          tileColor
        )}
      >
        <span className="font-display text-[clamp(1.75rem,9vw,2.75rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-center text-balance">
          {flavour.name}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 md:p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-extrabold uppercase leading-[0.95] tracking-tight text-balance text-brand-black">
            {flavour.name}
          </h3>
          <span className="text-brand-red">
            <SpiceLevel level={flavour.spice} />
          </span>
        </div>

        {flavour.description && (
          <p className="font-body text-sm leading-6 text-brand-black/70">
            {flavour.description}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-2">
          {flavour.limitedEdition && (
            <span className="inline-flex items-center bg-brand-red px-2.5 py-1 font-display text-[10px] font-bold uppercase leading-none tracking-wide text-brand-white">
              Limited
            </span>
          )}
        </div>

        <div className="mt-auto space-y-1">
          {containsLabels.length > 0 && (
            <p className="text-[10px] uppercase tracking-[0.18em] text-brand-black/70">
              Contains: {containsLabels.join(" · ")}
            </p>
          )}
          {tracesLabels.length > 0 && (
            <p className="text-[10px] normal-case tracking-normal text-brand-black/45">
              May contain traces of {tracesLabels.join(", ")}.
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
