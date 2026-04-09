"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { FileText, Sparkles } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const previewLines = [
  "## Screen 1: Homepage",
  '**URL:** app.ethos.com',
  "The user sees \"Protect your family...",
  "CTA: Get my price",
];

const contextFiles = [
  { name: "funnel-capture.md", highlight: true },
  { name: "design-system.md", highlight: false },
  { name: "brand-guidelines.md", highlight: false },
  { name: "user-research.md", highlight: false },
  { name: "product-requirements.md", highlight: false },
];

export default function L3OutputSlide() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1000),
      setTimeout(() => setStep(2), 1800),
      setTimeout(() => setStep(3), 2800),
      setTimeout(() => setStep(4), 3500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-12 bg-[#f5f5f5]">
      {/* Header */}
      <motion.div
        className="flex items-center gap-4 mb-12"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="px-3 py-1 rounded-full bg-cypress text-white text-xs font-medium tracking-wide uppercase">
          Level 3
        </span>
        <h2 className="font-serif text-3xl text-ink">
          Context That Compounds
        </h2>
      </motion.div>

      {/* Main content area */}
      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-4xl">
        {/* Step 0-1: Expanded card that collapses */}
        <AnimatePresence>
          {step < 2 && (
            <motion.div
              layout
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                width: step === 0 ? 400 : 160,
                height: step === 0 ? "auto" : 80,
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
                transition: { duration: 0.3, ease: EASE },
              }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {step === 0 && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Title bar */}
                  <div className="flex items-center gap-2 px-5 py-3 border-b border-ink-20">
                    <div className="w-3 h-3 rounded-sm bg-cypress" />
                    <span className="text-[11px] text-ink-40 uppercase tracking-[1.5px] font-medium font-mono">
                      funnel-capture.md
                    </span>
                  </div>
                  {/* Preview lines */}
                  <div className="px-5 py-4 space-y-1.5">
                    {previewLines.map((line, i) => (
                      <div
                        key={i}
                        className="text-[11px] font-mono text-ink-60 truncate leading-relaxed"
                      >
                        {line}
                      </div>
                    ))}
                    <div className="text-[10px] text-ink-40 pt-1">
                      ... 28 more screens
                    </div>
                  </div>
                </motion.div>
              )}
              {step === 1 && (
                <motion.div
                  className="flex flex-col items-center justify-center h-[80px] w-[160px] gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <FileText className="w-5 h-5 text-cypress" strokeWidth={1.5} />
                  <span className="text-[10px] font-mono text-ink-60 truncate max-w-[140px]">
                    funnel-capture.md
                  </span>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 2+: File grid */}
        {step >= 2 && (
          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {/* Step 3: Label */}
            <AnimatePresence>
              {step >= 3 && (
                <motion.p
                  className="text-lg font-serif text-ink-60 tracking-wide"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  Always available. Always current.
                </motion.p>
              )}
            </AnimatePresence>

            {/* File cards row */}
            <div className="flex flex-wrap justify-center gap-4">
              {contextFiles.map((file, i) => (
                <motion.div
                  key={file.name}
                  className={`flex flex-col items-center justify-center w-[160px] h-[80px] bg-white rounded-xl shadow-sm ${
                    file.highlight
                      ? "border-l-[3px] border-l-cypress"
                      : "border border-transparent"
                  }`}
                  initial={
                    i === 0
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.9, y: 8 }
                  }
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: i === 0 ? 0 : 0.06 * i,
                    ease: EASE,
                  }}
                >
                  <FileText
                    className={`w-5 h-5 ${
                      file.highlight ? "text-cypress" : "text-ink-40"
                    }`}
                    strokeWidth={1.5}
                  />
                  <span
                    className={`text-[10px] font-mono mt-2 truncate max-w-[140px] ${
                      file.highlight
                        ? "text-cypress font-medium"
                        : "text-ink-60"
                    }`}
                  >
                    {file.name}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Step 4: AI reference line */}
            <AnimatePresence>
              {step >= 4 && (
                <motion.div
                  className="flex items-center gap-3 mt-4"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <Sparkles className="w-4 h-4 text-cypress" strokeWidth={1.5} />
                  <span className="text-sm text-ink-60 italic">
                    Referenced in every AI conversation going forward
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
