"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import PixelAgent from "@/components/PixelAgent";

const EASE = [0.22, 1, 0.36, 1] as const;
const MAX_PHASE = 10;

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

export default function L4WorkSlide() {
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

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Phase 0: Title + Milestone card */}
      {phase === 0 && (
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <h2 className="font-serif text-[44px] leading-[1.15] text-ink mb-10 text-center text-balance">
            How the actual work happens
          </h2>
          <div className="bg-white rounded-xl shadow-card px-8 py-6 text-center">
            <div className="text-[11px] tracking-[1.5px] uppercase text-deck-faint mb-3 font-medium">
              Milestone 2
            </div>
            <p className="text-[18px] leading-snug text-ink font-medium">
              Outline the
              <br />
              narrative
            </p>
          </div>
        </motion.div>
      )}

      {/* Phase 1+: Spatial flow diagram */}
      {phase >= 1 && (
        <div className="relative" style={{ width: 820, height: 520 }}>
          {/*
            Layout anchors (center points):
            - Vlad headshot: (175, 155) — 90px circle
            - Goal Agent capsule: (410, 155) — ~170×70
            - M2 Agent circle: (410, 370) — 140×140
            - Context label: (480, 265)
            - Revisions doc: (630, 300)
            - Feedback doc: (270, 300)
            - Review doc: (310, 70)
          */}

          {/* SVG connection lines */}
          <svg
            className="absolute inset-0 pointer-events-none"
            width="820"
            height="520"
            fill="none"
          >
            {/* Vlad → Goal Agent dashed line */}
            <motion.line
              x1="220"
              y1="155"
              x2="325"
              y2="155"
              stroke="var(--color-ink-20)"
              strokeWidth="1"
              strokeDasharray="5 4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: EASE, delay: 0.3 }}
            />

            {/* Goal Agent → M2 Agent vertical dashed line */}
            {phase >= 2 && (
              <motion.line
                x1="410"
                y1="190"
                x2="410"
                y2="300"
                stroke="var(--color-ink-20)"
                strokeWidth="1"
                strokeDasharray="5 4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, ease: EASE }}
              />
            )}


          </svg>

          {/* Vlad headshot */}
          <motion.div
            className="absolute -translate-y-1/2"
            style={{ left: 130, top: 155 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: 1,
              x: 0,
              scale: phase === 10 ? [1, 1.12, 1] : 1,
            }}
            transition={{
              opacity: { duration: 0.5, ease: EASE },
              x: { duration: 0.5, ease: EASE },
              scale: phase === 10
                ? { duration: 0.4, delay: 0.85, ease: EASE }
                : { duration: 0.3 },
            }}
          >
            <img
              src="/vlad-headshot.png"
              alt="Vlad"
              className="w-[90px] h-[90px] rounded-full object-cover"
            />
          </motion.div>

          {/* Goal Agent capsule */}
          <motion.div
            className="absolute flex justify-center -translate-y-1/2"
            style={{ left: 325, top: 155, width: 170, zIndex: 1 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: (phase === 4 || phase === 8) ? [1, 1.12, 1] : 1,
            }}
            transition={{
              opacity: { duration: 0.45, ease: EASE, delay: 0.15 },
              scale: (phase === 4 || phase === 8)
                ? { duration: 0.4, delay: 0.85, ease: [0.22, 1, 0.36, 1] }
                : { duration: 0.45, ease: EASE, delay: 0.15 },
            }}
          >
            <div className="bg-canvas rounded-full px-9 py-4 flex flex-col items-center gap-2 relative">
              <PixelAgent color="#D97757" size={28} />
              {/* "Goal Agent" label — hidden during reviewing phases */}
              <motion.span
                className="text-[11px] tracking-[1.5px] uppercase text-white font-medium text-center"
                animate={{ opacity: (phase === 4 || phase === 8) ? 0 : 1 }}
                transition={{ duration: 0.25, ease: EASE, delay: (phase === 4 || phase === 8) ? 0.85 : 0.3 }}
              >
                Goal Agent
              </motion.span>
              {/* "Reviewing" overlay — fades in after swallow */}
              <motion.span
                className="absolute bottom-4 left-0 right-0 text-[11px] tracking-[1.5px] uppercase text-white font-medium text-center flex flex-col items-center gap-1"
                animate={{ opacity: (phase === 4 || phase === 8) ? 1 : 0 }}
                transition={{ duration: 0.25, ease: EASE, delay: (phase === 4 || phase === 8) ? 0.95 : 0 }}
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

          {/* "CONTEXT" label — right of the vertical line, disappears when doc is produced */}
          <AnimatePresence>
            {phase >= 2 && phase < 3 && (
              <motion.div
                className="absolute text-[11px] tracking-[1.5px] uppercase text-deck-faint font-medium"
                style={{ left: 425, top: 240 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.2 }}
              >
                Context
              </motion.div>
            )}
          </AnimatePresence>

          {/* Milestone 2 Agent circle — centered at (410, 370) */}
          <AnimatePresence>
            {phase >= 2 && (
              <motion.div
                className="absolute"
                style={{ left: 355, top: 300 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <motion.div
                  className="w-[110px] h-[110px] rounded-full bg-canvas flex flex-col items-center justify-center gap-1.5"
                  animate={{
                    scale: phase === 6 ? [1, 1.12, 1] : 1,
                  }}
                  transition={{
                    scale: phase === 6
                      ? { duration: 0.4, delay: 0.85, ease: EASE }
                      : { duration: 0.3 },
                  }}
                >
                  <PixelAgent color="#d478a8" size={24} />
                  <motion.span
                    className="text-[11px] tracking-[1.5px] uppercase text-white font-medium leading-tight text-center"
                    animate={{ opacity: phase === 6 ? 0 : 1 }}
                    transition={{ duration: 0.25, ease: EASE, delay: phase === 6 ? 0.85 : 0.3 }}
                  >
                    Milestone 2
                    <br />
                    Agent
                  </motion.span>
                  <motion.span
                    className="absolute bottom-7 left-0 right-0 text-[11px] tracking-[1.5px] uppercase text-white font-medium text-center flex flex-col items-center gap-1"
                    animate={{ opacity: phase === 6 ? 1 : 0 }}
                    transition={{ duration: 0.25, ease: EASE, delay: phase === 6 ? 0.95 : 0 }}
                  >
                    Revising
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
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Phase 3+: Draft document — sits at M2's right, then flies to Goal Agent in phase 4 */}
          <AnimatePresence>
            {phase >= 3 && phase < 4 && (
              <motion.div
                className="absolute"
                style={{ left: 530, top: 320 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <DocIcon label="Draft" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Phase 4: Doc flying along curve to Goal Agent, then disappearing under it */}
          {phase === 4 && (
            <motion.div
              className="absolute"
              style={{
                left: 0,
                top: 0,
                offsetPath: `path("M 550 340 C 580 240, 540 170, 490 145")`,
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
              <DocIcon label="Draft" />
            </motion.div>
          )}

          {/* Phase 5: Feedback doc appears next to Goal Agent */}
          <AnimatePresence>
            {phase >= 5 && phase < 6 && (
              <motion.div
                className="absolute"
                style={{ left: 520, top: 115 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <DocIcon label="Feedback" src="/feedback-doc.svg" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Phase 6: Feedback doc flies down to M2 */}
          {phase === 6 && (
            <motion.div
              className="absolute"
              style={{
                left: 0,
                top: 0,
                offsetPath: `path("M 540 135 C 530 220, 450 280, 410 300")`,
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
              <DocIcon label="Feedback" src="/feedback-doc.svg" />
            </motion.div>
          )}

          {/* Phase 7: Revision 2 doc appears next to M2 */}
          <AnimatePresence>
            {phase >= 7 && phase < 8 && (
              <motion.div
                className="absolute"
                style={{ left: 530, top: 320 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <DocIcon label="Revision 2" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Phase 8: Revision 2 flies to Goal Agent */}
          {phase === 8 && (
            <motion.div
              className="absolute"
              style={{
                left: 0,
                top: 0,
                offsetPath: `path("M 550 340 C 580 240, 540 170, 490 145")`,
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
              <DocIcon label="Revision 2" />
            </motion.div>
          )}

          {/* Phase 9: Doc-ready appears next to Goal Agent */}
          <AnimatePresence>
            {phase >= 9 && phase < 10 && (
              <motion.div
                className="absolute"
                style={{ left: 520, top: 115 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <DocIcon label="Ready" src="/doc-ready.svg" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Phase 10: Doc-ready flies to Vlad */}
          {phase === 10 && (
            <motion.div
              className="absolute"
              style={{
                left: 0,
                top: 0,
                offsetPath: `path("M 490 145 C 400 130, 280 120, 195 145")`,
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
      )}
    </div>
  );
}
