"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

const LEVELS = [
  { num: 1, goal: "Write this email for me" },
  { num: 2, goal: "Help me analyze this document" },
  { num: 3, goal: "Make our entire funnel accessible to AI — structured, searchable, always current" },
  { num: 4, goal: "Orchestrate a team of AI agents to research, design, build, and polish a complete project" },
  { num: 5, goal: "Solve a complex problem end-to-end with minimal guidance" },
];

export default function L5TeaserSlide() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-12 bg-[#f5f5f5] relative">
      {/* Header: Level 5 badge + title */}
      <motion.div
        className="flex items-center gap-4 mb-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-cypress text-white text-sm font-medium">
          L5
        </span>
        <h2 className="font-serif text-3xl text-ink">
          Where This Is Heading
        </h2>
      </motion.div>

      {/* Vertical ladder — bottom-to-top via flex-col-reverse */}
      <div className="flex flex-col-reverse gap-2 w-full max-w-3xl">
        {LEVELS.map((level, i) => {
          const isL5 = level.num === 5;
          const delay = i * 0.08 + 0.15;

          return (
            <motion.div
              key={level.num}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay, ease: EASE }}
            >
              {/* Dashed divider between L2 and L3 */}
              {level.num === 3 && (
                <div className="mb-3 mt-1 border-t border-dashed border-ink-40/30" />
              )}

              <div
                className={`flex items-center gap-4 px-5 py-3 bg-white rounded-xl shadow-sm transition-opacity ${
                  isL5 ? "opacity-100" : "opacity-50"
                }`}
              >
                {/* Level badge */}
                <span
                  className={`flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium ${
                    isL5
                      ? "bg-cypress text-white"
                      : "bg-subtle-2x text-ink-40"
                  }`}
                >
                  L{level.num}
                </span>

                {/* Goal text */}
                <span
                  className={`text-lg ${
                    isL5 ? "text-ink" : "text-ink-40"
                  }`}
                >
                  &ldquo;{level.goal}&rdquo;
                </span>

                {/* POC pill — only on L5 */}
                {isL5 && (
                  <span className="ml-auto flex-shrink-0 bg-cypress/20 text-cypress rounded-full px-3 py-0.5 text-xs font-medium">
                    POC
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quote below the ladder */}
      <motion.p
        className="mt-10 text-lg italic text-ink-60"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
      >
        Every level makes the next one possible.
      </motion.p>
    </div>
  );
}
