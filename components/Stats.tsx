"use client";
import { useEffect, useRef, useState } from "react";
import RevealText from "./RevealText";

const stats = [
  { n: 700, suffix: "+", label: "High-Impact Projects" },
  { n: 600, suffix: "+", label: "International Clients" },
  { n: 450, suffix: "+", label: "Dedicated Experts" },
  { n: 100, suffix: "+", label: "Brand Connections" },
];

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const dur = 2000;
            const tick = (t: number) => {
              const p = Math.min(1, (t - start) / dur);
              const eased = 1 - Math.pow(1 - p, 3);
              setV(Math.round(to * eased));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return (
    <span ref={ref} className="tabular-nums">
      {v}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="bg-ink text-white py-24 lg:py-32">
      <div className="max-w-container mx-auto px-6 lg:px-10">
        <div className="mb-16 max-w-4xl">
          <div className="text-sm uppercase tracking-[0.25em] text-white/50 mb-5">Our Story</div>
          <RevealText
            as="h2"
            text="Two decades of crafting digital impact at scale"
            className="font-display font-extrabold leading-[1.05]"
          />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
          {stats.map((s, i) => (
            <div key={i} className="border-t border-white/15 pt-6">
              <div
                className="font-display font-extrabold leading-none"
                style={{ fontSize: "clamp(48px,6.5vw,96px)" }}
              >
                <CountUp to={s.n} suffix={s.suffix} />
              </div>
              <div className="mt-4 text-white/60 text-sm lg:text-base">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
