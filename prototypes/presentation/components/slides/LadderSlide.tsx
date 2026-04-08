"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

const LEVELS = [
  { num: 1, goal: "Write this email for me", label: "Basic Prompting" },
  { num: 2, goal: "Help me analyze this document", label: "Advanced Prompting" },
  { num: 3, goal: "I never want to document our funnel manually again", label: "Single Agentic Workflows" },
  { num: 4, goal: "Build a complete presentation — narrative, visuals, delivery prep — from a single sentence", label: "Multi-Agent Orchestration" },
  { num: 5, goal: "Solve a complex problem end-to-end with minimal guidance", label: "Advanced Autonomous Solutioning" },
];

export default function LadderSlide() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-12 bg-[#f5f5f5] relative">
      <motion.h2
        className="font-serif text-4xl text-ink mb-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        The 5 Levels
      </motion.h2>

      {/* Vertical "ambition of goals" label on the right */}
      <motion.div
        className="absolute right-8 top-1/2 text-[11px] text-ink-40 tracking-[1.5px] uppercase font-medium"
        style={{ transform: "translateY(-50%) rotate(90deg)", transformOrigin: "center center" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8, ease: EASE }}
      >
        ambition of goals →
      </motion.div>

      <div className="flex flex-col-reverse gap-2 w-full max-w-3xl">
        {LEVELS.map((level, i) => {
          const isAdvanced = level.num >= 3;
          const delay = i * 0.08;

          return (
            <motion.div
              key={level.num}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay, ease: EASE }}
            >
              {/* Dashed divider between L2 and L3 — "help me" vs "work for me" boundary */}
              {level.num === 3 && (
                <div className="mb-3 mt-1 border-t border-dashed border-ink-40/30" />
              )}

              <div
                className="flex items-center gap-4 px-5 py-3 bg-white rounded-xl shadow-sm"
              >
                {/* Level badge */}
                <span
                  className={`flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium ${
                    isAdvanced
                      ? "bg-cypress text-white"
                      : "bg-subtle-2x text-ink-40"
                  }`}
                >
                  L{level.num}
                </span>

                {/* Goal text and label */}
                <div className="flex flex-col">
                  <span
                    className={`text-lg ${
                      isAdvanced ? "text-ink" : "text-ink-40"
                    }`}
                  >
                    &ldquo;{level.goal}&rdquo;
                  </span>
                  <span
                    className={`text-xs tracking-wide uppercase ${
                      isAdvanced ? "text-ink-40" : "text-ink-40/60"
                    }`}
                  >
                    {level.label}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
