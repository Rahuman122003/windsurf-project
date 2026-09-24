"use client";
import PageShell, { DetailSection } from "@/components/PageShell";
import FooterCTA from "@/components/FooterCTA";
import RevealText from "@/components/RevealText";
import Parallax, { ParallaxCard } from "@/components/Parallax";
import StatsCounter from "@/components/StatsCounter";
import SlideReveal from "@/components/SlideReveal";
import StaggerGrid from "@/components/StaggerGrid";
import MagneticElement from "@/components/MagneticElement";
import { Quote, MessageSquareQuote, ArrowUpRight } from "lucide-react";

const stories = [
  {
    id: 1,
    quote:
      "Blyn's team showed up like founders. They re-architected our onboarding in eight weeks and trial-to-paid jumped 89% before the quarter was over. They cared more about our retention curves than some of our own employees did.",
    author: "Priya Menon",
    role: "VP Product, Lattice SaaS",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    impact: "+89% Activation",
  },
  {
    id: 2,
    quote:
      "We went from a fragmented 14-market storefront to a single edge-rendered platform with sub-200ms TTFB worldwide. The thing I value most is that they wrote the docs nobody asked for — six months later it's how every team onboards.",
    author: "Daniel Okafor",
    role: "Director of Digital, House of Form",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    impact: "Sub-200ms TTFB",
  },
  {
    id: 3,
    quote:
      "An AI feature that didn't feel gimmicky. They built the eval pipeline first, the prompts second, and the UI third — exactly the inversion we needed. Customer-facing accuracy is now something we can actually report on a board slide.",
    author: "Maya Reinhart",
    role: "Head of AI, Voyager Travel",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    impact: "Verified AI Evals",
  },
];

const stats = [
  ["120+", "products shipped"],
  ["38", "operators on team"],
  ["94%", "retention after year 1"],
  ["12", "industries served"],
];

const principles = [
  ["Senior team, no juniors learning on you", "Every project is staffed end-to-end with operators who have shipped before. You never pay to train someone on your account."],
  ["Written, not whispered", "Every recommendation, hypothesis and trade-off is in writing. You should be able to disagree with us in markdown, not in a meeting."],
  ["We stay for the boring parts", "Launch is the start. We're there for the 30-day review, the quarterly experiment plan, and the design-system tax nobody likes paying."],
];

export default function StoriesPage() {
  return (
    <>
      <PageShell
        eyebrow="Client Stories"
        title="The operators behind the work."
        lede="Numbers tell part of the story. The rest is in the relationships — long, candid, and built on the assumption that we will still be working together two years from now."
      >
        {/* Animated Numeric Rollup Stats with Stagger */}
        <DetailSection eyebrow="By the numbers">
          <StaggerGrid className="grid grid-cols-2 md:grid-cols-4 gap-8" stagger={0.12}>
            {stats.map(([v, l]) => (
              <StatsCounter key={l} value={v} label={l} />
            ))}
          </StaggerGrid>
        </DetailSection>

        {/* Magazine Editorial Stories with Alternating Left / Right Slide */}
        <DetailSection eyebrow="Voices" title="In their own words.">
          <div className="space-y-16 lg:space-y-24">
            {stories.map((s, idx) => {
              const slideDir = idx % 2 === 0 ? "left" : "right";
              return (
                <SlideReveal key={s.author} direction={slideDir} distance={120}>
                  <ParallaxCard depth={0.1}>
                    <figure
                      className="group relative rounded-3xl border border-white/15 bg-gradient-to-b from-white/10 to-white/5 p-8 lg:p-12 hover:border-white/40 transition-colors duration-500 overflow-hidden shadow-2xl"
                      data-cursor="STORY"
                    >
                      <Quote size={90} className="absolute -top-4 -right-4 text-white/5 pointer-events-none" />

                      <div className={`grid md:grid-cols-[140px_1fr] gap-8 lg:gap-12 items-center ${idx % 2 === 1 ? "md:grid-cols-[1fr_140px]" : ""}`}>
                        {/* Portrait Image (Swaps side on alternate) */}
                        <div className={`relative aspect-square w-28 md:w-36 rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl shrink-0 ${idx % 2 === 1 ? "md:order-2" : ""}`}>
                          <Parallax speed={0.15} scale>
                            <img src={s.img} alt={s.author} className="h-full w-full object-cover" />
                          </Parallax>
                        </div>

                        {/* Quote Content */}
                        <div className={`${idx % 2 === 1 ? "md:order-1" : ""}`}>
                          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-accent mb-4 border border-white/10">
                            {s.impact}
                          </span>
                          <blockquote className="font-display text-xl md:text-3xl font-semibold leading-relaxed text-white">
                            &ldquo;{s.quote}&rdquo;
                          </blockquote>
                          <figcaption className="mt-6 flex items-center gap-3 text-white/60">
                            <span className="font-semibold text-white text-lg">{s.author}</span>
                            <span>—</span>
                            <span className="text-white/70 text-sm md:text-base">{s.role}</span>
                          </figcaption>
                        </div>
                      </div>
                    </figure>
                  </ParallaxCard>
                </SlideReveal>
              );
            })}
          </div>
        </DetailSection>

        {/* Principles / Pattern Grid with Stagger */}
        <DetailSection eyebrow="What people say" title="The pattern in the feedback.">
          <StaggerGrid className="grid md:grid-cols-3 gap-6" stagger={0.12}>
            {principles.map(([h, b], i) => (
              <ParallaxCard key={h} depth={0.1}>
                <div className="rounded-2xl border border-white/15 bg-white/5 p-8 hover:border-white/40 transition-colors h-full flex flex-col justify-between group">
                  <div>
                    <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center text-accent mb-6 border border-white/10 group-hover:bg-white/20 transition-colors">
                      <MessageSquareQuote size={20} />
                    </div>
                    <RevealText text={h} as="h4" className="font-display text-xl font-bold" />
                    <p className="mt-3 text-white/70 leading-relaxed text-sm">{b}</p>
                  </div>
                  <div className="mt-6 h-1 w-10 bg-white/15 rounded-full group-hover:w-full transition-all duration-700" />
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
