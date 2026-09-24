"use client";

import { useState } from "react";

const SCOPES = [
  { id: "brand", label: "Brand & Motion", baseWeeks: 4 },
  { id: "product", label: "Product UX/UI", baseWeeks: 6 },
  { id: "engineering", label: "Fullstack Web/App", baseWeeks: 8 },
  { id: "ai", label: "Applied AI & RAG", baseWeeks: 6 },
  { id: "3d", label: "3D & Interactive WebGL", baseWeeks: 5 },
];

const SPEED = [
  { id: "standard", label: "Standard Pace" },
  { id: "accelerated", label: "Accelerated Sprint (1.5x Speed)" },
  { id: "hyper", label: "Dedicated Pod Immersion" },
];

export default function ProjectEstimator() {
  const [selectedScopes, setSelectedScopes] = useState<string[]>(["product", "engineering"]);
  const [selectedSpeed, setSelectedSpeed] = useState<string>("standard");
  const [teamTier, setTeamTier] = useState<"senior" | "principal">("principal");

  const toggleScope = (id: string) => {
    setSelectedScopes((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((s) => s !== id) : prev) : [...prev, id]
    );
  };

  const totalWeeks = Math.round(
    selectedScopes.reduce((acc, id) => {
      const scope = SCOPES.find((s) => s.id === id);
      return acc + (scope ? scope.baseWeeks : 0);
    }, 0) * (selectedSpeed === "accelerated" ? 0.75 : selectedSpeed === "hyper" ? 0.6 : 1)
  );

  return (
    <section className="py-24 px-6 md:px-12 bg-neutral-900 border-t border-b border-white/10 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-6 space-y-8">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-white/50 block mb-3">
              Interactive Estimator
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
              Estimate your project timeline & team pod.
            </h2>
            <p className="mt-4 text-white/60 text-lg leading-relaxed">
              Select the capabilities, delivery speed, and pod seniority required for your project to calculate estimated timeline and effort.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">
              1. Required Capabilities (Select multiple)
            </h3>
            <div className="flex flex-wrap gap-3">
              {SCOPES.map((scope) => {
                const active = selectedScopes.includes(scope.id);
                return (
                  <button
                    key={scope.id}
                    onClick={() => toggleScope(scope.id)}
                    className={`px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 border ${
                      active
                        ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                        : "bg-white/5 text-white/70 border-white/15 hover:border-white/40"
                    }`}
                  >
                    {scope.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">
              2. Delivery Pace
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SPEED.map((speed) => {
                const active = selectedSpeed === speed.id;
                return (
                  <button
                    key={speed.id}
                    onClick={() => setSelectedSpeed(speed.id)}
                    className={`p-4 rounded-xl text-left text-xs md:text-sm font-medium transition-all border ${
                      active
                        ? "bg-white/10 border-white text-white"
                        : "bg-white/5 border-white/10 text-white/50 hover:border-white/20"
                    }`}
                  >
                    {speed.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">
              3. Team Composition
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => setTeamTier("senior")}
                className={`flex-1 p-4 rounded-xl border text-sm font-medium transition-all ${
                  teamTier === "senior"
                    ? "bg-white/10 border-white text-white"
                    : "bg-white/5 border-white/10 text-white/50 hover:border-white/20"
                }`}
              >
                Senior Pod
                <span className="block text-xs text-white/40 mt-1">5+ yrs lead experience</span>
              </button>
              <button
                onClick={() => setTeamTier("principal")}
                className={`flex-1 p-4 rounded-xl border text-sm font-medium transition-all ${
                  teamTier === "principal"
                    ? "bg-white/10 border-white text-white"
                    : "bg-white/5 border-white/10 text-white/50 hover:border-white/20"
                }`}
              >
                Principal & Founding Pod
                <span className="block text-xs text-white/40 mt-1">Direct partner involvement</span>
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 bg-black/60 border border-white/15 rounded-3xl p-6 sm:p-8 md:p-10 backdrop-blur-xl relative flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <span className="text-white/60 text-sm">Estimated Delivery</span>
              <span className="font-display text-2xl font-bold text-white">~{totalWeeks} Weeks</span>
            </div>

            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <span className="text-white/60 text-sm">Selected Capabilities</span>
              <span className="text-white font-medium">{selectedScopes.length} Core Disciplines</span>
            </div>

            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <span className="text-white/60 text-sm">Pod Composition</span>
              <span className="text-white font-medium">3-5 Full-time Specialists</span>
            </div>

            <div className="pt-2 space-y-2">
              <span className="text-xs uppercase tracking-widest text-white/40 block">
                Deliverables Included
              </span>
              <ul className="text-sm text-white/80 space-y-1.5 pt-1">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/60" /> Full Figma Design Systems & Tokens
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/60" /> Production Code & Complete Source IP
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/60" /> Staging & CI/CD Pipeline Setup
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/60" /> 30-Day Telemetry & Launch Support
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <span className="text-xs text-white/50">Ready to discuss exact specs?</span>
            <a
              href="/contact"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-black font-semibold text-center hover:bg-neutral-200 transition-colors"
            >
              Book Scope Review →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
