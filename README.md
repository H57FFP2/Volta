# VOLTAWEB Studio

Site vitrine premium — Next.js 15 + Tailwind CSS + Framer Motion + Lenis.

## Lancer le projet

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Page Contact + Dashboard (Supabase)

Le formulaire de la page `/contact` enregistre les demandes dans Supabase, et la
page `/dashboard` (protégée par mot de passe) permet de les consulter.

### Mise en route

1. Crée un projet gratuit sur [supabase.com](https://supabase.com).
2. Dans **SQL Editor**, exécute le contenu de [`supabase-setup.sql`](supabase-setup.sql)
   (crée la table `contact_requests` + la politique d'accès).
3. Copie `.env.local.example` en **`.env.local`** et remplis :
   - `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     (Supabase → Project Settings → API)
   - `SUPABASE_SERVICE_ROLE_KEY` (même page, clé `service_role` — **secrète**)
   - `DASHBOARD_PASSWORD` (le mot de passe de ton choix pour `/dashboard`)
4. Redémarre `npm run dev`.

- Formulaire public : [http://localhost:3000/contact](http://localhost:3000/contact)
- Dashboard privé : [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

> Sans ces variables, le site fonctionne quand même : le formulaire affiche un
> message "non configuré" et le dashboard demande la configuration.

## Modifier le contenu

**Tout le contenu éditable est centralisé dans un seul fichier :**

```
config/site.ts
```

Ce fichier contient :
- Nom du studio, email, localisation
- Textes de toutes les sections (hero, manifeste, services, processus, contact)
- Projets (titre, catégorie, couleur, description)
- Liens de navigation et sociaux
- Statistiques (projets livrés, années d'expérience, clients)

### Modifier un projet

Dans `config/site.ts`, trouver la clé `works` et éditer l'objet correspondant :

```ts
{
  id: "01",
  title: "Nom du projet",
  category: "Design & Développement",
  year: "2024",
  tags: ["Tag1", "Tag2"],
  color: "#FF4A28",      // couleur de la vignette abstraite
  description: "Description courte du projet et ses résultats.",
},
```

## Structure du projet

```
app/              → Layout Next.js et page principale
components/
  layout/         → Header, Footer, CustomCursor
  sections/       → Hero, Manifesto, Works, Services, Process, Contact
  ui/             → TextReveal, ScrollReveal, Marquee, MagneticButton, LoadingScreen
config/
  site.ts         → ← TOUT LE CONTENU ICI
lib/
  lenis-provider  → Smooth scroll
  utils.ts        → Utilitaires (cn)
```

## Stack technique

| Outil | Usage |
|---|---|
| Next.js 15 (App Router) | Framework React |
| Tailwind CSS 3 | Styles utilitaires |
| Framer Motion | Animations au scroll, page load, interactions |
| Lenis | Smooth scroll |
| Google Fonts (Fraunces, Syne, DM Mono) | Typographie distinctive |
