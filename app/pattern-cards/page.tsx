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

const HOUSEHOLD_MEMBERS = ["Sarah Johnson", "Emma Johnson"];

const RELATIONSHIP_OPTIONS = [
  { value: "Spouse / Partner", icon: "💑", label: "Spouse" },
  { value: "Child", icon: "👶", label: "Child" },
  { value: "Parent", icon: "👪", label: "Parent" },
  { value: "Sibling", icon: "👫", label: "Sibling" },
  { value: "Other", icon: "👤", label: "Other" },
];

interface CardData {
  id: string;
  name: string;
  relationship: string;
  birthdate: string;
  isExpanded: boolean;
  isHouseholdMember: boolean;
  isComplete: boolean;
}

export default function PatternCards() {
  const [isPrefill, setIsPrefill] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  // Cards state - each card tracks its own data
  const [cards, setCards] = useState<CardData[]>([]);

  // Animation state
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("left");
  const [animPhase, setAnimPhase] = useState<"idle" | "exit" | "enter">("idle");

  const resetState = () => {
    setIsComplete(false);
    setCards([]);
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
    const completedCards = cards.filter(c => c.isComplete).length;
    return completedCards > 0 ? 75 : 25;
  };

  const updateCard = (id: string, updates: Partial<CardData>) => {
    setCards(prev =>
      prev.map(card => {
        if (card.id === id) {
          const updated = { ...card, ...updates };
          // Auto-mark as complete if all required fields filled
          if (updated.name && updated.birthdate && (updated.isHouseholdMember || updated.relationship)) {
            updated.isComplete = true;
            updated.isExpanded = false; // Collapse when complete
          }
          return updated;
        }
        return card;
      })
    );
  };

  const addCard = (template: Partial<CardData>) => {
    const newCard: CardData = {
      id: `card-${Date.now()}`,
      name: template.name || "",
      relationship: template.relationship || "",
      birthdate: "",
      isExpanded: true,
      isHouseholdMember: template.isHouseholdMember || false,
      isComplete: false,
    };
    setCards(prev => [...prev, newCard]);
  };

  const toggleCard = (id: string) => {
    setCards(prev =>
      prev.map(card =>
        card.id === id ? { ...card, isExpanded: !card.isExpanded } : card
      )
    );
  };

  const isAnyCardComplete = () => {
    return cards.some(c => c.isComplete);
  };

  // PREFILL FLOW
  const renderPrefillFlow = () => {
    return (
      <StepContent key="prefill-cards">
        <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-2">
          Who would you like to protect?
        </h2>
        <p className="text-[14px] text-gray-60 mb-6 font-sans leading-relaxed">
          Tap a person to add them as a beneficiary.
        </p>

        <div className="space-y-3 mb-6">
          {/* Household member cards */}
          {HOUSEHOLD_MEMBERS.map(member => {
            const existingCard = cards.find(c => c.name === member);
            const isActive = existingCard !== undefined;

            return (
              <div
                key={member}
                className={`rounded-xl border-2 transition-all overflow-hidden ${
                  isActive
                    ? "border-cypress-100 bg-cypress-100/10"
                    : "border-gray-20 hover:border-gray-40"
                }`}
              >
                <button
                  onClick={() => {
                    if (!isActive) {
                      addCard({ name: member, isHouseholdMember: true });
                    } else if (existingCard) {
                      toggleCard(existingCard.id);
                    }
                  }}
                  className="w-full p-4 text-left"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-sans text-[16px] text-gray-100">
                        {member}
                      </div>
                      <div className="font-sans text-[12px] text-gray-60">
                        From your household
                      </div>
                    </div>
                    {existingCard?.isComplete && (
                      <div className="text-cypress-100 text-xl">✓</div>
                    )}
                  </div>
                </button>

                {/* Expanded card fields - INSIDE the card */}
                {existingCard && existingCard.isExpanded && (
                  <div className="px-4 pb-4 pt-2 space-y-3 border-t border-gray-20">
                    <SelectDropdown
                      label="Relationship"
                      value={existingCard.relationship}
                      options={RELATIONSHIP_OPTIONS.map(r => r.value)}
                      placeholder="Select relationship"
                      onChange={(val) => updateCard(existingCard.id, { relationship: val })}
                    />
                    <DateInput
                      label="Birthdate"
                      value={existingCard.birthdate}
                      onChange={(val) => updateCard(existingCard.id, { birthdate: val })}
                    />
                  </div>
                )}
              </div>
            );
          })}

          {/* "Someone else" cards - allow multiple */}
          {cards
            .filter(c => !c.isHouseholdMember)
            .map((card, index) => (
              <div
                key={card.id}
                className="rounded-xl border-2 border-cypress-100 bg-cypress-100/10 transition-all overflow-hidden"
              >
                <button
                  onClick={() => toggleCard(card.id)}
                  className="w-full p-4 text-left"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-sans text-[16px] text-gray-100">
                        {card.isComplete && card.name
                          ? card.name
                          : `Additional Person ${index + 1}`}
                      </div>
                      <div className="font-sans text-[12px] text-gray-60">
                        {card.isComplete && card.relationship
                          ? card.relationship
                          : "Add details"}
                      </div>
                    </div>
                    {card.isComplete && (
                      <div className="text-cypress-100 text-xl">✓</div>
                    )}
                  </div>
                </button>

                {/* Expanded fields */}
                {card.isExpanded && (
                  <div className="px-4 pb-4 pt-2 space-y-3 border-t border-gray-20">
                    <TextInput
                      label="Beneficiary name"
                      value={card.name}
                      placeholder="Enter name"
                      onChange={(val) => updateCard(card.id, { name: val })}
                    />
                    <SelectDropdown
                      label="Relationship"
                      value={card.relationship}
                      options={RELATIONSHIP_OPTIONS.map(r => r.value)}
                      placeholder="Select relationship"
                      onChange={(val) => updateCard(card.id, { relationship: val })}
                    />
                    <DateInput
                      label="Birthdate"
                      value={card.birthdate}
                      onChange={(val) => updateCard(card.id, { birthdate: val })}
                    />
                  </div>
                )}
              </div>
            ))}

          {/* Add "Someone else" button */}
          <button
            onClick={() => addCard({ isHouseholdMember: false })}
            className="w-full p-4 rounded-xl border-2 border-dashed border-gray-20 hover:border-gray-40 transition-all text-left"
          >
            <div className="flex items-center gap-3">
              <div className="text-[24px]">👤</div>
              <div>
                <div className="font-sans text-[16px] text-gray-100">
                  + Add someone else
                </div>
                <div className="font-sans text-[12px] text-gray-60">
                  Add a new person
                </div>
              </div>
            </div>
          </button>
        </div>

        <InfoBanner message="Taking a moment now means your loved ones will be taken care of later." />
        <PrimaryButton
          label="Continue"
          onClick={handleComplete}
          disabled={!isAnyCardComplete()}
        />
      </StepContent>
    );
  };

  // NO-PREFILL FLOW
  const renderNoPrefillFlow = () => {
    const getRelationshipCount = (relationshipValue: string) => {
      return cards.filter(c => c.relationship === relationshipValue).length;
    };

    return (
      <StepContent key="noprefill-cards">
        <h2 className="font-serif text-[24px] text-gray-100 leading-snug mb-2">
          Who would you like to protect?
        </h2>
        <p className="text-[14px] text-gray-60 mb-6 font-sans leading-relaxed">
          Tap a relationship to add them as a beneficiary.
        </p>

        <div className="space-y-3 mb-6">
          {/* Relationship option cards */}
          {RELATIONSHIP_OPTIONS.map(rel => {
            const count = getRelationshipCount(rel.value);
            const hasCards = count > 0;

            return (
              <div key={rel.value}>
                <button
                  onClick={() => addCard({ relationship: rel.value, isHouseholdMember: false })}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    hasCards
                      ? "border-cypress-100/50 bg-cypress-100/5"
                      : "border-gray-20 hover:border-gray-40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-[24px]">{rel.icon}</div>
                      <div className="font-sans text-[16px] text-gray-100">
                        {rel.label}
                        {count > 0 && <span className="text-gray-60 ml-2">({count})</span>}
                      </div>
                    </div>
                    <div className="text-gray-40 text-sm">+</div>
                  </div>
                </button>
              </div>
            );
          })}

          {/* Expanded beneficiary cards */}
          {cards.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-20">
              <div className="text-gray-60 font-sans text-xs uppercase tracking-wide mb-3">
                Your Beneficiaries
              </div>
              <div className="space-y-3">
                {cards.map((card, index) => (
                  <div
                    key={card.id}
                    className="rounded-xl border-2 border-cypress-100 bg-cypress-100/10 transition-all overflow-hidden"
                  >
                    <button
                      onClick={() => toggleCard(card.id)}
                      className="w-full p-4 text-left"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-[20px]">
                            {RELATIONSHIP_OPTIONS.find(r => r.value === card.relationship)?.icon}
                          </div>
                          <div>
                            <div className="font-sans text-[16px] text-gray-100">
                              {card.isComplete && card.name
                                ? card.name
                                : `${card.relationship} ${index + 1}`}
                            </div>
                            <div className="font-sans text-[12px] text-gray-60">
                              {card.isComplete ? card.relationship : "Add details"}
                            </div>
                          </div>
                        </div>
                        {card.isComplete && (
                          <div className="text-cypress-100 text-xl">✓</div>
                        )}
                      </div>
                    </button>

                    {/* Expanded fields */}
                    {card.isExpanded && (
                      <div className="px-4 pb-4 pt-2 space-y-3 border-t border-gray-20">
                        <TextInput
                          label="Beneficiary name"
                          value={card.name}
                          placeholder="Enter name"
                          onChange={(val) => updateCard(card.id, { name: val })}
                        />
                        <DateInput
                          label="Birthdate"
                          value={card.birthdate}
                          onChange={(val) => updateCard(card.id, { birthdate: val })}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <InfoBanner message="Taking a moment now means your loved ones will be taken care of later." />
        <PrimaryButton
          label="Continue"
          onClick={handleComplete}
          disabled={!isAnyCardComplete()}
        />
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
      currentPattern="cards"
      patternTitle="Card-Based Multi-Select"
      patternDescription="Expandable cards on a single screen. Tests whether visual, tactile selection feels more emotionally resonant than traditional forms."
      patternBullets={[
        "Visual, tactile selection — feels like choosing who to protect",
        "All beneficiaries visible at once on single screen",
        "Inline expansion reduces navigation steps",
        "Fast for adding multiple beneficiaries simultaneously",
      ]}
    >
      <EthosHeader onBack={handleBack} showBack={isComplete} />
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
