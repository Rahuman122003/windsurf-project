import { DetailSection } from "@/components/PageShell";
import ProxHero from "@/components/ProxHero";
import ProxFacets from "@/components/ProxFacets";
import FooterCTA from "@/components/FooterCTA";

export const metadata = {
  title: "PROX — Digital Brand Ambassador",
  description: "Meet PROX — our digital brand ambassador, built by ProBiz Technologies. An always-on presence that represents the studio across product, content and conversation.",
};

const capabilities = [
  ["Always-on presence", "PROX shows up across our site, socials and product surfaces — a single, consistent voice for the studio, 24/7, in any timezone."],
  ["Conversational intake", "Brief us in plain language. PROX asks the follow-ups, shapes the ask, and routes it to the right human on our team within minutes."],
  ["On-brand by design", "A custom-trained voice and visual identity — every reply, every animation, every micro-interaction stays inside the brand system."],
  ["Privacy-first", "No third-party tracking, no data resale. Conversations stay between you and the studio."],
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
        <DetailSection eyebrow="What PROX does" title="More than a chatbot. A teammate.">
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
            {capabilities.map(([h, b], i) => (
              <div key={h} className="border-t border-white/15 pt-6">
                <div className="flex items-baseline gap-4 mb-3">
                  <span className="text-white/40 font-display text-lg">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold">{h}</h3>
                </div>
                <p className="text-white/70 text-lg leading-relaxed max-w-xl">{b}</p>
              </div>
            ))}
          </div>
        </DetailSection>

        <DetailSection eyebrow="Personality" title="Four traits, by design.">
          <div className="grid md:grid-cols-4 gap-6">
            {traits.map(([h, b]) => (
              <div key={h} className="rounded-2xl border border-white/15 p-7 hover:border-white/40 transition-colors">
                <h4 className="font-display text-2xl font-bold">{h}</h4>
                <p className="mt-3 text-white/65 leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </DetailSection>

        <DetailSection eyebrow="Behind the scenes" title="Built by ProBiz Technologies.">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <p className="text-white/75 text-lg leading-relaxed">
              PROX was designed and engineered in partnership with{" "}
              <span className="text-white font-semibold">ProBiz Technologies</span> — the
              applied-AI team responsible for some of the most considered
              conversational systems we have shipped. Together we built a model
              pipeline, a tone-of-voice harness, and an evaluation suite that
              holds PROX accountable to our brand, not to a generic LLM
              persona.
            </p>
            <ul className="space-y-3 text-white/70">
              {[
                "Custom-trained voice & tone",
                "RAG over the studio's knowledge base",
                "Evaluation harness with human review",
                "Privacy-first, GDPR-compliant pipeline",
                "Continuous fine-tuning on real conversations",
              ].map((l) => (
                <li key={l} className="flex items-center gap-3">
                  <span className="h-px w-6 bg-white/40" />
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </DetailSection>

        <DetailSection eyebrow="Try it" title="Have a conversation with PROX.">
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
            PROX lives in the bottom corner of every page. Say hello, ask a
            question, or describe the project on your mind — a real human will
            pick up the thread within the same business day.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white text-ink px-7 py-3 text-base font-semibold hover:bg-white/90 transition-colors"
            >
              Start a conversation
            </a>
            <a
              href="/work"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3 text-base font-semibold hover:border-white transition-colors"
            >
              See our work
            </a>
          </div>
        </DetailSection>
      </div>
      <FooterCTA />
    </>
  );
}
