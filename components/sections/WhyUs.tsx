"use client";

import { PenTool, Gauge, LifeBuoy, BadgePercent, Sparkles } from "lucide-react";
import { TextReveal } from "@/components/ui/TextReveal";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useLang } from "@/lib/language-context";

const ICONS = [PenTool, Gauge, LifeBuoy, BadgePercent, Sparkles];

export function WhyUs() {
  const { t } = useLang();

  return (
    <section
      id="why-us"
      className="relative bg-bg px-6 md:px-10 py-24 md:py-36 border-t border-[var(--border-color)]"
    >
      <div className="mx-auto w-full max-w-[88rem]">
        <div className="mb-16 md:mb-24 max-w-3xl">
          <TextReveal
            as="h2"
            className="font-sans font-black text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] text-fg"
          >
            {t.why.title}
          </TextReveal>
        </div>

        <div className="grid grid-cols-1 gap-px border-t border-[var(--border-color)] bg-[var(--border-color)] sm:grid-cols-2 lg:grid-cols-5">
          {t.why.reasons.map((reason, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div
                key={reason.index}
                className="group relative overflow-hidden bg-bg transition-colors duration-500 hover:bg-[var(--muted)]"
              >
                <ScrollReveal
                  delay={i * 0.08}
                  distance={28}
                  className="flex h-full flex-col px-6 py-8 sm:px-8 sm:py-12 lg:px-8 lg:py-16"
                >
                  <div className="mb-6 flex items-start justify-between sm:mb-12 md:mb-16">
                    <Icon
                      className="h-9 w-9 text-fg/85 transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-110 group-hover:text-accent sm:h-11 sm:w-11"
                      strokeWidth={1.25}
                    />
                    <span className="select-none font-sans font-black leading-none text-[clamp(3rem,6vw,5rem)] text-[rgba(237,232,218,0.08)] transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:text-[rgba(184,255,46,0.22)]">
                      {reason.index}
                    </span>
                  </div>

                  <h3 className="mb-4 font-sans font-bold leading-[1.15] text-fg transition-colors duration-300 group-hover:text-accent text-[clamp(1.4rem,1.8vw,1.75rem)] sm:min-h-[3.45em]">
                    {reason.title}
                  </h3>
                  <p className="font-sans text-[clamp(0.95rem,1vw,1.0625rem)] leading-relaxed text-muted-fg transition-colors duration-300 group-hover:text-fg/75">
                    {reason.description}
                  </p>
                </ScrollReveal>

                <span className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-500 ease-out group-hover:w-full" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
