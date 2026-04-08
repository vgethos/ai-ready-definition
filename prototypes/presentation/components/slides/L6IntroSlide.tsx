"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

// Score ring: 847/900 = ~94% of the circle
const RADIUS = 70;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const SCORE_PERCENT = 847 / 900;
const DASH_OFFSET = CIRCUMFERENCE * (1 - SCORE_PERCENT);

export default function L6IntroSlide() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-12 bg-canvas">
      {/* Header */}
      <motion.div
        className="flex items-center gap-4 mb-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="px-3 py-1 rounded-full bg-cypress text-subtle-2x text-sm font-medium">
          Level 6
        </span>
        <h2 className="font-serif text-3xl text-subtle-2x">
          Create something that doesn&rsquo;t exist yet
        </h2>
      </motion.div>

      {/* Phone frame */}
      <motion.div
        className="max-w-[375px] w-full rounded-[40px] bg-white shadow-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
      >
        {/* Status / header bar */}
        <div className="flex items-center justify-center py-4 border-b border-gray-100">
          <span className="text-xs font-semibold tracking-widest text-ink uppercase">
            ETHOS
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center px-8 pt-8 pb-10">
          {/* Greeting */}
          <motion.p
            className="font-serif text-2xl text-ink text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6, ease: EASE }}
          >
            Great news, Sarah
          </motion.p>
          <motion.p
            className="mt-2 text-sm text-ink-60 text-center max-w-[260px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8, ease: EASE }}
          >
            Your health profile qualifies you for one of our best rates.
          </motion.p>

          {/* Score ring */}
          <div className="relative mt-8 mb-6">
            <svg width="180" height="180" viewBox="0 0 180 180">
              {/* Background ring */}
              <circle
                cx="90"
                cy="90"
                r={RADIUS}
                fill="none"
                stroke="#dae7e6"
                strokeWidth="10"
              />
              {/* Animated score ring */}
              <motion.circle
                cx="90"
                cy="90"
                r={RADIUS}
                fill="none"
                stroke="#056257"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                initial={{ strokeDashoffset: CIRCUMFERENCE }}
                animate={{ strokeDashoffset: DASH_OFFSET }}
                transition={{ duration: 1.4, delay: 1.0, ease: EASE }}
                style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
              />
            </svg>
            {/* Score number */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.6, ease: EASE }}
            >
              <span className="font-serif text-5xl text-ink">847</span>
              <span className="text-xs font-medium text-cypress mt-1">Excellent</span>
            </motion.div>
          </div>

          {/* Percentile badge */}
          <motion.span
            className="px-4 py-1.5 rounded-full bg-subtle-2x text-xs font-medium text-cypress"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.8, ease: EASE }}
          >
            Top 14% of all applicants
          </motion.span>

          {/* CTA button */}
          <motion.button
            className="mt-8 w-full py-3.5 rounded-full bg-cypress text-white text-sm font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.0, ease: EASE }}
          >
            See my rate
          </motion.button>
        </div>
      </motion.div>

      {/* Caption below phone */}
      <motion.p
        className="mt-8 text-sm text-ink-40 italic text-center max-w-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.2, ease: EASE }}
      >
        This prototype shipped to engineering. They&rsquo;re building from it — from working code, not a mockup.
      </motion.p>
    </div>
  );
}
