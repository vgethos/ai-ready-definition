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
import AddAnotherButton from "@/components/AddAnotherButton";

// Household members for the prefill path
const HOUSEHOLD_MEMBERS = ["Sarah Johnson", "Emma Johnson", "Someone else"];

const RELATIONSHIP_OPTIONS = [
  "Spouse / Partner",
  "Child",
  "Parent",
  "Sibling",
  "Other",
];

export default function Home() {
  const [isPrefill, setIsPrefill] = useState(true);
  const [step, setStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);

  // Prefill path state
  const [selectedHousehold, setSelectedHousehold] = useState<string[]>([]);
  const [newBeneName, setNewBeneName] = useState("");
  const [relationships, setRelationships] = useState<Record<string, string>>(
    {}
  );
  const [birthdates, setBirthdates] = useState<Record<string, string>>({});

  // No-prefill path state
  const [selectedRelationship, setSelectedRelationship] =
    useState("Spouse / Partner");
  const [noPrefillName, setNoPrefillName] = useState("");
  const [additionalName, setAdditionalName] = useState("");
  const [showAdditional, setShowAdditional] = useState(false);
  const [noPrefillBirthdate, setNoPrefillBirthdate] = useState("");
  const [noPrefillBirthdate2, setNoPrefillBirthdate2] = useState("");

  // Animation state: 3-phase model (idle → exit → enter → idle)
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "left"
  );
  const [animPhase, setAnimPhase] = useState<"idle" | "exit" | "enter">(
    "idle"
  );

  const resetState = () => {
    setStep(1);
    setIsComplete(false);
    setSelectedHousehold([]);
    setNewBeneName("");
    setRelationships({});
    setBirthdates({});
    setSelectedRelationship("Spouse / Partner");
    setNoPrefillName("");
    setAdditionalName("");
    setShowAdditional(false);
    setNoPrefillBirthdate("");
    setNoPrefillBirthdate2("");
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

  // Figure out which beneficiaries are selected (named ones only)
  const selectedNames = selectedHousehold.filter((h) => h !== "Someone else");
  const hasSomeoneElse = selectedHousehold.includes("Someone else");

  // All beneficiaries for the prefill path
  const getAllPrefillBenes = (): string[] => {
    const benes = [...selectedNames];
    if (hasSomeoneElse && newBeneName.trim()) {
      benes.push(newBeneName.trim());
    }
    return benes;
  };

  // Get total steps for progress calculation
  const getPrefillTotalSteps = () => {
    if (hasSomeoneElse || selectedNames.length === 0) return 4;
    return 3;
  };

  const getNoPrefillTotalSteps = () => {
    return 3;
  };

  const getProgress = () => {
    if (isComplete) return 100;
    if (isPrefill) {
      const total = getPrefillTotalSteps();
      return (step / total) * 100;
    } else {
      const total = getNoPrefillTotalSteps();
      return (step / total) * 100;
    }
  };

  // Determine what the prefill "next step" should be
  const handlePrefillContinue = () => {
    if (step === 1) {
      if (hasSomeoneElse || selectedNames.length === 0) {
        goNext();
      } else {
        animateTransition("left", () => setStep(3));
      }
    } else {
      goNext();
    }
  };

  const handlePrefillBack = () => {
    if (step === 3 && !hasSomeoneElse && selectedNames.length > 0) {
      animateTransition("right", () => setStep(1));
    } else {
      goBack();
    }
  };

  // Slide transform helper
  const getSlideTransform = () => {
    if (animPhase === "idle") return "translateX(0)";
    if (animPhase === "exit") {
      return slideDirection === "left"
        ? "translateX(-100%)"
        : "translateX(100%)";
    }
    // enter — position on opposite side
    return slideDirection === "left"
      ? "translateX(100%)"
      : "translateX(-100%)";
  };

  // Render the current step content
  const renderPrefillFlow = () => {
    switch (step) {
      case 1:
        return (
          <StepContent key="prefill-1">
            <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-2">
              Who would you like to select as a beneficiary?
            </h2>
            <p className="text-[14px] text-gray-60 mb-6 font-sans leading-relaxed">
              We&apos;ve suggested people based on your household info. You can
              add more beneficiaries at anytime.
            </p>
            <CheckboxList
              items={HOUSEHOLD_MEMBERS}
              selected={selectedHousehold}
              onChange={setSelectedHousehold}
            />
            <InfoBanner message="Most people choose a spouse or a child as their beneficiary. You can add or update your beneficiaries online anytime." />
            <PrimaryButton
              label="Continue"
              onClick={handlePrefillContinue}
              disabled={selectedHousehold.length === 0}
            />
          </StepContent>
        );

      case 2:
        // Name input — varies based on selection
        if (selectedNames.length > 0 && hasSomeoneElse) {
          // Screen 2b: pre-filled names + new entry
          return (
            <StepContent key="prefill-2b">
              <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-2">
                Who else would you like to add as a beneficiary?
              </h2>
              <p className="text-[14px] text-gray-60 mb-6 font-sans leading-relaxed">
                You can add more beneficiaries at anytime.
              </p>
              {selectedNames.map((name) => (
                <TextInput
                  key={name}
                  label="Beneficiary name"
                  value={name}
                  readOnly
                />
              ))}
              <TextInput
                label="Beneficiary name"
                value={newBeneName}
                placeholder="Enter name"
                onChange={setNewBeneName}
              />
              <AddAnotherButton />
              <InfoBanner message="Only one beneficiary is required. You can always come back and add more or update your beneficiaries online." />
              <PrimaryButton label="Next" onClick={goNext} />
            </StepContent>
          );
        } else {
          // Screen 2a: just "Someone else" or no selection
          return (
            <StepContent key="prefill-2a">
              <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-2">
                Who would you like to select as your beneficiary?
              </h2>
              <p className="text-[14px] text-gray-60 mb-6 font-sans leading-relaxed">
                You can add more beneficiaries at anytime.
              </p>
              <TextInput
                label="Beneficiary name"
                value={newBeneName}
                placeholder="Enter name"
                onChange={setNewBeneName}
              />
              <AddAnotherButton />
              <InfoBanner message="Only one beneficiary is required. You can always come back and add more or update your beneficiaries online." />
              <PrimaryButton label="Next" onClick={goNext} />
            </StepContent>
          );
        }

      case 3: {
        // Relationship step
        const allBenes = getAllPrefillBenes();
        const isSingle = allBenes.length === 1;
        return (
          <StepContent key="prefill-3">
            <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-2">
              {isSingle
                ? `How is ${allBenes[0]} related to you?`
                : "How are these people related to you?"}
            </h2>
            <p className="text-[14px] text-gray-60 mb-6 font-sans leading-relaxed">
              This helps us set up your policy correctly.
            </p>
            {allBenes.map((name) => (
              <SelectDropdown
                key={name}
                label={name}
                value={relationships[name] || ""}
                options={RELATIONSHIP_OPTIONS}
                placeholder="Select relationship"
                onChange={(val) =>
                  setRelationships({ ...relationships, [name]: val })
                }
              />
            ))}
            <PrimaryButton label="Next" onClick={goNext} />
          </StepContent>
        );
      }

      case 4: {
        // Birthdate step
        const allBenes = getAllPrefillBenes();
        const isSingle = allBenes.length === 1;
        return (
          <StepContent key="prefill-4">
            <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-2">
              {isSingle
                ? `Confirm ${allBenes[0]}'s birthdate`
                : "Confirm your beneficiaries birthdates"}
            </h2>
            <p className="text-[14px] text-gray-60 mb-6 font-sans leading-relaxed">
              Last step before you can receive your unique Real Rate.
            </p>
            {allBenes.map((name) => (
              <DateInput
                key={name}
                label={name}
                value={birthdates[name] || ""}
                onChange={(val) =>
                  setBirthdates({ ...birthdates, [name]: val })
                }
              />
            ))}
            <PrimaryButton label="Next" onClick={handleComplete} />
          </StepContent>
        );
      }

      default:
        return null;
    }
  };

  const renderNoPrefillFlow = () => {
    switch (step) {
      case 1:
        return (
          <StepContent key="noprefill-1">
            <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-2">
              Who would you like to select as a beneficiary?
            </h2>
            <p className="text-[14px] text-gray-60 mb-6 font-sans leading-relaxed">
              These loved ones receive your life insurance payout if you pass
              away.
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
              What is the name of your{" "}
              {selectedRelationship.toLowerCase()}?
            </h2>
            <p className="text-[14px] text-gray-60 mb-6 font-sans leading-relaxed">
              You can add or update your beneficiaries anytime.
            </p>
            <TextInput
              label="Beneficiary"
              value={noPrefillName}
              placeholder="Enter name"
              onChange={setNoPrefillName}
            />
            {!showAdditional && (
              <AddAnotherButton
                onClick={() => setShowAdditional(true)}
              />
            )}
            {showAdditional && (
              <TextInput
                label="Beneficiary"
                value={additionalName}
                placeholder="Enter name"
                onChange={setAdditionalName}
              />
            )}
            <InfoBanner message="Only one beneficiary is required. You can always come back and add more or update your beneficiaries online." />
            <PrimaryButton label="Next" onClick={goNext} />
          </StepContent>
        );

      case 3:
        return renderNoPrefillBirthdate();

      default:
        return null;
    }
  };

  const renderNoPrefillBirthdate = () => {
    const names = [noPrefillName];
    if (showAdditional && additionalName.trim()) {
      names.push(additionalName.trim());
    }
    const isSingle = names.length === 1;
    return (
      <StepContent key="noprefill-birthdate">
        <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-2">
          {isSingle
            ? `Confirm ${names[0] || "your beneficiary"}'s birthdate`
            : "Confirm your beneficiaries birthdates"}
        </h2>
        <p className="text-[14px] text-gray-60 mb-6 font-sans leading-relaxed">
          Last step before you can receive your unique Real Rate.
        </p>
        <DateInput
          label={names[0] || "Beneficiary"}
          value={noPrefillBirthdate}
          onChange={setNoPrefillBirthdate}
        />
        {names.length > 1 && (
          <DateInput
            label={names[1]}
            value={noPrefillBirthdate2}
            onChange={setNoPrefillBirthdate2}
          />
        )}
        <PrimaryButton label="Next" onClick={handleComplete} />
      </StepContent>
    );
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
      handlePrefillBack();
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
      currentPattern="baseline"
      patternTitle="Checkbox Selection (Baseline)"
      patternDescription="Multi-select checkbox interface for beneficiary selection. Tests whether batch selection (choose multiple, then fill details) reduces friction vs. sequential individual entry."
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
