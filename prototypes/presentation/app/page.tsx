"use client";

import SlideController from "@/components/SlideController";
import TitleSlide from "@/components/slides/TitleSlide";
import LadderSlide from "@/components/slides/LadderSlide";
import LevelsQuickSlide from "@/components/slides/LevelsQuickSlide";
import L5BreadthSlide from "@/components/slides/L5BreadthSlide";
import L5ToolSlide from "@/components/slides/L5ToolSlide";
import L5OutputSlide from "@/components/slides/L5OutputSlide";
import L6IntroSlide from "@/components/slides/L6IntroSlide";
import L6StackSlide from "@/components/slides/L6StackSlide";
import L6FlowSlide from "@/components/slides/L6FlowSlide";
import L7SetupSlide from "@/components/slides/L7SetupSlide";
import L7TeamSlide from "@/components/slides/L7TeamSlide";
import ClosingSlide from "@/components/slides/ClosingSlide";

export default function Presentation() {
  return (
    <SlideController>
      <TitleSlide />
      <LadderSlide />
      <LevelsQuickSlide />
      <L5BreadthSlide />
      <L5ToolSlide />
      <L5OutputSlide />
      <L6IntroSlide />
      <L6StackSlide />
      <L6FlowSlide />
      <L7SetupSlide />
      <L7TeamSlide />
      <ClosingSlide />
    </SlideController>
  );
}
