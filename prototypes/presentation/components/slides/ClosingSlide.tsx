"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const LEVELS = [
  { num: 1, goal: "Spell this word right" },
  { num: 2, goal: "Write this email for me" },
  { num: 3, goal: "Help me while I work" },
  { num: 4, goal: "Analyze this 50-page document" },
  { num: 5, goal: "Never document our funnel manually again" },
  { num: 6, goal: "Build me a product that doesn't exist yet" },
  { num: 7, goal: "Achieve this goal — figure out the steps yourself" },
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
          const isHighlighted = level.num >= 5;
          return (
            <div key={level.num}>
              <motion.div
                className={`flex items-center gap-3 px-4 py-2 rounded-md ${
                  isHighlighted
                    ? "text-ink"
                    : "text-ink-40"
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
              {level.num === 5 && <FundsArrow delay={0.8} />}
              {level.num === 6 && <FundsArrow delay={1.1} />}
            </div>
          );
        })}
      </motion.div>

      {/* Closing message */}
      <motion.div
        className="text-center max-w-2xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4, ease: EASE }}
      >
        <p className="font-serif text-2xl text-ink mb-4">
          Don&rsquo;t try to jump to level 6.
        </p>
        <p className="text-lg text-ink-60 leading-relaxed">
          Go to the next level. Get comfortable. Then think a little bigger.
          <br />
          Put in the work, level by level, and it compounds.
        </p>
      </motion.div>

      {/* Final CTA */}
      <motion.p
        className="mt-10 text-lg text-cypress font-semibold text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.0, ease: EASE }}
      >
        Figure out what level you&rsquo;re at. Start thinking about the next one.
      </motion.p>
    </div>
  );
}
