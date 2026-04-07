"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";

// ── Types ─────────────────────────────────────────────────────────────────
export type Persona = "top" | "good";

export interface ScoreScreenProps {
  persona: Persona;
  onContinue: () => void;
  spacing: any;
  typography: any;
  colors: any;
  score: number;
}

// ── Tier data ─────────────────────────────────────────────────────────────
const TIERS = [
  { label: "Tier 5", min: 0, max: 20, color: "#e0e0e0" },
  { label: "Tier 4", min: 20, max: 40, color: "#c4c4c4" },
  { label: "Tier 3", min: 40, max: 60, color: "#8bb8b2" },
  { label: "Tier 2", min: 60, max: 80, color: "#2a6d65" },
  { label: "Tier 1", min: 80, max: 100, color: "#056257" },
];

function getTierForScore(score: number) {
  const tier =
    TIERS.find((t) => score >= t.min && score < t.max) ||
    TIERS[TIERS.length - 1];
  const tierNum = TIERS.indexOf(tier) + 1; // 1=Tier5, 5=Tier1
  const isTop = tier.label === "Tier 1";
  return {
    tier,
    tierNum: 6 - tierNum, // 1 for Tier 1, 5 for Tier 5
    label: isTop ? "top tier" : tier.label.toLowerCase(),
    isTop,
  };
}

// ── Persona defaults (factorsHeader only — parent handles flow-level defaults) ──
export const PERSONA_DEFAULTS = {
  top: {
    factorsHeader: "What\u2019s keeping your rate low",
  },
  good: {
    factorsHeader: "What\u2019s helping keep your rate low",
  },
} as const;

// ── Content data ──────────────────────────────────────────────────────────
const FACTORS = [
  { title: "Non-smoker", description: "This is key to getting low rates" },
  { title: "Age", description: "32 is an optimal age to get life insurance" },
  {
    title: "Great health",
    description: "You\u2019re in the top 29% of all applicants",
  },
];

// ── Gauge with animated needle ────────────────────────────────────────────
function TieredGauge({
  score,
  animatedScore,
}: {
  score: number;
  animatedScore: number;
}) {
  const size = 220;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 84;
  const strokeWidth = 18;
  const arcDegrees = 270;
  const startAngle = 180 + (360 - arcDegrees) / 2;

  const polarToCartesian = (angle: number, r: number) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  const describeArc = (startDeg: number, sweepDeg: number, r: number) => {
    if (sweepDeg <= 0) return "";
    const start = polarToCartesian(startDeg, r);
    const end = polarToCartesian(startDeg + sweepDeg, r);
    const largeArc = sweepDeg > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
  };

  // Use the animated score for needle position
  const scorePct = Math.min(animatedScore / 100, 1);
  const scoreAngle = startAngle + arcDegrees * scorePct;
  const displayScore = Math.round(animatedScore);
  const tierInfo = getTierForScore(displayScore);
  // Show tier label only once animation is nearly complete
  const showTierLabel = animatedScore >= score - 1;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Round end caps at start and end of arc */}
        <path
          d={describeArc(startAngle, 0.1, radius)}
          fill="none"
          stroke={TIERS[0].color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <path
          d={describeArc(startAngle + arcDegrees - 0.1, 0.1, radius)}
          fill="none"
          stroke={TIERS[TIERS.length - 1].color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Tier segments */}
        {TIERS.map((tier) => {
          const segStart = startAngle + (tier.min / 100) * arcDegrees;
          const segSweep = ((tier.max - tier.min) / 100) * arcDegrees;
          return (
            <path
              key={tier.label}
              d={describeArc(segStart, segSweep, radius)}
              fill="none"
              stroke={tier.color}
              strokeWidth={strokeWidth}
              strokeLinecap="butt"
            />
          );
        })}
        {/* Tier divider lines */}
        {TIERS.slice(1).map((tier) => {
          const angle = startAngle + (tier.min / 100) * arcDegrees;
          const inner = polarToCartesian(angle, radius - strokeWidth / 2 - 1);
          const outer = polarToCartesian(angle, radius + strokeWidth / 2 + 1);
          return (
            <line
              key={tier.label + "-gap"}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke="white"
              strokeWidth={3}
            />
          );
        })}
        {/* Needle indicator */}
        {(() => {
          const inner = polarToCartesian(
            scoreAngle,
            radius - strokeWidth / 2 - 4
          );
          const outer = polarToCartesian(
            scoreAngle,
            radius + strokeWidth / 2 + 4
          );
          return (
            <line
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke="#272727"
              strokeWidth={3}
              strokeLinecap="round"
            />
          );
        })()}
      </svg>
      {/* Center score display */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ transform: "translateY(4px)" }}
      >
        <span
          className="leading-none text-black"
          style={{
            fontSize: 48,
            fontWeight: 700,
            fontFamily: "var(--font-display)",
          }}
        >
          {displayScore}
        </span>
        <motion.span
          className="leading-5 uppercase font-medium text-[11px]"
          style={{ color: "#056257", letterSpacing: "0.1em" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: showTierLabel ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {tierInfo.label}
        </motion.span>
      </div>
    </div>
  );
}

// ── Supporting UI components ──────────────────────────────────────────────
function CheckIcon({ size, bgColor }: { size: number; bgColor: string }) {
  return (
    <div
      className="rounded-full flex items-center justify-center shrink-0"
      style={{ width: size, height: size, backgroundColor: bgColor }}
    >
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 16 16" fill="none">
        <path
          d="M3.5 8.5L6.5 11.5L12.5 4.5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function FactorRow({
  title,
  description,
  showDivider = true,
  titleSize,
  descSize,
  rowGap,
}: {
  title: string;
  description: string;
  showDivider?: boolean;
  titleSize: number;
  descSize: number;
  rowGap: number;
}) {
  return (
    <>
      <div className="flex flex-col py-1" style={{ gap: rowGap }}>
        <span
          className="font-sans font-medium text-gray-100"
          style={{ fontSize: titleSize, lineHeight: "18px" }}
        >
          {title}
        </span>
        <span
          className="font-sans text-gray-80"
          style={{ fontSize: descSize, lineHeight: "18px" }}
        >
          {description}
        </span>
      </div>
      {showDivider && <div className="w-full h-px bg-gray-5" />}
    </>
  );
}

function FactorsCard({
  icon,
  header,
  factors,
  spacing,
  typography,
  colors,
}: {
  icon: React.ReactNode;
  header: string;
  factors: { title: string; description: string }[];
  spacing: any;
  typography: any;
  colors: any;
}) {
  return (
    <div
      className="flex flex-col"
      style={{
        backgroundColor: colors.cardBg,
        borderRadius: spacing.cardBorderRadius,
        paddingLeft: spacing.cardPaddingX,
        paddingRight: spacing.cardPaddingX,
        paddingTop: spacing.cardPaddingY,
        paddingBottom: spacing.cardPaddingY,
        gap: spacing.cardGap,
      }}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span
          className="font-sans font-medium text-gray-100"
          style={{ fontSize: typography.cardHeaderSize, lineHeight: "20px" }}
        >
          {header}
        </span>
      </div>
      <div
        className="flex flex-col"
        style={{
          paddingLeft: spacing.factorListPaddingLeft,
          gap: spacing.factorRowGap,
        }}
      >
        {factors.map((f, i) => (
          <FactorRow
            key={f.title}
            title={f.title}
            description={f.description}
            showDivider={i < factors.length - 1}
            titleSize={typography.factorTitleSize}
            descSize={typography.factorDescSize}
            rowGap={spacing.factorTextGap}
          />
        ))}
      </div>
    </div>
  );
}

// ── Score Screen ──────────────────────────────────────────────────────────
export default function ScoreScreen({
  persona,
  onContinue,
  spacing,
  typography,
  colors,
  score,
}: ScoreScreenProps) {
  const tierInfo = getTierForScore(score);

  // Persona-specific messaging
  const title = tierInfo.isTop
    ? "Your health profile lands you in our top tier"
    : `Your health profile lands you in ${tierInfo.tier.label.toLowerCase()}`;
  const subtitle = tierInfo.isTop
    ? "You\u2019re getting one of our best rates"
    : "You\u2019re getting a competitive rate";

  // ── Animated score (needle + counting number) ───────────────────────────
  const motionScore = useMotionValue(0);
  const [animatedScore, setAnimatedScore] = useState(0);
  const prevScoreRef = useRef(score);
  const [gaugeReady, setGaugeReady] = useState(false);

  useEffect(() => {
    // Reset animation state when score target changes significantly
    const isInitial = prevScoreRef.current !== score || !gaugeReady;
    prevScoreRef.current = score;

    // Animate from current position to new score
    const controls = animate(motionScore, score, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (latest) => setAnimatedScore(latest),
      onComplete: () => setGaugeReady(true),
    });

    return () => controls.stop();
  }, [score, motionScore]);

  return (
    <div className="relative h-full overflow-y-auto">
      {/* Scrollable content area — 128px bottom padding for sticky CTA */}
      <div
        className="flex flex-col"
        style={{
          paddingLeft: spacing.contentPaddingX,
          paddingRight: spacing.contentPaddingX,
          paddingTop: spacing.contentPaddingTop,
          paddingBottom: 128,
          gap: spacing.sectionGap,
        }}
      >
        {/* Title + subtitle — fade-slide up, staggered */}
        <div
          className="flex flex-col"
          style={{ gap: spacing.titleSubtitleGap }}
        >
          <motion.h1
            className="font-display font-bold text-gray-100"
            style={{
              fontSize: typography.titleSize,
              lineHeight: `${typography.titleLineHeight}px`,
              letterSpacing: "-0.03px",
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0 }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="font-sans text-gray-80"
            style={{
              fontSize: typography.subtitleSize,
              lineHeight: "20px",
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Gauge — fades in, needle animates from 0 to score */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
        >
          <TieredGauge score={score} animatedScore={animatedScore} />
        </motion.div>

        {/* Factors card — fade-slide up after gauge animation completes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 1.4 }}
        >
          <FactorsCard
            icon={
              <CheckIcon
                size={colors.checkIconSize}
                bgColor={colors.checkIconBg}
              />
            }
            header={PERSONA_DEFAULTS[persona].factorsHeader}
            factors={FACTORS}
            spacing={spacing}
            typography={typography}
            colors={colors}
          />
        </motion.div>
      </div>

      {/* Sticky bottom CTA — stays visible while scrolling */}
      <div
        className="sticky bottom-0 left-0 right-0 bg-white py-4 px-4"
        style={{ boxShadow: "0px -2px 4px rgba(16,24,40,0.06)" }}
      >
        <button
          onClick={onContinue}
          className="w-full flex items-center justify-center font-sans font-medium text-white"
          style={{
            backgroundColor: colors.buttonBg,
            minHeight: typography.buttonHeight,
            borderRadius: typography.buttonRadius,
            fontSize: typography.buttonSize,
            lineHeight: "28px",
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
