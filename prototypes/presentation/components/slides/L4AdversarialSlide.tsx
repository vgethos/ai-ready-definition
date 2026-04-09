"use client";

import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function L4AdversarialSlide() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-12 bg-[#f5f5f5]">
      {/* Header */}
      <motion.div
        className="flex items-center gap-4 mb-7"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
      >
        <span className="px-3 py-1 rounded-full bg-cypress text-white text-[11px] tracking-[1.5px] uppercase font-medium">
          Level 4
        </span>
        <h2 className="font-serif text-3xl text-ink">
          Multi-Agent Orchestration
        </h2>
      </motion.div>

      {/* Content container */}
      <div className="max-w-[480px] w-full flex flex-col items-center">
        {/* Two nodes with back-and-forth */}
        <div className="w-full flex items-center justify-center gap-6">
          {/* M2 Agent node */}
          <motion.div
            className="flex flex-col items-center gap-2 flex-1"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease }}
          >
            <div className="w-10 h-10 rounded-full bg-cypress text-white flex items-center justify-center text-[12px] font-semibold">
              M2
            </div>
            <span className="text-[14px] font-medium text-ink text-center">
              Milestone 2 Agent
            </span>
            <span className="text-[13px] text-ink-40 text-center leading-snug">
              Writes the draft
            </span>
          </motion.div>

          {/* Back-and-forth indicator */}
          <motion.div
            className="flex flex-col items-center gap-1 shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6, ease }}
          >
            <span className="text-ink-40 text-xl font-light">{"\u21C4"}</span>
            <span className="text-[11px] tracking-[1.5px] uppercase font-medium text-ink-40">
              Loop
            </span>
          </motion.div>

          {/* Adversarial Reviewer node */}
          <motion.div
            className="flex flex-col items-center gap-2 flex-1"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease }}
          >
            <div className="w-10 h-10 rounded-full bg-ink/10 flex items-center justify-center text-[12px] font-semibold text-ink-60">
              AR
            </div>
            <span className="text-[14px] font-medium text-ink text-center">
              Adversarial Reviewer
            </span>
            <span className="text-[13px] text-ink-40 text-center leading-snug">
              Finds flaws, pokes holes
            </span>
          </motion.div>
        </div>

        {/* Purpose description */}
        <motion.div
          className="mt-7 w-full px-4 py-3 rounded-lg bg-white border border-ink-20"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9, ease }}
        >
          <p className="text-[13px] text-ink-60 text-center leading-relaxed">
            The adversarial agent&apos;s only job: surface things that won&apos;t
            resonate, find weak arguments, challenge assumptions.
          </p>
        </motion.div>

        {/* Bottom caption */}
        <motion.p
          className="mt-7 text-[14px] text-ink text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2, ease }}
        >
          Only when the adversarial agent says{" "}
          <span className="font-medium">&ldquo;this is bulletproof&rdquo;</span>{" "}
          does it go to the Director.
        </motion.p>
      </div>
    </div>
  );
}
