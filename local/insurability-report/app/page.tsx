"use client";

import { useState, useCallback } from "react";
import { useDialKit } from "dialkit";
import { AnimatePresence, motion } from "motion/react";
import PhoneFrame from "@/components/PhoneFrame";
import EthosHeader from "@/components/EthosHeader";
import ComputingResults from "@/components/screens/ComputingResults";
import ScoreScreen from "@/components/screens/ScoreScreen";
import FindingCarrier from "@/components/screens/FindingCarrier";
import ApprovalScreen from "@/components/screens/ApprovalScreen";

// ── Types ─────────────────────────────────────────────────────────────────
type Persona = "top" | "good";
type Screen = "computing" | "score" | "finding" | "approval";

const PERSONA_SCORE_DEFAULTS = { top: 91, good: 77 } as const;

// ── Main ───────────────────────────────────────────────────────────────────
export default function Home() {
  const [persona, setPersona] = useState<Persona>("top");
  const [screen, setScreen] = useState<Screen>("computing");

  // DialKit shared controls (passed to score screen)
  const shared = useDialKit("Shared", {
    spacing: {
      _collapsed: true,
      contentPaddingX: [24, 0, 32], contentPaddingTop: [24, 0, 48],
      sectionGap: [16, 8, 64], titleSubtitleGap: [8, 0, 24],
      cardPaddingX: [12, 0, 32], cardPaddingY: [24, 8, 48],
      cardGap: [16, 4, 32], factorListPaddingLeft: [36, 0, 60],
      factorRowGap: [12, 0, 24], factorTextGap: [3, 0, 12],
      cardBorderRadius: [12, 0, 24],
    },
    typography: {
      _collapsed: true,
      titleSize: [24, 16, 48], titleLineHeight: [32, 20, 56],
      subtitleSize: [16, 10, 28], cardHeaderSize: [16, 10, 28],
      factorTitleSize: [14, 8, 22], factorDescSize: [14, 8, 22],
      buttonSize: [18, 12, 32], buttonHeight: [52, 40, 80],
      buttonRadius: [8, 0, 20],
    },
    colors: {
      _collapsed: true,
      cardBg: "#f3f7f7", checkIconBg: "#056257",
      checkIconSize: [28, 16, 48], buttonBg: "#056257",
    },
  });

  const score = PERSONA_SCORE_DEFAULTS[persona];

  // ── Navigation callbacks ───────────────────────────────────────────────
  const goToScore = useCallback(() => setScreen("score"), []);
  const goToFinding = useCallback(() => setScreen("finding"), []);
  const goToApproval = useCallback(() => setScreen("approval"), []);
  const restart = useCallback(() => setScreen("computing"), []);

  // ── Persona switch (resets flow) ───────────────────────────────────────
  const switchPersona = useCallback((p: Persona) => {
    setPersona(p);
    setScreen("computing");
  }, []);

  return (
    <div className="min-h-screen bg-canvas flex flex-col items-center justify-center gap-6 p-8">
      {/* Persona toggle + flow controls */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="font-sans text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>Persona:</span>
          <div className="flex rounded-lg overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
            {([["top", "Top tier (91)"], ["good", "Good (77)"]] as [Persona, string][]).map(([key, label]) => (
              <button
                key={key}
                onClick={() => switchPersona(key)}
                className="px-4 py-1.5 font-sans text-sm font-medium transition-all"
                style={{
                  backgroundColor: persona === key ? "rgba(255,255,255,0.15)" : "transparent",
                  color: persona === key ? "#fff" : "rgba(255,255,255,0.5)",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Screen jump buttons for prototyping convenience */}
        <div className="flex rounded-lg overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
          {([
            ["computing", "1"],
            ["score", "2"],
            ["finding", "3"],
            ["approval", "4"],
          ] as [Screen, string][]).map(([s, num]) => (
            <button
              key={s}
              onClick={() => setScreen(s)}
              className="w-8 h-8 font-sans text-xs font-medium transition-all flex items-center justify-center"
              style={{
                backgroundColor: screen === s ? "rgba(255,255,255,0.15)" : "transparent",
                color: screen === s ? "#fff" : "rgba(255,255,255,0.35)",
              }}
              title={s}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      <PhoneFrame>
        <div style={{ height: "100%" }} className="flex flex-col">
          {/* EthosHeader shows on all screens except interstitials */}
          {(screen === "score" || screen === "approval") && <EthosHeader />}

          <div className="flex-1 min-h-0 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={screen}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
              {screen === "computing" && (
                <ComputingResults onComplete={goToScore} persona={persona} />
              )}

              {screen === "score" && (
                <ScoreScreen
                  persona={persona}
                  onContinue={goToFinding}
                  spacing={shared.spacing}
                  typography={shared.typography}
                  colors={shared.colors}
                  score={score}
                />
              )}

              {screen === "finding" && (
                <FindingCarrier onComplete={goToApproval} persona={persona} />
              )}

              {screen === "approval" && (
                <ApprovalScreen persona={persona} onRestart={restart} />
              )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
}
