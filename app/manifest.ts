import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.studio.name,
    short_name: siteConfig.studio.name,
    description: siteConfig.studio.description,
    start_url: "/fr",
    display: "standalone",
    background_color: "#0f1511",
    theme_color: "#0f1511",
    icons: [
      {
        src: "/VOLTAWEB/VOLTAGREEN2.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
