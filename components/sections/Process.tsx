"use client";

import { TextReveal } from "@/components/ui/TextReveal";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useLang } from "@/lib/language-context";

export function Process() {
  const { t } = useLang();
  return (
    <section className="px-6 md:px-10 py-24 md:py-36 bg-muted" id="process">
      <TextReveal
        as="h2"
        className="font-sans font-black text-[clamp(2.5rem,7vw,6rem)] leading-none text-fg mb-16 md:mb-24"
      >
        {t.process.title}
      </TextReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-20">
        {t.process.steps.map((step, i) => (
          <ScrollReveal key={i} delay={i * 0.15} direction="up">
            <article className="relative">

              <p
                className="font-sans font-black select-none leading-none mb-6"
                style={{
                  fontSize: "clamp(5rem, 12vw, 9rem)",
                  color: "transparent",
                  WebkitTextStroke: "1px var(--border-color)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </p>

              <div className="w-8 h-px bg-accent mb-5" />

              <h3 className="font-sans font-black text-[clamp(1.4rem,3vw,2rem)] text-fg mb-4 leading-tight">
                {step.title}
              </h3>

              <p className="font-sans text-[14px] text-muted-fg leading-relaxed">
                {step.description}
              </p>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
