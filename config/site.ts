
export const siteConfig = {
  studio: {
    name: "VOLTAWEB",
    tagline: "Construisez votre identité",
    description:
      "Studio de création web haut de gamme. Nous transformons vos ambitions en références digitales.",
    email: "contact@voltaweb-studio.fr",
    location: "Montréal, Canada",
    year: "2026",
  },

  nav: {
    links: [
      { label: "Pourquoi nous", href: "#why-us" },
      { label: "Travaux", href: "#works" },
      { label: "Services", href: "#services" },
      { label: "Processus", href: "#process" },
      { label: "Contact", href: "#contact" },
    ],
  },

  marquee: {
    items: [
      "Design Web",
      "Développement Next.js",
      "Motion & Animation",
      "Stratégie Digitale",
      "UX & Conversion",
      "Branding Digital",
      "Performance Web",
      "Sites Sur-Mesure",
    ],
  },

  works: [
    {
      id: "01",
      title: "Bros Barbershop",
      category: "Design & Web",
      year: "2025",
      color: "#1a1410",
      image: "/image.png",
      url: "https://brosbarbershop1.netlify.app/",
      description:
        "Site vitrine premium pour un barbershop montréalais. Identité dorée, ambiance authentique.",
    },
    {
      id: "02",
      title: "Verdescape",
      category: "Design & Web",
      year: "2025",
      color: "#10231a",
      image: "/verdescape.png",
      url: "https://servicesetc.netlify.app/",
      description:
        "Site vitrine pour une entreprise de services. Identité verte, navigation claire.",
    },
  ],

  services: [
    {
      index: "01",
      title: "Design Web",
      description:
        "Interfaces pensées pour convertir. Chaque pixel a une intention, chaque choix typographique une raison.",
    },
    {
      index: "02",
      title: "Développement",
      description:
        "Next.js, React, TypeScript. Code propre, performant, scalable. On livre sans dette technique.",
    },
    {
      index: "03",
      title: "Motion & Animation",
      description:
        "Des animations et transitions fluides et naturelles, pensées pour une immersion complète.",
    },
    {
      index: "04",
      title: "Stratégie",
      description:
        "Positionnement, architecture d'information, tunnel de conversion. On pense avant de construire.",
    },
    {
      index: "05",
      title: "Stratégie SEO",
      description:
        "Référencement naturel pensé dès la conception. Mots-clés, contenu optimisé, performance technique : on vous rend visible là où vos clients cherchent.",
    },
  ],

  process: [
    {
      step: "01",
      title: "Découverte",
      description:
        "On écoute d'abord. Votre marché, vos objectifs, vos contraintes réelles. Sans template ni présupposé.",
    },
    {
      step: "02",
      title: "Création",
      description:
        "Design, prototypage, développement itératif. Un livrable concret à chaque étape. Pas de surprise au final.",
    },
    {
      step: "03",
      title: "Lancement",
      description:
        "Déploiement, tests de performance, suivi post-live. On reste disponibles. Toujours.",
    },
  ],

  contact: {
    headline: "Nous contacter",
    subline: "Décrivez votre projet. On répond sous 24h, avec les prix les plus compétitifs du marché.",
    cta: "Faire un devis gratuit",
    ctaHref: "/contact",
    phone: "+1 514 000 0000",
    instagram: {
      handle: "@voltaweb.studio",
      url: "https://instagram.com/voltaweb.studio",
    },
  },

  footer: {
    legal: "Tous droits réservés.",
  },
};

export type SiteConfig = typeof siteConfig;
