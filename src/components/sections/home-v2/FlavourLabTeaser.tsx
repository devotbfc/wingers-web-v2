import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandButton } from "@/components/brand/BrandButton";
import { SPINNABLE_FLAVOURS } from "@/lib/flavours";
import {
  WHEEL_FLAME_GRADIENT_ID,
  pickSliceStyles,
  type SliceStyle,
} from "@/components/sections/flavour-lab/wheel-palette";

const PALETTE: readonly SliceStyle[] = [
  { fill: "var(--color-brand-pink)", text: "var(--color-brand-black)", kind: "palette" },
  { fill: "var(--color-brand-red)", text: "var(--color-brand-white)", kind: "palette" },
  { fill: "var(--color-brand-white)", text: "var(--color-brand-black)", kind: "palette" },
] as const;

const SLICE_STYLES = pickSliceStyles(SPINNABLE_FLAVOURS, PALETTE);

const SEGMENTS = SPINNABLE_FLAVOURS.map((f, i) => ({
  label: (f.wheelLabel ?? f.name).toUpperCase(),
  style: SLICE_STYLES[i],
}));

const R = 100;
const CX = 110;
const CY = 110;

function polar(angleDeg: number, radius: number) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: CX + radius * Math.cos(a), y: CY + radius * Math.sin(a) };
}

// Return 1 or 2 lines so long names don't truncate — mirrors Wheel.labelLinesFor.
function labelLinesFor(label: string, maxChars = 15): string[] {
  if (label.length <= maxChars) return [label];
  const spaceIndices: number[] = [];
  for (let i = 0; i < label.length; i++) {
    if (label[i] === " ") spaceIndices.push(i);
  }
  for (let i = spaceIndices.length - 1; i >= 0; i--) {
    const s = spaceIndices[i];
    const a = label.slice(0, s);
    const b = label.slice(s + 1);
    if (a.length <= maxChars && b.length <= maxChars) return [a, b];
  }
  return [label];
}

const HEADLINE_LINES = ["CAN'T", "DECIDE?"] as const;

export function FlavourLabTeaser() {
  const step = 360 / SEGMENTS.length;

  return (
    <section
      aria-labelledby="flavour-lab-heading"
      className="section-dark relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-20"
    >
      <p className="mb-4 text-center font-mono text-xs uppercase tracking-[0.35em] text-brand-red">
        Flavour Lab
      </p>

      <h2
        id="flavour-lab-heading"
        className="mb-10 text-center font-display font-extrabold uppercase leading-[0.85] tracking-tight text-brand-pink"
      >
        <span className="sr-only">Can&apos;t decide?</span>
        {HEADLINE_LINES.map((line) => (
          <span
            key={line}
            aria-hidden="true"
            className="block text-[clamp(3.25rem,18vw,7rem)]"
          >
            {line}
          </span>
        ))}
      </h2>

      <Link
        href="/flavour-lab"
        aria-label="Spin the wheel in the Flavour Lab"
        className="group relative mb-3 aspect-square w-[min(78vw,340px)] cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-pink"
      >
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 z-10 h-0 w-0 -translate-x-1/2 -translate-y-1"
          style={{
            borderLeft: "14px solid transparent",
            borderRight: "14px solid transparent",
            borderTop: "22px solid var(--color-brand-white)",
          }}
        />
        <svg
          viewBox="0 0 220 220"
          aria-hidden="true"
          className="h-full w-full motion-safe:animate-[spin_28s_linear_infinite]"
        >
          <defs>
            <radialGradient
              id={WHEEL_FLAME_GRADIENT_ID}
              cx={CX}
              cy={CY}
              r={R}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#FF2D2D" />
              <stop offset="0.6" stopColor="#FF7A00" />
              <stop offset="1" stopColor="#FFC400" />
            </radialGradient>
            <filter
              id="wheel-le-glow"
              x="-30%"
              y="-30%"
              width="160%"
              height="160%"
            >
              <feGaussianBlur stdDeviation="2" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="1.4" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {SEGMENTS.map((seg, i) => {
            const start = i * step - 90;
            const end = start + step;
            const p1 = polar(start, R);
            const p2 = polar(end, R);
            const mid = start + step / 2;
            const labelPos = polar(mid, R * 0.58);
            const tagPos = polar(mid, R * 0.86);
            const norm = ((mid % 360) + 360) % 360;
            const flip = norm > 90 && norm < 270;
            const rot = flip ? mid + 180 : mid;
            const pathD = `M ${CX} ${CY} L ${p1.x} ${p1.y} A ${R} ${R} 0 0 1 ${p2.x} ${p2.y} Z`;
            const pulsing = seg.style.kind === "le" || seg.style.kind === "hot";
            return (
              <g key={seg.label}>
                <path
                  d={pathD}
                  fill={seg.style.fill}
                  stroke={seg.style.kind === "le" ? "var(--color-le-purple)" : undefined}
                  strokeWidth={seg.style.kind === "le" ? 1.2 : undefined}
                  filter={seg.style.kind === "le" ? "url(#wheel-le-glow)" : undefined}
                  className={pulsing ? "animate-slice-pulse" : undefined}
                />
                {(() => {
                  const lines = labelLinesFor(seg.label);
                  return (
                    <text
                      x={labelPos.x}
                      y={labelPos.y}
                      fill={seg.style.text}
                      fontSize="5.5"
                      fontWeight="800"
                      letterSpacing="0.02em"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      transform={`rotate(${rot} ${labelPos.x} ${labelPos.y})`}
                      className="font-display uppercase"
                    >
                      {lines.length === 1 ? (
                        lines[0]
                      ) : (
                        lines.map((line, idx) => (
                          <tspan key={idx} x={labelPos.x} dy={idx === 0 ? "-0.4em" : "1em"}>
                            {line}
                          </tspan>
                        ))
                      )}
                    </text>
                  );
                })()}
              </g>
            );
          })}
          <circle
            cx={CX}
            cy={CY}
            r="18"
            fill="var(--color-brand-black)"
            stroke="var(--color-brand-white)"
            strokeWidth="3"
          />
          <circle cx={CX} cy={CY} r="4" fill="var(--color-brand-pink)" />
        </svg>
      </Link>

      <p className="mb-6 text-center font-display text-sm font-extrabold uppercase tracking-[0.25em] text-brand-pink">
        Spin it in the Lab →
      </p>

      <p className="mb-8 max-w-xs text-center font-body text-base leading-relaxed text-brand-white/70 text-pretty">
        Spin the wheel. Let the Lab pick your flavour.
      </p>

      <BrandButton variant="outline" size="md" href="/flavour-lab">
        <span className="inline-flex items-center gap-2">
          Enter the Lab
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </BrandButton>
    </section>
  );
}
