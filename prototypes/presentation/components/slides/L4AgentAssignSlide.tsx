"use client";

import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

const ASSIGNMENTS = [
  {
    number: 1,
    milestone: "Find the right narrative",
    agent: "Narrative Agent",
    scope: "Only cares about finding the right story",
  },
  {
    number: 2,
    milestone: "Create the presentation structure",
    agent: "Presentation Agent",
    scope: "Only cares about creating the structure",
  },
  {
    number: 3,
    milestone: "Visual polish & delivery prep",
    agent: "Polish Agent",
    scope: "Only cares about visual quality and delivery",
  },
];

export default function L4AgentAssignSlide() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#f5f5f5] relative overflow-hidden">
      <div className="flex flex-col items-center max-w-[480px] w-full">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-7"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.1 }}
        >
          <span className="text-[11px] tracking-[1.5px] uppercase font-medium px-3 py-1 rounded-full bg-cypress text-white">
            Level 4
          </span>
          <h2 className="font-serif text-3xl text-ink">
            Multi-Agent Orchestration
          </h2>
        </motion.div>

        {/* Director Agent — sits above, connected to all */}
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease, delay: 0.2 }}
        >
          <div className="w-8 h-8 rounded-full bg-cypress flex items-center justify-center shrink-0">
            <span className="text-[11px] font-semibold text-white">D</span>
          </div>
          <span className="text-[14px] font-medium text-ink">
            Director Agent
          </span>
        </motion.div>

        {/* Connector lines from Director down to each milestone-agent row */}
        <motion.div
          className="flex justify-center mb-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, ease, delay: 0.3 }}
        >
          <div className="w-px h-4 bg-ink-20" />
        </motion.div>

        {/* Milestone + Agent rows */}
        <div className="w-full">
          {ASSIGNMENTS.map((item, i) => (
            <div key={item.number}>
              {/* Connector between rows */}
              {i > 0 && (
                <motion.div
                  className="flex justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.35,
                    delay: 0.1 + (i + 1) * 0.1,
                    ease,
                  }}
                >
                  <div className="w-px h-3 bg-ink-20" />
                </motion.div>
              )}

              <motion.div
                className="flex items-start gap-4 py-3 px-4 rounded-lg bg-white/60"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.1 + (i + 1) * 0.1,
                  ease,
                }}
              >
                {/* Numbered badge */}
                <div className="w-7 h-7 rounded-full bg-cypress/10 text-cypress flex items-center justify-center text-[13px] font-medium shrink-0 mt-0.5">
                  {item.number}
                </div>

                {/* Milestone + Agent pair */}
                <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                  {/* Milestone title */}
                  <span className="text-[14px] font-medium text-ink">
                    {item.milestone}
                  </span>

                  {/* Agent badge + scope */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] tracking-[1.5px] uppercase font-medium px-2 py-0.5 rounded-full bg-cypress/10 text-cypress whitespace-nowrap">
                      {item.agent}
                    </span>
                    <span className="text-[13px] text-ink-40 leading-snug">
                      {item.scope}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Caption */}
        <motion.p
          className="text-[13px] text-ink-40 text-center mt-7"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease, delay: 0.7 }}
        >
          Each agent is only concerned with its milestone.
        </motion.p>
      </div>
    </div>
  );
}
