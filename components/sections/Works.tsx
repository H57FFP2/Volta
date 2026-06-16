"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  animate,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { siteConfig } from "@/config/site";
import { useLang } from "@/lib/language-context";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { CtaBanner } from "@/components/ui/CtaBanner";

function ProjectThumb({ color, image, title }: { color: string; image?: string; title: string }) {
  if (image) {
    return (
      <div className="absolute inset-0">
        <img
          src={image}
          alt={`${title} — site web réalisé par VAULTAWEB`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }
  return (
    <div className="absolute inset-0" style={{ backgroundColor: color }}>
      <div
        className="absolute bottom-0 left-0 w-3/4 h-3/4 opacity-20"
        style={{
          background: "rgba(0,0,0,0.3)",
          clipPath: "polygon(0 100%, 100% 30%, 100% 100%)",
        }}
      />
      <div
        className="absolute top-1/4 right-1/4 w-1/3 h-1/3 rounded-full opacity-15"
        style={{ background: "rgba(255,255,255,0.6)" }}
      />
    </div>
  );
}

const EASE        = [0.33, 1, 0.68, 1] as const;
const MAX_DEG     = 5;
const SPRING_CFG  = { stiffness: 280, damping: 26, mass: 0.5 };

function CountUp({ value, suffix, start }: { value: number; suffix?: string; start: boolean }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!start) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [start, value]);
  return (
    <>
      {display}
      {suffix}
    </>
  );
}

function WorksStats() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  return (
    <motion.div
      ref={ref}
      className="mb-16 md:mb-20 grid grid-cols-3 gap-3 sm:gap-5 max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {t.hero.stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-[var(--border-color)] bg-bg/40 backdrop-blur-md px-4 py-7 sm:px-6 sm:py-10 flex flex-col items-center gap-2 transition-[border-color,background-color,box-shadow] duration-300 hover:border-[rgba(184,255,46,0.5)] hover:bg-bg/60 hover:shadow-[0_0_45px_-10px_rgba(184,255,46,0.4)]"
        >
          <span className="font-sans font-black text-[clamp(2.25rem,6vw,4.5rem)] leading-none text-accent tabular-nums">
            <CountUp value={stat.value} suffix="+" start={inView} />
          </span>
          <span className="font-mono text-[9px] sm:text-[12px] uppercase tracking-[0.12em] text-muted-fg text-center leading-tight">
            {stat.label}
          </span>
        </div>
      ))}
    </motion.div>
  );
}

function WorkCard({
  project,
  category,
}: {
  project: (typeof siteConfig.works)[0];
  category: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawX, SPRING_CFG);
  const rotateY = useSpring(rawY, SPRING_CFG);

  const glareLeft = useTransform(rotateY, [-MAX_DEG, MAX_DEG], [0, 100]);
  const glareTop  = useTransform(rotateX, [MAX_DEG, -MAX_DEG], [0, 100]);
  const glare     = useMotionTemplate`radial-gradient(circle at ${glareLeft}% ${glareTop}%, rgba(255,255,255,0.11) 0%, transparent 62%)`;

  const shadowX  = useTransform(rotateY, [-MAX_DEG, MAX_DEG], [-18, 18]);
  const shadowY  = useTransform(rotateX, [-MAX_DEG, MAX_DEG], [18, -18]);
  const boxShadow = useMotionTemplate`${shadowX}px ${shadowY}px 52px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.3)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    const xNorm = ((e.clientX - rect.left)  / rect.width)  * 2 - 1;
    const yNorm = ((e.clientY - rect.top)   / rect.height) * 2 - 1;
    rawY.set(xNorm  *  MAX_DEG);
    rawX.set(yNorm  * -MAX_DEG);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const url = (project as { url?: string }).url;

  const handleClick = () => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      ref={wrapperRef}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={url ? "cursor-pointer" : undefined}
    >
      <motion.article
        className="relative overflow-hidden rounded-sm"
        style={{
          height: "clamp(280px, 36vw, 520px)",
          rotateX,
          rotateY,
          boxShadow,
          willChange: "transform",
        }}
        whileHover="hovered"
        initial="idle"
      >

        <motion.div
          className="absolute inset-0"
          variants={{ idle: { scale: 1 }, hovered: { scale: 1.05 } }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <ProjectThumb color={project.color} image={(project as { image?: string }).image} title={project.title} />
        </motion.div>

        <motion.div
          className="absolute inset-0 bg-bg pointer-events-none"
          variants={{ idle: { opacity: 0 }, hovered: { opacity: 0.28 } }}
          transition={{ duration: 0.4 }}
        />

        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: glare }}
        />

        <motion.div
          className="absolute bottom-6 left-6 md:bottom-8 md:left-8"
          style={{ originX: 0, originY: 1 }}
          variants={{ idle: { scale: 1 }, hovered: { scale: 1.2 } }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <h3 className="font-sans font-black text-[clamp(1.4rem,3vw,2.4rem)] text-bg/90 leading-none">
            {project.title}
          </h3>
          <p className="font-sans text-[11px] uppercase tracking-[0.15em] text-bg/60 mt-1">
            {category} · {project.year}
          </p>
        </motion.div>
      </motion.article>
    </div>
  );
}

export function Works() {
  const { t } = useLang();
  return (
    <section id="works" className="px-6 md:px-10 py-24 md:py-36">
      <div className="flex items-end justify-between mb-16 md:mb-20">
        <TextReveal
          as="h2"
          className="font-sans font-black text-[clamp(2.5rem,7vw,6rem)] leading-none text-fg"
        >
          {t.works.title}
        </TextReveal>
      </div>

      <WorksStats />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        {siteConfig.works.map((project, i) => (
          <ScrollReveal key={project.id} delay={i * 0.1} direction="up">
            <WorkCard project={project} category={t.works.items[i]?.category ?? project.category} />
          </ScrollReveal>
        ))}
      </div>

      <CtaBanner text={t.ctaBanner.works} />
    </section>
  );
}
