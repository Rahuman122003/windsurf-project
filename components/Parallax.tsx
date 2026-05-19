"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Props = {
  children: React.ReactNode;
  speed?: number;          // -1 .. 1 (positive moves slower than scroll, negative reverse)
  className?: string;
  scale?: boolean;         // subtle zoom while scrolling
};

export default function Parallax({ children, speed = 0.3, className = "", scale = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;

    const inner = el.querySelector<HTMLElement>(":scope > *");
    if (!inner) return;

    const distance = speed * 120; // percent
    const tween = gsap.fromTo(
      inner,
      { yPercent: -distance / 2, ...(scale ? { scale: 1.12 } : {}) },
      {
        yPercent: distance / 2,
        ...(scale ? { scale: 1.0 } : {}),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed, scale]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
