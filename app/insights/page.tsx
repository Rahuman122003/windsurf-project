import { ArrowUpRight } from "lucide-react";
import PageShell, { DetailSection } from "@/components/PageShell";
import FooterCTA from "@/components/FooterCTA";

export const metadata = {
  title: "Insights — Blyn",
  description: "Long-form field notes on craft, applied AI, design systems and the future of brand experience — written by the people doing the work.",
};

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
  return (
    <>
      <PageShell
        eyebrow="Insights"
        title="Field notes from people doing the work."
        lede="No thought-leadership theatre. These are practical, opinionated essays — usually born out of something we got wrong on a real project — published on a roughly monthly cadence."
      >
        <DetailSection eyebrow="Featured">
          <a href="/contact" className="group grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <img
                src={featured.img}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
              />
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-white/50">
                {featured.category} · {featured.readTime}
              </div>
              <h3 className="mt-4 font-display text-3xl md:text-5xl font-extrabold leading-[1.05]">
                {featured.title}
              </h3>
              <p className="mt-6 text-white/70 text-lg leading-relaxed max-w-xl">{featured.excerpt}</p>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">
                Read essay <ArrowUpRight size={16} className="transition-transform group-hover:rotate-45" />
              </span>
            </div>
          </a>
        </DetailSection>

        <DetailSection eyebrow="Library" title="More from the team.">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {articles.map((a) => (
              <a key={a.title} href="/contact" className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <img
                    src={a.img}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.05]"
                  />
                </div>
                <div className="mt-5 text-xs uppercase tracking-[0.25em] text-white/50">
                  {a.cat} · {a.time}
                </div>
                <h4 className="mt-3 font-display text-xl md:text-2xl font-bold leading-snug group-hover:text-white">
                  {a.title}
                </h4>
                <p className="mt-3 text-white/65 leading-relaxed">{a.excerpt}</p>
              </a>
            ))}
          </div>
        </DetailSection>

        <DetailSection eyebrow="Subscribe" title="One essay a month. No newsletters about our newsletter.">
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl">
            <input
              type="email"
              required
              placeholder="you@company.com"
              className="flex-1 bg-transparent border border-white/20 rounded-full px-5 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white transition-colors"
            />
            <button
              type="submit"
              className="rounded-full bg-white text-ink px-6 py-3 font-semibold hover:bg-white/90 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </DetailSection>
      </PageShell>
      <FooterCTA />
    </>
  );
}
