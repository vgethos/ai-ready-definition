"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

// ── Types ────────────────────────────────────────────────────────────────────
interface ComputingResultsProps {
  onComplete: () => void;
  persona: "top" | "good";
}

// ── Progress steps — matches the real Ethos processing flow ─────────────────
const STEPS = [
  "Confirming identity",
  "Getting you the best rate",
  "Personalizing coverage",
  "Putting it all together",
];

const STEP_DURATION = 2000; // ms per step
const PROGRESS_PER_STEP = 100 / STEPS.length;

// ── Trustpilot stars ────────────────────────────────────────────────────────
function TrustpilotStars() {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          style={{
            width: 28,
            height: 28,
            backgroundColor: "#00b67a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z" />
          </svg>
        </div>
      ))}
    </div>
  );
}

// ── Illustration placeholder (silhouette style matching Ethos) ──────────────
function AnalyzingIllustration() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 280,
        height: 200,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Easel/canvas scene — simplified SVG illustration */}
      <svg width="280" height="200" viewBox="0 0 280 200" fill="none">
        {/* Window */}
        <rect x="30" y="20" width="50" height="50" rx="4" stroke="#8bb8b2" strokeWidth="1.5" fill="none" />
        <line x1="55" y1="20" x2="55" y2="70" stroke="#8bb8b2" strokeWidth="1" />
        <line x1="30" y1="45" x2="80" y2="45" stroke="#8bb8b2" strokeWidth="1" />
        {/* Moon */}
        <circle cx="42" cy="33" r="6" fill="#8bb8b2" opacity="0.5" />
        {/* Plant */}
        <path d="M35 90 Q30 78 40 72 Q35 78 42 85" stroke="#056257" strokeWidth="1.5" fill="none" />
        <path d="M38 88 Q42 76 50 74 Q44 78 40 85" stroke="#056257" strokeWidth="1.5" fill="none" />
        <rect x="32" y="88" width="10" height="14" rx="2" fill="#8bb8b2" opacity="0.4" />

        {/* Person sitting on desk */}
        <circle cx="95" cy="85" r="12" fill="#272727" /> {/* head */}
        <path d="M80 100 Q85 115 95 120 Q100 115 105 100" fill="#272727" /> {/* torso */}
        <path d="M80 120 L75 150" stroke="#272727" strokeWidth="5" strokeLinecap="round" /> {/* left leg */}
        <path d="M105 120 L115 145" stroke="#272727" strokeWidth="5" strokeLinecap="round" /> {/* right leg */}
        {/* Desk */}
        <rect x="60" y="148" width="80" height="6" rx="2" fill="#c4c4c4" opacity="0.5" />
        <rect x="70" y="154" width="4" height="30" fill="#c4c4c4" opacity="0.4" />
        <rect x="126" y="154" width="4" height="30" fill="#c4c4c4" opacity="0.4" />

        {/* Easel */}
        <line x1="155" y1="180" x2="175" y2="40" stroke="#c4c4c4" strokeWidth="2" />
        <line x1="225" y1="180" x2="205" y2="40" stroke="#c4c4c4" strokeWidth="2" />
        <line x1="190" y1="180" x2="190" y2="55" stroke="#c4c4c4" strokeWidth="2" />
        {/* Canvas on easel */}
        <rect x="160" y="40" width="60" height="70" rx="2" fill="white" stroke="#c4c4c4" strokeWidth="1" />
        {/* Face sketch on canvas */}
        <circle cx="190" cy="62" r="14" stroke="#8bb8b2" strokeWidth="1.5" fill="none" />
        <circle cx="185" cy="59" r="2" fill="#8bb8b2" opacity="0.6" />
        <circle cx="195" cy="59" r="2" fill="#8bb8b2" opacity="0.6" />
        <path d="M185 70 Q190 74 195 70" stroke="#8bb8b2" strokeWidth="1" fill="none" />
        {/* Hair scribble */}
        <path d="M176 52 Q180 38 190 36 Q200 38 204 52" stroke="#8bb8b2" strokeWidth="2" fill="none" />

        {/* Person painting */}
        <circle cx="215" cy="70" r="12" fill="#272727" /> {/* head */}
        {/* Hair bun */}
        <circle cx="225" cy="62" r="6" fill="#272727" />
        <path d="M200 85 Q205 105 215 115 Q220 105 230 85" fill="#272727" /> {/* torso */}
        <path d="M200 115 L195 160" stroke="#272727" strokeWidth="5" strokeLinecap="round" />
        <path d="M225 115 L235 155" stroke="#272727" strokeWidth="5" strokeLinecap="round" />
        {/* Arm holding brush */}
        <path d="M205 92 L170 75" stroke="#272727" strokeWidth="3" strokeLinecap="round" />
        {/* Brush */}
        <line x1="170" y1="75" x2="165" y2="72" stroke="#056257" strokeWidth="2" strokeLinecap="round" />

        {/* Small plant on right */}
        <path d="M245 165 Q250 155 255 160" stroke="#056257" strokeWidth="1.5" fill="none" />
        <path d="M248 168 Q255 158 260 165" stroke="#056257" strokeWidth="1.5" fill="none" />
      </svg>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function ComputingResults({
  onComplete,
  persona,
}: ComputingResultsProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const intervals: ReturnType<typeof setInterval>[] = [];

    // Animate through each step
    STEPS.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setCurrentStep(i);
        }, i * STEP_DURATION)
      );
    });

    // Smooth progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const target = Math.min(((currentStep + 1) / STEPS.length) * 100, 99);
        if (prev >= target) return prev;
        return prev + 0.5;
      });
    }, 30);
    intervals.push(progressInterval);

    // Complete after all steps
    timers.push(
      setTimeout(() => {
        setProgress(100);
      }, STEPS.length * STEP_DURATION)
    );
    timers.push(
      setTimeout(() => {
        onComplete();
      }, STEPS.length * STEP_DURATION + 600)
    );

    return () => {
      timers.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Update progress target when step changes
  useEffect(() => {
    const target = Math.min(((currentStep + 1) / STEPS.length) * 100, 99);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= target) {
          clearInterval(interval);
          return prev;
        }
        return Math.min(prev + 1, target);
      });
    }, 20);
    return () => clearInterval(interval);
  }, [currentStep]);

  return (
    <div
      className="h-full flex flex-col items-center"
      style={{
        backgroundColor: "#e6efee", // cypress-10 — light green bg matching Figma
        paddingTop: 48,
        paddingLeft: 24,
        paddingRight: 24,
      }}
    >
      {/* Illustration */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AnalyzingIllustration />
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 28,
          fontWeight: 700,
          color: "#272727",
          textAlign: "center",
          marginTop: 24,
          marginBottom: 32,
          lineHeight: 1.2,
        }}
      >
        Analyzing health data
      </motion.h1>

      {/* Progress row: label + bar + percentage */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 0,
          marginBottom: 32,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            width: "100%",
          }}
        >
          {/* Step label */}
          <div style={{ minWidth: 0, flex: "0 0 auto" }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={currentStep}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#272727",
                  whiteSpace: "nowrap",
                }}
              >
                {STEPS[currentStep]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Progress bar */}
          <div
            style={{
              flex: 1,
              height: 8,
              backgroundColor: "#c8d9d7",
              borderRadius: 4,
              overflow: "hidden",
              minWidth: 80,
            }}
          >
            <motion.div
              style={{
                height: "100%",
                backgroundColor: "#056257", // cypress-100
                borderRadius: 4,
              }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>

          {/* Percentage */}
          <span
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "#272727",
              minWidth: 36,
              textAlign: "right",
            }}
          >
            {Math.round(progress)}%
          </span>
        </div>

        {/* Divider line below progress */}
        <div
          style={{
            height: 1,
            backgroundColor: "#c8d9d7",
            marginTop: 16,
          }}
        />
      </motion.div>

      {/* Testimonial quote */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        style={{
          fontSize: 16,
          lineHeight: 1.5,
          color: "#272727",
          textAlign: "center",
          marginBottom: 24,
          fontStyle: "normal",
        }}
      >
        &ldquo;I feel a lot better knowing my family will be taken care of if
        anything was to happen to me&rdquo;
      </motion.p>

      {/* Trustpilot section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.8 }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        {/* Trustpilot logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#00b67a">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z" />
          </svg>
          <span
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#272727",
              letterSpacing: -0.3,
            }}
          >
            Trustpilot
          </span>
        </div>

        {/* Stars */}
        <TrustpilotStars />

        {/* Rating text */}
        <span
          style={{
            fontSize: 13,
            color: "#525252",
            marginTop: 2,
          }}
        >
          4.8 stars / 9000 reviews
        </span>
      </motion.div>
    </div>
  );
}
