"use client";

import { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { StackingCards, type StackReason } from "@/components/ui/stacking-card";
import { TextReveal } from "@/components/ui/TextReveal";
import { useLang } from "@/lib/language-context";

const COLORS = ["#16321f", "#20422a", "#2a5436", "#356643", "#427e52"];

export function WhyUs() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  // Actif tant qu'une partie de la section est visible (tout le scroll des cartes)
  const inView = useInView(sectionRef, { margin: "-20% 0px -20% 0px" });

  const reasons: StackReason[] = t.why.reasons.map((r, i) => ({
    index: r.index,
    title: r.title,
    description: r.description,
    color: COLORS[i % COLORS.length],
    textColor: "#ede8da",
  }));

  return (
    <section id="why-us" ref={sectionRef} className="relative bg-bg">
      <div className="px-6 md:px-10 pt-24 md:pt-36 pb-8 md:pb-16">
        <TextReveal
          as="h2"
          className="font-sans font-black text-[clamp(2.5rem,7vw,6rem)] leading-none text-fg"
        >
          {t.why.title}
        </TextReveal>
      </div>

      <StackingCards reasons={reasons} />

      {/* Indicateur de scroll — fixé à droite pendant tout le défilement des cartes */}
      <AnimatePresence>
        {inView && (
          <motion.div
            className="fixed right-5 md:right-8 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center gap-3 pointer-events-none"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.4 }}
          >
            <span
              className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-fg"
              style={{ writingMode: "vertical-rl" }}
            >
              {t.why.scroll}
            </span>
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              className="text-accent"
            >
              <ArrowDown className="w-5 h-5" />
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
