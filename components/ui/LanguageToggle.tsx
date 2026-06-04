"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Check } from "lucide-react";
import { useLang } from "@/lib/language-context";
import type { Lang } from "@/config/i18n";

const OPTIONS: { code: Lang; label: string }[] = [
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
];

const EASE_EXPO = [0.76, 0, 0.24, 1] as const;
const EASE_OUT = [0.33, 1, 0.68, 1] as const;

export function LanguageToggle() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const [transition, setTransition] = useState<{ cx: number; cy: number; code: Lang } | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

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

    // Centre du cercle = centre du bouton globe
    const rect = btnRef.current?.getBoundingClientRect();
    const cx = rect ? rect.left + rect.width / 2 : window.innerWidth;
    const cy = rect ? rect.top + rect.height / 2 : 0;
    setTransition({ cx, cy, code });

    // Bascule la langue pendant que l'overlay couvre tout
    setTimeout(() => setLang(code), 450);
    // Ferme l'overlay
    setTimeout(() => setTransition(null), 1150);
  };

  return (
    <>
      <div ref={ref} className="fixed top-5 right-5 z-[60]">
        <button
          ref={btnRef}
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

      {/* Transition circle-expand */}
      <AnimatePresence>
        {transition && (
          <motion.div
            className="fixed top-0 left-0 w-screen z-[9990] flex items-center justify-center overflow-hidden pointer-events-none"
            style={{ backgroundColor: "var(--accent)", height: "160vh" }}
            initial={{ clipPath: `circle(0px at ${transition.cx}px ${transition.cy}px)` }}
            animate={{ clipPath: `circle(260vmax at ${transition.cx}px ${transition.cy}px)` }}
            exit={{
              clipPath: `circle(0px at ${transition.cx}px ${transition.cy}px)`,
              transition: { duration: 0.5, ease: EASE_EXPO },
            }}
            transition={{ duration: 0.7, ease: EASE_EXPO }}
          >
            <motion.span
              className="font-sans font-black uppercase tracking-[0.1em] select-none"
              style={{ color: "#0f1511", fontSize: "clamp(3rem, 10vw, 7rem)" }}
              initial={{ opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.22, duration: 0.42, ease: EASE_OUT }}
            >
              {transition.code === "fr" ? "Français" : "English"}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
