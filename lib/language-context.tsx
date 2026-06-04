"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { translations, FRANCOPHONE_COUNTRIES, type Lang } from "@/config/i18n";

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (typeof translations)["fr"];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "volta_lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    // 1) Préférence déjà choisie ?
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored === "fr" || stored === "en") {
      setLangState(stored);
      return;
    }

    // 2) Détection par IP (pays). Hors zone francophone -> anglais.
    let cancelled = false;
    fetch("https://ipapi.co/country/")
      .then((r) => (r.ok ? r.text() : Promise.reject()))
      .then((country) => {
        if (cancelled) return;
        const code = country.trim().toUpperCase();
        const detected: Lang = FRANCOPHONE_COUNTRIES.includes(code) ? "fr" : "en";
        setLangState(detected);
      })
      .catch(() => {
        // 3) Repli : langue du navigateur
        if (cancelled) return;
        const nav = navigator.language?.toLowerCase() ?? "fr";
        setLangState(nav.startsWith("fr") ? "fr" : "en");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
    document.documentElement.lang = l;
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
