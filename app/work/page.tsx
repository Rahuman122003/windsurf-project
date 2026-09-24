"use client";
import { useState } from "react";
import { ArrowUpRight, Sparkles, Filter, CheckCircle } from "lucide-react";
import PageShell, { DetailSection } from "@/components/PageShell";
import FooterCTA from "@/components/FooterCTA";
import RevealText from "@/components/RevealText";
import Parallax, { ParallaxCard } from "@/components/Parallax";
import StatsCounter from "@/components/StatsCounter";
import SlideReveal from "@/components/SlideReveal";

const categories = ["All", "Fintech", "Retail", "Healthtech", "Travel", "Energy", "SaaS"];

const projects = [
  {
    id: 1,
    tag: "Fintech",
    title: "Reimagining digital banking for a Gen-Z audience",
    summary:
      "A full rebrand and product redesign for a challenger bank. New visual system, motion language, onboarding flow and 14-app component library shipped in 9 months.",
    metrics: [
      ["+62%", "activation rate"],
      ["1.4M", "MAU year one"],
      ["-38%", "support tickets"],
    ],
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80",
    featured: true,
  },
  {
    id: 2,
    tag: "Retail",
    title: "A commerce platform built for global scale",
    summary:
      "Headless commerce architecture across 14 markets with a unified storefront experience. Edge-rendered, sub-200ms TTFB worldwide, fully content-managed by merchandising teams.",
    metrics: [
      ["+41%", "conversion"],
      ["-71%", "time-to-publish"],
      ["A+", "core web vitals"],
    ],
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80",
    featured: false,
  },
  {
    id: 3,
    tag: "Healthtech",
    title: "Patient-first experiences powered by data",
    summary:
      "An end-to-end patient portal that consolidates appointments, records and AI-assisted triage. HIPAA-compliant design system with WCAG AA accessibility from day one.",
    metrics: [
      ["+3.2x", "self-service"],
      ["98%", "task success"],
      ["AA", "WCAG compliance"],
    ],
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80",
    featured: false,
  },
  {
    id: 4,
    tag: "Travel",
    title: "An AI concierge for the modern explorer",
    summary:
      "A conversational planning surface that turns vague travel intent into bookable itineraries. Custom RAG pipeline over partner inventory with branded voice and tone.",
    metrics: [
      ["-54%", "planning time"],
      ["+27%", "AOV"],
      ["4.8★", "user rating"],
    ],
    img: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80",
    featured: false,
  },
  {
    id: 5,
    tag: "Energy",
    title: "Sustainable operations through smart dashboards",
    summary:
      "A real-time operations cockpit visualising 12,000+ telemetry signals. Bespoke charting library, anomaly highlighting and an alerting system trusted by control-room operators.",
    metrics: [
      ["-18%", "energy waste"],
      ["3s", "time-to-detect"],
      ["24/7", "uptime"],
    ],
    img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1600&q=80",
    featured: false,
  },
  {
    id: 6,
    tag: "SaaS",
    title: "Onboarding that converts at every step",
    summary:
      "Replatformed sign-up, activation and billing for a horizontal SaaS. New empty-state strategy, contextual coachmarks and a guided product tour engine.",
    metrics: [
      ["+89%", "trial→paid"],
      ["-2.1d", "time-to-value"],
      ["+34%", "NPS"],
    ],
    img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&q=80",
    featured: false,
  },
];

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.tag.toLowerCase() === activeCategory.toLowerCase());

  return (
    <>
      <PageShell
        eyebrow="Selected Work"
        title="Cinematic products, measured by outcomes."
        lede="Every engagement we take on is a partnership — long, deliberate, and obsessed with shipping. Below is a curated set of the things we've made and the numbers they moved."
      >
        <DetailSection eyebrow="Filter Showcase" className="!pt-4">
          {/* Category Filter Pills */}
          <SlideReveal direction="left" distance={80}>
            <div className="flex flex-wrap gap-3 items-center mb-14">
              <span className="text-white/40 text-xs uppercase tracking-widest flex items-center gap-2 mr-2">
                <Filter size={14} /> Filter:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-white text-ink shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-105"
                      : "bg-white/5 text-white/70 hover:bg-white/15 hover:text-white border border-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </SlideReveal>

          {/* Asymmetric Split Layout with Left / Right Slide Animations */}
          <div className="space-y-16 lg:space-y-24">
            {filteredProjects.map((p, idx) => {
              const slideDir = idx % 2 === 0 ? "left" : "right";
              return (
                <SlideReveal key={p.id} direction={slideDir} distance={120}>
                  <ParallaxCard depth={0.1}>
                    <article
                      className={`group relative rounded-3xl border border-white/15 bg-gradient-to-b from-white/10 to-white/5 p-8 lg:p-12 hover:border-white/40 transition-colors duration-500 overflow-hidden shadow-2xl grid grid-cols-1 ${
                        idx % 2 === 0 ? "lg:grid-cols-[1.1fr_0.9fr]" : "lg:grid-cols-[0.9fr_1.1fr]"
                      } gap-10 lg:gap-14 items-center`}
                      data-cursor="CASE STUDY"
                    >
                      {/* Image block (Left on even, Right on odd) */}
                      <div className={`relative aspect-[16/10] overflow-hidden rounded-2xl bg-ink ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                        <Parallax speed={0.15} scale>
                          <img
                            src={p.img}
                            alt={p.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
                          />
                        </Parallax>
                        <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-ink/80 backdrop-blur-md text-white border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                          <Sparkles size={12} className="text-accent" /> {p.tag}
                        </span>
                      </div>

                      {/* Content block */}
                      <div className={`${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                        <div className="text-xs font-mono uppercase tracking-[0.25em] text-accent mb-3">
                          Case 0{p.id}
                        </div>
                        <RevealText text={p.title} as="h3" className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" />
                        <p className="mt-5 text-white/70 text-base md:text-lg leading-relaxed">{p.summary}</p>

                        <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/15 pt-6">
                          {p.metrics.map(([v, l]) => (
                            <StatsCounter key={l} value={v} label={l} className="!border-t-0 !pt-0" />
                          ))}
                        </div>

                        <a
                          href="/contact"
                          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white transition-colors group/link"
                        >
                          <span>Read case study</span>
                          <ArrowUpRight size={16} className="transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                        </a>
                      </div>
                    </article>
                  </ParallaxCard>
                </SlideReveal>
              );
            })}
          </div>
        </DetailSection>

        {/* Methodology with Left / Right Slide Stagger */}
        <DetailSection eyebrow="How we work" title="A small senior team, embedded.">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              ["01 — Discovery", "Two weeks of immersion: stakeholder interviews, analytics audits, competitive teardown, and a written hypothesis we will defend or kill."],
              ["02 — Build", "Cross-functional pods — strategy, design, engineering — shipping working software every Friday in a shared Linear and a shared Figma."],
              ["03 — Compound", "We stay past launch. Quarterly experiments, a living design system, and roadmaps that keep paying back the original investment."],
            ].map(([h, b], i) => (
              <SlideReveal key={h} direction={i % 2 === 0 ? "left" : "right"} distance={80} delay={i * 0.15}>
                <div className="rounded-2xl border border-white/15 p-8 bg-white/5 hover:border-white/40 transition-colors h-full flex flex-col justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.25em] text-accent font-mono mb-4">{h}</div>
                    <p className="text-white/80 text-base leading-relaxed">{b}</p>
                  </div>
                  <div className="mt-8 h-1 w-12 bg-white/20 rounded-full group-hover:w-full transition-all duration-500" />
                </div>
              </SlideReveal>
            ))}
          </div>
        </DetailSection>
      </PageShell>
      <FooterCTA />
    </>
  );
}
