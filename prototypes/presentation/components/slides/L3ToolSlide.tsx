"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef, useCallback } from "react";
import { FileText } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const screens = [
  {
    image: "/funnel/screen-03.png",
    title: "Screen 1: Goals",
    url: "app.ethos.com/q/goals",
    content: [
      { type: "h2", text: "Screen 1: Goals" },
      { type: "meta", text: "URL: app.ethos.com/q/goals" },
      { type: "h3", text: "What the user sees" },
      {
        type: "body",
        text: '"Let\'s get started! What are your goals for life insurance?"\nSelect all that apply: Protect my loved ones \u00b7 Leave an inheritance \u00b7 Cover my funeral expenses \u00b7 I\'m not sure',
      },
      { type: "h3", text: "What the user can do" },
      { type: "body", text: "Can select: Protect my loved ones, Leave an inheritance, Cover my funeral expenses, or I'm not sure\nCan tap Next to continue" },
    ],
  },
  {
    image: "/funnel/screen-04.png",
    title: "Screen 2: Protections",
    url: "app.ethos.com/q/protections",
    content: [
      { type: "h2", text: "Screen 2: Protections" },
      { type: "meta", text: "URL: app.ethos.com/q/protections" },
      { type: "h3", text: "What the user sees" },
      {
        type: "body",
        text: '"Who depends on you financially?"\nThis helps us customize your plan. Options: Spouse or partner \u00b7 Children \u00b7 Parent \u00b7 Other',
      },
      { type: "h3", text: "What the user can do" },
      { type: "body", text: "Can select: Spouse or partner, Children, Parent, or Other\nCan tap Next or go Back" },
    ],
  },
  {
    image: "/funnel/screen-05.png",
    title: "Screen 3: How It Works",
    url: "app.ethos.com/q/howItWorks",
    content: [
      { type: "h2", text: "Screen 3: How It Works" },
      { type: "meta", text: "URL: app.ethos.com/q/howItWorks" },
      { type: "h3", text: "What the user sees" },
      {
        type: "body",
        text: '"Great! We\'ll get your final rate in minutes."\n3-step process: Tell us about your needs \u2192 Add basic details \u2192 Provide health info\nGoogle review: "Holy cow! I\'m still blown away by how easy this was."',
      },
      { type: "h3", text: "What the user can do" },
      { type: "body", text: "Can tap Next: Coverage Needs to continue\nCan tap Back to return to previous screen" },
    ],
  },
  {
    image: "/funnel/screen-08.png",
    title: "Screen 4: Children",
    url: "app.ethos.com/q/children",
    content: [
      { type: "h2", text: "Screen 4: Children" },
      { type: "meta", text: "URL: app.ethos.com/q/children" },
      { type: "h3", text: "What the user sees" },
      {
        type: "body",
        text: '"How many children do you have under 18?"\nThis helps us estimate your family coverage needs.\nOptions: 0, 1, 2, 3, 4+',
      },
      { type: "h3", text: "What the user can do" },
      { type: "body", text: "Can tap 0, 1, 2, 3, or 4+ to select number of children\nCan tap Back to return" },
    ],
  },
  {
    image: "/funnel/screen-09.png",
    title: "Screen 5: Estate Plan or Will",
    url: "app.ethos.com/q/wills",
    content: [
      { type: "h2", text: "Screen 5: Estate Plan or Will" },
      { type: "meta", text: "URL: app.ethos.com/q/wills" },
      { type: "h3", text: "What the user sees" },
      {
        type: "body",
        text: '"Do you have an Estate Plan or Will in place?"\nOptions: Yes \u00b7 No \u00b7 I\'m not sure',
      },
      { type: "h3", text: "What the user can do" },
      { type: "body", text: "Can tap Yes, No, or I'm not sure\nCan tap Back to return" },
    ],
  },
  {
    image: "/funnel/screen-10.png",
    title: "Screen 6: Estate Planning Tools",
    url: "app.ethos.com/q/willsEducational",
    content: [
      { type: "h2", text: "Screen 6: Estate Planning Tools" },
      {
        type: "meta",
        text: "URL: app.ethos.com/q/willsEducational",
      },
      { type: "h3", text: "What the user sees" },
      {
        type: "body",
        text: '"Eligible policies include Estate Planning Tools"\nThese tools are provided at no additional cost. Family illustration with umbrella.',
      },
      { type: "h3", text: "What the user can do" },
      { type: "body", text: "Can tap Next to continue to the application" },
    ],
  },
];

const contextFiles = [
  { name: "funnel-capture.md", highlight: true },
  { name: "design-system.md", highlight: false },
  { name: "brand-guidelines.md", highlight: false },
  { name: "user-research.md", highlight: false },
  { name: "product-requirements.md", highlight: false },
];

function ContentBlock({
  block,
}: {
  block: { type: string; text: string };
}) {
  switch (block.type) {
    case "h2":
      return (
        <div className="font-bold text-ink text-[13px] leading-relaxed mt-0.5">
          ## {block.text}
        </div>
      );
    case "meta":
      return (
        <div className="text-ink text-[13px] leading-relaxed">
          {block.text}
        </div>
      );
    case "h3":
      return (
        <div className="font-semibold text-ink text-[13px] leading-relaxed mt-4">
          ### {block.text}
        </div>
      );
    case "body":
      return (
        <div className="text-ink text-[13px] leading-relaxed whitespace-pre-line pl-0">
          {block.text}
        </div>
      );
    default:
      return null;
  }
}

function AnimatedBar({ processing }: { processing: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center w-[80px] shrink-0">
      <div className="relative h-[3px] w-[64px] overflow-hidden rounded-full bg-cypress/20">
        <motion.div
          className="absolute top-0 left-0 h-full w-[20px] rounded-full bg-cypress"
          animate={
            processing
              ? {
                  x: ["-20px", "64px"],
                  opacity: [0, 1, 1, 0],
                }
              : { x: "-20px", opacity: 0 }
          }
          transition={
            processing
              ? {
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "linear",
                }
              : { duration: 0.2 }
          }
        />
      </div>
    </div>
  );
}

export default function L3ToolSlide() {
  // Flatten all content blocks into a single line list for line-by-line reveal
  const allLines = screens.flatMap((screen, screenIdx) =>
    screen.content.map((block, blockIdx) => ({
      ...block,
      screenIdx,
      blockIdx,
      isFirst: blockIdx === 0,
      isLast: blockIdx === screen.content.length - 1,
    }))
  );

  const [runKey, setRunKey] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [visibleLineCount, setVisibleLineCount] = useState(0);
  const [done, setDone] = useState(false);
  const [phase, setPhase] = useState(1);
  const [showCards, setShowCards] = useState(false);
  const docRef = useRef<HTMLDivElement>(null);

  const replay = useCallback(() => {
    setCurrentStep(0);
    setProcessing(false);
    setVisibleLineCount(0);
    setDone(false);
    setPhase(1);
    setShowCards(false);
    setRunKey((k) => k + 1);
  }, []);

  // Phase 1: Auto-play funnel capture demo — line by line
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const LINE_DELAY = 300; // ms between each line
    const SCREEN_PAUSE = 800; // extra pause when switching screens
    let elapsed = 0;

    allLines.forEach((line, i) => {
      // Add extra pause at the start of each new screen (except the first line)
      if (line.isFirst && i > 0) {
        elapsed += SCREEN_PAUSE;
      }

      const showAt = elapsed;

      // Switch screenshot when a new screen starts, with a processing delay before lines appear
      if (line.isFirst) {
        timers.push(
          setTimeout(() => {
            setCurrentStep(line.screenIdx);
            setProcessing(true);
          }, showAt)
        );
        elapsed += 1000; // wait 1s after screenshot appears before first line
      }

      // Reveal this line
      timers.push(
        setTimeout(() => {
          setVisibleLineCount(i + 1);
        }, elapsed)
      );

      // Stop processing indicator after the last line of a screen
      if (line.isLast) {
        timers.push(
          setTimeout(() => {
            setProcessing(false);
          }, showAt + 200)
        );
      }

      elapsed += LINE_DELAY;
    });

    // Mark done after all lines
    timers.push(
      setTimeout(() => {
        setDone(true);
      }, elapsed + 600)
    );

    return () => timers.forEach(clearTimeout);
  }, [runKey]);

  // Auto-scroll document panel when new content appears
  useEffect(() => {
    if (docRef.current) {
      docRef.current.scrollTo({
        top: docRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [visibleLineCount, done]);

  // Phase 2 staggered reveals
  useEffect(() => {
    if (phase !== 2) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Wait for collapse to fully finish (0.8s) + a beat, then show cards
    timers.push(setTimeout(() => setShowCards(true), 1200));

    return () => timers.forEach(clearTimeout);
  }, [phase]);

  // Keypress interception for phase transitions
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const isForward =
        e.key === "ArrowRight" || e.key === " " || e.key === "Enter";
      const isBackward = e.key === "ArrowLeft";

      if (isForward && done && phase === 1) {
        e.preventDefault();
        e.stopImmediatePropagation();
        setPhase(2);
        return;
      }

      if (isBackward && phase === 2) {
        e.preventDefault();
        e.stopImmediatePropagation();
        setPhase(1);
        setShowCards(false);
        return;
      }

      // Otherwise let events pass through to SlideController
    },
    [done, phase]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [handleKeyDown]);

  const isPhase2 = phase === 2;

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-10 bg-white">
      {/* Header */}
      <motion.div
        className="flex items-center gap-4 mb-8"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <AnimatePresence mode="wait">
          <motion.h2
            key={isPhase2 ? "context" : "funnel"}
            className="font-serif text-[44px] leading-[1.15] text-ink text-balance"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {isPhase2
              ? "Context That Compounds"
              : "Automated Funnel Documentation"}
          </motion.h2>
        </AnimatePresence>
      </motion.div>

      {/* Main content area */}
      <div
        className="flex items-center justify-center w-full max-w-[800px] gap-8 relative"
        style={{ height: "580px" }}
      >
        {/* ===== PHASE 1: Funnel capture demo ===== */}

        {/* LEFT: Browser frame */}
        <AnimatePresence>
          {!isPhase2 && (
            <motion.div
              className="w-[280px] shrink-0 rounded-2xl overflow-hidden shadow-card bg-white flex flex-col"
              style={{ height: "580px" }}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-1.5 px-3 py-2 bg-[#e8e8e8] shrink-0">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                  <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
                  <div className="w-2 h-2 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex-1 ml-2 px-2 py-0.5 rounded bg-white text-[13px] text-deck-secondary font-mono truncate">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentStep}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      {screens[currentStep].url}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              {/* Screenshot area */}
              <div className="relative flex-1 overflow-hidden bg-gray-50">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={screens[currentStep].image}
                      alt={screens[currentStep].title}
                      className="w-full h-full object-contain object-top"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CENTER: Animated bar */}
        <AnimatePresence>
          {!isPhase2 && (
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <AnimatedBar processing={processing} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* RIGHT: Document panel / collapsing card */}
        {/* In phase 1: full 420x580 document panel */}
        {/* In phase 2: collapses to 160x80 compact card, then context files appear */}
        <div
          className={`flex flex-col items-center ${
            isPhase2 ? "gap-6 justify-center flex-1" : ""
          }`}
        >

          {/* File cards (stacked in phase 2) or document panel (phase 1) */}
          <div
            className={`relative ${
              isPhase2
                ? "flex items-center justify-center"
                : "flex items-stretch"
            }`}
            style={isPhase2 ? { width: 260, height: 120 } : undefined}
          >
            {/* The document panel that collapses into a card */}
            <motion.div
              className={`shrink-0 rounded-2xl overflow-hidden bg-white flex flex-col relative ${
                isPhase2 ? "rounded-xl shadow-card z-10" : "shadow-card"
              }`}
              style={isPhase2 ? { position: "absolute", top: 0, left: "calc(50% - 80px)" } : undefined}
              animate={{
                width: isPhase2 ? 160 : 420,
                height: isPhase2 ? 80 : 580,
              }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              {/* Phase 1: Full document content */}
              <motion.div
                className="flex flex-col h-full w-full"
                animate={{ opacity: isPhase2 ? 0 : 1 }}
                transition={{ duration: isPhase2 ? 0.3 : 0.1 }}
                style={{ pointerEvents: isPhase2 ? "none" : "auto" }}
              >
                {/* Title bar */}
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-ink/10 shrink-0 bg-[#fafafa]">
                  <div className="w-2.5 h-2.5 rounded-sm bg-cypress" />
                  <span className="text-[13px] text-deck-faint uppercase tracking-[1.5px] font-medium font-mono">
                    funnel-capture.md
                  </span>
                </div>

                {/* Document content */}
                <div
                  ref={docRef}
                  className="flex-1 overflow-y-auto px-4 py-3 font-mono"
                >
                  {visibleLineCount === 0 && !done && (
                    <motion.div
                      className="text-deck-faint text-center mt-16 text-xs"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.6 }}
                      transition={{ duration: 0.4 }}
                    >
                      Waiting for capture...
                    </motion.div>
                  )}

                  <div className="space-y-1">
                    {allLines.map((line, i) => (
                      <AnimatePresence key={i}>
                        {i < visibleLineCount && (
                          <motion.div
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25, ease: EASE }}
                          >
                            {line.isFirst && line.screenIdx > 0 && (
                              <div className="border-b border-ink/5 mt-5 mb-5" />
                            )}
                            <ContentBlock block={line} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Phase 2: Compact card content (FileText icon + label) */}
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: isPhase2 ? 1 : 0 }}
                transition={{
                  duration: 0.3,
                  delay: isPhase2 ? 0.5 : 0,
                }}
                style={{ pointerEvents: isPhase2 ? "auto" : "none" }}
              >
                <FileText
                  className="w-5 h-5 text-cypress"
                  strokeWidth={1.5}
                />
                <span className="text-[13px] font-mono text-cypress font-medium truncate max-w-[140px]">
                  funnel-capture.md
                </span>
              </motion.div>
            </motion.div>

            {/* Context file cards — always in DOM, opacity-only transitions avoid insertion jank */}
            {contextFiles
                .filter((f) => !f.highlight)
                .map((file, i) => (
                  <div
                    key={file.name}
                    className="absolute flex flex-col items-center justify-center w-[160px] h-[80px] bg-white rounded-xl shadow-card transition-opacity duration-500"
                    style={{
                      zIndex: contextFiles.length - 1 - i,
                      top: (i + 1) * 4,
                      left: `calc(50% - 80px + ${(i + 1) * 3}px)`,
                      opacity: isPhase2 && showCards ? 1 : 0,
                      transitionDelay: isPhase2 && showCards ? `${i * 80}ms` : "0ms",
                      willChange: "opacity",
                    }}
                  >
                    <FileText
                      className="w-5 h-5 text-deck-faint"
                      strokeWidth={1.5}
                    />
                    <span className="text-[13px] font-mono mt-2 truncate max-w-[140px] text-deck-secondary">
                      {file.name}
                    </span>
                  </div>
                ))}
          </div>

        </div>
      </div>

      {/* Replay button — appears when animation finishes, phase 1 only */}
      <AnimatePresence>
        {done && !isPhase2 && (
          <motion.button
            onClick={replay}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-[var(--deck-tag-bg)] text-deck-faint hover:text-ink transition-colors cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            aria-label="Replay animation"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M1 4v6h6" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
