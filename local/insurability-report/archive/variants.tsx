/**
 * ══════════════════════════════════════════════════════════════════════════
 * ARCHIVED VARIANT EXPLORATIONS (A–H, J–L)
 * ══════════════════════════════════════════════════════════════════════════
 *
 * These are the original design explorations for the insurability score screen.
 * Variant I was selected as the working variant and lives in app/page.tsx.
 *
 * This file is a preservation archive — it is NOT meant to be imported or
 * executed. It exists so engineers and designers can reference earlier ideas.
 *
 * Archived: 2026-04-06
 * ══════════════════════════════════════════════════════════════════════════
 */

"use client";

import { useState, useEffect } from "react";
import { useDialKit } from "dialkit";
import PhoneFrame from "@/components/PhoneFrame";
import EthosHeader from "@/components/EthosHeader";

// ── Types ─────────────────────────────────────────────────────────────────
type VariantKey = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L";

type Persona = "top" | "good";

type SharedControls = {
  spacing: any;
  typography: any;
  colors: any;
  persona: Persona;
};

// ── Tier data (shared by several variants) ────────────────────────────────
const TIERS = [
  { label: "Tier 5", min: 0, max: 20, color: "#e0e0e0" },
  { label: "Tier 4", min: 20, max: 40, color: "#c4c4c4" },
  { label: "Tier 3", min: 40, max: 60, color: "#8bb8b2" },
  { label: "Tier 2", min: 60, max: 80, color: "#2a6d65" },
  { label: "Tier 1", min: 80, max: 100, color: "#056257" },
];

function getTierForScore(score: number) {
  const tier = TIERS.find(t => score >= t.min && score < t.max) || TIERS[TIERS.length - 1];
  const tierNum = TIERS.indexOf(tier) + 1; // 1=Tier5, 5=Tier1
  const isTop = tier.label === "Tier 1";
  return {
    tier,
    tierNum: 6 - tierNum, // 1 for Tier 1, 5 for Tier 5
    label: isTop ? "top tier" : tier.label.toLowerCase(),
    isTop,
  };
}

// ── Shared factors + animation style ──────────────────────────────────────
const FACTORS = [
  { title: "Non-smoker", description: "This is key to getting low rates" },
  { title: "Age", description: "32 is an optimal age to get life insurance" },
  { title: "Great health", description: "You\u2019re in the top 29% of all applicants" },
];

const FADE_SLIDE_STYLE = `@keyframes fadeSlideUp { 0% { opacity: 0; transform: translateY(16px); } 100% { opacity: 1; transform: translateY(0); } }`;

// ── Persona-dependent defaults ────────────────────────────────────────────
const PERSONA_DEFAULTS = {
  top: {
    score: 91,
    tier: 1,
    tierLabel: "Tier 1",
    gaugeLabel: "excellent",
    factorsHeader: "What\u2019s keeping your rate low",
  },
  good: {
    score: 77,
    tier: 2,
    tierLabel: "Tier 2",
    gaugeLabel: "good",
    factorsHeader: "What\u2019s helping keep your rate low",
  },
} as const;

// ── Icons ─────────────────────────────────────────────────────────────────
function CheckIcon({ size, bgColor }: { size: number; bgColor: string }) {
  return (
    <div className="rounded-full flex items-center justify-center shrink-0" style={{ width: size, height: size, backgroundColor: bgColor }}>
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 16 16" fill="none">
        <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// ── Factor row ────────────────────────────────────────────────────────────
function FactorRow({ title, description, showDivider = true, titleSize, descSize, rowGap }: {
  title: string; description: string; showDivider?: boolean; titleSize: number; descSize: number; rowGap: number;
}) {
  return (
    <>
      <div className="flex flex-col py-1" style={{ gap: rowGap }}>
        <span className="font-sans font-medium text-gray-100" style={{ fontSize: titleSize, lineHeight: "18px" }}>{title}</span>
        <span className="font-sans text-gray-80" style={{ fontSize: descSize, lineHeight: "18px" }}>{description}</span>
      </div>
      {showDivider && <div className="w-full h-px bg-gray-5" />}
    </>
  );
}

// ── Shared layout wrapper for factors card ────────────────────────────────
function FactorsCard({ icon, header, factors, spacing, typography, colors }: {
  icon: React.ReactNode; header: string;
  factors: { title: string; description: string }[];
  spacing: any; typography: any; colors: any;
}) {
  return (
    <div className="flex flex-col" style={{ backgroundColor: colors.cardBg, borderRadius: spacing.cardBorderRadius, paddingLeft: spacing.cardPaddingX, paddingRight: spacing.cardPaddingX, paddingTop: spacing.cardPaddingY, paddingBottom: spacing.cardPaddingY, gap: spacing.cardGap }}>
      <div className="flex items-center gap-2">
        {icon}
        <span className="font-sans font-medium text-gray-100" style={{ fontSize: typography.cardHeaderSize, lineHeight: "20px" }}>{header}</span>
      </div>
      <div className="flex flex-col" style={{ paddingLeft: spacing.factorListPaddingLeft, gap: spacing.factorRowGap }}>
        {factors.map((f, i) => (
          <FactorRow key={f.title} title={f.title} description={f.description} showDivider={i < factors.length - 1} titleSize={typography.factorTitleSize} descSize={typography.factorDescSize} rowGap={spacing.factorTextGap} />
        ))}
      </div>
    </div>
  );
}

// ── Score gauge component (used by A, B, C) ───────────────────────────────
function ScoreGauge({
  score, label, radius, strokeWidth, arcDegrees, scoreColor, trackColor,
  scoreFontSize, labelFontSize, scoreLabelGap, centerOffsetY,
}: {
  score: number; label: string; radius: number; strokeWidth: number;
  arcDegrees: number; scoreColor: string; trackColor: string;
  scoreFontSize: number; labelFontSize: number; scoreLabelGap: number; centerOffsetY: number;
}) {
  const gaugeSize = (radius + strokeWidth) * 2 + 4;
  const cx = gaugeSize / 2;
  const cy = gaugeSize / 2;
  const startAngle = 180 + (360 - arcDegrees) / 2;
  const scorePct = Math.min(score / 100, 1);
  const scoreArc = arcDegrees * scorePct;

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

  return (
    <div className="relative" style={{ width: gaugeSize, height: gaugeSize }}>
      <svg width={gaugeSize} height={gaugeSize} viewBox={`0 0 ${gaugeSize} ${gaugeSize}`}>
        <path d={describeArc(startAngle, arcDegrees, radius)} fill="none" stroke={trackColor} strokeWidth={strokeWidth} strokeLinecap="round" />
        <path d={describeArc(startAngle, scoreArc, radius)} fill="none" stroke={scoreColor} strokeWidth={strokeWidth} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ gap: scoreLabelGap, transform: `translateY(${centerOffsetY}px)` }}>
        <span className="leading-none text-black" style={{ fontSize: scoreFontSize, fontWeight: 700, fontFamily: "var(--font-display)" }}>{score}</span>
        <span className="leading-5 text-black uppercase" style={{ fontSize: labelFontSize, fontWeight: 500, letterSpacing: "0.1em" }}>{label}</span>
      </div>
    </div>
  );
}

// ── Horizontal segmented bar (Variant J) ──────────────────────────────────
function HorizontalTierBar({ score }: { score: number }) {
  const tiers = [
    { color: "#e0e0e0" }, { color: "#c4c4c4" }, { color: "#8bb8b2" },
    { color: "#2a6d65" }, { color: "#056257" },
  ];
  const activeTierIndex = Math.min(Math.floor(score / 20), 4);
  const barHeight = 16;
  const gap = 4;

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex w-full" style={{ gap, height: barHeight }}>
        {tiers.map((tier, i) => (
          <div
            key={i}
            className="flex-1 relative"
            style={{
              backgroundColor: tier.color,
              borderRadius: i === 0 ? `${barHeight / 2}px 0 0 ${barHeight / 2}px` : i === tiers.length - 1 ? `0 ${barHeight / 2}px ${barHeight / 2}px 0` : 0,
              opacity: i <= activeTierIndex ? 1 : 0.35,
            }}
          >
            {i === activeTierIndex && (
              <div className="absolute" style={{ left: `${((score - i * 20) / 20) * 100}%`, top: -6, bottom: -6, width: 3, backgroundColor: "#272727", borderRadius: 2, transform: "translateX(-1.5px)" }} />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between px-1">
        <span className="font-sans text-[11px] text-gray-60">Tier 5</span>
        <span className="font-sans text-[11px] font-semibold" style={{ color: "#056257" }}>Tier 1</span>
      </div>
    </div>
  );
}

// ── Vertical thermometer (Variant K) ──────────────────────────────────────
function VerticalTierStack({ score }: { score: number }) {
  const tiers = [
    { label: "Tier 1", color: "#056257", min: 80 },
    { label: "Tier 2", color: "#2a6d65", min: 60 },
    { label: "Tier 3", color: "#8bb8b2", min: 40 },
    { label: "Tier 4", color: "#c4c4c4", min: 20 },
    { label: "Tier 5", color: "#e0e0e0", min: 0 },
  ];
  const activeTierIndex = tiers.findIndex(t => score >= t.min);
  const rowHeight = 40;
  const gap = 3;

  return (
    <div className="flex flex-col w-full" style={{ gap }}>
      {tiers.map((tier, i) => {
        const isActive = i === activeTierIndex;
        const isPast = i > activeTierIndex;
        return (
          <div key={tier.label} className="flex items-center relative" style={{ height: rowHeight, borderRadius: 8, backgroundColor: tier.color, opacity: isPast ? 0.3 : 1 }}>
            {isActive && (
              <div className="absolute flex items-center gap-2" style={{ right: 12 }}>
                <span className="font-sans text-[12px] font-semibold text-white uppercase tracking-wider">You are here</span>
                <div className="rounded-full" style={{ width: 8, height: 8, backgroundColor: "white", boxShadow: "0 0 0 3px rgba(255,255,255,0.3)" }} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Animated comparison bars (Variant C) ──────────────────────────────────
function ComparisonBars({ score, avgScore, barHeight, userColor, avgColor }: {
  score: number; avgScore: number; barHeight: number; userColor: string; avgColor: string;
}) {
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    setAnimated(false);
    const t = setTimeout(() => setAnimated(true), 400);
    return () => clearTimeout(t);
  }, [score, avgScore]);

  return (
    <div className="flex flex-col gap-6 w-full py-4">
      <div className="flex items-center gap-3">
        <span className="font-sans text-[13px] font-medium text-gray-100 w-[80px] shrink-0">You</span>
        <div className="flex-1 rounded-full" style={{ height: barHeight, backgroundColor: "#f0f0f0" }}>
          <div className="h-full rounded-full" style={{ width: animated ? `${score}%` : "0%", backgroundColor: userColor, transition: "width 1.2s cubic-bezier(0.16, 1, 0.3, 1)" }} />
        </div>
        <span className="font-sans font-medium text-[14px] text-gray-100 w-[28px] text-right tabular-nums">{score}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-sans text-[13px] font-medium text-gray-80 w-[80px] shrink-0">Average</span>
        <div className="flex-1 rounded-full" style={{ height: barHeight, backgroundColor: "#f0f0f0" }}>
          <div className="h-full rounded-full" style={{ width: animated ? `${avgScore}%` : "0%", backgroundColor: avgColor, transition: "width 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s" }} />
        </div>
        <span className="font-sans font-medium text-[14px] text-gray-80 w-[28px] text-right tabular-nums">{avgScore}</span>
      </div>
    </div>
  );
}

// ── Celebration badge (Variant B) ─────────────────────────────────────────
function CelebrationBadge() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="rounded-full flex items-center justify-center" style={{ width: 80, height: 80, background: "linear-gradient(135deg, #056257 0%, #2a6d65 50%, #04463e 100%)", boxShadow: "0 8px 32px rgba(5, 98, 87, 0.3)", animation: "badgePop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both" }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.3L12 14.3 7.2 16.8l.9-5.3L4.2 7.7l5.4-.8L12 2z" fill="white" />
        </svg>
      </div>
      <style>{`@keyframes badgePop { 0% { transform: scale(0); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }`}</style>
    </div>
  );
}

// ── Animated shield (Variant F) ───────────────────────────────────────────
function AnimatedShield() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 140, height: 140 }}>
      <style>{`
        @keyframes shieldPulse { 0%, 100% { transform: scale(1); opacity: 0.15; } 50% { transform: scale(1.4); opacity: 0; } }
        @keyframes shieldGlow { 0%, 100% { transform: scale(1); opacity: 0.2; } 50% { transform: scale(1.2); opacity: 0.08; } }
        @keyframes shieldCheck { 0% { stroke-dashoffset: 24; } 100% { stroke-dashoffset: 0; } }
        @keyframes shieldFadeIn { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
      `}</style>
      <div className="absolute rounded-full" style={{ width: 120, height: 120, backgroundColor: "#056257", animation: "shieldPulse 2.5s ease-out infinite" }} />
      <div className="absolute rounded-full" style={{ width: 120, height: 120, backgroundColor: "#056257", animation: "shieldPulse 2.5s ease-out 0.8s infinite" }} />
      <div className="absolute rounded-full" style={{ width: 100, height: 100, backgroundColor: "#056257", animation: "shieldGlow 3s ease-in-out infinite" }} />
      <div className="relative rounded-full flex items-center justify-center" style={{ width: 80, height: 80, background: "linear-gradient(145deg, #056257 0%, #04463e 100%)", boxShadow: "0 4px 24px rgba(5, 98, 87, 0.35)", animation: "shieldFadeIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both" }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="1.5" />
          <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="24" style={{ animation: "shieldCheck 0.4s ease-out 0.8s both" }} />
        </svg>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// ── Per-variant components (each owns its own useDialKit) ────────────────
// ══════════════════════════════════════════════════════════════════════════

function VariantA({ shared }: { shared: SharedControls }) {
  const p = PERSONA_DEFAULTS[shared.persona];
  const v = useDialKit("A: Percentile", {
    score: [p.score, 0, 100],
    scoreLabel: { type: "text" as const, default: p.gaugeLabel },
    title: { type: "text" as const, default: shared.persona === "top" ? "Your rate will be lower than 86% of applicants" : "Your health profile is looking good" },
    subtitle: { type: "text" as const, default: shared.persona === "top" ? "Your profile score is among the best we\u2019ve seen." : "Your profile puts you in a strong position for a competitive rate." },
    gauge: {
      _collapsed: true,
      radius: [84, 40, 140], strokeWidth: [16, 4, 50], arcDegrees: [270, 180, 350],
      scoreFontSize: [48, 20, 80], labelFontSize: [11, 8, 24],
      scoreColor: "#2a6d65", trackColor: "#dae7e6",
      scoreLabelGap: [0, -10, 20], centerOffsetY: [4, -40, 40],
    },
  });
  return (
    <>
      <div className="flex flex-col" style={{ gap: shared.spacing.titleSubtitleGap }}>
        <h1 className="font-display font-bold text-gray-100" style={{ fontSize: shared.typography.titleSize, lineHeight: `${shared.typography.titleLineHeight}px`, letterSpacing: "-0.03px" }}>{v.title}</h1>
        <p className="font-sans text-gray-100" style={{ fontSize: shared.typography.subtitleSize, lineHeight: "20px" }}>{v.subtitle}</p>
      </div>
      <div className="flex justify-center">
        <ScoreGauge score={v.score} label={v.scoreLabel} radius={v.gauge.radius} strokeWidth={v.gauge.strokeWidth} arcDegrees={v.gauge.arcDegrees} scoreColor={v.gauge.scoreColor} trackColor={v.gauge.trackColor} scoreFontSize={v.gauge.scoreFontSize} labelFontSize={v.gauge.labelFontSize} scoreLabelGap={v.gauge.scoreLabelGap} centerOffsetY={v.gauge.centerOffsetY} />
      </div>
    </>
  );
}

function VariantB({ shared, hideChrome }: { shared: SharedControls; hideChrome: (hide: boolean) => void }) {
  const [phase, setPhase] = useState(0);
  const p = PERSONA_DEFAULTS[shared.persona];
  const v = useDialKit("B: Celebration", {
    score: [p.score, 0, 100],
    scoreLabel: { type: "text" as const, default: p.gaugeLabel },
    title: { type: "text" as const, default: shared.persona === "top" ? "Your health has unlocked the best possible rates" : "Your health profile is working in your favor" },
    subtitle: { type: "text" as const, default: shared.persona === "top" ? "Based on your profile, you qualify for our lowest pricing tier." : "You\u2019re in a good position \u2014 here\u2019s what\u2019s helping." },
    gauge: {
      _collapsed: true,
      radius: [84, 40, 140], strokeWidth: [16, 4, 50], arcDegrees: [270, 180, 350],
      scoreFontSize: [48, 20, 80], labelFontSize: [11, 8, 24],
      scoreColor: "#2a6d65", trackColor: "#dae7e6",
      scoreLabelGap: [0, -10, 20], centerOffsetY: [4, -40, 40],
    },
  });

  useEffect(() => { setPhase(0); }, []);
  useEffect(() => { hideChrome(phase === 0); }, [phase, hideChrome]);

  if (phase === 0) {
    return (
      <>
        <div className="flex flex-col items-center justify-center text-center gap-6" style={{ minHeight: 520 }}>
          <CelebrationBadge />
          <div className="flex flex-col items-center gap-3 px-4" style={{ animation: "fadeSlideUp 0.6s ease-out 0.5s both" }}>
            <h1 className="font-display font-bold text-gray-100" style={{ fontSize: 28, lineHeight: "34px", letterSpacing: "-0.03px" }}>{v.title}</h1>
            <p className="font-sans text-gray-80" style={{ fontSize: 16, lineHeight: "22px", animation: "fadeSlideUp 0.6s ease-out 0.8s both" }}>{v.subtitle}</p>
          </div>
          <button onClick={() => setPhase(1)} className="font-sans font-medium text-white rounded-full px-8 py-3 mt-4" style={{ backgroundColor: "#056257", fontSize: 15, animation: "fadeSlideUp 0.6s ease-out 1.1s both", boxShadow: "0 4px 16px rgba(5, 98, 87, 0.3)" }}>See your score</button>
        </div>
        <style>{FADE_SLIDE_STYLE}</style>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center text-center gap-2" style={{ animation: "fadeSlideUp 0.5s ease-out both" }}>
        <p className="font-sans text-[13px] font-medium uppercase tracking-wider" style={{ color: "#056257" }}>Your health score</p>
      </div>
      <div className="flex justify-center" style={{ animation: "fadeSlideUp 0.5s ease-out 0.2s both" }}>
        <ScoreGauge score={v.score} label={v.scoreLabel} radius={v.gauge.radius} strokeWidth={v.gauge.strokeWidth} arcDegrees={v.gauge.arcDegrees} scoreColor={v.gauge.scoreColor} trackColor={v.gauge.trackColor} scoreFontSize={v.gauge.scoreFontSize} labelFontSize={v.gauge.labelFontSize} scoreLabelGap={v.gauge.scoreLabelGap} centerOffsetY={v.gauge.centerOffsetY} />
      </div>
      <style>{FADE_SLIDE_STYLE}</style>
    </>
  );
}

function VariantC({ shared }: { shared: SharedControls }) {
  const p = PERSONA_DEFAULTS[shared.persona];
  const v = useDialKit("C: Comparison", {
    score: [p.score, 0, 100], avgScore: [58, 0, 100],
    title: { type: "text" as const, default: shared.persona === "top" ? "Your health score is well above average" : "Your health score is above average" },
    subtitle: { type: "text" as const, default: shared.persona === "top" ? "This means you qualify for significantly lower rates." : "That puts you in a good spot for a competitive rate." },
    bars: { _collapsed: true, barHeight: [8, 4, 48], userColor: "#2a6d65", avgColor: "#b0b0b0" },
  });
  return (
    <>
      <div className="flex flex-col" style={{ gap: shared.spacing.titleSubtitleGap }}>
        <h1 className="font-display font-bold text-gray-100" style={{ fontSize: shared.typography.titleSize, lineHeight: `${shared.typography.titleLineHeight}px`, letterSpacing: "-0.03px" }}>{v.title}</h1>
        <p className="font-sans text-gray-100" style={{ fontSize: shared.typography.subtitleSize, lineHeight: "20px" }}>{v.subtitle}</p>
      </div>
      <ComparisonBars score={v.score} avgScore={v.avgScore} barHeight={v.bars.barHeight} userColor={v.bars.userColor} avgColor={v.bars.avgColor} />
    </>
  );
}

function VariantD({ shared }: { shared: SharedControls }) {
  const v = useDialKit("D: Feel-good", {
    title: { type: "text" as const, default: shared.persona === "top" ? "Great news, Sarah" : "Good news, Sarah" },
    subtitle: { type: "text" as const, default: shared.persona === "top" ? "Your health and lifestyle put you in an excellent position for life insurance." : "Your health profile is solid \u2014 here\u2019s what\u2019s helping keep your rate competitive." },
  });
  return (
    <div className="flex flex-col items-center text-center gap-3">
      <div className="rounded-[24px] flex items-center justify-center" style={{ width: 72, height: 72, background: "linear-gradient(145deg, #e6efee 0%, #dae7e6 100%)" }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#056257" />
          <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h1 className="font-display font-bold text-gray-100" style={{ fontSize: shared.typography.titleSize, lineHeight: `${shared.typography.titleLineHeight}px` }}>{v.title}</h1>
      <p className="font-sans text-gray-80" style={{ fontSize: shared.typography.subtitleSize, lineHeight: "22px" }}>{v.subtitle}</p>
    </div>
  );
}

function VariantE({ shared }: { shared: SharedControls }) {
  const v = useDialKit("E: Family", {
    title: { type: "text" as const, default: shared.persona === "top" ? "Your family is in great hands" : "You\u2019re setting your family up well" },
    subtitle: { type: "text" as const, default: shared.persona === "top" ? "Your health profile qualifies you for our very best rates \u2014 let\u2019s find the right coverage." : "Your health profile puts you in a good position \u2014 let\u2019s find the right coverage." },
  });
  return (
    <>
      <div className="flex justify-center"><img src="/family.png" alt="Happy family illustration" style={{ width: 220, height: "auto" }} /></div>
      <div className="flex flex-col gap-2">
        <h1 className="font-display font-bold text-gray-100" style={{ fontSize: shared.typography.titleSize, lineHeight: `${shared.typography.titleLineHeight}px` }}>{v.title}</h1>
        <p className="font-sans text-gray-80" style={{ fontSize: shared.typography.subtitleSize, lineHeight: "22px" }}>{v.subtitle}</p>
      </div>
    </>
  );
}

function VariantF({ shared }: { shared: SharedControls }) {
  const v = useDialKit("F: Animated", {
    title: { type: "text" as const, default: shared.persona === "top" ? "You\u2019re in excellent shape" : "You\u2019re in good shape" },
    subtitle: { type: "text" as const, default: shared.persona === "top" ? "Everything about your profile points to low rates. Here\u2019s why." : "Here\u2019s what\u2019s helping keep your rate competitive." },
  });
  return (
    <>
      <div className="flex justify-center"><AnimatedShield /></div>
      <div className="flex flex-col items-center text-center gap-2">
        <h1 className="font-display font-bold text-gray-100" style={{ fontSize: shared.typography.titleSize, lineHeight: `${shared.typography.titleLineHeight}px` }}>{v.title}</h1>
        <p className="font-sans text-gray-80" style={{ fontSize: shared.typography.subtitleSize, lineHeight: "22px" }}>{v.subtitle}</p>
      </div>
    </>
  );
}

function VariantG({ shared, hideChrome }: { shared: SharedControls; hideChrome: (hide: boolean) => void }) {
  const [phase, setPhase] = useState(0);
  const v = useDialKit("G: Family motion", {
    heroTitle: { type: "text" as const, default: shared.persona === "top" ? "You qualified for a great rate" : "You\u2019re in a good position" },
    revealSubtitle: { type: "text" as const, default: shared.persona === "top" ? "Your health and age make this the perfect time to lock in coverage for your family." : "Your profile is working in your favor \u2014 here\u2019s what\u2019s helping." },
  });

  useEffect(() => {
    setPhase(0);
    const t = setTimeout(() => setPhase(1), 2200);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => { hideChrome(phase === 0); }, [phase, hideChrome]);

  return (
    <>
      <style>{`@keyframes gFadeSlideUp { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }`}</style>
      <div className="flex flex-col items-center text-center" style={{ gap: 16, minHeight: phase === 0 ? 480 : "auto", justifyContent: phase === 0 ? "center" : "flex-start", transition: "min-height 0.8s cubic-bezier(0.16, 1, 0.3, 1)" }}>
        <img src="/family.png" alt="Happy family" style={{ width: phase === 0 ? 240 : 180, height: "auto", transition: "width 0.8s cubic-bezier(0.16, 1, 0.3, 1)" }} />
        <h1 className="font-display font-bold text-gray-100" style={{ fontSize: phase === 0 ? 28 : shared.typography.titleSize, lineHeight: phase === 0 ? "34px" : `${shared.typography.titleLineHeight}px`, transition: "font-size 0.8s cubic-bezier(0.16, 1, 0.3, 1), line-height 0.8s cubic-bezier(0.16, 1, 0.3, 1)", animation: "gFadeSlideUp 0.6s ease-out 0.3s both" }}>{v.heroTitle}</h1>
        {phase === 1 && <p className="font-sans text-gray-80" style={{ fontSize: shared.typography.subtitleSize, lineHeight: "22px", animation: "gFadeSlideUp 0.5s ease-out 0.1s both" }}>{v.revealSubtitle}</p>}
      </div>
    </>
  );
}

function VariantH({ shared, hideChrome }: { shared: SharedControls; hideChrome: (hide: boolean) => void }) {
  const [phase, setPhase] = useState(0);
  const v = useDialKit("H: Trophy motion", {
    heroTitle: { type: "text" as const, default: shared.persona === "top" ? "You\u2019re getting a top-tier rate" : "You\u2019re getting a good rate" },
    revealSubtitle: { type: "text" as const, default: shared.persona === "top" ? "Most people don\u2019t qualify for rates this low. Here\u2019s what got you here." : "Here\u2019s what\u2019s working in your favor." },
  });

  useEffect(() => {
    setPhase(0);
    const t = setTimeout(() => setPhase(1), 2200);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => { hideChrome(phase === 0); }, [phase, hideChrome]);

  return (
    <>
      <style>{`@keyframes hFadeSlideUp { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }`}</style>
      <div className="flex flex-col items-center text-center" style={{ gap: 16, minHeight: phase === 0 ? 480 : "auto", justifyContent: phase === 0 ? "center" : "flex-start", transition: "min-height 0.8s cubic-bezier(0.16, 1, 0.3, 1)" }}>
        <img src="/trophy.png" alt="Trophy podium" style={{ width: phase === 0 ? 200 : 170, height: "auto", transition: "width 0.8s cubic-bezier(0.16, 1, 0.3, 1)" }} />
        <h1 className="font-display font-bold text-gray-100" style={{ fontSize: phase === 0 ? 28 : shared.typography.titleSize, lineHeight: phase === 0 ? "34px" : `${shared.typography.titleLineHeight}px`, transition: "font-size 0.8s cubic-bezier(0.16, 1, 0.3, 1), line-height 0.8s cubic-bezier(0.16, 1, 0.3, 1)", animation: "hFadeSlideUp 0.6s ease-out 0.3s both" }}>{v.heroTitle}</h1>
        {phase === 1 && <p className="font-sans text-gray-80" style={{ fontSize: shared.typography.subtitleSize, lineHeight: "22px", animation: "hFadeSlideUp 0.5s ease-out 0.1s both" }}>{v.revealSubtitle}</p>}
      </div>
    </>
  );
}

function VariantJ({ shared }: { shared: SharedControls }) {
  const p = PERSONA_DEFAULTS[shared.persona];
  const v = useDialKit("J: Horizontal bar", {
    score: [p.score, 0, 100],
  });
  const t = getTierForScore(v.score);
  const title = t.isTop ? "Your health profile lands you in our top tier" : `Your health profile lands you in ${t.tier.label.toLowerCase()}`;
  const subtitle = t.isTop ? "You\u2019re getting one of our best rates" : "You\u2019re getting a competitive rate";
  return (
    <>
      <div className="flex flex-col" style={{ gap: shared.spacing.titleSubtitleGap }}>
        <h1 className="font-display font-bold text-gray-100" style={{ fontSize: shared.typography.titleSize, lineHeight: `${shared.typography.titleLineHeight}px`, letterSpacing: "-0.03px" }}>{title}</h1>
        <p className="font-sans text-gray-80" style={{ fontSize: shared.typography.subtitleSize, lineHeight: "20px" }}>{subtitle}</p>
      </div>
      <div className="px-2"><HorizontalTierBar score={v.score} /></div>
    </>
  );
}

function VariantK({ shared }: { shared: SharedControls }) {
  const p = PERSONA_DEFAULTS[shared.persona];
  const v = useDialKit("K: Vertical stack", {
    score: [p.score, 0, 100],
  });
  const t = getTierForScore(v.score);
  const title = t.isTop ? "Your health profile lands you in our top tier" : `Your health profile lands you in ${t.tier.label.toLowerCase()}`;
  const subtitle = t.isTop ? "You\u2019re getting one of our best rates" : "You\u2019re getting a competitive rate";
  return (
    <>
      <div className="flex flex-col" style={{ gap: shared.spacing.titleSubtitleGap }}>
        <h1 className="font-display font-bold text-gray-100" style={{ fontSize: shared.typography.titleSize, lineHeight: `${shared.typography.titleLineHeight}px`, letterSpacing: "-0.03px" }}>{title}</h1>
        <p className="font-sans text-gray-80" style={{ fontSize: shared.typography.subtitleSize, lineHeight: "20px" }}>{subtitle}</p>
      </div>
      <VerticalTierStack score={v.score} />
    </>
  );
}

function VariantL({ shared }: { shared: SharedControls }) {
  const p = PERSONA_DEFAULTS[shared.persona];
  const v = useDialKit("L: Typography", {
    score: [p.score, 0, 100],
  });
  const t = getTierForScore(v.score);
  const title = t.isTop ? "Your health profile lands you in our top tier" : `Your health profile lands you in ${t.tier.label.toLowerCase()}`;
  const subtitle = t.isTop ? "You\u2019re getting one of our best rates" : "You\u2019re getting a competitive rate";
  return (
    <div className="flex flex-col items-center text-center" style={{ gap: 24, paddingTop: 32 }}>
      <div className="flex items-baseline gap-2">
        <span className="font-display font-bold" style={{ fontSize: 80, lineHeight: "80px", color: "#056257", letterSpacing: "-2px" }}>{t.tier.label}</span>
        <span className="font-sans text-gray-60" style={{ fontSize: 20, fontWeight: 500 }}>of 5</span>
      </div>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <div key={n} className="rounded-full" style={{ width: 8, height: 8, backgroundColor: n === t.tierNum ? "#056257" : "#e0e0e0" }} />
        ))}
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <h1 className="font-display font-bold text-gray-100" style={{ fontSize: shared.typography.titleSize, lineHeight: `${shared.typography.titleLineHeight}px`, letterSpacing: "-0.03px" }}>{title}</h1>
        <p className="font-sans text-gray-80" style={{ fontSize: shared.typography.subtitleSize, lineHeight: "20px" }}>{subtitle}</p>
      </div>
    </div>
  );
}

// ── Variant labels (for switcher UI) ──────────────────────────────────────
const variantLabels: Record<VariantKey, string> = {
  A: "Percentile", B: "Celebration", C: "Comparison", D: "Feel-good",
  E: "Family", F: "Animated", G: "Family motion", H: "Trophy motion",
  I: "Tiered", J: "Horiz bar", K: "Vert stack", L: "Typography",
};

// ── Variant switcher UI (JSX reference) ───────────────────────────────────
// This was the variant switcher rendered above the PhoneFrame:
//
// <div className="flex gap-2 flex-wrap justify-center">
//   {(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"] as VariantKey[]).map((key) => (
//     <button
//       key={key}
//       onClick={() => setActiveVariant(key)}
//       className="px-5 py-2 rounded-lg font-sans text-sm font-medium transition-all"
//       style={{
//         backgroundColor: activeVariant === key ? "#056257" : "rgba(255,255,255,0.1)",
//         color: activeVariant === key ? "#fff" : "rgba(255,255,255,0.6)",
//       }}
//     >
//       {key}: {variantLabels[key]}
//     </button>
//   ))}
// </div>

// ── Variant rendering switch (JSX reference) ──────────────────────────────
// This was the conditional rendering inside the PhoneFrame content area:
//
// {activeVariant === "A" && <VariantA shared={sharedControls} />}
// {activeVariant === "B" && <VariantB shared={sharedControls} hideChrome={setHideChromeFlag} />}
// {activeVariant === "C" && <VariantC shared={sharedControls} />}
// {activeVariant === "D" && <VariantD shared={sharedControls} />}
// {activeVariant === "E" && <VariantE shared={sharedControls} />}
// {activeVariant === "F" && <VariantF shared={sharedControls} />}
// {activeVariant === "G" && <VariantG shared={sharedControls} hideChrome={setHideChromeFlag} />}
// {activeVariant === "H" && <VariantH shared={sharedControls} hideChrome={setHideChromeFlag} />}
// {activeVariant === "I" && <VariantI shared={sharedControls} />}
// {activeVariant === "J" && <VariantJ shared={sharedControls} />}
// {activeVariant === "K" && <VariantK shared={sharedControls} />}
// {activeVariant === "L" && <VariantL shared={sharedControls} />}
