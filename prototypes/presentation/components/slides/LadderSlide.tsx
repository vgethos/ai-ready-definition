"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

const LEVELS = [
  { num: 1, goal: "Write this email for me", label: "Basic Prompting" },
  { num: 2, goal: "Help me analyze this document", label: "Advanced Prompting" },
  { num: 3, goal: "I never want to document our funnel manually again", label: "Single Agentic Workflows" },
  { num: 4, goal: "Build a complete presentation from a single sentence", label: "Multi-Agent Orchestration" },
  { num: 5, goal: "Solve a complex problem end-to-end with minimal guidance", label: "Advanced Autonomous Solutioning" },
];

/* Each step rises by this many pixels */
const STEP_HEIGHT = 72;

export default function LadderSlide() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-12 bg-[#f5f5f5] relative overflow-hidden">
      {/* Title */}
      <motion.h2
        className="font-serif text-4xl text-ink mb-12"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        The 5 Levels
      </motion.h2>

      {/* "Ambition of goals" label on the left, rotated vertically */}
      <motion.div
        className="absolute left-6 top-1/2 text-[11px] text-ink-40 tracking-[1.5px] uppercase font-medium"
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

      {/* Staircase container — items align to bottom so height differences create stairs */}
      <div className="flex items-end gap-3 w-full max-w-[1100px] justify-center px-8">
        {LEVELS.map((level, i) => {
          const isAdvanced = level.num >= 3;
          const delay = 0.15 + i * 0.1;
          /* Each step is progressively taller from bottom, creating the staircase */
          const riserHeight = STEP_HEIGHT * (i + 1);

          return (
            <motion.div
              key={level.num}
              className="flex flex-col items-center"
              style={{ paddingBottom: 0 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay, ease: EASE }}
            >
              {/* The step card */}
              <div
                className="w-[180px] bg-white rounded-xl shadow-sm px-4 py-4 flex flex-col items-center text-center"
              >
                {/* Level badge */}
                <span
                  className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium mb-2 ${
                    isAdvanced
                      ? "bg-cypress text-white"
                      : "bg-subtle-2x text-ink-40"
                  }`}
                >
                  L{level.num}
                </span>

                {/* Goal text */}
                <span
                  className={`text-[13px] leading-snug ${
                    isAdvanced ? "text-ink" : "text-ink-40"
                  }`}
                >
                  &ldquo;{level.goal}&rdquo;
                </span>

                {/* Category label */}
                <span
                  className={`text-[10px] tracking-wide uppercase mt-2 ${
                    isAdvanced ? "text-ink-40" : "text-ink-40/60"
                  }`}
                >
                  {level.label}
                </span>
              </div>

              {/* The riser — invisible vertical spacer that creates the stair effect */}
              <div
                className={`w-[180px] mt-0 ${
                  isAdvanced
                    ? "bg-cypress/[0.06]"
                    : "bg-ink/[0.03]"
                } rounded-b-xl`}
                style={{ height: riserHeight }}
              />
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
