"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const TOTAL_STEPS = 5;

interface LevelData {
  num: number;
  label: string;
  pills: string[];
}

const LEVELS: LevelData[] = [
  {
    num: 1,
    label: "Basic Prompting",
    pills: ["Prompting", "Context setting"],
  },
  {
    num: 2,
    label: "Advanced Prompting",
    pills: ["Iterative refinement", "Document analysis"],
  },
  {
    num: 3,
    label: "Automated Workflows",
    pills: ["Tool building", "Automation design", "Compound returns"],
  },
  {
    num: 4,
    label: "Multi-Agent Orchestration",
    pills: [
      "Agent specialization",
      "Review loops",
      "Goal decomposition",
      "Orchestration",
    ],
  },
  {
    num: 5,
    label: "Autonomous Solutioning",
    pills: ["End-to-end reasoning", "Autonomous execution"],
  },
];

function FoundationPill({ label }: { label: string }) {
  return (
    <motion.span
      layout
      className="inline-flex items-center bg-subtle-2x text-ink-40 rounded-full px-3 py-1 text-xs whitespace-nowrap"
      transition={{ duration: 0.5, ease: EASE }}
    >
      {label}
    </motion.span>
  );
}

function ActivePill({ label, delay }: { label: string; delay: number }) {
  return (
    <motion.span
      layout
      className="inline-flex items-center bg-cypress/10 text-cypress border border-cypress/20 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, delay, ease: EASE }}
    >
      {label}
    </motion.span>
  );
}

export default function ClosingSlide() {
  const [revealedCount, setRevealedCount] = useState(0);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const isForward =
        e.key === "ArrowRight" || e.key === " " || e.key === "Enter";
      const isBackward = e.key === "ArrowLeft";

      if (isForward && revealedCount < TOTAL_STEPS) {
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

      // Otherwise let events pass through to SlideController
    },
    [revealedCount]
  );

  useEffect(() => {
    // Capture phase so this fires BEFORE SlideController's bubble-phase listener
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [handleKeyDown]);

  // Compute foundation pills (all pills from levels before the current one)
  const foundationPills: string[] = [];
  for (let i = 0; i < revealedCount - 1 && i < LEVELS.length; i++) {
    foundationPills.push(...LEVELS[i].pills);
  }

  // Current active level (1-indexed display, 0-indexed in array)
  const activeLevel = revealedCount > 0 ? LEVELS[revealedCount - 1] : null;

  // Show closing message after level 5 is revealed (with delay via animation)
  const showClosing = revealedCount === TOTAL_STEPS;

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-12 bg-[#f5f5f5]">
      <div className="flex flex-col items-center max-w-2xl w-full">
        {/* Header — always visible */}
        <motion.p
          className="text-[11px] text-ink-40 tracking-[1.5px] uppercase font-medium mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          Skills Compound
        </motion.p>

        {/* Foundation row — pills from all previous levels */}
        <AnimatePresence mode="popLayout">
          {foundationPills.length > 0 && (
            <motion.div
              key="foundation"
              layout
              className="flex flex-wrap items-center justify-center gap-2 mb-8 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              {foundationPills.map((pill) => (
                <FoundationPill key={`foundation-${pill}`} label={pill} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active level section */}
        <AnimatePresence mode="wait">
          {activeLevel && (
            <motion.div
              key={`level-${activeLevel.num}`}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              {/* Level label */}
              <div className="flex items-center gap-2.5 mb-5">
                <span className="text-cypress font-semibold text-[14px]">
                  {activeLevel.num}
                </span>
                <span className="text-ink-40 text-[14px]">&mdash;</span>
                <span className="text-ink font-medium text-[14px]">
                  {activeLevel.label}
                </span>
              </div>

              {/* Active pills */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                {activeLevel.pills.map((pill, i) => (
                  <ActivePill
                    key={`active-${pill}`}
                    label={pill}
                    delay={0.1 + i * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Closing message — appears after level 5 */}
        <AnimatePresence>
          {showClosing && (
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
            >
              <p className="text-[14px] text-ink-60 mb-3">
                Each level teaches you where AI breaks and what you need to
                change.
              </p>
              <p className="text-[14px] text-ink font-medium">
                Figure out your level. Go to the next one. It compounds.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
