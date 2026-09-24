"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PrismButton from "./PrismButton";
import RevealText from "./RevealText";
import MagneticElement from "./MagneticElement";

export default function FooterCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animate the subtitle and buttons
      const subtitle = section.querySelector(".fcta-sub");
      const btns = section.querySelector(".fcta-btns");

      if (subtitle) {
        gsap.fromTo(
          subtitle,
          { y: 30, autoAlpha: 0, filter: "blur(8px)" },
          {
            y: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (btns) {
        gsap.fromTo(
          btns,
          { y: 40, autoAlpha: 0, scale: 0.95 },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            delay: 0.2,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Floating decorative particles
      const dots = section.querySelectorAll<HTMLElement>(".fcta-dot");
      dots.forEach((dot, i) => {
        gsap.to(dot, {
          y: -20 + Math.random() * 40,
          x: -15 + Math.random() * 30,
          duration: 3 + Math.random() * 2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.3,
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="bg-ink text-white py-16 sm:py-28 lg:py-40 relative overflow-hidden border-t border-white/10">
      {/* Decorative floating dots */}
      <div className="fcta-dot absolute top-20 left-[15%] w-2 h-2 rounded-full bg-white/10" />
      <div className="fcta-dot absolute top-32 right-[20%] w-1.5 h-1.5 rounded-full bg-white/15" />
      <div className="fcta-dot absolute bottom-28 left-[25%] w-1 h-1 rounded-full bg-white/10" />
      <div className="fcta-dot absolute bottom-16 right-[30%] w-2.5 h-2.5 rounded-full bg-white/8" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[400px] bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-10 text-center relative z-10">
        <RevealText
          as="h2"
          text="Get started now!"
          className="font-display font-extrabold leading-[1.05] mx-auto text-4xl sm:text-6xl md:text-8xl"
        />
        <p className="fcta-sub mt-4 sm:mt-6 text-white/65 text-base sm:text-xl md:text-2xl">It takes less than a minute of your time.</p>
        <div className="fcta-btns mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <MagneticElement strength={0.25} radius={80}>
            <PrismButton href="/contact">Request a Quote</PrismButton>
          </MagneticElement>
          <MagneticElement strength={0.25} radius={80}>
            <PrismButton href="/services" variant="ghost">Learn More</PrismButton>
          </MagneticElement>
        </div>
      </div>
    </section>
  );
}
