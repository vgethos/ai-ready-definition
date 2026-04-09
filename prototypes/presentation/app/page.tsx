"use client";

import SlideController from "@/components/SlideController";
import TitleSlide from "@/components/slides/TitleSlide";
import LadderSlide from "@/components/slides/LadderSlide";
import L3IntroSlide from "@/components/slides/L3IntroSlide";
import L3ToolSlide from "@/components/slides/L3ToolSlide";
import L4IntroSlide from "@/components/slides/L4IntroSlide";
import L4GoalSlide from "@/components/slides/L4GoalSlide";
import L4MilestonesSlide from "@/components/slides/L4MilestonesSlide";
import L4WorkLoopSlide from "@/components/slides/L4WorkLoopSlide";
import L4SubAgentsSlide from "@/components/slides/L4SubAgentsSlide";
import L4ReviewSlide from "@/components/slides/L4ReviewSlide";
import L5TeaserSlide from "@/components/slides/L5TeaserSlide";
import ClosingSlide from "@/components/slides/ClosingSlide";

export default function Presentation() {
  return (
    <SlideController>
      <TitleSlide />
      <LadderSlide />
      <L3IntroSlide />
      <L3ToolSlide />
      <L4IntroSlide />
      <L4GoalSlide />
      <L4MilestonesSlide />
      <L4WorkLoopSlide />
      <L4SubAgentsSlide />
      <L4ReviewSlide />
      <L5TeaserSlide />
      <ClosingSlide />
    </SlideController>
  );
}
