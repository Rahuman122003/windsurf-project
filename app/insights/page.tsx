"use client";
import { useState } from "react";
import { ArrowUpRight, BookOpen, Filter, Mail } from "lucide-react";
import PageShell, { DetailSection } from "@/components/PageShell";
import FooterCTA from "@/components/FooterCTA";
import RevealText from "@/components/RevealText";
import Parallax, { ParallaxCard } from "@/components/Parallax";
import SlideReveal from "@/components/SlideReveal";
import StaggerGrid from "@/components/StaggerGrid";
import MagneticElement from "@/components/MagneticElement";

const categories = ["All", "Applied AI", "Design Systems", "Brand", "Engineering", "Research", "Strategy", "Culture"];

const featured = {
  category: "Applied AI",
  readTime: "12 min read",
  title: "Evals first: why we build the test harness before the prompt",
  excerpt:
    "Most AI features fail not because the model is wrong, but because nobody can tell when it is. We argue for inverting the typical build order: ship the evaluation pipeline, then the prompt, then the UI. A practical guide with real numbers from three production launches.",
  img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&q=80",
};

const articles = [
  {
    cat: "Design Systems",
    time: "9 min",
    title: "The honest cost of a design system",
    excerpt:
      "What it really costs to maintain a design system at 30, 100 and 500 component scale — and the org structures that survive it.",
    img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=80",
  },
  {
    cat: "Brand",
    time: "7 min",
    title: "Motion as a brand asset, not a layer of polish",
    excerpt:
      "How to design a motion identity that survives translation across product, ads, OOH and 3-second social cutdowns.",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b8?w=1200&q=80",
  },
  {
    cat: "Engineering",
    time: "11 min",
    title: "Edge rendering, in plain English",
    excerpt:
      "A walkthrough of where the request actually goes, why TTFB matters more than your bundle, and what we measure on every project.",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
  },
  {
    cat: "Research",
    time: "8 min",
    title: "Five usability tests we run on every launch",
    excerpt:
      "A field-tested cadence: which tests, when, with how many participants, and how to actually act on the findings.",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&q=80",
  },
  {
    cat: "Strategy",
    time: "6 min",
    title: "The brief is the project",
    excerpt:
      "A defensible brief is the single highest-leverage artefact in a project. Here is the one-page template we refuse to start work without.",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
  },
  {
    cat: "Culture",
    time: "5 min",
    title: "Writing as a design tool",
    excerpt:
      "Why every senior on our team writes — and how the act of writing produces sharper UI than starting in Figma.",
    img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80",
  },
];

export default function InsightsPage() {
  const [activeCat, setActiveCat] = useState("All");

  const filteredArticles =
    activeCat === "All"
      ? articles
      : articles.filter((a) => a.cat.toLowerCase() === activeCat.toLowerCase());

  return (
    <>
      <PageShell
        eyebrow="Insights"
        title="Field notes from people doing the work."
        lede="No thought-leadership theatre. These are practical, opinionated essays — usually born out of something we got wrong on a real project — published on a roughly monthly cadence."
      >
        {/* Featured Article with Hero Parallax + Slide Reveal */}
        <DetailSection eyebrow="Featured Essay">
          <SlideReveal direction="left" distance={100}>
            <ParallaxCard depth={0.2}>
              <a
                href="/contact"
                className="group grid lg:grid-cols-2 gap-10 lg:gap-16 items-center rounded-3xl border border-white/15 bg-white/5 p-8 lg:p-10 hover:border-white/40 transition-all duration-500 shadow-2xl"
                data-cursor="ESSAY"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink">
                  <Parallax speed={0.2} scale>
                    <img
                      src={featured.img}
                      alt={featured.title}
                      className="h-full w-full object-cover transition-transform duration-[1000ms] group-hover:scale-110"
                    />
                  </Parallax>
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.25em] text-accent font-mono mb-3">
                    {featured.category} · {featured.readTime}
                  </div>
                  <RevealText text={featured.title} as="h3" className="font-display text-3xl md:text-5xl font-extrabold leading-[1.05]" />
                  <p className="mt-6 text-white/70 text-base md:text-lg leading-relaxed">{featured.excerpt}</p>
                  <MagneticElement className="inline-block mt-8" strength={0.3} radius={80}>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:text-accent transition-colors">
                      Read essay <ArrowUpRight size={16} className="transition-transform group-hover:rotate-45" />
                    </span>
                  </MagneticElement>
                </div>
              </a>
            </ParallaxCard>
          </SlideReveal>
        </DetailSection>

        {/* Filterable Articles Grid with Stagger */}
        <DetailSection eyebrow="Library" title="More from the team.">
          <SlideReveal direction="right" distance={60}>
            <div className="flex flex-wrap gap-3 items-center mb-12">
              <span className="text-white/40 text-xs uppercase tracking-widest flex items-center gap-2 mr-2">
                <Filter size={14} /> Topic:
              </span>
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCat(c)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                    activeCat === c
                      ? "bg-white text-ink shadow-lg scale-105"
                      : "bg-white/5 text-white/70 hover:bg-white/15 hover:text-white border border-white/10"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </SlideReveal>

          <StaggerGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.12}>
            {filteredArticles.map((a, idx) => (
              <ParallaxCard key={a.title} depth={0.15 + (idx % 3) * 0.05}>
                <a
                  href="/contact"
                  className="group block rounded-2xl border border-white/15 bg-white/5 p-6 hover:border-white/40 transition-all duration-500 h-full flex flex-col justify-between"
                  data-cursor="READ"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-ink mb-6">
                      <Parallax speed={0.2} scale>
                        <img
                          src={a.img}
                          alt={a.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-[800ms] group-hover:scale-110"
                        />
                      </Parallax>
                      {/* Category badge */}
                      <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-ink/80 backdrop-blur-md text-white border border-white/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider">
                        <BookOpen size={10} className="text-accent" /> {a.cat}
                      </span>
                    </div>
                    <div className="text-xs uppercase tracking-[0.25em] text-accent font-mono">
                      {a.cat} · {a.time}
                    </div>
                    <h4 className="mt-3 font-display text-xl md:text-2xl font-bold leading-snug group-hover:text-white transition-colors">
                      {a.title}
                    </h4>
                    <p className="mt-3 text-white/65 text-sm leading-relaxed">{a.excerpt}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
                    <span>Read Article</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </a>
              </ParallaxCard>
            ))}
          </StaggerGrid>
        </DetailSection>

        {/* Newsletter Reveal Section */}
        <DetailSection eyebrow="Subscribe" title="One essay a month. No spam.">
          <SlideReveal direction="up" distance={80}>
            <div className="rounded-3xl border border-white/20 bg-gradient-to-r from-white/10 via-white/5 to-white/10 p-8 lg:p-12 relative overflow-hidden">
              {/* Floating decorative orbs */}
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/5 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

              <div className="max-w-xl relative z-10">
                <p className="text-white/80 text-base leading-relaxed mb-8">
                  Join 14,000+ founders, designers and engineers receiving our field notes on craft and AI.
                </p>
                <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="flex-1 bg-ink/80 border border-white/25 rounded-full px-6 py-3.5 text-white placeholder-white/40 focus:outline-none focus:border-white transition-colors text-sm"
                  />
                  <MagneticElement strength={0.25} radius={60}>
                    <button
                      type="submit"
                      className="rounded-full bg-white text-ink px-8 py-3.5 font-semibold hover:bg-white/90 transition-colors text-sm shrink-0 flex items-center justify-center gap-2"
                    >
                      <Mail size={16} /> Subscribe
                    </button>
                  </MagneticElement>
                </form>
              </div>
            </div>
          </SlideReveal>
        </DetailSection>
      </PageShell>
      <FooterCTA />
    </>
  );
}
