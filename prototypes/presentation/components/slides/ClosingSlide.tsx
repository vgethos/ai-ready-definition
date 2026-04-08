"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const LEVELS = [
  { num: 1, goal: "Write this email for me" },
  { num: 2, goal: "Help me analyze this document" },
  { num: 3, goal: "I never want to document our funnel manually again" },
  { num: 4, goal: "Build a complete presentation from a single sentence" },
  { num: 5, goal: "Solve a complex problem end-to-end" },
];

function FundsArrow({ delay }: { delay: number }) {
  return (
    <motion.div
      className="flex items-center gap-1.5 pl-12 py-1"
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      <span className="text-xs text-cypress font-medium tracking-wide">
        funds
      </span>
      <ArrowRight className="size-3 text-cypress" />
    </motion.div>
  );
}

export default function ClosingSlide() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-12 bg-[#f5f5f5]">
      {/* Ladder */}
      <motion.div
        className="flex flex-col w-full max-w-2xl mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {LEVELS.map((level) => {
          const isHighlighted = level.num === 3 || level.num === 4;
          return (
            <div key={level.num}>
              <motion.div
                className={`flex items-center gap-3 px-4 py-2 rounded-md ${
                  isHighlighted ? "text-ink" : "text-ink-40"
                }`}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  delay: level.num * 0.06,
                  ease: EASE,
                }}
              >
                <span
                  className={`flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full text-xs font-medium ${
                    isHighlighted
                      ? "bg-cypress text-white"
                      : "bg-subtle-2x text-ink-40"
                  }`}
                >
                  {level.num}
                </span>
                <span className="text-sm">
                  &ldquo;{level.goal}&rdquo;
                </span>
              </motion.div>
              {level.num === 2 && <FundsArrow delay={0.6} />}
              {level.num === 3 && <FundsArrow delay={0.9} />}
            </div>
          );
        })}
      </motion.div>

      {/* Closing message */}
      <motion.div
        className="text-center max-w-2xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: EASE }}
      >
        <p className="font-serif text-2xl text-ink mb-4">
          The investment is sequential. Each level funds the next.
        </p>
      </motion.div>

      {/* Final CTA */}
      <motion.p
        className="mt-6 text-lg text-cypress font-semibold text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.8, ease: EASE }}
      >
        Figure out your level. Go to the next one. It compounds.
      </motion.p>
    </div>
  );
}
