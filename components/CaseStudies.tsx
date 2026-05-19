"use client";
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import PrismButton from "./PrismButton";
import RevealText from "./RevealText";

const cases = [
  { tag: "Fintech", title: "Reimagining digital banking for a Gen-Z audience", img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80" },
  { tag: "Retail", title: "A commerce platform built for global scale", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80" },
  { tag: "Healthtech", title: "Patient-first experiences powered by data", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80" },
  { tag: "Travel", title: "An AI concierge for the modern explorer", img: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80" },
  { tag: "Energy", title: "Sustainable operations through smart dashboards", img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&q=80" },
  { tag: "SaaS", title: "Onboarding that converts at every step", img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80" },
];

export default function CaseStudies() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const cards = root.querySelectorAll<HTMLElement>(".case-card");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            cards.forEach((c, i) => {
              setTimeout(() => {
                c.style.opacity = "1";
                c.style.transform = "translateY(0)";
              }, i * 100);
            });
            io.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <section id="work" className="py-24 lg:py-32 bg-white">
      <div className="max-w-container mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <RevealText
            as="h2"
            text="Case studies that move the needle"
            className="font-display font-extrabold leading-[1.02] max-w-3xl"
          />
          <PrismButton href="/work" variant="link">View all works</PrismButton>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {cases.map((c, i) => (
            <a
              key={i}
              href="/work"
              className="case-card group relative block rounded-2xl overflow-hidden bg-neutral-100 transition-all duration-500 hover:-translate-y-1.5"
              style={{ opacity: 0, transform: "translateY(40px)", transition: "opacity .9s ease, transform .9s ease" }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={c.img}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0 transition-opacity duration-500 group-hover:from-black/70" />
                <span className="absolute top-4 left-4 z-10 inline-flex rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-semibold text-ink">
                  {c.tag}
                </span>
              </div>
              <div className="flex items-start justify-between gap-4 p-6">
                <h3 className="text-lg lg:text-xl font-display font-bold leading-snug">{c.title}</h3>
                <span className="shrink-0 mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white transition-transform group-hover:rotate-45">
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

declare global {
  interface HTMLElementStyleMap {}
}
