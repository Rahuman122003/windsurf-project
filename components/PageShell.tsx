import type { ReactNode } from "react";
import PageHero from "./PageHero";
import SectionReveal from "./SectionReveal";

type Props = {
  eyebrow: string;
  title: string;
  lede: string;
  children: ReactNode;
};

/**
 * Shared dark-theme shell for the detailed sub-pages.
 * Cinematic hero (WebGL aurora + char-split title) and scroll-reveal
 * for every nested `<section>` (DetailSection) inside `children`.
 */
export default function PageShell({ eyebrow, title, lede, children }: Props) {
  return (
    <div className="bg-ink text-white min-h-screen overflow-x-clip">
      <PageHero eyebrow={eyebrow} title={title} lede={lede} />
      <SectionReveal>{children}</SectionReveal>
    </div>
  );
}

export function DetailSection({
  eyebrow,
  title,
  children,
  className = "",
}: {
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`px-6 lg:px-10 max-w-container mx-auto py-20 lg:py-28 border-t border-white/10 ${className}`}>
      {eyebrow && (
        <div className="text-xs uppercase tracking-[0.3em] text-white/50 mb-4">{eyebrow}</div>
      )}
      {title && (
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl mb-12">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
