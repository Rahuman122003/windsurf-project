"use client";
import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type StaggerGridProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
};

/**
 * Wraps a grid of items and staggers their entry into view via scroll.
 * Each direct child fades in + lifts up with a cascading delay.
 */
export default function StaggerGrid({
  children,
  className = "",
  stagger = 0.1,
  y = 60,
}: StaggerGridProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);

    const items = Array.from(root.children) as HTMLElement[];
    if (items.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        {
          autoAlpha: 0,
          y: y,
          scale: 0.97,
          filter: "blur(6px)",
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          stagger: {
            each: stagger,
            from: "start",
          },
          scrollTrigger: {
            trigger: root,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [stagger, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
