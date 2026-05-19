"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || open ? "bg-white/80 backdrop-blur-md border-b border-black/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-container mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
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
        <nav className="hidden lg:flex items-center gap-10">
          {links.map((l) => (
            <Link key={l.href} href={l.href} prefetch className="nav-link text-[15px] font-medium">
              {l.label}
            </Link>
          ))}
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
