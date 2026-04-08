"use client";

import { motion } from "motion/react";
import { Lightbulb, Palette, Wrench, Crown } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const agents = [
  {
    name: "Strategist",
    icon: Lightbulb,
    bullets: [
      "Researched codebase",
      "Evaluated candidate examples",
      "Wrote speaker script",
    ],
  },
  {
    name: "Designer",
    icon: Palette,
    bullets: [
      "Used script to plan visuals",
      "Built slide deck",
      "Created demo assets",
    ],
  },
  {
    name: "Engineer",
    icon: Wrench,
    bullets: [
      "Polished live demos",
      "Prepared fallbacks",
      "Rehearsal notes",
    ],
  },
];

function FlowArrow({ delay }: { delay: number }) {
  return (
    <motion.div
      className="flex items-center justify-center self-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay, ease: EASE }}
    >
      <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
        <motion.path
          d="M4 12 L22 12"
          stroke="#5bbfb3"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.1, ease: EASE }}
        />
        <motion.path
          d="M19 7 L25 12 L19 17"
          stroke="#5bbfb3"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: delay + 0.4, ease: EASE }}
        />
      </svg>
    </motion.div>
  );
}

function FeedbackArrow({ delay, side }: { delay: number; side: "left" | "center" | "right" }) {
  const xOffset = side === "left" ? -120 : side === "right" ? 120 : 0;
  return (
    <motion.div
      className="absolute"
      style={{ left: "50%", transform: `translateX(${xOffset}px)`, top: -12 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
        <path
          d="M12 14 L12 4 M8 8 L12 2 L16 8"
          stroke="#5bbfb3"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}

export default function L7TeamSlide() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-12 bg-canvas">
      {/* Header */}
      <motion.div
        className="flex items-center gap-4 mb-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="px-3 py-1 rounded-full bg-cypress text-subtle-2x text-xs font-medium tracking-wide uppercase">
          Level 7
        </span>
        <h2 className="font-serif text-3xl text-subtle-2x">
          Not delegation. Collaboration.
        </h2>
      </motion.div>

      {/* Agent Columns with Flow Arrows */}
      <div className="flex items-stretch gap-0 mb-8">
        {agents.map((agent, i) => {
          const Icon = agent.icon;
          return (
            <div key={agent.name} className="flex items-stretch">
              <motion.div
                className="w-[220px] bg-canvas-light rounded-xl border border-white/5 p-6 flex flex-col"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.2, ease: EASE }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="size-6 text-cypress-light" />
                  <span className="text-subtle-2x font-medium">{agent.name}</span>
                </div>
                <ul className="flex flex-col gap-2">
                  {agent.bullets.map((bullet, j) => (
                    <motion.li
                      key={j}
                      className="text-sm text-ink-40 flex items-start gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.6 + i * 0.2 + j * 0.1,
                        ease: EASE,
                      }}
                    >
                      <span className="text-cypress-light mt-0.5">·</span>
                      {bullet}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              {i < agents.length - 1 && <FlowArrow delay={0.8 + i * 0.2} />}
            </div>
          );
        })}
      </div>

      {/* Director Row */}
      <motion.div
        className="relative w-[720px] bg-canvas-light rounded-xl border border-white/5 p-5 flex items-center justify-center gap-4"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.1, ease: EASE }}
      >
        <FeedbackArrow delay={1.3} side="left" />
        <FeedbackArrow delay={1.4} side="center" />
        <FeedbackArrow delay={1.5} side="right" />
        <Crown className="size-5 text-cypress-light flex-shrink-0" />
        <span className="text-sm text-subtle">
          Reviews work · Sends revision notes · Coordinates dependencies
        </span>
      </motion.div>

      {/* The Reveal */}
      <motion.p
        className="mt-12 text-xl text-cypress-light font-semibold text-center max-w-2xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.8, ease: EASE }}
      >
        That revised speaker script&hellip; is what I&rsquo;m reading from right now.
      </motion.p>
    </div>
  );
}
