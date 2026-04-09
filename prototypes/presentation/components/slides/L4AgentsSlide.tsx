"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

const MILESTONES = [
  { number: 1, title: "Find the right narrative", agent: "Narrative Agent" },
  {
    number: 2,
    title: "Create the presentation structure",
    agent: "Presentation Agent",
  },
  { number: 3, title: "Visual polish & delivery prep", agent: "Polish Agent" },
];

export default function L4AgentsSlide() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center max-w-[520px] w-full">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-7"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
        >
          <span className="text-[11px] tracking-[1.5px] uppercase font-medium px-3 py-1 rounded-full bg-cypress text-white">
            Level 4
          </span>
          <h2 className="font-serif text-3xl text-ink">
            Multi-Agent Orchestration
          </h2>
        </motion.div>

        {/* Director Agent node */}
        <motion.div
          className="flex items-center gap-3 mb-5"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE, delay: 0.15 }}
        >
          <div className="w-8 h-8 rounded-full bg-cypress flex items-center justify-center shrink-0">
            <span className="text-[11px] font-semibold text-white">D</span>
          </div>
          <span className="text-[14px] font-medium text-ink">Director</span>
        </motion.div>

        {/* Connector line from Director to milestones */}
        <motion.div
          className="w-px h-4 bg-ink-20 mb-1"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.35, ease: EASE, delay: 0.3 }}
          style={{ transformOrigin: "top" }}
        />

        {/* Milestones + Agent assignments */}
        <div className="w-full">
          {MILESTONES.map((milestone, i) => {
            const rowDelay = 0.4 + i * 0.1;
            const pillDelay = rowDelay + 0.08;

            return (
              <div key={milestone.number}>
                {/* Connector between milestones */}
                {i > 0 && (
                  <motion.div
                    className="flex justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.35,
                      delay: rowDelay - 0.05,
                      ease: EASE,
                    }}
                  >
                    <div className="w-px h-5 bg-ink-20" />
                  </motion.div>
                )}

                <motion.div
                  className="flex items-center justify-between gap-4 py-3 px-4 rounded-lg bg-white/60"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: rowDelay, ease: EASE }}
                >
                  {/* Left: number badge + milestone title */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-cypress/10 text-cypress flex items-center justify-center text-[13px] font-medium shrink-0">
                      {milestone.number}
                    </div>
                    <span className="text-[14px] font-medium text-ink whitespace-nowrap">
                      {milestone.title}
                    </span>
                  </div>

                  {/* Right: agent pill */}
                  <motion.span
                    className="text-[11px] uppercase tracking-[1.5px] font-medium px-2 py-0.5 rounded-full bg-cypress/10 text-cypress whitespace-nowrap shrink-0"
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: pillDelay, ease: EASE }}
                  >
                    {milestone.agent}
                  </motion.span>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
