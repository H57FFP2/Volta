"use client";

import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLang } from "@/lib/language-context";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { Magnetic } from "@/components/ui/magnetic";

export function Collaboration() {
  const { t } = useLang();

  return (
    <section className="relative border-t border-[var(--border-color)] px-6 md:px-10 py-24 md:py-32 overflow-hidden">
      {/* Shader de tracés animés en fond */}
      <BackgroundPaths className="opacity-30" />

      <Magnetic strength={0.12} max={28} className="relative z-10 max-w-[88rem] mx-auto">
        {/* Box liquid glass (frost propre, sans distorsion bruitée) */}
        <div
          className="relative rounded-[2.5rem] overflow-hidden border border-white/10"
          style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }}
        >
          {/* Couche frost */}
          <div
            className="absolute inset-0 z-0 rounded-[2.5rem] backdrop-blur-sm"
            style={{ background: "rgba(255,255,255,0.03)" }}
          />
          {/* Reflets glossy des bords */}
          <div
            className="absolute inset-0 z-0 rounded-[2.5rem] pointer-events-none"
            style={{
              boxShadow:
                "inset 2px 2px 1px -1px rgba(255,255,255,0.18), inset -1px -1px 1px 0 rgba(255,255,255,0.10), inset 0 0 24px 4px rgba(255,255,255,0.04)",
            }}
          />

          {/* Contenu */}
          <a
            href="https://www.vokai.ca/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative z-10 flex flex-col items-center text-center px-8 py-14 md:px-16 md:py-20"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent mb-3 inline-flex items-center gap-1.5">
              {t.collab.eyebrow}
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </p>
            <h2 className="font-sans font-black text-[clamp(1.6rem,4vw,3rem)] leading-none tracking-tight text-accent mb-12">
              {t.collab.title}
            </h2>

            <div className="flex items-center gap-8 sm:gap-14">
              {/* Logo partenaire VOKAI */}
              <img
                src="/Image_20260527_161138_911.png"
                alt="VOKAI"
                className="h-56 sm:h-80 w-auto"
              />
              {/* X */}
              <span className="font-sans font-black text-accent leading-none select-none text-[clamp(5rem,12vw,10rem)]">
                ×
              </span>
              {/* Notre logo */}
              <img
                src="/VOLTAWEB/VOLTAWHITE2.png"
                alt={siteConfig.studio.name}
                className="h-48 sm:h-72 w-auto"
              />
            </div>

            <span className="mt-10 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-fg group-hover:text-fg transition-colors">
              vokai.ca
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </a>
        </div>
      </Magnetic>
    </section>
  );
}
