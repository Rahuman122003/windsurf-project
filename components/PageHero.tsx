"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProxWebGL from "./ProxWebGL";

type Props = {
  eyebrow: string;
  title: string;
  lede: string;
};

/**
 * Cinematic page hero used by every detail route (/work, /services, etc.).
 *
 * Composition:
 *  • WebGL aurora backdrop (shared `ProxWebGL` shader) with an ink scrim.
 *  • Char-split headline — each character slides up + un-blurs on mount.
 *  • Lede fades up on scroll.
 *  • Subtle parallax on the whole hero.
 *  • Floating decorative particles for depth.
 */
export default function PageHero({ eyebrow, title, lede }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const chars = root.querySelectorAll<HTMLElement>(".ph-char");
      const ledeEl = root.querySelector<HTMLElement>(".ph-lede");
      const eyebrowEl = root.querySelector<HTMLElement>(".ph-eyebrow");
      const decorLine = root.querySelector<HTMLElement>(".ph-decor-line");
      const dots = root.querySelectorAll<HTMLElement>(".ph-dot");

      // Eyebrow slide in
      gsap.fromTo(
        eyebrowEl,
        { y: 20, autoAlpha: 0, x: -30 },
        { y: 0, x: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" }
      );

      // Character cascade
      gsap.fromTo(
        chars,
        { y: 80, autoAlpha: 0, rotateX: -55, filter: "blur(10px)" },
        {
          y: 0,
          autoAlpha: 1,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 1.05,
          ease: "power4.out",
          stagger: 0.022,
          delay: 0.15,
        }
      );

      // Lede paragraph
      gsap.fromTo(
        ledeEl,
        { y: 30, autoAlpha: 0, filter: "blur(6px)" },
        { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.9, ease: "power3.out", delay: 0.55 }
      );

      // Decorative line grow
      if (decorLine) {
        gsap.fromTo(
          decorLine,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.2, ease: "power4.out", delay: 0.7 }
        );
      }

      // Floating dots infinite animation
      dots.forEach((dot, i) => {
        gsap.to(dot, {
          y: -15 + Math.random() * 30,
          x: -10 + Math.random() * 20,
          duration: 3 + Math.random() * 3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.5,
        });
      });

      // Parallax — drift the whole hero block as you scroll past it.
      gsap.to(root, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative overflow-hidden">
      {/* WebGL aurora backdrop */}
      <div className="absolute inset-0 z-0 opacity-90" aria-hidden>
        <ProxWebGL />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/30 to-ink" />
      </div>

      {/* Floating decorative dots */}
      <div className="ph-dot absolute top-[20%] left-[10%] w-1.5 h-1.5 rounded-full bg-white/15 z-[5]" />
      <div className="ph-dot absolute top-[40%] right-[15%] w-1 h-1 rounded-full bg-white/10 z-[5]" />
      <div className="ph-dot absolute bottom-[30%] left-[60%] w-2 h-2 rounded-full bg-white/8 z-[5]" />

      <section className="relative z-10 pt-32 sm:pt-40 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-10 max-w-container mx-auto">
        <div className="ph-eyebrow text-[11px] sm:text-xs uppercase tracking-[0.3em] text-white/60 mb-4 sm:mb-6 font-mono">
          {eyebrow}
        </div>
        <h1
          className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] tracking-tight break-words"
          style={{ perspective: 900 }}
        >
          {title.split("").map((ch, i) => (
            <span
              key={i}
              className="ph-char inline-block"
              style={{ whiteSpace: ch === " " ? "pre" : "normal" }}
            >
              {ch}
            </span>
          ))}
        </h1>

        {/* Decorative accent line */}
        <div className="ph-decor-line mt-4 sm:mt-6 h-[2px] w-16 sm:w-24 bg-gradient-to-r from-accent to-transparent origin-left" />

        <p className="ph-lede mt-6 sm:mt-8 text-base sm:text-xl md:text-2xl text-white/75 max-w-3xl leading-relaxed">
          {lede}
        </p>
      </section>
    </div>
  );
}
