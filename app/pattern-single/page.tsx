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

const HOUSEHOLD_MEMBERS = [
  { name: "Sarah Johnson", icon: "👥" },
  { name: "Emma Johnson", icon: "👶" },
];

const RELATIONSHIP_OPTIONS = [
  { value: "Spouse / Partner", icon: "💑" },
  { value: "Child", icon: "👶" },
  { value: "Parent", icon: "👪" },
  { value: "Sibling", icon: "👫" },
  { value: "Other", icon: "👤" },
];

interface Beneficiary {
  name: string;
  relationship: string;
  birthdate: string;
}

export default function PatternSingle() {
  const [isPrefill, setIsPrefill] = useState(true);
  const [step, setStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);

  // Primary beneficiary
  const [primaryBene, setPrimaryBene] = useState<Beneficiary | null>(null);
  const [selectedMember, setSelectedMember] = useState("");

  // Additional beneficiaries
  const [additionalBenes, setAdditionalBenes] = useState<Beneficiary[]>([]);
  const [showAddAnother, setShowAddAnother] = useState(false);

  // Current input state
  const [tempName, setTempName] = useState("");
  const [tempRelationship, setTempRelationship] = useState("");
  const [tempBirthdate, setTempBirthdate] = useState("");

  // Animation state
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("left");
  const [animPhase, setAnimPhase] = useState<"idle" | "exit" | "enter">("idle");

  const resetState = () => {
    setStep(1);
    setIsComplete(false);
    setPrimaryBene(null);
    setSelectedMember("");
    setAdditionalBenes([]);
    setShowAddAnother(false);
    setTempName("");
    setTempRelationship("");
    setTempBirthdate("");
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

  const getProgress = () => {
    if (isComplete) return 100;
    const totalSteps = showAddAnother ? 3 : 2;
    return (step / totalSteps) * 100;
  };

  // PREFILL FLOW
  const renderPrefillFlow = () => {
    if (step === 1) {
      // Screen 1: Large household member cards
      return (
        <StepContent key="prefill-1">
          <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-2">
            Who would you like to protect?
          </h2>
          <p className="text-[14px] text-gray-60 mb-6 font-sans leading-relaxed">
            Select the person you want to protect most.
          </p>
          <div className="space-y-3 mb-6">
            {HOUSEHOLD_MEMBERS.map((member) => (
              <button
                key={member.name}
                onClick={() => setSelectedMember(member.name)}
                className={`w-full p-4 rounded-xl border-2 transition-all ${
                  selectedMember === member.name
                    ? "border-cypress-100 bg-cypress-100/10"
                    : "border-gray-20 hover:border-gray-40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-[32px]">{member.icon}</div>
                  <div className="text-left">
                    <div className="font-sans text-[16px] text-gray-100">
                      {member.name}
                    </div>
                    <div className="font-sans text-[12px] text-gray-60">
                      From your household
                    </div>
                  </div>
                </div>
              </button>
            ))}
            <button
              onClick={() => setSelectedMember("Someone else")}
              className={`w-full p-4 rounded-xl border-2 transition-all ${
                selectedMember === "Someone else"
                  ? "border-cypress-100 bg-cypress-100/10"
                  : "border-gray-20 hover:border-gray-40"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="text-[32px]">👤</div>
                <div className="text-left">
                  <div className="font-sans text-[16px] text-gray-100">
                    Someone else
                  </div>
                  <div className="font-sans text-[12px] text-gray-60">
                    Add a new person
                  </div>
                </div>
              </div>
            </button>
          </div>
          <InfoBanner message="Most people choose one primary beneficiary — you can always add more later." />
          <PrimaryButton
            label="Continue"
            onClick={goNext}
            disabled={!selectedMember}
          />
        </StepContent>
      );
    }

    if (step === 2) {
      // Screen 2: Combined name + birthdate + relationship
      const isHouseholdMember = selectedMember !== "Someone else";
      return (
        <StepContent key="prefill-2">
          <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-2">
            {isHouseholdMember
              ? `Let's confirm ${selectedMember.split(" ")[0]}'s details`
              : "Who would you like to protect?"}
          </h2>
          <p className="text-[14px] text-gray-60 mb-6 font-sans leading-relaxed">
            We need just a few details to set up your policy.
          </p>

          {isHouseholdMember ? (
            <TextInput
              label="Beneficiary name"
              value={selectedMember}
              readOnly
            />
          ) : (
            <TextInput
              label="Beneficiary name"
              value={tempName}
              placeholder="Enter name"
              onChange={setTempName}
            />
          )}

          <SelectDropdown
            label="Relationship"
            value={tempRelationship}
            options={RELATIONSHIP_OPTIONS.map(r => r.value)}
            placeholder="Select relationship"
            onChange={setTempRelationship}
          />

          <DateInput
            label="Birthdate"
            value={tempBirthdate}
            onChange={setTempBirthdate}
          />

          <PrimaryButton
            label="Next"
            onClick={() => {
              const beneName = isHouseholdMember ? selectedMember : tempName.trim();
              setPrimaryBene({
                name: beneName,
                relationship: tempRelationship,
                birthdate: tempBirthdate,
              });
              setTempName("");
              setTempRelationship("");
              setTempBirthdate("");

              if (showAddAnother) {
                goNext();
              } else {
                handleComplete();
              }
            }}
            disabled={
              (!isHouseholdMember && !tempName.trim()) ||
              !tempRelationship ||
              !tempBirthdate
            }
          />

          {/* Subtle "Add another" option */}
          {!showAddAnother && (
            <button
              onClick={() => setShowAddAnother(true)}
              className="w-full mt-4 py-2 text-center text-gray-60 font-sans text-sm hover:text-gray-100 transition-colors"
            >
              + Add another person
            </button>
          )}
        </StepContent>
      );
    }

    if (step === 3 && showAddAnother) {
      // Screen 3: Additional beneficiary (inline)
      return (
        <StepContent key="prefill-3">
          <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-2">
            Add another person to protect
          </h2>
          <p className="text-[14px] text-gray-60 mb-6 font-sans leading-relaxed">
            You can add as many beneficiaries as you&apos;d like.
          </p>

          {/* Show primary beneficiary (read-only) */}
          {primaryBene && (
            <div className="mb-4 p-3 bg-gray-5 rounded-lg">
              <div className="font-sans text-xs text-gray-60 mb-1">Primary beneficiary</div>
              <div className="font-sans text-sm text-gray-100">{primaryBene.name}</div>
            </div>
          )}

          <TextInput
            label="Beneficiary name"
            value={tempName}
            placeholder="Enter name"
            onChange={setTempName}
          />

          <SelectDropdown
            label="Relationship"
            value={tempRelationship}
            options={RELATIONSHIP_OPTIONS.map(r => r.value)}
            placeholder="Select relationship"
            onChange={setTempRelationship}
          />

          <DateInput
            label="Birthdate"
            value={tempBirthdate}
            onChange={setTempBirthdate}
          />

          <PrimaryButton
            label="Next"
            onClick={() => {
              setAdditionalBenes([
                ...additionalBenes,
                {
                  name: tempName.trim(),
                  relationship: tempRelationship,
                  birthdate: tempBirthdate,
                },
              ]);
              handleComplete();
            }}
            disabled={!tempName.trim() || !tempRelationship || !tempBirthdate}
          />
        </StepContent>
      );
    }

    return null;
  };

  // NO-PREFILL FLOW
  const renderNoPrefillFlow = () => {
    if (step === 1) {
      // Screen 1: Large relationship selector with icons
      return (
        <StepContent key="noprefill-1">
          <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-2">
            Who would you like to protect?
          </h2>
          <p className="text-[14px] text-gray-60 mb-6 font-sans leading-relaxed">
            Select the relationship of the person you want to protect most.
          </p>
          <div className="space-y-3 mb-6">
            {RELATIONSHIP_OPTIONS.map((rel) => (
              <button
                key={rel.value}
                onClick={() => setTempRelationship(rel.value)}
                className={`w-full p-4 rounded-xl border-2 transition-all ${
                  tempRelationship === rel.value
                    ? "border-cypress-100 bg-cypress-100/10"
                    : "border-gray-20 hover:border-gray-40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-[32px]">{rel.icon}</div>
                  <div className="text-left">
                    <div className="font-sans text-[16px] text-gray-100">
                      {rel.value}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <InfoBanner message="Most people choose one primary beneficiary — you can always add more later." />
          <PrimaryButton
            label="Continue"
            onClick={goNext}
            disabled={!tempRelationship}
          />
        </StepContent>
      );
    }

    if (step === 2) {
      // Screen 2: Name + birthdate on same screen
      return (
        <StepContent key="noprefill-2">
          <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-2">
            Tell us about your {tempRelationship.toLowerCase()}
          </h2>
          <p className="text-[14px] text-gray-60 mb-6 font-sans leading-relaxed">
            We need just a few details to set up your policy.
          </p>

          <TextInput
            label="Beneficiary name"
            value={tempName}
            placeholder="Enter name"
            onChange={setTempName}
          />

          <DateInput
            label="Birthdate"
            value={tempBirthdate}
            onChange={setTempBirthdate}
          />

          <PrimaryButton
            label="Next"
            onClick={() => {
              setPrimaryBene({
                name: tempName.trim(),
                relationship: tempRelationship,
                birthdate: tempBirthdate,
              });
              setTempName("");
              setTempRelationship("");
              setTempBirthdate("");

              if (showAddAnother) {
                goNext();
              } else {
                handleComplete();
              }
            }}
            disabled={!tempName.trim() || !tempBirthdate}
          />

          {/* Subtle "Add another" option */}
          {!showAddAnother && (
            <button
              onClick={() => setShowAddAnother(true)}
              className="w-full mt-4 py-2 text-center text-gray-60 font-sans text-sm hover:text-gray-100 transition-colors"
            >
              + Add another person
            </button>
          )}
        </StepContent>
      );
    }

    if (step === 3 && showAddAnother) {
      // Screen 3: Additional beneficiary
      return (
        <StepContent key="noprefill-3">
          <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-2">
            Add another person to protect
          </h2>
          <p className="text-[14px] text-gray-60 mb-6 font-sans leading-relaxed">
            You can add as many beneficiaries as you&apos;d like.
          </p>

          {/* Show primary beneficiary (read-only) */}
          {primaryBene && (
            <div className="mb-4 p-3 bg-gray-5 rounded-lg">
              <div className="font-sans text-xs text-gray-60 mb-1">Primary beneficiary</div>
              <div className="font-sans text-sm text-gray-100">{primaryBene.name}</div>
            </div>
          )}

          <SelectDropdown
            label="Relationship"
            value={tempRelationship}
            options={RELATIONSHIP_OPTIONS.map(r => r.value)}
            placeholder="Select relationship"
            onChange={setTempRelationship}
          />

          <TextInput
            label="Beneficiary name"
            value={tempName}
            placeholder="Enter name"
            onChange={setTempName}
          />

          <DateInput
            label="Birthdate"
            value={tempBirthdate}
            onChange={setTempBirthdate}
          />

          <PrimaryButton
            label="Next"
            onClick={() => {
              setAdditionalBenes([
                ...additionalBenes,
                {
                  name: tempName.trim(),
                  relationship: tempRelationship,
                  birthdate: tempBirthdate,
                },
              ]);
              handleComplete();
            }}
            disabled={!tempName.trim() || !tempRelationship || !tempBirthdate}
          />
        </StepContent>
      );
    }

    return null;
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
            Your loved ones are now protected. You&apos;re one step closer to receiving your unique Real Rate.
          </p>
          <PrimaryButton label="Restart Demo" onClick={resetState} />
        </div>
      </StepContent>
    );
  };

  const handleBack = () => {
    if (isComplete) {
      animateTransition("right", () => setIsComplete(false));
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
      currentPattern="single"
      patternTitle="Single Focus + Expansion"
      patternDescription="Optimized for the most common case (one beneficiary). Tests whether combining fields and de-emphasizing multi-beneficiary creates a premium, focused experience."
      patternBullets={[
        "Optimized for single beneficiary (most common case)",
        "Combines fields intelligently to reduce steps",
        "Adding second beneficiary feels subtle and optional",
        "Large, tactile selection with icons for visual clarity",
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
