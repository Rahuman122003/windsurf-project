"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    gsap.registerPlugin(ScrollTrigger);

    const tween = gsap.to(bar, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.1,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[110] pointer-events-none bg-white/10">
      <div
        ref={barRef}
        className="h-full w-full bg-gradient-to-r from-accent via-white to-accent origin-left scale-x-0"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}
