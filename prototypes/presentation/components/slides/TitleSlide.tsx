"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function TitleSlide() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-12 bg-[#f5f5f5]">
      <motion.h1
        className="font-serif text-6xl text-ink text-center max-w-4xl leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        AI scales with the ambition of your goals
      </motion.h1>

      <motion.p
        className="mt-6 text-xl text-ink-60"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
      >
        5 levels. Same technology. Bigger thinking.
      </motion.p>

      <motion.p
        className="mt-10 text-[11px] text-ink-60 tracking-[1.5px] uppercase font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
      >
        Vlad Georgescu
      </motion.p>

      <motion.p
        className="mt-2 text-[14px] text-ink-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
      >
        Ethos · All-Hands 2026
      </motion.p>
    </div>
  );
}
