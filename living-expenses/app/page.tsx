"use client";

import { useState } from "react";
import CanvasLayout from "@/components/CanvasLayout";
import EthosHeader from "@/components/EthosHeader";
import ProgressBar from "@/components/ProgressBar";
import CurrencyInput from "@/components/CurrencyInput";
import PrimaryButton from "@/components/PrimaryButton";
import InfoBanner from "@/components/InfoBanner";
import CheckboxList from "@/components/CheckboxList";

// Expense categories with national average monthly amounts
const EXPENSE_CATEGORIES = [
  { id: "housing", label: "Housing (rent or mortgage)", avg: "1800" },
  { id: "utilities", label: "Utilities & internet", avg: "250" },
  { id: "groceries", label: "Groceries & dining", avg: "600" },
  { id: "transportation", label: "Transportation", avg: "500" },
  { id: "childcare", label: "Childcare or education", avg: "1200" },
  { id: "healthcare", label: "Healthcare", avg: "300" },
  { id: "other", label: "Other expenses", avg: "400" },
];

const CATEGORY_LABELS = EXPENSE_CATEGORIES.map((c) => c.label);

export default function Home() {
  const [isPrefill, setIsPrefill] = useState(true);
  const [step, setStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);

  // Step 1: which categories apply
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Step 2: amounts keyed by category id
  const [amounts, setAmounts] = useState<Record<string, string>>({});

  // Animation state: 3-phase model
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("left");
  const [animPhase, setAnimPhase] = useState<"idle" | "exit" | "enter">("idle");

  const resetState = () => {
    setStep(1);
    setIsComplete(false);
    setSelectedCategories([]);
    setAmounts({});
    setAnimPhase("idle");
    setSlideDirection("left");
  };

  const handleTogglePrefill = () => {
    setIsPrefill(!isPrefill);
    resetState();
  };

  const animateTransition = (
    direction: "left" | "right",
    action: () => void
  ) => {
    setSlideDirection(direction);
    setAnimPhase("exit");
    setTimeout(() => {
      action();
      setAnimPhase("enter");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimPhase("idle");
        });
      });
    }, 250);
  };

  const goNext = () => animateTransition("left", () => setStep((s) => s + 1));
  const goBack = () => {
    if (step > 1) animateTransition("right", () => setStep((s) => s - 1));
  };

  const handleComplete = () => {
    animateTransition("left", () => setIsComplete(true));
  };

  const getProgress = () => {
    if (isComplete) return 100;
    return (step / 3) * 100;
  };

  // Get selected category objects in order
  const getSelectedCategoryObjects = () =>
    EXPENSE_CATEGORIES.filter((c) => selectedCategories.includes(c.label));

  // When moving to step 2, seed prefill amounts if toggled on
  const handleCategoryConfirm = () => {
    if (isPrefill) {
      const seeded: Record<string, string> = {};
      getSelectedCategoryObjects().forEach((cat) => {
        seeded[cat.id] = amounts[cat.id] || cat.avg;
      });
      setAmounts(seeded);
    }
    goNext();
  };

  // Total monthly from entered amounts
  const getTotal = () => {
    return getSelectedCategoryObjects().reduce((sum, cat) => {
      return sum + (parseInt(amounts[cat.id] || "0", 10) || 0);
    }, 0);
  };

  // Slide transform helper
  const getSlideTransform = () => {
    if (animPhase === "idle") return "translateX(0)";
    if (animPhase === "exit") {
      return slideDirection === "left"
        ? "translateX(-100%)"
        : "translateX(100%)";
    }
    return slideDirection === "left"
      ? "translateX(100%)"
      : "translateX(-100%)";
  };

  // ──── STEP 1: Category selection ────
  const renderStep1 = () => (
    <StepContent key="step-1">
      <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-2">
        What are your main monthly expenses?
      </h2>
      <p className="text-[14px] text-gray-60 mb-6 font-sans leading-relaxed">
        Select all that apply. This helps us recommend the right coverage amount
        for your family.
      </p>
      <CheckboxList
        items={CATEGORY_LABELS}
        selected={selectedCategories}
        onChange={setSelectedCategories}
      />
      <InfoBanner message="Your policy should cover your family's expenses for 10–12 years. We'll help you calculate the right amount." />
      <PrimaryButton
        label="Continue"
        onClick={handleCategoryConfirm}
        disabled={selectedCategories.length === 0}
      />
    </StepContent>
  );

  // ──── STEP 2: Enter amounts ────
  const renderStep2 = () => {
    const cats = getSelectedCategoryObjects();
    return (
      <StepContent key="step-2">
        <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-2">
          How much do you spend each month?
        </h2>
        <p className="text-[14px] text-gray-60 mb-6 font-sans leading-relaxed">
          {isPrefill
            ? "We've filled in national averages — adjust any amounts that don't match your situation."
            : "Enter your approximate monthly amounts for each category."}
        </p>
        {cats.map((cat) => (
          <CurrencyInput
            key={cat.id}
            label={cat.label}
            value={amounts[cat.id] || ""}
            hint={isPrefill ? `avg. $${Number(cat.avg).toLocaleString()}` : undefined}
            onChange={(val) => setAmounts({ ...amounts, [cat.id]: val })}
          />
        ))}
        <PrimaryButton label="Review total" onClick={goNext} />
      </StepContent>
    );
  };

  // ──── STEP 3: Review total ────
  const renderStep3 = () => {
    const cats = getSelectedCategoryObjects();
    const total = getTotal();
    const annualTotal = total * 12;
    const recommendedCoverage = total * 12 * 10;

    return (
      <StepContent key="step-3">
        <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-2">
          Here&apos;s your monthly total
        </h2>
        <p className="text-[14px] text-gray-60 mb-6 font-sans leading-relaxed">
          Review and confirm your expenses below.
        </p>

        {/* Line-item breakdown */}
        <div className="rounded-xl border border-gray-20 overflow-hidden mb-6">
          {cats.map((cat, i) => (
            <div
              key={cat.id}
              className={`flex items-center justify-between px-4 py-3 ${
                i < cats.length - 1 ? "border-b border-gray-20" : ""
              }`}
            >
              <span className="font-sans text-[14px] text-gray-80">
                {cat.label}
              </span>
              <span className="font-sans text-[14px] text-gray-100 font-medium">
                ${(parseInt(amounts[cat.id] || "0", 10) || 0).toLocaleString()}
              </span>
            </div>
          ))}
          {/* Total row */}
          <div className="flex items-center justify-between px-4 py-4 bg-accent-subtle4x border-t-2 border-gray-20">
            <span className="font-sans text-[15px] text-gray-100 font-semibold">
              Monthly total
            </span>
            <span className="font-sans text-[18px] text-gray-100 font-semibold">
              ${total.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Coverage recommendation */}
        <div className="rounded-xl bg-cypress-10 border border-cypress-100/20 p-4 mb-6">
          <div className="text-[11px] text-cypress-100 font-sans uppercase tracking-wide font-medium mb-1">
            Recommended coverage
          </div>
          <div className="font-serif text-[28px] text-cypress-125 leading-tight">
            ${recommendedCoverage.toLocaleString()}
          </div>
          <div className="text-[12px] text-gray-60 font-sans mt-1">
            Based on 10 years of expenses · ${annualTotal.toLocaleString()} / year
          </div>
        </div>

        <PrimaryButton label="Confirm & continue" onClick={handleComplete} />
      </StepContent>
    );
  };

  // ──── Completion screen ────
  const renderCompletionScreen = () => (
    <StepContent key="completion">
      <div className="flex flex-col items-center text-center pt-12 pb-8">
        <div className="w-[72px] h-[72px] rounded-full bg-cypress-100 flex items-center justify-center mb-6">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h2 className="font-serif text-[28px] text-gray-100 leading-snug mb-3">
          You&apos;re all set!
        </h2>
        <p className="text-[14px] text-gray-60 font-sans leading-relaxed mb-10 max-w-[260px]">
          Your living expenses have been saved. We&apos;ll use this to recommend
          the right coverage for your family.
        </p>
        <PrimaryButton label="Restart Demo" onClick={resetState} />
      </div>
    </StepContent>
  );

  const handleBack = () => {
    if (isComplete) {
      animateTransition("right", () => setIsComplete(false));
    } else {
      goBack();
    }
  };

  const renderContent = () => {
    if (isComplete) return renderCompletionScreen();
    switch (step) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      default: return null;
    }
  };

  return (
    <CanvasLayout
      isPrefill={isPrefill}
      onTogglePrefill={handleTogglePrefill}
      currentPattern="baseline"
      patternTitle="Category Checklist"
      patternDescription="Category-first selection followed by per-category amount entry. Tests whether letting users choose applicable categories first reduces the intimidation of a blank expense form."
    >
      <EthosHeader onBack={handleBack} showBack={step > 1 || isComplete} />
      <ProgressBar progress={getProgress()} />
      <div className="relative overflow-hidden">
        <div
          style={{
            transform: getSlideTransform(),
            transition:
              animPhase === "enter" ? "none" : "transform 250ms ease-in-out",
          }}
        >
          {renderContent()}
        </div>
      </div>
    </CanvasLayout>
  );
}

function StepContent({ children }: { children: React.ReactNode }) {
  return <div className="px-5 py-4">{children}</div>;
}
