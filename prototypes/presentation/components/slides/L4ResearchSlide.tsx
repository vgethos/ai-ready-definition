"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

const subAgents = [
  {
    id: "R1",
    query: "AI adoption in workforce 2026",
  },
  {
    id: "R2",
    query: "Interesting ways people use AI for ambitious work",
  },
  {
    id: "R3",
    query: "Best practices for AI show-and-tells",
  },
];

export default function L4ResearchSlide() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="flex flex-col max-w-[520px] w-full">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <span className="text-[11px] tracking-[1.5px] uppercase font-medium px-3 py-1 rounded-full bg-cypress text-white">
            Level 4
          </span>
          <h2 className="font-serif text-[44px] leading-[1.15] text-ink text-balance">
            Multi-Agent Orchestration
          </h2>
        </motion.div>

        {/* M2 Agent node */}
        <motion.div
          className="flex items-center gap-3 mb-2"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3, ease: EASE }}
        >
          <div className="w-9 h-9 rounded-full bg-cypress text-white flex items-center justify-center shrink-0 text-[11px] font-semibold">
            M2
          </div>
          <span className="text-[14px] font-medium text-ink">
            Milestone 2 Agent
          </span>
        </motion.div>

        {/* "spawns research" label */}
        <motion.div
          className="ml-4 pl-5 border-l-2 border-cypress/20 py-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.45, ease: EASE }}
        >
          <span className="text-[11px] tracking-[1.5px] uppercase font-medium text-deck-faint">
            Spawns research
          </span>
        </motion.div>

        {/* Sub-agents along left-border spine */}
        <div className="ml-4 border-l-2 border-cypress/20 pl-5 space-y-3 pb-3">
          {subAgents.map((agent, i) => (
            <motion.div
              key={agent.id}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.55 + i * 0.15,
                ease: EASE,
              }}
            >
              {/* Sub-agent badge — smaller, lighter */}
              <div className="w-6 h-6 rounded-full bg-subtle-2x flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[11px] font-semibold text-deck-secondary">
                  {agent.id}
                </span>
              </div>
              <span className="text-[13px] text-deck-secondary leading-snug">
                {agent.query}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Findings flow back indicator */}
        <motion.div
          className="ml-4 pl-5 flex items-center gap-2 mb-5"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.0, ease: EASE }}
        >
          <span className="text-deck-faint text-sm">{"\u2191"}</span>
          <span className="text-[11px] tracking-[1.5px] uppercase font-medium text-deck-faint">
            Findings flow back
          </span>
        </motion.div>

        {/* Then -> first draft */}
        <motion.div
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-cypress/5 border border-cypress/10 w-fit"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.1, ease: EASE }}
        >
          <span className="text-cypress text-[14px]">{"\u2192"}</span>
          <span className="text-[13px] font-medium text-cypress">
            Then: first draft
          </span>
        </motion.div>
      </div>
    </div>
  );
}
