"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function L4MetaRevealSlide() {
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

  const showMain = step >= 1;
  const showFollowUp = step >= 2;

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#f5f5f5] relative overflow-hidden">
      <div className="flex flex-col items-center max-w-[480px]">
        {/* Beat 1 */}
        <motion.p
          className="text-[14px] text-ink-60 text-center mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.1 }}
        >
          The narrative you&rsquo;re hearing...
        </motion.p>

        {/* Beat 2 */}
        <motion.p
          className="text-[14px] text-ink-60 text-center mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.5 }}
        >
          The slides you&rsquo;re watching...
        </motion.p>

        {/* Beat 3 */}
        <motion.p
          className="text-[14px] text-ink-60 text-center mb-7"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.9 }}
        >
          The structure, the timing...
        </motion.p>

        {/* Beat 4 — the punch line */}
        <AnimatePresence>
          {showMain && (
            <motion.h2
              className="font-serif text-3xl text-ink text-center mb-7"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.6, ease, delay: 0.15 }}
            >
              This is the output. Right now.
            </motion.h2>
          )}
        </AnimatePresence>

        {/* Beat 5 — the follow-up */}
        <AnimatePresence>
          {showFollowUp && (
            <motion.p
              className="text-[13px] text-ink-40 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease, delay: 0.3 }}
            >
              Same pattern. Different goals.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
