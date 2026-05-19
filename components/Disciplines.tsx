"use client";
import { useEffect, useRef, useState } from "react";
import PrismButton from "./PrismButton";
import designImg from "@/assets/designprox.png";
import developImg from "@/assets/developprox.png";
import brandImg from "@/assets/brandprox.png";

type Item = {
  title: string;
  body: string;
  image: string;
};

const items: Item[] = [
  {
    title: "Design",
    body:
      "Intelligent design is the essence of nature; that's our inspiration in crafting tomorrow's tech realm.",
    image: designImg.src,
  },
  {
    title: "Develop",
    body:
      "Engineering excellence meets craft — we build resilient platforms that scale with intent and ship with confidence.",
    image: developImg.src,
  },
  {
    title: "Brand",
    body:
      "We translate ambition into identity — distinct stories, sharp systems, and brands that compound over time.",
    image: brandImg.src,
  },
];

/**
 * Disciplines — sticky pinned section.
 *
 * Outer container is `items.length * 100vh` tall.
 * A single sticky stage sits at top:0 inside it.
 * Three invisible sentinel slices (each 100vh tall) stack underneath; an
 * IntersectionObserver picks the most-visible sentinel and we swap the active
 * index. Text + image cross-fade smoothly between states.
 */
export default function Disciplines() {
  const [active, setActive] = useState(0);
  const sentinelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = sentinelsRef.current;
    if (!root) return;
    const sentinels = Array.from(
      root.querySelectorAll<HTMLElement>("[data-sentinel]")
    );

    const io = new IntersectionObserver(
      (entries) => {
        // Prefer entries that are currently intersecting the band.
        let bestIdx = -1;
        let bestRatio = -1;
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const idx = sentinels.indexOf(e.target as HTMLElement);
          if (idx < 0) return;
          if (e.intersectionRatio > bestRatio) {
            bestRatio = e.intersectionRatio;
            bestIdx = idx;
          }
        });
        if (bestIdx >= 0) setActive((p) => (p === bestIdx ? p : bestIdx));
      },
      // rootMargin shrinks the observation band to the viewport's middle 20%.
      // Threshold must be 0 — sentinels are 100svh tall, so ratio inside a 20vh
      // band can never exceed ~0.2; any non-zero threshold above that never fires.
      { threshold: 0, rootMargin: "-40% 0px -40% 0px" }
    );

    sentinels.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative bg-ink text-white">
      {/* Outer scroll container — drives sticky duration */}
      {/* Height = (n + 1) × 100svh so the sticky 100svh panel stays pinned for
          the full n × 100svh sentinel run. */}
      <div className="relative" style={{ height: `${(items.length + 1) * 100}svh` }}>
        {/* Sticky stage */}
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
          {/* Background image stack — only active one is visible.
              Performance: avoid `mask-image` (it forces an offscreen composite
              every paint). Use a single gradient overlay instead, and animate
              only `opacity` on GPU layers. */}
          <div className="absolute inset-0">
            {items.map((it, i) => (
              <img
                key={i}
                src={it.image}
                alt=""
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                // 50% smaller than before (was w-[60%]). object-contain so the
                // prox artwork breathes; right-aligned, vertically centred via
                // translate baked into inline transform (inline beats className).
                className="absolute right-[4%] top-1/2 h-[60%] w-[30%] object-contain transition-opacity duration-500 ease-out"
                style={{
                  opacity: i === active ? 1 : 0,
                  willChange: "opacity",
                  transform: "translate3d(0,-50%,0)",
                }}
              />
            ))}
            {/* Single gradient overlay does the fade-into-dark vignette
                cheaply (replaces per-image mask). */}
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-transparent" />
          </div>

          {/* Content — text stack cross-fades */}
          <div className="relative z-10 h-full max-w-container mx-auto px-6 lg:px-10 flex items-center">
            <div className="w-full max-w-3xl">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/60 mb-8">
                <span>What we do</span>
                <span className="opacity-50">
                  {String(active + 1).padStart(2, "0")} /{" "}
                  {String(items.length).padStart(2, "0")}
                </span>
              </div>

              {/* Stacked titles — only active one is visible */}
              <div className="relative" style={{ minHeight: "clamp(120px, 18vw, 240px)" }}>
                {items.map((it, i) => (
                  <h2
                    key={i}
                    className={`absolute inset-0 font-display font-light leading-[0.95] tracking-tight transition-all duration-700 ease-out ${
                      i === active
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-6"
                    }`}
                    style={{ fontSize: "clamp(72px, 12vw, 200px)" }}
                  >
                    {it.title}
                  </h2>
                ))}
              </div>

              {/* Stacked bodies */}
              <div className="relative mt-8" style={{ minHeight: "9rem" }}>
                {items.map((it, i) => (
                  <p
                    key={i}
                    className={`absolute inset-0 max-w-xl text-lg md:text-xl text-white/75 leading-relaxed transition-all duration-700 ease-out ${
                      i === active
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    {it.body}
                  </p>
                ))}
              </div>

              <div className="mt-12">
                <PrismButton href="/services" variant="link">
                  Learn more
                </PrismButton>
              </div>

              {/* Step indicator dots */}
              <div className="mt-14 flex items-center gap-3">
                {items.map((_, k) => (
                  <span
                    key={k}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      k === active ? "w-10 bg-white" : "w-4 bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sentinels — invisible 100vh slices that drive the active index */}
        <div
          ref={sentinelsRef}
          className="absolute inset-0 pointer-events-none"
          aria-hidden
        >
          {items.map((_, i) => (
            <div
              key={i}
              data-sentinel
              className="h-[100svh] w-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
