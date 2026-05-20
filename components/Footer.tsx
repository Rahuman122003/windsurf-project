"use client";
import { Linkedin, Youtube, Instagram, Facebook, Dribbble, Twitter, Mail, Phone } from "lucide-react";
import logoDark from "@/assets/blyndarklogo.png";

type FooterLink = { label: string; href: string };
const cols: { title: string; links: FooterLink[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/stories" },
      { label: "Story", href: "/stories" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/insights" },
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
      { label: "Blog", href: "/insights" },
      { label: "Case Studies", href: "/work" },
      { label: "PROX", href: "/prox" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="max-w-container mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          <div className="col-span-2 md:col-span-1">
            <img src={logoDark.src} alt="Blyn" className="h-10 w-auto" />
            <p className="mt-4 text-sm text-white/60 leading-relaxed">
              A premium digital agency crafting cinematic products and brand experiences.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-xs uppercase tracking-[0.25em] text-white/50 mb-5">{c.title}</div>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="nav-link text-[15px] text-white/85 hover:text-white">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 py-8 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
            <a href="mailto:hello@blyn.co" className="inline-flex items-center gap-2 hover:text-white"><Mail size={16}/> hello@blyn.co</a>
            <a href="tel:+10000000000" className="inline-flex items-center gap-2 hover:text-white"><Phone size={16}/> +1 (000) 000-0000</a>
          </div>
          <div className="flex md:justify-end items-center gap-3">
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
                className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-ink transition"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4 pt-8 border-t border-white/10 text-xs text-white/50">
          <div>© {new Date().getFullYear()} Blyn. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="/contact" className="hover:text-white">Privacy Policy</a>
            <a href="/contact" className="hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
