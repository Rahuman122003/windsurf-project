"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Star, Quote, CheckCircle2 } from "lucide-react";
import RevealText from "./RevealText";
import "swiper/css";
import "swiper/css/pagination";

const items = [
  {
    name: "Amelia Carter",
    role: "VP Product, Northwind Capital",
    tag: "Fintech",
    outcome: "+142% Conversion Lift",
    quote: "Blyn redefined what we thought a product team could ship in a single quarter. Their engineering speed and design precision are unmatched.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
    company: "Northwind",
  },
  {
    name: "Daniel Reyes",
    role: "Chief Marketing Officer, Globex Global",
    tag: "Brand & Motion",
    outcome: "Global Brand Rollout",
    quote: "From initial positioning to multi-market design kit deployment, working with Blyn felt like pairing with elite founding partners.",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
    company: "Globex",
  },
  {
    name: "Priya Menon",
    role: "Chief Technology Officer, Umbrella Health",
    tag: "Engineering & AI",
    outcome: "99.999% SLA Uptime",
    quote: "Their engineering rigor combined with micro-interaction design transformed our medical portal for over 50,000 active practitioners.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
    company: "Umbrella Health",
  },
  {
    name: "Marcus Lee",
    role: "Founder & CEO, PiedPiper AI",
    tag: "Applied AI",
    outcome: "3.2x Booking Surge",
    quote: "The GenAI architectural sprint unlocked a product roadmap we had struggled to execute for two years. Shipped to production in 6 weeks.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
    company: "PiedPiper AI",
  },
  {
    name: "Sarah Jenkins",
    role: "Head of Design, Hyperion SaaS",
    tag: "Design System",
    outcome: "40+ Squad Adoption",
    quote: "The Figma and Next.js token system Blyn delivered eliminated design debt across 40 distinct product squads worldwide.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&q=80",
    company: "Hyperion",
  },
];

export default function Testimonials() {
  return (
    <section id="stories" className="py-24 lg:py-36 bg-neutral-950 text-white border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-white/50 block mb-3">
              Client Telemetry & Stories
            </span>
            <RevealText
              as="h2"
              text="Loved by leaders building what’s next."
              className="font-display font-extrabold text-4xl md:text-6xl leading-[1.05] max-w-4xl text-white"
            />
          </div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/80 bg-white/10 border border-white/20 px-4 py-2 rounded-full w-fit">
            <CheckCircle2 size={14} /> 94% Year-1 Client Retention
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={28}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="!pb-16"
        >
          {items.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="h-full rounded-3xl border border-white/10 p-8 md:p-10 bg-neutral-900/60 backdrop-blur flex flex-col justify-between hover:border-white/30 transition-all duration-300 hover:-translate-y-1.5 shadow-2xl">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} size={15} fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-xs font-mono uppercase tracking-widest bg-white/10 text-white/70 border border-white/15 rounded-full px-3 py-1">
                      {t.tag}
                    </span>
                  </div>

                  <Quote className="text-white/20 mb-4" size={32} />
                  <p className="text-white/85 text-lg leading-relaxed font-light">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="h-12 w-12 rounded-full object-cover border border-white/20"
                    />
                    <div>
                      <div className="font-display font-bold text-white text-base">{t.name}</div>
                      <div className="text-xs text-white/50">{t.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
