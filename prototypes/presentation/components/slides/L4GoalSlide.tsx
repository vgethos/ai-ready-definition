"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import PixelAgent from "@/components/PixelAgent";

const EASE = [0.22, 1, 0.36, 1] as const;

/*
  Phase 0: Goal card
  Phase 1: Agent capsule
  Phase 2: Bracket + Milestone 1
  Phase 3: Milestone 2
  Phase 4: Milestone 3
  Phase 5: Sub-agent 1
  Phase 6: Sub-agent 2
  Phase 7: Sub-agent 3
*/
const MAX_PHASE = 7;

const MILESTONES = [
  { number: 1, title: "Decide on a topic", agentColor: "#b8c95c" },
  { number: 2, title: "Outline the narrative", agentColor: "#d478a8" },
  { number: 3, title: "Polish presentation", agentColor: "#5cc4a8" },
];

const CARD_W = 140;
const GAP = 12;
const TOTAL_W = CARD_W * 3 + GAP * 2;
const CENTERS = [
  CARD_W / 2,
  CARD_W + GAP + CARD_W / 2,
  (CARD_W + GAP) * 2 + CARD_W / 2,
];

export default function L4GoalSlide() {
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

  const isCompact = phase >= 2;

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center">
        {/* Goal Card */}
        <motion.div
          className="bg-white rounded-2xl shadow-card text-center px-16 py-10 max-w-[780px] origin-top"
          initial={{ opacity: 0, y: 8 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: isCompact ? 0.55 : 1,
            marginBottom: isCompact ? -130 : 0,
          }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <div className="text-[14px] font-medium uppercase tracking-[2px] text-ink mb-6">
            Level 4: Multi-Agent Orchestration
          </div>
          <p className="font-serif text-[44px] leading-[1.15] text-ink text-balance">
            &ldquo;I need a presentation about how I work with AI for a
            show&amp;tell at the company all-hands&rdquo;
          </p>
        </motion.div>

        {/* Phase 1+: Agent capsule */}
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div
              key="agent-section"
              layout
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div className="w-px h-8 bg-ink-20" />
              <div className="bg-canvas rounded-full flex flex-col items-center px-10 py-4 gap-2">
                <PixelAgent color="#D97757" size={28} />
                <span className="tracking-[1.5px] uppercase text-white font-medium text-[11px]">
                  Agent Assigned
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase 2+: Milestones tree */}
        <AnimatePresence>
          {phase >= 2 && (
            <motion.div
              key="milestones-section"
              layout
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div className="w-px h-4 bg-ink-20" />

              {/* Bracket SVG */}
              <svg width={TOTAL_W} height={22} className="block">
                <line
                  x1={TOTAL_W / 2} y1="0"
                  x2={TOTAL_W / 2} y2="8"
                  stroke="var(--color-ink-20)" strokeWidth="1"
                />
                <line
                  x1={CENTERS[0]} y1="8"
                  x2={CENTERS[2]} y2="8"
                  stroke="var(--color-ink-20)" strokeWidth="1"
                />
                {CENTERS.map((cx, i) => (
                  <line
                    key={i}
                    x1={cx} y1="8"
                    x2={cx} y2="22"
                    stroke="var(--color-ink-20)" strokeWidth="1"
                  />
                ))}
              </svg>

              {/* Milestone cards + sub-agents */}
              <div className="flex items-start" style={{ gap: GAP }}>
                {MILESTONES.map((m, i) => {
                  const milestoneVisible = phase >= 2 + i;
                  const agentVisible = phase >= 5 + i;

                  return (
                    <div
                      key={m.number}
                      className="flex flex-col items-center"
                      style={{ width: CARD_W }}
                    >
                      {/* Milestone card */}
                      <AnimatePresence>
                        {milestoneVisible && (
                          <motion.div
                            className="w-full bg-white rounded-xl shadow-card px-3 py-8 text-center"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 12 }}
                            transition={{ duration: 0.45, ease: EASE }}
                          >
                            <div className="text-[11px] tracking-[1.5px] uppercase text-deck-faint mb-1.5 font-medium">
                              Milestone {m.number}
                            </div>
                            <p className="text-[14px] leading-tight text-ink font-medium">
                              {m.title}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Sub-agent circle — always in DOM, opacity only */}
                      <div
                        className="flex flex-col items-center transition-opacity duration-300"
                        style={{ opacity: agentVisible ? 1 : 0 }}
                      >
                        <div className="w-px h-3 bg-ink-20" />
                        <div className="w-[120px] h-[120px] rounded-full bg-canvas flex flex-col items-center justify-center gap-1">
                          <PixelAgent color={m.agentColor} size={28} />
                          <span className="text-[11px] tracking-[1px] uppercase text-white font-medium leading-tight text-center">
                            Agent
                            <br />
                            Assigned
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
