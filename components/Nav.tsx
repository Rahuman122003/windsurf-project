"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PrismButton from "./PrismButton";
import { ArrowUpRight, Menu, X } from "lucide-react";
import logoDark from "@/assets/blyndarklogo.png";
import logoLight from "@/assets/blynlightlogo.png";

const links = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/stories", label: "Stories" },
  { href: "/insights", label: "Insights" },
  { href: "/careers", label: "Careers" },
  { href: "/prox", label: "PROX" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "/";
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "bg-white/40 backdrop-blur-2xl border-b border-white/40 shadow-[0_8px_32px_rgba(31,38,135,0.12)]"
          : "bg-transparent"
      }`}
      style={{
        WebkitBackdropFilter:
          scrolled || open ? "blur(24px) saturate(200%)" : undefined,
        backdropFilter:
          scrolled || open ? "blur(24px) saturate(200%)" : undefined,
      }}
    >
      {/* Liquid-glass sheen — only visible once the bar is glassy */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-700 ${
          scrolled || open ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Top + bottom hairlines */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        {/* Specular dome highlight */}
        <div className="absolute inset-x-0 -top-1/2 h-[200%] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,255,255,0.4),transparent_70%)]" />
        {/* Animated tinted gradient base (hue shifts gently) */}
        <div
          className="absolute inset-0 liquid-hue"
          style={{
            background:
              "linear-gradient(120deg, rgba(99,102,241,0.16) 0%, rgba(236,72,153,0.10) 50%, rgba(34,211,238,0.16) 100%)",
          }}
        />
        {/* Floating colour blobs that drift behind the blur — the "liquid" */}
        <div
          className="absolute -top-24 -left-10 h-64 w-64 rounded-full liquid-blob-a"
          style={{
            background:
              "radial-gradient(closest-side, rgba(168,85,247,0.55), transparent 70%)",
            filter: "blur(28px)",
          }}
        />
        <div
          className="absolute -top-20 right-0 h-72 w-72 rounded-full liquid-blob-b"
          style={{
            background:
              "radial-gradient(closest-side, rgba(34,211,238,0.45), transparent 70%)",
            filter: "blur(32px)",
          }}
        />
        <div
          className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full liquid-blob-a"
          style={{
            background:
              "radial-gradient(closest-side, rgba(236,72,153,0.45), transparent 70%)",
            filter: "blur(30px)",
            animationDelay: "-5s",
          }}
        />
        {/* Sweeping specular sheen */}
        <div
          className="absolute inset-y-0 left-0 w-1/3 liquid-sheen"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)",
            mixBlendMode: "overlay",
          }}
        />
      </div>
      <div className="relative max-w-container mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link href="/" className="relative block h-9 w-[112px]" aria-label="Blyn home">
          {/* Light logo for transparent / dark hero background; dark logo once the
              nav goes white on scroll or when the mobile sheet is open. */}
          <img
            src={logoDark.src}
            alt="Blyn"
            className={`absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-300 ${
              scrolled || open ? "opacity-0" : "opacity-100"
            }`}
          />
          <img
            src={logoLight.src}
            alt=""
            aria-hidden
            className={`absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-300 ${
              scrolled || open ? "opacity-100" : "opacity-0"
            }`}
          />
        </Link>
        <nav className="hidden lg:flex items-center gap-2">
          {links.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                prefetch
                aria-current={active ? "page" : undefined}
                className={`relative px-4 py-2 rounded-full text-[15px] font-medium transition-colors duration-300 ${
                  scrolled || open ? "text-ink/80 hover:text-ink" : "text-white/80 hover:text-white"
                } ${active ? (scrolled || open ? "text-ink" : "text-white") : ""}`}
              >
                {active && (
                  <span
                    aria-hidden
                    className={`absolute inset-0 rounded-full border ${
                      scrolled || open
                        ? "bg-white/60 border-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_4px_16px_rgba(31,38,135,0.18)]"
                        : "bg-white/15 border-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]"
                    }`}
                  />
                )}
                <span className="relative">{l.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="hidden lg:block">
          <PrismButton href="/contact" variant="solid">Contact</PrismButton>
        </div>
        <button className="lg:hidden p-2" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile fullscreen */}
      <div
        className={`lg:hidden fixed inset-0 top-20 bg-ink text-white transition-all duration-500 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-8 py-12 flex flex-col gap-6">
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              prefetch
              onClick={() => setOpen(false)}
              className="text-4xl font-display font-bold transition-all duration-700"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(20px)",
                transitionDelay: `${i * 70}ms`,
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/contact" prefetch onClick={() => setOpen(false)} className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent text-white px-6 py-3 text-base font-semibold w-fit">
            Contact <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </header>
  );
}
