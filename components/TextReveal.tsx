"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PARAGRAPH =
  "We are a studio of designers, engineers and strategists building digital products that move people. Every pixel, every interaction, every line of code is crafted to make ambitious brands feel inevitable.";

export default function TextReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const text = textRef.current;
    if (!section || !text) return;

    const ctx = gsap.context(() => {
      const words = text.querySelectorAll<HTMLElement>(".tr-word");

      gsap.fromTo(
        words,
        { opacity: 0.12 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.04,
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "bottom 75%",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        }
      );

      const id = window.setTimeout(() => ScrollTrigger.refresh(), 200);
      return () => clearTimeout(id);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-ink text-white py-32 lg:py-48"
    >
      <div className="max-w-container mx-auto px-6 lg:px-10">
        <div className="text-xs uppercase tracking-[0.3em] text-white/50 mb-10">
          — Manifesto
        </div>
        <p
          ref={textRef}
          className="font-display font-semibold leading-[1.18] max-w-5xl"
          style={{ fontSize: "clamp(28px,3.6vw,56px)", letterSpacing: "-0.005em" }}
        >
          {PARAGRAPH.split(" ").map((w, i) => (
            <span key={i} className="tr-word inline-block mr-[0.3em]">
              {w}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
