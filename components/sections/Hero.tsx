"use client";

import { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";
import { Star } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { LiquidGlassLayers, GlassFilter } from "@/components/ui/liquid-glass-button";
import Beams from "@/components/ui/ethereal-beams";

const EASE = [0.33, 1, 0.68, 1] as const;

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

interface HeroProps {
  isLoaded: boolean;
}

export function Hero({ isLoaded }: HeroProps) {
  const show = isLoaded;

  // Fond léger par défaut (sûr). On n'active le WebGL des beams QUE sur desktop
  // performant : jamais sur mobile/tactile/reduced-motion → pas de crash.
  const [useBeams, setUseBeams] = useState(false);
  useEffect(() => {
    const okSize = window.matchMedia("(min-width: 768px)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (okSize && finePointer && !reduced) setUseBeams(true);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-bg">
      {/* Fond */}
      <div className="absolute inset-0 z-0">
        {useBeams ? (
          <Beams
            beamWidth={2.5}
            beamHeight={18}
            beamNumber={15}
            lightColor="#B8FF2E"
            speed={2.2}
            noiseIntensity={2}
            scale={0.15}
            rotation={43}
            backgroundColor="#0f1511"
          />
        ) : (
          // Fond statique léger (mobile) — dégradés lime sur vert forêt
          <div
            className="w-full h-full"
            style={{
              background:
                "radial-gradient(ellipse 90% 60% at 50% -10%, rgba(184,255,46,0.12), transparent 60%), radial-gradient(ellipse 70% 50% at 80% 20%, rgba(255,74,40,0.06), transparent 55%), var(--bg)",
            }}
          />
        )}
      </div>

      {/* Voile pour la lisibilité */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-bg via-bg/30 to-bg/50 pointer-events-none" />

      {/* Contenu */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 w-full">
          <div className="mx-auto max-w-3xl text-center">

            <motion.div
              className="mb-8 inline-flex items-center rounded-full bg-fg/5 backdrop-blur-xl border border-[var(--border-color)] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-fg/80"
              initial={{ opacity: 0, y: 12 }}
              animate={show ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <Star className="mr-2 h-3.5 w-3.5 text-accent" fill="currentColor" stroke="none" />
              Studio créatif · {siteConfig.studio.location}
            </motion.div>

            <motion.h1
              className="mb-6 font-sans font-black text-[clamp(2.6rem,7vw,6rem)] leading-[0.95] tracking-tight text-fg text-balance"
              initial={{ opacity: 0, y: 28 }}
              animate={show ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
            >
              {siteConfig.studio.tagline}
            </motion.h1>

            <motion.p
              className="mb-10 mx-auto max-w-xl text-[1.05rem] sm:text-xl leading-relaxed text-muted-fg"
              initial={{ opacity: 0, y: 20 }}
              animate={show ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.16 }}
            >
              {siteConfig.studio.description}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={show ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.26 }}
            >
              <Button asChild size="lg">
                <TransitionLink href="#works" color="var(--accent)">
                  Voir nos travaux
                  <svg className="ml-2" width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </TransitionLink>
              </Button>
              <TransitionLink
                href="#contact"
                color="var(--accent-warm)"
                className="relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full px-8 font-sans font-bold text-[13px] uppercase tracking-[0.15em] text-fg transition-transform duration-300 hover:scale-105"
              >
                <LiquidGlassLayers />
                <span className="relative z-10">Faire un devis gratuit</span>
                <GlassFilter />
              </TransitionLink>
            </motion.div>

            <motion.div
              className="mt-14 grid grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={show ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.36 }}
            >
              {[
                { value: 400, label: "Projets réalisés" },
                { value: 220, label: "Refontes" },
                { value: 130, label: "Automatisations" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-[var(--border-color)] bg-bg/40 backdrop-blur-md px-3 py-5 sm:px-5 sm:py-6 flex flex-col items-center gap-1"
                >
                  <span className="font-sans font-black text-[clamp(1.5rem,4vw,2.5rem)] leading-none text-accent tabular-nums">
                    <CountUp value={stat.value} suffix="+" start={show} />
                  </span>
                  <span className="font-mono text-[8px] sm:text-[10px] uppercase tracking-[0.12em] text-muted-fg text-center leading-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
