"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function TitleSlide() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-12 bg-white">
      <motion.h1
        className="font-serif text-[44px] leading-[1.15] text-ink text-center text-balance max-w-[700px]"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        AI scales with the ambition of your goals
      </motion.h1>

      <motion.p
        className="mt-6 text-[18px] leading-relaxed max-w-[480px] text-deck-secondary"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
      >
        5 levels. Same technology. Bigger thinking.
      </motion.p>

    </div>
  );
}
