"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { Star } from "lucide-react";

const SPEED_NORMAL = 0.45;
const SPEED_SLOW   = 0.08;
const FRICTION     = 0.93;
const MIN_VELOCITY = 0.12;
const RESUME_DELAY = 10000;
const LERP_DRAG    = 0.12;

const BG = "15,21,17";
const STOPS: [number, number][] = [
  [0,0.97],[6,0.88],[12,0.76],[19,0.62],[27,0.48],[36,0.35],
  [45,0.24],[54,0.15],[63,0.09],[71,0.05],[79,0.02],[87,0.01],[100,0.00],
];
const GRADIENT_TOP = `linear-gradient(in srgb-linear to bottom, ${
  STOPS.map(([p,a]) => `rgba(${BG},${a}) ${p}%`).join(", ")
})`;

const REVIEWS = [
  { quote: "Un site qui a transformé notre acquisition client. L'équipe a su capter les valeurs de notre marque avec une précision rare.", author: "Sarah M.",   stars: 4.7 },
  { quote: "Processus impeccable, résultat au-delà des attentes. On a levé notre Série A deux mois après le lancement du site.",       author: "Thomas K.",  stars: 5 },
  { quote: "La meilleure décision de l'année. Notre trafic a été multiplié par 6 en six mois. L'impact est mesurable et vrai.",        author: "Léa R.",     stars: 5 },
  { quote: "Une équipe qui comprend vraiment les enjeux business. Notre taux de conversion a doublé dès les deux mois.",             author: "Marc D.",    stars: 5 },
  { quote: "Design exceptionnel, délais respectés, communication parfaite. Exactement ce qu'on cherchait depuis longtemps.",          author: "Julie F.",   stars: 5 },
  { quote: "Le résultat dépasse tout ce qu'on imaginait. On recommande !",    author: "Antoine P.", stars: 5 },
  { quote: "Chaque détail pensé, chaque animation justifiée. Un travail de précision qu'on ne trouve nulle part ailleurs.",            author: "Camille B.", stars: 4.8 },
  { quote: "Investissement rentabilisé en trois semaines. Notre pipeline a explosé après le lancement. Je recommande sans hésiter.",   author: "Romain V.",  stars: 5 },
  { quote: "Rare de trouver une agence qui allie autant de talent créatif et de rigueur technique. Un vrai partenaire long terme.",    author: "Inès C.",    stars: 5 },
  { quote: "Notre ancienne agence prenait 6 mois pour livrer moitié moins bien. VOLTAWEB a livré en 4 semaines. Le jour et la nuit.",    author: "Kevin L.",   stars:4.6 },
] as const;

function ReviewCard({ review }: { review: typeof REVIEWS[number] }) {
  return (
    <div className="shrink-0 w-[80vw] max-w-[400px] sm:w-[400px] flex flex-col gap-5 rounded-2xl p-6 sm:p-8 border"
      style={{ backgroundColor:"var(--bg)", borderColor:"var(--border-color)", boxShadow:"0 4px 32px rgba(0,0,0,0.35)" }}>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-40" />
      <div className="flex gap-1">
        {Array.from({ length: review.stars }).map((_,i) => <Star key={i} size={13} fill="var(--accent)" stroke="none" />)}
      </div>
      <p className="font-sans text-[14px] leading-relaxed flex-1" style={{ color:"var(--fg)" }}>{review.quote}</p>
      <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor:"var(--border-color)" }}>
        <div className="w-9 h-9 rounded-full flex items-center justify-center font-black text-[12px] shrink-0"
          style={{ backgroundColor:"var(--muted)", color:"var(--accent)" }}>
          {review.author.charAt(0)}
        </div>
        <p className="font-sans font-semibold text-[13px]" style={{ color:"var(--fg)" }}>{review.author}</p>
      </div>
    </div>
  );
}

type Phase = "auto" | "dragging" | "decelerating" | "slow";

export function Manifesto() {
  const trackRef     = useRef<HTMLDivElement>(null);
  const contentWidth = useRef(0);

  const phase        = useRef<Phase>("auto");
  const velocity     = useRef(0);
  const dragStartX   = useRef(0);
  const dragStartMX  = useRef(0);
  const lastPtrX     = useRef(0);
  const lastPtrTime  = useRef(0);
  const resumeTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartY  = useRef(0);
  const touchAxis    = useRef<"pending" | "horizontal" | "vertical">("pending");

  const targetX = useRef(0);
  const x       = useMotionValue(0);

  useEffect(() => {
    if (trackRef.current) contentWidth.current = trackRef.current.scrollWidth / 2;
  }, []);

  const wrap = (val: number) => {
    const w = contentWidth.current;
    if (!w) return val;
    while (val <= -w) val += w;
    while (val > 0)   val -= w;
    return val;
  };

  const shortDelta = (curr: number, target: number) => {
    const w = contentWidth.current;
    let d = target - curr;
    if (w > 0) {
      if (d >  w / 2) d -= w;
      if (d < -w / 2) d += w;
    }
    return d;
  };

  useAnimationFrame(() => {
    const w = contentWidth.current;
    if (!w) return;

    if (phase.current === "auto") {
      const next = wrap(x.get() - SPEED_NORMAL);
      x.set(next);
      targetX.current = next;

    } else if (phase.current === "dragging") {
      const curr = x.get();
      const delta = shortDelta(curr, targetX.current);
      x.set(wrap(curr + delta * LERP_DRAG));

    } else if (phase.current === "decelerating") {
      velocity.current *= FRICTION;
      targetX.current = wrap(targetX.current + velocity.current);
      const curr = x.get();
      const delta = shortDelta(curr, targetX.current);
      x.set(wrap(curr + delta * LERP_DRAG));

      if (Math.abs(velocity.current) < MIN_VELOCITY) {
        velocity.current  = 0;
        phase.current     = "slow";
        targetX.current   = x.get();
        if (resumeTimer.current) clearTimeout(resumeTimer.current);
        resumeTimer.current = setTimeout(() => { phase.current = "auto"; }, RESUME_DELAY);
      }

    } else if (phase.current === "slow") {
      const next = wrap(x.get() - SPEED_SLOW);
      x.set(next);
      targetX.current = next;
    }
  });

  function handleWindowMove(e: MouseEvent) { moveDrag(e.clientX); }
  function handleWindowUp()                { endDrag(); }

  // Tactile : on décide de l'axe au premier mouvement
  function handleTouchMove(e: TouchEvent) {
    const cx = e.touches[0].clientX;
    const cy = e.touches[0].clientY;

    if (touchAxis.current === "pending") {
      const dx = Math.abs(cx - dragStartX.current);
      const dy = Math.abs(cy - touchStartY.current);
      if (dx < 8 && dy < 8) return; // seuil : pas encore décidé

      if (dy > dx) {
        // Vertical → on laisse la page scroller
        touchAxis.current = "vertical";
        phase.current = "auto";
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleTouchEnd);
        return;
      }
      // Horizontal → on drague les avis
      touchAxis.current = "horizontal";
    }

    if (touchAxis.current === "horizontal") {
      e.preventDefault();
      moveDrag(cx);
    }
  }

  function handleTouchEnd() {
    window.removeEventListener("touchmove", handleTouchMove);
    window.removeEventListener("touchend", handleTouchEnd);
    if (touchAxis.current === "horizontal") {
      endDrag();
    } else if (phase.current === "dragging") {
      phase.current = "auto";
    }
    touchAxis.current = "pending";
  }

  const moveDrag = useCallback((clientX: number) => {
    if (phase.current !== "dragging") return;
    const now = performance.now();
    const dt  = now - lastPtrTime.current;
    if (dt > 0) velocity.current = (clientX - lastPtrX.current) / dt * 16;
    lastPtrX.current    = clientX;
    lastPtrTime.current = now;
    targetX.current = wrap(dragStartMX.current + (clientX - dragStartX.current));
  }, []);

  const endDrag = useCallback(() => {
    if (phase.current !== "dragging") return;
    phase.current = "decelerating";
    window.removeEventListener("mousemove", handleWindowMove);
    window.removeEventListener("mouseup",   handleWindowUp);
  }, []);

  // Souris : drague immédiatement (pas de conflit de scroll)
  const startDrag = (clientX: number) => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    phase.current       = "dragging";
    velocity.current    = 0;
    dragStartX.current  = clientX;
    dragStartMX.current = x.get();
    targetX.current     = x.get();
    lastPtrX.current    = clientX;
    lastPtrTime.current = performance.now();
    window.addEventListener("mousemove", handleWindowMove);
    window.addEventListener("mouseup",   handleWindowUp);
  };

  // Tactile : on arme la détection d'axe sans encore draguer
  const startTouch = (touch: React.Touch) => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    touchAxis.current   = "pending";
    velocity.current    = 0;
    dragStartX.current  = touch.clientX;
    touchStartY.current = touch.clientY;
    dragStartMX.current = x.get();
    targetX.current     = x.get();
    lastPtrX.current    = touch.clientX;
    lastPtrTime.current = performance.now();
    phase.current       = "dragging"; // met l'auto en pause le temps de décider
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
  };

  useEffect(() => () => {
    window.removeEventListener("mousemove", handleWindowMove);
    window.removeEventListener("mouseup",   handleWindowUp);
    window.removeEventListener("touchmove", handleTouchMove);
    window.removeEventListener("touchend",  handleTouchEnd);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  }, []);

  const doubled = [...REVIEWS, ...REVIEWS];

  return (
    <section className="relative bg-accent py-28 md:py-40 overflow-hidden" id="manifesto">
      <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full border-2 border-bg/10 z-0" aria-hidden />
      <div className="absolute -left-8 -bottom-8 w-48 h-48 rounded-full border border-bg/10 z-0" aria-hidden />
      <div aria-hidden className="absolute top-0 inset-x-0 pointer-events-none z-10"
        style={{ height:"100%", background: GRADIENT_TOP }} />

      <div className="relative z-20">
        <p className="font-mono text-[14px] md:text-[16px] uppercase tracking-[0.3em] text-black mb-14 text-center">
          Ce qu&apos;ils disent
        </p>

        <div
          className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
          style={{ touchAction: "pan-y" }}
          onMouseDown={(e) => startDrag(e.clientX)}
          onTouchStart={(e) => startTouch(e.touches[0])}
        >
          <motion.div ref={trackRef} style={{ x }} className="flex gap-5 px-5 w-max">
            {doubled.map((review, i) => (
              <ReviewCard key={`${review.author}-${i}`} review={review} />
            ))}
          </motion.div>
        </div>

        <p className="mt-14 font-sans font-bold text-black text-3xl md:text-5xl text-center">
          Des clients satisfaits...
        </p>
      </div>
    </section>
  );
}
