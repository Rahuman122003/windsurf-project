"use client";
import { useEffect } from "react";

export function useInViewClass(selector: string, className = "is-in", threshold = 0.2) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const els = document.querySelectorAll(selector);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(className);
            io.unobserve(e.target);
          }
        });
      },
      { threshold }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [selector, className, threshold]);
}
