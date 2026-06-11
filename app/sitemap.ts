import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

const BASE = siteConfig.studio.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = ["", "/contact"];

  return paths.flatMap((path) => {
    const languages = {
      fr: `${BASE}/fr${path}`,
      en: `${BASE}/en${path}`,
    };
    return (["fr", "en"] as const).map((lang) => ({
      url: `${BASE}/${lang}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
      alternates: { languages },
    }));
  });
}
