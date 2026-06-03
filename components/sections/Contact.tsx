"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { siteConfig } from "@/config/site";

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const headline = siteConfig.contact.headline;
  const words = headline.split(" ");

  return (
    <section
      id="contact"
      ref={ref}
      className="px-6 md:px-10 py-24 md:py-40 border-t border-[var(--border-color)] relative overflow-hidden"
    >

      <motion.div
        className="absolute -right-32 -bottom-32 w-96 h-96 rounded-full border border-[var(--border-color)]"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full border border-[var(--border-color)]"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
        aria-hidden="true"
      />

      <motion.p
        className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-fg mb-10"
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        Travailler ensemble →
      </motion.p>

      <h2 className="font-sans font-black text-[clamp(2.2rem,7vw,7rem)] leading-[1.0] text-fg max-w-4xl mb-8">
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden leading-[1.1]">
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              animate={isInView ? { y: "0%" } : {}}
              transition={{
                duration: 0.75,
                ease: [0.33, 1, 0.68, 1],
                delay: 0.1 + i * 0.05,
              }}
            >
              {word}&nbsp;
            </motion.span>
          </span>
        ))}
      </h2>

      <motion.p
        className="font-sans text-[15px] text-muted-fg mb-14 max-w-md"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6, duration: 0.7 }}
      >
        {siteConfig.contact.subline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.75, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      >
        <Link
          href={siteConfig.contact.ctaHref}
          className="group inline-flex items-center gap-4 bg-accent text-bg px-8 py-5 rounded-full font-sans font-bold text-[14px] uppercase tracking-[0.15em] hover:bg-fg transition-colors duration-300"
        >
          {siteConfig.contact.cta}
          <span className="w-5 h-5 rounded-full bg-bg/20 flex items-center justify-center group-hover:translate-x-1 transition-transform duration-200">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M1 5h8M5 1l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Link>
      </motion.div>

      <motion.p
        className="mt-10 font-mono text-[13px] text-muted-fg"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.9 }}
      >
        ou directement :{" "}
        <a
          href={`mailto:${siteConfig.studio.email}`}
          className="text-fg hover:text-accent transition-colors duration-200 underline underline-offset-4"
        >
          {siteConfig.studio.email}
        </a>
      </motion.p>
    </section>
  );
}
