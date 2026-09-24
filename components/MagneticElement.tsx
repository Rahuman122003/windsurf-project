"use client";
import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number; // 0 to 1, how much the element follows cursor
  radius?: number; // activation radius in px
};

/**
 * Wraps any element with a magnetic hover effect.
 * The element subtly moves toward the cursor when it's nearby,
 * creating a premium interactive feel.
 */
export default function MagneticElement({
  children,
  className = "",
  strength = 0.35,
  radius = 100,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Skip on touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        const pull = 1 - dist / radius;
        gsap.to(el, {
          x: dx * strength * pull,
          y: dy * strength * pull,
          duration: 0.4,
          ease: "power3.out",
        });
      } else {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.5)",
        });
      }
    };

    const onLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.5)",
      });
    };

    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength, radius]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
