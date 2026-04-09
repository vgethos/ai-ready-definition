"use client";

import { motion } from "motion/react";
import PixelAgent from "@/components/PixelAgent";

const EASE = [0.22, 1, 0.36, 1] as const;

const MILESTONES = [
  { number: 1, title: "Decide on a topic" },
  { number: 2, title: "Outline the narrative" },
  { number: 3, title: "Polish presentation" },
];

const CARD_W = 180;
const GAP = 16;
const TOTAL_W = CARD_W * 3 + GAP * 2;
const CENTERS = [
  CARD_W / 2,
  CARD_W + GAP + CARD_W / 2,
  (CARD_W + GAP) * 2 + CARD_W / 2,
];

export default function L4MilestonesSlide() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center">
        {/* Goal Card (smaller) */}
        <motion.div
          className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] px-8 py-6 max-w-[380px]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <div className="text-[11px] tracking-[0.5px] uppercase text-ink-40 text-center mb-4 font-medium">
            Goal
          </div>
          <p className="font-serif text-[20px] leading-snug text-ink text-center">
            &ldquo;I need a presentation about how I work with AI for a
            show&amp;tell at the company all-hands&rdquo;
          </p>
        </motion.div>

        {/* Connector: goal → agent */}
        <motion.div
          className="w-px h-6 bg-ink-20"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.3, ease: EASE, delay: 0.2 }}
          style={{ transformOrigin: "top" }}
        />

        {/* Director agent capsule */}
        <motion.div
          className="bg-canvas rounded-full px-8 py-3 flex flex-col items-center gap-1.5"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.3 }}
        >
          <PixelAgent color="#c49a7c" size={24} />
          <span className="text-[9px] tracking-[0.5px] uppercase text-white font-medium">
            Agent Assigned
          </span>
        </motion.div>

        {/* Connector: agent → bracket */}
        <motion.div
          className="w-px h-6 bg-ink-20"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.3, ease: EASE, delay: 0.5 }}
          style={{ transformOrigin: "top" }}
        />

        {/* Tree bracket SVG */}
        <motion.svg
          width={TOTAL_W}
          height={28}
          className="block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: EASE, delay: 0.6 }}
        >
          {/* Vertical stem from center */}
          <line
            x1={TOTAL_W / 2}
            y1="0"
            x2={TOTAL_W / 2}
            y2="10"
            stroke="var(--color-ink-20)"
            strokeWidth="1"
          />
          {/* Horizontal bar */}
          <line
            x1={CENTERS[0]}
            y1="10"
            x2={CENTERS[2]}
            y2="10"
            stroke="var(--color-ink-20)"
            strokeWidth="1"
          />
          {/* Three drops to cards */}
          {CENTERS.map((cx, i) => (
            <line
              key={i}
              x1={cx}
              y1="10"
              x2={cx}
              y2="28"
              stroke="var(--color-ink-20)"
              strokeWidth="1"
            />
          ))}
        </motion.svg>

        {/* Milestone cards row */}
        <div className="flex items-start" style={{ gap: GAP }}>
          {MILESTONES.map((m, i) => (
            <motion.div
              key={m.number}
              className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] px-4 py-5 text-center"
              style={{ width: CARD_W }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                ease: EASE,
                delay: 0.7 + i * 0.1,
              }}
            >
              <div className="text-[10px] tracking-[0.5px] uppercase text-ink-40 mb-3 font-medium">
                Milestone {m.number}
              </div>
              <p className="font-serif text-[18px] leading-tight text-ink">
                {m.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
