"use client";

import { useCallback } from "react";
import { cn } from "@/lib/utils";

interface TransitionLinkProps {
  href: string;
  color?: string;
  label?: string;
  className?: string;
  children: React.ReactNode;
}

export function TransitionLink({
  href,
  className,
  children,
}: TransitionLinkProps) {
  const sectionId = href.startsWith("#") ? href.slice(1) : href;

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const el = document.getElementById(sectionId);
      if (!el) return;
      const lenis = window.__lenis;
      if (lenis) lenis.scrollTo(el);
      else el.scrollIntoView({ behavior: "smooth" });
    },
    [sectionId]
  );

  return (
    <a
      href={`#${sectionId}`}
      onClick={handleClick}
      className={cn(className)}
    >
      {children}
    </a>
  );
}
