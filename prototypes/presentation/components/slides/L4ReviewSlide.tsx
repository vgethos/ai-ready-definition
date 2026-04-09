"use client";

import { motion } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SECTIONS = [
  {
    heading: "Decisions Made",
    content:
      "5-level framework confirmed. Funnel capture as L3 bridge. Meta-reveal as L4 closer.",
  },
  {
    heading: "Work Completed",
    content:
      "Narrative finalized (7:50 runtime) \u00b7 Visual deck complete (8 screens) \u00b7 Delivery prep in progress",
  },
  {
    heading: "Open Questions",
    content:
      "Demo pacing for L3 walkthrough \u00b7 Closing call-to-action format",
  },
];

export default function L4ReviewSlide() {
  const sectionDelay = 0.15;
  const allSectionsVisible = 0.6 + SECTIONS.length * sectionDelay;

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-12 bg-[#f5f5f5]">
      {/* Header */}
      <motion.div
        className="flex items-center gap-4 mb-7"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="px-3 py-1 rounded-full bg-cypress text-white text-xs font-medium tracking-wide uppercase">
          Level 4
        </span>
        <h2 className="font-serif text-3xl text-ink">Human in the Loop</h2>
      </motion.div>

      {/* Executive Summary Card */}
      <motion.div
        className="w-[620px] bg-white rounded-2xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
      >
        {/* Title bar */}
        <div className="px-6 py-3 border-b border-ink-20">
          <span className="font-mono text-xs text-ink-60 tracking-wide">
            Executive Summary &mdash; Presentation Goal
          </span>
        </div>

        {/* Sections */}
        <div className="px-6 py-5 space-y-5">
          {SECTIONS.map((section, i) => (
            <motion.div
              key={section.heading}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.6 + i * sectionDelay,
                ease: EASE,
              }}
            >
              <h3 className="text-[14px] font-medium text-ink mb-1">
                {section.heading}
              </h3>
              <p className="text-[14px] text-ink-60 leading-relaxed">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Caption */}
        <motion.div
          className="px-6 py-4 border-t border-ink-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.4,
            delay: allSectionsVisible + 0.2,
            ease: EASE,
          }}
        >
          <p className="text-[13px] text-ink-40">
            Review, redirect, approve &mdash; then move on.
          </p>
        </motion.div>
      </motion.div>

      {/* Bottom caption */}
      <motion.p
        className="mt-7 text-[14px] text-ink-60 italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: allSectionsVisible + 0.6,
          ease: EASE,
        }}
      >
        My role: judgment, direction, and taste.
      </motion.p>
    </div>
  );
}
