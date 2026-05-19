"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import brandImg from "@/assets/brandprox.png";
import designImg from "@/assets/designprox.png";
import developImg from "@/assets/developprox.png";

const facets = [
  {
    eyebrow: "Brand",
    title: "PROX, the storyteller.",
    body: "Crafts on-brand voice, narrative and visual systems — from naming to identity to launch.",
    img: brandImg.src,
    accent: "from-amber-400/30 to-rose-500/30",
  },
  {
    eyebrow: "Design",
    title: "PROX, the maker.",
    body: "Translates strategy into pixel-perfect product surfaces, motion systems and design systems.",
    img: designImg.src,
    accent: "from-sky-400/30 to-violet-500/30",
  },
  {
    eyebrow: "Develop",
    title: "PROX, the engineer.",
    body: "Ships production-grade Next.js, AI pipelines and infrastructure — measured, monitored, maintained.",
    img: developImg.src,
    accent: "from-emerald-400/30 to-teal-500/30",
  },
];

export default function ProxFacets() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".facet-card");

      cards.forEach((card, i) => {
        const img = card.querySelector<HTMLElement>(".facet-img");
        const copy = Array.from(card.querySelector(".facet-copy")?.children || []);

        // Bottom-up reveal
        gsap.fromTo(
          card,
          { yPercent: 30, autoAlpha: 0, scale: 0.94 },
          {
            yPercent: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Copy stagger
        if (copy.length) {
          gsap.fromTo(
            copy,
            { y: 24, autoAlpha: 0, filter: "blur(8px)" },
            {
              y: 0,
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: 0.8,
              stagger: 0.08,
              ease: "power3.out",
              delay: 0.2,
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // Mascot float — varied per card so they don't sync
        if (img) {
          gsap.to(img, {
            y: -16,
            duration: 2.4 + i * 0.4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
          gsap.to(img, {
            rotation: i % 2 ? -4 : 4,
            duration: 3.8 + i * 0.3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        }
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="bg-ink text-white py-24 lg:py-32">
      <div className="max-w-container mx-auto px-6 lg:px-10">
        <div className="max-w-3xl mb-16 lg:mb-20">
          <div className="text-xs uppercase tracking-[0.3em] text-white/50 mb-5">
            Three facets, one fox
          </div>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.02] tracking-tight">
            Brand. Design. Develop.
          </h2>
          <p className="mt-6 text-xl text-white/70 leading-relaxed">
            PROX wears different hats across the studio's three core
            disciplines — same fox, same rocket, sharper focus.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {facets.map((f) => (
            <article
              key={f.eyebrow}
              className="facet-card relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 lg:p-10 hover:border-white/30 transition-colors"
            >
              <div
                className={`absolute -top-20 -right-20 h-64 w-64 rounded-full blur-3xl bg-gradient-to-br ${f.accent}`}
                aria-hidden
              />
              <div className="relative aspect-square mb-6 flex items-center justify-center">
                <img
                  src={f.img}
                  alt={`PROX ${f.eyebrow}`}
                  loading="lazy"
                  className="facet-img relative z-10 h-full w-full object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.55)] will-change-transform"
                />
              </div>
              <div className="facet-copy relative">
                <div className="text-xs uppercase tracking-[0.3em] text-white/55 mb-3">
                  {f.eyebrow}
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold">
                  {f.title}
                </h3>
                <p className="mt-4 text-white/70 leading-relaxed">{f.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
