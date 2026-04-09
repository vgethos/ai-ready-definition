"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import PixelAgent from "@/components/PixelAgent";

const EASE = [0.22, 1, 0.36, 1] as const;
const MAX_PHASE = 4;

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
    <div className="flex flex-col items-center gap-1">
      <div className="w-[44px] h-[54px] rounded-lg bg-white border border-ink-20 flex flex-col items-center justify-center gap-1 relative shadow-card">
        <div className="w-6 h-[2px] rounded-full bg-ink-20" />
        <div
          className="w-6 h-[2px] rounded-full"
          style={{ backgroundColor: accent || "var(--color-ink-20)" }}
        />
        <div className="w-4 h-[2px] rounded-full bg-ink-20" />
        {checkmark && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white border border-ink-20 flex items-center justify-center">
            <svg
              width="10"
              height="10"
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
      <span className="text-[9px] tracking-[1.5px] uppercase text-ink-40 font-medium">
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
          <h2 className="font-serif text-[44px] leading-[1.15] text-ink mb-10 text-center">
            How the actual work happens
          </h2>
          <div className="bg-white rounded-xl shadow-card px-8 py-6 text-center">
            <div className="text-[10px] tracking-[1.5px] uppercase text-ink-40 mb-3 font-medium">
              Milestone 2
            </div>
            <p className="text-[18px] leading-snug text-ink font-medium">
              Outline the
              <br />
              narrative
            </p>
          </div>
        </motion.div>
      )}

      {/* Phase 1+: Spatial flow diagram */}
      {phase >= 1 && (
        <div className="relative" style={{ width: 820, height: 520 }}>
          {/* SVG connection lines */}
          <svg
            className="absolute inset-0 pointer-events-none"
            width="820"
            height="520"
            fill="none"
          >
            {/* Vlad → Goal Agent dashed line */}
            <motion.line
              x1="230"
              y1="160"
              x2="320"
              y2="160"
              stroke="var(--color-ink-20)"
              strokeWidth="1"
              strokeDasharray="5 4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: EASE, delay: 0.3 }}
            />

            {/* Goal Agent → M2 Agent vertical dashed line */}
            <motion.line
              x1="420"
              y1="200"
              x2="420"
              y2="300"
              stroke="var(--color-ink-20)"
              strokeWidth="1"
              strokeDasharray="5 4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: EASE, delay: 0.6 }}
            />

            {/* Phase 2+: Goal Agent → Revisions (curve right+down) */}
            {phase >= 2 && (
              <motion.path
                d="M 510 155 C 600 140, 640 200, 630 265"
                stroke="var(--color-ink-20)"
                strokeWidth="1"
                strokeDasharray="5 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
              />
            )}

            {/* Phase 3+: Revisions → M2 (curve down+left) */}
            {phase >= 3 && (
              <>
                <motion.path
                  d="M 630 330 C 640 410, 560 450, 480 420"
                  stroke="var(--color-ink-20)"
                  strokeWidth="1"
                  strokeDasharray="5 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
                />
                {/* Feedback → M2 Agent */}
                <motion.line
                  x1="335"
                  y1="305"
                  x2="370"
                  y2="340"
                  stroke="var(--color-ink-20)"
                  strokeWidth="1"
                  strokeDasharray="5 4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, ease: EASE, delay: 0.3 }}
                />
              </>
            )}

            {/* Phase 4: Vlad → Review doc → Goal Agent */}
            {phase >= 4 && (
              <>
                <motion.line
                  x1="200"
                  y1="125"
                  x2="280"
                  y2="95"
                  stroke="var(--color-ink-20)"
                  strokeWidth="1"
                  strokeDasharray="5 4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, ease: EASE, delay: 0.15 }}
                />
                <motion.line
                  x1="340"
                  y1="95"
                  x2="380"
                  y2="125"
                  stroke="var(--color-ink-20)"
                  strokeWidth="1"
                  strokeDasharray="5 4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, ease: EASE, delay: 0.25 }}
                />
              </>
            )}
          </svg>

          {/* Vlad headshot */}
          <motion.div
            className="absolute"
            style={{ left: 110, top: 110 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <img
              src="/vlad-headshot.png"
              alt="Vlad"
              className="w-[90px] h-[90px] rounded-full object-cover"
            />
          </motion.div>

          {/* Goal Agent capsule */}
          <motion.div
            className="absolute"
            style={{ left: 325, top: 125 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: EASE, delay: 0.15 }}
          >
            <div className="bg-canvas rounded-full px-7 py-3 flex flex-col items-center gap-1.5">
              <PixelAgent color="#D97757" size={24} />
              <span className="text-[8px] tracking-[1.5px] uppercase text-white font-medium">
                Goal Agent
              </span>
            </div>
          </motion.div>

          {/* "CONTEXT" label */}
          <motion.div
            className="absolute text-[9px] tracking-[1.5px] uppercase text-ink-40 font-medium"
            style={{ left: 435, top: 245 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: EASE, delay: 0.7 }}
          >
            Context
          </motion.div>

          {/* Milestone 2 Agent circle */}
          <motion.div
            className="absolute"
            style={{ left: 340, top: 300 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.5 }}
          >
            <div className="w-[140px] h-[140px] rounded-full bg-canvas flex flex-col items-center justify-center gap-1.5">
              <PixelAgent color="#d478a8" size={28} />
              <span className="text-[8px] tracking-[1.5px] uppercase text-white font-medium leading-tight text-center">
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
                style={{ left: 610, top: 265 }}
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
                style={{ left: 290, top: 240 }}
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
                style={{ left: 270, top: 60 }}
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
