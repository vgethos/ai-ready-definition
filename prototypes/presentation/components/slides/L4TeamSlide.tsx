"use client";

import { motion } from "motion/react";
import { Search, Users, BookOpen, Check } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const agents = [
  { name: "Research Agent", Icon: Search },
  { name: "Narrative Agent", Icon: BookOpen },
  { name: "Audience Analyst", Icon: Users },
];

const iterationSteps = [
  { label: "Draft", status: "done" },
  { label: "Review", status: "done" },
  { label: "Revision", status: "done" },
  { label: "Review", status: "done" },
  { label: "Approved", status: "active" },
];

export default function L4TeamSlide() {
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
        <h2 className="font-serif text-3xl text-ink">
          Review Loops, Not One-Shot Delegation
        </h2>
      </motion.div>

      {/* Focal milestone card */}
      <motion.div
        className="bg-white rounded-xl shadow-lg border-2 border-cypress px-8 py-5 mb-0 relative z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
      >
        <span className="text-base font-semibold text-ink">
          Milestone 1: Narrative Design
        </span>
      </motion.div>

      {/* SVG arrows: milestone ↔ agents (bidirectional) */}
      <div className="relative w-[600px] h-[60px]">
        <svg
          className="absolute inset-0"
          width={600}
          height={60}
          viewBox="0 0 600 60"
          fill="none"
        >
          <defs>
            <marker
              id="arrow-down"
              markerWidth="7"
              markerHeight="5"
              refX="6"
              refY="2.5"
              orient="auto"
            >
              <polygon points="0 0, 7 2.5, 0 5" fill="#056257" />
            </marker>
            <marker
              id="arrow-up"
              markerWidth="7"
              markerHeight="5"
              refX="1"
              refY="2.5"
              orient="auto"
            >
              <polygon points="7 0, 0 2.5, 7 5" fill="#056257" />
            </marker>
          </defs>

          {/* Down arrows (work flows down) */}
          {[150, 300, 450].map((x, i) => (
            <motion.line
              key={`down-${i}`}
              x1={x - 6}
              y1={4}
              x2={x - 6}
              y2={56}
              stroke="#056257"
              strokeWidth={1.5}
              markerEnd="url(#arrow-down)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 1.0 + i * 0.1, ease: EASE }}
            />
          ))}

          {/* Up arrows (feedback flows up) */}
          {[150, 300, 450].map((x, i) => (
            <motion.line
              key={`up-${i}`}
              x1={x + 6}
              y1={56}
              x2={x + 6}
              y2={4}
              stroke="#056257"
              strokeWidth={1.5}
              strokeDasharray="4 3"
              markerEnd="url(#arrow-up)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 1.3 + i * 0.1, ease: EASE }}
            />
          ))}
        </svg>

        {/* Labels */}
        <motion.span
          className="absolute text-[10px] text-cypress font-medium"
          style={{ left: 55, top: 24 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.5, ease: EASE }}
        >
          work &darr;
        </motion.span>
        <motion.span
          className="absolute text-[10px] text-cypress font-medium"
          style={{ right: 55, top: 24 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.6, ease: EASE }}
        >
          &uarr; feedback
        </motion.span>
      </div>

      {/* Agent cards row */}
      <div className="flex items-start gap-8 mb-10">
        {agents.map((agent, i) => (
          <motion.div
            key={agent.name}
            className="w-[160px] bg-white rounded-xl shadow-sm p-5 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 + i * 0.12, ease: EASE }}
          >
            <agent.Icon className="w-6 h-6 text-cypress mb-3" strokeWidth={1.5} />
            <span className="text-sm font-medium text-ink">{agent.name}</span>
          </motion.div>
        ))}
      </div>

      {/* Iteration timeline */}
      <motion.div
        className="bg-white rounded-xl shadow-sm px-8 py-6 flex flex-col items-center"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.8, ease: EASE }}
      >
        <span className="text-xs font-medium text-ink-40 uppercase tracking-wide mb-4">
          Review &amp; Iteration Cycle
        </span>
        <div className="flex items-center gap-0">
          {iterationSteps.map((step, i) => (
            <div key={`${step.label}-${i}`} className="flex items-center">
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: 2.0 + i * 0.15,
                  ease: EASE,
                }}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center ${
                    step.status === "active"
                      ? "bg-cypress text-white"
                      : "bg-cypress/10 text-cypress"
                  }`}
                >
                  {step.status === "active" ? (
                    <Check className="w-4 h-4" strokeWidth={2.5} />
                  ) : (
                    <Check className="w-3.5 h-3.5" strokeWidth={2} />
                  )}
                </div>
                <span
                  className={`text-[11px] mt-2 ${
                    step.status === "active"
                      ? "font-semibold text-cypress"
                      : "text-ink-40"
                  }`}
                >
                  {step.label}
                </span>
              </motion.div>

              {/* Connector line between steps */}
              {i < iterationSteps.length - 1 && (
                <motion.div
                  className="w-10 h-[2px] bg-cypress/20 mx-1 mt-[-16px]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 0.2,
                    delay: 2.0 + (i + 0.5) * 0.15,
                    ease: EASE,
                  }}
                  style={{ transformOrigin: "left" }}
                />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Bottom text */}
      <motion.p
        className="mt-10 text-lg text-ink-40 text-center max-w-xl"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.8, ease: EASE }}
      >
        Each round polishes the quality. Two, three, four iterations.
      </motion.p>
    </div>
  );
}
