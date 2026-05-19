"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealText from "./RevealText";

const chapters = [
  {
    eyebrow: "01 — Discover",
    title: "We start by listening",
    body: "Workshops, research and stakeholder interviews shape an evidence-based product strategy.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=80",
  },
  {
    eyebrow: "02 — Design",
    title: "Then we craft the vision",
    body: "Interaction systems, motion language and brand expression — designed for scale and emotion.",
    img: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1400&q=80",
  },
  {
    eyebrow: "03 — Build",
    title: "Engineered to ship",
    body: "Modern frontends, resilient backends and Gen-AI pipelines wired into your business.",
    img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1400&q=80",
  },
  {
    eyebrow: "04 — Grow",
    title: "Measure, learn, compound",
    body: "Observability, experimentation and ongoing optimization make impact a habit, not an event.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80",
  },
];

export default function PictureInPicture() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const wrap = wrapRef.current;
    const sticky = stickyRef.current;
    if (!wrap || !sticky) return;

    const slides = sticky.querySelectorAll<HTMLElement>(".pip-slide");
    const chaptersEls = wrap.querySelectorAll<HTMLElement>(".pip-chapter");

    // Crossfade slides as user scrolls through each chapter
    chaptersEls.forEach((ch, i) => {
      ScrollTrigger.create({
        trigger: ch,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => {
          if (self.isActive) {
            slides.forEach((s, j) => {
              gsap.to(s, {
                autoAlpha: j === i ? 1 : 0,
                scale: j === i ? 1 : 1.06,
                duration: 0.9,
                ease: "power2.out",
              });
            });
          }
        },
      });
    });

    // Initial state
    gsap.set(slides, { autoAlpha: 0, scale: 1.06 });
    gsap.set(slides[0], { autoAlpha: 1, scale: 1 });

    return () => ScrollTrigger.getAll().forEach((t) => {
      if (t.trigger && wrap.contains(t.trigger as Node)) t.kill();
    });
  }, []);

  return (
    <section className="bg-white">
      <div className="max-w-container mx-auto px-6 lg:px-10 pt-24 lg:pt-32 pb-10">
        <div className="text-sm uppercase tracking-[0.25em] text-muted mb-4">How we work</div>
        <RevealText as="h2" text="A practice built for outcomes" className="font-display font-extrabold leading-[1.02] max-w-3xl" />
      </div>

      <div ref={wrapRef} className="max-w-container mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-16 pb-24 lg:pb-32">
        {/* Left: scrolling chapters */}
        <div className="flex flex-col gap-[40vh] lg:gap-[50vh] pt-[10vh]">
          {chapters.map((c, i) => (
            <div key={i} className="pip-chapter max-w-xl">
              <div className="text-xs uppercase tracking-[0.25em] text-accent mb-4">{c.eyebrow}</div>
              <RevealText as="h3" text={c.title} className="font-display font-bold text-3xl md:text-5xl leading-[1.05]" />
              <p className="mt-5 text-muted text-lg leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>

        {/* Right: pinned picture */}
        <div className="hidden lg:block">
          <div ref={stickyRef} className="sticky top-24 h-[70vh] rounded-2xl overflow-hidden bg-neutral-100">
            {chapters.map((c, i) => (
              <div key={i} className="pip-slide absolute inset-0">
                <img src={c.img} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="text-xs uppercase tracking-[0.25em] opacity-80">{c.eyebrow}</div>
                  <div className="font-display font-bold text-xl mt-1">{c.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: inline images per chapter */}
        <div className="lg:hidden flex flex-col gap-12 -mt-24">
          {chapters.map((c, i) => (
            <div key={i} className="rounded-2xl overflow-hidden aspect-[4/3]">
              <img src={c.img} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
