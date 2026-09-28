"use client";
import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type SlideDirection = "left" | "right" | "up" | "down";

type SlideRevealProps = {
  children: ReactNode;
  direction?: SlideDirection;
  distance?: number;
  duration?: number;
  delay?: number;
  className?: string;
};

export default function SlideReveal({
  children,
  direction = "left",
  distance = 120,
  duration = 1.1,
  delay = 0,
  className = "",
}: SlideRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);

    let fromX = 0;
    let fromY = 0;

    const isSmall = typeof window !== "undefined" && window.innerWidth < 768;
    const effectiveDistance = isSmall ? Math.min(distance, 30) : distance;

    if (direction === "left") fromX = -effectiveDistance;
    else if (direction === "right") fromX = effectiveDistance;
    else if (direction === "up") fromY = effectiveDistance;
    else if (direction === "down") fromY = -effectiveDistance;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          x: fromX,
          y: fromY,
          opacity: 0,
          filter: "blur(6px)",
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: duration,
          delay: delay,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [direction, distance, duration, delay]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
