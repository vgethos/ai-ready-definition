"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useDialKit } from "dialkit";
import {
  TOPICS,
  COLS,
  FREE_INDEX,
  useBingoSync,
} from "./useBingoSync";

export default function BingoBoard() {
  const params = useDialKit("Board Style", {
    cardRadius: [10, 0, 30, 1],
    gap: [10, 2, 24, 1],
    glowIntensity: [20, 0, 60, 1],
    blurAmount: [8, 2, 20, 1],
    accentColor: "#C6E04A",
    lightMode: true,
  });

  const { stamped, question } = useBingoSync();

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      params.lightMode ? "light" : "dark"
    );
  }, [params.lightMode]);

  const accentColor = params.accentColor;
  const glowColor = accentColor + "59";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: "2vh 3vw",
        position: "relative",
      }}
    >
      {/* Background gradients */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: `
            radial-gradient(ellipse 80% 60% at 20% 10%, ${accentColor}0a 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 85% 80%, rgba(120,100,200,0.03) 0%, transparent 60%)
          `,
          pointerEvents: "none",
        }}
      />

      {/* Question — fixed position, doesn't affect layout */}
      <AnimatePresence>
        {question && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: "3vh",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 10,
              textAlign: "center",
              maxWidth: "min(85vw, 1000px)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
                color: "var(--text)",
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
              }}
            >
              {question}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Board */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gap: `${params.gap}px`,
          width: "min(90vw, 1100px)",
          aspectRatio: "5 / 3",
          zIndex: 1,
        }}
      >
        {TOPICS.map((topic, i) => {
          const isStamped = stamped.has(i);
          const isFree = i === FREE_INDEX;

          return (
            <motion.div
              key={i}
              animate={{
                filter: isStamped ? "blur(0px)" : `blur(${params.blurAmount}px)`,
                opacity: isStamped ? 1 : 0.4,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                position: "relative",
                background: isStamped ? accentColor : "var(--card-bg)",
                border: `${isFree ? 2 : 1}px solid ${
                  isStamped || isFree ? accentColor : "var(--card-border)"
                }`,
                borderRadius: `${params.cardRadius}px`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "8px 32px",
                userSelect: "none",
                overflow: "hidden",
                boxShadow: isStamped
                  ? `0 0 ${params.glowIntensity}px ${glowColor}`
                  : "none",
              }}
            >
              {/* Stamp fill animation */}
              <AnimatePresence>
                {isStamped && !isFree && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{
                      duration: 0.45,
                      ease: [0.34, 1.25, 0.64, 1],
                    }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: accentColor,
                      borderRadius: `${params.cardRadius - 1}px`,
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Ripple on reveal */}
              <AnimatePresence>
                {isStamped && !isFree && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0.6 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      border: `2px solid ${accentColor}`,
                      borderRadius: `${params.cardRadius}px`,
                      pointerEvents: "none",
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Label */}
              <motion.span
                animate={{
                  color: isStamped ? "var(--stamp-text)" : "var(--text)",
                  scale: isStamped ? 1.05 : 1,
                }}
                transition={{ duration: 0.3 }}
                style={{
                  fontSize: "clamp(0.6rem, 1.3vw, 1.05rem)",
                  fontWeight: isStamped ? 700 : 600,
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                  position: "relative",
                  zIndex: 2,
                  fontFamily: "var(--font-sans)",
                }}
              >
                {topic}
              </motion.span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
