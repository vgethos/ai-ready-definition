"use client";

import { motion } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const terminalLines = [
  { text: "$ hq goal create", style: "command" },
  { text: "", style: "blank" },
  { text: 'Goal: "Put together a quick demo/presentation', style: "text" },
  { text: '       for company all-hands"', style: "text" },
  { text: "", style: "blank" },
  { text: "⟩ Analyzing goal...", style: "status" },
  { text: "⟩ Decomposing into milestones...", style: "status" },
  { text: "", style: "blank" },
  { text: "┌─ Milestone 1: Narrative Design", style: "border" },
  { text: "│  Research examples, design talk structure,", style: "border" },
  { text: "│  write speaker script", style: "border" },
  { text: "│", style: "border" },
  { text: "├─ Milestone 2: Presentation Build", style: "border" },
  { text: "│  Create visual assets and slide deck", style: "border" },
  { text: "│", style: "border" },
  { text: "└─ Milestone 3: Demo Preparation", style: "border" },
  { text: "   Polish demos, rehearse, prepare fallbacks", style: "text" },
  { text: "", style: "blank" },
  { text: '⟩ Assigning specialist agents...', style: "status" },
  { text: '⟩ Agent "Strategist" → Milestone 1', style: "status" },
  { text: '⟩ Agent "Designer"   → Milestone 2', style: "status" },
  { text: '⟩ Agent "Engineer"   → Milestone 3', style: "status" },
];

function lineColor(style: string) {
  switch (style) {
    case "command":
    case "status":
      return "text-cypress-light";
    case "border":
      return "text-cypress-light";
    case "text":
    default:
      return "text-white";
  }
}

export default function L7SetupSlide() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-12">
      {/* Header */}
      <motion.div
        className="flex items-center gap-4 mb-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="px-3 py-1 rounded-full bg-cypress text-white text-xs font-medium tracking-wide uppercase">
          Level 7
        </span>
        <h2 className="font-serif text-3xl text-white">
          Achieve this goal &mdash; figure out the steps yourself
        </h2>
      </motion.div>

      {/* Terminal Window */}
      <motion.div
        className="w-[700px] bg-ink rounded-2xl border border-white/10 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
      >
        {/* Terminal chrome */}
        <div className="flex items-center gap-2 px-4 py-3 bg-ink-80 border-b border-white/10">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>

        {/* Terminal content */}
        <div className="px-5 py-4 font-mono text-sm leading-relaxed">
          {terminalLines.map((line, i) => (
            <motion.div
              key={i}
              className={`${lineColor(line.style)} ${line.style === "blank" ? "h-4" : ""}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.15,
                delay: 0.5 + i * 0.15,
                ease: EASE,
              }}
            >
              {line.text || "\u00A0"}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom caption */}
      <motion.p
        className="mt-8 text-sm text-white/60 italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 4.2, ease: EASE }}
      >
        I typed one sentence. A team formed.
      </motion.p>
    </div>
  );
}
