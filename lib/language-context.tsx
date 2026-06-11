"use client";

import { createContext, useCallback, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import { translations, type Lang } from "@/config/i18n";

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (typeof translations)["fr"];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const COOKIE_KEY = "vaultaweb_lang";

/**
 * La langue est désormais portée par l'URL (/fr, /en) : le provider reçoit la
 * locale courante depuis le segment dynamique [locale]. Changer de langue =
 * naviguer vers la même page sous l'autre préfixe, et mémoriser le choix dans
 * un cookie lu par le middleware pour les futures visites sur "/".
 */
export function LanguageProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const setLang = useCallback(
    (l: Lang) => {
      if (l === lang) return;
      document.cookie = `${COOKIE_KEY}=${l};path=/;max-age=31536000;samesite=lax`;
      const segments = pathname.split("/");
      // segments = ["", "fr", "contact", ...] -> on remplace le préfixe de langue
      if (segments[1] === "fr" || segments[1] === "en") {
        segments[1] = l;
      } else {
        segments.splice(1, 0, l);
      }
      router.push(segments.join("/") || `/${l}`);
    },
    [lang, pathname, router]
  );

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
