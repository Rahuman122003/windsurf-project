"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * "Footer bouncer" — the footer is pinned behind the page content and
 * revealed as the user reaches the bottom, with a smooth elastic settle.
 *
 * Approach:
 *  1. Footer is positioned `fixed` at the bottom of the viewport, behind
 *     `<main>` (z-index lower).
 *  2. The body gets bottom padding equal to footer height, so the page is
 *     scrollable past `<main>` and the fixed footer is gradually exposed.
 *  3. GSAP ScrollTrigger drives a scrubbed translate + a one-shot elastic
 *     "bounce" when the user actually reaches the bottom — Lenis keeps
 *     everything smooth.
 */
export default function FooterReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const main = document.querySelector("main") as HTMLElement | null;
    const footer = document.querySelector("footer") as HTMLElement | null;
    if (!main || !footer) return;

    // Layered stacking
    main.style.position = "relative";
    main.style.zIndex = "10";
    main.style.background = main.style.background || "var(--page-bg, #ffffff)";

    footer.style.position = "fixed";
    footer.style.left = "0";
    footer.style.right = "0";
    footer.style.bottom = "0";
    footer.style.zIndex = "1";
    footer.style.willChange = "transform";

    // Reserve scroll space for footer reveal
    const setPad = () => {
      const h = footer.offsetHeight;
      document.body.style.paddingBottom = `${h}px`;
      ScrollTrigger.refresh();
    };
    setPad();

    const ro = new ResizeObserver(setPad);
    ro.observe(footer);

    // Initial state — push footer down a touch so it can spring up
    gsap.set(footer, { yPercent: 18, scale: 0.98, transformOrigin: "50% 100%" });

    // Scrubbed reveal as the bottom of <main> approaches viewport bottom
    const reveal = gsap.to(footer, {
      yPercent: 0,
      scale: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: main,
        start: "bottom bottom+=60",
        end: "bottom bottom-=20",
        scrub: 0.6,
      },
    });

    // One-shot elastic "bounce" the moment the footer is fully exposed
    const bounce = gsap.fromTo(
      footer,
      { yPercent: 0 },
      {
        keyframes: [
          { yPercent: -2.2, duration: 0.18, ease: "power2.out" },
          { yPercent: 0.8, duration: 0.18, ease: "power2.inOut" },
          { yPercent: 0, duration: 0.55, ease: "elastic.out(1, 0.55)" },
        ],
        scrollTrigger: {
          trigger: main,
          start: "bottom bottom",
          toggleActions: "play none none reset",
        },
      }
    );

    return () => {
      ro.disconnect();
      reveal.scrollTrigger?.kill();
      bounce.scrollTrigger?.kill();
      reveal.kill();
      bounce.kill();
      // Reset styles on unmount (route changes shouldn't unmount layout, but be safe)
      document.body.style.paddingBottom = "";
      footer.style.cssText = "";
      main.style.zIndex = "";
      main.style.position = "";
    };
  }, []);

  return null;
}
