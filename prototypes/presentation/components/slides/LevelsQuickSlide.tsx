"use client";

import { motion } from "motion/react";
import { SpellCheck, FileSearch } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const LEVELS = [
  {
    num: 1,
    label: "Basic Prompting",
    goal: "Write this email for me",
    description:
      "One-off requests. Useful answers. You already know this.",
    icon: SpellCheck,
  },
  {
    num: 2,
    label: "Advanced Prompting",
    goal: "Help me analyze this document",
    description:
      "Copilot, document analysis, iterative back-and-forth. AI is a powerful assistant.",
    icon: FileSearch,
  },
];

export default function LevelsQuickSlide() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-12 bg-[#f5f5f5]">
      <motion.p
        className="text-[11px] text-ink-40 tracking-[0.5px] uppercase font-medium mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        Levels 1 &amp; 2: You already know these
      </motion.p>

      <div className="grid grid-cols-2 gap-6 w-full max-w-3xl">
        {LEVELS.map((level, i) => {
          const Icon = level.icon;
          return (
            <motion.div
              key={level.num}
              className="relative flex flex-col items-center text-center bg-white rounded-xl shadow-sm p-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15, ease: EASE }}
            >
              {/* Level badge */}
              <span className="absolute top-4 left-4 text-[11px] font-medium text-ink-40 bg-subtle-2x px-3.5 py-1.5 rounded-full">
                L{level.num}
              </span>

              <Icon className="w-10 h-10 text-cypress mb-5" strokeWidth={1.5} />

              <p className="text-lg text-ink font-medium">{level.label}</p>
              <p className="mt-1 text-sm text-ink-60 italic">
                &ldquo;{level.goal}&rdquo;
              </p>
              <p className="mt-3 text-sm text-ink-60 leading-relaxed">
                {level.description}
              </p>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
}
