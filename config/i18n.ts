export type Lang = "fr" | "en";

// Codes pays francophones (ISO 3166-1 alpha-2). Hors de cette liste -> anglais.
export const FRANCOPHONE_COUNTRIES = [
  "FR", "BE", "CH", "CA", "LU", "MC", "HT",
  "CD", "CG", "CI", "CM", "SN", "ML", "BF", "NE", "TG", "BJ",
  "GA", "MG", "GN", "RW", "TD", "DJ", "KM", "BI", "GQ", "VU", "SC",
];

type Dict = {
  hero: {
    badge: string;
    tagline: string;
    description: string;
    seeWorks: string;
    quote: string;
    quoteLabel: string;
    stats: { value: number; label: string }[];
  };
  why: {
    title: string;
    scroll: string;
    reasons: { index: string; title: string; description: string }[];
  };
  reviews: {
    eyebrow: string;
    closing: string;
    items: { quote: string; author: string; stars: number }[];
  };
  marquee: string[];
  works: {
    title: string;
    items: { category: string; description: string }[]; // même ordre que siteConfig.works
  };
  services: {
    title: string;
    note: string;
    items: { title: string; description: string }[];
  };
  process: {
    title: string;
    steps: { title: string; description: string }[];
  };
  contact: {
    eyebrow: string;
    headline: string;
    subline: string;
    cta: string;
    orDirectly: string;
  };
  contactPage: {
    back: string;
    eyebrow: string;
    headline: string;
    subline: string;
    channels: { email: string; phone: string; instagram: string };
    fields: {
      firstname: string;
      name: string;
      email: string;
      phone: string;
      company: string;
      businessType: string;
      project: string;
    };
    businessTypes: string[];
    selectPlaceholder: string;
    submit: string;
    sending: string;
    successTitle: string;
    successText: string;
    successAgain: string;
    phoneError: string;
    notConfigured: string;
    genericError: string;
  };
  footer: { legal: string };
  nav: string[]; // même ordre que siteConfig.nav.links
  collab: { eyebrow: string; title: string };
};

export const translations: Record<Lang, Dict> = {
  fr: {
    hero: {
      badge: "Studio créatif",
      tagline: "Construisez votre identité",
      description:
        "Studio de création web haut de gamme. Nous transformons vos ambitions en références digitales.",
      seeWorks: "Voir nos travaux",
      quote: "Faire un devis gratuit",
      quoteLabel: "Devis",
      stats: [
        { value: 400, label: "Projets réalisés" },
        { value: 220, label: "Refontes" },
        { value: 130, label: "Automatisations" },
      ],
    },
    why: {
      title: "Pourquoi nous choisir",
      scroll: "Défilez",
      reasons: [
        {
          index: "01",
          title: "Sur-mesure, jamais de template",
          description:
            "Chaque site est conçu de zéro autour de votre marque. Pas de thème recyclé, pas de mise en page prévisible. Une pièce unique, pensée pour vous démarquer.",
        },
        {
          index: "02",
          title: "Performance et conversion",
          description:
            "Un site rapide, fluide et optimisé. On ne se contente pas du beau : chaque choix sert vos objectifs et transforme vos visiteurs en clients.",
        },
        {
          index: "03",
          title: "Accompagnement réel",
          description:
            "Avant, pendant et après le lancement. On reste disponibles, réactifs et transparents. Vous n'êtes jamais seul face à votre projet.",
        },
        {
          index: "04",
          title: "Les prix les plus compétitifs",
          description:
            "Une qualité premium au meilleur tarif du marché. On vous offre le travail d'un grand studio sans le prix d'un grand studio. Le meilleur rapport qualité-prix, point.",
        },
        {
          index: "05",
          title: "Un design qui marque",
          description:
            "Une esthétique premium, des animations soignées, une identité forte. Un site dont on se souvient et qui inspire confiance dès la première seconde.",
        },
      ],
    },
    reviews: {
      eyebrow: "Ce qu'ils disent",
      closing: "Des clients satisfaits...",
      items: [
        { quote: "Un site qui a transformé notre acquisition client. L'équipe a su capter les valeurs de notre marque avec une précision rare.", author: "Sarah M.", stars: 5 },
        { quote: "Processus impeccable, résultat au-delà des attentes. On a levé notre Série A deux mois après le lancement du site.", author: "Thomas K.", stars: 5 },
        { quote: "La meilleure décision de l'année. Notre trafic a été multiplié par 6 en six mois. L'impact est mesurable et vrai.", author: "Léa R.", stars: 5 },
        { quote: "Une équipe qui comprend vraiment les enjeux business. Notre taux de conversion a doublé dès les deux mois.", author: "Marc D.", stars: 5 },
        { quote: "Design exceptionnel, délais respectés, communication parfaite. Exactement ce qu'on cherchait depuis longtemps.", author: "Julie F.", stars: 5 },
        { quote: "Le résultat dépasse tout ce qu'on imaginait. On recommande !", author: "Antoine P.", stars: 5 },
        { quote: "Chaque détail pensé, chaque animation justifiée. Un travail de précision qu'on ne trouve nulle part ailleurs.", author: "Camille B.", stars: 5 },
        { quote: "Investissement rentabilisé en trois semaines. Notre pipeline a explosé après le lancement. Je recommande sans hésiter.", author: "Romain V.", stars: 5 },
        { quote: "Rare de trouver une agence qui allie autant de talent créatif et de rigueur technique. Un vrai partenaire long terme.", author: "Inès C.", stars: 5 },
        { quote: "Notre ancienne agence prenait 6 mois pour livrer moitié moins bien. VAULTAWEB a livré en 4 semaines. Le jour et la nuit.", author: "Kevin L.", stars: 5 },
      ],
    },
    marquee: [
      "Design Web", "Développement Next.js", "Motion & Animation", "Stratégie Digitale",
      "UX & Conversion", "Branding Digital", "Performance Web", "Sites Sur-Mesure",
    ],
    works: {
      title: "Travaux sélectionnés",
      items: [
        { category: "Design & Web", description: "Site vitrine premium pour un barbershop montréalais. Identité dorée, ambiance authentique." },
        { category: "Design & Web", description: "Site vitrine pour une entreprise de services. Identité verte, navigation claire." },
      ],
    },
    services: {
      title: "Ce que nous faisons",
      note: "Vous êtes maître de vos propres décisions.",
      items: [
        { title: "Design Web", description: "Interfaces pensées pour convertir. Chaque pixel a une intention, chaque choix typographique une raison." },
        { title: "Développement", description: "Next.js, React, TypeScript. Code propre, performant, scalable. On livre sans dette technique." },
        { title: "Motion & Animation", description: "Des animations et transitions fluides et naturelles, pensées pour une immersion complète." },
        { title: "Stratégie", description: "Positionnement, architecture d'information, tunnel de conversion. On pense avant de construire." },
        { title: "Stratégie SEO", description: "Référencement naturel pensé dès la conception. Mots-clés, contenu optimisé, performance technique : on vous rend visible là où vos clients cherchent." },
      ],
    },
    process: {
      title: "Notre processus",
      steps: [
        { title: "Découverte", description: "On écoute d'abord. Votre marché, vos objectifs, vos contraintes réelles. Sans template ni présupposé." },
        { title: "Création", description: "Design, prototypage, développement itératif. Un livrable concret à chaque étape. Pas de surprise au final." },
        { title: "Lancement", description: "Déploiement, tests de performance, suivi post-live. On reste disponibles. Toujours." },
      ],
    },
    contact: {
      eyebrow: "Travailler ensemble →",
      headline: "Nous contacter",
      subline: "Décrivez votre projet. On répond sous 24h, avec les prix les plus compétitifs du marché.",
      cta: "Faire un devis gratuit",
      orDirectly: "ou directement :",
    },
    contactPage: {
      back: "Retour",
      eyebrow: "Parlons de votre projet",
      headline: "Nous contacter",
      subline: "Décrivez votre projet. On répond sous 24h, avec les prix les plus compétitifs du marché.",
      channels: { email: "Email", phone: "Téléphone", instagram: "Instagram" },
      fields: {
        firstname: "Prénom",
        name: "Nom",
        email: "Email",
        phone: "Téléphone (optionnel)",
        company: "Nom d'entreprise",
        businessType: "Type d'entreprise",
        project: "Votre projet",
      },
      businessTypes: ["Startup", "PME", "E-commerce", "Agence", "Indépendant / Freelance", "Grande entreprise", "Autre"],
      selectPlaceholder: "Sélectionner...",
      submit: "Envoyer la demande",
      sending: "Envoi...",
      successTitle: "Demande envoyée",
      successText: "Merci ! On revient vers vous sous 24h avec un premier retour.",
      successAgain: "Envoyer une autre demande",
      phoneError: "Numéro invalide. Format international attendu, ex : +1 514 555 0123",
      notConfigured: "Le formulaire n'est pas encore configuré (Supabase).",
      genericError: "Une erreur est survenue. Réessayez ou écrivez-nous par email.",
    },
    footer: { legal: "Tous droits réservés." },
    nav: ["Pourquoi nous", "Travaux", "Services", "Processus", "Contact"],
    collab: { eyebrow: "Collaboration", title: "En collaboration avec" },
  },

  en: {
    hero: {
      badge: "Creative studio",
      tagline: "Build your identity",
      description:
        "High-end web design studio. We turn your ambitions into digital references.",
      seeWorks: "See our work",
      quote: "Get a free quote",
      quoteLabel: "Quote",
      stats: [
        { value: 400, label: "Projects delivered" },
        { value: 220, label: "Redesigns" },
        { value: 130, label: "Automations" },
      ],
    },
    why: {
      title: "Why choose us",
      scroll: "Scroll",
      reasons: [
        {
          index: "01",
          title: "Custom-made, never a template",
          description:
            "Every site is built from scratch around your brand. No recycled themes, no predictable layouts. A unique piece, designed to make you stand out.",
        },
        {
          index: "02",
          title: "Performance and conversion",
          description:
            "A fast, smooth and optimized site. We don't settle for pretty: every choice serves your goals and turns visitors into clients.",
        },
        {
          index: "03",
          title: "Real support",
          description:
            "Before, during and after launch. We stay available, responsive and transparent. You're never alone with your project.",
        },
        {
          index: "04",
          title: "The most competitive prices",
          description:
            "Premium quality at the best rate on the market. We give you the work of a top studio without the price of one. The best value, period.",
        },
        {
          index: "05",
          title: "A design that stands out",
          description:
            "A premium aesthetic, refined animations, a strong identity. A site people remember and that inspires trust from the first second.",
        },
      ],
    },
    reviews: {
      eyebrow: "What they say",
      closing: "Happy clients...",
      items: [
        { quote: "A site that transformed our client acquisition. The team captured our brand's values with rare precision.", author: "Sarah M.", stars: 5 },
        { quote: "Flawless process, results beyond expectations. We raised our Series A two months after launching the site.", author: "Thomas K.", stars: 5 },
        { quote: "The best decision of the year. Our traffic grew 6x in six months. The impact is measurable and real.", author: "Léa R.", stars: 5 },
        { quote: "A team that truly understands business challenges. Our conversion rate doubled within two months.", author: "Marc D.", stars: 5 },
        { quote: "Exceptional design, deadlines met, perfect communication. Exactly what we'd been looking for.", author: "Julie F.", stars: 5 },
        { quote: "The result exceeds everything we imagined. Highly recommend!", author: "Antoine P.", stars: 5 },
        { quote: "Every detail considered, every animation justified. A level of precision you won't find anywhere else.", author: "Camille B.", stars: 5 },
        { quote: "Investment paid off in three weeks. Our pipeline exploded after launch. I recommend without hesitation.", author: "Romain V.", stars: 5 },
        { quote: "Rare to find an agency that combines such creative talent and technical rigor. A true long-term partner.", author: "Inès C.", stars: 5 },
        { quote: "Our old agency took 6 months to deliver half as good. VAULTAWEB delivered in 4 weeks. Night and day.", author: "Kevin L.", stars: 5 },
      ],
    },
    marquee: [
      "Web Design", "Next.js Development", "Motion & Animation", "Digital Strategy",
      "UX & Conversion", "Digital Branding", "Web Performance", "Custom Websites",
    ],
    works: {
      title: "Selected work",
      items: [
        { category: "Design & Web", description: "Premium showcase site for a Montreal barbershop. Golden identity, authentic atmosphere." },
        { category: "Design & Web", description: "Showcase site for a services company. Green identity, clear navigation." },
      ],
    },
    services: {
      title: "What we do",
      note: "You're in control of your own decisions.",
      items: [
        { title: "Web Design", description: "Interfaces built to convert. Every pixel has an intent, every typographic choice a reason." },
        { title: "Development", description: "Next.js, React, TypeScript. Clean, performant, scalable code. We deliver without technical debt." },
        { title: "Motion & Animation", description: "Smooth, natural animations and transitions, designed for full immersion." },
        { title: "Strategy", description: "Positioning, information architecture, conversion funnel. We think before we build." },
        { title: "SEO Strategy", description: "Search optimization considered from day one. Keywords, optimized content, technical performance: we make you visible where your clients search." },
      ],
    },
    process: {
      title: "Our process",
      steps: [
        { title: "Discovery", description: "We listen first. Your market, your goals, your real constraints. No templates, no assumptions." },
        { title: "Creation", description: "Design, prototyping, iterative development. A concrete deliverable at every step. No surprises at the end." },
        { title: "Launch", description: "Deployment, performance testing, post-launch support. We stay available. Always." },
      ],
    },
    contact: {
      eyebrow: "Work together →",
      headline: "Contact us",
      subline: "Tell us about your project. We reply within 24h, with the most competitive prices on the market.",
      cta: "Get a free quote",
      orDirectly: "or directly:",
    },
    contactPage: {
      back: "Back",
      eyebrow: "Let's talk about your project",
      headline: "Contact us",
      subline: "Tell us about your project. We reply within 24h, with the most competitive prices on the market.",
      channels: { email: "Email", phone: "Phone", instagram: "Instagram" },
      fields: {
        firstname: "First name",
        name: "Last name",
        email: "Email",
        phone: "Phone (optional)",
        company: "Company name",
        businessType: "Business type",
        project: "Your project",
      },
      businessTypes: ["Startup", "SMB", "E-commerce", "Agency", "Freelance / Independent", "Large company", "Other"],
      selectPlaceholder: "Select...",
      submit: "Send request",
      sending: "Sending...",
      successTitle: "Request sent",
      successText: "Thank you! We'll get back to you within 24h with a first reply.",
      successAgain: "Send another request",
      phoneError: "Invalid number. International format expected, e.g. +1 514 555 0123",
      notConfigured: "The form isn't configured yet (Supabase).",
      genericError: "An error occurred. Try again or email us.",
    },
    footer: { legal: "All rights reserved." },
    nav: ["Why us", "Work", "Services", "Process", "Contact"],
    collab: { eyebrow: "Collaboration", title: "In collaboration with" },
  },
};
