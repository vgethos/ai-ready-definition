"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function L4DialUpSlide() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-12 bg-white">
      {/* Eyebrow */}
      <motion.div
        className="flex items-center gap-3 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="text-[14px] font-medium uppercase tracking-[2px] text-ink">
          Level 4: Multi-Agent Orchestration
        </span>
      </motion.div>

      {/* Title */}
      <motion.h2
        className="font-serif text-[44px] leading-[1.15] text-ink text-balance text-center max-w-[700px]"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
      >
        What if we dial it up a notch?
      </motion.h2>
    </div>
  );
}
