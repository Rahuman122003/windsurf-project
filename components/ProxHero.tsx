"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import mascotImg from "@/assets/mascot.png";

/**
 * PROX hero — cinematic mascot intro for /prox.
 *
 * Plugins: gsap core + ScrollTrigger
 *  • Mascot ambient float (yoyo sine.inOut)
 *  • Rocket-style subtle rotation cycle
 *  • Aurora halo pulses
 *  • Scroll-driven parallax — mascot drifts up, halo drifts opposite
 *  • Headline char-split slide-in with blur→focus
 *  • Velocity-reactive tilt
 */
export default function ProxHero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mascot = root.querySelector<HTMLElement>(".prox-hero-mascot");
      const halo = root.querySelector<HTMLElement>(".prox-hero-halo");
      const ring = root.querySelector<HTMLElement>(".prox-hero-ring");
      const chars = root.querySelectorAll<HTMLElement>(".prox-hero-char");
      const lede = root.querySelector<HTMLElement>(".prox-hero-lede");
      const cta = root.querySelector<HTMLElement>(".prox-hero-cta");

      // Headline char reveal
      gsap.fromTo(
        chars,
        { y: 80, autoAlpha: 0, rotateX: -60, filter: "blur(12px)" },
        {
          y: 0,
          autoAlpha: 1,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.025,
        }
      );

      // Lede + CTA stagger in after
      gsap.fromTo(
        [lede, cta],
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.9, ease: "power3.out", stagger: 0.15, delay: 0.5 }
      );

      // Ambient mascot float
      if (mascot) {
        gsap.to(mascot, {
          y: -24,
          duration: 2.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
        gsap.to(mascot, {
          rotation: 4,
          duration: 3.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
        gsap.to(mascot, {
          scale: 1.04,
          duration: 4.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      // Halo pulse
      if (halo) {
        gsap.to(halo, {
          scale: 1.12,
          opacity: 0.85,
          duration: 3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      // Slow rotating decorative orbits (outer CW, inner CCW)
      if (ring) {
        gsap.to(ring, { rotate: 360, duration: 40, ease: "none", repeat: -1 });
      }
      const ringInner = root.querySelector<HTMLElement>(".prox-hero-ring-inner");
      if (ringInner) {
        gsap.to(ringInner, { rotate: -360, duration: 60, ease: "none", repeat: -1 });
      }

      // Scroll-driven parallax
      if (mascot) {
        gsap.to(mascot, {
          yPercent: -18,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      // Velocity-reactive tilt on mascot
      ScrollTrigger.create({
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          if (!mascot) return;
          const v = gsap.utils.clamp(-1, 1, self.getVelocity() / 2200);
          gsap.to(mascot, {
            skewY: v * 2,
            duration: 0.6,
            ease: "power3.out",
            overwrite: "auto",
          });
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const title = "Meet PROX.";
  return (
    <div ref={rootRef} className="relative overflow-hidden bg-ink text-white">
      {/* Cinematic video backdrop */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <video
          src="/proxhero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Legibility scrim — vignette + ink fade */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_50%,transparent_0%,rgba(6,8,11,0.55)_60%,rgba(6,8,11,0.9)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent" />
      </div>
      <section className="relative z-10 pt-32 pb-24 lg:pt-44 lg:pb-32 px-6 lg:px-10">
        <div className="max-w-container mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Copy */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.25em] text-white/70 mb-8">
              <Sparkles size={12} /> Digital Brand Ambassador
            </div>
            <h1
              className="font-display text-6xl md:text-8xl lg:text-9xl font-extrabold leading-[0.95] tracking-tight"
              style={{ perspective: 900 }}
            >
              {title.split("").map((ch, i) => (
                <span
                  key={i}
                  className="prox-hero-char inline-block"
                  style={{ whiteSpace: ch === " " ? "pre" : "normal" }}
                >
                  {ch}
                </span>
              ))}
            </h1>
            <p className="prox-hero-lede mt-8 text-xl md:text-2xl text-white/70 leading-relaxed max-w-xl">
              Our studio mascot — a fox with a rocket on his back, designed and
              engineered by{" "}
              <span className="text-white font-semibold">Probiz Technologies</span>.
              Trained on our work, our voice and our principles. Always on,
              always on brand.
            </p>
            <div className="prox-hero-cta mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                prefetch
                className="inline-flex items-center gap-2 rounded-full bg-white text-ink px-7 py-3 text-base font-semibold hover:bg-white/90 transition-colors"
              >
                Talk to PROX
                <ArrowUpRight size={18} />
              </Link>
              <Link
                href="/services"
                prefetch
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3 text-base font-semibold hover:border-white transition-colors"
              >
                See what PROX powers
              </Link>
            </div>
          </div>

          {/* Mascot stage — backdrop video sits behind */}
          <div className="relative aspect-square w-full max-w-[640px] mx-auto">
            {/* Outer slow-rotating dashed orbit */}
            <div
              className="prox-hero-ring absolute inset-0 rounded-full border border-dashed border-white/25"
              aria-hidden
            />
            {/* Inner thinner orbit (counter-rotates) */}
            <div
              className="prox-hero-ring-inner absolute inset-10 rounded-full border border-white/10"
              aria-hidden
            />
            {/* Soft halo behind the mascot */}
            <div
              className="prox-hero-halo absolute inset-6 rounded-full blur-3xl opacity-70
                         bg-[radial-gradient(closest-side,rgba(168,85,247,0.55),rgba(236,72,153,0.25),transparent_70%)]"
              aria-hidden
            />
            {/* Mascot */}
            <img
              src={mascotImg.src}
              alt="PROX — Blyn's digital brand ambassador"
              className="prox-hero-mascot relative z-10 h-full w-full object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)] will-change-transform"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
