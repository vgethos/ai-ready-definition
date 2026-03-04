"use client";

import { useState } from "react";
import CanvasLayout from "@/components/CanvasLayout";
import EthosHeader from "@/components/EthosHeader";
import ProgressBar from "@/components/ProgressBar";
import TextInput from "@/components/TextInput";
import SelectDropdown from "@/components/SelectDropdown";
import DateInput from "@/components/DateInput";
import PrimaryButton from "@/components/PrimaryButton";

const HOUSEHOLD_MEMBERS = ["Sarah Johnson", "Emma Johnson"];
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
}

export default function PatternConversational() {
  const [isPrefill, setIsPrefill] = useState(true);
  const [step, setStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);

  // Beneficiaries
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [currentBeneIndex, setCurrentBeneIndex] = useState(0);

  // Prefill state
  const [acceptedHousehold, setAcceptedHousehold] = useState(false);
  const [householdMembersAdded, setHouseholdMembersAdded] = useState(false);

  // Current input
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
    setAcceptedHousehold(false);
    setHouseholdMembersAdded(false);
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
    const totalSteps = isPrefill ? 4 : 4;
    return (step / totalSteps) * 100;
  };

  // PREFILL FLOW
  const renderPrefillFlow = () => {
    if (step === 1) {
      // Ask if they want to protect household members
      return (
        <StepContent key="prefill-1">
          <ConversationalPrompt>
            We see you have <strong>Sarah</strong> and <strong>Emma</strong> in your household.
            Would you like to protect them with your life insurance policy?
          </ConversationalPrompt>

          <div className="space-y-3 mt-6">
            <PrimaryButton
              label="Yes, protect them both"
              onClick={() => {
                setAcceptedHousehold(true);
                setBeneficiaries(
                  HOUSEHOLD_MEMBERS.map(name => ({
                    name,
                    relationship: "",
                    birthdate: "",
                  }))
                );
                setCurrentBeneIndex(0);
                goNext();
              }}
            />
            <button
              onClick={() => {
                setAcceptedHousehold(false);
                goNext();
              }}
              className="w-full py-3 text-center text-gray-60 font-sans text-sm hover:text-gray-100 transition-colors"
            >
              No, I&apos;ll add someone else
            </button>
          </div>
        </StepContent>
      );
    }

    if (step === 2 && acceptedHousehold) {
      // Get birthdates for household members
      const currentMember = beneficiaries[currentBeneIndex];
      if (!currentMember) return null;

      return (
        <StepContent key={`prefill-birthdate-${currentBeneIndex}`}>
          <ConversationalPrompt>
            Great! When was <strong>{currentMember.name.split(" ")[0]}</strong> born?
          </ConversationalPrompt>

          <DateInput
            label="Birthdate"
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
                // More household members
                animateTransition("left", () => {
                  setCurrentBeneIndex(prev => prev + 1);
                });
              } else {
                // Done with household members, get relationships
                setCurrentBeneIndex(0);
                goNext();
              }
            }}
            disabled={!tempBirthdate}
          />
        </StepContent>
      );
    }

    if (step === 3 && acceptedHousehold) {
      // Get relationships for household members
      const currentMember = beneficiaries[currentBeneIndex];
      if (!currentMember) return null;

      return (
        <StepContent key={`prefill-relationship-${currentBeneIndex}`}>
          <ConversationalPrompt>
            How is <strong>{currentMember.name.split(" ")[0]}</strong> related to you?
          </ConversationalPrompt>

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
                // More household members
                animateTransition("left", () => {
                  setCurrentBeneIndex(prev => prev + 1);
                });
              } else {
                // Done with all household members
                setHouseholdMembersAdded(true);
                goNext();
              }
            }}
          />
        </StepContent>
      );
    }

    if ((step === 2 && !acceptedHousehold) || (step === 4 && householdMembersAdded)) {
      // Add someone else OR add another
      return (
        <StepContent key="prefill-add-another">
          <ConversationalPrompt>
            {beneficiaries.length === 0
              ? "No problem! What's the name of the person you'd like to protect?"
              : "Would you like to add anyone else you'd like to protect?"}
          </ConversationalPrompt>

          {beneficiaries.length > 0 ? (
            <div className="space-y-3 mt-6">
              <PrimaryButton
                label="Yes, add another"
                onClick={() => {
                  setTempName("");
                  setTempRelationship("Spouse / Partner");
                  setTempBirthdate("");
                  animateTransition("left", () => setStep(5));
                }}
              />
              <button
                onClick={handleComplete}
                className="w-full py-3 text-center text-gray-60 font-sans text-sm hover:text-gray-100 transition-colors"
              >
                No, I&apos;m done
              </button>
            </div>
          ) : (
            <>
              <TextInput
                label="Beneficiary name"
                value={tempName}
                placeholder="Enter name"
                onChange={setTempName}
              />
              <PrimaryButton
                label="Next"
                onClick={() => {
                  goNext();
                }}
                disabled={!tempName.trim()}
              />
            </>
          )}
        </StepContent>
      );
    }

    if (step === 3 && !acceptedHousehold) {
      // Get birthdate for custom person
      return (
        <StepContent key="prefill-custom-birthdate">
          <ConversationalPrompt>
            And when {tempName ? `was ${tempName.split(" ")[0]}` : "were they"} born?
          </ConversationalPrompt>

          <DateInput
            label="Birthdate"
            value={tempBirthdate}
            onChange={setTempBirthdate}
          />

          <PrimaryButton
            label="Next"
            onClick={() => {
              goNext();
            }}
            disabled={!tempBirthdate}
          />
        </StepContent>
      );
    }

    if (step === 4 && !acceptedHousehold && !householdMembersAdded) {
      // Get relationship for custom person
      return (
        <StepContent key="prefill-custom-relationship">
          <ConversationalPrompt>
            How {tempName ? `is ${tempName.split(" ")[0]}` : "are they"} related to you?
          </ConversationalPrompt>

          <SelectDropdown
            label="Relationship"
            value={tempRelationship}
            options={RELATIONSHIP_OPTIONS}
            onChange={setTempRelationship}
          />

          <PrimaryButton
            label="Next"
            onClick={() => {
              // Save beneficiary
              setBeneficiaries([
                ...beneficiaries,
                {
                  name: tempName.trim(),
                  relationship: tempRelationship,
                  birthdate: tempBirthdate,
                },
              ]);
              setTempName("");
              setTempRelationship("Spouse / Partner");
              setTempBirthdate("");
              handleComplete();
            }}
          />
        </StepContent>
      );
    }

    if (step === 5) {
      // Add additional person (after household members)
      return (
        <StepContent key="prefill-additional">
          <ConversationalPrompt>
            What&apos;s their name?
          </ConversationalPrompt>

          <TextInput
            label="Beneficiary name"
            value={tempName}
            placeholder="Enter name"
            onChange={setTempName}
          />

          <PrimaryButton
            label="Next"
            onClick={() => {
              goNext();
            }}
            disabled={!tempName.trim()}
          />
        </StepContent>
      );
    }

    if (step === 6) {
      // Birthdate for additional
      return (
        <StepContent key="prefill-additional-birthdate">
          <ConversationalPrompt>
            And when {tempName ? `was ${tempName.split(" ")[0]}` : "were they"} born?
          </ConversationalPrompt>

          <DateInput
            label="Birthdate"
            value={tempBirthdate}
            onChange={setTempBirthdate}
          />

          <PrimaryButton
            label="Next"
            onClick={() => {
              goNext();
            }}
            disabled={!tempBirthdate}
          />
        </StepContent>
      );
    }

    if (step === 7) {
      // Relationship for additional
      return (
        <StepContent key="prefill-additional-relationship">
          <ConversationalPrompt>
            How {tempName ? `is ${tempName.split(" ")[0]}` : "are they"} related to you?
          </ConversationalPrompt>

          <SelectDropdown
            label="Relationship"
            value={tempRelationship}
            options={RELATIONSHIP_OPTIONS}
            onChange={setTempRelationship}
          />

          <PrimaryButton
            label="Next"
            onClick={() => {
              // Save beneficiary
              setBeneficiaries([
                ...beneficiaries,
                {
                  name: tempName.trim(),
                  relationship: tempRelationship,
                  birthdate: tempBirthdate,
                },
              ]);
              handleComplete();
            }}
          />
        </StepContent>
      );
    }

    return null;
  };

  // NO-PREFILL FLOW
  const renderNoPrefillFlow = () => {
    if (step === 1) {
      return (
        <StepContent key="noprefill-1">
          <ConversationalPrompt>
            Let&apos;s start with your spouse or partner. What&apos;s their name?
          </ConversationalPrompt>

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

    if (step === 2) {
      return (
        <StepContent key="noprefill-2">
          <ConversationalPrompt>
            And when {tempName ? `was ${tempName.split(" ")[0]}` : "were they"} born?
          </ConversationalPrompt>

          <DateInput
            label="Birthdate"
            value={tempBirthdate}
            onChange={setTempBirthdate}
          />

          <PrimaryButton
            label="Next"
            onClick={goNext}
            disabled={!tempBirthdate}
          />
        </StepContent>
      );
    }

    if (step === 3) {
      return (
        <StepContent key="noprefill-3">
          <ConversationalPrompt>
            Perfect! How {tempName ? `is ${tempName.split(" ")[0]}` : "are they"} related to you?
          </ConversationalPrompt>

          <SelectDropdown
            label="Relationship"
            value={tempRelationship}
            options={RELATIONSHIP_OPTIONS}
            onChange={setTempRelationship}
          />

          <PrimaryButton
            label="Next"
            onClick={() => {
              // Save beneficiary
              setBeneficiaries([
                {
                  name: tempName.trim(),
                  relationship: tempRelationship,
                  birthdate: tempBirthdate,
                },
              ]);
              setTempName("");
              setTempRelationship("Spouse / Partner");
              setTempBirthdate("");
              goNext();
            }}
          />
        </StepContent>
      );
    }

    if (step === 4) {
      return (
        <StepContent key="noprefill-4">
          <ConversationalPrompt>
            Great! Would you like to add anyone else you&apos;d like to protect?
          </ConversationalPrompt>

          <div className="space-y-3 mt-6">
            <PrimaryButton
              label="Yes, add another"
              onClick={() => {
                setTempName("");
                setTempRelationship("Spouse / Partner");
                setTempBirthdate("");
                animateTransition("left", () => setStep(5));
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

    if (step === 5) {
      return (
        <StepContent key="noprefill-5">
          <ConversationalPrompt>
            Who else would you like to protect?
          </ConversationalPrompt>

          <SelectDropdown
            label="Relationship"
            value={tempRelationship}
            options={RELATIONSHIP_OPTIONS}
            onChange={setTempRelationship}
          />

          <PrimaryButton label="Next" onClick={goNext} />
        </StepContent>
      );
    }

    if (step === 6) {
      return (
        <StepContent key="noprefill-6">
          <ConversationalPrompt>
            What&apos;s their name?
          </ConversationalPrompt>

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

    if (step === 7) {
      return (
        <StepContent key="noprefill-7">
          <ConversationalPrompt>
            And when {tempName ? `was ${tempName.split(" ")[0]}` : "were they"} born?
          </ConversationalPrompt>

          <DateInput
            label="Birthdate"
            value={tempBirthdate}
            onChange={setTempBirthdate}
          />

          <PrimaryButton
            label="Next"
            onClick={() => {
              // Save beneficiary
              setBeneficiaries([
                ...beneficiaries,
                {
                  name: tempName.trim(),
                  relationship: tempRelationship,
                  birthdate: tempBirthdate,
                },
              ]);
              handleComplete();
            }}
            disabled={!tempBirthdate}
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
      currentPattern="conversational"
      patternTitle="Conversational Wizard"
      patternDescription="Natural question-and-answer flow. Tests whether conversational language creates emotional connection and makes the process feel guided rather than transactional."
      patternBullets={[
        "Question-answer format feels natural and human",
        "Second-person language (\"you,\" \"your loved ones\")",
        "Most human, least form-like experience",
        "Dynamic follow-ups based on user responses",
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

function ConversationalPrompt({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 p-4 bg-cypress-100/10 border-l-4 border-cypress-100 rounded-r-xl">
      <p className="font-sans text-[15px] text-gray-100 leading-relaxed">
        {children}
      </p>
    </div>
  );
}
