"use client";
import { useState } from "react";
import { ArrowUpRight, Check, Sparkles, ChevronDown } from "lucide-react";
import PageShell, { DetailSection } from "@/components/PageShell";
import FooterCTA from "@/components/FooterCTA";
import RevealText from "@/components/RevealText";
import Parallax, { ParallaxCard } from "@/components/Parallax";
import SlideReveal from "@/components/SlideReveal";
import StaggerGrid from "@/components/StaggerGrid";
import MagneticElement from "@/components/MagneticElement";

const roles = [
  {
    id: 1,
    title: "Senior Product Designer",
    team: "Design",
    location: "London / Remote (UK ± 3h)",
    type: "Full-time",
    description: "Lead end-to-end design for complex digital products. Craft design systems, user flows, and high-fidelity interactive prototypes alongside senior engineers.",
  },
  {
    id: 2,
    title: "Staff Frontend Engineer",
    team: "Engineering",
    location: "Remote (EMEA)",
    type: "Full-time",
    description: "Architect high-performance WebGL, Next.js and React interfaces. Set engineering standards, drive performance budgets, and mentor the squad.",
  },
  {
    id: 3,
    title: "AI Engineer — Applied",
    team: "AI",
    location: "London",
    type: "Full-time",
    description: "Build pragmatic RAG pipelines, agentic workflows, and LLM evaluation harnesses for client launches.",
  },
  {
    id: 4,
    title: "Senior Brand Designer",
    team: "Brand",
    location: "London / Hybrid",
    type: "Full-time",
    description: "Shape brand systems, motion identities, and visual guidelines that scale across global digital touchpoints.",
  },
  {
    id: 5,
    title: "Producer",
    team: "Operations",
    location: "Remote (EMEA)",
    type: "Full-time",
    description: "Keep cross-functional pods aligned, unblock dependencies, and manage client relationships with clarity.",
  },
  {
    id: 6,
    title: "Design Intern (Summer 2026)",
    team: "Design",
    location: "London",
    type: "12 weeks",
    description: "Immerse yourself in real client projects with dedicated mentorship from senior operators.",
  },
];

const principles = [
  ["Senior or training to be", "We hire people who can lead a project end-to-end. If you're not there yet, we'll tell you, and we'll mean it when we say we'd love to talk again in 18 months."],
  ["Writing is the job", "Sharp design follows sharp writing. Every role here writes — briefs, post-mortems, proposals — and we evaluate it at every step."],
  ["No heroics", "We staff projects so nobody works weekends. If a project starts to need heroics, we have failed at scoping, not at hiring."],
  ["Outcomes over hours", "We track what shipped and what moved. We don't track when you logged on."],
];

const benefits = [
  "Open salary bands, reviewed every six months",
  "32 days PTO + UK bank holidays + birthday",
  "Equity allocation in every full-time role",
  "£2,000 annual learning & conference budget",
  "Top-tier M3 Max hardware on day one",
  "Four-day work weeks in August",
  "Private health & mental-health coverage",
  "Quarterly team off-sites with paid travel",
];

const culturePhotos = [
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
];

export default function CareersPage() {
  const [expandedRole, setExpandedRole] = useState<number | null>(null);

  return (
    <>
      <PageShell
        eyebrow="Careers"
        title="Build a career, not a portfolio."
        lede="We are a small studio of operators — designers, engineers, strategists and AI practitioners — who care about craft, kindness and the boring parts of shipping. Here's how we hire, what we offer, and what it's like to actually work here."
      >
        {/* Culture Photo Parallax Wall with Stagger */}
        <DetailSection eyebrow="Culture" className="!pt-4">
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16" stagger={0.15}>
            {culturePhotos.map((img, i) => (
              <Parallax key={i} speed={0.2 * (i % 2 === 0 ? 1 : -1)} scale>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/15 bg-white/5 group">
                  <img src={img} alt="Culture" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
              </Parallax>
            ))}
          </StaggerGrid>
        </DetailSection>

        {/* Interactive Open Roles with SlideReveal */}
        <DetailSection eyebrow="Open Roles">
          <div className="space-y-4">
            {roles.map((r, idx) => {
              const isOpen = expandedRole === r.id;
              const slideDir = idx % 2 === 0 ? "left" : "right";
              return (
                <SlideReveal key={r.id} direction={slideDir} distance={80} delay={idx * 0.06}>
                  <ParallaxCard depth={0.1}>
                    <div className={`rounded-2xl border bg-white/5 overflow-hidden transition-all duration-500 ${isOpen ? "border-white/40 shadow-lg shadow-white/5" : "border-white/15 hover:border-white/30"}`}>
                      <button
                        onClick={() => setExpandedRole(isOpen ? null : r.id)}
                        className="w-full text-left p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
                        data-cursor="EXPAND"
                      >
                        <div>
                          <div className="font-display text-2xl md:text-3xl font-bold text-white group-hover:text-accent transition-colors">
                            {r.title}
                          </div>
                          <div className="flex flex-wrap items-center gap-4 mt-2 text-white/55 text-sm">
                            <span>{r.team}</span>
                            <span>•</span>
                            <span>{r.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white">
                            {r.type}
                          </span>
                          <ChevronDown
                            size={20}
                            className={`text-white/60 transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}
                          />
                        </div>
                      </button>

                      <div
                        className="overflow-hidden transition-all duration-500 ease-out"
                        style={{
                          maxHeight: isOpen ? "300px" : "0",
                          opacity: isOpen ? 1 : 0,
                        }}
                      >
                        <div className="px-6 pb-8 lg:px-8 pt-2 border-t border-white/10 bg-white/[0.02]">
                          <p className="text-white/80 text-base leading-relaxed max-w-2xl mb-6">
                            {r.description}
                          </p>
                          <MagneticElement className="inline-block" strength={0.3} radius={80}>
                            <a
                              href="/contact"
                              className="inline-flex items-center gap-2 rounded-full bg-white text-ink px-6 py-2.5 text-sm font-semibold hover:bg-white/90 transition-colors"
                            >
                              Apply for role <ArrowUpRight size={16} />
                            </a>
                          </MagneticElement>
                        </div>
                      </div>
                    </div>
                  </ParallaxCard>
                </SlideReveal>
              );
            })}
          </div>
        </DetailSection>

        {/* Principles with Stagger Grid */}
        <DetailSection eyebrow="How we work" title="Four principles, in plain language.">
          <StaggerGrid className="grid md:grid-cols-2 gap-8" stagger={0.12}>
            {principles.map(([h, b], i) => (
              <ParallaxCard key={h} depth={0.15}>
                <div className="rounded-2xl border border-white/15 bg-white/5 p-8 hover:border-white/40 transition-colors h-full group">
                  <div className="flex items-center gap-4 mb-5">
                    <span className="text-accent font-mono text-lg font-bold">0{i + 1}</span>
                    <Sparkles size={16} className="text-white/30 group-hover:text-white/70 transition-colors" />
                  </div>
                  <RevealText text={h} as="h3" className="font-display text-2xl font-bold" />
                  <p className="mt-3 text-white/70 leading-relaxed text-base">{b}</p>
                </div>
              </ParallaxCard>
            ))}
          </StaggerGrid>
        </DetailSection>

        {/* Benefits Grid with Stagger */}
        <DetailSection eyebrow="Benefits" title="The package, written out.">
          <StaggerGrid className="grid md:grid-cols-2 lg:grid-cols-4 gap-4" stagger={0.08}>
            {benefits.map((b) => (
              <ParallaxCard key={b} depth={0.1}>
                <div className="rounded-xl border border-white/15 bg-white/5 p-5 hover:border-white/30 transition-colors flex items-start gap-3 h-full group">
                  <Check size={18} className="text-accent shrink-0 mt-0.5 group-hover:scale-125 transition-transform" />
                  <span className="text-white/80 text-sm leading-relaxed">{b}</span>
                </div>
              </ParallaxCard>
            ))}
          </StaggerGrid>
        </DetailSection>
      </PageShell>
      <FooterCTA />
    </>
  );
}
