"use client";

import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

const researchTasks = [
  {
    number: 1,
    query: "AI adoption levels in the workforce, 2026",
  },
  {
    number: 2,
    query:
      "Most interesting ways people use AI for better, faster, more ambitious work",
  },
  {
    number: 3,
    query:
      "Best practices for AI show-and-tells \u2014 what resonates, what doesn\u2019t",
  },
];

export default function L4ResearchSlide() {
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
      <div className="max-w-[480px] w-full flex flex-col">
        {/* Section label */}
        <motion.span
          className="text-[11px] tracking-[1.5px] uppercase font-medium text-ink-40 mb-4 block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3, ease }}
        >
          Before Writing
        </motion.span>

        {/* M2 Agent at top */}
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease }}
        >
          <div className="w-8 h-8 rounded-full bg-cypress text-white flex items-center justify-center shrink-0 text-[11px] font-semibold">
            M2
          </div>
          <span className="text-[14px] font-medium text-ink">
            Milestone 2 Agent
          </span>
          <span className="text-[13px] text-ink-40">spawns research</span>
        </motion.div>

        {/* Spine layout: research sub-agents */}
        <div className="ml-4 border-l-2 border-cypress/20 pl-5 space-y-3">
          {researchTasks.map((task, i) => (
            <motion.div
              key={task.number}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.6 + i * 0.15,
                ease,
              }}
            >
              <div className="w-6 h-6 rounded-full bg-cypress/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[11px] font-semibold text-cypress">
                  {task.number}
                </span>
              </div>
              <span className="text-[14px] text-ink leading-snug">
                {task.query}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Findings flow back */}
        <motion.div
          className="ml-4 pl-5 mt-4 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.1, ease }}
        >
          <span className="text-cypress text-[14px]">{"\u2191"}</span>
          <span className="text-[13px] text-ink-40 italic">
            Findings feed back to M2
          </span>
        </motion.div>

        {/* Then indicator */}
        <motion.div
          className="mt-7 flex items-center gap-3 px-4 py-3 rounded-lg bg-white border border-ink-20"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3, ease }}
        >
          <span className="text-[11px] tracking-[1.5px] uppercase font-medium text-cypress">
            Then {"\u2192"}
          </span>
          <span className="text-[14px] text-ink">
            Only now does the agent write the first draft.
          </span>
        </motion.div>
      </div>
    </div>
  );
}
