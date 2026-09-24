"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(hover: none) and (pointer: coarse)").matches
    ) {
      return;
    }
    const dotEl = dot.current;
    const ringEl = ring.current;
    if (!dotEl || !ringEl) return;
    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      dotEl.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%,-50%)`;
      ringEl.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };
    let raf = requestAnimationFrame(tick);

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const hoverEl = t.closest<HTMLElement>(
        "a,button,[data-hover],[data-cursor]"
      );

      if (hoverEl) {
        ringEl.classList.add("is-hover");
        const customText = hoverEl.getAttribute("data-cursor");
        if (customText) {
          setCursorText(customText);
          ringEl.classList.add("has-text");
        } else {
          setCursorText("");
          ringEl.classList.remove("has-text");
        }
      } else {
        ringEl.classList.remove("is-hover", "has-text");
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring">
        {cursorText && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-white select-none pointer-events-none">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}
