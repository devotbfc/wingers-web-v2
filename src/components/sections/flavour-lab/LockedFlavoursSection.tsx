import { Lock } from "lucide-react";
import { DoubledHeading } from "@/components/typography/DoubledHeading";
import type { Flavour } from "@/lib/flavours";
import { HeatFlames } from "./FlameIcon";
import { TellMeWhenTheyDropButton } from "./TellMeWhenTheyDropButton";

type Variant = "coming-soon" | "past";

interface LockedFlavoursSectionProps {
  id: string;
  title: string;
  intro: string;
  badge: string;
  flavours: Flavour[];
  variant: Variant;
  // When set and variant === "coming-soon", renders a pill below the grid
  // that dispatches "wingers:open-signup" to open the sign-up slide-in.
  cta?: { label: string };
}

export function LockedFlavoursSection({
  id,
  title,
  intro,
  badge,
  flavours,
  variant,
  cta,
}: LockedFlavoursSectionProps) {
  if (flavours.length === 0) return null;

  const isPast = variant === "past";

  return (
    <section
      className={`py-16 md:py-24${isPast ? " opacity-80" : ""}`}
      aria-labelledby={`${id}-heading`}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <DoubledHeading
          text={title}
          as="h2"
          fillColor={isPast ? "brand-white" : "brand-pink"}
          shadowColor={isPast ? "brand-pink" : "brand-red"}
          offsetEm="0.06em"
          className={
            isPast
              ? "font-display text-[clamp(2.25rem,6vw,4rem)] font-extrabold uppercase leading-[0.9] tracking-tight opacity-60"
              : "font-display text-[clamp(2.5rem,7vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight"
          }
        />
        <p
          className={`mt-4 max-w-xl font-body text-base leading-relaxed ${
            isPast ? "text-brand-white/45" : "text-brand-white/60"
          }`}
        >
          {intro}
        </p>

        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {flavours.map((flavour) => (
            <article
              key={flavour.slug}
              className={`relative flex flex-col overflow-hidden rounded-2xl border px-4 py-5 md:px-5 ${
                isPast
                  ? "border-brand-white/10 bg-brand-white/[0.02]"
                  : "border-brand-pink/40 bg-brand-white/[0.03]"
              }`}
            >
              {!isPast && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-70"
                  style={{
                    background:
                      "radial-gradient(circle at 70% 20%, rgba(255,111,181,0.18), transparent 60%)",
                  }}
                />
              )}
              <div className="relative flex items-start justify-between gap-2">
                <HeatFlames heat={flavour.heat} />
                <Lock
                  className={
                    isPast
                      ? "h-4 w-4 text-brand-white/30"
                      : "h-4 w-4 text-brand-pink/70 drop-shadow-[0_0_6px_rgba(255,111,181,0.6)]"
                  }
                  aria-hidden="true"
                />
              </div>
              <h3
                className={`relative mt-3 font-display text-xl font-extrabold uppercase leading-tight tracking-tight md:text-2xl ${
                  isPast ? "text-brand-white/45" : "text-brand-white/70"
                }`}
              >
                {flavour.name}
              </h3>
              <p
                className={`relative mt-2 font-display text-[10px] font-bold uppercase tracking-[0.3em] ${
                  isPast
                    ? "text-brand-white/30 line-through"
                    : "text-brand-pink/70"
                }`}
              >
                {badge}
              </p>
            </article>
          ))}
        </div>
        {cta && !isPast ? (
          <div className="mt-8 flex justify-center md:mt-10">
            <TellMeWhenTheyDropButton label={cta.label} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
