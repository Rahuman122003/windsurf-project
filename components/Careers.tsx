"use client";
import PrismButton from "./PrismButton";
import { ArrowUpRight } from "lucide-react";
import RevealText from "./RevealText";

const photos = [
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
  "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=800&q=80",
];

export default function Careers() {
  const text = "JOIN OUR TEAM • EXPLORE CAREERS • JOIN OUR TEAM • EXPLORE CAREERS • ";
  return (
    <section id="careers" className="py-24 lg:py-32 bg-neutral-50">
      <div className="max-w-container mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="text-sm uppercase tracking-[0.25em] text-muted mb-5">Careers</div>
          <RevealText as="h2" text="Build a career that builds the future" className="font-display font-extrabold leading-[1.05] text-5xl md:text-7xl" />
          <p className="mt-6 text-muted text-xl md:text-2xl max-w-xl leading-relaxed">
            We hire curious humans who care deeply about craft, kindness, and shipping work that matters.
          </p>
          <div className="mt-10"><PrismButton href="/careers" variant="solid">See open roles</PrismButton></div>
        </div>

        <div className="relative h-[520px]">
          <div className="absolute top-0 right-0 h-[280px] w-[220px] rounded-2xl overflow-hidden shadow-xl">
            <img src={photos[0]} alt="" className="h-full w-full object-cover hover:scale-105 transition duration-700" />
          </div>
          <div className="absolute top-32 left-4 h-[260px] w-[200px] rounded-2xl overflow-hidden shadow-xl">
            <img src={photos[1]} alt="" className="h-full w-full object-cover hover:scale-105 transition duration-700" />
          </div>
          <div className="absolute bottom-0 right-12 h-[240px] w-[200px] rounded-2xl overflow-hidden shadow-xl">
            <img src={photos[2]} alt="" className="h-full w-full object-cover hover:scale-105 transition duration-700" />
          </div>

          {/* Spinning text badge */}
          <div className="absolute bottom-8 left-12 h-32 w-32 rounded-full bg-ink text-white flex items-center justify-center shadow-2xl">
            <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-spin8">
              <defs>
                <path id="circ" d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
              </defs>
              <text fontSize="18" fontWeight="700" letterSpacing="2" fill="currentColor">
                <textPath href="#circ">{text}</textPath>
              </text>
            </svg>
            <ArrowUpRight size={28} />
          </div>
        </div>
      </div>
    </section>
  );
}
