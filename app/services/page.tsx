"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageShell, { DetailSection } from "@/components/PageShell";
import FooterCTA from "@/components/FooterCTA";
import RevealText from "@/components/RevealText";
import Parallax, { ParallaxCard } from "@/components/Parallax";
import SlideReveal from "@/components/SlideReveal";
import { CheckCircle2, Zap, Sparkles, Compass } from "lucide-react";

const capabilities = [
  {
    id: "brand",
    name: "Brand & Identity",
    description:
      "Strategic positioning, naming, logo systems, motion identity and verbal tone. We build brands that compound — modular kits, governance docs and rollout playbooks teams actually follow.",
    deliverables: ["Positioning & narrative", "Visual identity system", "Motion & sonic guidelines", "Brand guidelines book"],
  },
  {
    id: "product",
    name: "Product Design",
    description:
      "End-to-end UX and UI for digital products. Discovery research, information architecture, interaction design, and pixel-perfect Figma libraries that scale across squads.",
    deliverables: ["Generative & evaluative research", "Service blueprints", "Component libraries", "Prototype + usability test reports"],
  },
  {
    id: "engineering",
    name: "Engineering",
    description:
      "Production-grade web, mobile and edge systems. Next.js, React Native, Node, Go and Rust where it matters. Performance budgets, observability and accessibility baked in.",
    deliverables: ["Web & mobile applications", "Headless commerce stacks", "Design-system code repos", "DevOps & observability"],
  },
  {
    id: "ai",
    name: "Applied AI",
    description:
      "Pragmatic AI that ships. RAG over your own corpus, agentic workflows, evaluation harnesses and the guardrails to put any of it in front of customers.",
    deliverables: ["Prompt & evaluation pipelines", "RAG architectures", "Agent tooling & policies", "Internal copilots"],
  },
  {
    id: "content",
    name: "Content & Film",
    description:
      "Story-led content systems for product launches, campaigns and always-on. From scriptwriting and 3D to motion design and editorial — produced in-house, end-to-end.",
    deliverables: ["Campaign hero films", "3D & motion design", "Editorial systems", "Launch toolkits"],
  },
  {
    id: "growth",
    name: "Growth & Optimisation",
    description:
      "Lifecycle, CRO and analytics done with the same care as the product itself. Hypothesis-led experiments backed by clean instrumentation and honest reporting.",
    deliverables: ["Experiment roadmaps", "Analytics & event design", "Conversion audits", "Lifecycle automation"],
  },
];

const engagements = [
  ["Sprint", "2–4 weeks", "Tightly scoped diagnostics, audits or a single shippable artefact.", "Sprint Mode"],
  ["Project", "8–16 weeks", "Defined outcome with a fixed shape — launch, redesign, or platform build.", "Targeted Launch"],
  ["Partnership", "12+ months", "An embedded pod that owns roadmap, design system and quarterly outcomes.", "Embedded Team"],
];

const processSteps = [
  ["Discovery", "We start every engagement with a paid two-week immersion. You walk away with a written hypothesis whether or not you keep working with us."],
  ["Concept", "Two or three sharply opposed directions, defended in a single room. We pick one, kill the others, and document why."],
  ["Build", "Weekly shippable artefacts in shared Figma, Linear and GitHub. No mystery, no surprise reveals."],
  ["Launch", "We don't just hand off — we sit beside the launch and the first 30 days of telemetry."],
  ["Compound", "Quarterly experiments, design-system stewardship, and a roadmap that keeps paying back the initial investment."],
];

export default function ServicesPage() {
  const lineRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const [activeCap, setActiveCap] = useState("brand");

  useEffect(() => {
    const line = lineRef.current;
    const processEl = processRef.current;
    if (!line || !processEl) return;
    gsap.registerPlugin(ScrollTrigger);

    const tween = gsap.fromTo(
      line,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: processEl,
          start: "top 70%",
          end: "bottom 80%",
          scrub: 0.5,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <>
      <PageShell
        eyebrow="What We Do"
        title="One studio. Six disciplines. Zero handoffs."
        lede="We don't pass briefs between silos. Strategists, designers, engineers and AI practitioners sit in the same room, on the same problem, every day. Here's the detailed breakdown of every capability we offer and how we package them."
      >
        {/* Capability Deck Layout */}
        <DetailSection eyebrow="Capabilities" title="Every craft we practice — explained in detail.">
          <div className="grid lg:grid-cols-[280px_1fr] gap-12 items-start">
            {/* Sticky Navigation Index Column */}
            <div className="hidden lg:block sticky top-28 space-y-3 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <div className="text-xs uppercase tracking-widest text-accent font-mono mb-4 flex items-center gap-2">
                <Compass size={14} /> Index
              </div>
              {capabilities.map((c, i) => (
                <a
                  key={c.id}
                  href={`#${c.id}`}
                  onClick={() => setActiveCap(c.id)}
                  className={`block text-sm font-semibold transition-all py-2 px-3 rounded-lg ${
                    activeCap === c.id
                      ? "bg-white text-ink shadow-md"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span className="font-mono text-xs opacity-60 mr-2">0{i + 1}.</span>
                  {c.name}
                </a>
              ))}
            </div>

            {/* Alternating Slide Capabilities List */}
            <div className="space-y-10">
              {capabilities.map((c, i) => {
                const slideDir = i % 2 === 0 ? "left" : "right";
                return (
                  <SlideReveal key={c.id} direction={slideDir} distance={100}>
                    <div id={c.id} className="scroll-mt-28">
                      <ParallaxCard depth={0.1}>
                        <div
                          className="group relative rounded-3xl border border-white/15 bg-gradient-to-b from-white/10 to-white/5 p-8 lg:p-10 hover:border-white/40 transition-colors duration-500 shadow-xl"
                          data-cursor="DISCIPLINE"
                        >
                          <div className="flex items-center justify-between mb-6">
                            <span className="text-accent font-display text-2xl font-bold font-mono">
                              0{i + 1}
                            </span>
                            <Sparkles size={18} className="text-white/40 group-hover:text-white transition-colors" />
                          </div>

                          <RevealText text={c.name} as="h3" className="font-display text-3xl md:text-4xl font-bold" />

                          <p className="mt-4 text-white/70 text-base md:text-lg leading-relaxed">{c.description}</p>

                          <div className="mt-8 pt-6 border-t border-white/10">
                            <div className="text-xs uppercase tracking-widest text-white/40 mb-4">Deliverables</div>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {c.deliverables.map((d) => (
                                <li key={d} className="text-white/80 text-sm flex items-center gap-2.5">
                                  <CheckCircle2 size={15} className="text-accent shrink-0" />
                                  <span>{d}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </ParallaxCard>
                    </div>
                  </SlideReveal>
                );
              })}
            </div>
          </div>
        </DetailSection>

        {/* Engagement Models with Slide Reveals */}
        <DetailSection eyebrow="Engagement models" title="Three ways to work with us.">
          <div className="grid md:grid-cols-3 gap-6">
            {engagements.map(([name, length, desc, badge], idx) => (
              <SlideReveal key={name} direction={idx % 2 === 0 ? "left" : "right"} distance={80} delay={idx * 0.15}>
                <ParallaxCard depth={0.1}>
                  <div
                    className="relative rounded-2xl border border-white/15 bg-gradient-to-b from-white/10 to-white/5 p-8 hover:border-white/40 transition-colors duration-500 h-full flex flex-col justify-between"
                    data-cursor="ENGAGE"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold">{length}</span>
                        <span className="text-[10px] uppercase font-mono px-2.5 py-1 rounded-full bg-white/10 text-white/80 border border-white/10">
                          {badge}
                        </span>
                      </div>
                      <h3 className="font-display text-3xl font-bold">{name}</h3>
                      <p className="mt-4 text-white/70 leading-relaxed text-sm">{desc}</p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
                      <span>Tailored scope</span>
                      <Zap size={14} className="text-white/60" />
                    </div>
                  </div>
                </ParallaxCard>
              </SlideReveal>
            ))}
          </div>
        </DetailSection>

        {/* Scroll-Driven Process Timeline */}
        <DetailSection eyebrow="Process" title="Discovery → build → compound.">
          <div ref={processRef} className="relative max-w-3xl pl-8 lg:pl-12">
            <div className="absolute left-3 lg:left-4 top-4 bottom-4 w-1 bg-white/10 rounded-full overflow-hidden">
              <div
                ref={lineRef}
                className="w-full h-full bg-gradient-to-b from-white via-accent to-white origin-top scale-y-0"
                style={{ willChange: "transform" }}
              />
            </div>

            <div className="space-y-10">
              {processSteps.map(([step, body], i) => (
                <SlideReveal key={step} direction={i % 2 === 0 ? "left" : "right"} distance={90}>
                  <div className="relative group">
                    <div className="absolute -left-[37px] lg:-left-[45px] top-1.5 h-6 w-6 rounded-full bg-ink border-2 border-white/40 group-hover:border-white group-hover:scale-125 transition-all duration-300 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-white opacity-60 group-hover:opacity-100" />
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8 hover:border-white/30 transition-colors">
                      <div className="flex items-baseline gap-4 mb-2">
                        <span className="font-display text-2xl text-accent font-mono">
                          0{i + 1}
                        </span>
                        <h4 className="font-display text-2xl font-bold">{step}</h4>
                      </div>
                      <p className="text-white/70 text-base lg:text-lg leading-relaxed">{body}</p>
                    </div>
                  </div>
                </SlideReveal>
              ))}
            </div>
          </div>
        </DetailSection>
      </PageShell>
      <FooterCTA />
    </>
  );
}
