"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PrismButton from "./PrismButton";
import { ArrowUpRight, Menu, X, Mail, Linkedin, Twitter, Instagram, Github } from "lucide-react";
import logoDark from "@/assets/blynlightlogo.png";
import logoLight from "@/assets/blyndarklogo.png";

const links = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/stories", label: "Stories" },
  { href: "https://blogsbyprobiz.vercel.app/blyn-tech/blogs", label: "Blogs" },
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

  // Close mobile drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close mobile drawer on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [open]);

  // Logo logic: On scrolled light glass header without open menu -> show dark logo.
  // Otherwise (dark page top or open dark mobile menu) -> show light logo.
  const showDarkLogo = scrolled && !open;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        open
          ? "bg-ink border-b border-white/10"
          : scrolled
          ? "bg-white/40 backdrop-blur-2xl border-b border-white/40 shadow-[0_8px_32px_rgba(31,38,135,0.12)]"
          : "bg-transparent border-b border-transparent"
      }`}
      style={{
        WebkitBackdropFilter:
          !open && scrolled ? "blur(24px) saturate(200%)" : undefined,
        backdropFilter:
          !open && scrolled ? "blur(24px) saturate(200%)" : undefined,
      }}
    >
      {/* Liquid-glass sheen — visible when scrolled and menu is closed */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-700 ${
          scrolled && !open ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="absolute inset-x-0 -top-1/2 h-[200%] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,255,255,0.4),transparent_70%)]" />
        <div
          className="absolute inset-0 liquid-hue"
          style={{
            background:
              "linear-gradient(120deg, rgba(99,102,241,0.16) 0%, rgba(236,72,153,0.10) 50%, rgba(34,211,238,0.16) 100%)",
          }}
        />
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
      </div>

      <div className="relative max-w-container mx-auto px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between z-50">
        <Link href="/" className="relative block h-11 sm:h-12 w-[140px] sm:w-[155px]" aria-label="Blyn home">
          {/* Light logo (white logo for dark background) */}
          <img
            src={logoLight.src}
            alt="Blyn"
            className={`absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-300 ${
              showDarkLogo ? "opacity-0" : "opacity-100"
            }`}
          />
          {/* Dark logo (black logo for light glass backdrop when scrolled) */}
          <img
            src={logoDark.src}
            alt=""
            aria-hidden
            className={`absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-300 ${
              showDarkLogo ? "opacity-100" : "opacity-0"
            }`}
          />
        </Link>

        {/* Desktop Navigation */}
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
                  showDarkLogo
                    ? "text-ink/80 hover:text-ink"
                    : "text-white/80 hover:text-white"
                } ${active ? (showDarkLogo ? "text-ink font-semibold" : "text-white font-semibold") : ""}`}
              >
                {active && (
                  <span
                    aria-hidden
                    className={`absolute inset-0 rounded-full border ${
                      showDarkLogo
                        ? "bg-white/60 border-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_4px_16px_rgba(31,38,135,0.18)]"
                        : "bg-white/15 border-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]"
                    }`}
                  />
                )}
                <span className="relative z-10">{l.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Desktop Contact CTA */}
        <div className="hidden lg:block">
          <PrismButton href="/contact" variant="solid">
            Contact
          </PrismButton>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className={`lg:hidden relative z-50 p-2.5 rounded-full transition-all duration-300 border ${
            open
              ? "bg-white/10 text-white border-white/20"
              : showDarkLogo
              ? "bg-ink/5 text-ink border-ink/20 hover:bg-ink/10"
              : "bg-white/10 text-white border-white/20 hover:bg-white/20"
          }`}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Fullscreen Glass Drawer */}
      <div
        className={`lg:hidden fixed inset-0 top-0 pt-20 z-40 bg-ink/98 backdrop-blur-2xl text-white flex flex-col justify-between overflow-y-auto transition-all duration-500 ease-in-out ${
          open
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
        style={{ minHeight: "100dvh" }}
      >
        <div className="px-6 sm:px-8 py-8 flex flex-col gap-4 max-w-md w-full mx-auto">
          <div className="text-[11px] uppercase tracking-[0.3em] text-white/40 font-mono mb-2">
            Navigation
          </div>

          <div className="flex flex-col gap-2">
            {links.map((l, i) => {
              const active = isActive(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  prefetch
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between text-2xl sm:text-3xl font-display font-bold py-2.5 px-4 rounded-2xl transition-all duration-300 ${
                    active
                      ? "bg-white/10 text-white border border-white/15"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                  style={{
                    opacity: open ? 1 : 0,
                    transform: open ? "translateY(0)" : "translateY(16px)",
                    transitionDelay: `${i * 50 + 100}ms`,
                  }}
                >
                  <span>{l.label}</span>
                  {active ? (
                    <span className="h-2 w-2 rounded-full bg-accent" />
                  ) : (
                    <ArrowUpRight size={20} className="opacity-40" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Quick Contact CTA in Drawer */}
          <div
            className="mt-6 pt-6 border-t border-white/10 flex flex-col gap-4"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(16px)",
              transitionDelay: `${links.length * 50 + 100}ms`,
            }}
          >
            <Link
              href="/contact"
              prefetch
              onClick={() => setOpen(false)}
              className="w-full py-3.5 px-6 rounded-2xl bg-white text-ink font-semibold text-center flex items-center justify-center gap-2 text-base shadow-xl hover:bg-white/90 active:scale-[0.98] transition-all"
            >
              Get in Touch <ArrowUpRight size={18} />
            </Link>

            <a
              href="mailto:info@blyntech.com"
              className="flex items-center justify-center gap-2 text-sm text-white/60 hover:text-white font-mono py-2"
            >
              <Mail size={15} className="text-accent" /> info@blyntech.com
            </a>
          </div>
        </div>

        {/* Footer info in Mobile Drawer */}
        <div
          className="px-6 sm:px-8 py-6 border-t border-white/10 bg-white/[0.02] text-xs text-white/40 flex justify-between items-center max-w-md w-full mx-auto"
          style={{
            opacity: open ? 1 : 0,
            transitionDelay: `${links.length * 50 + 200}ms`,
          }}
        >
          <span>© {new Date().getFullYear()} Blyn Tech</span>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover:text-white transition-colors"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="hover:text-white transition-colors"
            >
              <Twitter size={16} />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="hover:text-white transition-colors"
            >
              <Instagram size={16} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

