"use client";

import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLang } from "@/lib/language-context";
import { BackToTop } from "@/components/layout/BackToTop";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="relative border-t border-[var(--border-color)] px-6 md:px-10 pt-16 pb-32 md:pb-20">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-between gap-6 pb-12 border-b border-[var(--border-color)]">
          <img
            src="/VOLTAWEB/VOLTAWHITE2.png"
            alt={siteConfig.studio.name}
            className="h-16 md:h-20 w-auto opacity-50"
          />
          <div className="flex items-center gap-3 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="font-mono text-[11px] text-muted-fg tracking-widest uppercase">
              {siteConfig.studio.location}
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 py-10">
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {siteConfig.nav.links.map((link, i) => (
              <a
                key={link.href}
                href={`/${link.href}`}
                className="font-sans text-[14px] font-semibold uppercase tracking-[0.1em] text-muted-fg hover:text-accent transition-colors duration-200"
              >
                {t.nav[i] ?? link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-2 md:items-end">
            <a
              href={`mailto:${siteConfig.studio.email}`}
              className="font-sans text-[14px] text-fg hover:text-accent transition-colors duration-200"
            >
              {siteConfig.studio.email}
            </a>
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
              className="font-mono text-[13px] text-muted-fg hover:text-fg transition-colors duration-200"
            >
              {siteConfig.contact.phone}
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-[var(--border-color)]">
          <div className="flex items-center gap-6">
            <a
              href={siteConfig.contact.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-muted-fg hover:text-fg transition-colors duration-200"
            >
              Instagram
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a
              href={siteConfig.contact.tiktok.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-muted-fg hover:text-fg transition-colors duration-200"
            >
              TikTok
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          <p className="font-mono text-[11px] text-muted-fg tracking-widest uppercase">
            © {siteConfig.studio.year} {siteConfig.studio.name}. {t.footer.legal}
          </p>
        </div>
      </div>

      <BackToTop />
    </footer>
  );
}
