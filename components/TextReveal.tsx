"use client";
import BlurText from "./BlurText";

const PARAGRAPH =
  "We are a studio of designers, engineers and strategists building digital products that move people. Every pixel, every interaction, every line of code is crafted to make ambitious brands feel inevitable.";

export default function TextReveal() {
  return (
    <section className="relative bg-ink text-white py-32 lg:py-48">
      <div className="max-w-container mx-auto px-6 lg:px-10">
        <div className="text-xs uppercase tracking-[0.3em] text-accent font-mono mb-10">
          — Manifesto
        </div>
        <BlurText
          text={PARAGRAPH}
          delay={40}
          animateBy="words"
          direction="bottom"
          stepDuration={0.4}
          className="font-display font-bold leading-[1.15] max-w-5xl text-white tracking-tight"
          style={{ fontSize: "clamp(32px, 4.2vw, 64px)" }}
        />
      </div>
    </section>
  );
}
