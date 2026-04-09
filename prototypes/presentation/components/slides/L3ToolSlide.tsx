"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef, useCallback } from "react";
import { FileText, Sparkles } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const screens = [
  {
    image: "/funnel/screen-03.png",
    number: 3,
    title: "Screen 3: Goals",
    url: "app.ethos.com/q/goals",
    content: [
      { type: "h2", text: "Screen 3: Goals" },
      { type: "meta", text: "**URL:** app.ethos.com/q/goals" },
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
    number: 4,
    title: "Screen 4: Protections",
    url: "app.ethos.com/q/protections",
    content: [
      { type: "h2", text: "Screen 4: Protections" },
      { type: "meta", text: "**URL:** app.ethos.com/q/protections" },
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
    number: 5,
    title: "Screen 5: How It Works",
    url: "app.ethos.com/q/howItWorks",
    content: [
      { type: "h2", text: "Screen 5: How It Works" },
      { type: "meta", text: "**URL:** app.ethos.com/q/howItWorks" },
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
    number: 8,
    title: "Screen 8: Children",
    url: "app.ethos.com/q/children",
    content: [
      { type: "h2", text: "Screen 8: Children" },
      { type: "meta", text: "**URL:** app.ethos.com/q/children" },
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
    number: 9,
    title: "Screen 9: Estate Plan or Will",
    url: "app.ethos.com/q/wills",
    content: [
      { type: "h2", text: "Screen 9: Estate Plan or Will" },
      { type: "meta", text: "**URL:** app.ethos.com/q/wills" },
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
    number: 10,
    title: "Screen 10: Estate Planning Tools",
    url: "app.ethos.com/q/willsEducational",
    content: [
      { type: "h2", text: "Screen 10: Estate Planning Tools" },
      {
        type: "meta",
        text: "**URL:** app.ethos.com/q/willsEducational",
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
        <div className="font-bold text-ink text-[11px] leading-relaxed mt-0.5">
          ## {block.text}
        </div>
      );
    case "meta":
      return (
        <div className="text-ink text-[10px] leading-relaxed">
          {block.text}
        </div>
      );
    case "h3":
      return (
        <div className="font-semibold text-ink text-[10px] leading-relaxed mt-1.5">
          ### {block.text}
        </div>
      );
    case "body":
      return (
        <div className="text-ink text-[10px] leading-relaxed whitespace-pre-line pl-0">
          {block.text}
        </div>
      );
    default:
      return null;
  }
}

function AnimatedBar({ processing }: { processing: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center w-[48px] shrink-0">
      <div className="relative h-[2px] w-[36px] overflow-hidden rounded-full bg-cypress/10">
        <motion.div
          className="absolute top-0 left-0 h-full w-[16px] rounded-full bg-cypress/60"
          animate={
            processing
              ? {
                  x: ["-16px", "36px"],
                  opacity: [0, 1, 1, 0],
                }
              : { x: "-16px", opacity: 0 }
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
  const [currentStep, setCurrentStep] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [visibleScreens, setVisibleScreens] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  const [phase, setPhase] = useState(1);
  const [showCards, setShowCards] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const docRef = useRef<HTMLDivElement>(null);

  // Phase 1: Auto-play funnel capture demo
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const SCREEN_DURATION = 2000;

    screens.forEach((_, i) => {
      const base = i * SCREEN_DURATION;

      timers.push(
        setTimeout(() => {
          setCurrentStep(i);
          setProcessing(true);
        }, base)
      );

      timers.push(
        setTimeout(() => {
          setProcessing(false);
          setVisibleScreens((prev) => [...prev, i]);
        }, base + 1200)
      );
    });

    const endTime = screens.length * SCREEN_DURATION + 400;
    timers.push(
      setTimeout(() => {
        setDone(true);
      }, endTime)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  // Auto-scroll document panel when new content appears
  useEffect(() => {
    if (docRef.current) {
      docRef.current.scrollTo({
        top: docRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [visibleScreens, done]);

  // Phase 2 staggered reveals
  useEffect(() => {
    if (phase !== 2) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    // After collapse animation (0.8s), show the other file cards
    timers.push(setTimeout(() => setShowCards(true), 900));
    // Then the label
    timers.push(setTimeout(() => setShowLabel(true), 1400));
    // Then the sparkles line
    timers.push(setTimeout(() => setShowSparkles(true), 2000));

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
        setShowLabel(false);
        setShowSparkles(false);
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
    <div className="h-screen w-screen flex flex-col items-center justify-center p-10 bg-[#f5f5f5]">
      {/* Header */}
      <motion.div
        className="flex items-center gap-4 mb-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="px-3 py-1 rounded-full bg-cypress text-white text-xs font-medium tracking-wide uppercase">
          Level 3
        </span>
        <AnimatePresence mode="wait">
          <motion.h2
            key={isPhase2 ? "context" : "funnel"}
            className="font-serif text-3xl text-ink"
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
        className="flex items-center justify-center w-full max-w-4xl relative"
        style={{ height: "580px" }}
      >
        {/* ===== PHASE 1: Funnel capture demo ===== */}

        {/* LEFT: Browser frame */}
        <AnimatePresence>
          {!isPhase2 && (
            <motion.div
              className="w-[280px] shrink-0 rounded-2xl overflow-hidden shadow-lg bg-white flex flex-col"
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
                <div className="flex-1 ml-2 px-2 py-0.5 rounded bg-white text-[9px] text-ink-60 font-mono truncate">
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
          {/* "Always available" label */}
          <AnimatePresence>
            {isPhase2 && showLabel && (
              <motion.p
                className="text-lg font-serif text-ink-60 tracking-wide"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                Always available. Always current.
              </motion.p>
            )}
          </AnimatePresence>

          {/* File cards row (phase 2) or document panel (phase 1) */}
          <div
            className={`flex ${
              isPhase2
                ? "flex-wrap justify-center gap-4 items-center"
                : "items-stretch"
            }`}
          >
            {/* The document panel that collapses into a card */}
            <motion.div
              className={`shrink-0 rounded-2xl overflow-hidden shadow-lg bg-white flex flex-col relative ${
                isPhase2 ? "border-l-[3px] border-l-cypress rounded-xl" : ""
              }`}
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
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-ink-10 shrink-0 bg-[#fafafa]">
                  <div className="w-2.5 h-2.5 rounded-sm bg-cypress" />
                  <span className="text-[9px] text-ink-40 uppercase tracking-[1.5px] font-medium font-mono">
                    funnel-capture.md
                  </span>
                </div>

                {/* Document content */}
                <div
                  ref={docRef}
                  className="flex-1 overflow-y-auto px-4 py-3 font-mono"
                >
                  {visibleScreens.length === 0 && !done && (
                    <motion.div
                      className="text-ink-40 text-center mt-16 text-xs"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.6 }}
                      transition={{ duration: 0.4 }}
                    >
                      Waiting for capture...
                    </motion.div>
                  )}

                  <div className="space-y-3">
                    {screens.map((screen, i) => (
                      <AnimatePresence key={i}>
                        {visibleScreens.includes(i) && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: EASE }}
                            className="space-y-1"
                          >
                            {screen.content.map((block, j) => (
                              <ContentBlock key={j} block={block} />
                            ))}
                            {i < screens.length - 1 && (
                              <div className="border-b border-ink-5 mt-3 mb-3" />
                            )}
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
                <span className="text-[10px] font-mono text-cypress font-medium truncate max-w-[140px]">
                  funnel-capture.md
                </span>
              </motion.div>
            </motion.div>

            {/* Other context file cards (phase 2 only) */}
            <AnimatePresence>
              {isPhase2 &&
                showCards &&
                contextFiles
                  .filter((f) => !f.highlight)
                  .map((file, i) => (
                    <motion.div
                      key={file.name}
                      className="flex flex-col items-center justify-center w-[160px] h-[80px] bg-white rounded-xl shadow-sm border border-transparent"
                      initial={{ opacity: 0, scale: 0.9, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.06 * (i + 1),
                        ease: EASE,
                      }}
                    >
                      <FileText
                        className="w-5 h-5 text-ink-40"
                        strokeWidth={1.5}
                      />
                      <span className="text-[10px] font-mono mt-2 truncate max-w-[140px] text-ink-60">
                        {file.name}
                      </span>
                    </motion.div>
                  ))}
            </AnimatePresence>
          </div>

          {/* Sparkles line */}
          <AnimatePresence>
            {isPhase2 && showSparkles && (
              <motion.div
                className="flex items-center gap-3 mt-4"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <Sparkles
                  className="w-4 h-4 text-cypress"
                  strokeWidth={1.5}
                />
                <span className="text-sm text-ink-60 italic">
                  Referenced in every AI conversation going forward
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom quote (phase 1 only) */}
      <AnimatePresence>
        {!isPhase2 && (
          <motion.p
            className="mt-6 text-[14px] text-ink-60 italic max-w-2xl text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease: EASE }}
          >
            &ldquo;I need to reference our 29-screen funnel constantly &mdash;
            in PRDs, design reviews, engineer conversations.&rdquo;
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
