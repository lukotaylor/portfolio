"use client";

import IntroSlide from "./IntroSlide";
import AgendaSlide from "./AgendaSlide";
import TransitionSlide from "./TransitionSlide";
import ContentSlide from "./ContentSlide";
import WrapUpSlide from "./WrapUpSlide";

export function renderSlide(slide) {
  switch (slide.type) {
    case "intro":      return <IntroSlide slide={slide} />;
    case "agenda":     return <AgendaSlide slide={slide} />;
    case "transition": return <TransitionSlide slide={slide} />;
    case "content":    return <ContentSlide slide={slide} />;
    case "wrapup":     return <WrapUpSlide slide={slide} />;
    default:           return null;
  }
}
