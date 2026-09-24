"use client";
import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type ParallaxProps = {
  children: ReactNode;
  speed?: number; // -1 to 1 (positive moves slower than scroll, negative reverse)
  className?: string;
  scale?: boolean;
};

export default function Parallax({
  children,
  speed = 0.3,
  className = "",
  scale = false,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;

    const inner = el.querySelector<HTMLElement>(":scope > *") || el;
    const distance = speed * 100;

    const tween = gsap.fromTo(
      inner,
      {
        yPercent: -distance / 2,
        ...(scale ? { scale: 1.15 } : {}),
      },
      {
        yPercent: distance / 2,
        ...(scale ? { scale: 1.0 } : {}),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
          invalidateOnRefresh: true,
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

/**
 * Parallax Card with Scroll Depth (NO mouse tilt)
 */
export function ParallaxCard({
  children,
  className = "",
  depth = 0.2,
}: {
  children: ReactNode;
  className?: string;
  depth?: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const card = cardRef.current;
    if (!card) return;

    // Scroll parallax Y movement only
    const tween = gsap.fromTo(
      card,
      { y: 25 * depth },
      {
        y: -25 * depth,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [depth]);

  return (
    <div ref={cardRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
