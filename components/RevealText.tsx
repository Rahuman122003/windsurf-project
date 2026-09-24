"use client";
import BlurText from "./BlurText";
import { type ElementType } from "react";

type RevealTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  mode?: "word" | "char" | "line";
  stagger?: number;
  delay?: number;
  direction?: "top" | "bottom";
};

export default function RevealText({
  text,
  as: Component = "h2",
  className = "",
  mode = "word",
  stagger = 0.03,
  delay = 0,
  direction = "bottom",
}: RevealTextProps) {
  return (
    <BlurText
      text={text}
      as={Component}
      className={className}
      animateBy={mode === "char" ? "letters" : "words"}
      direction={direction}
      delay={stagger * 1000}
      stepDuration={0.35}
    />
  );
}

/**
 * Scroll Highlight Text — uses BlurText with word-level blur reveal
 */
export function ScrollHighlightText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <BlurText
      text={text}
      className={className}
      animateBy="words"
      direction="bottom"
      delay={60}
      stepDuration={0.4}
    />
  );
}
