import { NextResponse, type NextRequest } from "next/server";

const LOCALES = ["fr", "en"] as const;
type Locale = (typeof LOCALES)[number];
const COOKIE_KEY = "vaultaweb_lang";

function detectLocale(req: NextRequest): Locale {
  // 1) Choix mémorisé par l'utilisateur
  const cookie = req.cookies.get(COOKIE_KEY)?.value;
  if (cookie === "fr" || cookie === "en") return cookie;

  // 2) Langue du navigateur (Accept-Language) : francophone -> fr, sinon en
  const accept = req.headers.get("accept-language")?.toLowerCase() ?? "";
  const first = accept.split(",")[0]?.trim() ?? "";
  return first.startsWith("fr") ? "fr" : "en";
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Déjà préfixé par une locale -> on laisse passer
  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return NextResponse.next();

  // Sinon on redirige vers la version localisée (preserve le sous-chemin)
  const locale = detectLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Exclut : assets _next, routes api, dashboard (non localisé), et tout
  // fichier avec extension (sitemap.xml, robots.txt, images, manifest...).
  matcher: ["/((?!_next|api|dashboard|.*\\..*).*)"],
};
