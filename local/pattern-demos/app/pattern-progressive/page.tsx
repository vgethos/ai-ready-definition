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

const HOUSEHOLD_MEMBERS = ["Sarah Johnson", "Emma Johnson", "Someone else"];
const RELATIONSHIP_OPTIONS = [
  "Spouse / Partner",
  "Child",
  "Parent",
  "Sibling",
  "Other",
];

interface Beneficiary {
  name: string;
  relationship: string;
  birthdate: string;
  isHouseholdMember: boolean;
}

export default function PatternProgressive() {
  const [isPrefill, setIsPrefill] = useState(true);
  const [step, setStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);

  // Beneficiaries list
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [currentBeneIndex, setCurrentBeneIndex] = useState(0);

  // Prefill path state
  const [selectedHousehold, setSelectedHousehold] = useState<string[]>([]);

  // Current beneficiary being edited
  const [tempName, setTempName] = useState("");
  const [tempRelationship, setTempRelationship] = useState("Spouse / Partner");
  const [tempBirthdate, setTempBirthdate] = useState("");

  // Animation state
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("left");
  const [animPhase, setAnimPhase] = useState<"idle" | "exit" | "enter">("idle");

  const resetState = () => {
    setStep(1);
    setIsComplete(false);
    setBeneficiaries([]);
    setCurrentBeneIndex(0);
    setSelectedHousehold([]);
    setTempName("");
    setTempRelationship("Spouse / Partner");
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
    // Progressive pattern: dynamic based on flow
    if (isPrefill) {
      // Prefill: selection → birthdate → relationship → add another? → complete
      const totalSteps = 4 + beneficiaries.length;
      return (step / totalSteps) * 100;
    } else {
      // No-prefill: relationship → name → birthdate → add another? → complete
      const totalSteps = 4 + beneficiaries.length;
      return (step / totalSteps) * 100;
    }
  };

  // PREFILL FLOW
  const renderPrefillFlow = () => {
    if (step === 1) {
      // Screen 1: Who do you want to protect?
      return (
        <StepContent key="prefill-1">
          <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-2">
            Who do you want to protect?
          </h2>
          <p className="text-[14px] text-gray-60 mb-6 font-sans leading-relaxed">
            We&apos;ve suggested people based on your household info.
          </p>
          <CheckboxList
            items={HOUSEHOLD_MEMBERS}
            selected={selectedHousehold}
            onChange={setSelectedHousehold}
          />
          <InfoBanner message="Your policy ensures the people you care about most are protected, no matter what." />
          <PrimaryButton
            label="Continue"
            onClick={() => {
              // Initialize beneficiaries from selections
              const newBenes: Beneficiary[] = [];
              selectedHousehold.forEach(name => {
                if (name !== "Someone else") {
                  newBenes.push({
                    name,
                    relationship: "",
                    birthdate: "",
                    isHouseholdMember: true,
                  });
                }
              });
              setBeneficiaries(newBenes);
              setCurrentBeneIndex(0);

              if (selectedHousehold.includes("Someone else")) {
                // Go to name entry for "Someone else"
                goNext();
              } else if (newBenes.length > 0) {
                // Skip to birthdate entry
                animateTransition("left", () => setStep(2));
              } else {
                goNext();
              }
            }}
            disabled={selectedHousehold.length === 0}
          />
        </StepContent>
      );
    }

    if (step === 2 && selectedHousehold.includes("Someone else")) {
      // Screen 2: Name for "Someone else"
      return (
        <StepContent key="prefill-2-name">
          <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-2">
            What is their name?
          </h2>
          <p className="text-[14px] text-gray-60 mb-6 font-sans leading-relaxed">
            Let&apos;s add someone outside your household.
          </p>
          <TextInput
            label="Beneficiary name"
            value={tempName}
            placeholder="Enter name"
            onChange={setTempName}
          />
          <PrimaryButton
            label="Next"
            onClick={() => {
              if (tempName.trim()) {
                setBeneficiaries(prev => [
                  ...prev,
                  {
                    name: tempName.trim(),
                    relationship: "",
                    birthdate: "",
                    isHouseholdMember: false,
                  },
                ]);
                setTempName("");
              }
              goNext();
            }}
            disabled={!tempName.trim()}
          />
        </StepContent>
      );
    }

    // Screen 3: Birthdate for current beneficiary
    if (step === 2 || (step === 3 && selectedHousehold.includes("Someone else"))) {
      const adjustedStep = selectedHousehold.includes("Someone else") ? 3 : 2;
      if (step === adjustedStep && currentBeneIndex < beneficiaries.length) {
        const currentBene = beneficiaries[currentBeneIndex];
        return (
          <StepContent key={`prefill-birthdate-${currentBeneIndex}`}>
            <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-2">
              When was {currentBene.name} born?
            </h2>
            <p className="text-[14px] text-gray-60 mb-6 font-sans leading-relaxed">
              This helps us set up your policy correctly.
            </p>
            <DateInput
              label={currentBene.name}
              value={tempBirthdate}
              onChange={setTempBirthdate}
            />
            <PrimaryButton
              label="Next"
              onClick={() => {
                // Save birthdate
                const updated = [...beneficiaries];
                updated[currentBeneIndex].birthdate = tempBirthdate;
                setBeneficiaries(updated);
                setTempBirthdate("");

                if (currentBeneIndex < beneficiaries.length - 1) {
                  // More beneficiaries to get birthdates for
                  animateTransition("left", () => {
                    setCurrentBeneIndex(prev => prev + 1);
                  });
                } else {
                  // All birthdates collected, move to relationship
                  setCurrentBeneIndex(0);
                  goNext();
                }
              }}
              disabled={!tempBirthdate}
            />
          </StepContent>
        );
      }
    }

    // Screen 4: Relationship for current beneficiary
    const relationshipStep = selectedHousehold.includes("Someone else") ? 4 : 3;
    if (step === relationshipStep && currentBeneIndex < beneficiaries.length) {
      const currentBene = beneficiaries[currentBeneIndex];
      return (
        <StepContent key={`prefill-relationship-${currentBeneIndex}`}>
          <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-2">
            How is {currentBene.name} related to you?
          </h2>
          <p className="text-[14px] text-gray-60 mb-6 font-sans leading-relaxed">
            This helps us set up your policy correctly.
          </p>
          <SelectDropdown
            label="Relationship"
            value={tempRelationship}
            options={RELATIONSHIP_OPTIONS}
            onChange={setTempRelationship}
          />
          <PrimaryButton
            label="Next"
            onClick={() => {
              // Save relationship
              const updated = [...beneficiaries];
              updated[currentBeneIndex].relationship = tempRelationship;
              setBeneficiaries(updated);
              setTempRelationship("Spouse / Partner");

              if (currentBeneIndex < beneficiaries.length - 1) {
                // More beneficiaries to get relationships for
                animateTransition("left", () => {
                  setCurrentBeneIndex(prev => prev + 1);
                });
              } else {
                // All relationships collected, move to "add another"
                goNext();
              }
            }}
          />
        </StepContent>
      );
    }

    // Screen 5: Add another?
    const addAnotherStep = selectedHousehold.includes("Someone else") ? 5 : 4;
    if (step === addAnotherStep) {
      return (
        <StepContent key="prefill-add-another">
          <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-2">
            Would you like to add another person?
          </h2>
          <p className="text-[14px] text-gray-60 mb-6 font-sans leading-relaxed">
            You can protect additional loved ones if you&apos;d like.
          </p>
          <div className="space-y-3">
            <PrimaryButton
              label="Yes, add another"
              onClick={() => {
                setTempName("");
                setTempRelationship("Spouse / Partner");
                setTempBirthdate("");
                animateTransition("left", () => setStep(selectedHousehold.includes("Someone else") ? 2 : 2));
              }}
            />
            <button
              onClick={handleComplete}
              className="w-full py-3 text-center text-gray-60 font-sans text-sm hover:text-gray-100 transition-colors"
            >
              No, I&apos;m done
            </button>
          </div>
        </StepContent>
      );
    }

    return null;
  };

  // NO-PREFILL FLOW
  const renderNoPrefillFlow = () => {
    if (step === 1) {
      // Screen 1: Relationship
      return (
        <StepContent key="noprefill-1">
          <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-2">
            Who do you want to protect?
          </h2>
          <p className="text-[14px] text-gray-60 mb-6 font-sans leading-relaxed">
            Let&apos;s start with the person you&apos;d like to protect most.
          </p>
          <SelectDropdown
            label="Relationship"
            value={tempRelationship}
            options={RELATIONSHIP_OPTIONS}
            onChange={setTempRelationship}
          />
          <InfoBanner message="Your policy ensures the people you care about most are protected, no matter what." />
          <PrimaryButton label="Continue" onClick={goNext} />
        </StepContent>
      );
    }

    if (step === 2) {
      // Screen 2: Name
      return (
        <StepContent key="noprefill-2">
          <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-2">
            What is your {tempRelationship.toLowerCase()}&apos;s name?
          </h2>
          <p className="text-[14px] text-gray-60 mb-6 font-sans leading-relaxed">
            We&apos;ll make sure they&apos;re taken care of.
          </p>
          <TextInput
            label="Beneficiary name"
            value={tempName}
            placeholder="Enter name"
            onChange={setTempName}
          />
          <PrimaryButton
            label="Next"
            onClick={goNext}
            disabled={!tempName.trim()}
          />
        </StepContent>
      );
    }

    if (step === 3) {
      // Screen 3: Birthdate
      return (
        <StepContent key="noprefill-3">
          <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-2">
            When {tempName ? `was ${tempName}` : "were they"} born?
          </h2>
          <p className="text-[14px] text-gray-60 mb-6 font-sans leading-relaxed">
            Last detail before we move forward.
          </p>
          <DateInput
            label={tempName || "Beneficiary"}
            value={tempBirthdate}
            onChange={setTempBirthdate}
          />
          <PrimaryButton
            label="Next"
            onClick={() => {
              // Save beneficiary
              setBeneficiaries(prev => [
                ...prev,
                {
                  name: tempName.trim(),
                  relationship: tempRelationship,
                  birthdate: tempBirthdate,
                  isHouseholdMember: false,
                },
              ]);
              // Reset temp fields
              setTempName("");
              setTempRelationship("Spouse / Partner");
              setTempBirthdate("");
              goNext();
            }}
            disabled={!tempBirthdate}
          />
        </StepContent>
      );
    }

    if (step === 4) {
      // Screen 4: Add another?
      return (
        <StepContent key="noprefill-add-another">
          <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-2">
            Would you like to add another person?
          </h2>
          <p className="text-[14px] text-gray-60 mb-6 font-sans leading-relaxed">
            You can protect additional loved ones if you&apos;d like.
          </p>
          <div className="space-y-3">
            <PrimaryButton
              label="Yes, add another"
              onClick={() => {
                animateTransition("left", () => setStep(1));
              }}
            />
            <button
              onClick={handleComplete}
              className="w-full py-3 text-center text-gray-60 font-sans text-sm hover:text-gray-100 transition-colors"
            >
              No, I&apos;m done
            </button>
          </div>
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
      currentPattern="progressive"
      patternTitle="Progressive One-at-a-Time"
      patternDescription="One decision per screen. Tests whether breaking down multi-field forms into sequential single-question steps reduces cognitive friction."
      patternBullets={[
        "Focus on one beneficiary at a time with narrative flow",
        "Minimal cognitive load — each question feels like a conversation",
        "Clear progress with sequential steps",
        "\"Add another\" feels optional, not required",
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
