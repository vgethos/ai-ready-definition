"use client";

import { motion } from "motion/react";
import {
  Search,
  Users,
  BookOpen,
  Layout,
  ShieldAlert,
  Mic,
  Circle,
} from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const topAgents = [
  {
    name: "Research Agent",
    description: "Studied what makes great demos land",
    icon: Search,
  },
  {
    name: "Audience Analyst",
    description: "Who\u2019s in the room, what have they seen",
    icon: Users,
  },
  {
    name: "Narrative Agent",
    description: "Turned research into a story",
    icon: BookOpen,
  },
];

const bottomAgents = [
  {
    name: "Presentation Agent",
    description: "Built the visual deck",
    icon: Layout,
  },
  {
    name: "Adversarial Reviewer",
    description: "Poked holes, found flaws",
    icon: ShieldAlert,
  },
  {
    name: "Delivery Coach",
    description: "Dry runs, timing, pacing",
    icon: Mic,
  },
];

function ConnectionLine({ delay }: { delay: number }) {
  return (
    <motion.div
      className="flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay, ease: EASE }}
    >
      <svg width="2" height="32" viewBox="0 0 2 32" fill="none">
        <motion.line
          x1="1"
          y1="0"
          x2="1"
          y2="32"
          stroke="#056257"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.1, ease: EASE }}
        />
      </svg>
    </motion.div>
  );
}

function AgentCard({
  agent,
  delay,
}: {
  agent: { name: string; description: string; icon: typeof Search };
  delay: number;
}) {
  const Icon = agent.icon;
  return (
    <motion.div
      className="w-[200px] bg-white rounded-xl shadow-sm p-4 flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      <Icon className="size-6 text-cypress mb-2" />
      <span className="text-ink font-medium text-sm">{agent.name}</span>
      <span className="text-ink-40 text-xs mt-1">{agent.description}</span>
    </motion.div>
  );
}

export default function L4TeamSlide() {
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
          Level 4
        </span>
        <h2 className="font-serif text-3xl text-ink">
          Single-Purpose Agents, Orchestrated
        </h2>
      </motion.div>

      {/* Top row of agents */}
      <div className="flex items-start gap-6 mb-0">
        {topAgents.map((agent, i) => (
          <AgentCard
            key={agent.name}
            agent={agent}
            delay={0.8 + i * 0.15}
          />
        ))}
      </div>

      {/* Connection lines: top row → orchestrator */}
      <div className="flex items-center gap-[206px] my-0">
        {[0, 1, 2].map((i) => (
          <ConnectionLine key={`top-${i}`} delay={1.3 + i * 0.08} />
        ))}
      </div>

      {/* Orchestrator (center hub) */}
      <motion.div
        className="bg-white rounded-xl shadow-lg border-2 border-cypress p-6 flex items-center gap-4 my-0"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
      >
        <Circle className="size-7 text-cypress" strokeWidth={2.5} />
        <span className="text-ink font-semibold text-lg tracking-tight">
          Orchestrator
        </span>
      </motion.div>

      {/* Connection lines: orchestrator → bottom row */}
      <div className="flex items-center gap-[206px] my-0">
        {[0, 1, 2].map((i) => (
          <ConnectionLine key={`bottom-${i}`} delay={1.5 + i * 0.08} />
        ))}
      </div>

      {/* Bottom row of agents */}
      <div className="flex items-start gap-6 mt-0">
        {bottomAgents.map((agent, i) => (
          <AgentCard
            key={agent.name}
            agent={agent}
            delay={0.8 + (i + 3) * 0.15}
          />
        ))}
      </div>

      {/* Explanation text */}
      <motion.p
        className="mt-8 text-sm text-ink-40 italic text-center max-w-2xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.8, ease: EASE }}
      >
        Why single-purpose? After too much back-and-forth, a single agent
        drifts. Each specialist stays sharp.
      </motion.p>

      {/* Bottom reveal line */}
      <motion.p
        className="mt-4 text-cypress font-semibold text-center max-w-2xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 2.3, ease: EASE }}
      >
        These agents are loaded with the same Level 3 automated workflows.
      </motion.p>
    </div>
  );
}
