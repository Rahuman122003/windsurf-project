"use client";
import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Reveals every direct child of a section as it scrolls into view —
 * gentle horizontal slide + blur clear. Used by PageShell to give every
 * detail page (work, services, stories, insights, careers) a consistent
 * scroll-driven entrance.
 */
export default function SectionReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const sections = Array.from(root.querySelectorAll<HTMLElement>("section"));
      sections.forEach((section, i) => {
        const fromX = i % 2 === 0 ? -60 : 60;
        gsap.fromTo(
          section,
          { x: fromX, autoAlpha: 0, filter: "blur(8px)" },
          {
            x: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 1.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return <div ref={ref}>{children}</div>;
}
