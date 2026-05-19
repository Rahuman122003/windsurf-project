"use client";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

/**
 * Variants — all share the same metal/prism palette but differ in shape & weight:
 *  - "prism"   : dark pill + iridescent ring icon badge (the original hero CTA)
 *  - "silver"  : light brushed-chrome pill with arrow on the right
 *  - "ghost"   : transparent outline pill, hairline border, hover fills metal
 *  - "solid"   : compact gunmetal pill, inline icon, dense + utilitarian
 *  - "link"    : underline-only text link with arrow, no chrome
 */
export type ButtonVariant = "prism" | "silver" | "ghost" | "solid" | "link";

type Props = {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  icon?: LucideIcon;
  className?: string;
  size?: number; // icon circle diameter in px (prism variant only)
  variant?: ButtonVariant;
};

export default function PrismButton({
  href,
  onClick,
  children,
  icon: Icon = ArrowUpRight,
  className = "",
  size = 52,
  variant = "prism",
}: Props) {
  let content: ReactNode;
  let baseClass: string;

  if (variant === "prism") {
    baseClass = "btn-prism";
    content = (
      <>
        <span className="btn-prism-icon" style={{ ["--prism-size" as any]: `${size}px` }}>
          <Icon size={Math.round(size * 0.42)} />
        </span>
        <span className="btn-prism-label">{children}</span>
      </>
    );
  } else if (variant === "silver") {
    baseClass = "btn-silver";
    content = (
      <>
        <span className="btn-silver-label">{children}</span>
        <Icon size={18} className="btn-silver-icon" />
      </>
    );
  } else if (variant === "ghost") {
    baseClass = "btn-ghost";
    content = (
      <>
        <span>{children}</span>
        <Icon size={16} />
      </>
    );
  } else if (variant === "solid") {
    baseClass = "btn-solid";
    content = (
      <>
        <span>{children}</span>
        <Icon size={16} />
      </>
    );
  } else {
    baseClass = "btn-link";
    content = (
      <>
        <span>{children}</span>
        <Icon size={16} />
      </>
    );
  }

  const classes = `${baseClass} ${className}`.trim();
  if (href) {
    const isInternal = href.startsWith("/") && !href.startsWith("//");
    if (isInternal) {
      return (
        <Link href={href} prefetch onClick={onClick} className={classes}>
          {content}
        </Link>
      );
    }
    return (
      <a href={href} onClick={onClick} className={classes}>
        {content}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
