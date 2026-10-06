"use client";

import { BrandButton } from "@/components/brand/BrandButton";
import { OrderTriggerButton } from "@/components/sections/order-panel/OrderTriggerButton";
import {
  suggestDipsFor,
  type Flavour,
} from "@/lib/flavours/flavour-lab-data";

// Single-flavour LE spotlight above the /menu pills. If multiple actives land,
// lift this to accept `flavours: Flavour[]` and wrap in a snap-x rail. For now,
// single record only.

function Flame({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className} fill="currentColor">
      <path d="M8 1s3 3 3 6a3 3 0 1 1-6 0c0-1 .5-2 .5-2S6 6 6 5c0-2 2-4 2-4Zm3 8a3 3 0 0 1-6 0c0 3 1.5 6 3 6s3-3 3-6Z" />
    </svg>
  );
}

function HeatFlames({ level }: { level: number }) {
  if (level <= 0) return null;
  const clamped = Math.min(5, Math.max(0, Math.round(level)));
  return (
    <span
      className="inline-flex items-center gap-0.5 text-brand-white"
      aria-label={`Heat ${clamped} of 5`}
    >
      {Array.from({ length: clamped }).map((_, i) => (
        <Flame key={i} className="size-4" />
      ))}
    </span>
  );
}

interface LimitedEditionSpotlightProps {
  flavour: Flavour | null | undefined;
}

export function LimitedEditionSpotlight({ flavour }: LimitedEditionSpotlightProps) {
  if (!flavour || flavour.status !== "active") return null;

  const dips = suggestDipsFor(flavour, 2);

  return (
    <section
      aria-label={`Limited Edition flavour: ${flavour.name}`}
      className="mx-auto mt-4 w-full max-w-6xl px-4 md:px-8"
    >
      <div
        className="relative overflow-hidden rounded-2xl px-5 py-6 text-brand-white md:px-10 md:py-10"
        style={{
          backgroundColor: "var(--color-le-purple)",
          boxShadow: "inset 0 0 80px rgba(255,255,255,0.08)",
        }}
      >
        <div className="md:grid md:grid-cols-[1fr_200px] md:gap-8">
          <div>
            <span className="inline-flex items-center gap-2 font-display text-[11px] font-extrabold uppercase tracking-[0.2em]">
              <span className="animate-flicker">LE</span>
              <span className="text-brand-white/70">Limited Edition</span>
            </span>

            <h2 className="mt-3 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight md:text-6xl">
              {flavour.name}
            </h2>

            {flavour.shortDescription && (
              <p className="mt-3 max-w-xl font-body text-base leading-relaxed text-brand-white/90 md:text-lg">
                {flavour.shortDescription}
              </p>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <HeatFlames level={flavour.heat} />
              {dips.length > 0 && (
                <ul className="flex flex-wrap items-center gap-2">
                  {dips.map((dip) => (
                    <li
                      key={dip.slug}
                      className="rounded-full bg-brand-white/15 px-3 py-1 font-display text-xs font-bold uppercase tracking-wider"
                    >
                      {dip.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <OrderTriggerButton variant="primary" size="md">
                Order
              </OrderTriggerButton>
              <BrandButton
                variant="inverse"
                size="md"
                href="/flavour-lab"
                className="text-[var(--color-le-purple)]"
              >
                Spin the Lab →
              </BrandButton>
            </div>
          </div>

          {/* Placeholder graphic — hidden below md until a real photo lands.
              See data-todo for grepping when assets arrive. */}
          <div
            data-todo="assets"
            aria-hidden="true"
            className="hidden md:flex md:items-center md:justify-center"
          >
            <div className="relative aspect-square w-full max-w-[200px]">
              <div
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-center font-display text-xl font-extrabold uppercase leading-[0.9] tracking-tight text-brand-white/25">
                {flavour.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
