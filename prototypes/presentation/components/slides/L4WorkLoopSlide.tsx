"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useCallback } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    id: "m2",
    label: "Milestone 2 Agent",
    description: "Creates first draft from context",
    initials: "M2",
    color: "bg-cypress",
    textColor: "text-white",
  },
  {
    id: "director",
    label: "Director Agent",
    description: "Reviews, gives structured feedback",
    initials: "D",
    color: "bg-cypress",
    textColor: "text-white",
  },
  {
    id: "human",
    label: "Human Review",
    description: "Final direction and approval",
    initials: "V",
    color: "bg-ink",
    textColor: "text-white",
  },
];

export default function L4WorkLoopSlide() {
  const [phase, setPhase] = useState(0);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const isForward =
        e.key === "ArrowRight" || e.key === " " || e.key === "Enter";
      const isBackward = e.key === "ArrowLeft";

      if (isForward && phase < 3) {
        e.preventDefault();
        e.stopImmediatePropagation();
        setPhase((p) => Math.min(p + 1, 3));
        return;
      }

      if (isBackward && phase > 0) {
        e.preventDefault();
        e.stopImmediatePropagation();
        setPhase((p) => Math.max(p - 1, 0));
        return;
      }
    },
    [phase]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [handleKeyDown]);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#f5f5f5] relative overflow-hidden">
      <div className="flex flex-col items-center max-w-[480px]">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-7"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <span className="text-[11px] tracking-[1.5px] uppercase font-medium px-3 py-1 rounded-full bg-cypress text-white">
            Level 4
          </span>
          <h2 className="font-serif text-3xl text-ink">
            How the Work Gets Done
          </h2>
        </motion.div>

        {/* Spine layout */}
        <div className="relative pl-6 w-full">
          {/* Vertical spine line */}
          <motion.div
            className="absolute left-[21px] top-2 bottom-2 w-px bg-ink/10"
            initial={{ scaleY: 0, originY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
          />

          {/* Step 1: M2 Agent creates draft */}
          <AnimatePresence>
            {phase >= 1 && (
              <motion.div
                className="relative flex items-start gap-4 mb-7"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease }}
              >
                {/* Avatar dot on spine */}
                <div
                  className={`w-8 h-8 rounded-full ${steps[0].color} ${steps[0].textColor} flex items-center justify-center shrink-0 text-[11px] font-semibold relative z-10`}
                >
                  {steps[0].initials}
                </div>
                <div className="pt-0.5">
                  <p className="text-[14px] font-medium text-ink">
                    {steps[0].label}
                  </p>
                  <p className="text-[13px] text-ink-40 mt-0.5">
                    {steps[0].description}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 2: Director reviews + feedback loop */}
          <AnimatePresence>
            {phase >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease }}
              >
                <div className="relative flex items-start gap-4 mb-3">
                  {/* Avatar dot on spine */}
                  <div
                    className={`w-8 h-8 rounded-full ${steps[1].color} ${steps[1].textColor} flex items-center justify-center shrink-0 text-[11px] font-semibold relative z-10`}
                  >
                    {steps[1].initials}
                  </div>
                  <div className="pt-0.5">
                    <p className="text-[14px] font-medium text-ink">
                      {steps[1].label}
                    </p>
                    <p className="text-[13px] text-ink-40 mt-0.5">
                      {steps[1].description}
                    </p>
                  </div>
                </div>

                {/* Feedback loop indicator */}
                <motion.div
                  className="ml-12 mb-7 flex items-center gap-2 px-3 py-2 rounded-lg bg-cypress/5 border border-cypress/10 w-fit"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3, ease }}
                >
                  <span className="text-cypress text-[14px]">{"\u21BB"}</span>
                  <span className="text-[11px] text-cypress font-medium tracking-wide">
                    Iterate until approved
                  </span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 3: Human review */}
          <AnimatePresence>
            {phase >= 3 && (
              <motion.div
                className="relative flex items-start gap-4"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease }}
              >
                {/* Avatar dot on spine */}
                <div
                  className={`w-8 h-8 rounded-full ${steps[2].color} ${steps[2].textColor} flex items-center justify-center shrink-0 text-[11px] font-semibold relative z-10`}
                >
                  {steps[2].initials}
                </div>
                <div className="pt-0.5">
                  <p className="text-[14px] font-medium text-ink">
                    {steps[2].label}
                  </p>
                  <p className="text-[13px] text-ink-40 mt-0.5">
                    {steps[2].description}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom caption */}
        <AnimatePresence>
          {phase >= 3 && (
            <motion.p
              className="mt-7 text-[13px] text-ink-40 text-center"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
            >
              Create &rarr; Review &rarr; Feedback &rarr; Iterate &rarr;
              Approve &rarr; Human
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
