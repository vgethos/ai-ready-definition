"use client";

import { motion } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const screens = [
  {
    number: 1,
    title: "Welcome — Get a Quote",
    lines: [
      'The user sees a hero section with "Life insurance that\'s actually easy."',
      'A single CTA: "Check my price" in cypress green.',
      "No navigation distractions — full-bleed layout.",
    ],
  },
  {
    number: 7,
    title: "Beneficiary Selection",
    lines: [
      "User sees household members with checkboxes.",
      "Can add additional beneficiaries via inline form.",
      "Progress bar at 40%.",
    ],
  },
  {
    number: 18,
    title: "Health Questions — Smoking Status",
    lines: [
      "Radio buttons: Never / Former / Current.",
      "Info banner explains why this matters for pricing.",
      "Back button visible; progress bar at 72%.",
    ],
  },
];

export default function L5OutputSlide() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-12 bg-canvas">
      {/* Header */}
      <motion.div
        className="flex items-center gap-4 mb-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="px-3 py-1 rounded-full bg-cypress text-subtle-2x text-xs font-medium tracking-wide uppercase">
          Level 5
        </span>
        <h2 className="font-serif text-2xl text-subtle-2x">
          The Output: 29 Screens, Structured &amp; Searchable
        </h2>
      </motion.div>

      {/* Document viewer */}
      <motion.div
        className="w-full max-w-3xl rounded-xl overflow-hidden bg-canvas-light border border-ink-20/10 shadow-lg shadow-black/20"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
      >
        {/* Viewer title bar */}
        <div className="flex items-center gap-2 px-5 py-3 border-b border-ink-20/10">
          <div className="w-3 h-3 rounded-sm bg-cypress/40" />
          <span className="text-xs text-ink-40 font-mono">
            funnel-capture.md
          </span>
          <span className="ml-auto text-xs text-ink-60">29 screens</span>
        </div>

        {/* Screen entries */}
        <div className="p-5 space-y-0 font-mono text-sm">
          {screens.map((screen, i) => (
            <motion.div
              key={screen.number}
              className={`py-4 ${
                i < screens.length - 1 ? "border-b border-ink-20/10" : ""
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.4 + i * 0.15,
                ease: EASE,
              }}
            >
              <div className="text-cypress-light font-semibold mb-2">
                Screen {screen.number}: {screen.title}
              </div>
              {screen.lines.map((line, j) => (
                <div key={j} className="text-subtle/70 leading-relaxed pl-4">
                  {line}
                </div>
              ))}
            </motion.div>
          ))}

          {/* Truncation indicator */}
          <motion.div
            className="pt-4 text-center text-ink-60 text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.4, ease: EASE }}
          >
            ··· 26 more screens ···
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom callout */}
      <motion.div
        className="mt-6 w-full max-w-3xl rounded-xl border border-ink-20/10 bg-canvas-light px-6 py-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1, ease: EASE }}
      >
        <span className="text-subtle/80 text-sm">
          I spent{" "}
          <span className="text-cypress-light font-semibold">2 hours</span>{" "}
          building this. Now{" "}
          <span className="text-cypress-light font-semibold">
            10 people on my team
          </span>{" "}
          use it.
        </span>
      </motion.div>
    </div>
  );
}
