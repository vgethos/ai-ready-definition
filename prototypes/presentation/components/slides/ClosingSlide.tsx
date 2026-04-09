"use client";

import { motion } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface LevelData {
  num: number;
  label: string;
  carried: string[];
  newComponents: string[];
}

const LEVELS: LevelData[] = [
  {
    num: 1,
    label: "Basic Prompting",
    carried: [],
    newComponents: ["Prompting", "Context setting"],
  },
  {
    num: 2,
    label: "Advanced Prompting",
    carried: ["Prompting", "Context setting"],
    newComponents: ["Iterative refinement", "Document analysis"],
  },
  {
    num: 3,
    label: "Automated Workflows",
    carried: [
      "Prompting",
      "Context setting",
      "Iterative refinement",
      "Document analysis",
    ],
    newComponents: ["Tool building", "Automation design", "Compound returns"],
  },
  {
    num: 4,
    label: "Multi-Agent Orchestration",
    carried: ["L1\u2013L3 foundation"],
    newComponents: [
      "Agent specialization",
      "Review loops",
      "Goal decomposition",
      "Orchestration",
    ],
  },
  {
    num: 5,
    label: "Autonomous Solutioning",
    carried: ["L1\u2013L4 foundation"],
    newComponents: ["End-to-end reasoning", "Autonomous execution"],
  },
];

function CarriedPill({
  label,
  delay,
}: {
  label: string;
  delay: number;
}) {
  return (
    <motion.span
      className="inline-flex items-center bg-subtle-2x text-ink-40 rounded-full px-3 py-1 text-xs whitespace-nowrap"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, delay, ease: EASE }}
    >
      {label}
    </motion.span>
  );
}

function NewPill({
  label,
  delay,
}: {
  label: string;
  delay: number;
}) {
  return (
    <motion.span
      className="inline-flex items-center bg-cypress/10 text-cypress border border-cypress/20 rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap"
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay, ease: EASE }}
    >
      {label}
    </motion.span>
  );
}

function LevelBand({
  level,
  bandDelay,
}: {
  level: LevelData;
  bandDelay: number;
}) {
  const carriedBaseDelay = bandDelay + 0.1;
  const newBaseDelay =
    carriedBaseDelay + level.carried.length * 0.04 + 0.15;

  return (
    <motion.div
      className="flex items-start gap-4 py-2.5 px-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: bandDelay, ease: EASE }}
    >
      {/* Level label */}
      <div className="flex-shrink-0 w-56 flex items-center gap-2.5 pt-0.5">
        <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-cypress/10 text-cypress text-[11px] font-semibold">
          {level.num}
        </span>
        <span className="text-sm font-medium text-ink-60 leading-tight">
          {level.label}
        </span>
      </div>

      {/* Component pills */}
      <div className="flex flex-wrap items-center gap-1.5">
        {level.carried.map((comp, i) => (
          <CarriedPill
            key={`carried-${comp}`}
            label={comp}
            delay={carriedBaseDelay + i * 0.04}
          />
        ))}

        {level.carried.length > 0 && level.newComponents.length > 0 && (
          <motion.span
            className="text-ink-20 text-xs mx-0.5 select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.3,
              delay: newBaseDelay - 0.08,
              ease: EASE,
            }}
          >
            +
          </motion.span>
        )}

        {level.newComponents.map((comp, i) => (
          <NewPill
            key={`new-${comp}`}
            label={comp}
            delay={newBaseDelay + i * 0.08}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function ClosingSlide() {
  const lastBandDelay = (LEVELS.length - 1) * 0.35;
  const closingDelay = lastBandDelay + 0.8;

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-12 bg-[#f5f5f5]">
      {/* Compounding components visualization */}
      <motion.div
        className="flex flex-col w-full max-w-4xl mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        {/* Header */}
        <motion.p
          className="text-xs font-medium text-ink-40 uppercase tracking-widest mb-4 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1, ease: EASE }}
        >
          Skills compound
        </motion.p>

        {/* Level bands — bottom to top visually, but rendered top to bottom
            with the lowest level at bottom. We reverse for the stacking effect. */}
        <div className="flex flex-col-reverse">
          {LEVELS.map((level, i) => (
            <LevelBand
              key={level.num}
              level={level}
              bandDelay={i * 0.35}
            />
          ))}
        </div>
      </motion.div>

      {/* Closing message */}
      <motion.div
        className="text-center max-w-2xl"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: closingDelay, ease: EASE }}
      >
        <p className="text-lg text-ink-60 mb-3">
          Each level teaches you where AI breaks and what you need to change.
        </p>
        <p className="font-serif text-xl text-ink font-semibold">
          Figure out your level. Go to the next one. It compounds.
        </p>
      </motion.div>
    </div>
  );
}
