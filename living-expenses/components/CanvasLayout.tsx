"use client";

import PhoneFrame from "./PhoneFrame";
import { useRouter } from "next/navigation";

interface CanvasLayoutProps {
  children: React.ReactNode;
  isPrefill: boolean;
  onTogglePrefill: () => void;
  currentPattern?: string;
  patternTitle?: string;
  patternBullets?: string[];
  patternDescription?: string;
}

export default function CanvasLayout({
  children,
  isPrefill,
  onTogglePrefill,
  currentPattern = "baseline",
  patternTitle = "Category Checklist",
  patternBullets,
  patternDescription,
}: CanvasLayoutProps) {
  const router = useRouter();

  const defaultBullets = [
    "Users select applicable expense categories first, reducing cognitive load before entering amounts",
    "Prefill variant shows national average suggestions, anchoring users to realistic figures",
    "Running total updates live as amounts change, giving immediate feedback on coverage needs",
    "Simple category list minimizes overwhelm for a topic that can feel financially intimidating",
  ];

  const bullets = patternBullets || defaultBullets;

  const patterns = [
    { id: "baseline", name: "Pattern A: Category Checklist (Baseline)", path: "/" },
  ];

  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center p-8">
      <div className="flex gap-20 items-center max-w-[1200px] w-full">
        {/* Left side: Title + bullets */}
        <div className="flex-1 min-w-[380px]">
          {/* Pattern navigation tabs */}
          <div className="mb-8">
            <label className="block text-white/50 font-sans text-xs uppercase tracking-wide mb-3">
              Switch Pattern
            </label>
            <div className="grid grid-cols-5 gap-2 mb-2">
              {patterns.map((pattern) => {
                const isActive = currentPattern === pattern.id;
                const label =
                  pattern.id === "baseline"
                    ? "A"
                    : pattern.id === "b"
                    ? "B"
                    : pattern.id === "c"
                    ? "C"
                    : pattern.id === "d"
                    ? "D"
                    : "E";

                return (
                  <button
                    key={pattern.id}
                    onClick={() => router.push(pattern.path)}
                    className={`py-2.5 px-3 rounded-lg font-sans text-sm font-medium transition-all ${
                      isActive
                        ? "bg-cypress-100 text-white"
                        : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white/80"
                    }`}
                    title={pattern.name}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            <div className="text-white/40 font-sans text-xs">
              {patterns.find((p) => p.id === currentPattern)?.name}
            </div>
          </div>

          <h1 className="font-display text-[48px] text-white leading-tight mb-6">
            {patternTitle}
          </h1>

          {/* Pattern description (optional) */}
          {patternDescription && (
            <p className="text-white/60 font-sans text-[14px] leading-relaxed mb-8">
              {patternDescription}
            </p>
          )}

          {/* Pattern bullets */}
          <ul className="space-y-4 text-white/80 font-sans text-[15px] leading-relaxed mb-8">
            {bullets.map((bullet, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-white/40 mt-0.5">•</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          {/* Prefill toggle */}
          <div>
            <label className="block text-white/50 font-sans text-xs uppercase tracking-wide mb-2">
              Data Variant
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={onTogglePrefill}
                className={`relative w-[52px] h-[28px] rounded-full transition-colors duration-200 ${
                  isPrefill ? "bg-cypress-100" : "bg-white/20"
                }`}
              >
                <div
                  className={`absolute top-[3px] w-[22px] h-[22px] rounded-full bg-white transition-transform duration-200 ${
                    isPrefill ? "translate-x-[27px]" : "translate-x-[3px]"
                  }`}
                />
              </button>
              <span className="text-white/70 font-sans text-sm">
                {isPrefill ? "Prefill (avg. amounts)" : "No Prefill (blank)"}
              </span>
            </div>
          </div>
        </div>

        {/* Right side: Phone */}
        <PhoneFrame>{children}</PhoneFrame>
      </div>
    </div>
  );
}
