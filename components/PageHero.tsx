"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProxWebGL from "./ProxWebGL";

type Props = {
  eyebrow: string;
  title: string;
  lede: string;
  videoSrc?: string;
  rotateVideoLeft?: boolean;
};

/**
 * Cinematic page hero used by detail routes (/work, /services, /stories, etc.).
 *
 * Composition:
 *  • Video background (or WebGL aurora backdrop if no video) with ink scrim overlay.
 *  • Char-split headline — each character slides up + un-blurs on mount.
 *  • Lede fades up on scroll.
 *  • Subtle parallax on the whole hero.
 *  • Floating decorative particles for depth.
 */
export default function PageHero({ eyebrow, title, lede, videoSrc, rotateVideoLeft }: Props) {
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
    <div ref={rootRef} className="relative overflow-hidden min-h-[80vh] md:min-h-[88vh] lg:min-h-[92vh] flex flex-col justify-center">
      {/* Background Video or WebGL backdrop */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
        {videoSrc ? (
          <div className="relative w-full h-full overflow-hidden bg-ink flex items-center justify-center">
            <video
              key={videoSrc}
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              controlsList="nodownload"
              onError={(e) => {
                const target = e.currentTarget;
                if (target && !target.dataset.retried) {
                  target.dataset.retried = "true";
                  target.src = `${videoSrc}?v=${Date.now()}`;
                  target.load();
                  target.play().catch(() => {});
                }
              }}
              style={
                rotateVideoLeft
                  ? {
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: "120vh",
                      height: "120vw",
                      minWidth: "140%",
                      minHeight: "140%",
                      transform: "translate(-50%, -50%) rotate(-90deg) scale(1.5)",
                      objectFit: "cover",
                    }
                  : {
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }
              }
              className="pointer-events-none"
            />
          </div>
        ) : (
          <div className="w-full h-full opacity-90 relative">
            <ProxWebGL />
          </div>
        )}
        {/* Dark overlay scrim for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/60 to-ink pointer-events-none z-[1]" />
      </div>

      {/* Floating decorative dots */}
      <div className="ph-dot absolute top-[20%] left-[10%] w-2 h-2 rounded-full bg-white/20 z-[5]" />
      <div className="ph-dot absolute top-[40%] right-[15%] w-1.5 h-1.5 rounded-full bg-white/15 z-[5]" />
      <div className="ph-dot absolute bottom-[30%] left-[60%] w-2.5 h-2.5 rounded-full bg-white/10 z-[5]" />

      <section className="relative z-10 pt-40 sm:pt-48 md:pt-56 pb-24 sm:pb-32 lg:pb-40 px-4 sm:px-6 lg:px-10 max-w-container mx-auto w-full">
        <div className="ph-eyebrow text-xs sm:text-sm uppercase tracking-[0.35em] text-accent font-semibold mb-4 sm:mb-6 font-mono">
          {eyebrow}
        </div>
        <h1
          className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-[6.5rem] font-extrabold leading-[1.02] tracking-tight break-words"
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
        <div className="ph-decor-line mt-6 sm:mt-8 h-[3px] w-20 sm:w-32 bg-gradient-to-r from-accent via-white/50 to-transparent origin-left" />

        <p className="ph-lede mt-8 sm:mt-10 text-lg sm:text-2xl md:text-3xl text-white/80 max-w-4xl leading-relaxed font-light">
          {lede}
        </p>
      </section>
    </div>
  );
}
