"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    // Skip Lenis on touch devices (native momentum scroll feels better and
    // avoids gesture hijacking) and when the user prefers reduced motion.
    const isTouch =
      window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    const reduceMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduceMotion) {
      // Still ensure ScrollTrigger is registered so other components work.
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      // Balanced lerp — high enough to feel responsive, low enough to glide
      // through pinned/sticky sections without judder.
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      syncTouch: false,
      // Cubic ease-out: snappier start, gentle settle.
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });

    // Single RAF loop driven by GSAP ticker (avoid duplicate stepping)
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Bridge Lenis -> ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Smooth anchor scrolls
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id) as HTMLElement | null;
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el, { offset: -80, duration: 1.4 });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return null;
}
