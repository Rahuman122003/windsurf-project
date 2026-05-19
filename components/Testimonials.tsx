"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Star } from "lucide-react";
import RevealText from "./RevealText";
import "swiper/css";
import "swiper/css/pagination";

const items = [
  { name: "Amelia Carter", role: "VP Product, Northwind", tag: "Fintech", quote: "Blyn redefined what we thought a product team could ship in a quarter. Their craft is unmatched.", avatar: "https://i.pravatar.cc/120?img=47" },
  { name: "Daniel Reyes", role: "CMO, Globex", tag: "Brand", quote: "From discovery to launch, every interaction felt like working with a top-tier agency and product partner.", avatar: "https://i.pravatar.cc/120?img=12" },
  { name: "Priya Menon", role: "CTO, Umbrella", tag: "Engineering", quote: "Their engineering rigor combined with bold design helped us scale to millions of users.", avatar: "https://i.pravatar.cc/120?img=32" },
  { name: "Marcus Lee", role: "Founder, PiedPiper", tag: "AI", quote: "The Gen AI workshop alone unlocked a roadmap we’d been trying to build for two years.", avatar: "https://i.pravatar.cc/120?img=15" },
];

export default function Testimonials() {
  return (
    <section id="stories" className="py-24 lg:py-32 bg-white">
      <div className="max-w-container mx-auto px-6 lg:px-10 mb-12">
        <div className="text-sm uppercase tracking-[0.25em] text-muted mb-4">Featured stories</div>
        <RevealText as="h2" text="Loved by leaders building what’s next" className="font-display font-extrabold leading-[1.05] max-w-5xl text-5xl md:text-7xl" />
      </div>

      <div className="max-w-container mx-auto px-6 lg:px-10">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          autoplay={{ delay: 4500 }}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="!pb-14"
        >
          {items.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="h-full rounded-2xl border border-black/10 p-8 bg-white flex flex-col gap-6 hover:-translate-y-1 hover:shadow-xl transition">
                <div className="flex items-center gap-1 text-accent">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-xl md:text-2xl leading-relaxed">“{t.quote}”</p>
                <div className="mt-auto flex items-center gap-4 pt-4 border-t border-black/5">
                  <img src={t.avatar} alt="" className="h-12 w-12 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-sm text-muted">{t.role}</div>
                  </div>
                  <span className="ml-auto text-xs uppercase tracking-widest bg-black/5 rounded-full px-3 py-1">{t.tag}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
