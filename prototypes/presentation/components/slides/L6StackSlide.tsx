"use client";

import { motion } from "motion/react";
import { Layers, BookOpen, SlidersHorizontal, MousePointer } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const CARDS = [
  {
    Icon: Layers,
    title: "Design system access",
    description: "Claude knows our components",
  },
  {
    Icon: BookOpen,
    title: "Brand convention rules",
    description: "Project instructions encode our standards",
  },
  {
    Icon: SlidersHorizontal,
    title: "Live design tuning",
    description: "Adjust parameters without re-prompting",
  },
  {
    Icon: MousePointer,
    title: "Visual feedback loop",
    description: "Point at issues, get fixes",
  },
];

export default function L6StackSlide() {
  const cardDelay = 0.12;
  const allCardsVisible = 0.4 + CARDS.length * cardDelay;

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-12 bg-canvas">
      {/* Header */}
      <motion.div
        className="flex items-center gap-4 mb-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="px-3 py-1 rounded-full bg-cypress text-subtle-2x text-sm font-medium">
          Level 6
        </span>
        <h2 className="font-serif text-2xl text-subtle-2x">
          Why this worked: L5 tools compounding
        </h2>
      </motion.div>

      {/* Subheader */}
      <motion.p
        className="text-lg text-cypress-light italic mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
      >
        Level 6 is NOT &ldquo;AI wrote some code&rdquo;
      </motion.p>

      {/* Cards row with arrows */}
      <div className="flex items-center gap-3 mb-10">
        {CARDS.map((card, i) => (
          <div key={card.title} className="flex items-center gap-3">
            <motion.div
              className="bg-white/[0.03] rounded-xl border border-subtle/20 p-6 flex flex-col items-center text-center w-[200px]"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.4 + i * cardDelay,
                ease: EASE,
              }}
            >
              <card.Icon className="w-7 h-7 text-cypress-light mb-3" />
              <h3 className="text-sm font-medium text-subtle-2x mb-1">
                {card.title}
              </h3>
              <p className="text-xs text-ink-40">{card.description}</p>
            </motion.div>

            {/* Arrow between cards */}
            {i < CARDS.length - 1 && (
              <motion.span
                className="text-xl text-ink-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.3,
                  delay: 0.4 + (i + 1) * cardDelay,
                  ease: EASE,
                }}
              >
                →
              </motion.span>
            )}
          </div>
        ))}
      </div>

      {/* Equation result */}
      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: allCardsVisible, ease: EASE }}
      >
        <span className="text-4xl text-ink-40 font-light">=</span>
        <span className="text-xl text-cypress-light font-serif">
          Creation capability
        </span>
      </motion.div>
    </div>
  );
}
