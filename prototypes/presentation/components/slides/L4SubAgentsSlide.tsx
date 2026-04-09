"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, BookOpen, Presentation, ShieldAlert, ArrowLeftRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const researchAgents = [
  {
    Icon: Search,
    name: "AI Adoption Research",
    desc: "Research AI adoption levels in the workforce",
  },
  {
    Icon: BookOpen,
    name: "Workflow Best Practices",
    desc: "Research interesting ways people use AI for better/faster/ambitious work",
  },
  {
    Icon: Presentation,
    name: "Presentation Techniques",
    desc: "Research best practices for AI show-and-tells",
  },
];

export default function L4SubAgentsSlide() {
  const [step, setStep] = useState(0);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const isForward =
        e.key === "ArrowRight" || e.key === " " || e.key === "Enter";
      const isBackward = e.key === "ArrowLeft";

      if (isForward && step < 2) {
        e.preventDefault();
        e.stopImmediatePropagation();
        setStep((s) => s + 1);
        return;
      }

      if (isBackward && step > 0) {
        e.preventDefault();
        e.stopImmediatePropagation();
        setStep((s) => s - 1);
        return;
      }

      // Let event pass through to SlideController
    },
    [step]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [handleKeyDown]);

  const showResearch = step >= 1;
  const showAdversarial = step >= 2;

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-12 bg-[#f5f5f5]">
      {/* Header */}
      <motion.div
        className="flex items-center gap-4 mb-7"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
      >
        <span className="px-3 py-1 rounded-full bg-cypress text-white text-[11px] tracking-[1.5px] uppercase font-medium">
          Level 4
        </span>
        <h2 className="font-serif text-3xl text-ink">Depth of Coordination</h2>
      </motion.div>

      {/* Content container */}
      <div className="max-w-[480px] w-full flex flex-col gap-7">
        {/* ===== Section 1: Research Phase ===== */}
        <AnimatePresence>
          {showResearch && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease }}
            >
              {/* Section label */}
              <span className="text-[11px] tracking-[1.5px] uppercase font-medium text-ink-40 mb-4 block">
                Research Phase
              </span>

              {/* M2 Agent at top */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-cypress/10 flex items-center justify-center shrink-0">
                  <span className="text-[11px] font-semibold text-cypress">M2</span>
                </div>
                <span className="text-[14px] font-medium text-ink">
                  Narrative Agent
                </span>
              </div>

              {/* Spine layout: research sub-agents */}
              <div className="ml-4 border-l-2 border-cypress/20 pl-5 space-y-3">
                {researchAgents.map((agent, i) => (
                  <motion.div
                    key={agent.name}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.15 + i * 0.12,
                      ease,
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-cypress/10 flex items-center justify-center shrink-0 mt-0.5">
                      <agent.Icon
                        className="w-4 h-4 text-cypress"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-medium text-ink leading-snug">
                        {agent.name}
                      </span>
                      <span className="text-[13px] text-ink-40 leading-snug">
                        {agent.desc}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Findings note */}
              <motion.p
                className="ml-4 pl-5 mt-3 text-[13px] text-ink-60 italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.6, ease }}
              >
                Findings feed back to M2 agent before writing begins
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== Section 2: Adversarial Review ===== */}
        <AnimatePresence>
          {showAdversarial && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease }}
            >
              {/* Section label */}
              <span className="text-[11px] tracking-[1.5px] uppercase font-medium text-ink-40 mb-4 block">
                Adversarial Review
              </span>

              {/* Two agents side by side with loop */}
              <div className="bg-white rounded-xl shadow-sm p-5">
                <div className="flex items-center justify-between gap-4">
                  {/* M2 Agent */}
                  <div className="flex flex-col items-center gap-2 flex-1">
                    <div className="w-8 h-8 rounded-full bg-cypress/10 flex items-center justify-center">
                      <span className="text-[11px] font-semibold text-cypress">M2</span>
                    </div>
                    <span className="text-[13px] font-medium text-ink text-center">
                      Narrative Agent
                    </span>
                  </div>

                  {/* Loop indicator */}
                  <motion.div
                    className="flex flex-col items-center gap-1 shrink-0"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3, ease }}
                  >
                    <ArrowLeftRight
                      className="w-5 h-5 text-ink-40"
                      strokeWidth={1.5}
                    />
                    <span className="text-[11px] tracking-[1.5px] uppercase font-medium text-ink-40">
                      Loop
                    </span>
                  </motion.div>

                  {/* Adversarial Agent */}
                  <motion.div
                    className="flex flex-col items-center gap-2 flex-1"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2, ease }}
                  >
                    <div className="w-8 h-8 rounded-full bg-subtle-2x flex items-center justify-center">
                      <ShieldAlert
                        className="w-4 h-4 text-ink-60"
                        strokeWidth={1.5}
                      />
                    </div>
                    <span className="text-[13px] font-medium text-ink text-center">
                      Adversarial Reviewer
                    </span>
                    <span className="text-[13px] text-ink-40 text-center leading-snug">
                      Pokes holes, finds flaws
                    </span>
                  </motion.div>
                </div>

                {/* Bottom note */}
                <motion.p
                  className="mt-4 pt-3 border-t border-ink-20 text-[13px] text-ink-60 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.5, ease }}
                >
                  Only sends to Director when bulletproof
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
