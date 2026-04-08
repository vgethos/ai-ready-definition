"use client";

import SlideController from "@/components/SlideController";
import TitleSlide from "@/components/slides/TitleSlide";
import LadderSlide from "@/components/slides/LadderSlide";
import LevelsQuickSlide from "@/components/slides/LevelsQuickSlide";
import L3ToolSlide from "@/components/slides/L3ToolSlide";
import L3OutputSlide from "@/components/slides/L3OutputSlide";
import L4GoalSlide from "@/components/slides/L4GoalSlide";
import L4DiscoverySlide from "@/components/slides/L4DiscoverySlide";
import L4MilestonesSlide from "@/components/slides/L4MilestonesSlide";
import L4TeamSlide from "@/components/slides/L4TeamSlide";
import L4ReviewSlide from "@/components/slides/L4ReviewSlide";
import L5TeaserSlide from "@/components/slides/L5TeaserSlide";
import ClosingSlide from "@/components/slides/ClosingSlide";

export default function Presentation() {
  return (
    <SlideController>
      <TitleSlide />
      <LadderSlide />
      <LevelsQuickSlide />
      <L3ToolSlide />
      <L3OutputSlide />
      <L4GoalSlide />
      <L4DiscoverySlide />
      <L4MilestonesSlide />
      <L4TeamSlide />
      <L4ReviewSlide />
      <L5TeaserSlide />
      <ClosingSlide />
    </SlideController>
  );
}
