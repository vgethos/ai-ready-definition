"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import PixelAgent from "@/components/PixelAgent";

const EASE = [0.22, 1, 0.36, 1] as const;
const MAX_PHASE = 3;

const MILESTONES = [
  { number: 1, title: "Decide on a topic", agentColor: "#b8c95c" },
  { number: 2, title: "Outline the narrative", agentColor: "#d478a8" },
  { number: 3, title: "Polish presentation", agentColor: "#5cc4a8" },
];

const CARD_W = 170;
const GAP = 14;
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
          layout
          className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] text-center"
          animate={{
            maxWidth: isCompact ? 320 : 460,
            paddingLeft: isCompact ? 20 : 48,
            paddingRight: isCompact ? 20 : 48,
            paddingTop: isCompact ? 14 : 40,
            paddingBottom: isCompact ? 14 : 40,
          }}
          initial={{
            maxWidth: 460,
            paddingLeft: 48,
            paddingRight: 48,
            paddingTop: 40,
            paddingBottom: 40,
            opacity: 0,
            y: 16,
          }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <motion.div
            layout
            className="tracking-[2.5px] uppercase text-ink-40 font-medium"
            animate={{
              fontSize: isCompact ? 9 : 12,
              marginBottom: isCompact ? 8 : 24,
            }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            Goal
          </motion.div>
          <motion.p
            layout
            className="font-serif leading-snug text-ink"
            animate={{ fontSize: isCompact ? 15 : 26 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            &ldquo;I need a presentation about how I work with AI for a
            show&amp;tell at the company all-hands&rdquo;
          </motion.p>
        </motion.div>

        {/* Phase 1+: Agent capsule */}
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div
              key="agent-section"
              layout
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <motion.div
                layout
                className="bg-ink-20"
                animate={{ width: 1, height: isCompact ? 16 : 32 }}
                transition={{ duration: 0.5, ease: EASE }}
              />
              <motion.div
                layout
                className="bg-canvas rounded-full flex flex-col items-center"
                animate={{
                  paddingLeft: isCompact ? 24 : 40,
                  paddingRight: isCompact ? 24 : 40,
                  paddingTop: isCompact ? 8 : 16,
                  paddingBottom: isCompact ? 8 : 16,
                  gap: isCompact ? 4 : 8,
                }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <PixelAgent
                  color="#D97757"
                  size={isCompact ? 20 : 28}
                />
                <span
                  className={`tracking-[2px] uppercase text-white font-medium ${
                    isCompact ? "text-[8px]" : "text-[10px]"
                  }`}
                >
                  Agent Assigned
                </span>
              </motion.div>
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div className="w-px h-4 bg-ink-20" />

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

              <div className="flex items-start" style={{ gap: GAP }}>
                {MILESTONES.map((m, i) => (
                  <motion.div
                    key={m.number}
                    className="flex flex-col items-center"
                    style={{ width: CARD_W }}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      ease: EASE,
                      delay: 0.1 + i * 0.1,
                    }}
                  >
                    <div className="w-full bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] px-3 py-4 text-center">
                      <div className="text-[9px] tracking-[1.5px] uppercase text-ink-40 mb-2 font-medium">
                        Milestone {m.number}
                      </div>
                      <p className="font-serif text-[16px] leading-tight text-ink">
                        {m.title}
                      </p>
                    </div>

                    <AnimatePresence>
                      {phase >= 3 && (
                        <motion.div
                          className="flex flex-col items-center"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{
                            duration: 0.45,
                            ease: EASE,
                            delay: i * 0.1,
                          }}
                        >
                          <div className="w-px h-3 bg-ink-20" />
                          <div className="w-[72px] h-[72px] rounded-full bg-canvas flex flex-col items-center justify-center gap-0.5">
                            <PixelAgent color={m.agentColor} size={20} />
                            <span className="text-[6px] tracking-[1px] uppercase text-white font-medium leading-tight text-center">
                              Agent
                              <br />
                              Assigned
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
