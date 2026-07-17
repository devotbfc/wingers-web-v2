"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Flavour } from "@/lib/flavours";

interface WheelProps {
  segments: Flavour[];
  rotation: number;
  spinning: boolean;
  onSpinComplete: () => void;
  onSpinClick: () => void;
}

const R = 100;
const CX = 110;
const CY = 110;

const PALETTE = [
  { fill: "var(--color-brand-pink)", text: "var(--color-brand-black)" },
  { fill: "var(--color-lab-black)", text: "var(--color-brand-white)" },
  { fill: "var(--color-brand-red)", text: "var(--color-brand-white)" },
  { fill: "var(--color-lab-black)", text: "var(--color-brand-white)" },
] as const;

function polar(angleDeg: number, radius: number) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: CX + radius * Math.cos(a), y: CY + radius * Math.sin(a) };
}

function labelFor(name: string, maxChars = 15): string {
  if (name.length <= maxChars) return name;
  const firstWord = name.split(/\s+/)[0];
  if (firstWord.length <= maxChars) return firstWord;
  return `${firstWord.slice(0, maxChars - 1)}…`;
}

export function Wheel({
  segments,
  rotation,
  spinning,
  onSpinComplete,
  onSpinClick,
}: WheelProps) {
  const reduce = useReducedMotion();
  const step = 360 / segments.length;

  return (
    <div className="relative aspect-square w-[min(82vw,340px)] md:w-[520px]">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 55%, rgba(255,111,181,0.55) 0%, rgba(255,45,45,0.3) 45%, transparent 70%)",
        }}
      />

      <div
        aria-hidden="true"
        className="animate-glow-ring pointer-events-none absolute inset-2 rounded-full"
      />

      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 z-10 h-0 w-0 -translate-x-1/2 -translate-y-2"
        style={{
          borderLeft: "16px solid transparent",
          borderRight: "16px solid transparent",
          borderTop: "26px solid var(--color-brand-pink)",
          filter: "drop-shadow(0 0 8px rgba(255,111,181,0.9))",
        }}
      />

      <svg
        viewBox="0 0 220 220"
        className="h-full w-full"
        role="img"
        aria-label={`Flavour wheel with ${segments.length} flavours`}
      >
        <motion.g
          animate={{ rotate: rotation }}
          transition={
            reduce
              ? { duration: 0 }
              : { duration: 4.5, ease: [0.22, 1, 0.36, 1] }
          }
          onAnimationComplete={onSpinComplete}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        >
          {segments.map((seg, i) => {
            const palette = PALETTE[i % PALETTE.length];
            const start = i * step - 90;
            const end = start + step;
            const p1 = polar(start, R);
            const p2 = polar(end, R);
            const mid = start + step / 2;
            const labelPos = polar(mid, R * 0.6);
            const norm = ((mid % 360) + 360) % 360;
            const flip = norm > 90 && norm < 270;
            const rot = flip ? mid + 180 : mid;
            return (
              <g key={seg.slug}>
                <path
                  d={`M ${CX} ${CY} L ${p1.x} ${p1.y} A ${R} ${R} 0 0 1 ${p2.x} ${p2.y} Z`}
                  fill={palette.fill}
                  stroke="rgba(0,0,0,0.4)"
                  strokeWidth={0.5}
                />
                <text
                  x={labelPos.x}
                  y={labelPos.y}
                  fill={palette.text}
                  fontSize="6"
                  fontWeight="800"
                  letterSpacing="0.02em"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${rot} ${labelPos.x} ${labelPos.y})`}
                  className="font-display uppercase"
                  style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}
                >
                  {labelFor(seg.name)}
                </text>
              </g>
            );
          })}
        </motion.g>

        <circle
          cx={CX}
          cy={CY}
          r="22"
          fill="var(--color-lab-black)"
          stroke="var(--color-brand-pink)"
          strokeWidth="2"
          style={{ filter: "drop-shadow(0 0 8px rgba(255,111,181,0.9))" }}
        />
        <text
          x={CX}
          y={CY}
          textAnchor="middle"
          dominantBaseline="central"
          fill="var(--color-brand-pink)"
          fontSize="8"
          fontWeight="800"
          className="font-display uppercase pointer-events-none"
          style={{ textShadow: "0 0 6px rgba(255,111,181,0.9)" }}
        >
          {spinning ? "…" : "SPIN"}
        </text>
      </svg>

      <button
        type="button"
        onClick={onSpinClick}
        disabled={spinning}
        className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-transparent md:h-24 md:w-24"
        aria-label={spinning ? "Wheel is spinning" : "Spin the wheel"}
      />
    </div>
  );
}

export const WHEEL_STEP_FOR = (count: number) => 360 / count;

export function computeTargetRotation(
  currentRotation: number,
  winnerIndex: number,
  segmentCount: number,
  fullSpins: number
): number {
  const step = 360 / segmentCount;
  const targetMod =
    ((-(winnerIndex * step + step / 2)) % 360 + 360) % 360;
  const currentMod = ((currentRotation % 360) + 360) % 360;
  const delta = (targetMod - currentMod + 360) % 360;
  return currentRotation + fullSpins * 360 + delta;
}
