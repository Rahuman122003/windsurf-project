"use client";
import { useEffect, useRef } from "react";
import { ArrowUpRight, Sparkles, TrendingUp, Brain } from "lucide-react";
import PrismButton from "./PrismButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExpoScaleEase } from "gsap/EasePack";
import RevealText from "./RevealText";

type Card = {
  kind: "post" | "stat" | "quote" | "tag";
  span: string;
  className?: string;
  data: any;
};

const cards: Card[] = [
  {
    kind: "post",
    span: "lg:col-span-7 lg:row-span-2",
    data: {
      tag: "AI",
      title: "How Gen AI is reshaping enterprise product teams",
      time: "6 min read",
      img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&q=80",
    },
  },
  {
    kind: "stat",
    span: "lg:col-span-5",
    className: "bg-ink text-white",
    data: { value: "+38%", label: "Faster time-to-launch with AI-assisted delivery", icon: TrendingUp },
  },
  {
    kind: "tag",
    span: "lg:col-span-2",
    className: "bg-accent text-white",
    data: { icon: Sparkles, label: "New", title: "Studio Notes" },
  },
  {
    kind: "post",
    span: "lg:col-span-3",
    data: {
      tag: "Design",
      title: "Designing motion that respects performance",
      time: "5 min read",
      img: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&q=80",
    },
  },
  {
    kind: "quote",
    span: "lg:col-span-4",
    className: "bg-neutral-100",
    data: {
      icon: Brain,
      quote: "Bento grids let teams compose stories instead of just listing posts.",
      author: "Editorial",
    },
  },
  {
    kind: "post",
    span: "lg:col-span-8",
    data: {
      tag: "Engineering",
      title: "Edge architectures for global commerce platforms",
      time: "8 min read",
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80",
    },
  },
];

export default function Insights() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ExpoScaleEase);
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".bento-card", grid);

      // Scrubbed one-by-one reveal — cards pop in sequentially with ExpoScale ease
      gsap.fromTo(
        items,
        {
          opacity: 0,
          scale: 0.6,
          y: 80,
          rotate: (i) => (i % 2 === 0 ? -2.5 : 2.5),
          transformOrigin: "50% 50%",
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotate: 0,
          ease: "expoScale(0.6, 1, power3.out)",
          stagger: { each: 0.18, from: "start" },
          duration: 1.2,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "bottom 75%",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        }
      );

      // Per-image gentle scrub parallax inside each card
      const imgs = gsap.utils.toArray<HTMLElement>(".bento-img", grid);
      imgs.forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -6, scale: 1.06 },
          {
            yPercent: 6,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: img.closest(".bento-card") as Element,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      const id = window.setTimeout(() => ScrollTrigger.refresh(), 200);
      return () => clearTimeout(id);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="insights" ref={sectionRef} className="py-24 lg:py-32 bg-white">
      <div className="max-w-container mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <RevealText
            as="h2"
            text="Insights from the studio"
            className="font-display font-extrabold leading-[1.02] max-w-4xl text-5xl md:text-7xl"
          />
          <PrismButton href="/insights" variant="silver">Read all</PrismButton>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[220px] gap-4 lg:gap-5"
        >
          {cards.map((c, i) => {
            const base =
              "bento-card group relative overflow-hidden rounded-2xl border border-black/5 bg-white will-change-transform";

            if (c.kind === "post") {
              const isFeatured = c.span.includes("row-span-2");
              return (
                <a
                  key={i}
                  href="/insights"
                  className={`${base} ${c.span} ${c.className || ""}`}
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={c.data.img}
                      alt=""
                      loading={i === 0 ? "eager" : "lazy"}
                      className="bento-img absolute inset-0 h-[112%] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  </div>
                  <div className="relative h-full flex flex-col justify-end p-6 lg:p-8 text-white">
                    <div className="flex items-center gap-3 mb-3 text-[11px] uppercase tracking-[0.2em] opacity-90">
                      <span className="rounded-full bg-white/15 backdrop-blur px-3 py-1">
                        {c.data.tag}
                      </span>
                      <span className="opacity-80">{c.data.time}</span>
                    </div>
                    <h3
                      className={`font-display font-bold leading-snug max-w-[26ch] ${
                        isFeatured ? "text-3xl lg:text-5xl" : "text-xl lg:text-2xl"
                      }`}
                    >
                      {c.data.title}
                    </h3>
                    <span className="absolute top-5 right-5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 border border-white/20 backdrop-blur transition-transform group-hover:rotate-45">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                </a>
              );
            }

            if (c.kind === "stat") {
              const Icon = c.data.icon;
              return (
                <div
                  key={i}
                  className={`${base} ${c.span} ${c.className || ""} p-6 lg:p-8 flex flex-col justify-between`}
                >
                  <Icon size={26} className="opacity-80" />
                  <div>
                    <div
                      className="font-display font-extrabold leading-none"
                      style={{ fontSize: "clamp(40px,4.6vw,64px)" }}
                    >
                      {c.data.value}
                    </div>
                    <div className="mt-3 text-sm opacity-70 max-w-[26ch]">
                      {c.data.label}
                    </div>
                  </div>
                </div>
              );
            }

            if (c.kind === "tag") {
              const Icon = c.data.icon;
              return (
                <div
                  key={i}
                  className={`${base} ${c.span} ${c.className || ""} p-6 flex flex-col justify-between`}
                >
                  <Icon size={22} />
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.25em] opacity-90">
                      {c.data.label}
                    </div>
                    <div className="font-display font-bold text-xl mt-1">
                      {c.data.title}
                    </div>
                  </div>
                </div>
              );
            }

            // quote
            const Icon = c.data.icon;
            return (
              <div
                key={i}
                className={`${base} ${c.span} ${c.className || ""} p-6 lg:p-8 flex flex-col justify-between`}
              >
                <Icon size={22} className="opacity-60" />
                <div>
                  <p className="font-display text-xl lg:text-2xl leading-snug">
                    &ldquo;{c.data.quote}&rdquo;
                  </p>
                  <div className="mt-4 text-xs uppercase tracking-[0.25em] text-muted">
                    — {c.data.author}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
