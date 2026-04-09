"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import PixelAgent from "@/components/PixelAgent";

const EASE = [0.22, 1, 0.36, 1] as const;
const MAX_PHASE = 4;

/* ── Tiny document icon (reused for Revisions / Feedback / Review) ── */
function DocIcon({
  label,
  accent,
  checkmark,
}: {
  label: string;
  accent?: string;
  checkmark?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="w-[52px] h-[64px] rounded-lg bg-white border border-ink-20 flex flex-col items-center justify-center gap-1.5 relative">
        {/* Lines representing text */}
        <div className="w-7 h-[2px] rounded-full bg-ink-20" />
        <div
          className="w-7 h-[2px] rounded-full"
          style={{ backgroundColor: accent || "var(--color-ink-20)" }}
        />
        <div className="w-5 h-[2px] rounded-full bg-ink-20" />
        {checkmark && (
          <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full bg-white border border-ink-20 flex items-center justify-center">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4ade80"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
        )}
      </div>
      <span className="text-[10px] tracking-[1.5px] uppercase text-ink-40 font-medium">
        {label}
      </span>
    </div>
  );
}

export default function L4WorkSlide() {
  const [phase, setPhase] = useState(0);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const isForward =
        e.key === "ArrowRight" || e.key === " " || e.key === "Enter";
      const isBackward = e.key === "ArrowLeft";

      if (isForward && phase < MAX_PHASE) {
        e.preventDefault();
        e.stopImmediatePropagation();
        setPhase((p) => p + 1);
        return;
      }
      if (isBackward && phase > 0) {
        e.preventDefault();
        e.stopImmediatePropagation();
        setPhase((p) => p - 1);
        return;
      }
    },
    [phase]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [handleKeyDown]);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Phase 0: Title + Milestone card */}
      {phase === 0 && (
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <h2 className="font-serif text-[32px] text-ink mb-10 text-center">
            How the actual work happens
          </h2>
          <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] px-8 py-6 text-center">
            <div className="text-[10px] tracking-[1.5px] uppercase text-ink-40 mb-3 font-medium">
              Milestone 2
            </div>
            <p className="font-serif text-[20px] leading-tight text-ink">
              Outline the
              <br />
              narrative
            </p>
          </div>
        </motion.div>
      )}

      {/* Phase 1+: Spatial flow diagram */}
      {phase >= 1 && (
        <div className="relative" style={{ width: 700, height: 560 }}>
          {/* SVG layer for dashed connection lines */}
          <svg
            className="absolute inset-0 pointer-events-none"
            width="700"
            height="560"
            fill="none"
          >
            {/* Vlad → Goal Agent (horizontal dashed line) */}
            <motion.line
              x1="170"
              y1="175"
              x2="280"
              y2="175"
              stroke="var(--color-ink-20)"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
            />

            {/* Goal Agent → Milestone 2 Agent (vertical dashed "CONTEXT") */}
            <motion.line
              x1="390"
              y1="220"
              x2="390"
              y2="340"
              stroke="var(--color-ink-20)"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.6 }}
            />

            {/* Phase 2+: Goal Agent → Revisions doc (curved right) */}
            {phase >= 2 && (
              <motion.path
                d="M 470 175 C 540 175, 560 220, 560 280"
                stroke="var(--color-ink-20)"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
              />
            )}

            {/* Phase 3+: Feedback doc → M2 Agent (down) */}
            {phase >= 3 && (
              <>
                <motion.line
                  x1="310"
                  y1="320"
                  x2="340"
                  y2="370"
                  stroke="var(--color-ink-20)"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.4, ease: EASE, delay: 0.3 }}
                />
                {/* Revisions → back up curve to Goal Agent */}
                <motion.path
                  d="M 560 340 C 560 420, 500 450, 430 430"
                  stroke="var(--color-ink-20)"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
                />
              </>
            )}

            {/* Phase 4: Vlad → Review → Goal Agent */}
            {phase >= 4 && (
              <>
                <motion.line
                  x1="175"
                  y1="140"
                  x2="240"
                  y2="130"
                  stroke="var(--color-ink-20)"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.4, ease: EASE, delay: 0.2 }}
                />
                <motion.line
                  x1="300"
                  y1="130"
                  x2="330"
                  y2="145"
                  stroke="var(--color-ink-20)"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.4, ease: EASE, delay: 0.3 }}
                />
              </>
            )}
          </svg>

          {/* Vlad headshot (placeholder) */}
          <motion.div
            className="absolute flex flex-col items-center"
            style={{ left: 80, top: 130 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <img
              src="/vlad-headshot.png"
              alt="Vlad"
              className="w-[100px] h-[100px] rounded-full object-cover"
            />
          </motion.div>

          {/* Goal Agent capsule */}
          <motion.div
            className="absolute"
            style={{ left: 280, top: 140 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: EASE, delay: 0.15 }}
          >
            <div className="bg-canvas rounded-full px-8 py-3 flex flex-col items-center gap-1.5">
              <PixelAgent color="#D97757" size={28} />
              <span className="text-[9px] tracking-[2px] uppercase text-white font-medium">
                Goal Agent
              </span>
            </div>
          </motion.div>

          {/* "CONTEXT" label */}
          <motion.div
            className="absolute text-[10px] tracking-[1.5px] uppercase text-ink-40 font-medium"
            style={{ left: 400, top: 265 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: EASE, delay: 0.7 }}
          >
            Context
          </motion.div>

          {/* Milestone 2 Agent circle */}
          <motion.div
            className="absolute"
            style={{ left: 310, top: 340 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.5 }}
          >
            <div className="w-[160px] h-[160px] rounded-full bg-canvas flex flex-col items-center justify-center gap-2">
              <PixelAgent color="#d478a8" size={32} />
              <span className="text-[9px] tracking-[2px] uppercase text-white font-medium leading-tight text-center">
                Milestone 2
                <br />
                Agent
              </span>
            </div>
          </motion.div>

          {/* Phase 2+: Revisions document */}
          <AnimatePresence>
            {phase >= 2 && (
              <motion.div
                className="absolute"
                style={{ left: 535, top: 270 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE, delay: 0.1 }}
              >
                <DocIcon label="Revisions" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Phase 3+: Feedback document */}
          <AnimatePresence>
            {phase >= 3 && (
              <motion.div
                className="absolute"
                style={{ left: 260, top: 260 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <DocIcon label="Feedback" accent="#ef4444" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Phase 4: Review document with checkmark */}
          <AnimatePresence>
            {phase >= 4 && (
              <motion.div
                className="absolute"
                style={{ left: 220, top: 90 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <DocIcon label="Review" accent="#4ade80" checkmark />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
