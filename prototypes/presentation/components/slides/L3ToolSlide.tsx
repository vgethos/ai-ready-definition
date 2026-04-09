"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    image: "/funnel/screen-01.png",
    url: "ethoslife.com/",
    number: 1,
    title: "Screen 1: Homepage",
    body: 'The user sees "Protect your family in minutes" with a prominent CTA. Affordable life insurance with no medical exams, 100% online.',
  },
  {
    image: "/funnel/screen-05.png",
    url: "ethoslife.com/app/start",
    number: 5,
    title: "Screen 5: Getting Started",
    body: '"We\'ll get your final rate in minutes." Three-step process: coverage needs, basic details, health info. Google review testimonial.',
  },
  {
    image: "/funnel/screen-07.png",
    url: "ethoslife.com/app/details",
    number: 7,
    title: "Screen 7: Basic Details",
    body: '"Provide your sex at birth." Two options: Male, Female. Progress bar at ~20%.',
  },
];

export default function L3ToolSlide() {
  const [currentStep, setCurrentStep] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [visibleTexts, setVisibleTexts] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Step 0: show first screenshot immediately (already visible via initial state)
    // After 1.5s, start processing first screenshot
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Step 1: Process screen 1
    timers.push(
      setTimeout(() => {
        setProcessing(true);
      }, 1000)
    );
    timers.push(
      setTimeout(() => {
        setProcessing(false);
        setVisibleTexts([0]);
      }, 1500)
    );

    // Step 2: Transition to screen 2, process it
    timers.push(
      setTimeout(() => {
        setCurrentStep(1);
      }, 3000)
    );
    timers.push(
      setTimeout(() => {
        setProcessing(true);
      }, 3300)
    );
    timers.push(
      setTimeout(() => {
        setProcessing(false);
        setVisibleTexts([0, 1]);
      }, 3800)
    );

    // Step 3: Transition to screen 3, process it
    timers.push(
      setTimeout(() => {
        setCurrentStep(2);
      }, 4500)
    );
    timers.push(
      setTimeout(() => {
        setProcessing(true);
      }, 4800)
    );
    timers.push(
      setTimeout(() => {
        setProcessing(false);
        setVisibleTexts([0, 1, 2]);
      }, 5300)
    );

    // Step 4: Show "done" state
    timers.push(
      setTimeout(() => {
        setDone(true);
      }, 6000)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  const capturedCount = done ? 29 : visibleTexts.length;

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-12 bg-[#f5f5f5]">
      {/* Header */}
      <motion.div
        className="flex items-center gap-4 mb-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="px-3 py-1 rounded-full bg-cypress text-white text-xs font-medium tracking-wide uppercase">
          Level 3
        </span>
        <h2 className="font-serif text-3xl text-ink">
          Automated Funnel Documentation
        </h2>
      </motion.div>

      {/* Split-screen panels */}
      <div className="flex gap-6 w-full max-w-6xl" style={{ height: "520px" }}>
        {/* LEFT: Browser frame with real screenshots */}
        <motion.div
          className="w-[45%] rounded-2xl overflow-hidden shadow-lg bg-white flex flex-col"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-[#e8e8e8] shrink-0">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 ml-3 px-3 py-1 rounded-md bg-white text-[11px] text-ink-60 font-mono truncate">
              {steps[currentStep].url}
            </div>
          </div>

          {/* Screenshot area */}
          <div className="relative flex-1 overflow-hidden bg-gray-50">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                className="absolute inset-0 flex items-start justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={steps[currentStep].image}
                  alt={steps[currentStep].title}
                  className="w-full h-full object-cover object-top"
                />
              </motion.div>
            </AnimatePresence>

            {/* Processing spinner overlay */}
            <AnimatePresence>
              {processing && (
                <motion.div
                  className="absolute inset-0 bg-black/30 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-10 h-10 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* RIGHT: Document panel */}
        <motion.div
          className="w-[55%] rounded-2xl overflow-hidden shadow-lg bg-white flex flex-col"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-ink-20 shrink-0">
            <div className="w-3 h-3 rounded-sm bg-cypress" />
            <span className="text-[11px] text-ink-40 uppercase tracking-[1.5px] font-medium font-mono">
              funnel-capture.md
            </span>
            <span className="ml-auto text-[11px] font-mono font-medium" style={{ color: done ? "#056257" : "#999" }}>
              {capturedCount} / 29 screens captured{done ? " \u2713" : ""}
            </span>
          </div>

          {/* Document content */}
          <div className="flex-1 overflow-y-auto p-5 font-mono text-sm">
            {visibleTexts.length === 0 && !done && (
              <motion.div
                className="text-ink-40 text-center mt-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 0.4 }}
              >
                Waiting for capture...
              </motion.div>
            )}

            <div className="space-y-4">
              {steps.map((step, i) => (
                <AnimatePresence key={i}>
                  {visibleTexts.includes(i) && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <div className="font-semibold text-ink mb-1">
                        {step.title}
                      </div>
                      <div className="text-ink-60 leading-relaxed pl-4">
                        {step.body}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              ))}

              {/* Truncation + completion indicator */}
              <AnimatePresence>
                {done && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    <div className="border-t border-ink-10 pt-4 mt-4 text-center text-ink-40 text-xs">
                      ··· 26 more screens ···
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom quote */}
      <motion.p
        className="mt-8 text-[14px] text-ink-60 italic max-w-2xl text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2, ease: EASE }}
      >
        &ldquo;I need to reference our 29-screen funnel constantly — in PRDs,
        design reviews, engineer conversations.&rdquo;
      </motion.p>
    </div>
  );
}
