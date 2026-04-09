"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

const MILESTONES = [
  { number: 1, title: "Find the right narrative", status: "Complete" },
  { number: 2, title: "Create the presentation structure", status: "Complete" },
  { number: 3, title: "Visual polish & delivery prep", status: "In progress" },
];

export default function L4MilestonesSlide() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center max-w-[520px] w-full">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-8"
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
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE, delay: 0.2 }}
        >
          <div className="w-8 h-8 rounded-full bg-cypress flex items-center justify-center shrink-0">
            <span className="text-[11px] font-semibold text-white">D</span>
          </div>
          <span className="text-[14px] font-medium text-ink">Director</span>
        </motion.div>

        {/* Connector line from Director to milestones */}
        <motion.div
          className="w-px h-5 bg-ink-20"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.35, ease: EASE, delay: 0.35 }}
          style={{ transformOrigin: "top" }}
        />

        {/* Section label */}
        <motion.div
          className="text-[11px] tracking-[1.5px] uppercase font-medium text-ink-40 mt-4 mb-3 self-start px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, ease: EASE, delay: 0.4 }}
        >
          Milestones
        </motion.div>

        {/* Milestones — factor-row layout */}
        <div className="w-full flex flex-col">
          {MILESTONES.map((milestone, i) => (
            <div key={milestone.number}>
              {/* Connector between milestone rows */}
              {i > 0 && (
                <motion.div
                  className="flex justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.3,
                    ease: EASE,
                    delay: 0.45 + i * 0.1,
                  }}
                >
                  <div className="w-px h-3 bg-ink-20" />
                </motion.div>
              )}

              {/* Factor row */}
              <motion.div
                className="flex items-center gap-3 px-4 py-3 rounded-lg"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  ease: EASE,
                  delay: 0.45 + i * 0.1,
                }}
              >
                {/* Left side: number badge + title */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-cypress/10 text-cypress flex items-center justify-center text-[13px] font-medium shrink-0">
                    {milestone.number}
                  </div>
                  <span className="text-[14px] text-ink">
                    {milestone.title}
                  </span>
                </div>

                {/* Right side: status indicator + bar */}
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[11px] tracking-[1.5px] uppercase font-medium text-ink-40">
                    {milestone.status}
                  </span>
                  <div className="w-16 h-1.5 rounded-full bg-subtle-2x overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-cypress"
                      initial={{ width: 0 }}
                      animate={{
                        width:
                          milestone.status === "Complete" ? "100%" : "45%",
                      }}
                      transition={{
                        duration: 0.6,
                        ease: EASE,
                        delay: 0.6 + i * 0.1,
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
