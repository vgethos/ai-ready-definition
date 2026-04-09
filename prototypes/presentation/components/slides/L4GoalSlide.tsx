"use client";

import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function L4GoalSlide() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#f5f5f5] relative overflow-hidden">
      <div className="flex flex-col items-center max-w-[480px]">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-10"
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

        {/* Label */}
        <motion.div
          className="text-[11px] tracking-[1.5px] uppercase font-medium text-ink-40 mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease, delay: 0.15 }}
        >
          The Goal
        </motion.div>

        {/* Goal text */}
        <motion.p
          className="text-[14px] text-ink-60 leading-relaxed text-center mb-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease, delay: 0.25 }}
        >
          &ldquo;Create a presentation about how I work with AI for the Thursday
          morning company all-hands&rdquo;
        </motion.p>

        {/* Subtle note */}
        <motion.p
          className="text-[13px] text-ink-40 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease, delay: 0.5 }}
        >
          Fuzzy. Open-ended. Can be achieved in many ways.
        </motion.p>
      </div>
    </div>
  );
}
