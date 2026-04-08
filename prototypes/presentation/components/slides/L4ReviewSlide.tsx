"use client";

import { motion } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SECTIONS = [
  {
    heading: "Decisions Made",
    content:
      "5-level framework (per Calvin). Funnel capture as L3 bridge. Meta-reveal as L4 closer.",
  },
  {
    heading: "Work Completed",
    content:
      "Script: 7:50, 5 levels \u2713  |  Slides: 12 screens built \u2713  |  Delivery notes \u2713",
  },
  {
    heading: "Open Questions",
    content:
      "Font choice: Portada+Hauss or reference repo fonts?  |  Dark theme or light?",
  },
];

export default function L4ReviewSlide() {
  const sectionDelay = 0.15;
  const allSectionsVisible = 0.6 + SECTIONS.length * sectionDelay;

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-12 bg-[#f5f5f5]">
      {/* Header */}
      <motion.div
        className="flex items-center gap-4 mb-10"
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
              <h3 className="text-sm font-semibold text-ink mb-1">
                {section.heading}
              </h3>
              <p className="text-sm text-ink-60 leading-relaxed">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Action buttons */}
        <motion.div
          className="px-6 py-4 border-t border-ink-20 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.4,
            delay: allSectionsVisible + 0.2,
            ease: EASE,
          }}
        >
          <button className="px-5 py-2 rounded-lg bg-cypress text-white text-sm font-medium">
            Approve
          </button>
          <button className="px-5 py-2 rounded-lg border border-ink-20 text-ink text-sm font-medium">
            Send Revision Notes
          </button>
        </motion.div>
      </motion.div>

      {/* Bottom caption */}
      <motion.p
        className="mt-8 text-sm text-ink-40 italic"
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
