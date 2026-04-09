"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function L4WorkLoopSlide() {
  const [phase, setPhase] = useState(0);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const isForward =
        e.key === "ArrowRight" || e.key === " " || e.key === "Enter";
      const isBackward = e.key === "ArrowLeft";

      if (isForward && phase < 3) {
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
      <div className="flex flex-col items-center max-w-[520px] w-full">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <span className="text-[11px] tracking-[1.5px] uppercase font-medium px-3 py-1 rounded-full bg-cypress text-white">
            Level 4
          </span>
          <h2 className="font-serif text-[44px] leading-[1.15] text-ink">
            How the Work Gets Done
          </h2>
        </motion.div>

        {/* Two agent nodes side by side */}
        <motion.div
          className="flex items-center justify-center gap-16 w-full mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
        >
          {/* M2 Agent node */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-cypress text-white flex items-center justify-center text-[13px] font-semibold">
              M2
            </div>
            <span className="text-[11px] tracking-[1.5px] uppercase font-medium text-deck-secondary">
              Agent
            </span>
          </div>

          {/* Arrow space between nodes */}
          <div className="flex flex-col items-center gap-1 min-w-[80px]">
            <AnimatePresence>
              {phase >= 1 && (
                <motion.div
                  className="text-deck-faint text-[18px] tracking-[1.5px]st"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  →
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {phase >= 2 && (
                <motion.div
                  className="text-deck-faint text-[18px] tracking-[1.5px]st"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  ←
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Director node */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-cypress text-white flex items-center justify-center text-[13px] font-semibold">
              D
            </div>
            <span className="text-[11px] tracking-[1.5px] uppercase font-medium text-deck-secondary">
              Director
            </span>
          </div>
        </motion.div>

        {/* Phase 1: Agent creates draft */}
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div
              className="w-full mb-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/60 border border-ink/5">
                <div className="w-6 h-6 rounded-full bg-cypress/10 flex items-center justify-center shrink-0">
                  <span className="text-[11px] font-semibold text-cypress">
                    1
                  </span>
                </div>
                <span className="text-[14px] text-ink">
                  Agent creates first draft
                </span>
                <span className="text-deck-faint text-[14px] ml-auto">→</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase 2: Director reviews + feedback loop */}
        <AnimatePresence>
          {phase >= 2 && (
            <motion.div
              className="w-full mb-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/60 border border-ink/5 mb-3">
                <div className="w-6 h-6 rounded-full bg-cypress/10 flex items-center justify-center shrink-0">
                  <span className="text-[11px] font-semibold text-cypress">
                    2
                  </span>
                </div>
                <span className="text-[14px] text-ink">
                  Director reviews with feedback
                </span>
                <span className="text-deck-faint text-[14px] ml-auto">←</span>
              </div>

              {/* Feedback loop pill */}
              <motion.div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cypress/5 border border-cypress/10 w-fit mx-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.25, ease: EASE }}
              >
                <span className="text-cypress text-[14px]">{"\u21BB"}</span>
                <span className="text-[11px] tracking-[1.5px] uppercase font-medium text-cypress">
                  2-3 rounds
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase 3: "Good, let's show Vlad" → Human */}
        <AnimatePresence>
          {phase >= 3 && (
            <motion.div
              className="w-full flex flex-col items-center"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {/* Director quote */}
              <motion.p
                className="text-[13px] text-deck-secondary mb-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.15, ease: EASE }}
              >
                &ldquo;Good, let&rsquo;s show Vlad.&rdquo;
              </motion.p>

              {/* Down arrow */}
              <motion.div
                className="text-ink-20 text-[18px] mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, delay: 0.25, ease: EASE }}
              >
                ↓
              </motion.div>

              {/* Human node */}
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.35, ease: EASE }}
              >
                <div className="w-10 h-10 rounded-full bg-ink text-white flex items-center justify-center text-[13px] font-semibold">
                  V
                </div>
                <span className="text-[14px] font-medium text-ink">
                  Human Review
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
