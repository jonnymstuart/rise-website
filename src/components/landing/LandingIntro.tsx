"use client";

import { useEffect, useRef } from "react";

const EASE = (t: number) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 4);

const COUNT_END = 1400;
const LIFT_START = 1400;
const REVEAL_END = 2400;

/**
 * Branded intro: counter 000→100 over a cream overlay while the contour field
 * pre-grows behind it, then the overlay lifts and the terrain floods in.
 * Writes revealRef (read by TopoField each frame); zero setState per frame.
 */
export function LandingIntro({
  revealRef,
  onDone,
}: {
  revealRef: React.MutableRefObject<number>;
  onDone: (skipped: boolean) => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealRef.current = 1.15;
      if (!doneRef.current) {
        doneRef.current = true;
        onDone(true);
      }
      return;
    }

    let raf = 0;
    const start = performance.now();
    let exited = false;
    let lifted = false;

    const finish = (skipped: boolean) => {
      if (doneRef.current) return;
      doneRef.current = true;
      cancelAnimationFrame(raf);
      revealRef.current = 1.15;
      onDone(skipped);
    };

    const tick = (now: number) => {
      const t = now - start;

      if (t <= COUNT_END) {
        const p = EASE(t / COUNT_END);
        if (counterRef.current) {
          counterRef.current.textContent = String(Math.round(p * 100)).padStart(3, "0");
        }
        revealRef.current = p * 0.35;
      } else {
        revealRef.current =
          0.35 + 0.8 * EASE((t - LIFT_START) / (REVEAL_END - LIFT_START));
      }

      if (t >= 1200 && !exited) {
        exited = true;
        for (const el of [markRef.current, counterRef.current]) {
          if (el) el.style.transform = "translateY(-110%)";
        }
      }

      if (t >= LIFT_START && !lifted) {
        lifted = true;
        overlay.style.transform = "translateY(-100%)";
        overlay.style.pointerEvents = "none";
      }

      if (t >= REVEAL_END) {
        finish(false);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const skip = () => finish(true);
    window.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
    };
  }, [revealRef, onDone]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[70] bg-page transition-transform duration-700 [transition-timing-function:var(--ease-rise)]"
      aria-hidden="true"
    >
      <div className="flex h-full flex-col justify-between p-6 sm:p-10">
        <span className="block overflow-hidden">
          <span
            ref={markRef}
            className="font-display inline-block text-[26px] font-medium leading-none tracking-[0.12em] text-ink transition-transform duration-200 [transition-timing-function:var(--ease-rise)]"
          >
            RISE
          </span>
        </span>
        <span className="block self-end overflow-hidden">
          <span
            ref={counterRef}
            className="inline-block font-sans text-[12px] tabular-nums tracking-[0.08em] text-ink/60 transition-transform duration-200 [transition-timing-function:var(--ease-rise)]"
          >
            000
          </span>
        </span>
      </div>
    </div>
  );
}
