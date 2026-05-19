"use client";
import PrismButton from "./PrismButton";
import { ArrowUpRight } from "lucide-react";

export default function GenAI() {
  return (
    <section className="relative overflow-hidden bg-[#070b1f] text-white py-28 lg:py-40">
      {/* Animated blobs */}
      <div className="absolute inset-0 -z-0 opacity-70">
        <div className="absolute -top-32 -left-20 h-[520px] w-[520px] rounded-full bg-[#0057ff] blur-[120px] animate-pulse" />
        <div className="absolute top-20 right-0 h-[420px] w-[420px] rounded-full bg-[#7a3aff] blur-[120px] animate-pulse [animation-duration:6s]" />
        <div className="absolute bottom-0 left-1/3 h-[380px] w-[380px] rounded-full bg-[#00c2ff] blur-[120px] animate-pulse [animation-duration:8s]" />
      </div>
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="relative z-10 max-w-container mx-auto px-6 lg:px-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-xs uppercase tracking-[0.25em] mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          Gen AI Studio
        </div>
        <h2
          className="font-display font-extrabold leading-[1.02] max-w-5xl mx-auto"
          style={{ fontSize: "clamp(52px,7.6vw,120px)" }}
        >
          Unlock the power of <span className="bg-gradient-to-r from-[#7ab8ff] via-white to-[#c8a6ff] bg-clip-text text-transparent">Gen AI</span> with <span className="bg-gradient-to-r from-[#c8a6ff] via-white to-[#7ab8ff] bg-clip-text text-transparent">PROX</span>
        </h2>
        <p className="mt-8 max-w-3xl mx-auto text-white/75 text-xl md:text-2xl leading-relaxed">
          From rapid prototyping to production deployment — we help enterprises ship intelligent products with confidence.
        </p>
        <div className="mt-10 max-w-3xl mx-auto text-left grid md:grid-cols-2 gap-6 text-white/80 text-base md:text-lg leading-relaxed">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-white/50 mb-2">What is PROX?</div>
            <p>
              <span className="font-semibold text-white">PROX</span> is our in-house Gen AI platform — a
              <span className="text-white"> Production-Ready Orchestration eXperience</span> that turns raw
              foundation models into reliable, governed enterprise products.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-white/50 mb-2">What it does</div>
            <p>
              PROX unifies retrieval, multi-agent orchestration, evaluation and guardrails behind a single API
              — so teams ship secure copilots, document intelligence and autonomous workflows in weeks, not quarters.
            </p>
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          <PrismButton href="/services" variant="silver">Discover Gen AI</PrismButton>
        </div>
      </div>
    </section>
  );
}
