"use client";

import { useRef } from "react";
import { motion } from "motion/react";

// ── Types ────────────────────────────────────────────────────────────────────
interface ApprovalScreenProps {
  persona: "top" | "good"; // Top tier vs non-top tier applicant
  onRestart: () => void; // Called to restart the flow from the beginning
}

// ── Persona-specific content ─────────────────────────────────────────────────
const PERSONA_CONTENT = {
  top: {
    subheading:
      "You've qualified for one of our best rates. The hard part is over.",
    rate: "$24/mo",
    showRateBadge: true,
  },
  good: {
    subheading: "You're just a few steps away from protecting your family.",
    rate: "$38/mo",
    showRateBadge: false,
  },
};

const NEXT_STEPS = [
  "Select a beneficiary to receive your payout",
  "Review your coverage options and rate",
  "Start coverage — it only takes a few minutes",
];

// ── Stagger timing helpers ───────────────────────────────────────────────────
const CHECKMARK_DELAY = 0;
const HEADING_DELAY = 0.2;
const CARD_BASE_DELAY = 0.4;
const CARD_STAGGER = 0.15;

// ── Animated checkmark SVG ───────────────────────────────────────────────────
function CheckmarkIcon() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        delay: CHECKMARK_DELAY,
        duration: 0.4,
        type: "spring",
        stiffness: 300,
        damping: 18,
      }}
      style={{
        width: 56,
        height: 56,
        borderRadius: "50%",
        backgroundColor: "#056257", // cypress-100
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto",
      }}
    >
      <svg
        width={28}
        height={28}
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          d="M5 13l4 4L19 7"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.3, duration: 0.35, ease: "easeOut" }}
        />
      </svg>
    </motion.div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function ApprovalScreen({
  persona,
  onRestart,
}: ApprovalScreenProps) {
  const content = PERSONA_CONTENT[persona];
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "#ffffff",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Scrollable content area */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: "auto",
          paddingTop: 24,
          paddingLeft: 24,
          paddingRight: 24,
          paddingBottom: 128, // Clear fixed CTA
        }}
      >
        {/* ── Celebration Header ──────────────────────────────────── */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <CheckmarkIcon />

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: HEADING_DELAY, duration: 0.4, ease: "easeOut" }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 28,
              fontWeight: 700,
              color: "#272727", // gray-100
              marginTop: 16,
              marginBottom: 8,
              lineHeight: 1.15,
            }}
          >
            Congrats! You&rsquo;re approved.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: HEADING_DELAY + 0.1,
              duration: 0.4,
              ease: "easeOut",
            }}
            style={{
              fontSize: 15,
              lineHeight: 1.5,
              color: "#525252", // gray-80
              margin: 0,
            }}
          >
            {content.subheading}
          </motion.p>
        </div>

        {/* ── Policy Summary Card ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: CARD_BASE_DELAY,
            duration: 0.4,
            ease: "easeOut",
          }}
          style={{
            backgroundColor: "#f3f7f7", // cypress-5
            borderRadius: 12,
            padding: 20,
            marginBottom: 16,
          }}
        >
          <h2
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#272727",
              margin: 0,
              marginBottom: 16,
            }}
          >
            Your coverage summary
          </h2>

          {/* Coverage amount */}
          <SummaryRow label="Coverage amount" value="$500,000" />
          <Divider />

          {/* Term */}
          <SummaryRow label="Term" value="20-year term" />
          <Divider />

          {/* Monthly rate */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 12,
              paddingBottom: 12,
            }}
          >
            <span
              style={{
                fontSize: 14,
                color: "#525252",
              }}
            >
              Estimated monthly rate
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {content.showRateBadge && (
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#056257",
                    backgroundColor: "#e6f0ef", // light cypress tint
                    padding: "2px 8px",
                    borderRadius: 4,
                    letterSpacing: 0.2,
                  }}
                >
                  Great rate
                </span>
              )}
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#272727",
                }}
              >
                {content.rate}
              </span>
            </div>
          </div>
          <Divider />

          {/* Carrier */}
          <SummaryRow label="Carrier" value="Banner Life Insurance Company" />
        </motion.div>

        {/* ── What's Next Card ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: CARD_BASE_DELAY + CARD_STAGGER,
            duration: 0.4,
            ease: "easeOut",
          }}
          style={{
            backgroundColor: "#f3f7f7",
            borderRadius: 12,
            padding: 20,
          }}
        >
          <h2
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#272727",
              margin: 0,
              marginBottom: 16,
            }}
          >
            What&rsquo;s next
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {NEXT_STEPS.map((step, i) => (
              <div
                key={i}
                style={{ display: "flex", alignItems: "flex-start", gap: 12 }}
              >
                {/* Step number circle */}
                <div
                  style={{
                    width: 28,
                    height: 28,
                    minWidth: 28,
                    borderRadius: "50%",
                    backgroundColor: "#056257",
                    color: "#ffffff",
                    fontSize: 13,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 1,
                  }}
                >
                  {i + 1}
                </div>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.5,
                    color: "#525252",
                    margin: 0,
                  }}
                >
                  {step}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Fixed Bottom CTA ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.3, ease: "easeOut" }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "12px 24px 24px",
          backgroundColor: "#ffffff",
          boxShadow: "0 -1px 8px rgba(0, 0, 0, 0.06)",
        }}
      >
        <button
          onClick={onRestart}
          style={{
            width: "100%",
            minHeight: 52,
            backgroundColor: "#272727",
            color: "#ffffff",
            border: "none",
            borderRadius: 8,
            fontSize: 18,
            fontWeight: 600,
            cursor: "pointer",
            transition: "background-color 150ms ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#3a3a3a")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#272727")
          }
        >
          Restart demo ↺
        </button>
      </motion.div>
    </div>
  );
}

// ── Subcomponents ────────────────────────────────────────────────────────────

/** A single label/value row in the policy summary card */
function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 12,
        paddingBottom: 12,
      }}
    >
      <span style={{ fontSize: 14, color: "#525252" }}>{label}</span>
      <span style={{ fontSize: 15, fontWeight: 600, color: "#272727" }}>
        {value}
      </span>
    </div>
  );
}

/** Thin horizontal divider between summary rows */
function Divider() {
  return (
    <div
      style={{
        height: 1,
        backgroundColor: "#e2e2e2",
        margin: 0,
      }}
    />
  );
}
