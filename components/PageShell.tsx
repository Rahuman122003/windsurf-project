import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: string;
  lede: string;
  children: ReactNode;
};

/**
 * Shared dark-theme shell for the detailed sub-pages.
 * Pure black background, white text, generous typography.
 */
export default function PageShell({ eyebrow, title, lede, children }: Props) {
  return (
    <div className="bg-ink text-white min-h-screen">
      <section className="pt-40 pb-20 px-6 lg:px-10 max-w-container mx-auto">
        <div className="text-xs uppercase tracking-[0.3em] text-white/50 mb-6">{eyebrow}</div>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.02] tracking-tight">
          {title}
        </h1>
        <p className="mt-8 text-xl md:text-2xl text-white/70 max-w-3xl leading-relaxed">{lede}</p>
      </section>
      {children}
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
