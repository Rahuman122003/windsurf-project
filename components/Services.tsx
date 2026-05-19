"use client";
import { useEffect, useRef } from "react";
import PrismButton from "./PrismButton";
import { ArrowUpRight, Code2, Palette, Sparkles, Cloud, ShoppingBag, BrainCircuit } from "lucide-react";
import RevealText from "./RevealText";

const services = [
  { icon: Palette, title: "Brand & Design", desc: "Identity systems and product design that move audiences and markets." },
  { icon: Code2, title: "Engineering", desc: "Resilient web, mobile and platform engineering — built to scale." },
  { icon: BrainCircuit, title: "Gen AI", desc: "Strategy, prototyping and deployment of generative AI solutions." },
  { icon: Cloud, title: "Cloud & DevOps", desc: "Cloud-native infrastructure and developer-first delivery pipelines." },
  { icon: ShoppingBag, title: "Commerce", desc: "Headless commerce experiences engineered for global growth." },
  { icon: Sparkles, title: "Experience", desc: "Immersive web, motion and interaction design that wins attention." },
];

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = root.querySelectorAll<HTMLElement>(".svc");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            items.forEach((it, i) =>
              setTimeout(() => {
                it.style.opacity = "1";
                it.style.transform = "translateY(0)";
              }, i * 90)
            );
            io.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <section id="services" className="py-24 lg:py-32 bg-white">
      <div className="max-w-container mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <RevealText as="h2" text="What we do" className="font-display font-extrabold leading-[1.02] max-w-3xl" />
          <p className="text-muted max-w-md">A full-stack product studio combining design, engineering, and AI to ship work that matters.</p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="svc group relative p-8 rounded-2xl border border-black/10 bg-white hover:bg-ink hover:text-white transition-colors duration-500 cursor-pointer"
                style={{ opacity: 0, transform: "translateY(40px)", transition: "opacity .9s ease, transform .9s ease, background-color .4s ease, color .4s ease" }}
              >
                <Icon size={28} className="mb-8 transition-transform group-hover:scale-110" />
                <h3 className="text-2xl font-display font-bold mb-3">{s.title}</h3>
                <p className="text-sm leading-relaxed opacity-70">{s.desc}</p>
                <ArrowUpRight className="absolute top-6 right-6 opacity-40 group-hover:opacity-100 group-hover:rotate-45 transition-all" size={20} />
              </div>
            );
          })}
        </div>

        <div className="mt-12">
          <PrismButton href="/services" variant="silver">Explore What We Do</PrismButton>
        </div>
      </div>
    </section>
  );
}
