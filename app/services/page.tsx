import PageShell, { DetailSection } from "@/components/PageShell";
import FooterCTA from "@/components/FooterCTA";

export const metadata = {
  title: "Services — Blyn",
  description: "Strategy, brand, product design, engineering and applied AI — woven into a single creative practice. A detailed breakdown of every capability and engagement model.",
};

const capabilities = [
  {
    name: "Brand & Identity",
    description:
      "Strategic positioning, naming, logo systems, motion identity and verbal tone. We build brands that compound — modular kits, governance docs and rollout playbooks teams actually follow.",
    deliverables: ["Positioning & narrative", "Visual identity system", "Motion & sonic guidelines", "Brand guidelines book"],
  },
  {
    name: "Product Design",
    description:
      "End-to-end UX and UI for digital products. Discovery research, information architecture, interaction design, and pixel-perfect Figma libraries that scale across squads.",
    deliverables: ["Generative & evaluative research", "Service blueprints", "Component libraries", "Prototype + usability test reports"],
  },
  {
    name: "Engineering",
    description:
      "Production-grade web, mobile and edge systems. Next.js, React Native, Node, Go and Rust where it matters. Performance budgets, observability and accessibility baked in.",
    deliverables: ["Web & mobile applications", "Headless commerce stacks", "Design-system code repos", "DevOps & observability"],
  },
  {
    name: "Applied AI",
    description:
      "Pragmatic AI that ships. RAG over your own corpus, agentic workflows, evaluation harnesses and the guardrails to put any of it in front of customers.",
    deliverables: ["Prompt & evaluation pipelines", "RAG architectures", "Agent tooling & policies", "Internal copilots"],
  },
  {
    name: "Content & Film",
    description:
      "Story-led content systems for product launches, campaigns and always-on. From scriptwriting and 3D to motion design and editorial — produced in-house, end-to-end.",
    deliverables: ["Campaign hero films", "3D & motion design", "Editorial systems", "Launch toolkits"],
  },
  {
    name: "Growth & Optimisation",
    description:
      "Lifecycle, CRO and analytics done with the same care as the product itself. Hypothesis-led experiments backed by clean instrumentation and honest reporting.",
    deliverables: ["Experiment roadmaps", "Analytics & event design", "Conversion audits", "Lifecycle automation"],
  },
];

const engagements = [
  ["Sprint", "2–4 weeks", "Tightly scoped diagnostics, audits or a single shippable artefact."],
  ["Project", "8–16 weeks", "Defined outcome with a fixed shape — launch, redesign, or platform build."],
  ["Partnership", "12+ months", "An embedded pod that owns roadmap, design system and quarterly outcomes."],
];

export default function ServicesPage() {
  return (
    <>
      <PageShell
        eyebrow="What We Do"
        title="One studio. Six disciplines. Zero handoffs."
        lede="We don't pass briefs between silos. Strategists, designers, engineers and AI practitioners sit in the same room, on the same problem, every day. Here's the detailed breakdown of every capability we offer and how we package them."
      >
        <DetailSection eyebrow="Capabilities" title="Every craft we practice — explained in detail.">
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
            {capabilities.map((c, i) => (
              <div key={c.name} className="border-t border-white/15 pt-8">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-white/40 font-display text-xl">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display text-3xl md:text-4xl font-bold">{c.name}</h3>
                </div>
                <p className="text-white/70 text-lg leading-relaxed max-w-xl">{c.description}</p>
                <ul className="mt-6 space-y-2">
                  {c.deliverables.map((d) => (
                    <li key={d} className="text-white/60 text-sm flex items-center gap-3">
                      <span className="h-px w-6 bg-white/30" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </DetailSection>

        <DetailSection eyebrow="Engagement models" title="Three ways to work with us.">
          <div className="grid md:grid-cols-3 gap-6">
            {engagements.map(([name, length, desc]) => (
              <div key={name} className="rounded-2xl border border-white/15 p-8 hover:border-white/40 transition-colors">
                <div className="text-xs uppercase tracking-[0.25em] text-white/50">{length}</div>
                <h3 className="mt-2 font-display text-3xl font-bold">{name}</h3>
                <p className="mt-4 text-white/70 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </DetailSection>

        <DetailSection eyebrow="Process" title="Discovery → build → compound.">
          <ol className="space-y-10 max-w-3xl">
            {[
              ["Discovery", "We start every engagement with a paid two-week immersion. You walk away with a written hypothesis whether or not you keep working with us."],
              ["Concept", "Two or three sharply opposed directions, defended in a single room. We pick one, kill the others, and document why."],
              ["Build", "Weekly shippable artefacts in shared Figma, Linear and GitHub. No mystery, no surprise reveals."],
              ["Launch", "We don't just hand off — we sit beside the launch and the first 30 days of telemetry."],
              ["Compound", "Quarterly experiments, design-system stewardship, and a roadmap that keeps paying back the initial investment."],
            ].map(([step, body], i) => (
              <li key={step} className="flex gap-6">
                <div className="font-display text-4xl md:text-5xl text-white/30 w-16 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h4 className="font-display text-2xl font-bold">{step}</h4>
                  <p className="mt-2 text-white/70 text-lg leading-relaxed">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </DetailSection>
      </PageShell>
      <FooterCTA />
    </>
  );
}
