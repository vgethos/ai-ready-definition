"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

const milestones = [
  { number: 1, title: "Narrative" },
  { number: 2, title: "Presentation Build" },
  { number: 3, title: "Delivery Prep" },
];

const contextInputs = [
  {
    badge: "G",
    badgeClass: "bg-ink text-white",
    label: "The original goal",
  },
  {
    badge: "D",
    badgeClass: "bg-cypress text-white",
    label: "Director notes & strategy",
  },
  {
    badge: "M1",
    badgeClass: "bg-cypress text-white",
    label: "M1 output: the 5 levels narrative",
  },
];

export default function L4ZoomSlide() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center max-w-[480px] w-full">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-7"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0 }}
        >
          <span className="text-[11px] tracking-[1.5px] uppercase font-medium px-3 py-1 rounded-full bg-cypress text-white">
            Level 4
          </span>
          <h2 className="font-serif text-[28px] leading-[1.2] text-ink">
            Multi-Agent Orchestration
          </h2>
        </motion.div>

        {/* Milestone pills row */}
        <motion.div
          className="flex items-center gap-3 justify-center mb-7 w-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.15 }}
        >
          {milestones.map((m) => {
            const isFocal = m.number === 2;
            return (
              <motion.div
                key={m.number}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium ${
                  isFocal
                    ? "bg-cypress text-white"
                    : "bg-subtle-2x text-deck-faint"
                }`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: isFocal ? 1 : 0.4,
                  scale: 1,
                }}
                transition={{
                  duration: 0.4,
                  ease: EASE,
                  delay: 0.2 + m.number * 0.08,
                }}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-semibold ${
                    isFocal
                      ? "bg-white/20 text-white"
                      : "bg-ink/10 text-deck-faint"
                  }`}
                >
                  {m.number}
                </span>
                {m.title}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Expanded context card for Milestone 2 */}
        <motion.div
          className="w-full rounded-xl bg-white shadow-card border border-ink/5 px-5 py-5"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
        >
          {/* Context label */}
          <motion.div
            className="text-[11px] tracking-[1.5px] uppercase font-medium text-deck-faint mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, ease: EASE, delay: 0.55 }}
          >
            Context
          </motion.div>

          {/* Context input rows */}
          <div className="flex flex-col gap-3">
            {contextInputs.map((input, i) => (
              <motion.div
                key={input.badge}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  ease: EASE,
                  delay: 0.6 + i * 0.12,
                }}
              >
                {/* Badge */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0 ${input.badgeClass}`}
                >
                  {input.badge}
                </div>

                <span className="text-[13px] font-medium text-ink">
                  {input.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
