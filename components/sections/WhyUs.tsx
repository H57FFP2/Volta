"use client";

import { StackingCards, type StackReason } from "@/components/ui/stacking-card";
import { TextReveal } from "@/components/ui/TextReveal";

const REASONS: StackReason[] = [
  {
    index: "01",
    title: "Sur-mesure, jamais de template",
    description:
      "Chaque site est conçu de zéro autour de votre marque. Pas de thème recyclé, pas de mise en page prévisible. Une pièce unique, pensée pour vous démarquer.",
    color: "#0c160f",
    textColor: "#ede8da",
  },
  {
    index: "02",
    title: "Performance et conversion",
    description:
      "Un site rapide, fluide et optimisé. On ne se contente pas du beau : chaque choix sert vos objectifs et transforme vos visiteurs en clients.",
    color: "#142a1c",
    textColor: "#ede8da",
  },
  {
    index: "03",
    title: "Accompagnement réel",
    description:
      "Avant, pendant et après le lancement. On reste disponibles, réactifs et transparents. Vous n'êtes jamais seul face à votre projet.",
    color: "#1d3e28",
    textColor: "#ede8da",
  },
  {
    index: "04",
    title: "Les prix les plus compétitifs",
    description:
      "Une qualité premium au meilleur tarif du marché. On vous offre le travail d'un grand studio sans le prix d'un grand studio. Le meilleur rapport qualité-prix, point.",
    color: "#2a5638",
    textColor: "#ede8da",
  },
  {
    index: "05",
    title: "Un design qui marque",
    description:
      "Une esthétique premium, des animations soignées, une identité forte. Un site dont on se souvient et qui inspire confiance dès la première seconde.",
    color: "#3a7a4c",
    textColor: "#ede8da",
  },
];

export function WhyUs() {
  return (
    <section id="why-us" className="relative bg-bg">

      <div className="px-6 md:px-10 pt-24 md:pt-36 pb-8 md:pb-16">
        <TextReveal
          as="h2"
          className="font-sans font-black text-[clamp(2.5rem,7vw,6rem)] leading-none text-fg"
        >
          Pourquoi nous choisir
        </TextReveal>
      </div>

      <StackingCards reasons={REASONS} />
    </section>
  );
}
