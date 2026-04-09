"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function L4AdversarialSlide() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center max-w-[480px] w-full">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <span className="text-[11px] tracking-[1.5px] uppercase font-medium px-3 py-1 rounded-full bg-cypress text-white">
            Level 4
          </span>
          <h2 className="font-serif text-3xl text-ink">
            Multi-Agent Orchestration
          </h2>
        </motion.div>

        {/* M2 Agent ⇄ Adversarial Reviewer */}
        <div className="flex items-center justify-center gap-6 mb-2">
          {/* M2 Agent */}
          <motion.div
            className="flex flex-col items-center gap-1.5"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.3, ease: EASE }}
          >
            <div className="w-10 h-10 rounded-full bg-cypress text-white flex items-center justify-center text-[12px] font-semibold">
              M2
            </div>
            <span className="text-[14px] font-medium text-ink">M2 Agent</span>
          </motion.div>

          {/* Back-and-forth indicator */}
          <motion.div
            className="flex flex-col items-center gap-1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.6, ease: EASE }}
          >
            <span className="text-ink-40 text-[20px] leading-none">⇄</span>
            <span className="text-[11px] uppercase tracking-[1.5px] font-medium text-ink-40">
              Challenge / Defend
            </span>
          </motion.div>

          {/* Adversarial Reviewer */}
          <motion.div
            className="flex flex-col items-center gap-1.5"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.4, ease: EASE }}
          >
            <div className="w-10 h-10 rounded-full bg-subtle-2x text-ink-60 flex items-center justify-center text-[12px] font-semibold">
              AR
            </div>
            <span className="text-[14px] font-medium text-ink">Adversarial</span>
          </motion.div>
        </div>

        {/* Until bulletproof label */}
        <motion.p
          className="text-[11px] uppercase tracking-[1.5px] font-medium text-ink-40 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.75, ease: EASE }}
        >
          Until bulletproof
        </motion.p>

        {/* Downstream flow: → Director → Human */}
        <div className="flex flex-col items-center gap-2">
          {/* Connector line */}
          <motion.div
            className="w-px h-4 bg-ink/10"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            style={{ originY: 0 }}
            transition={{ duration: 0.35, delay: 0.9, ease: EASE }}
          />

          {/* Director node */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1.02, ease: EASE }}
          >
            <div className="w-7 h-7 rounded-full bg-cypress text-white flex items-center justify-center text-[10px] font-semibold">
              D
            </div>
            <span className="text-[14px] font-medium text-ink">Director</span>
          </motion.div>

          {/* Connector line */}
          <motion.div
            className="w-px h-4 bg-ink/10"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            style={{ originY: 0 }}
            transition={{ duration: 0.35, delay: 1.14, ease: EASE }}
          />

          {/* Human node */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1.26, ease: EASE }}
          >
            <div className="w-7 h-7 rounded-full bg-ink text-white flex items-center justify-center text-[10px] font-semibold">
              V
            </div>
            <span className="text-[14px] font-medium text-ink">Human</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
