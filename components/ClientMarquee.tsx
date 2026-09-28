"use client";

import { useMemo } from "react";
import RevealText from "./RevealText";

type ClientBrand = {
  name: string;
  category: string;
  icon: string; // inline SVG path or symbol identifier
};

const brandsRow1: ClientBrand[] = [
  { name: "Google", category: "AI & Cloud", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l7 4.5-7 4.5z" },
  { name: "Microsoft", category: "Enterprise Tech", icon: "M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" },
  { name: "Amazon", category: "Cloud & Commerce", icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
  { name: "Meta", category: "Spatial & Social", icon: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" },
  { name: "Netflix", category: "Entertainment", icon: "M4 4h4v16H4V4zm12 0h4v16h-4V4zM9 4h3l3 16h-3L9 4z" },
  { name: "Spotify", category: "Audio Platform", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 14.65c-.2.3-.55.4-.85.2-2.35-1.45-5.3-1.75-8.8-.95-.35.1-.65-.15-.75-.45-.1-.35.15-.65.45-.75 3.85-.85 7.15-.5 9.8 1.1.3.15.4.55.15.85zm1.2-2.7c-.25.4-.75.5-1.15.25-2.7-1.65-6.8-2.15-9.95-1.15-.45.15-.9-.1-.1.05-.45.15-.9-.1-.45-.25 3.6-1.1 8.15-.55 11.25 1.35.4.25.5.75.25 1.15zm.1-2.85C14.4 9.15 8.05 8.95 4.7 9.95c-.55.15-1.15-.15-1.3-.7-.15-.55.15-1.15.7-1.3 3.9-1.2 10.9-0.95 14.75 1.35.5.3.65.95.35 1.45-.3.5-.95.65-1.45.35z" },
  { name: "Airbnb", category: "Travel & Stays", icon: "M12 2L2 19h20L12 2zm0 4.2L17.8 16H6.2L12 6.2z" },
  { name: "Adobe", category: "Creative Cloud", icon: "M3 3h6l6 14H9L7 12H3V3zm12 0h6v18h-6V3z" },
  { name: "Intel", category: "Semiconductors", icon: "M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z" },
  { name: "Stripe", category: "Fintech Infra", icon: "M13.98 10.1c0-.47-.36-.68-1.07-.68-.89 0-2.02.34-2.89.83V7.75c.99-.42 2.05-.62 3.12-.62 2.37 0 3.83 1.12 3.83 3.09v5.9h-2.82v-.93c-.8.69-1.85 1.09-2.94 1.09-2.06 0-3.41-1.25-3.41-2.92 0-2.06 1.83-3.13 6.18-3.26zm-2.99 4.21c.54 0 1.07-.17 1.51-.51.45-.34.78-.81.94-1.35-1.74.08-3.64.44-3.64 1.46 0 .54.49.8 1.19.8z" },
];

const brandsRow2: ClientBrand[] = [
  { name: "Salesforce", category: "CRM & SaaS", icon: "M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" },
  { name: "Uber", category: "Mobility", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6z" },
  { name: "Shopify", category: "E-Commerce", icon: "M19 4H5c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm-7 11.5L7 12l1.41-1.41L12 12.67l4.59-4.59L18 9.5 12 15.5z" },
  { name: "Slack", category: "Workplace", icon: "M6 15a2 2 0 01-2-2 2 2 0 012-2h2v2a2 2 0 01-2 2zm1 0a2 2 0 012 2 2 2 0 01-2 2 2 2 0 01-2-2v-2h2zm2-7a2 2 0 01-2-2 2 2 0 012-2 2 2 0 012 2v2H9zm0 1a2 2 0 012-2 2 2 0 012 2 2 2 0 01-2 2H9V9zm7 2a2 2 0 012 2 2 2 0 01-2 2h-2v-2a2 2 0 012-2zm-1 0a2 2 0 01-2-2 2 2 0 012-2 2 2 0 012 2v2h-2zm-2 7a2 2 0 012 2 2 2 0 01-2 2 2 2 0 01-2-2v-2h2zm0-1a2 2 0 01-2 2 2 2 0 01-2-2 2 2 0 012-2h2v2z" },
  { name: "GitHub", category: "Developer Tools", icon: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" },
  { name: "Figma", category: "Design System", icon: "M8 12a4 4 0 108 0 4 4 0 00-8 0zm0 8a4 4 0 104-4H8v4zm0-16a4 4 0 00-4 4 4 4 0 004 4h4V4H8zm8 4a4 4 0 100-8h-4v8h4zm0 4a4 4 0 00-4 4v4h4a4 4 0 000-8z" },
  { name: "Notion", category: "Workspace", icon: "M4 4h16v16H4V4zm2 2v12h12V6H6z" },
  { name: "LinkedIn", category: "Professional Net", icon: "M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.64 1.64 0 100 3.28 1.64 1.64 0 000-3.28z" },
  { name: "PayPal", category: "Payments", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" },
  { name: "Dropbox", category: "Cloud Storage", icon: "M6 3l6 4 6-4 6 4-6 4 6 4-6-4-6 4L0 7l6-4zm12 12l-6-4-6 4 6 4 6-4z" },
];

function BrandBadge({ brand }: { brand: ClientBrand }) {
  return (
    <div className="client-logo shrink-0 px-4 py-2 sm:px-6 sm:py-3">
      <div className="group relative flex items-center gap-3.5 rounded-2xl border border-white/10 bg-neutral-900/80 backdrop-blur px-5 py-3.5 transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:-translate-y-1 shadow-lg hover:shadow-2xl">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white group-hover:bg-white group-hover:text-ink transition-colors duration-300">
          <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d={brand.icon} />
          </svg>
        </div>
        <div className="flex flex-col text-left">
          <span className="font-display text-sm font-bold tracking-tight text-white group-hover:text-white">
            {brand.name}
          </span>
          <span className="text-[10px] font-mono text-white/50 tracking-wider uppercase group-hover:text-white/80">
            {brand.category}
          </span>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({ items, reverse = false }: { items: ClientBrand[]; reverse?: boolean }) {
  const repeated = useMemo(() => [...items, ...items, ...items], [items]);

  return (
    <div className="overflow-hidden py-2 select-none">
      <div className={`marquee-track flex gap-2 ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}>
        {repeated.map((brand, i) => (
          <BrandBadge key={`${brand.name}-${i}`} brand={brand} />
        ))}
      </div>
    </div>
  );
}

export default function ClientMarquee() {
  return (
    <section className="bg-neutral-950 text-white py-20 lg:py-32 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-white/50 block mb-3 font-mono">
            Trusted Worldwide
          </span>
          <RevealText
            as="h2"
            text="Brands we’ve helped grow."
            className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl leading-[1.04] text-white"
          />
        </div>
        <p className="text-sm md:text-base text-white/60 max-w-md font-light leading-relaxed">
          From venture-backed startups to Fortune 500 enterprises, we partner with teams building ambitious digital products.
        </p>
      </div>

      <div className="space-y-4">
        <MarqueeRow items={brandsRow1} />
        <MarqueeRow items={brandsRow2} reverse />
      </div>
    </section>
  );
}
