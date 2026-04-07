"use client";

import { useState } from "react";
import { useDialKit } from "dialkit";
import PhoneFrame from "@/components/PhoneFrame";
import EthosHeader from "@/components/EthosHeader";

// ── Types ─────────────────────────────────────────────────────────────────
type Persona = "top" | "good";

// ── Tier data and gauge (Variant I) ───────────────────────────────────────
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

function TieredGauge({ score }: { score: number }) {
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

  const scorePct = Math.min(score / 100, 1);
  const scoreAngle = startAngle + arcDegrees * scorePct;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <path d={describeArc(startAngle, 0.1, radius)} fill="none" stroke={TIERS[0].color} strokeWidth={strokeWidth} strokeLinecap="round" />
        <path d={describeArc(startAngle + arcDegrees - 0.1, 0.1, radius)} fill="none" stroke={TIERS[TIERS.length - 1].color} strokeWidth={strokeWidth} strokeLinecap="round" />
        {TIERS.map((tier) => {
          const segStart = startAngle + (tier.min / 100) * arcDegrees;
          const segSweep = ((tier.max - tier.min) / 100) * arcDegrees;
          return <path key={tier.label} d={describeArc(segStart, segSweep, radius)} fill="none" stroke={tier.color} strokeWidth={strokeWidth} strokeLinecap="butt" />;
        })}
        {TIERS.slice(1).map((tier) => {
          const angle = startAngle + (tier.min / 100) * arcDegrees;
          const inner = polarToCartesian(angle, radius - strokeWidth / 2 - 1);
          const outer = polarToCartesian(angle, radius + strokeWidth / 2 + 1);
          return <line key={tier.label + "-gap"} x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} stroke="white" strokeWidth={3} />;
        })}
        {(() => {
          const inner = polarToCartesian(scoreAngle, radius - strokeWidth / 2 - 4);
          const outer = polarToCartesian(scoreAngle, radius + strokeWidth / 2 + 4);
          return <line x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} stroke="#272727" strokeWidth={3} strokeLinecap="round" />;
        })()}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ transform: "translateY(4px)" }}>
        <span className="leading-none text-black" style={{ fontSize: 48, fontWeight: 700, fontFamily: "var(--font-display)" }}>{score}</span>
        <span className="leading-5 uppercase font-medium text-[11px]" style={{ color: "#056257", letterSpacing: "0.1em" }}>{getTierForScore(score).label}</span>
      </div>
    </div>
  );
}

// ── Shared UI components ──────────────────────────────────────────────────
function CheckIcon({ size, bgColor }: { size: number; bgColor: string }) {
  return (
    <div className="rounded-full flex items-center justify-center shrink-0" style={{ width: size, height: size, backgroundColor: bgColor }}>
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 16 16" fill="none">
        <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

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

// ── Content data ──────────────────────────────────────────────────────────
const FACTORS = [
  { title: "Non-smoker", description: "This is key to getting low rates" },
  { title: "Age", description: "32 is an optimal age to get life insurance" },
  { title: "Great health", description: "You\u2019re in the top 29% of all applicants" },
];

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

// ── Main ───────────────────────────────────────────────────────────────────
export default function Home() {
  const [persona, setPersona] = useState<Persona>("top");

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
      checkIconSize: [28, 16, 48], buttonBg: "#272727",
    },
  });

  // Variant I DialKit controls
  const p = PERSONA_DEFAULTS[persona];
  const variantI = useDialKit("I: Tiered", {
    score: [p.score, 0, 100],
  });
  const t = getTierForScore(variantI.score);
  const title = t.isTop ? "Your health profile lands you in our top tier" : `Your health profile lands you in ${t.tier.label.toLowerCase()}`;
  const subtitle = t.isTop ? "You\u2019re getting one of our best rates" : "You\u2019re getting a competitive rate";

  return (
    <div className="min-h-screen bg-canvas flex flex-col items-center justify-center gap-6 p-8">
      {/* Persona toggle */}
      <div className="flex items-center gap-3">
        <span className="font-sans text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>Persona:</span>
        <div className="flex rounded-lg overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
          {([["top", "Top tier (91)"], ["good", "Good (77)"]] as [Persona, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setPersona(key)}
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

      <PhoneFrame>
        <EthosHeader />
        <div
          className="flex flex-col"
          style={{
            paddingLeft: shared.spacing.contentPaddingX,
            paddingRight: shared.spacing.contentPaddingX,
            paddingTop: shared.spacing.contentPaddingTop,
            paddingBottom: 128,
            gap: shared.spacing.sectionGap,
          }}
        >
          {/* Variant I content */}
          <div className="flex flex-col" style={{ gap: shared.spacing.titleSubtitleGap }}>
            <h1 className="font-display font-bold text-gray-100" style={{ fontSize: shared.typography.titleSize, lineHeight: `${shared.typography.titleLineHeight}px`, letterSpacing: "-0.03px" }}>{title}</h1>
            <p className="font-sans text-gray-80" style={{ fontSize: shared.typography.subtitleSize, lineHeight: "20px" }}>{subtitle}</p>
          </div>
          <div className="flex justify-center"><TieredGauge score={variantI.score} /></div>

          {/* Factors card */}
          <FactorsCard
            icon={<CheckIcon size={shared.colors.checkIconSize} bgColor={shared.colors.checkIconBg} />}
            header={PERSONA_DEFAULTS[persona].factorsHeader}
            factors={FACTORS}
            spacing={shared.spacing} typography={shared.typography} colors={shared.colors}
          />
        </div>

        {/* Fixed bottom CTA */}
        <div className="absolute bottom-0 left-0 right-0 bg-white py-4 px-4" style={{ boxShadow: "0px -2px 4px rgba(16,24,40,0.06)" }}>
          <button className="w-full flex items-center justify-center font-sans font-medium text-white" style={{ backgroundColor: shared.colors.buttonBg, minHeight: shared.typography.buttonHeight, borderRadius: shared.typography.buttonRadius, fontSize: shared.typography.buttonSize, lineHeight: "28px" }}>
            Continue
          </button>
        </div>
      </PhoneFrame>
    </div>
  );
}
