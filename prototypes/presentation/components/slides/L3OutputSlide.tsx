"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

const screens = [
  {
    number: 1,
    title: "Homepage",
    lines: [
      'The user sees "Protect your family in minutes" with a prominent CTA.',
      "Affordable life insurance with no medical exams, 100% online.",
    ],
  },
  {
    number: 7,
    title: "Basic Details",
    lines: [
      '"Provide your sex at birth." Two options: Male, Female.',
      "Progress bar at ~20%.",
    ],
  },
  {
    number: 18,
    title: "Health Questions — Smoking Status",
    lines: [
      "Radio buttons: Never / Former / Current.",
      "Info banner explains why this matters for pricing. Progress bar at 72%.",
    ],
  },
];

export default function L3OutputSlide() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-12 bg-[#f5f5f5]">
      {/* Header */}
      <motion.div
        className="flex items-center gap-4 mb-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="px-3 py-1 rounded-full bg-cypress text-white text-xs font-medium tracking-wide uppercase">
          Level 3
        </span>
        <h2 className="font-serif text-2xl text-ink">
          The Result: Always Current, Always Accessible
        </h2>
      </motion.div>

      {/* Document viewer */}
      <motion.div
        className="w-full max-w-3xl rounded-2xl overflow-hidden bg-white shadow-lg"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
      >
        {/* Viewer title bar */}
        <div className="flex items-center gap-2 px-5 py-3 border-b border-ink-20">
          <div className="w-3 h-3 rounded-sm bg-cypress" />
          <span className="text-[11px] text-ink-40 uppercase tracking-[1.5px] font-medium font-mono">
            funnel-capture.md
          </span>
          <span className="ml-auto text-[11px] font-mono font-medium text-cypress">
            29 / 29 screens captured &#x2713;
          </span>
        </div>

        {/* Screen entries */}
        <div className="p-5 space-y-0 font-mono text-sm">
          {screens.map((screen, i) => (
            <motion.div
              key={screen.number}
              className={`py-4 ${
                i < screens.length - 1 ? "border-b border-ink-20" : ""
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.4 + i * 0.15,
                ease: EASE,
              }}
            >
              <div className="font-semibold text-ink mb-2">
                Screen {screen.number}: {screen.title}
              </div>
              {screen.lines.map((line, j) => (
                <div key={j} className="text-ink-60 leading-relaxed pl-4">
                  {line}
                </div>
              ))}
            </motion.div>
          ))}

          {/* Truncation indicator */}
          <motion.div
            className="pt-4 text-center text-ink-40 text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.4, ease: EASE }}
          >
            ··· 26 more screens ···
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
