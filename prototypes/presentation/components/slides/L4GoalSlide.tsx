"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import PixelAgent from "@/components/PixelAgent";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function L4GoalSlide() {
  const [phase, setPhase] = useState(0);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const isForward =
        e.key === "ArrowRight" || e.key === " " || e.key === "Enter";
      const isBackward = e.key === "ArrowLeft";

      if (isForward && phase < 1) {
        e.preventDefault();
        e.stopImmediatePropagation();
        setPhase(1);
        return;
      }
      if (isBackward && phase > 0) {
        e.preventDefault();
        e.stopImmediatePropagation();
        setPhase(0);
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
      <motion.div
        className="flex flex-col items-center"
        layout
        transition={{ duration: 0.5, ease: EASE }}
      >
        {/* Goal Card */}
        <motion.div
          className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] px-12 py-10 max-w-[460px]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="text-[12px] tracking-[2.5px] uppercase text-ink-40 text-center mb-6 font-medium">
            Goal
          </div>
          <p className="font-serif text-[26px] leading-snug text-ink text-center">
            &ldquo;I need a presentation about how I work with AI for a
            show&amp;tell at the company all-hands&rdquo;
          </p>
        </motion.div>

        {/* Phase 1: Agent capsule */}
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {/* Connector line */}
              <motion.div
                className="w-px h-8 bg-ink-20"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.3, ease: EASE }}
                style={{ transformOrigin: "top" }}
              />

              {/* Agent capsule */}
              <div className="bg-canvas rounded-full px-10 py-4 flex flex-col items-center gap-2">
                <PixelAgent color="#c49a7c" size={28} />
                <span className="text-[10px] tracking-[2px] uppercase text-white font-medium">
                  Agent Assigned
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
