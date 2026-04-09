"use client";

import { motion } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const milestones = [
  {
    num: 1,
    label: "Narrative Design",
    agents: ["Research", "Narrative", "Audience"],
  },
  {
    num: 2,
    label: "Presentation Build",
    agents: ["Design", "Build"],
  },
  {
    num: 3,
    label: "Delivery Prep",
    agents: ["Rehearsal", "Polish"],
  },
];

export default function L4GoalSlide() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#f5f5f5] relative overflow-hidden">
      {/* Header */}
      <motion.div
        className="flex items-center gap-4 mb-14"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="px-3 py-1 rounded-full bg-cypress text-white text-xs font-medium tracking-wide uppercase">
          Level 4
        </span>
        <h2 className="font-serif text-3xl text-ink">
          Multi-Agent Orchestration
        </h2>
      </motion.div>

      {/* Main 4-column layout */}
      <div className="flex items-center gap-0" style={{ maxWidth: 900, width: "100%" }}>

        {/* COLUMN 1 — You */}
        <motion.div
          className="flex flex-col items-center shrink-0"
          style={{ width: 100 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
        >
          <div className="w-14 h-14 rounded-full bg-cypress text-white flex items-center justify-center text-base font-semibold shadow-md">
            VG
          </div>
          <span className="text-xs font-medium text-ink mt-2">You</span>
        </motion.div>

        {/* Arrow 1 → */}
        <motion.div
          className="flex items-center justify-center shrink-0 -mt-4"
          style={{ width: 48 }}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.7, ease: EASE }}
        >
          <span className="text-cypress text-2xl font-light select-none">&rarr;</span>
        </motion.div>

        {/* COLUMN 2 — Director Agent */}
        <motion.div
          className="flex flex-col items-center shrink-0"
          style={{ width: 170 }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.0, ease: EASE }}
        >
          <div className="bg-white rounded-xl shadow-md border-2 border-cypress px-6 py-5 flex flex-col items-center w-full">
            <div className="w-8 h-8 rounded-full bg-cypress/10 flex items-center justify-center mb-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6" stroke="#056257" strokeWidth="1.5" />
                <circle cx="8" cy="8" r="2" fill="#056257" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-ink">Director Agent</span>
            <span className="text-[11px] text-ink-40 mt-0.5">Coordinates everything</span>
          </div>
        </motion.div>

        {/* Arrow 2 → */}
        <motion.div
          className="flex items-center justify-center shrink-0 -mt-4"
          style={{ width: 48 }}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 1.4, ease: EASE }}
        >
          <span className="text-cypress text-2xl font-light select-none">&rarr;</span>
        </motion.div>

        {/* COLUMN 3 + 4 — Milestones & Specialist Agents */}
        <div className="flex flex-col gap-3 flex-1 min-w-0">
          {milestones.map((m, i) => (
            <div key={m.num} className="flex items-center gap-3">
              {/* Milestone card */}
              <motion.div
                className="bg-white rounded-lg shadow-sm px-4 py-3 flex items-center gap-3 shrink-0"
                style={{ width: 200 }}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.7 + i * 0.15, ease: EASE }}
              >
                <span className="w-6 h-6 rounded-full bg-cypress text-white text-[11px] font-semibold flex items-center justify-center shrink-0">
                  {m.num}
                </span>
                <span className="text-sm font-medium text-ink leading-tight">{m.label}</span>
              </motion.div>

              {/* Specialist agent pills */}
              <motion.div
                className="flex flex-wrap gap-1.5"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 2.3 + i * 0.12, ease: EASE }}
              >
                {m.agents.map((agent) => (
                  <span
                    key={agent}
                    className="px-2.5 py-1 rounded-full bg-cypress/10 text-cypress text-xs font-medium"
                  >
                    {agent}
                  </span>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Review loop bar */}
      <motion.div
        className="mt-10 flex items-center gap-2 px-5 py-2.5 rounded-full bg-white shadow-sm border border-gray-100"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 2.9, ease: EASE }}
      >
        {["Draft", "Review", "Revise", "Review", "Approve"].map((step, i) => (
          <span key={`${step}-${i}`} className="flex items-center gap-2">
            <span className="text-xs font-medium text-ink-40">{step}</span>
            {i < 4 && (
              <span className="text-cypress text-xs select-none">&rarr;</span>
            )}
          </span>
        ))}
      </motion.div>

      {/* Bottom caption */}
      <motion.p
        className="mt-6 text-sm text-ink-40 text-center max-w-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 3.3, ease: EASE }}
      >
        One vague goal in, structured execution out. You talk to one agent &mdash; it handles the rest.
      </motion.p>
    </div>
  );
}
