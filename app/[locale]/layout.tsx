import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fontVariables } from "@/lib/fonts";
import { LenisProvider } from "@/lib/lenis-provider";
import { LanguageProvider } from "@/lib/language-context";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { VisitTracker } from "@/components/VisitTracker";
import { siteConfig } from "@/config/site";
import { translations, type Lang } from "@/config/i18n";
import "../globals.css";

const LOCALES: Lang[] = ["fr", "en"];

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang: Lang = locale === "en" ? "en" : "fr";
  const seo = translations[lang].seo.home;

  return {
    metadataBase: new URL(siteConfig.studio.url),
    title: {
      default: seo.title,
      template: `%s | ${siteConfig.studio.name}`,
    },
    description: seo.description,
    applicationName: siteConfig.studio.name,
    authors: [{ name: siteConfig.studio.name }],
    creator: siteConfig.studio.name,
    icons: {
      icon: "/VOLTAWEB/VOLTAGREEN2.png",
      shortcut: "/VOLTAWEB/VOLTAGREEN2.png",
      apple: "/VOLTAWEB/VOLTAGREEN2.png",
    },
    openGraph: {
      siteName: siteConfig.studio.name,
      locale: lang === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.studio.name,
    url: siteConfig.studio.url,
    email: siteConfig.studio.email,
    image: `${siteConfig.studio.url}/VOLTAWEB/VOLTAGREEN2.png`,
    description: siteConfig.studio.description,
    telephone: siteConfig.contact.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Montréal",
      addressRegion: "QC",
      addressCountry: "CA",
    },
    areaServed: "CA",
    priceRange: "$$",
    sameAs: [
      siteConfig.contact.instagram.url,
      siteConfig.contact.tiktok.url,
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "fr" && locale !== "en") notFound();
  const lang = locale as Lang;

  return (
    <html lang={lang} className={fontVariables}>
      <body className="bg-bg text-fg font-sans">
        <LanguageProvider lang={lang}>
          <LanguageToggle />
          <VisitTracker />
          <LenisProvider>{children}</LenisProvider>
        </LanguageProvider>
        <OrganizationJsonLd />
      </body>
    </html>
  );
}
