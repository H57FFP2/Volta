"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import { TextReveal } from "@/components/ui/TextReveal";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="services" className="px-6 md:px-10 py-24 md:py-36 border-t border-[var(--border-color)]">

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
        <TextReveal
          as="h2"
          className="font-sans font-black text-[clamp(2.5rem,7vw,6rem)] leading-none text-fg max-w-lg"
        >
          Ce que nous faisons
        </TextReveal>
        <ScrollReveal direction="left" delay={0.2}>
          <p className="font-sans text-[clamp(1.25rem,2.2vw,2rem)] text-muted-fg max-w-xl leading-snug md:text-right">
            Vous êtes maître de vos propres décisions.
          </p>
        </ScrollReveal>
      </div>

      <ul className="divide-y divide-[var(--border-color)]">
        {siteConfig.services.map((service, i) => (
          <li key={i}>
            <button
              className="w-full flex items-center justify-between py-7 md:py-9 group text-left"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
            >

              <div className="flex items-baseline gap-6 md:gap-10">
                <span className="font-mono text-[11px] tracking-[0.2em] text-muted-fg shrink-0">
                  {service.index}
                </span>
                <span
                  className="font-sans font-black text-[clamp(1.6rem,4vw,3.5rem)] leading-none text-fg transition-colors duration-200 group-hover:text-accent"
                >
                  {service.title}
                </span>
              </div>

              <motion.span
                className="shrink-0 ml-4 w-8 h-8 rounded-full border border-[var(--border-color)] flex items-center justify-center text-muted-fg group-hover:border-accent group-hover:text-accent transition-colors duration-200"
                animate={{ rotate: openIndex === i ? 45 : 0 }}
                transition={{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M6 1v10M1 6h10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.span>
            </button>

            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-9 pl-[calc(1rem+3rem)] md:pl-[calc(1rem+5.5rem)] font-sans text-[clamp(1.1rem,2vw,1.6rem)] text-muted-fg leading-relaxed max-w-3xl">
                    {service.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
    </section>
  );
}
