"use client";
import { DetailSection } from "@/components/PageShell";
import ProxHero from "@/components/ProxHero";
import ProxFacets from "@/components/ProxFacets";
import FooterCTA from "@/components/FooterCTA";
import RevealText from "@/components/RevealText";
import { ParallaxCard } from "@/components/Parallax";
import SlideReveal from "@/components/SlideReveal";
import StaggerGrid from "@/components/StaggerGrid";
import MagneticElement from "@/components/MagneticElement";
import SectionReveal from "@/components/SectionReveal";
import { ArrowUpRight, Shield, Globe2, MessageCircle, Sparkles } from "lucide-react";

const capabilities = [
  { icon: Globe2, title: "Always-on presence", body: "PROX shows up across our site, socials and product surfaces — a single, consistent voice for the studio, 24/7, in any timezone." },
  { icon: MessageCircle, title: "Conversational intake", body: "Brief us in plain language. PROX asks the follow-ups, shapes the ask, and routes it to the right human on our team within minutes." },
  { icon: Sparkles, title: "On-brand by design", body: "A custom-trained voice and visual identity — every reply, every animation, every micro-interaction stays inside the brand system." },
  { icon: Shield, title: "Privacy-first", body: "No third-party tracking, no data resale. Conversations stay between you and the studio." },
];

const traits = [
  ["Curious", "Asks the question behind the question."],
  ["Concise", "Never wastes a sentence."],
  ["Candid", "Tells you when something is a bad idea."],
  ["Crafted", "Treats every message like a design artefact."],
];

export default function ProxPage() {
  return (
    <>
      <ProxHero />
      <ProxFacets />
      <div className="bg-ink text-white">
        <SectionReveal>
          {/* Capabilities with alternating slide + parallax cards */}
          <DetailSection eyebrow="What PROX does" title="More than a chatbot. A teammate.">
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
              {capabilities.map((cap, i) => {
                const Icon = cap.icon;
                const slideDir = i % 2 === 0 ? "left" : "right";
                return (
                  <SlideReveal key={cap.title} direction={slideDir} distance={100} delay={i * 0.1}>
                    <ParallaxCard depth={0.12}>
                      <div className="border border-white/15 rounded-2xl p-8 bg-white/5 hover:border-white/40 transition-all duration-500 h-full group" data-cursor="EXPLORE">
                        <div className="flex items-start gap-5">
                          <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center text-accent shrink-0 border border-white/10 group-hover:bg-white/20 transition-colors">
                            <Icon size={22} />
                          </div>
                          <div>
                            <div className="flex items-baseline gap-4 mb-3">
                              <span className="text-white/30 font-mono text-sm">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <RevealText text={cap.title} as="h3" className="font-display text-2xl md:text-3xl font-bold" />
                            </div>
                            <p className="text-white/70 text-lg leading-relaxed">{cap.body}</p>
                          </div>
                        </div>
                      </div>
                    </ParallaxCard>
                  </SlideReveal>
                );
              })}
            </div>
          </DetailSection>

          {/* Personality Traits with Stagger Grid */}
          <DetailSection eyebrow="Personality" title="Four traits, by design.">
            <StaggerGrid className="grid md:grid-cols-4 gap-6" stagger={0.1}>
              {traits.map(([h, b], i) => (
                <ParallaxCard key={h} depth={0.15}>
                  <div className="rounded-2xl border border-white/15 p-7 hover:border-white/40 transition-all duration-500 h-full group" data-cursor="VIEW">
                    <div className="text-accent font-mono text-sm mb-3 opacity-50">0{i + 1}</div>
                    <RevealText text={h} as="h4" className="font-display text-2xl font-bold" />
                    <p className="mt-3 text-white/65 leading-relaxed">{b}</p>
                    <div className="mt-6 h-1 w-8 bg-white/20 rounded-full group-hover:w-full transition-all duration-700" />
                  </div>
                </ParallaxCard>
              ))}
            </StaggerGrid>
          </DetailSection>

          {/* Behind the Scenes with Slide Reveal */}
          <DetailSection eyebrow="Behind the scenes" title="Built by Probiz Technologies.">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <SlideReveal direction="left" distance={80}>
                <p className="text-white/75 text-lg leading-relaxed">
                  PROX was designed and engineered in partnership with{" "}
                  <span className="text-white font-semibold">Probiz Technologies</span> — the
                  applied-AI team responsible for some of the most considered
                  conversational systems we have shipped. Together we built a model
                  pipeline, a tone-of-voice harness, and an evaluation suite that
                  holds PROX accountable to our brand, not to a generic LLM
                  persona.
                </p>
              </SlideReveal>
              <SlideReveal direction="right" distance={80}>
                <StaggerGrid className="space-y-3" stagger={0.1}>
                  {[
                    "Custom-trained voice & tone",
                    "RAG over the studio's knowledge base",
                    "Evaluation harness with human review",
                    "Privacy-first, GDPR-compliant pipeline",
                    "Continuous fine-tuning on real conversations",
                  ].map((l) => (
                    <div key={l} className="text-white/70 flex items-center gap-3 group">
                      <span className="h-px w-6 bg-white/40 group-hover:w-10 transition-all duration-500" />
                      {l}
                    </div>
                  ))}
                </StaggerGrid>
              </SlideReveal>
            </div>
          </DetailSection>

          {/* CTA Section */}
          <DetailSection eyebrow="Try it" title="Have a conversation with PROX.">
            <SlideReveal direction="up" distance={60}>
              <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
                PROX lives in the bottom corner of every page. Say hello, ask a
                question, or describe the project on your mind — a real human will
                pick up the thread within the same business day.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <MagneticElement strength={0.3} radius={80}>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-white text-ink px-7 py-3 text-base font-semibold hover:bg-white/90 transition-colors"
                  >
                    Start a conversation <ArrowUpRight size={18} />
                  </a>
                </MagneticElement>
                <MagneticElement strength={0.3} radius={80}>
                  <a
                    href="/work"
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3 text-base font-semibold hover:border-white transition-colors"
                  >
                    See our work
                  </a>
                </MagneticElement>
              </div>
            </SlideReveal>
          </DetailSection>
        </SectionReveal>
      </div>
      <FooterCTA />
    </>
  );
}
