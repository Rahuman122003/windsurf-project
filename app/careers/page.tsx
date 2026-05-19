import { ArrowUpRight } from "lucide-react";
import PageShell, { DetailSection } from "@/components/PageShell";
import FooterCTA from "@/components/FooterCTA";

export const metadata = {
  title: "Careers — Blyn",
  description: "We are a small studio of senior operators. Open roles, what we hire for, and how the interview process actually works.",
};

const roles = [
  { title: "Senior Product Designer", team: "Design", location: "London / Remote (UK ± 3h)", type: "Full-time" },
  { title: "Staff Frontend Engineer", team: "Engineering", location: "Remote (EMEA)", type: "Full-time" },
  { title: "AI Engineer — Applied", team: "AI", location: "London", type: "Full-time" },
  { title: "Senior Brand Designer", team: "Brand", location: "London / Hybrid", type: "Full-time" },
  { title: "Producer", team: "Operations", location: "Remote (EMEA)", type: "Full-time" },
  { title: "Design Intern (Summer 2026)", team: "Design", location: "London", type: "12 weeks" },
];

const principles = [
  ["Senior or training to be", "We hire people who can lead a project end-to-end. If you're not there yet, we'll tell you, and we'll mean it when we say we'd love to talk again in 18 months."],
  ["Writing is the job", "Sharp design follows sharp writing. Every role here writes — briefs, post-mortems, proposals — and we evaluate it at every step."],
  ["No heroics", "We staff projects so nobody works weekends. If a project starts to need heroics, we have failed at scoping, not at hiring."],
  ["Outcomes over hours", "We track what shipped and what moved. We don't track when you logged on."],
];

const benefits = [
  "Open salary bands, reviewed every six months",
  "32 days PTO + UK bank holidays + your birthday",
  "Equity in every full-time role",
  "£2,000 annual learning budget",
  "Top-tier hardware on day one",
  "Four-day weeks in August",
  "Private health + mental-health cover",
  "Quarterly off-sites, paid travel",
];

export default function CareersPage() {
  return (
    <>
      <PageShell
        eyebrow="Careers"
        title="Build a career, not a portfolio."
        lede="We are a small studio of operators — designers, engineers, strategists and AI practitioners — who care about craft, kindness and the boring parts of shipping. Here's how we hire, what we offer, and what it's like to actually work here."
      >
        <DetailSection eyebrow="Open Roles">
          <ul className="divide-y divide-white/15 border-y border-white/15">
            {roles.map((r) => (
              <li key={r.title}>
                <a
                  href="/contact"
                  className="group grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] gap-3 md:gap-10 items-baseline py-7"
                >
                  <span className="font-display text-2xl md:text-3xl font-bold group-hover:text-white">
                    {r.title}
                  </span>
                  <span className="text-white/55 text-sm md:text-base">{r.team}</span>
                  <span className="text-white/55 text-sm md:text-base">{r.location}</span>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold">
                    {r.type}
                    <ArrowUpRight
                      size={18}
                      className="transition-transform group-hover:rotate-45 group-hover:translate-x-0.5"
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-white/60">
            Don't see your role?{" "}
            <a href="/contact" className="text-white underline underline-offset-4 hover:no-underline">
              Send us a line anyway
            </a>
            .
          </p>
        </DetailSection>

        <DetailSection eyebrow="How we work" title="Four principles, in plain language.">
          <div className="grid md:grid-cols-2 gap-8">
            {principles.map(([h, b]) => (
              <div key={h} className="border-t border-white/15 pt-6">
                <h3 className="font-display text-2xl font-bold">{h}</h3>
                <p className="mt-3 text-white/70 leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </DetailSection>

        <DetailSection eyebrow="The interview" title="Three steps. No surprises.">
          <ol className="space-y-8 max-w-3xl">
            {[
              ["Intro call (45 min)", "A conversation, not a screen. We talk about what you're optimising for and whether the role can deliver it."],
              ["Craft conversation (90 min)", "We look at real work — yours and ours. No take-home tests. No timed exercises. We pay for any prep we ask of you."],
              ["Team day (paid)", "A day with the people you'd actually work with, on a real (anonymised) problem. Paid at your day-rate."],
            ].map(([h, b], i) => (
              <li key={h} className="flex gap-6">
                <div className="font-display text-3xl text-white/30 w-12 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h4 className="font-display text-xl font-bold">{h}</h4>
                  <p className="mt-2 text-white/70 leading-relaxed">{b}</p>
                </div>
              </li>
            ))}
          </ol>
        </DetailSection>

        <DetailSection eyebrow="Benefits" title="The package, written out.">
          <ul className="grid md:grid-cols-2 gap-x-10 gap-y-4 max-w-3xl">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-3 text-white/80">
                <span className="h-px w-6 bg-white/40" />
                {b}
              </li>
            ))}
          </ul>
        </DetailSection>
      </PageShell>
      <FooterCTA />
    </>
  );
}
