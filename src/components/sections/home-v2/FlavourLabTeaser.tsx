import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type React from "react";

const FLAVOURS = [
  "Korea Town",
  "Mango Habanero",
  "Hot Honey",
  "Tennessee BBQ",
  "Lemon Pepper",
  "Buffalo NY",
  "Garlic Parmesan",
  "Cajun",
  "Caribbean Jerk",
  "Naked",
  "Ghost Buffalo",
  "Mild Buffalo",
] as const;

const PALETTE = [
  { fill: "var(--color-brand-pink)", text: "var(--color-brand-black)" },
  { fill: "var(--color-brand-red)", text: "var(--color-brand-white)" },
  { fill: "var(--color-brand-white)", text: "var(--color-brand-black)" },
] as const;

const SEGMENTS = FLAVOURS.map((label, i) => ({
  label: label.toUpperCase(),
  ...PALETTE[i % PALETTE.length],
}));

const R = 100;
const CX = 110;
const CY = 110;

function polar(angleDeg: number, radius: number) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: CX + radius * Math.cos(a), y: CY + radius * Math.sin(a) };
}

function truncate(label: string, max: number) {
  return label.length > max ? `${label.slice(0, max - 1).trimEnd()}…` : label;
}

const HEADLINE_LINES = ["CAN'T", "DECIDE?"] as const;

const DOUBLED_STYLE = {
  "--dh-fill": "var(--color-brand-pink)",
  "--dh-shadow": "var(--color-brand-red)",
  "--dh-offset": "0.06em",
} as React.CSSProperties;

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
        className="mb-10 text-center font-display font-extrabold uppercase leading-[0.85] tracking-tight"
      >
        <span className="sr-only">Can&apos;t decide?</span>
        {HEADLINE_LINES.map((line) => (
          <span
            key={line}
            aria-hidden="true"
            data-text={line}
            className="doubled-heading block text-[clamp(3.25rem,18vw,7rem)]"
            style={DOUBLED_STYLE}
          >
            {line}
          </span>
        ))}
      </h2>

      <div className="relative mb-10 aspect-square w-[min(78vw,340px)]">
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
          className="h-full w-full motion-safe:animate-[spin_28s_linear_infinite]"
          role="img"
          aria-label="Flavour wheel with twelve flavours including Korea Town, Mango Habanero and Hot Honey"
        >
          {SEGMENTS.map((seg, i) => {
            const start = i * step - 90;
            const end = start + step;
            const p1 = polar(start, R);
            const p2 = polar(end, R);
            const mid = start + step / 2;
            const labelPos = polar(mid, R * 0.58);
            const norm = ((mid % 360) + 360) % 360;
            const flip = norm > 90 && norm < 270;
            const rot = flip ? mid + 180 : mid;
            return (
              <g key={seg.label}>
                <path
                  d={`M ${CX} ${CY} L ${p1.x} ${p1.y} A ${R} ${R} 0 0 1 ${p2.x} ${p2.y} Z`}
                  fill={seg.fill}
                />
                <text
                  x={labelPos.x}
                  y={labelPos.y}
                  fill={seg.text}
                  fontSize="5.5"
                  fontWeight="800"
                  letterSpacing="0.02em"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${rot} ${labelPos.x} ${labelPos.y})`}
                  className="font-display uppercase"
                >
                  {truncate(seg.label, 15)}
                </text>
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
      </div>

      <p className="mb-8 max-w-xs text-center font-body text-base leading-relaxed text-brand-white/70 text-pretty">
        Spin the wheel. Let the Lab pick your flavour.
      </p>

      <Link
        href="/flavour-lab"
        className="inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-pink px-8 font-display text-sm font-extrabold uppercase tracking-wide text-brand-black transition-colors hover:bg-brand-white"
      >
        Enter the Lab
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </section>
  );
}
