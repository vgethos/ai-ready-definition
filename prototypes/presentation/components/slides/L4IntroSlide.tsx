"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function L4IntroSlide() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-12 bg-[#f5f5f5]">
      {/* Header: Level badge + title */}
      <motion.div
        className="flex items-center gap-4 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="px-3 py-1 rounded-full bg-cypress text-white text-xs font-medium tracking-wide uppercase">
          Level 4
        </span>
        <h2 className="font-serif text-3xl text-ink">
          Multi-Agent Orchestration
        </h2>
      </motion.div>

      {/* Goal quote */}
      <motion.p
        className="text-2xl text-ink-60 italic text-center max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
      >
        &ldquo;Orchestrate a team of AI agents to research, design, build, and
        polish a complete project.&rdquo;
      </motion.p>

      {/* Framing line */}
      <motion.p
        className="mt-8 text-lg text-ink-40 text-center max-w-2xl leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
      >
        The project: this presentation. One orchestrator took a vague
        goal, broke it into milestones, and assigned specialist agents to
        each&nbsp;one.
      </motion.p>

      {/* Meta-reveal */}
      <motion.p
        className="mt-4 text-lg text-ink-40 text-center max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1, ease: EASE }}
      >
        You&rsquo;re watching the output right now.
      </motion.p>
    </div>
  );
}
