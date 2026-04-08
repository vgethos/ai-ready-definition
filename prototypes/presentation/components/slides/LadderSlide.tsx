"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

const LEVELS = [
  { num: 1, goal: "Spell this word right" },
  { num: 2, goal: "Write this email for me" },
  { num: 3, goal: "Help me while I code" },
  { num: 4, goal: "Analyze this 50-page document" },
  { num: 5, goal: "I never want to document our funnel manually again" },
  { num: 6, goal: "Build me a product that doesn't exist yet" },
  { num: 7, goal: "Prepare my all-hands presentation" },
];

export default function LadderSlide() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-12 bg-canvas relative">
      <motion.h2
        className="font-serif text-4xl text-subtle-2x mb-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        The 7 Levels
      </motion.h2>

      {/* Vertical "ambition of goals" label on the right */}
      <motion.div
        className="absolute right-8 top-1/2 text-xs text-ink-40 tracking-widest uppercase"
        style={{ transform: "translateY(-50%) rotate(90deg)", transformOrigin: "center center" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8, ease: EASE }}
      >
        ambition of goals →
      </motion.div>

      <div className="flex flex-col-reverse gap-2 w-full max-w-3xl">
        {LEVELS.map((level, i) => {
          const isAdvanced = level.num >= 5;
          const delay = i * 0.08;

          return (
            <motion.div
              key={level.num}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay, ease: EASE }}
            >
              {/* Divider between L4 and L5 */}
              {level.num === 5 && (
                <div className="mb-3 mt-1 border-t border-dashed border-ink-40/30" />
              )}

              <div
                className={`flex items-center gap-4 px-5 py-3 rounded-lg ${
                  isAdvanced ? "border-l-2 border-l-cypress-light" : ""
                }`}
              >
                {/* Level badge */}
                <span
                  className={`flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium ${
                    isAdvanced
                      ? "bg-cypress text-subtle-2x"
                      : "bg-white/[0.03] text-ink-40"
                  }`}
                >
                  L{level.num}
                </span>

                {/* Goal text */}
                <span
                  className={`text-lg ${
                    isAdvanced ? "text-subtle-2x" : "text-ink-40"
                  }`}
                >
                  &ldquo;{level.goal}&rdquo;
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
