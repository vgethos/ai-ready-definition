"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

// ── Types ────────────────────────────────────────────────────────────────────
interface ComputingResultsProps {
  onComplete: () => void; // Called when animation finishes, to advance to next screen
  persona: "top" | "good"; // May influence messaging slightly
}

// ── Status steps the user sees ───────────────────────────────────────────────
const STATUS_STEPS = [
  "Analyzing your health profile...",
  "Reviewing your medical history...",
  "Calculating your insurability score...",
];

const STEP_DURATION = 1000; // ms per step
const LINGER_AFTER_LAST = 500; // brief pause after last step before advancing

// ── Circular progress ring ───────────────────────────────────────────────────
function ProgressRing({ progress }: { progress: number }) {
  const size = 64;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="block"
    >
      {/* Background track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#e5e5e5"
        strokeWidth={strokeWidth}
      />
      {/* Animated progress arc */}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#056257" /* cypress-100 */
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        style={{ rotate: "-90deg", transformOrigin: "center" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </svg>
  );
}

// ── Small checkmark icon ─────────────────────────────────────────────────────
function Checkmark() {
  return (
    <motion.svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <circle cx={8} cy={8} r={8} fill="#056257" />
      <motion.path
        d="M4.5 8.2L7 10.5L11.5 5.5"
        stroke="white"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />
    </motion.svg>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function ComputingResults({
  onComplete,
  persona,
}: ComputingResultsProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);

  const totalSteps = STATUS_STEPS.length;

  // Drive the step sequence on mount
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    STATUS_STEPS.forEach((_, i) => {
      // Advance to each step
      timers.push(
        setTimeout(() => {
          setCurrentStep(i);
        }, i * STEP_DURATION)
      );

      // Mark previous step as completed when the next one starts
      if (i > 0) {
        timers.push(
          setTimeout(() => {
            setCompletedSteps((prev) => [...prev, i - 1]);
          }, i * STEP_DURATION)
        );
      }
    });

    // Mark last step completed
    timers.push(
      setTimeout(() => {
        setCompletedSteps((prev) => [...prev, totalSteps - 1]);
        setFinished(true);
      }, totalSteps * STEP_DURATION)
    );

    // Call onComplete after a brief linger
    timers.push(
      setTimeout(() => {
        onComplete();
      }, totalSteps * STEP_DURATION + LINGER_AFTER_LAST)
    );

    return () => timers.forEach(clearTimeout);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Progress as 0–1 based on completed steps
  const progress = finished ? 1 : currentStep / totalSteps;

  return (
    <div className="flex flex-col items-center justify-center h-full bg-white px-6">
      {/* Progress ring */}
      <div className="mb-8">
        <ProgressRing progress={progress} />
      </div>

      {/* Heading */}
      <h2
        className="text-lg font-semibold mb-6"
        style={{
          fontFamily: "var(--font-display)",
          color: "#272727", /* gray-100 */
        }}
      >
        {persona === "top"
          ? "Evaluating your results"
          : "Processing your information"}
      </h2>

      {/* Step list with crossfade */}
      <div className="w-full max-w-[260px] space-y-3">
        {STATUS_STEPS.map((step, i) => {
          const isActive = currentStep === i && !completedSteps.includes(i);
          const isCompleted = completedSteps.includes(i);
          const isVisible = i <= currentStep;

          return (
            <motion.div
              key={step}
              className="flex items-center gap-2.5 font-sans text-sm"
              initial={{ opacity: 0, y: 6 }}
              animate={
                isVisible
                  ? { opacity: isCompleted ? 0.5 : 1, y: 0 }
                  : { opacity: 0, y: 6 }
              }
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {/* Step indicator: checkmark if done, pulsing dot if active */}
              <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                {isCompleted ? (
                  <Checkmark />
                ) : isActive ? (
                  <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#056257" }}
                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ) : null}
              </div>

              {/* Step text */}
              <span
                style={{
                  color: isCompleted ? "#525252" : "#272727",
                }}
              >
                {step}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
