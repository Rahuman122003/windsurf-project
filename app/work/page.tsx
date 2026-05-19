import { ArrowUpRight } from "lucide-react";
import PageShell, { DetailSection } from "@/components/PageShell";
import FooterCTA from "@/components/FooterCTA";

export const metadata = {
  title: "Work — Blyn",
  description: "A detailed look at the cinematic, conversion-focused projects we've shipped for ambitious brands across fintech, retail, healthtech, travel, energy and SaaS.",
};

const projects = [
  {
    tag: "Fintech",
    title: "Reimagining digital banking for a Gen-Z audience",
    summary:
      "A full rebrand and product redesign for a challenger bank. New visual system, motion language, onboarding flow and 14-app component library shipped in 9 months.",
    metrics: [
      ["+62%", "activation rate"],
      ["1.4M", "MAU within year one"],
      ["−38%", "support tickets"],
    ],
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80",
  },
  {
    tag: "Retail",
    title: "A commerce platform built for global scale",
    summary:
      "Headless commerce architecture across 14 markets with a unified storefront experience. Edge-rendered, sub-200ms TTFB worldwide, fully content-managed by merchandising teams.",
    metrics: [
      ["+41%", "conversion"],
      ["−71%", "time-to-publish"],
      ["A+", "core web vitals"],
    ],
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80",
  },
  {
    tag: "Healthtech",
    title: "Patient-first experiences powered by data",
    summary:
      "An end-to-end patient portal that consolidates appointments, records and AI-assisted triage. HIPAA-compliant design system with WCAG AA accessibility from day one.",
    metrics: [
      ["+3.2x", "appointment self-service"],
      ["98%", "task success rate"],
      ["AA", "WCAG conformance"],
    ],
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80",
  },
  {
    tag: "Travel",
    title: "An AI concierge for the modern explorer",
    summary:
      "A conversational planning surface that turns vague travel intent into bookable itineraries. Custom RAG pipeline over partner inventory with branded voice and tone.",
    metrics: [
      ["−54%", "planning time"],
      ["+27%", "AOV"],
      ["4.8★", "user rating"],
    ],
    img: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80",
  },
  {
    tag: "Energy",
    title: "Sustainable operations through smart dashboards",
    summary:
      "A real-time operations cockpit visualising 12,000+ telemetry signals. Bespoke charting library, anomaly highlighting and an alerting system trusted by control-room operators.",
    metrics: [
      ["−18%", "energy waste"],
      ["3s", "incident time-to-detect"],
      ["24/7", "uptime"],
    ],
    img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1600&q=80",
  },
  {
    tag: "SaaS",
    title: "Onboarding that converts at every step",
    summary:
      "Replatformed sign-up, activation and billing for a horizontal SaaS. New empty-state strategy, contextual coachmarks and a guided product tour engine.",
    metrics: [
      ["+89%", "trial→paid"],
      ["−2.1d", "time-to-value"],
      ["+34%", "NPS"],
    ],
    img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&q=80",
  },
];

export default function WorkPage() {
  return (
    <>
      <PageShell
        eyebrow="Selected Work"
        title="Cinematic products, measured by outcomes."
        lede="Every engagement we take on is a partnership — long, deliberate, and obsessed with shipping. Below is a curated set of the things we've made and the numbers they moved."
      >
        <DetailSection eyebrow="Case Studies">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            {projects.map((p) => (
              <article key={p.title} className="group">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white/5">
                  <img
                    src={p.img}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
                  />
                  <span className="absolute top-5 left-5 inline-flex rounded-full bg-white text-ink px-3 py-1 text-xs font-semibold">
                    {p.tag}
                  </span>
                </div>
                <h3 className="mt-7 font-display text-2xl md:text-3xl font-bold leading-snug">
                  {p.title}
                </h3>
                <p className="mt-4 text-white/65 text-lg leading-relaxed max-w-2xl">{p.summary}</p>
                <dl className="mt-6 grid grid-cols-3 gap-6 max-w-lg">
                  {p.metrics.map(([v, l]) => (
                    <div key={l}>
                      <dt className="font-display text-2xl md:text-3xl font-extrabold">{v}</dt>
                      <dd className="text-xs uppercase tracking-wider text-white/50 mt-1">{l}</dd>
                    </div>
                  ))}
                </dl>
                <a
                  href="/contact"
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white transition-colors"
                >
                  Read the case study <ArrowUpRight size={16} />
                </a>
              </article>
            ))}
          </div>
        </DetailSection>

        <DetailSection eyebrow="How we work" title="A small senior team, embedded.">
          <div className="grid md:grid-cols-3 gap-10">
            {[
              ["01 — Discovery", "Two weeks of immersion: stakeholder interviews, analytics audits, competitive teardown, and a written hypothesis we will defend or kill."],
              ["02 — Build", "Cross-functional pods — strategy, design, engineering — shipping working software every Friday in a shared Linear and a shared Figma."],
              ["03 — Compound", "We stay past launch. Quarterly experiments, a living design system, and roadmaps that keep paying back the original investment."],
            ].map(([h, b]) => (
              <div key={h} className="border-t border-white/15 pt-6">
                <div className="text-sm uppercase tracking-[0.25em] text-white/60">{h}</div>
                <p className="mt-4 text-white/75 text-lg leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </DetailSection>
      </PageShell>
      <FooterCTA />
    </>
  );
}
