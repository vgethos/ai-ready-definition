"use client";

import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

const milestones = [
  { number: 1, title: "Narrative Design" },
  { number: 2, title: "Presentation Build" },
  { number: 3, title: "Delivery Prep" },
];

const contextInputs = [
  {
    indicator: "G",
    indicatorClass: "bg-ink text-white",
    label: "High-level goal",
    value:
      "\u201CCreate a presentation about how I work with AI for the company all-hands\u201D",
  },
  {
    indicator: "D",
    indicatorClass: "bg-cypress text-white",
    label: "Director notes",
    value:
      "Focus on what\u2019s relatable yet aspirational. Show real workflows, not theory.",
  },
  {
    indicator: "M1",
    indicatorClass: "bg-cypress text-white",
    label: "Milestone 1 output",
    value:
      "5 levels of AI literacy \u2014 ambition scales with understanding",
  },
];

export default function L4ZoomSlide() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#f5f5f5] relative overflow-hidden">
      <div className="flex flex-col items-center max-w-[480px] w-full">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-7"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0 }}
        >
          <span className="text-[11px] tracking-[1.5px] uppercase font-medium px-3 py-1 rounded-full bg-cypress text-white">
            Level 4
          </span>
          <h2 className="font-serif text-3xl text-ink">
            Multi-Agent Orchestration
          </h2>
        </motion.div>

        {/* Milestone pills row */}
        <motion.div
          className="flex items-center gap-3 mb-7 w-full justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease, delay: 0.15 }}
        >
          {milestones.map((m) => {
            const isFocal = m.number === 2;
            return (
              <motion.div
                key={m.number}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium transition-none ${
                  isFocal
                    ? "bg-cypress text-white"
                    : "bg-subtle-2x text-ink-40 opacity-40"
                }`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: isFocal ? 1 : 0.4,
                  scale: 1,
                }}
                transition={{
                  duration: 0.4,
                  ease,
                  delay: 0.2 + m.number * 0.08,
                }}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-semibold ${
                    isFocal
                      ? "bg-white/20 text-white"
                      : "bg-ink/10 text-ink-40"
                  }`}
                >
                  {m.number}
                </span>
                {m.title}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Expanded context card for Milestone 2 */}
        <motion.div
          className="w-full rounded-xl bg-white shadow-sm border border-ink/5 px-5 py-5"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.4 }}
        >
          {/* Context label */}
          <motion.div
            className="text-[11px] tracking-[1.5px] uppercase font-medium text-ink-40 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, ease, delay: 0.55 }}
          >
            Context
          </motion.div>

          {/* Context inputs list */}
          <div className="flex flex-col gap-3">
            {contextInputs.map((input, i) => (
              <motion.div
                key={input.label}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  ease,
                  delay: 0.6 + i * 0.12,
                }}
              >
                {/* Indicator badge */}
                <div
                  className={`w-7 h-7 rounded-full ${input.indicatorClass} flex items-center justify-center text-[10px] font-semibold shrink-0 mt-0.5`}
                >
                  {input.indicator}
                </div>

                {/* Text content */}
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-[11px] tracking-[1.5px] uppercase font-medium text-ink-40">
                    {input.label}
                  </span>
                  <span className="text-[13px] text-ink-60 leading-relaxed">
                    {input.value}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Caption */}
        <motion.p
          className="mt-7 text-[13px] text-ink-40 text-center"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 1.1 }}
        >
          Lots of context. Clear direction. Now: how to execute.
        </motion.p>
      </div>
    </div>
  );
}
