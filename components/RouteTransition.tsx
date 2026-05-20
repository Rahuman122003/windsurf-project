"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Cinematic route transition.
 *
 * On every pathname change:
 *   1. A 4-stripe ink curtain wipes IN from the bottom (staggered).
 *   2. Page content underneath is replaced.
 *   3. Curtain wipes OUT to the top (staggered, opposite direction).
 *   4. The new page contents fade + lift into place.
 *
 * Pure GSAP, no extra deps. Pointer-events disabled on the overlay
 * except during the wipe so it never blocks interaction.
 */
export default function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const stripeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const [renderedPath, setRenderedPath] = useState(pathname);
  const firstRun = useRef(true);
  const activeTl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (firstRun.current) {
      // Initial mount — just fade content in, no curtain.
      firstRun.current = false;
      gsap.fromTo(
        contentRef.current,
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );
      return;
    }
    const overlay = overlayRef.current;
    const stripes = stripeRefs.current.filter(Boolean) as HTMLDivElement[];
    const content = contentRef.current;
    if (!overlay || !content || stripes.length === 0) return;

    // Kill any in-flight transition so rapid navigations don't pile up
    // overlapping timelines (which would leave the curtain stuck on screen).
    if (activeTl.current) {
      activeTl.current.kill();
      activeTl.current = null;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        if (activeTl.current === tl) activeTl.current = null;
      },
    });
    activeTl.current = tl;
    // 1. Curtain in (bottom → top)
    tl.set(overlay, { pointerEvents: "auto" })
      .set(stripes, { yPercent: 100 })
      .to(stripes, {
        yPercent: 0,
        duration: 0.55,
        ease: "power4.inOut",
        stagger: { each: 0.06, from: "start" },
      })
      // 2. Swap page content while covered, then jump to top + refresh
      // ScrollTrigger so the new page's scroll-driven animations measure
      // against the correct heights.
      .add(() => {
        setRenderedPath(pathname);
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, behavior: "auto" });
          // Defer to next frame so React has applied the new DOM.
          requestAnimationFrame(() => {
            try { ScrollTrigger.refresh(); } catch {}
          });
        }
      })
      .set(content, { autoAlpha: 0, y: 30 })
      // 3. Curtain out (top → bottom-out)
      .to(stripes, {
        yPercent: -100,
        duration: 0.6,
        ease: "power4.inOut",
        stagger: { each: 0.06, from: "end" },
      }, "+=0.05")
      // 4. Reveal new page
      .to(
        content,
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.45"
      )
      .set(overlay, { pointerEvents: "none" })
      // Reset stripes off-screen for next run
      .set(stripes, { yPercent: 100 });

    return () => {
      tl.kill();
      // Ensure overlay/content never get stuck in a covered state if the
      // timeline is interrupted mid-flight.
      gsap.set(overlay, { pointerEvents: "none" });
      gsap.set(stripes, { yPercent: 100 });
      gsap.set(content, { autoAlpha: 1, y: 0 });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Stripe colours alternate slightly to feel like layered ink panes.
  const stripeColours = [
    "#06080b",
    "#0a0d12",
    "#0e1218",
    "#06080b",
  ];

  return (
    <>
      <div
        key={renderedPath}
        ref={contentRef}
        style={{ willChange: "transform, opacity" }}
      >
        {children}
      </div>
      <div
        ref={overlayRef}
        aria-hidden
        className="fixed inset-0 z-[100] pointer-events-none flex"
        style={{ willChange: "transform" }}
      >
        {stripeColours.map((c, i) => (
          <div
            key={i}
            ref={(el) => {
              stripeRefs.current[i] = el;
            }}
            className="flex-1 h-full"
            style={{ background: c, transform: "translateY(100%)" }}
          />
        ))}
      </div>
    </>
  );
}
