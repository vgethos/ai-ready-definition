"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

// ── Types ────────────────────────────────────────────────────────────────────
interface FindingCarrierProps {
  onComplete: () => void;
  persona: "top" | "good";
}

// ── Status messages per persona ──────────────────────────────────────────────
const MESSAGES_TOP = [
  "Matching you with top-rated carriers...",
  "Great news — multiple carriers are competing for your profile",
  "Finalizing your personalized rate...",
];

const MESSAGES_GOOD = [
  "Matching you with top-rated carriers...",
  "Finding your best policy options...",
  "Finalizing your personalized rate...",
];

// ── Carrier placeholder icons (abstract shields/badges) ─────────────────────
function CarrierIcon({ index, active }: { index: number; active: boolean }) {
  return (
    <motion.div
      className="flex items-center justify-center rounded-lg"
      style={{
        width: 48,
        height: 48,
        backgroundColor: active ? "#056257" : "#f3f7f7",
        border: active ? "none" : "1px solid #e5e5e5",
      }}
      animate={{
        backgroundColor: active ? "#056257" : "#f3f7f7",
        scale: active ? 1 : 0.92,
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {/* Abstract shield/carrier icon */}
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        {index % 3 === 0 && (
          /* Shield shape */
          <path
            d="M12 2L4 6v5c0 5.25 3.4 10.15 8 11.4 4.6-1.25 8-6.15 8-11.4V6L12 2z"
            fill={active ? "white" : "#c4c4c4"}
            fillOpacity={active ? 1 : 0.7}
          />
        )}
        {index % 3 === 1 && (
          /* Star shape */
          <path
            d="M12 2l2.9 5.9L21 9l-4.5 4.4L17.6 20 12 17l-5.6 3 1.1-6.6L3 9l6.1-1.1L12 2z"
            fill={active ? "white" : "#c4c4c4"}
            fillOpacity={active ? 1 : 0.7}
          />
        )}
        {index % 3 === 2 && (
          /* Circle badge */
          <>
            <circle cx="12" cy="12" r="9" fill={active ? "white" : "#c4c4c4"} fillOpacity={active ? 1 : 0.7} />
            <path
              d="M8.5 12.5l2 2 5-5"
              stroke={active ? "#056257" : "#f3f7f7"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        )}
      </svg>
    </motion.div>
  );
}

// ── Horizontal scanning progress bar ─────────────────────────────────────────
function ScanningBar({ progress }: { progress: number }) {
  return (
    <div
      className="w-full overflow-hidden rounded-full"
      style={{ height: 4, backgroundColor: "#e5e5e5" }}
    >
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: "#056257" }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function FindingCarrier({ onComplete, persona }: FindingCarrierProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [activeIcons, setActiveIcons] = useState(0); // how many carrier icons are "lit up"
  const messages = persona === "top" ? MESSAGES_TOP : MESSAGES_GOOD;

  const MESSAGE_DURATION = 750; // ms per message
  const TOTAL_STEPS = messages.length;

  useEffect(() => {
    // Step through messages and light up carrier icons sequentially
    const timers: ReturnType<typeof setTimeout>[] = [];

    for (let i = 0; i < TOTAL_STEPS; i++) {
      timers.push(
        setTimeout(() => {
          setMessageIndex(i);
          setActiveIcons(i + 1);
        }, i * MESSAGE_DURATION)
      );
    }

    // Call onComplete after all messages have shown
    timers.push(
      setTimeout(() => {
        onComplete();
      }, TOTAL_STEPS * MESSAGE_DURATION + 400) // small buffer after last message
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete, TOTAL_STEPS, messages]);

  const progress = ((messageIndex + 1) / TOTAL_STEPS) * 100;

  return (
    <div
      className="flex flex-col items-center justify-center h-full px-8"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="flex flex-col items-center w-full max-w-[280px]" style={{ gap: 32 }}>
        {/* Carrier icons row — light up sequentially as we "find" carriers */}
        <div className="flex items-center justify-center" style={{ gap: 12 }}>
          {[0, 1, 2].map((i) => (
            <CarrierIcon key={i} index={i} active={i < activeIcons} />
          ))}
        </div>

        {/* Scanning progress bar */}
        <ScanningBar progress={progress} />

        {/* Animated status message */}
        <div className="relative w-full" style={{ minHeight: 48 }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              className="font-sans text-center"
              style={{
                fontSize: 15,
                lineHeight: "22px",
                color: messageIndex === 1 && persona === "top" ? "#056257" : "#525252",
                fontWeight: messageIndex === 1 && persona === "top" ? 500 : 400,
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {messages[messageIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
