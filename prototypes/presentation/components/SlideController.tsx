"use client";

import { useState, useEffect, useCallback, Children, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";

const EASE_CURVE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const TRANSITION_DURATION = 0.3;
const X_OFFSET = 30;

const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction * X_OFFSET,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction * -X_OFFSET,
  }),
};

interface SlideControllerProps {
  children: ReactNode;
}

export default function SlideController({ children }: SlideControllerProps) {
  const slides = Children.toArray(children);
  const total = slides.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => Math.min(prev + 1, total - 1));
  }, [total]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case "ArrowRight":
        case " ":
        case "Enter":
          e.preventDefault();
          goNext();
          break;
        case "ArrowLeft":
          e.preventDefault();
          goPrev();
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  const progressPercent = total > 1 ? ((currentIndex + 1) / total) * 100 : 100;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-canvas">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: TRANSITION_DURATION,
            ease: EASE_CURVE,
          }}
          className="w-full h-full"
        >
          {slides[currentIndex]}
        </motion.div>
      </AnimatePresence>

      {/* Progress bar */}
      <div className="fixed bottom-0 left-0 w-full h-[2px] bg-canvas-light">
        <motion.div
          className="h-full bg-cypress"
          initial={false}
          animate={{ width: `${progressPercent}%` }}
          transition={{
            duration: TRANSITION_DURATION,
            ease: EASE_CURVE,
          }}
        />
      </div>

      {/* Slide counter */}
      <div className="fixed bottom-3 right-4 text-xs text-ink-40 select-none">
        {currentIndex + 1} / {total}
      </div>
    </div>
  );
}
