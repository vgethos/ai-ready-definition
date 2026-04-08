"use client";

import { motion } from "motion/react";
import { SpellCheck, Mail, Code, FileSearch } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const LEVELS = [
  {
    num: 1,
    goal: "Spell this word right",
    description: "Autocorrect, Grammarly — AI works invisibly in the background",
    icon: SpellCheck,
  },
  {
    num: 2,
    goal: "Write this email for me",
    description: "ChatGPT — simple prompt in, finished output out",
    icon: Mail,
  },
  {
    num: 3,
    goal: "Help me while I work",
    description: "Notion AI, Otter, Figma AI — smart features inside your everyday tools",
    icon: Code,
  },
  {
    num: 4,
    goal: "Analyze this 50-page document",
    description: "Strategic prompting — you load context, refine iteratively, steer the output",
    icon: FileSearch,
  },
];

export default function LevelsQuickSlide() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-12">
      <motion.p
        className="text-[11px] text-white/40 tracking-[1.5px] uppercase font-medium mb-10"
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
              className="relative flex flex-col items-center text-center bg-white/[0.07] rounded-xl border border-white/10 p-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15, ease: EASE }}
            >
              {/* Level badge */}
              <span className="absolute top-4 left-4 text-[11px] font-medium text-white/40 bg-white/20 px-3.5 py-1.5 rounded-full">
                L{level.num}
              </span>

              <Icon className="w-10 h-10 text-cypress mb-5" strokeWidth={1.5} />

              <p className="text-lg text-white font-medium">{level.goal}</p>
              <p className="mt-2 text-sm text-white/60">{level.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
