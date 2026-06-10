"use client";

import { TransitionLink } from "@/components/ui/TransitionLink";
import { useLang } from "@/lib/language-context";

// Bandeau d'appel à l'action vers la section contact (transition circle-expand).
export function CtaBanner({ text }: { text: string }) {
  const { t } = useLang();

  return (
    <div className="mt-16 md:mt-24 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-[var(--border-color)] bg-muted/40 px-8 py-8 md:px-12 md:py-10">
      <p className="font-sans font-black text-[clamp(1.3rem,3vw,2.2rem)] leading-tight tracking-tight text-fg text-center sm:text-left">
        {text}
      </p>
      <TransitionLink
        href="#contact"
        color="var(--accent)"
        label={t.hero.quoteLabel}
        className="group shrink-0 inline-flex items-center gap-3 rounded-full bg-accent text-bg px-8 py-4 font-sans font-bold text-[13px] uppercase tracking-[0.15em] hover:bg-fg transition-colors duration-300"
      >
        {t.ctaBanner.button}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover:translate-x-1 transition-transform">
          <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </TransitionLink>
    </div>
  );
}
