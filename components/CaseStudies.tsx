"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, TrendingUp, Cpu, Award } from "lucide-react";
import PrismButton from "./PrismButton";
import RevealText from "./RevealText";

const CATEGORIES = ["All", "Fintech", "Retail", "Healthtech", "Travel", "Energy", "SaaS"];

const cases = [
  {
    client: "NeoBank One",
    tag: "Fintech",
    title: "Reimagining digital banking for a Gen-Z audience",
    description: "Built a micro-interaction rich iOS/Android app and design system, delivering frictionless onboarding and peer payments.",
    metrics: "+142% Activation",
    secondaryMetric: "$1.8B Processed",
    stack: ["Next.js", "React Native", "Tailwind", "Go"],
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80",
    slug: "neobank-one",
  },
  {
    client: "Aura Commerce",
    tag: "Retail",
    title: "A commerce platform built for global sub-second scale",
    description: "Engineered headless architecture with edge caching, reducing global page load from 3.2s to 420ms worldwide.",
    metrics: "-68% Bounce Rate",
    secondaryMetric: "420ms Latency",
    stack: ["Shopify Plus", "Next.js 14", "GraphQL", "Vercel Edge"],
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80",
    slug: "aura-commerce",
  },
  {
    client: "PulseHealth",
    tag: "Healthtech",
    title: "Patient-first telemetry platform powered by HIPAA AI",
    description: "Developed secure streaming medical dashboard with real-time anomaly alerts for over 50,000 clinicians.",
    metrics: "99.999% Uptime",
    secondaryMetric: "50k Active Docs",
    stack: ["React", "Python RAG", "Tailwind", "AWS HealthLake"],
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
    slug: "pulse-health",
  },
  {
    client: "Voyager AI",
    tag: "Travel",
    title: "An AI concierge for luxury travel itineraries",
    description: "Integrated agentic LLM workflows to curate personalized multi-city trips in seconds with live booking integration.",
    metrics: "4.9/5 Rating",
    secondaryMetric: "3.2x Booking Rate",
    stack: ["LangChain", "Next.js", "TypeScript", "Pinecone"],
    img: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80",
    slug: "voyager-ai",
  },
  {
    client: "Verde Grid",
    tag: "Energy",
    title: "Sustainable clean energy monitoring dashboards",
    description: "Real-time WebGL visualization of micro-grid solar & battery storage output across 1,200 industrial facilities.",
    metrics: "-34% Carbon Footprint",
    secondaryMetric: "1.2GW Managed",
    stack: ["Three.js", "WebGL", "Node.js", "TimescaleDB"],
    img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&q=80",
    slug: "verde-grid",
  },
  {
    client: "FlowScale SaaS",
    tag: "SaaS",
    title: "Enterprise onboarding flow that triples conversion",
    description: "Redesigned self-serve enterprise onboarding with contextual video guides, interactive sandboxes, and automated team seats.",
    metrics: "+310% Free to Paid",
    secondaryMetric: "< 5 Min Setup",
    stack: ["Next.js", "Framer Motion", "PostgreSQL", "Stripe"],
    img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80",
    slug: "flowscale-saas",
  },
];

export default function CaseStudies() {
  const [activeTab, setActiveTab] = useState("All");
  const ref = useRef<HTMLDivElement>(null);

  const filteredCases = activeTab === "All" ? cases : cases.filter((c) => c.tag === activeTab);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const cards = root.querySelectorAll<HTMLElement>(".case-card");
    cards.forEach((c, i) => {
      c.style.opacity = "0";
      c.style.transform = "translateY(20px)";
      setTimeout(() => {
        c.style.opacity = "1";
        c.style.transform = "translateY(0)";
      }, i * 80);
    });
  }, [activeTab]);

  return (
    <section id="work" className="py-24 lg:py-36 bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-white/50 block mb-3">
              Proven Impact
            </span>
            <RevealText
              as="h2"
              text="Case studies measured by real outcomes."
              className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.05] max-w-3xl text-white"
            />
          </div>
          <PrismButton href="/work" variant="link">
            Explore All 120+ Works
          </PrismButton>
        </div>

        {/* Category Filters */}
        <div className="flex overflow-x-auto gap-2 mb-8 sm:mb-12 border-b border-white/10 pb-4 sm:pb-6 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeTab === cat
                  ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.25)]"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Case Cards Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCases.map((c, i) => (
            <a
              key={c.slug}
              href="/work"
              className="case-card group relative block rounded-3xl overflow-hidden bg-neutral-900/80 border border-white/10 hover:border-white/30 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
              style={{ transition: "opacity .6s ease, transform .6s ease" }}
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/20 to-transparent" />
                  <div className="absolute top-4 left-4 z-10 flex gap-2">
                    <span className="rounded-full bg-black/80 border border-white/20 backdrop-blur px-3 py-1 text-xs font-semibold text-white">
                      {c.tag}
                    </span>
                    <span className="rounded-full bg-white/10 text-white/90 border border-white/20 backdrop-blur px-3 py-1 text-xs font-semibold flex items-center gap-1">
                      <TrendingUp size={12} /> {c.metrics}
                    </span>
                  </div>
                </div>

                <div className="p-6 md:p-8 space-y-4">
                  <div className="text-xs font-mono uppercase tracking-widest text-white/40">
                    {c.client}
                  </div>
                  <h3 className="text-xl md:text-2xl font-display font-bold leading-snug group-hover:text-white transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed line-clamp-2">
                    {c.description}
                  </p>
                </div>
              </div>

              <div className="p-6 md:p-8 pt-0 mt-auto border-t border-white/5 space-y-4">
                <div className="flex flex-wrap gap-1.5 pt-4">
                  {c.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-white/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-white/40 font-medium">
                    Secondary Outcome: <strong className="text-white">{c.secondaryMetric}</strong>
                  </span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:rotate-45">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
