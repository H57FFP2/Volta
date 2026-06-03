import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import { LenisProvider } from "@/lib/lenis-provider";
import { siteConfig } from "@/config/site";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.studio.name,
    template: `%s | ${siteConfig.studio.name}`,
  },
  description: siteConfig.studio.description,
  openGraph: {
    title: siteConfig.studio.name,
    description: siteConfig.studio.description,
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${outfit.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-bg text-fg font-sans">
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
