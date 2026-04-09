"use client";

import { useState } from "react";
import CanvasLayout from "@/components/CanvasLayout";
import EthosHeader from "@/components/EthosHeader";

// ── Figma asset URLs (served by Figma Desktop MCP) ────────────────────────
const ICON_MORTGAGE_CIRCLE = "http://localhost:3845/assets/633bc1a3af0b4a104394535240152e5245910179.svg";
const ICON_MORTGAGE_VECTOR = "http://localhost:3845/assets/51408105ee07dcd981f51b6e4ab52ecde7d22cf8.svg";
const ICON_EDUCATION_CIRCLE = "http://localhost:3845/assets/f10c1bb32ec1063eea1b39aba53ef286bbcd0613.svg";
const ICON_EDUCATION_VECTOR = "http://localhost:3845/assets/7e03578daf5bd67134ebc4e5b7ff171f599addc1.svg";
const ICON_LIVING_CIRCLE = "http://localhost:3845/assets/39576298838edfb80c8e936e878f9ad00ba2b339.svg";
const ICON_LIVING_VECTOR = "http://localhost:3845/assets/c72bb52308f6329e7eaa081bc07107e3d0ce80fd.svg";
const ICON_LIGHTNING = "http://localhost:3845/assets/691621b7adefea36d23cfd5f22582adaeacbe405.svg";
const ICON_INFO = "http://localhost:3845/assets/711048b6c4db10aafd49f58abb7622cb7bb389d7.svg";

// ── Constants ──────────────────────────────────────────────────────────────
const MORTGAGE = 300_000;
const NUM_CHILDREN = 2;
const MAX_SCALE = 3_000_000;

const EDUCATION_OPTIONS = [
  { label: "$50,000/child", desc: "2 years at in-state community college", amount: 50_000 },
  { label: "$100,000/child", desc: "4 years at a public state university", amount: 100_000 },
  { label: "$250,000/child", desc: "4 years at a typical private university", amount: 250_000 },
  { label: "I don't want to budget for education", desc: "", amount: 0 },
];

const EDUCATION_DESC: Record<number, string> = {
  0: "This removes education from your coverage — you can always adjust later.",
  50_000: "This will help cover 2 years at an in-state community college for both of your children.",
  100_000: "This will help cover 4 years at a public state university for both of your children.",
  250_000: "This will help cover 4 years of education costs at a typical private university for both of your children.",
};

// ── Helpers ────────────────────────────────────────────────────────────────
const fmt = (n: number) => `$${n.toLocaleString()}`;
const fmtShort = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M` : fmt(n);

// ── Shared UI components ───────────────────────────────────────────────────

function CategoryIcon({ circle, vector }: { circle: string; vector: string }) {
  return (
    <div className="relative shrink-0" style={{ width: 32, height: 32 }}>
      <img src={circle} alt="" className="absolute inset-0 w-full h-full" />
      <div className="absolute" style={{ left: 6.4, top: 6.4, width: 18.65, height: 18.65 }}>
        <img src={vector} alt="" className="w-full h-full" />
      </div>
    </div>
  );
}

function SectionHeader({ circle, vector, label }: { circle: string; vector: string; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <CategoryIcon circle={circle} vector={vector} />
      <span className="font-sans font-medium text-[16px] leading-6 text-gray-100">{label}</span>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="bg-white rounded-2xl px-4 py-6 mx-4 flex flex-col gap-6"
      style={{ boxShadow: "0px 12px 16px -4px rgba(16,24,40,0.08), 0px 4px 6px -2px rgba(16,24,40,0.03)" }}
    >
      {children}
    </div>
  );
}

function DarkButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-lg flex items-center justify-center font-sans font-medium text-[20px] leading-7 text-white"
      style={{ backgroundColor: "#272727", minHeight: 64 }}
    >
      {label}
    </button>
  );
}

function RecommendedBox({ amount }: { amount: number }) {
  return (
    <div
      className="rounded-xl p-4 flex flex-col items-center gap-1"
      style={{ backgroundColor: "#f4f4f4", border: "1px solid #d4d4d4" }}
    >
      <span className="font-sans text-[11px] tracking-widest uppercase font-medium text-cypress-100">
        Recommended
      </span>
      <span className="font-sans font-semibold text-[28px] leading-tight text-gray-100">
        {fmt(amount)}
      </span>
    </div>
  );
}

function InfoBanner({ text }: { text: string }) {
  return (
    <div
      className="flex items-center gap-4 p-4 rounded-lg"
      style={{ backgroundColor: "#f5f8fc", border: "1px solid #99b6e1" }}
    >
      <div
        className="rounded-lg shrink-0 flex items-center justify-center"
        style={{ width: 40, height: 40, backgroundColor: "#ccdaf0" }}
      >
        <div style={{ width: 20, height: 20 }}>
          <img src={ICON_INFO} alt="" className="w-full h-full" />
        </div>
      </div>
      <p className="font-sans text-[14px] leading-5" style={{ color: "#2e62b1" }}>{text}</p>
    </div>
  );
}

function RangeSlider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  formatValue,
  minLabel,
  maxLabel,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  formatValue: (v: number) => string;
  minLabel: string;
  maxLabel: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex flex-col gap-1">
        <span className="font-sans text-[16px] leading-6" style={{ color: "#525252" }}>{label}</span>
        <span className="font-sans font-medium text-[18px] leading-[26px] text-gray-100">{formatValue(value)}</span>
      </div>
      <div className="relative w-full" style={{ height: 24 }}>
        <div className="absolute rounded-full" style={{ left: 0, right: 0, top: 9, height: 6, backgroundColor: "#f4f4f4" }} />
        <div className="absolute rounded-full" style={{ left: 0, width: `${pct}%`, top: 9, height: 6, backgroundColor: "#04463e" }} />
        <div
          className="absolute rounded-full"
          style={{
            width: 24, height: 24, top: 0,
            left: `calc(${pct}% - 12px)`,
            backgroundColor: "#04463e",
            boxShadow: "0px 2px 4px -2px rgba(16,24,40,0.06), 0px 4px 8px -2px rgba(16,24,40,0.1)",
            pointerEvents: "none",
          }}
        />
        <input
          type="range"
          min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          style={{ margin: 0, zIndex: 1 }}
        />
      </div>
      <div className="flex justify-between font-sans text-[14px] leading-5" style={{ color: "#525252" }}>
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

function CoverageBar({ mortgage, education, living }: { mortgage: number; education: number; living: number }) {
  const mortgagePct = (mortgage / MAX_SCALE) * 100;
  const educationPct = (education / MAX_SCALE) * 100;
  const livingPct = (living / MAX_SCALE) * 100;
  return (
    <div className="flex flex-col gap-2">
      <div className="h-6 rounded-full flex overflow-hidden" style={{ backgroundColor: "#d4d4d4" }}>
        <div style={{ width: `${mortgagePct}%`, backgroundColor: "#0a9742" }} />
        <div style={{ width: `${educationPct}%`, backgroundColor: "#336cc3" }} />
        {living > 0 && <div style={{ width: `${livingPct}%`, backgroundColor: "#033630" }} />}
      </div>
      <div className="flex justify-between font-sans text-[16px] leading-6 text-gray-100">
        <span>$0</span>
        <span>$3M</span>
      </div>
    </div>
  );
}

function BreakdownCard({
  circle, vector, label, amount, loading = false,
}: {
  circle: string; vector: string; label: string; amount?: number; loading?: boolean;
}) {
  return (
    <div
      className="bg-white rounded-2xl px-4 py-5 flex items-center gap-3"
      style={{ boxShadow: "0px 1px 2px rgba(16,24,40,0.05)" }}
    >
      <CategoryIcon circle={circle} vector={vector} />
      <span className="font-sans font-medium text-[16px] leading-6 text-gray-100 flex-1">{label}</span>
      {loading ? (
        <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#272727" strokeWidth="2.5" strokeLinecap="round">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      ) : (
        <span className="font-sans font-semibold text-[16px] leading-6 text-gray-100">{fmt(amount!)}</span>
      )}
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────
export default function Home() {
  const [screen, setScreen] = useState(0);
  const [educationChoice, setEducationChoice] = useState(250_000);
  const [child1Age, setChild1Age] = useState(4);
  const [child2Age, setChild2Age] = useState(7);
  const [monthlyExpenses, setMonthlyExpenses] = useState(6_000);

  const educationTotal = educationChoice * NUM_CHILDREN;
  const youngestAge = Math.min(child1Age, child2Age);
  const coverageYears = Math.max(10, 21 - youngestAge);
  const livingExpenses = Math.round((monthlyExpenses * 12 * coverageYears) / 100_000) * 100_000;
  const totalCoverage = MORTGAGE + educationTotal + livingExpenses;

  const next = () => setScreen((s) => s + 1);
  const back = () => setScreen((s) => Math.max(0, s - 1));
  const reset = () => {
    setScreen(0);
    setEducationChoice(250_000);
    setChild1Age(4);
    setChild2Age(7);
    setMonthlyExpenses(6_000);
  };

  // ── Screen 0: Intro ──────────────────────────────────────────────────────
  const s0 = () => (
    <div className="flex flex-col gap-6 px-4 pt-4 pb-8">
      <div className="flex flex-col gap-4">
        <h1 className="font-display text-[28px] leading-[31px] tracking-[-0.28px] text-gray-100">
          To get your personalized rate, let's find the right coverage for you
        </h1>
        <p className="font-sans text-[16px] leading-6" style={{ color: "#525252" }}>
          This would help cover your family's most critical needs without overpaying.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        {[
          { circle: ICON_MORTGAGE_CIRCLE, vector: ICON_MORTGAGE_VECTOR, label: "Mortgage payments" },
          { circle: ICON_EDUCATION_CIRCLE, vector: ICON_EDUCATION_VECTOR, label: "Children's education" },
          { circle: ICON_LIVING_CIRCLE, vector: ICON_LIVING_VECTOR, label: "Living expenses" },
        ].map(({ circle, vector, label }) => (
          <div key={label} className="rounded-2xl px-4 py-6 flex items-center gap-3" style={{ backgroundColor: "#dae7e6" }}>
            <CategoryIcon circle={circle} vector={vector} />
            <span className="font-sans font-medium text-[16px] leading-6 text-gray-100">{label}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2">
        <div style={{ width: 18.65, height: 18.65 }}>
          <img src={ICON_LIGHTNING} alt="" className="w-full h-full" />
        </div>
        <span className="font-sans font-medium text-[14px] leading-5 text-cypress-100">
          This will take less than a minute.
        </span>
      </div>
      <DarkButton label="Let's do it" onClick={next} />
    </div>
  );

  // ── Screen 1: Mortgage ───────────────────────────────────────────────────
  const s1 = () => (
    <Card>
      <SectionHeader circle={ICON_MORTGAGE_CIRCLE} vector={ICON_MORTGAGE_VECTOR} label="Mortgage payments" />
      <div className="flex flex-col gap-4">
        <p className="font-sans text-[18px] leading-[26px] text-gray-100">
          To cover your remaining mortgage, you'd need <strong>{fmt(MORTGAGE)}</strong>.
        </p>
        <p className="font-sans text-[18px] leading-[26px] text-gray-100">
          This will ensure your loved ones stay in their home without worrying about mortgage payments.
        </p>
        <p className="font-sans text-[18px] leading-[26px] text-gray-100">
          You'll get to adjust this in a moment.
        </p>
      </div>
      <RecommendedBox amount={MORTGAGE} />
      <DarkButton label="Continue" onClick={next} />
    </Card>
  );

  // ── Screen 2: Education choice ───────────────────────────────────────────
  const s2 = () => (
    <Card>
      <SectionHeader circle={ICON_EDUCATION_CIRCLE} vector={ICON_EDUCATION_VECTOR} label="Children's education" />
      <div className="flex flex-col gap-4">
        <h2 className="font-sans text-[24px] leading-[34px] tracking-[-0.24px] text-gray-100">
          How much do you want to set aside for your children's education?
        </h2>
        <p className="font-sans text-[18px] leading-[26px] text-gray-100">
          These funds will help ensure your children can pursue their dreams*.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        {EDUCATION_OPTIONS.map((opt) => (
          <button
            key={opt.amount}
            onClick={() => { setEducationChoice(opt.amount); next(); }}
            className="text-left px-4 py-4 rounded-xl transition-all"
            style={{
              backgroundColor: "#f4f4f4",
              border: `1px solid ${educationChoice === opt.amount ? "#056257" : "#d4d4d4"}`,
            }}
          >
            <div className="font-sans font-semibold text-[16px] leading-6 text-gray-100">{opt.label}</div>
            {opt.desc && (
              <div className="font-sans text-[14px] leading-5 mt-0.5" style={{ color: "#525252" }}>{opt.desc}</div>
            )}
          </button>
        ))}
      </div>
    </Card>
  );

  // ── Screen 3: Education result ───────────────────────────────────────────
  const s3 = () => {
    const total = educationChoice * NUM_CHILDREN;
    return (
      <Card>
        <SectionHeader circle={ICON_EDUCATION_CIRCLE} vector={ICON_EDUCATION_VECTOR} label="Children's education" />
        <div className="flex flex-col gap-4">
          {educationChoice > 0 && (
            <p className="font-sans text-[18px] leading-[26px] text-gray-100">
              To provide <strong>{fmt(educationChoice)}/child</strong> for your {NUM_CHILDREN} children, you'd need <strong>{fmt(total)}</strong>.
            </p>
          )}
          <p className="font-sans text-[18px] leading-[26px] text-gray-100">
            {EDUCATION_DESC[educationChoice]}
          </p>
          <p className="font-sans text-[18px] leading-[26px] text-gray-100">
            You'll get to adjust this in a moment.
          </p>
        </div>
        <RecommendedBox amount={total} />
        <DarkButton label="Continue" onClick={next} />
      </Card>
    );
  };

  // ── Screen 4: Coverage building ──────────────────────────────────────────
  const s4 = () => {
    const subtotal = MORTGAGE + educationTotal;
    return (
      <div className="flex flex-col gap-6 px-4 pt-4 pb-8">
        <div className="flex flex-col gap-2 items-center text-center">
          <p className="font-sans text-[16px] leading-6" style={{ color: "#525252" }}>Your recommended coverage</p>
          <p className="font-sans font-medium text-[40px] leading-[55px] tracking-[-0.4px] text-gray-100">{fmt(subtotal)}</p>
        </div>
        <CoverageBar mortgage={MORTGAGE} education={educationTotal} living={0} />
        <div className="flex flex-col gap-2">
          <BreakdownCard circle={ICON_MORTGAGE_CIRCLE} vector={ICON_MORTGAGE_VECTOR} label="Mortgage payments" amount={MORTGAGE} />
          <BreakdownCard circle={ICON_EDUCATION_CIRCLE} vector={ICON_EDUCATION_VECTOR} label="Children's education" amount={educationTotal} />
          <BreakdownCard circle={ICON_LIVING_CIRCLE} vector={ICON_LIVING_VECTOR} label="Living expenses" loading />
        </div>
        <DarkButton label="Next" onClick={next} />
      </div>
    );
  };

  // ── Screen 5: Children's ages ────────────────────────────────────────────
  const s5 = () => (
    <Card>
      <SectionHeader circle={ICON_LIVING_CIRCLE} vector={ICON_LIVING_VECTOR} label="Living expenses" />
      <div className="flex flex-col gap-4">
        <h2 className="font-sans text-[24px] leading-[34px] tracking-[-0.24px] text-gray-100">
          How old are your children?
        </h2>
        <p className="font-sans text-[18px] leading-[26px] text-gray-100">
          This helps us calculate their future needs (childcare, tuition, etc.).
        </p>
      </div>
      <div className="flex flex-col gap-9">
        <RangeSlider
          label="Child 1"
          value={child1Age} min={0} max={18}
          onChange={setChild1Age}
          formatValue={(v) => v === 0 ? "< 1 year" : `${v} year${v === 1 ? "" : "s"}`}
          minLabel="< 1 year" maxLabel="18 years"
        />
        <div style={{ height: 1, backgroundColor: "#d4d4d4" }} />
        <RangeSlider
          label="Child 2"
          value={child2Age} min={0} max={18}
          onChange={setChild2Age}
          formatValue={(v) => v === 0 ? "< 1 year" : `${v} year${v === 1 ? "" : "s"}`}
          minLabel="< 1 year" maxLabel="18 years"
        />
      </div>
      <DarkButton label="Next" onClick={next} />
    </Card>
  );

  // ── Screen 6: Monthly expenses ───────────────────────────────────────────
  const s6 = () => (
    <Card>
      <SectionHeader circle={ICON_LIVING_CIRCLE} vector={ICON_LIVING_VECTOR} label="Living expenses" />
      <div className="flex flex-col gap-4">
        <h2 className="font-sans text-[24px] leading-[34px] tracking-[-0.24px] text-gray-100">
          What are your family's monthly living expenses?
        </h2>
        <p className="font-sans text-[18px] leading-[26px] text-gray-100">
          Include expenses like bills, groceries, childcare, etc. Don't include mortgage payments. A rough estimate is fine.
        </p>
      </div>
      <RangeSlider
        label="Monthly living expenses"
        value={monthlyExpenses} min={0} max={20_000} step={500}
        onChange={setMonthlyExpenses}
        formatValue={fmt}
        minLabel="$0" maxLabel="$20,000+"
      />
      <InfoBanner text="Families in your income range usually spend $5,000–$7,000*." />
      <DarkButton label="Next" onClick={next} />
    </Card>
  );

  // ── Screen 7: Living expenses result ────────────────────────────────────
  const s7 = () => {
    const pct = (monthlyExpenses / 20_000) * 100;
    return (
      <Card>
        <SectionHeader circle={ICON_LIVING_CIRCLE} vector={ICON_LIVING_VECTOR} label="Living expenses" />
        <div className="flex flex-col gap-4">
          <h2 className="font-sans font-medium text-[24px] leading-[34px] tracking-[-0.24px] text-gray-100">
            To safely cover your family's expenses of {fmt(monthlyExpenses)}/month, we'd recommend{" "}
            <strong>{fmtShort(livingExpenses)}</strong>.
          </h2>
          <p className="font-sans text-[18px] leading-[26px]" style={{ color: "#525252" }}>
            Your youngest child is {youngestAge}. Most parents in your shoes would consider {coverageYears} years of coverage until children are independent and can stand on their own.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <span className="font-sans text-[16px] leading-6" style={{ color: "#525252" }}>Monthly expenses</span>
              <span className="font-sans font-medium text-[18px] leading-[26px] text-gray-100">{fmt(monthlyExpenses)}</span>
            </div>
            <div className="flex flex-col gap-1 items-end">
              <span className="font-sans text-[16px] leading-6" style={{ color: "#525252" }}>Total over {coverageYears} years</span>
              <span className="font-sans font-medium text-[18px] leading-[26px] text-gray-100">{fmt(livingExpenses)}</span>
            </div>
          </div>
          {/* Read-only slider showing monthly amount */}
          <div className="relative w-full" style={{ height: 24 }}>
            <div className="absolute rounded-full" style={{ left: 0, right: 0, top: 9, height: 6, backgroundColor: "#f4f4f4" }} />
            <div className="absolute rounded-full" style={{ left: 0, width: `${pct}%`, top: 9, height: 6, backgroundColor: "#04463e" }} />
            <div
              className="absolute rounded-full"
              style={{
                width: 24, height: 24, top: 0,
                left: `calc(${pct}% - 12px)`,
                backgroundColor: "#04463e",
                boxShadow: "0px 2px 4px -2px rgba(16,24,40,0.06), 0px 4px 8px -2px rgba(16,24,40,0.1)",
              }}
            />
          </div>
          <div className="flex justify-between font-sans text-[14px] leading-5" style={{ color: "#525252" }}>
            <span>$0</span>
            <span>$20,000+</span>
          </div>
          <InfoBanner text="You'll get to adjust your coverage amount later as well." />
        </div>
        <DarkButton label="Continue" onClick={next} />
      </Card>
    );
  };

  // ── Screen 8: Full coverage breakdown ───────────────────────────────────
  const s8 = () => (
    <div className="flex flex-col gap-6 px-4 pt-4 pb-8">
      <div className="flex flex-col gap-2 items-center text-center">
        <p className="font-sans text-[16px] leading-6" style={{ color: "#525252" }}>Your recommended coverage</p>
        <p className="font-sans font-medium text-[40px] leading-[55px] tracking-[-0.4px] text-gray-100">{fmt(totalCoverage)}</p>
      </div>
      <CoverageBar mortgage={MORTGAGE} education={educationTotal} living={livingExpenses} />
      <div className="flex flex-col gap-2">
        <BreakdownCard circle={ICON_MORTGAGE_CIRCLE} vector={ICON_MORTGAGE_VECTOR} label="Mortgage payments" amount={MORTGAGE} />
        <BreakdownCard circle={ICON_EDUCATION_CIRCLE} vector={ICON_EDUCATION_VECTOR} label="Children's education" amount={educationTotal} />
        <BreakdownCard circle={ICON_LIVING_CIRCLE} vector={ICON_LIVING_VECTOR} label="Living expenses" amount={livingExpenses} />
      </div>
      <DarkButton label="Continue" onClick={next} />
    </div>
  );

  // ── Screen 9: Final reveal ───────────────────────────────────────────────
  const s9 = () => (
    <div className="flex flex-col items-center gap-6 px-4 pt-12 pb-8">
      <div
        className="flex items-center justify-center rounded-full"
        style={{ width: 64, height: 64, backgroundColor: "#e6efee" }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#056257" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      </div>
      <div className="flex flex-col gap-4 items-center text-center">
        <p className="font-sans font-medium text-[40px] leading-[55px] tracking-[-0.4px] text-gray-100">
          {fmt(totalCoverage)}
        </p>
        <p className="font-sans text-[18px] leading-[26px]" style={{ color: "#525252" }}>
          This will help cover all of your family's needs without overpaying.
        </p>
        <p className="font-sans text-[18px] leading-[26px] text-gray-100">
          You'll get to adjust this in a moment.
        </p>
      </div>
      <DarkButton label="Restart Demo" onClick={reset} />
    </div>
  );

  const screens = [s0, s1, s2, s3, s4, s5, s6, s7, s8, s9];

  return (
    <CanvasLayout
      currentPattern="baseline"
      patternTitle="Coverage Education"
      patternDescription="A needs-first flow where users self-state their coverage needs before seeing the recommended amount. Mortgage is fixed, education is chosen, and living expenses are derived from children's ages + monthly spend — so users arrive at C themselves rather than having it handed to them."
    >
      <EthosHeader showBack={screen > 0} onBack={back} />
      <div className="pb-8">{screens[screen]?.()}</div>
    </CanvasLayout>
  );
}
