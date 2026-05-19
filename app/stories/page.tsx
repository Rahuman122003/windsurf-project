import PageShell, { DetailSection } from "@/components/PageShell";
import FooterCTA from "@/components/FooterCTA";

export const metadata = {
  title: "Stories — Blyn",
  description: "First-person accounts from the operators we partner with — what we shipped together, what broke, and what compounded.",
};

const stories = [
  {
    quote:
      "Blyn's team showed up like founders. They re-architected our onboarding in eight weeks and trial-to-paid jumped 89% before the quarter was over. They cared more about our retention curves than some of our own employees did.",
    author: "Priya Menon",
    role: "VP Product, Lattice SaaS",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  },
  {
    quote:
      "We went from a fragmented 14-market storefront to a single edge-rendered platform with sub-200ms TTFB worldwide. The thing I value most is that they wrote the docs nobody asked for — six months later it's how every team onboards.",
    author: "Daniel Okafor",
    role: "Director of Digital, House of Form",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
  },
  {
    quote:
      "An AI feature that didn't feel gimmicky. They built the eval pipeline first, the prompts second, and the UI third — exactly the inversion we needed. Customer-facing accuracy is now something we can actually report on a board slide.",
    author: "Maya Reinhart",
    role: "Head of AI, Voyager Travel",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
  },
];

const stats = [
  ["120+", "products shipped"],
  ["38", "operators on the team"],
  ["94%", "retention after year one"],
  ["12", "industries served"],
];

export default function StoriesPage() {
  return (
    <>
      <PageShell
        eyebrow="Client Stories"
        title="The operators behind the work."
        lede="Numbers tell part of the story. The rest is in the relationships — long, candid, and built on the assumption that we will still be working together two years from now."
      >
        <DetailSection eyebrow="By the numbers">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {stats.map(([v, l]) => (
              <div key={l} className="border-t border-white/15 pt-6">
                <div className="font-display text-5xl md:text-6xl font-extrabold">{v}</div>
                <div className="mt-3 text-sm uppercase tracking-[0.2em] text-white/50">{l}</div>
              </div>
            ))}
          </div>
        </DetailSection>

        <DetailSection eyebrow="Voices" title="In their own words.">
          <div className="space-y-20">
            {stories.map((s) => (
              <figure key={s.author} className="grid md:grid-cols-[120px_1fr] gap-8 md:gap-12 items-start">
                <img src={s.img} alt="" className="h-[120px] w-[120px] rounded-full object-cover" />
                <div>
                  <blockquote className="font-display text-2xl md:text-3xl leading-snug text-white">
                    “{s.quote}”
                  </blockquote>
                  <figcaption className="mt-6 text-white/60">
                    <span className="font-semibold text-white">{s.author}</span> — {s.role}
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </DetailSection>

        <DetailSection eyebrow="What people say" title="The pattern in the feedback.">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              ["Senior team, no juniors learning on you", "Every project is staffed end-to-end with operators who have shipped before. You never pay to train someone on your account."],
              ["Written, not whispered", "Every recommendation, hypothesis and trade-off is in writing. You should be able to disagree with us in markdown, not in a meeting."],
              ["We stay for the boring parts", "Launch is the start. We're there for the 30-day review, the quarterly experiment plan, and the design-system tax nobody likes paying."],
            ].map(([h, b]) => (
              <div key={h} className="rounded-2xl border border-white/15 p-8">
                <h4 className="font-display text-xl font-bold">{h}</h4>
                <p className="mt-3 text-white/70 leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </DetailSection>
      </PageShell>
      <FooterCTA />
    </>
  );
}
