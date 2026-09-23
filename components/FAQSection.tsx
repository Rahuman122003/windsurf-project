"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "How does Blyn differ from a traditional agency or consultancy?",
    a: "Traditional agencies hand off work between siloed strategy, creative, and engineering departments. Blyn operates as an integrated pod where design, engineering, motion, and AI engineering collaborate in the same codebase and Figma from Day 1. There are no game-of-telephone handoffs, and senior leads execute the work.",
  },
  {
    q: "Who owns the intellectual property and code repositories?",
    a: "You own 100% of the IP, code repositories, Figma files, design tokens, trained AI prompts, and infrastructure setups upon project completion. We transfer all GitHub repos, cloud accounts, and Figma administrative access directly to your organization.",
  },
  {
    q: "What is your typical engagement timeline?",
    a: "Engagements range from 2-4 week diagnostic Sprints, to 8-16 week product and brand launch Projects, to 12+ month embedded Pod Partnerships. Every project begins with a 2-week alignment immersion to establish clear KPIs and deliverables.",
  },
  {
    q: "How do you handle post-launch support and telemetry?",
    a: "Every engagement includes 30 days of post-launch telemetry monitoring, performance optimization, and bug warranty. After 30 days, clients can transition to an ongoing advisory retainer or quarterly enhancement pod.",
  },
  {
    q: "Can Blyn work with our existing in-house design or engineering team?",
    a: "Yes. We frequently embed alongside internal leadership, providing specialized capability spikes (e.g., 3D WebGL, GenAI architecture, micro-interaction design systems) while pairing with your engineers to ensure seamless knowledge transfer.",
  },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-24 px-6 md:px-12 bg-black text-white border-t border-white/10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-white/50 font-semibold block mb-3">
            Clear Answers
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-white/60 text-lg">
            Everything you need to know about partnering with Blyn.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.q}
                className="border border-white/10 rounded-2xl overflow-hidden transition-colors hover:border-white/25 bg-neutral-950/60"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left p-6 md:p-8 flex justify-between items-center gap-6"
                >
                  <span className="font-display text-xl md:text-2xl font-semibold leading-snug">
                    {faq.q}
                  </span>
                  <span
                    className={`shrink-0 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-transform duration-300 ${
                      isOpen ? "rotate-45 bg-white text-black" : "text-white"
                    }`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-8 md:px-8 text-white/70 leading-relaxed text-base border-t border-white/10 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
