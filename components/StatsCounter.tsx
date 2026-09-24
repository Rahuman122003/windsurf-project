"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type CounterProps = {
  value: string;
  label: string;
  className?: string;
};

export default function StatsCounter({ value, label, className = "" }: CounterProps) {
  const numRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = numRef.current;
    const container = containerRef.current;
    if (!el || !container) return;
    gsap.registerPlugin(ScrollTrigger);

    // Extract numeric part and prefix/suffix (e.g. "+62%" -> prefix="+", num=62, suffix="%")
    const match = value.match(/^([^0-9]*)([0-9,.]+)(.*)$/);
    if (!match) return;

    const prefix = match[1] || "";
    const rawNum = parseFloat(match[2].replace(/,/g, ""));
    const suffix = match[3] || "";
    const isFloat = match[2].includes(".");

    const obj = { val: 0 };

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: rawNum,
        duration: 2.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        onUpdate: () => {
          if (el) {
            const formatted = isFloat
              ? obj.val.toFixed(1)
              : Math.floor(obj.val).toLocaleString();
            el.textContent = `${prefix}${formatted}${suffix}`;
          }
        },
      });
    }, container);

    return () => ctx.revert();
  }, [value]);

  return (
    <div ref={containerRef} className={`border-t border-white/15 pt-6 ${className}`}>
      <div ref={numRef} className="font-display text-4xl md:text-6xl font-extrabold text-white">
        {value}
      </div>
      <div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/50">{label}</div>
    </div>
  );
}
