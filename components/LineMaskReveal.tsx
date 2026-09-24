"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Props = {
  text: string;
  className?: string;
  once?: boolean;
};

/**
 * Scroll-driven line mask reveal.
 * As the user scrolls, each line clips into view from the bottom with a stagger.
 * Great for pull-quotes, hero subtitles, or manifesto text.
 */
export default function LineMaskReveal({ text, className = "", once = true }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    gsap.registerPlugin(ScrollTrigger);

    const lines = container.querySelectorAll<HTMLElement>(".lmr-line");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lines,
        {
          yPercent: 110,
          rotateX: -20,
        },
        {
          yPercent: 0,
          rotateX: 0,
          duration: 1.0,
          ease: "power4.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            toggleActions: once ? "play none none none" : "play none none reverse",
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [text, once]);

  // Split the text by newlines or natural sentence boundaries
  const lines = text.split(/\n|(?<=\. )/);

  return (
    <div ref={containerRef} className={className} style={{ perspective: 800 }}>
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <div
            className="lmr-line"
            style={{ willChange: "transform" }}
          >
            {line}
          </div>
        </div>
      ))}
    </div>
  );
}
