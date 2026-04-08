"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function TitleSlide() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-12 bg-canvas">
      <motion.h1
        className="font-serif text-6xl text-subtle-2x text-center max-w-4xl leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        AI scales with the ambition of your goals
      </motion.h1>

      <motion.p
        className="mt-10 text-lg text-ink-40 tracking-wide uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
      >
        Vlad Georgescu
      </motion.p>

      <motion.p
        className="mt-2 text-sm text-ink-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
      >
        Ethos · All-Hands 2026
      </motion.p>
    </div>
  );
}
