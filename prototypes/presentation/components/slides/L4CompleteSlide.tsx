"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function L4CompleteSlide() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-white">
      <motion.div
        className="bg-white rounded-2xl shadow-card px-12 py-10 text-center flex flex-col items-center"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="text-[11px] tracking-[1.5px] uppercase text-deck-faint mb-4 font-medium">
          Milestone 2
        </div>
        <p className="text-[24px] leading-snug text-ink font-medium mb-5">
          Outline the
          <br />
          narrative
        </p>
        <motion.div
          className="flex items-center gap-2 text-[13px] font-medium text-[#0E8F1F]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0E8F1F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          Complete
        </motion.div>
      </motion.div>
    </div>
  );
}
