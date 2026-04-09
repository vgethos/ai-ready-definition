"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function L4GoalSlide() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center max-w-[560px]">
        {/* Level badge + section title */}
        <motion.div
          className="flex items-center gap-3 mb-10"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <span className="text-[11px] tracking-[1.5px] uppercase font-medium px-3 py-1 rounded-full bg-cypress text-white">
            Level 4
          </span>
          <h2 className="font-serif text-3xl text-ink text-balance">
            Multi-Agent Orchestration
          </h2>
        </motion.div>

        {/* Goal card */}
        <motion.div
          className="w-full rounded-2xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] px-10 py-9 flex flex-col items-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.15 }}
        >
          {/* Label */}
          <motion.span
            className="text-[11px] tracking-[1.5px] uppercase font-medium text-ink-40 mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: EASE, delay: 0.35 }}
          >
            The Goal
          </motion.span>

          {/* Goal text */}
          <motion.p
            className="font-serif text-xl leading-relaxed text-ink text-center text-balance"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.45 }}
          >
            &ldquo;Create a nice presentation about how I work with AI for the
            Thursday morning company all-hands show and tell.&rdquo;
          </motion.p>
        </motion.div>

        {/* Subtext */}
        <motion.p
          className="text-[13px] text-ink-40 mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.7 }}
        >
          This is fuzzy. It can be achieved in many ways.
        </motion.p>
      </div>
    </div>
  );
}
