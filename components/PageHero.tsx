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
 */
export default function PageHero({ eyebrow, title, lede }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const chars = root.querySelectorAll<HTMLElement>(".ph-char");
      const lede = root.querySelector<HTMLElement>(".ph-lede");
      const eyebrowEl = root.querySelector<HTMLElement>(".ph-eyebrow");

      gsap.fromTo(
        eyebrowEl,
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out" }
      );
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
      gsap.fromTo(
        lede,
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.9, ease: "power3.out", delay: 0.55 }
      );

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
      <section className="relative z-10 pt-40 pb-20 px-6 lg:px-10 max-w-container mx-auto">
        <div className="ph-eyebrow text-xs uppercase tracking-[0.3em] text-white/60 mb-6">
          {eyebrow}
        </div>
        <h1
          className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.02] tracking-tight"
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
        <p className="ph-lede mt-8 text-xl md:text-2xl text-white/75 max-w-3xl leading-relaxed">
          {lede}
        </p>
      </section>
    </div>
  );
}
