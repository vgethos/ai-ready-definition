"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function L3IntroSlide() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-12 bg-[#f5f5f5]">
      {/* Header: Level badge + title */}
      <motion.div
        className="flex items-center gap-4 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="px-3 py-1 rounded-full bg-cypress text-white text-xs font-medium tracking-[1.5px] uppercase">
          Level 3
        </span>
        <h2 className="font-serif text-[44px] leading-[1.15] text-ink">
          Automated Workflows
        </h2>
      </motion.div>

      {/* Goal quote */}
      <motion.p
        className="text-[14px] text-deck-secondary text-center max-w-[480px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
      >
        &ldquo;Make our entire funnel accessible to AI &mdash; structured, searchable, always current.&rdquo;
      </motion.p>

      {/* Framing line */}
      <motion.p
        className="mt-8 text-[14px] text-deck-faint text-center max-w-[480px] leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
      >
        What happens when the goal changes from &ldquo;help me with this
        task&rdquo; to &ldquo;I never want to do this task again&rdquo;?
      </motion.p>
    </div>
  );
}
