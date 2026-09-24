"use client";
import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Clean, smooth section reveal wrapper.
 * Fades + gently lifts sections into place as they enter viewport
 * without colliding with child horizontal slide animations.
 */
export default function SectionReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const sections = Array.from(root.querySelectorAll<HTMLElement>("section"));
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { autoAlpha: 0, y: 25 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 88%",
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
