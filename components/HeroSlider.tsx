"use client";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import PrismButton from "./PrismButton";
import gsap from "gsap";

import "swiper/css";
import "swiper/css/effect-fade";

const slides = [
  {
    eyebrow: "Digital Transformation",
    title: "Crafting Bold Digital Futures",
    sub: "We design and engineer category-defining products for ambitious brands.",
    img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1800&q=80",
  },
  {
    eyebrow: "Brand & Experience",
    title: "Where Strategy Meets Story",
    sub: "Award-winning teams turning insight into immersive digital narratives.",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=80",
  },
  {
    eyebrow: "AI · Cloud · Engineering",
    title: "Built For The Next Decade",
    sub: "Modern engineering powered by Gen AI and cloud-native architectures.",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1800&q=80",
  },
];

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const animateIn = (idx: number) => {
    const root = document.querySelector(`[data-slide="${idx}"]`);
    if (!root) return;
    const tl = gsap.timeline();
    tl.from(root.querySelectorAll(".eyebrow, .slide-headline, .slide-sub, .slide-cta"), {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.08,
      ease: "power3.out",
    });
  };

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-ink text-white">
      <Swiper
        modules={[EffectFade, Autoplay, Navigation]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        speed={1000}
        onSwiper={(s) => {
          swiperRef.current = s;
          setTimeout(() => animateIn(0), 50);
        }}
        onSlideChange={(s) => {
          setActive(s.realIndex);
          animateIn(s.realIndex);
        }}
        className="h-full w-full"
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <div data-slide={i} className="relative h-full w-full">
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={s.img}
                  alt=""
                  className="kenburns absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/80" />
              </div>
              <div className="relative z-10 h-full max-w-container mx-auto px-6 lg:px-10 flex flex-col justify-end pb-40 lg:pb-48">
                <div className="eyebrow text-sm uppercase tracking-[0.25em] text-white/70 mb-5">
                  {s.eyebrow}
                </div>
                <h1
                  className="slide-headline font-display font-extrabold leading-[1.02] max-w-5xl"
                  style={{ fontSize: "clamp(44px,7vw,108px)", letterSpacing: "-0.01em" }}
                >
                  {s.title}
                </h1>
                <p className="slide-sub mt-6 text-lg md:text-xl text-white/75 max-w-2xl">{s.sub}</p>
                <div className="slide-cta mt-10">
                  <PrismButton href="#work">Explore our work</PrismButton>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Side arrows */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full border border-white/30 items-center justify-center hover:bg-white hover:text-ink transition"
        aria-label="Prev"
      >
        <ArrowLeft size={18} />
      </button>
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full border border-white/30 items-center justify-center hover:bg-white hover:text-ink transition"
        aria-label="Next"
      >
        <ArrowRight size={18} />
      </button>

      {/* Bottom thumb strip */}
      <div className="absolute bottom-0 inset-x-0 z-20">
        <div className="max-w-container mx-auto px-6 lg:px-10 pb-8">
          <div className="flex items-end justify-between gap-6">
            <div className="flex gap-3">
              {slides.map((s, i) => (
                <button
                  key={i}
                  onClick={() => swiperRef.current?.slideToLoop(i)}
                  className={`relative h-16 w-24 md:h-20 md:w-32 overflow-hidden rounded-md border transition ${
                    active === i ? "border-white" : "border-white/20 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={s.img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
            <div className="font-mono text-sm text-white/80 tabular-nums">
              {String(active + 1).padStart(2, "0")} <span className="text-white/40">/ {String(slides.length).padStart(2, "0")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
