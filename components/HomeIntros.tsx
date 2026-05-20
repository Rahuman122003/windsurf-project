"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import mascotImg from "@/assets/mascot.png";
import workProx from "@/assets/workprox.png";
import processProx from "@/assets/processprox.png";
import serviceProx from "@/assets/serviceprox.png";
import storiesProx from "@/assets/storiesprox.png";
import insightsProx from "@/assets/insightsprox.png";
import careersProx from "@/assets/careersprox.png";
import contactProx from "@/assets/contactprox.png";

type Intro = {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  href: string;
  cta: string;
  img: string;
  isMascot?: boolean;
};

const intros: Intro[] = [
  {
    eyebrow: "01 — Work",
    title: "Cinematic products, measured by outcomes.",
    body:
      "Six case studies across fintech, retail, healthtech, travel, energy and SaaS. Every project shipped with the metric it moved.",
    bullets: ["120+ products shipped", "+62% activation lifts", "Fortune-500 to seed stage"],
    href: "/work",
    cta: "See the case studies",
    img: workProx.src,
    isMascot: true,
  },
  {
    eyebrow: "02 — Process",
    title: "Discovery → build → compound.",
    body:
      "Every engagement follows the same five-stage rhythm. Tight, written, and deliberately repeatable — so you always know what week three looks like before week one starts.",
    bullets: ["Two-week paid discovery", "Weekly shippable artefacts", "30-day post-launch review"],
    href: "/services",
    cta: "Browse services",
    img: processProx.src,
    isMascot: true,
  },
  {
    eyebrow: "03 — Services",
    title: "One studio. Six disciplines. Zero handoffs.",
    body:
      "Brand, product design, engineering, applied AI, content and growth — practiced under one roof, by one senior team.",
    bullets: ["Brand & identity systems", "Product design & engineering", "Applied AI that ships"],
    href: "/services",
    cta: "See every capability",
    img: serviceProx.src,
    isMascot: true,
  },
  {
    eyebrow: "04 — Stories",
    title: "The operators behind the work.",
    body:
      "First-person accounts from the partners we've shipped alongside — what worked, what broke, and what compounded over the long term.",
    bullets: ["94% retention after year one", "12 industries served", "Multi-year partnerships"],
    href: "/stories",
    cta: "Read the stories",
    img: storiesProx.src,
    isMascot: true,
  },
  {
    eyebrow: "05 — Insights",
    title: "Field notes from people doing the work.",
    body:
      "Long-form, opinionated essays on craft, AI evals, design systems and the boring parts of shipping. Roughly monthly cadence, no filler.",
    bullets: ["Evals first, prompts second", "The honest cost of design systems", "Edge rendering in plain English"],
    href: "/insights",
    cta: "Read the essays",
    img: insightsProx.src,
    isMascot: true,
  },
  {
    eyebrow: "06 — Careers",
    title: "Build a career, not a portfolio.",
    body:
      "We hire senior operators who write, ship, and stay for the boring parts. Open roles across design, engineering, AI and brand.",
    bullets: ["Senior or training to be", "Open salary bands", "32 days PTO + four-day Augusts"],
    href: "/careers",
    cta: "See open roles",
    img: careersProx.src,
    isMascot: true,
  },
  {
    eyebrow: "07 — PROX",
    title: "Meet PROX — our digital brand ambassador.",
    body:
      "Built with Probiz Technologies, PROX is the studio's always-on representative. A trained voice, a curated knowledge base, and a teammate who never sleeps.",
    bullets: ["Always-on, on brand", "Conversational intake", "Built by Probiz Technologies"],
    href: "/prox",
    cta: "Meet PROX",
    img: mascotImg.src,
    isMascot: true,
  },
  {
    eyebrow: "08 — Contact",
    title: "Tell us about your project.",
    body:
      "The more specific the brief, the more specific our reply. We respond within one business day — usually with a real opinion attached.",
    bullets: ["London & Bengaluru studios", "Sprint, project or partnership", "1-business-day response"],
    href: "/contact",
    cta: "Start a conversation",
    img: contactProx.src,
    isMascot: true,
  },
];

export default function HomeIntros() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);

    const slides = Array.from(root.querySelectorAll<HTMLElement>("[data-intro-slide]"));
    const triggers: ScrollTrigger[] = [];

    const ctx = gsap.context(() => {
      slides.forEach((slide) => {
        const reverse = slide.classList.contains("intro-slide--reverse");
        const media = slide.querySelector<HTMLElement>(".intro-media");
        const copy = slide.querySelector<HTMLElement>(".intro-copy");
        const copyKids = copy ? Array.from(copy.children) : [];
        const mascot = slide.querySelector<HTMLElement>(".prox-mascot");

        // 1) Scrubbed BOTTOM-UP slide-in with clip-path curtain reveal
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: slide,
            start: "top 92%",
            end: "top 38%",
            scrub: 1,
          },
        });
        // Alternating horizontal entry — media from one side, copy from the
        // opposite side. `reverse` flips for every other slide.
        const mediaFrom = reverse ? 70 : -70;   // % of width
        const copyFrom  = reverse ? -60 : 60;
        tl.fromTo(
          media,
          {
            xPercent: mediaFrom,
            autoAlpha: 0,
            scale: 1.04,
            rotate: reverse ? 1.2 : -1.2,
            filter: "blur(8px)",
          },
          {
            xPercent: 0,
            autoAlpha: 1,
            scale: 1,
            rotate: 0,
            filter: "blur(0px)",
            ease: "power3.out",
          },
          0
        ).fromTo(
          copy,
          { xPercent: copyFrom, autoAlpha: 0, filter: "blur(6px)" },
          { xPercent: 0, autoAlpha: 1, filter: "blur(0px)", ease: "power3.out" },
          0.05
        );
        if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);

        // 2) Long-arc vertical parallax — media drifts up faster than copy
        const parallax = gsap.timeline({
          scrollTrigger: {
            trigger: slide,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.4,
          },
        });
        parallax.fromTo(media, { yPercent: 8 }, { yPercent: -10, ease: "none" }, 0);
        parallax.fromTo(copy, { yPercent: -2 }, { yPercent: 4, ease: "none" }, 0);
        if (parallax.scrollTrigger) triggers.push(parallax.scrollTrigger);

        // 3) Inner copy: gentle horizontal stagger that follows the slide-in
        if (copyKids.length) {
          const innerFrom = reverse ? -40 : 40;
          const inner = gsap.fromTo(
            copyKids,
            { x: innerFrom, autoAlpha: 0, filter: "blur(8px)" },
            {
              x: 0,
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: 1.0,
              ease: "power4.out",
              stagger: 0.09,
              scrollTrigger: {
                trigger: slide,
                start: "top 78%",
                toggleActions: "play none none reverse",
              },
            }
          );
          if ((inner as any).scrollTrigger) triggers.push((inner as any).scrollTrigger);
        }

        // 4) Mascot ambient float + scroll-driven rotation
        if (mascot) {
          gsap.to(mascot, {
            y: -18,
            rotation: 3,
            duration: 2.6,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
          gsap.to(mascot, {
            scale: 1.05,
            duration: 3.4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
          const mt = gsap.fromTo(
            mascot,
            { rotation: -8 },
            {
              rotation: 8,
              ease: "none",
              scrollTrigger: {
                trigger: slide,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.4,
              },
            }
          );
          if ((mt as any).scrollTrigger) triggers.push((mt as any).scrollTrigger);
        }
      });

      // 5) Velocity-reactive subtle tilt on the whole grid
      ScrollTrigger.create({
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = gsap.utils.clamp(-1, 1, self.getVelocity() / 2800);
          slides.forEach((s) => {
            gsap.to(s, {
              skewY: v * 0.8,
              duration: 0.6,
              ease: "power3.out",
              overwrite: "auto",
            });
          });
        },
      });
    }, root);

    return () => {
      triggers.forEach((t) => t.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section className="bg-ink text-white overflow-x-clip">
      <div className="max-w-container mx-auto px-6 lg:px-10 py-28 lg:py-40">
        <div className="max-w-3xl mb-20 lg:mb-28">
          <div className="text-xs uppercase tracking-[0.3em] text-white/50 mb-5">The Studio</div>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.02] tracking-tight text-white">
            Eight rooms in one studio. Step into any of them.
          </h2>
          <p className="mt-6 text-xl text-white/70 leading-relaxed">
            A short tour of what we do, how we do it, who we do it with, and
            how to start a conversation. Each section opens into a deeper,
            written-out page.
          </p>
        </div>

        <div ref={rootRef} className="space-y-28 lg:space-y-40">
          {intros.map((it, i) => {
            const reverse = i % 2 === 1;
            return (
              <article
                key={it.href}
                data-intro-slide
                className={`intro-slide grid lg:grid-cols-2 gap-10 lg:gap-20 items-center ${
                  reverse ? "lg:[&>div:first-child]:order-2 intro-slide--reverse" : ""
                }`}
              >
                {it.isMascot ? (
                  <div className="intro-media intro-media--mascot relative aspect-[4/3] overflow-visible group flex items-center justify-center">
                    {/* Aurora glow halo behind PROX */}
                    <div
                      className="absolute inset-0 -m-10 rounded-[40%] blur-3xl opacity-70
                                 bg-[radial-gradient(closest-side,rgba(99,102,241,0.55),rgba(168,85,247,0.25),transparent_70%)]"
                      aria-hidden
                    />
                    <img
                      src={it.img}
                      alt="PROX mascot"
                      loading="lazy"
                      className="prox-mascot relative z-10 max-h-[110%] w-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)] will-change-transform"
                    />
                    <Link
                      href={it.href}
                      prefetch
                      aria-label={it.cta}
                      className="absolute inset-0 z-20"
                    />
                  </div>
                ) : (
                  <div className="intro-media relative aspect-[4/3] overflow-hidden rounded-2xl bg-white/5 group">
                    <img
                      src={it.img}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1100ms] group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <Link
                      href={it.href}
                      prefetch
                      aria-label={it.cta}
                      className="absolute inset-0"
                    />
                  </div>
                )}

                <div className="intro-copy">
                  <div className="text-xs uppercase tracking-[0.3em] text-white/50 mb-5">
                    {it.eyebrow}
                  </div>
                  <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.04] tracking-tight text-white">
                    {it.title}
                  </h3>
                  <p className="mt-6 text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
                    {it.body}
                  </p>
                  <ul className="mt-8 space-y-2 max-w-md">
                    {it.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-3 text-white/75">
                        <span className="h-px w-6 bg-white/40" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={it.href}
                    prefetch
                    className="mt-10 inline-flex items-center gap-2 rounded-full bg-white text-ink px-7 py-3 text-base font-semibold hover:bg-white/90 transition-colors"
                  >
                    {it.cta}
                    <ArrowUpRight size={18} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
