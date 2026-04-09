"use client";

import { motion } from "motion/react";
import { FileText, Monitor, Mic } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const MILESTONES = [
  {
    Icon: FileText,
    title: "Narrative Design",
    description:
      "What\u2019s the message? Choose examples that resonate for 800 people.",
  },
  {
    Icon: Monitor,
    title: "Presentation Build",
    description: "Turn the narrative into a web-based, on-brand presentation.",
  },
  {
    Icon: Mic,
    title: "Delivery Prep",
    description: "Dry runs, timing, feedback. Ready for the day.",
  },
];

export default function L4MilestonesSlide() {
  const cardDelay = 0.18;
  const allCardsVisible = 0.4 + MILESTONES.length * cardDelay;

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-12 bg-[#f5f5f5]">
      {/* Header */}
      <motion.div
        className="flex flex-col items-center gap-3 mb-14"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className="flex items-center gap-4">
          <span className="px-3 py-1 rounded-full bg-cypress text-white text-xs font-medium tracking-wide uppercase">
            Level 4
          </span>
          <h2 className="font-serif text-3xl text-ink">Goal Decomposition</h2>
        </div>
        <p className="text-ink-40 text-base mt-1">
          One vague sentence becomes three concrete workstreams
        </p>
      </motion.div>

      {/* Cards row with arrows */}
      <div className="flex items-center gap-6">
        {MILESTONES.map((card, i) => (
          <div key={card.title} className="flex items-center gap-6">
            <motion.div
              className="bg-white rounded-xl shadow-sm p-8 flex flex-col items-center text-center w-[240px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.4 + i * cardDelay,
                ease: EASE,
              }}
            >
              <card.Icon className="w-7 h-7 text-cypress mb-4" strokeWidth={1.5} />
              <h3 className="text-base font-semibold text-ink mb-2">
                {card.title}
              </h3>
              <p className="text-sm text-ink-40 leading-relaxed">
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
                animate={{ opacity: 0.5 }}
                transition={{
                  duration: 0.3,
                  delay: 0.4 + (i + 1) * cardDelay,
                  ease: EASE,
                }}
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="#056257"
                  strokeWidth="1.5"
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
        className="mt-14 text-lg text-ink-40"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: allCardsVisible + 0.3, ease: EASE }}
      >
        Each milestone gets its own team of specialist agents.
      </motion.p>
    </div>
  );
}
