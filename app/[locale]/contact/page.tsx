import type { Metadata } from "next";
import { translations, type Lang } from "@/config/i18n";
import ContactPageClient from "./ContactPageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang: Lang = locale === "en" ? "en" : "fr";
  const seo = translations[lang].seo.contact;

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: `/${lang}/contact`,
      languages: {
        fr: "/fr/contact",
        en: "/en/contact",
        "x-default": "/fr/contact",
      },
    },
    openGraph: {
      url: `/${lang}/contact`,
      title: seo.title,
      description: seo.description,
    },
  };
}

export default function Page() {
  return <ContactPageClient />;
}
