"use client";

import { motion } from "motion/react";
import { useState, useEffect, useCallback } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const MILESTONES = [
  {
    number: 1,
    title: "Narrative Design",
    description:
      "Find the right story, decide what to talk about and how",
  },
  {
    number: 2,
    title: "Presentation Build",
    description:
      "Turn the narrative into a structured presentation \u2014 script, storyboard, visuals",
  },
  {
    number: 3,
    title: "Delivery Prep",
    description: "Polish, practice, timing, confidence",
  },
];

export default function L4MilestonesSlide() {
  const [visibleCount, setVisibleCount] = useState(0);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const isForward =
        e.key === "ArrowRight" || e.key === " " || e.key === "Enter";
      const isBackward = e.key === "ArrowLeft";

      if (isForward && visibleCount < MILESTONES.length) {
        e.preventDefault();
        e.stopImmediatePropagation();
        setVisibleCount((c) => c + 1);
        return;
      }

      if (isBackward && visibleCount > 0) {
        e.preventDefault();
        e.stopImmediatePropagation();
        setVisibleCount((c) => c - 1);
        return;
      }

      // Otherwise let events pass through to SlideController
    },
    [visibleCount]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [handleKeyDown]);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#f5f5f5] relative overflow-hidden">
      <div className="flex flex-col items-center max-w-[480px] w-full">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-7"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0 }}
        >
          <span className="text-[11px] tracking-[1.5px] uppercase font-medium px-3 py-1 rounded-full bg-cypress text-white">
            Level 4
          </span>
          <h2 className="font-serif text-3xl text-ink">
            Multi-Agent Orchestration
          </h2>
        </motion.div>

        {/* Milestones list */}
        <div className="w-full">
          {MILESTONES.map((milestone, i) => (
            <motion.div
              key={milestone.number}
              className={`flex items-start gap-4 py-4 ${
                i < MILESTONES.length - 1 ? "border-b border-ink-20" : ""
              }`}
              initial={{ opacity: 0, x: -10 }}
              animate={
                i < visibleCount
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: -10 }
              }
              transition={{
                duration: 0.4,
                delay: i < visibleCount ? i * 0.1 : 0,
                ease,
              }}
            >
              {/* Numbered badge */}
              <div className="w-7 h-7 rounded-full bg-cypress text-white flex items-center justify-center text-[13px] font-medium shrink-0 mt-0.5">
                {milestone.number}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-1 min-w-0">
                <span className="text-[14px] font-medium text-ink">
                  {milestone.title}
                </span>
                <span className="text-[13px] text-ink-40 leading-relaxed">
                  {milestone.description}
                </span>
                <span className="text-[11px] text-cypress font-medium mt-1">
                  Agent assigned
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
