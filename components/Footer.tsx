"use client";
import { Linkedin, Youtube, Instagram, Facebook, Dribbble, Twitter, Mail } from "lucide-react";
import logoLight from "@/assets/blyndarklogo.png";

type FooterLink = { label: string; href: string };
const cols: { title: string; links: FooterLink[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/stories" },
      { label: "Story", href: "/stories" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "https://blogsbyprobiz.vercel.app/blyn-tech/blogs" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Design", href: "/services" },
      { label: "Engineering", href: "/services" },
      { label: "Gen AI", href: "/services" },
      { label: "Cloud", href: "/services" },
    ],
  },
  {
    title: "Other",
    links: [
      { label: "Blogs", href: "https://blogsbyprobiz.vercel.app/blyn-tech/blogs" },
      { label: "Case Studies", href: "/work" },
      { label: "PROX", href: "/prox" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white border-t border-white/10">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-12 sm:mb-14">
          <div className="sm:col-span-2 md:col-span-1">
            <img src={logoLight.src} alt="Blyn" className="h-14 sm:h-19 w-auto" />
            <p className="mt-4 text-sm text-white/60 leading-relaxed max-w-sm">
              A premium digital agency crafting cinematic products and brand experiences.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-xs uppercase tracking-[0.25em] text-white/50 font-mono mb-4 sm:mb-5">{c.title}</div>
              <ul className="space-y-2.5 sm:space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="nav-link text-sm sm:text-[15px] text-white/85 hover:text-white transition-colors">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 py-6 sm:py-8 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
            <a href="mailto:info@blyntech.com" className="inline-flex items-center gap-2 hover:text-white font-mono text-xs sm:text-sm"><Mail size={16} className="text-accent"/> info@blyntech.com</a>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {[
              { Icon: Linkedin, href: "https://www.linkedin.com/", label: "LinkedIn" },
              { Icon: Youtube, href: "https://www.youtube.com/", label: "YouTube" },
              { Icon: Instagram, href: "https://www.instagram.com/", label: "Instagram" },
              { Icon: Facebook, href: "https://www.facebook.com/", label: "Facebook" },
              { Icon: Dribbble, href: "https://dribbble.com/", label: "Dribbble" },
              { Icon: Twitter, href: "https://twitter.com/", label: "Twitter" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-ink transition-colors duration-200"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 sm:pt-8 border-t border-white/10 text-xs text-white/50">
          <div>© {new Date().getFullYear()} Blyn. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="/contact" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/contact" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

