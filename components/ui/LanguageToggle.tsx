"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import { useLang } from "@/lib/language-context";
import type { Lang } from "@/config/i18n";

const OPTIONS: { code: Lang; label: string }[] = [
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
];

export function LanguageToggle() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const choose = (code: Lang) => {
    setOpen(false);
    if (code === lang) return;
    setLang(code);
  };

  return (
    <div ref={ref} className="fixed top-5 right-5 z-[60]">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Changer de langue"
        className="flex items-center gap-2 rounded-full border border-[var(--border-color)] bg-bg/70 backdrop-blur-md px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-fg hover:border-accent transition-colors duration-200"
      >
        <Globe className="w-4 h-4 text-accent" />
        {lang.toUpperCase()}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-xl border border-[var(--border-color)] bg-muted/95 backdrop-blur-md overflow-hidden shadow-xl">
          {OPTIONS.map((opt) => (
            <button
              key={opt.code}
              onClick={() => choose(opt.code)}
              className="w-full flex items-center justify-between px-4 py-3 font-sans text-[13px] text-fg hover:bg-bg/60 transition-colors duration-150"
            >
              {opt.label}
              {lang === opt.code && <Check className="w-4 h-4 text-accent" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
