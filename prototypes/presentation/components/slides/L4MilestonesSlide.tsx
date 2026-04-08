"use client";

import { motion } from "motion/react";
import { FileText, Monitor, Mic } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const MILESTONES = [
  {
    Icon: FileText,
    title: "Milestone 1: Narrative Design",
    description:
      "What\u2019s the message? Choose examples that resonate for 800 people",
  },
  {
    Icon: Monitor,
    title: "Milestone 2: Presentation Build",
    description: "Turn the narrative into a web-based presentation",
  },
  {
    Icon: Mic,
    title: "Milestone 3: Delivery Prep",
    description: "Dry runs, timing, feedback. Confidence for the day.",
  },
];

export default function L4MilestonesSlide() {
  const cardDelay = 0.15;
  const allCardsVisible = 0.4 + MILESTONES.length * cardDelay;

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-12 bg-[#f5f5f5]">
      {/* Header */}
      <motion.div
        className="flex items-center gap-4 mb-12"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="px-3 py-1 rounded-full bg-cypress text-white text-xs font-medium tracking-wide uppercase">
          Level 4
        </span>
        <h2 className="font-serif text-3xl text-ink">Goal Decomposition</h2>
      </motion.div>

      {/* Cards row with arrows */}
      <div className="flex items-center gap-4 mb-12">
        {MILESTONES.map((card, i) => (
          <div key={card.title} className="flex items-center gap-4">
            <motion.div
              className="bg-white rounded-xl shadow-sm p-8 flex flex-col items-center text-center w-[250px]"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.4 + i * cardDelay,
                ease: EASE,
              }}
            >
              <card.Icon className="w-8 h-8 text-cypress mb-4" />
              <h3 className="text-sm font-semibold text-ink mb-2">
                {card.title}
              </h3>
              <p className="text-sm text-ink-60 leading-snug">
                {card.description}
              </p>
            </motion.div>

            {/* Arrow between cards */}
            {i < MILESTONES.length - 1 && (
              <motion.svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.3,
                  delay: 0.4 + (i + 1) * cardDelay,
                  ease: EASE,
                }}
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="#056257"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            )}
          </div>
        ))}
      </div>

      {/* Bottom text */}
      <motion.p
        className="text-lg text-ink-40"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: allCardsVisible + 0.3, ease: EASE }}
      >
        Three milestones. Each one gets a specialist.
      </motion.p>
    </div>
  );
}
