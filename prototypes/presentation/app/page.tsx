"use client";

import SlideController from "@/components/SlideController";
import TitleSlide from "@/components/slides/TitleSlide";
import LadderSlide from "@/components/slides/LadderSlide";
import L3IntroSlide from "@/components/slides/L3IntroSlide";
import L3ToolSlide from "@/components/slides/L3ToolSlide";
import L4GoalSlide from "@/components/slides/L4GoalSlide";
import L4WorkSlide from "@/components/slides/L4WorkSlide";
import L4DialUpSlide from "@/components/slides/L4DialUpSlide";
import L4OrchestrateSlide from "@/components/slides/L4OrchestrateSlide";
import L4CompleteSlide from "@/components/slides/L4CompleteSlide";
import L4ResearchSlide from "@/components/slides/L4ResearchSlide";
import L4AdversarialSlide from "@/components/slides/L4AdversarialSlide";
import L4RevealSlide from "@/components/slides/L4RevealSlide";
import L5TeaserSlide from "@/components/slides/L5TeaserSlide";
import ClosingSlide from "@/components/slides/ClosingSlide";

export default function Presentation() {
  return (
    <SlideController>
      <TitleSlide />
      <LadderSlide />
      <L3IntroSlide />
      <L3ToolSlide />
      <L4GoalSlide />
      <L4WorkSlide />
      <L4DialUpSlide />
      <L4OrchestrateSlide />
      <L4CompleteSlide />
      <L5TeaserSlide />
      <ClosingSlide />
    </SlideController>
  );
}
