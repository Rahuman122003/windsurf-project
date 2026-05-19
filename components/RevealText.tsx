"use client";
import { useEffect, useRef } from "react";

type Props = {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
};

export default function RevealText({ text, as = "h2", className = "" }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reveal = () => el.querySelectorAll(".word-mask").forEach((w) => w.classList.add("is-in"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            reveal();
            io.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);

    // Failsafe: if anything goes wrong (sticky / smooth-scroll edge cases),
    // make sure text becomes visible.
    const t = window.setTimeout(() => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) reveal();
    }, 1400);

    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);

  const Tag = as as any;
  return (
    <Tag ref={ref as any} className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="word-mask">
          <span style={{ transitionDelay: `${i * 60}ms` }}>{w}</span>
        </span>
      ))}
    </Tag>
  );
}
