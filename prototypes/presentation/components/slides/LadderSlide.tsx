"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

const LEVELS = [
  { num: 1, label: ["Basic", "Prompting"] },
  { num: 2, label: ["Advanced", "Prompting"] },
  { num: 3, label: ["Agentic", "Workflows"] },
  { num: 4, label: ["Multi-Agent", "Orchestration"] },
  { num: 5, label: ["Autonomous", "Systems"] },
];

/* Each step rises by this many pixels */
const STEP_HEIGHT = 72;

export default function LadderSlide() {
  const [revealedCount, setRevealedCount] = useState(0);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const isForward =
        e.key === "ArrowRight" || e.key === " " || e.key === "Enter";
      const isBackward = e.key === "ArrowLeft";

      if (isForward && revealedCount < LEVELS.length) {
        e.preventDefault();
        e.stopImmediatePropagation();
        setRevealedCount((prev) => prev + 1);
        return;
      }

      if (isBackward && revealedCount > 0) {
        e.preventDefault();
        e.stopImmediatePropagation();
        setRevealedCount((prev) => prev - 1);
        return;
      }

      // Otherwise, let the event pass through to SlideController
    },
    [revealedCount]
  );

  useEffect(() => {
    // Use capture phase so this fires BEFORE SlideController's bubble-phase listener
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [handleKeyDown]);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-12 bg-white relative overflow-hidden">
      {/* Title */}
      <motion.h2
        className="font-serif text-[44px] leading-[1.15] text-ink text-balance mb-12"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        The 5 Levels
      </motion.h2>

      {/* "Ambition of goals" label on the left, rotated vertically */}
      <motion.div
        className="absolute left-6 top-1/2 text-[11px] text-deck-faint tracking-[1.5px] uppercase font-medium"
        style={{
          transform: "translateY(-50%) rotate(-90deg)",
          transformOrigin: "center center",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8, ease: EASE }}
      >
        ambition of goals &rarr;
      </motion.div>

      {/* Staircase container — ALL steps always rendered, visibility controlled by opacity */}
      <div className="flex items-end gap-3 w-full max-w-[1100px] justify-center px-8">
        {LEVELS.map((level, i) => {
          const isRevealed = i < revealedCount;
          const riserHeight = STEP_HEIGHT * (i + 1);

          return (
            <motion.div
              key={level.num}
              className="flex flex-col items-center"
              initial={false}
              animate={{
                opacity: isRevealed ? 1 : 0,
              }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              {/* Single card with integrated riser */}
              <div
                className="w-[180px] bg-white rounded-xl shadow-card px-4 pt-8 flex flex-col items-center text-center"
                style={{ paddingBottom: riserHeight }}
              >
                {/* Level badge */}
                <span className="w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium mb-2 bg-cypress text-white">
                  L{level.num}
                </span>

                {/* Category label */}
                <span className="text-[13px] leading-snug text-ink font-medium">
                  {level.label[0]}<br />{level.label[1]}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Subtle baseline */}
      <motion.div
        className="absolute bottom-[80px] left-[80px] right-[80px] h-px bg-ink/10"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        style={{ transformOrigin: "left center" }}
      />
    </div>
  );
}
