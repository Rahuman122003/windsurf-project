"use client";
import { useEffect, useRef } from "react";
import PrismButton from "./PrismButton";

const scrollVideo = "/scroll.mp4";

type Slide = {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  href: string;
};

const slides: Slide[] = [
  {
    eyebrow: "01 — Vision",
    title: "Crafting bold digital futures",
    body: "We partner with category-defining brands to design and engineer the products of the next decade.",
    cta: "Explore our work",
    href: "/work",
  },
  {
    eyebrow: "02 — Work",
    title: "Stories that move the needle",
    body: "From fintech to healthtech, our case studies prove what intentional design and engineering can do.",
    cta: "View case studies",
    href: "/work",
  },
  {
    eyebrow: "03 — Craft",
    title: "Design, engineering, AI",
    body: "A full-stack product studio combining strategy, motion, and modern engineering — including Gen AI.",
    cta: "Explore services",
    href: "/services",
  },
];

/**
 * Pinned hero slider.
 *
 *   • Background video loops at natural speed (NOT tied to scroll).
 *   • Each text slide slides up into place, then HOLDS while you keep
 *     scrolling, then slides further up out of view as the next one rises
 *     into place from below.
 *
 * Per slide, the progress timeline within its own slot is:
 *
 *   0.00 ─ TRANSITION  → entering from below (translateY +100% → 0)
 *   TRANSITION ─ (1−TRANSITION) → HOLD (translateY 0, still)
 *   (1−TRANSITION) ─ 1.00 → exiting upward (translateY 0 → −100%)
 *
 * Slots are equal slices of the full scroll progress.
 */
const SCROLL_VIEWPORTS = 4; // pinned scroll length
const TRANSITION = 0.18; // share of each slot used for in/out motion (rest = hold)

const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);
const smooth = (t: number) => {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
};

export default function SwipeSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Loop the video naturally; pause when section is off-screen to save CPU.
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;
    video.muted = true;
    video.playsInline = true;
    video.loop = true;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0 }
    );
    io.observe(container);
    return () => io.disconnect();
  }, []);

  // Drive slide transforms from scroll progress (no video involvement).
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId = 0;
    const render = () => {
      rafId = 0;
      const rect = container.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const scrolled = clamp(-rect.top, 0, total);
      const progress = scrolled / total; // 0 → 1 across the pinned section

      const slot = 1 / slides.length; // share of progress per slide
      slides.forEach((_, i) => {
        const el = slideRefs.current[i];
        if (!el) return;

        // Local progress within this slide's slot, expressed −1 (full enter
        // anim about to start) → 0 (just entered, holding) → 1 (just before
        // exit) → 2 (fully exited above). We compute it via the boundaries.
        const slotStart = i * slot;
        const slotEnd = (i + 1) * slot;
        const enterWindow = slot * TRANSITION;
        const exitWindow = slot * TRANSITION;

        let yPercent = 0; // translateY in % of element height
        let opacity = 1;

        if (progress < slotStart - exitWindow) {
          // Hasn't started entering yet — parked below.
          yPercent = 100;
          opacity = 0;
        } else if (progress < slotStart) {
          // ENTER: from below (+100%) up to 0.
          const k = smooth(1 - (slotStart - progress) / enterWindow);
          yPercent = (1 - k) * 100;
          opacity = k;
        } else if (progress < slotEnd - exitWindow) {
          // HOLD: parked centred.
          yPercent = 0;
          opacity = 1;
        } else if (progress < slotEnd) {
          // EXIT: from 0 upward to −100%.
          const k = smooth(1 - (slotEnd - progress) / exitWindow);
          yPercent = -k * 100;
          opacity = 1 - k;
        } else {
          // Already exited above.
          yPercent = -100;
          opacity = 0;
        }

        el.style.transform = `translate3d(0, ${yPercent}%, 0)`;
        el.style.opacity = String(opacity);
        el.style.pointerEvents = opacity > 0.5 ? "auto" : "none";
      });
    };

    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(render);
    };

    render();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="relative bg-ink text-white">
      <div
        ref={containerRef}
        className="relative"
        style={{ height: `${(SCROLL_VIEWPORTS + 1) * 100}svh` }}
      >
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-ink">
          {/* Looping background video — right side. */}
          <video
            ref={videoRef}
            src={scrollVideo}
            muted
            playsInline
            loop
            preload="auto"
            className="pointer-events-none absolute right-0 top-0 h-full w-[55%] object-cover"
          />

          {/* Left fade for legibility. */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-transparent" />

          {/* Slide stack — grid cell 1/1 so all share the same box. The
              `overflow-hidden` wrapper clips slides as they translate up/down,
              giving a clean reveal/clear edge. */}
          <div className="relative z-10 h-full max-w-container mx-auto px-6 lg:px-10 flex items-center">
            <div className="grid w-full max-w-2xl overflow-hidden">
              {slides.map((s, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    slideRefs.current[i] = el;
                  }}
                  style={{
                    gridArea: "1 / 1",
                    // Start parked below so the first slide can animate in if
                    // the section is below the fold at mount.
                    transform: i === 0 ? "translate3d(0,0,0)" : "translate3d(0,100%,0)",
                    opacity: i === 0 ? 1 : 0,
                    willChange: "transform, opacity",
                  }}
                >
                  <div className="text-sm uppercase tracking-[0.3em] opacity-70 mb-6">
                    {s.eyebrow}
                  </div>
                  <h2
                    className="font-display font-extrabold leading-[1.0]"
                    style={{
                      fontSize: "clamp(48px,6.5vw,104px)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {s.title}
                  </h2>
                  <p className="mt-6 text-lg md:text-xl opacity-75 max-w-xl leading-relaxed">
                    {s.body}
                  </p>
                  <div className="mt-10">
                    <PrismButton href={s.href}>{s.cta}</PrismButton>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute top-24 right-6 lg:right-10 z-20 text-xs uppercase tracking-[0.3em] opacity-60">
            Scroll ↓
          </div>
        </div>
      </div>
    </section>
  );
}
