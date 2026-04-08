"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

const SCREENS = [
  {
    label: "Loading",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-subtle-2x border-t-cypress animate-spin" />
        <p className="text-[10px] text-ink-60 text-center px-2">
          Analyzing your profile...
        </p>
      </div>
    ),
  },
  {
    label: "Score Reveal",
    content: (
      <div className="flex flex-col items-center justify-center h-full">
        <svg width="80" height="80" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="30" fill="none" stroke="#f3f7f7" strokeWidth="5" />
          <circle
            cx="40"
            cy="40"
            r="30"
            fill="none"
            stroke="#056257"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 30}
            strokeDashoffset={2 * Math.PI * 30 * (1 - 847 / 900)}
            style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
          />
        </svg>
        <span className="font-serif text-xl text-ink -mt-[52px]">847</span>
        <span className="text-[8px] text-cypress font-semibold mt-7">Excellent</span>
      </div>
    ),
  },
  {
    label: "Carrier Match",
    content: (
      <div className="flex flex-col items-center pt-6 h-full px-3">
        <p className="text-[9px] text-ink-60 text-center mb-3">
          Based on your score...
        </p>
        <div className="w-full flex flex-col gap-1.5">
          {["Bestow Life", "Ethos Direct", "Haven Term"].map((name) => (
            <div
              key={name}
              className="w-full py-2 px-2.5 rounded-lg bg-subtle-2x text-[9px] text-ink font-medium"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    label: "Approval",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-2">
        <div className="w-10 h-10 rounded-full bg-cypress flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 10.5L8.5 14L15 7"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="text-xs font-medium text-ink">You&rsquo;re approved</p>
        <p className="text-[9px] text-ink-60">Bestow Life · $42/mo</p>
      </div>
    ),
  },
];

export default function L6FlowSlide() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-12 bg-[#f5f5f5]">
      {/* Header */}
      <motion.div
        className="flex items-center gap-4 mb-12"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="px-3 py-1 rounded-full bg-cypress text-white text-sm font-medium">
          Level 6
        </span>
        <h2 className="font-serif text-2xl text-ink">
          Four screens. From hypothesis to shipped prototype.
        </h2>
      </motion.div>

      {/* Phone frames */}
      <div className="flex items-start gap-6">
        {SCREENS.map((screen, i) => (
          <motion.div
            key={screen.label}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.3 + i * 0.15,
              ease: EASE,
            }}
          >
            {/* Phone frame */}
            <div className="w-[180px] h-[320px] bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Mini status bar */}
              <div className="flex items-center justify-center py-2 border-b border-gray-100">
                <span className="text-[7px] font-semibold tracking-widest text-ink-40 uppercase">
                  ETHOS
                </span>
              </div>
              {/* Screen content */}
              <div className="h-[calc(100%-28px)]">{screen.content}</div>
            </div>
            {/* Label */}
            <span className="mt-3 text-sm text-ink-40">{screen.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Caption */}
      <motion.p
        className="mt-10 text-sm text-ink-60 text-center max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2, ease: EASE }}
      >
        Two personas. Animated transitions. Live design controls. Shipped to engineering.
      </motion.p>
    </div>
  );
}
