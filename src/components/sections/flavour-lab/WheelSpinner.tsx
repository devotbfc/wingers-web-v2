"use client";

import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useReducedMotion } from "motion/react";
import { SPINNABLE_FLAVOURS, type Flavour } from "@/lib/flavours";
import { Wheel, computeTargetRotation } from "./Wheel";
import { WheelResult } from "./WheelResult";

const SEGMENTS = SPINNABLE_FLAVOURS;

export interface WheelSpinnerHandle {
  /** Trigger a spin from outside the component (e.g. the hero's pink
   *  "Spin the wheel" button). No-ops if a spin is already in flight — one
   *  spin at a time. */
  spin: () => void;
}

interface WheelSpinnerProps {
  /** Called whenever the user taps spin-again — hook up to scroll back
   *  to the wheel on long pages. Defaults to no-op. */
  onSpinAgain?: () => void;
  className?: string;
}

/**
 * Interactive wheel state container. Owns rotation, spinning flag,
 * winner selection and the AnimatePresence hand-off to WheelResult.
 * Reused on `/flavour-lab` (now directly inside FlavourLabHero) and on
 * `/` (via FlavourLabTeaser) so both surfaces share one spin
 * implementation. Exposes `spin()` via ref so an external button can
 * trigger the same action as the central wheel hub.
 */
export const WheelSpinner = forwardRef<WheelSpinnerHandle, WheelSpinnerProps>(
  function WheelSpinner({ onSpinAgain, className }, ref) {
    const reduce = useReducedMotion();
    const [rotation, setRotation] = useState(0);
    const [spinning, setSpinning] = useState(false);
    const [winner, setWinner] = useState<Flavour | null>(null);
    const pendingWinnerRef = useRef<Flavour | null>(null);

    const spin = useCallback(() => {
      if (spinning) return;
      setWinner(null);
      const winnerIndex = Math.floor(Math.random() * SEGMENTS.length);
      pendingWinnerRef.current = SEGMENTS[winnerIndex];
      const fullSpins = reduce ? 0 : 5 + Math.floor(Math.random() * 3);
      const target = computeTargetRotation(
        rotation,
        winnerIndex,
        SEGMENTS.length,
        fullSpins,
      );
      setSpinning(true);
      setRotation(target);
      if (reduce) {
        setSpinning(false);
        setWinner(pendingWinnerRef.current);
        pendingWinnerRef.current = null;
      }
    }, [rotation, spinning, reduce]);

    useImperativeHandle(ref, () => ({ spin }), [spin]);

    const handleAnimationComplete = useCallback(() => {
      if (pendingWinnerRef.current) {
        setWinner(pendingWinnerRef.current);
        pendingWinnerRef.current = null;
        setSpinning(false);
      }
    }, []);

    const spinAgain = useCallback(() => {
      onSpinAgain?.();
      spin();
    }, [spin, onSpinAgain]);

    return (
      <div className={className}>
        <Wheel
          segments={SEGMENTS}
          rotation={rotation}
          spinning={spinning}
          onSpinClick={spin}
          onSpinComplete={handleAnimationComplete}
        />
        <WheelResult winner={winner} onSpinAgain={spinAgain} />
      </div>
    );
  },
);
