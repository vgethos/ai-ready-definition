"use client";

import { useState } from "react";
import CanvasLayout from "@/components/CanvasLayout";
import EthosHeader from "@/components/EthosHeader";
import ProgressBar from "@/components/ProgressBar";
import TextInput from "@/components/TextInput";
import SelectDropdown from "@/components/SelectDropdown";
import DateInput from "@/components/DateInput";
import PrimaryButton from "@/components/PrimaryButton";
import InfoBanner from "@/components/InfoBanner";
import CheckboxList from "@/components/CheckboxList";

const HOUSEHOLD_MEMBERS = ["Sarah Johnson", "Emma Johnson"];
const VERIFICATION_OPTIONS = [...HOUSEHOLD_MEMBERS, "None of these"];

const RELATIONSHIP_OPTIONS = [
  "Spouse / Partner",
  "Child",
  "Parent",
  "Sibling",
  "Other",
];

export default function PatternVerification() {
  const [isPrefill, setIsPrefill] = useState(true);
  const [step, setStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);

  // Prefill path state
  const [verifiedMembers, setVerifiedMembers] = useState<string[]>([]);
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState<string[]>([]);
  const [birthdates, setBirthdates] = useState<Record<string, string>>({});
  const [customName, setCustomName] = useState("");

  // No-prefill path state
  const [selectedRelationship, setSelectedRelationship] = useState("Spouse / Partner");
  const [noPrefillName, setNoPrefillName] = useState("");
  const [noPrefillBirthdate, setNoPrefillBirthdate] = useState("");
  const [addAnother, setAddAnother] = useState(false);
  const [additionalRelationship, setAdditionalRelationship] = useState("Child");
  const [additionalName, setAdditionalName] = useState("");
  const [additionalBirthdate, setAdditionalBirthdate] = useState("");

  // Animation state
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("left");
  const [animPhase, setAnimPhase] = useState<"idle" | "exit" | "enter">("idle");

  const resetState = () => {
    setStep(1);
    setIsComplete(false);
    setVerifiedMembers([]);
    setSelectedBeneficiaries([]);
    setBirthdates({});
    setCustomName("");
    setSelectedRelationship("Spouse / Partner");
    setNoPrefillName("");
    setNoPrefillBirthdate("");
    setAddAnother(false);
    setAdditionalRelationship("Child");
    setAdditionalName("");
    setAdditionalBirthdate("");
    setAnimPhase("idle");
    setSlideDirection("left");
  };

  const handleTogglePrefill = () => {
    setIsPrefill(!isPrefill);
    resetState();
  };

  const animateTransition = (direction: "left" | "right", action: () => void) => {
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

  const getSlideTransform = () => {
    if (animPhase === "idle") return "translateX(0)";
    if (animPhase === "exit") {
      return slideDirection === "left" ? "translateX(-100%)" : "translateX(100%)";
    }
    return slideDirection === "left" ? "translateX(100%)" : "translateX(-100%)";
  };

  // Prefill: verified names (excluding "None of these")
  const verifiedNames = verifiedMembers.filter((m) => m !== "None of these");
  const noneSelected = verifiedMembers.includes("None of these");

  // Build selection options from verified names + "Someone else"
  const selectionOptions = [...verifiedNames, "Someone else"];

  // All final beneficiary names
  const getAllBeneficiaries = (): string[] => {
    const benes = selectedBeneficiaries.filter((b) => b !== "Someone else");
    if (selectedBeneficiaries.includes("Someone else") && customName.trim()) {
      benes.push(customName.trim());
    }
    return benes;
  };

  const getProgress = () => {
    if (isComplete) return 100;
    if (isPrefill) {
      // Steps: 1 (verify), 2 (select), 3 (birthdates) — optionally with custom name sub-step
      const hasSomeoneElse = selectedBeneficiaries.includes("Someone else");
      const totalSteps = hasSomeoneElse ? 4 : 3;
      return (step / totalSteps) * 100;
    } else {
      // Steps: 1 (relationship), 2 (name), 3 (birthdate), 4 (add another?)
      const totalSteps = addAnother ? 7 : 4;
      return (step / totalSteps) * 100;
    }
  };

  // ──── PREFILL FLOW ────
  const renderPrefillFlow = () => {
    switch (step) {
      case 1:
        return (
          <StepContent key="verify-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-[28px] h-[28px] rounded-full bg-cypress-100/10 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#056257" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <span className="font-sans text-[12px] text-cypress-100 font-medium uppercase tracking-wide">
                Verification
              </span>
            </div>
            <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-2">
              For verification purposes, which of these people are in your household?
            </h2>
            <p className="text-[14px] text-gray-60 mb-6 font-sans leading-relaxed">
              This helps us confirm your identity and protect your account.
            </p>
            <CheckboxList
              items={VERIFICATION_OPTIONS}
              selected={verifiedMembers}
              onChange={setVerifiedMembers}
            />
            <PrimaryButton
              label="Verify & Continue"
              onClick={() => {
                if (noneSelected || verifiedNames.length === 0) {
                  // Skip to a no-prefill-like flow — jump to step 5 (relationship)
                  animateTransition("left", () => setStep(5));
                } else {
                  goNext();
                }
              }}
              disabled={verifiedMembers.length === 0}
            />
          </StepContent>
        );

      case 2:
        return (
          <StepContent key="verify-2">
            <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-2">
              Great. Which of them would you like your policy to protect?
            </h2>
            <p className="text-[14px] text-gray-60 mb-6 font-sans leading-relaxed">
              Select the people you&apos;d like as beneficiaries on your policy.
            </p>
            <CheckboxList
              items={selectionOptions}
              selected={selectedBeneficiaries}
              onChange={setSelectedBeneficiaries}
            />
            <InfoBanner message="Most people choose a spouse or a child as their beneficiary. You can add or update your beneficiaries online anytime." />
            <PrimaryButton
              label="Continue"
              onClick={() => {
                const hasSomeoneElse = selectedBeneficiaries.includes("Someone else");
                if (hasSomeoneElse) {
                  goNext(); // Step 3: custom name
                } else {
                  animateTransition("left", () => setStep(4)); // Step 4: birthdates
                }
              }}
              disabled={selectedBeneficiaries.length === 0}
            />
          </StepContent>
        );

      case 3:
        // Custom name for "Someone else"
        return (
          <StepContent key="verify-3">
            <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-2">
              Who else would you like to add?
            </h2>
            <p className="text-[14px] text-gray-60 mb-6 font-sans leading-relaxed">
              Enter the name of the additional person you&apos;d like to protect.
            </p>
            <TextInput
              label="Beneficiary name"
              value={customName}
              placeholder="Enter full name"
              onChange={setCustomName}
            />
            <PrimaryButton
              label="Next"
              onClick={goNext}
              disabled={!customName.trim()}
            />
          </StepContent>
        );

      case 4: {
        // Birthdate collection for all selected beneficiaries
        const allBenes = getAllBeneficiaries();
        const isSingle = allBenes.length === 1;
        return (
          <StepContent key="verify-4">
            <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-2">
              {isSingle
                ? `When was ${allBenes[0]} born?`
                : "Confirm your beneficiaries\u2019 birthdates"}
            </h2>
            <p className="text-[14px] text-gray-60 mb-6 font-sans leading-relaxed">
              Last step before you can receive your unique Real Rate.
            </p>
            {allBenes.map((name) => (
              <DateInput
                key={name}
                label={name}
                value={birthdates[name] || ""}
                onChange={(val) => setBirthdates({ ...birthdates, [name]: val })}
              />
            ))}
            <PrimaryButton label="Complete" onClick={handleComplete} />
          </StepContent>
        );
      }

      // Fallback if "None of these" was selected — enter relationship flow
      case 5:
        return (
          <StepContent key="verify-5">
            <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-2">
              Who would you like your policy to protect?
            </h2>
            <p className="text-[14px] text-gray-60 mb-6 font-sans leading-relaxed">
              Tell us about your beneficiary.
            </p>
            <SelectDropdown
              label="Relationship"
              value={selectedRelationship}
              options={RELATIONSHIP_OPTIONS}
              onChange={setSelectedRelationship}
            />
            <PrimaryButton label="Continue" onClick={goNext} />
          </StepContent>
        );

      case 6:
        return (
          <StepContent key="verify-6">
            <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-2">
              What is the name of your {selectedRelationship.toLowerCase()}?
            </h2>
            <p className="text-[14px] text-gray-60 mb-6 font-sans leading-relaxed">
              You can add more beneficiaries at anytime.
            </p>
            <TextInput
              label="Beneficiary name"
              value={noPrefillName}
              placeholder="Enter full name"
              onChange={setNoPrefillName}
            />
            <PrimaryButton label="Next" onClick={goNext} disabled={!noPrefillName.trim()} />
          </StepContent>
        );

      case 7:
        return (
          <StepContent key="verify-7">
            <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-2">
              When was {noPrefillName || "your beneficiary"} born?
            </h2>
            <p className="text-[14px] text-gray-60 mb-6 font-sans leading-relaxed">
              Last step before you can receive your unique Real Rate.
            </p>
            <DateInput
              label={noPrefillName || "Beneficiary"}
              value={noPrefillBirthdate}
              onChange={setNoPrefillBirthdate}
            />
            <PrimaryButton label="Complete" onClick={handleComplete} />
          </StepContent>
        );

      default:
        return null;
    }
  };

  // ──── NO-PREFILL FLOW ────
  const renderNoPrefillFlow = () => {
    switch (step) {
      case 1:
        return (
          <StepContent key="noprefill-1">
            <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-2">
              Who would you like your policy to protect?
            </h2>
            <p className="text-[14px] text-gray-60 mb-6 font-sans leading-relaxed">
              These loved ones receive your life insurance payout if you pass away.
            </p>
            <SelectDropdown
              label="Relationship"
              value={selectedRelationship}
              options={RELATIONSHIP_OPTIONS}
              onChange={setSelectedRelationship}
            />
            <PrimaryButton label="Continue" onClick={goNext} />
          </StepContent>
        );

      case 2:
        return (
          <StepContent key="noprefill-2">
            <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-2">
              What is the name of your {selectedRelationship.toLowerCase()}?
            </h2>
            <p className="text-[14px] text-gray-60 mb-6 font-sans leading-relaxed">
              You can add or update your beneficiaries anytime.
            </p>
            <TextInput
              label="Beneficiary name"
              value={noPrefillName}
              placeholder="Enter full name"
              onChange={setNoPrefillName}
            />
            <PrimaryButton label="Next" onClick={goNext} disabled={!noPrefillName.trim()} />
          </StepContent>
        );

      case 3:
        return (
          <StepContent key="noprefill-3">
            <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-2">
              When was {noPrefillName || "your beneficiary"} born?
            </h2>
            <p className="text-[14px] text-gray-60 mb-6 font-sans leading-relaxed">
              This helps us set up your policy correctly.
            </p>
            <DateInput
              label={noPrefillName || "Beneficiary"}
              value={noPrefillBirthdate}
              onChange={setNoPrefillBirthdate}
            />
            <PrimaryButton label="Next" onClick={goNext} />
          </StepContent>
        );

      case 4:
        return (
          <StepContent key="noprefill-4">
            <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-2">
              Would you like to add another beneficiary?
            </h2>
            <p className="text-[14px] text-gray-60 mb-6 font-sans leading-relaxed">
              You can protect multiple loved ones with your policy.
            </p>
            <div className="space-y-3 mb-6">
              {/* Summary of first beneficiary */}
              <div className="p-4 rounded-xl bg-accent-subtle4x border border-gray-20">
                <div className="flex items-center gap-3">
                  <div className="w-[36px] h-[36px] rounded-full bg-cypress-100 flex items-center justify-center text-white font-sans text-[14px] font-medium">
                    {(noPrefillName || "B")[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="font-sans text-[16px] text-gray-100">{noPrefillName}</div>
                    <div className="font-sans text-[12px] text-gray-60">{selectedRelationship}</div>
                  </div>
                  <div className="ml-auto text-cypress-100">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setAddAnother(true);
                  goNext();
                }}
                className="w-full p-4 rounded-xl border-2 border-dashed border-gray-20 hover:border-cypress-100 transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-[36px] h-[36px] rounded-full border-2 border-cypress-100 flex items-center justify-center text-cypress-100 font-sans text-[18px]">
                    +
                  </div>
                  <div className="font-sans text-[16px] text-gray-100">
                    Yes, add another person
                  </div>
                </div>
              </button>
            </div>
            <PrimaryButton label="No, I\u2019m done" onClick={handleComplete} />
          </StepContent>
        );

      // Additional beneficiary flow
      case 5:
        return (
          <StepContent key="noprefill-5">
            <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-2">
              Who else would you like to protect?
            </h2>
            <p className="text-[14px] text-gray-60 mb-6 font-sans leading-relaxed">
              Select their relationship to you.
            </p>
            <SelectDropdown
              label="Relationship"
              value={additionalRelationship}
              options={RELATIONSHIP_OPTIONS}
              onChange={setAdditionalRelationship}
            />
            <PrimaryButton label="Continue" onClick={goNext} />
          </StepContent>
        );

      case 6:
        return (
          <StepContent key="noprefill-6">
            <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-2">
              What is the name of your {additionalRelationship.toLowerCase()}?
            </h2>
            <p className="text-[14px] text-gray-60 mb-6 font-sans leading-relaxed">
              You can add more beneficiaries at anytime.
            </p>
            <TextInput
              label="Beneficiary name"
              value={additionalName}
              placeholder="Enter full name"
              onChange={setAdditionalName}
            />
            <PrimaryButton label="Next" onClick={goNext} disabled={!additionalName.trim()} />
          </StepContent>
        );

      case 7:
        return (
          <StepContent key="noprefill-7">
            <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-2">
              When was {additionalName || "your beneficiary"} born?
            </h2>
            <p className="text-[14px] text-gray-60 mb-6 font-sans leading-relaxed">
              Last step before you can receive your unique Real Rate.
            </p>
            <DateInput
              label={additionalName || "Beneficiary"}
              value={additionalBirthdate}
              onChange={setAdditionalBirthdate}
            />
            <PrimaryButton label="Complete" onClick={handleComplete} />
          </StepContent>
        );

      default:
        return null;
    }
  };

  const renderCompletionScreen = () => {
    return (
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
            Your beneficiary information has been saved. You&apos;re one step
            closer to receiving your unique Real Rate.
          </p>
          <PrimaryButton label="Restart Demo" onClick={resetState} />
        </div>
      </StepContent>
    );
  };

  const handleBack = () => {
    if (isComplete) {
      animateTransition("right", () => setIsComplete(false));
    } else if (isPrefill) {
      // Handle prefill back navigation
      if (step === 4 && !selectedBeneficiaries.includes("Someone else")) {
        animateTransition("right", () => setStep(2));
      } else if (step === 5) {
        animateTransition("right", () => setStep(1));
      } else {
        goBack();
      }
    } else {
      goBack();
    }
  };

  const renderContent = () => {
    if (isComplete) return renderCompletionScreen();
    return isPrefill ? renderPrefillFlow() : renderNoPrefillFlow();
  };

  return (
    <CanvasLayout
      isPrefill={isPrefill}
      onTogglePrefill={handleTogglePrefill}
      currentPattern="verification"
      patternTitle="Verification Frame"
      patternDescription="Positions household data as a verification step, building trust before transitioning to beneficiary selection. Two-step funnel: verify household → then select who to protect."
      patternBullets={[
        "Positions household data as a verification step, building trust",
        "Two-step funnel: verify household \u2192 then select who to protect",
        "Separates \u201Cwho lives here\u201D from \u201Cwho to insure\u201D (intentionally)",
        "Tests whether verification framing increases confidence",
      ]}
    >
      <EthosHeader onBack={handleBack} showBack={step > 1 || isComplete} />
      <ProgressBar progress={getProgress()} />
      <div className="relative overflow-hidden">
        <div
          style={{
            transform: getSlideTransform(),
            transition: animPhase === "enter" ? "none" : "transform 250ms ease-in-out",
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
