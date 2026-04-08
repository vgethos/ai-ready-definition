"use client";

import { motion } from "motion/react";
import { SpellCheck, Mail, Code, FileSearch } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const LEVELS = [
  {
    num: 1,
    goal: "Spell this word right",
    description: "Autocorrect, grammar check",
    icon: SpellCheck,
  },
  {
    num: 2,
    goal: "Write this email for me",
    description: "ChatGPT, one-shot prompting",
    icon: Mail,
  },
  {
    num: 3,
    goal: "Help me while I code",
    description: "Copilot, transcription, in-app AI",
    icon: Code,
  },
  {
    num: 4,
    goal: "Analyze this 50-page document",
    description: "Context-loaded, iterative analysis",
    icon: FileSearch,
  },
];

export default function LevelsQuickSlide() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-12 bg-canvas">
      <motion.p
        className="text-ink-40 text-sm tracking-wide uppercase mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        Levels 1–4: You already know these
      </motion.p>

      <div className="grid grid-cols-2 gap-6 w-full max-w-4xl">
        {LEVELS.map((level, i) => {
          const Icon = level.icon;
          return (
            <motion.div
              key={level.num}
              className="relative flex flex-col items-center text-center px-8 py-10 rounded-xl border border-ink-20/10 bg-canvas-light/40"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15, ease: EASE }}
            >
              {/* Level badge */}
              <span className="absolute top-4 left-4 text-xs font-medium text-ink-40 bg-canvas-light px-2 py-0.5 rounded-full">
                L{level.num}
              </span>

              <Icon className="w-10 h-10 text-cypress-light mb-5" strokeWidth={1.5} />

              <p className="text-lg text-subtle-2x">{level.goal}</p>
              <p className="mt-2 text-sm text-ink-40">{level.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
