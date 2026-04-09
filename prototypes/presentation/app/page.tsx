"use client";

import SlideController from "@/components/SlideController";
import TitleSlide from "@/components/slides/TitleSlide";
import LadderSlide from "@/components/slides/LadderSlide";
import L3IntroSlide from "@/components/slides/L3IntroSlide";
import L3ToolSlide from "@/components/slides/L3ToolSlide";
import L4GoalSlide from "@/components/slides/L4GoalSlide";
import L4MilestonesSlide from "@/components/slides/L4MilestonesSlide";
import L4AgentAssignSlide from "@/components/slides/L4AgentAssignSlide";
import L4ZoomSlide from "@/components/slides/L4ZoomSlide";
import L4WorkLoopSlide from "@/components/slides/L4WorkLoopSlide";
import L4ResearchSlide from "@/components/slides/L4ResearchSlide";
import L4AdversarialSlide from "@/components/slides/L4AdversarialSlide";
import L4MetaRevealSlide from "@/components/slides/L4MetaRevealSlide";
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
      <L4MilestonesSlide />
      <L4AgentAssignSlide />
      <L4ZoomSlide />
      <L4WorkLoopSlide />
      <L4ResearchSlide />
      <L4AdversarialSlide />
      <L4MetaRevealSlide />
      <L5TeaserSlide />
      <ClosingSlide />
    </SlideController>
  );
}
