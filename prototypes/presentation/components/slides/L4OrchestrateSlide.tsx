"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import PixelAgent from "@/components/PixelAgent";

const EASE = [0.22, 1, 0.36, 1] as const;
const MAX_PHASE = 13;

function DocIcon({ label, src = "/doc.svg" }: { label: string; src?: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={label} className="w-[42px] h-[62px]" />
      <span className="text-[11px] tracking-[1.5px] uppercase text-deck-faint font-medium">
        {label}
      </span>
    </div>
  );
}

const DOC_LABELS = ["Brief", "Patterns", "Examples"];

export default function L4OrchestrateSlide() {
  const [phase, setPhase] = useState(0);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const isForward =
        e.key === "ArrowRight" || e.key === " " || e.key === "Enter";
      const isBackward = e.key === "ArrowLeft";

      if (isForward && phase < MAX_PHASE) {
        e.preventDefault();
        e.stopImmediatePropagation();
        setPhase((p) => p + 1);
        return;
      }
      if (isBackward && phase > 0) {
        e.preventDefault();
        e.stopImmediatePropagation();
        setPhase((p) => p - 1);
        return;
      }
    },
    [phase]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [handleKeyDown]);

  /*
    Layout anchors (center points on a 900×600 canvas):
    - Vlad headshot:         (160, 130) — 90px circle
    - Goal Agent capsule:    (420, 130) — ~170×70 pill
    - M2 Agent circle:       (420, 320) — 110px circle
    - Research Subagent:     (250, 490) — 90px circle (light)
    - Adversarial Subagent:  (600, 490) — 90px circle (light, red)
    - Doc stack area:        (420, 490)
  */

  return (
    <div className="h-screen w-screen flex items-center justify-center overflow-hidden">
      <div className="relative" style={{ width: 900, height: 600 }}>
        {/* ─── SVG connectors ─── */}
        <svg
          className="absolute inset-0 pointer-events-none"
          width="900"
          height="600"
          fill="none"
        >
          {/* Vlad → Goal Agent: horizontal dashed line */}
          <motion.line
            x1="205"
            y1="130"
            x2="335"
            y2="130"
            stroke="var(--color-ink-20)"
            strokeWidth="1"
            strokeDasharray="5 4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: EASE, delay: 0.3 }}
          />

          {/* Goal Agent → M2 Agent: vertical dashed line (phase 1+) */}
          {phase >= 1 && (
            <motion.line
              x1="420"
              y1="165"
              x2="420"
              y2="265"
              stroke="var(--color-ink-20)"
              strokeWidth="1"
              strokeDasharray="5 4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: EASE }}
            />
          )}

          {/* M2 Agent → Research Subagent: curved dashed line (phase 2+) */}
          {phase >= 2 && (
            <motion.path
              d="M 380 370 C 350 420, 300 460, 270 465"
              stroke="var(--color-ink-20)"
              strokeWidth="1"
              strokeDasharray="5 4"
              fill="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: EASE }}
            />
          )}

          {/* M2 Agent → Adversarial Subagent: curved dashed line (phase 6+) */}
          {phase >= 6 && (
            <motion.path
              d="M 460 370 C 500 420, 560 460, 580 470"
              stroke="var(--color-ink-20)"
              strokeWidth="1"
              strokeDasharray="5 4"
              fill="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: EASE }}
            />
          )}
        </svg>

        {/* ─── Vlad headshot ─── */}
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: 160, top: 130 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{
            opacity: 1,
            x: 0,
            scale: phase === 13 ? [1, 1.12, 1] : 1,
          }}
          transition={{
            opacity: { duration: 0.5, ease: EASE },
            x: { duration: 0.5, ease: EASE },
            scale: phase === 13
              ? { duration: 0.4, delay: 0.85, ease: EASE }
              : { duration: 0.3 },
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/vlad-headshot.png"
            alt="Vlad"
            className="w-[90px] h-[90px] rounded-full object-cover"
          />
        </motion.div>

        {/* ─── Goal Agent capsule ─── */}
        <motion.div
          className="absolute flex justify-center -translate-x-1/2 -translate-y-1/2"
          style={{ left: 420, top: 130, width: 170, zIndex: 1 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: phase === 11 ? [1, 1.12, 1] : 1,
          }}
          transition={{
            opacity: { duration: 0.45, ease: EASE, delay: 0.15 },
            scale: phase === 11
              ? { duration: 0.4, delay: 0.85, ease: EASE }
              : { duration: 0.45, ease: EASE, delay: 0.15 },
          }}
        >
          <div className="bg-canvas rounded-full px-9 py-4 flex flex-col items-center gap-2 relative">
            <PixelAgent color="#D97757" size={28} />
            {/* "Goal Agent" label — hidden during reviewing phase */}
            <motion.span
              className="text-[11px] tracking-[1.5px] uppercase text-white font-medium text-center"
              animate={{ opacity: phase === 11 ? 0 : 1 }}
              transition={{
                duration: 0.25,
                ease: EASE,
                delay: phase === 11 ? 0.85 : 0.3,
              }}
            >
              Goal Agent
            </motion.span>
            {/* "Reviewing" overlay — fades in after swallow */}
            <motion.span
              className="absolute bottom-4 left-0 right-0 text-[11px] tracking-[1.5px] uppercase text-white font-medium text-center flex flex-col items-center gap-1"
              animate={{ opacity: phase === 11 ? 1 : 0 }}
              transition={{
                duration: 0.25,
                ease: EASE,
                delay: phase === 11 ? 0.95 : 0,
              }}
            >
              Reviewing
              <span className="flex gap-[3px]">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-[4px] h-[4px] rounded-full bg-white/70"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </span>
            </motion.span>
          </div>
        </motion.div>

        {/* ─── "CONTEXT" label — right of vertical line ─── */}
        <AnimatePresence>
          {phase >= 1 && phase < 2 && (
            <motion.div
              className="absolute text-[11px] tracking-[1.5px] uppercase text-deck-faint font-medium"
              style={{ left: 435, top: 210 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE, delay: 0.2 }}
            >
              Context
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── Milestone 2 Agent circle — centered at (420, 320) ─── */}
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: 420, top: 320 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <motion.div
                className="w-[110px] h-[110px] rounded-full bg-canvas flex flex-col items-center justify-center gap-1.5 relative"
                animate={{
                  scale: (phase === 4 || phase === 9) ? [1, 1.12, 1] : 1,
                }}
                transition={{
                  scale: (phase === 4 || phase === 9)
                    ? { duration: 0.4, delay: phase === 4 ? 1.6 : 0.85, ease: EASE }
                    : { duration: 0.3 },
                }}
              >
                <PixelAgent color="#d478a8" size={24} />
                <motion.span
                  className="text-[11px] tracking-[1.5px] uppercase text-white font-medium leading-tight text-center"
                  animate={{ opacity: (phase === 4 || phase === 9) ? 0 : 1 }}
                  transition={{ duration: 0.25, ease: EASE, delay: (phase === 4 || phase === 9) ? (phase === 4 ? 1.6 : 0.85) : 0.3 }}
                >
                  Milestone 2
                  <br />
                  Agent
                </motion.span>
                <motion.span
                  className="absolute bottom-5 left-0 right-0 text-[11px] tracking-[1.5px] uppercase text-white font-medium text-center flex flex-col items-center gap-1"
                  animate={{ opacity: (phase === 4 || phase === 9) ? 1 : 0 }}
                  transition={{ duration: 0.25, ease: EASE, delay: (phase === 4 || phase === 9) ? (phase === 4 ? 1.7 : 0.95) : 0 }}
                >
                  Reviewing
                  <span className="flex gap-[3px]">
                    {[0, 1, 2].map((j) => (
                      <motion.span
                        key={j}
                        className="w-[4px] h-[4px] rounded-full bg-white/70"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          delay: j * 0.2,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </span>
                </motion.span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── Research Subagent — light circle, centered at (250, 490) ─── */}
        <AnimatePresence>
          {phase >= 2 && (
            <motion.div
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: 250, top: 490 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div className="w-[110px] h-[110px] rounded-full border border-ink-20 bg-white flex flex-col items-center justify-center gap-1.5">
                <PixelAgent color="#4385BE" size={22} />
                <span className="text-[9px] tracking-[1px] uppercase text-ink font-medium leading-tight text-center">
                  Research
                  <br />
                  Subagent
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── Phase 3: Stacked docs appear next to Research Subagent ─── */}
        <AnimatePresence>
          {phase >= 3 && phase < 4 && (
            <motion.div
              className="absolute"
              style={{ left: 310, top: 455 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <div className="relative w-[34px] h-[50px]">
                {DOC_LABELS.map((label, i) => (
                  <motion.img
                    key={label}
                    src="/doc.svg"
                    alt={label}
                    className="w-[34px] h-[50px] absolute"
                    style={{
                      top: -i * 4,
                      left: -i * 4,
                      zIndex: DOC_LABELS.length - i,
                    }}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.35,
                      ease: EASE,
                      delay: i * 0.4,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── Phase 4: Docs fly from stack to M2 Agent ─── */}
        {phase === 4 &&
          DOC_LABELS.map((label, i) => (
            <motion.div
              key={`fly-${label}`}
              className="absolute"
              style={{
                left: 0,
                top: 0,
                offsetPath: `path("M 325 465 C 340 410, 410 370, 420 330")`,
                offsetRotate: "0deg",
                zIndex: 0,
              }}
              initial={{ offsetDistance: "0%", opacity: 1, scale: 1 }}
              animate={{ offsetDistance: "100%", opacity: 0, scale: 0.3 }}
              transition={{
                offsetDistance: {
                  duration: 0.9,
                  ease: EASE,
                  delay: i * 0.2,
                },
                opacity: {
                  duration: 0.2,
                  delay: i * 0.2 + 0.7,
                  ease: EASE,
                },
                scale: {
                  duration: 0.3,
                  delay: i * 0.2 + 0.6,
                  ease: EASE,
                },
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/doc.svg" alt={label} className="w-[34px] h-[50px]" />
            </motion.div>
          ))}

        {/* ─── Phase 5-6: Draft doc appears next to M2 Agent (stays through phase 6) ─── */}
        <AnimatePresence>
          {phase >= 5 && phase < 7 && (
            <motion.div
              className="absolute"
              style={{ left: 510, top: 285 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <DocIcon label="Draft" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── Phase 6: Adversarial Subagent appears — light circle, centered at (600, 490) ─── */}
        <AnimatePresence>
          {phase >= 6 && (
            <motion.div
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: 600, top: 490 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: phase === 7 ? [1, 1.12, 1] : 1,
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                opacity: { duration: 0.5, ease: EASE },
                scale: phase === 7
                  ? { duration: 0.4, delay: 0.85, ease: EASE }
                  : { duration: 0.5, ease: EASE },
              }}
            >
              <div className="w-[110px] h-[110px] rounded-full border border-ink-20 bg-white flex flex-col items-center justify-center gap-1.5 relative">
                <PixelAgent color="#DC2626" size={22} />
                {/* Default label — hidden during "Finding Flaws" */}
                <motion.span
                  className="text-[9px] tracking-[1px] uppercase text-ink font-medium leading-tight text-center"
                  animate={{ opacity: phase === 7 ? 0 : 1 }}
                  transition={{ duration: 0.25, ease: EASE, delay: phase === 7 ? 0.85 : 0.3 }}
                >
                  Adversarial
                  <br />
                  Subagent
                </motion.span>
                {/* "Finding Flaws" overlay — fades in after swallow */}
                <motion.span
                  className="absolute bottom-5 left-0 right-0 text-[9px] tracking-[1px] uppercase text-ink font-medium text-center flex flex-col items-center gap-1"
                  animate={{ opacity: phase === 7 ? 1 : 0 }}
                  transition={{ duration: 0.25, ease: EASE, delay: phase === 7 ? 0.95 : 0 }}
                >
                  Finding Flaws
                  <span className="flex gap-[3px]">
                    {[0, 1, 2].map((j) => (
                      <motion.span
                        key={j}
                        className="w-[4px] h-[4px] rounded-full bg-ink/70"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          delay: j * 0.2,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </span>
                </motion.span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── Phase 7: Draft flies from M2 area to Adversarial Subagent ─── */}
        {phase === 7 && (
          <motion.div
            className="absolute"
            style={{
              left: 0,
              top: 0,
              offsetPath: `path("M 530 305 C 560 380, 590 440, 600 470")`,
              offsetRotate: "0deg",
              zIndex: 0,
            }}
            initial={{ offsetDistance: "0%", opacity: 1, scale: 1 }}
            animate={{ offsetDistance: "100%", opacity: 0, scale: 0.3 }}
            transition={{
              offsetDistance: { duration: 0.9, ease: EASE },
              opacity: { duration: 0.2, delay: 0.7, ease: EASE },
              scale: { duration: 0.3, delay: 0.6, ease: EASE },
            }}
          >
            <DocIcon label="Draft" />
          </motion.div>
        )}

        {/* ─── Phase 8: Adversarial doc appears next to Adversarial agent ─── */}
        <AnimatePresence>
          {phase >= 8 && phase < 9 && (
            <motion.div
              className="absolute"
              style={{ left: 500, top: 455 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <DocIcon label="Feedback" src="/adversarial-doc.svg" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── Phase 9: Adversarial doc flies up-left to M2 Agent ─── */}
        {phase === 9 && (
          <motion.div
            className="absolute"
            style={{
              left: 0,
              top: 0,
              offsetPath: `path("M 500 490 C 460 440, 430 380, 420 330")`,
              offsetRotate: "0deg",
              zIndex: 0,
            }}
            initial={{ offsetDistance: "0%", opacity: 1, scale: 1 }}
            animate={{ offsetDistance: "100%", opacity: 0, scale: 0.3 }}
            transition={{
              offsetDistance: { duration: 0.9, ease: EASE },
              opacity: { duration: 0.2, delay: 0.7, ease: EASE },
              scale: { duration: 0.3, delay: 0.6, ease: EASE },
            }}
          >
            <DocIcon label="Feedback" src="/adversarial-doc.svg" />
          </motion.div>
        )}

        {/* ─── Phase 10: Revised doc appears next to M2 Agent ─── */}
        <AnimatePresence>
          {phase >= 10 && phase < 11 && (
            <motion.div
              className="absolute"
              style={{ left: 510, top: 285 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <DocIcon label="Revised" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── Phase 11: Revised doc flies up to Goal Agent ─── */}
        {phase === 11 && (
          <motion.div
            className="absolute"
            style={{
              left: 0,
              top: 0,
              offsetPath: `path("M 530 305 C 540 240, 500 170, 450 135")`,
              offsetRotate: "0deg",
              zIndex: 0,
            }}
            initial={{ offsetDistance: "0%", opacity: 1, scale: 1 }}
            animate={{ offsetDistance: "100%", opacity: 0, scale: 0.3 }}
            transition={{
              offsetDistance: { duration: 1.0, ease: EASE },
              opacity: { duration: 0.2, delay: 0.8, ease: EASE },
              scale: { duration: 0.3, delay: 0.7, ease: EASE },
            }}
          >
            <DocIcon label="Revised" />
          </motion.div>
        )}

        {/* ─── Phase 12: Doc-ready appears next to Goal Agent ─── */}
        <AnimatePresence>
          {phase >= 12 && phase < 13 && (
            <motion.div
              className="absolute"
              style={{ left: 520, top: 95 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <DocIcon label="Ready" src="/doc-ready.svg" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── Phase 13: Doc-ready flies left to Vlad ─── */}
        {phase === 13 && (
          <motion.div
            className="absolute"
            style={{
              left: 0,
              top: 0,
              offsetPath: `path("M 490 120 C 380 100, 260 100, 180 120")`,
              offsetRotate: "0deg",
              zIndex: 0,
            }}
            initial={{ offsetDistance: "0%", opacity: 1, scale: 1 }}
            animate={{ offsetDistance: "100%", opacity: 0, scale: 0.3 }}
            transition={{
              offsetDistance: { duration: 1.0, ease: EASE },
              opacity: { duration: 0.2, delay: 0.8, ease: EASE },
              scale: { duration: 0.3, delay: 0.7, ease: EASE },
            }}
          >
            <DocIcon label="Ready" src="/doc-ready.svg" />
          </motion.div>
        )}
      </div>
    </div>
  );
}
