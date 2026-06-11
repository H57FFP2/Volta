import type { Metadata } from "next";
import { translations, type Lang } from "@/config/i18n";
import HomePageClient from "./HomePageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang: Lang = locale === "en" ? "en" : "fr";
  const seo = translations[lang].seo.home;

  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        fr: "/fr",
        en: "/en",
        "x-default": "/fr",
      },
    },
    openGraph: {
      url: `/${lang}`,
      title: seo.title,
      description: seo.description,
    },
  };
}

export default function Page() {
  return <HomePageClient />;
}
